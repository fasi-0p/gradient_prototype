import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const GradientLogo = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    /* ---------------- 1. SETUP ---------------- */
    const scene = new THREE.Scene();

    // CRITICAL FIX: "Telephoto" Camera
    // Low FOV (20) + Far Distance (25) flattens the image.
    // This creates the "Optical Illusion" where the 3D coil looks like a flat 2D wave.
    const camera = new THREE.PerspectiveCamera(
      20, 
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 25); 

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    /* ---------------- 2. THE COIL GEOMETRY ---------------- */
    
    class CoilCurve extends THREE.Curve {
      constructor(scale = 1) {
        super();
        this.scale = scale;
      }

      getPoint(t, optionalTarget = new THREE.Vector3()) {
        // t goes from 0 to 1
        
        // FIX: Exactly 2 loops creates the "M" shape (2 Peaks)
        const loops = 2; 
        
        // FIX: Phase shift of -PI/2 ensures we start at the BOTTOM of the wave (-1)
        // Path: Bottom -> Peak -> Middle Valley -> Peak -> Bottom
        const angle = t * Math.PI * 2 * loops - (Math.PI / 2); 
        
        const length = 10.0; // Width of the logo
        const radius = 2.0;  // Height of the wave
        
        const x = (t - 0.5) * length;
        const y = Math.sin(angle) * radius; 
        const z = Math.cos(angle) * radius; // Depth

        return optionalTarget.set(x, y, z).multiplyScalar(this.scale);
      }
    }

    const path = new CoilCurve(1);

    // Geometry: Thick radius (0.9) to match the bold look in your image
    const geometry = new THREE.TubeGeometry(path, 600, 0.9, 32, false);

    /* ---------------- 3. THE GRADIENT ---------------- */
    const count = geometry.attributes.position.count;
    const colors = new Float32Array(count * 3);
    
    const colorLeft = new THREE.Color("#3b82f6"); // Blue
    const colorRight = new THREE.Color("#ec4899"); // Pink

    const numSegments = 600; // Must match geometry segments
    const numRadials = 33;   // Standard Tube radial segments + 1

    for (let i = 0; i < count; i++) {
        const ringIndex = Math.floor(i / numRadials);
        const alpha = ringIndex / numSegments; 
        
        const mixedColor = colorLeft.clone().lerp(colorRight, alpha);
        
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    /* ---------------- 4. MATERIAL & GLOW ---------------- */
    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.2, 
      metalness: 0.1, 
      emissive: 0xffffff,
      emissiveIntensity: 0.6, 
    });

    // Shader injection for gradient glow
    material.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
         totalEmissiveRadiance *= vColor.rgb;`
      );
    };

    const tube = new THREE.Mesh(geometry, material);

    /* ---------------- 5. ROUND CAPS ---------------- */
    const logoGroup = new THREE.Group();
    logoGroup.add(tube);

    const sphereGeo = new THREE.SphereGeometry(0.9, 32, 32); // Matches Tube Radius
    
    // Start Cap
    const startCap = new THREE.Mesh(sphereGeo, material);
    startCap.position.copy(path.getPoint(0));
    const c1 = new Float32Array(sphereGeo.attributes.position.count * 3);
    for(let i=0; i<c1.length; i+=3) { 
        c1[i]=colorLeft.r; c1[i+1]=colorLeft.g; c1[i+2]=colorLeft.b; 
    }
    startCap.geometry.setAttribute('color', new THREE.BufferAttribute(c1, 3));
    
    // End Cap
    const endCap = new THREE.Mesh(sphereGeo, material);
    endCap.position.copy(path.getPoint(1));
    const c2 = new Float32Array(sphereGeo.attributes.position.count * 3);
    for(let i=0; i<c2.length; i+=3) { 
        c2[i]=colorRight.r; c2[i+1]=colorRight.g; c2[i+2]=colorRight.b; 
    }
    endCap.geometry.setAttribute('color', new THREE.BufferAttribute(c2, 3));

    logoGroup.add(startCap);
    logoGroup.add(endCap);
    
    scene.add(logoGroup);

    /* ---------------- 6. LIGHTING ---------------- */
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(0, 10, 10);
    scene.add(dirLight);
    
    const purpleFill = new THREE.PointLight(0xa855f7, 2, 20);
    purpleFill.position.set(0, -5, 5);
    scene.add(purpleFill);

    /* ---------------- 7. ANIMATION ---------------- */
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      if(!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      // Subtle Float
      logoGroup.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      
      // Mouse Interaction
      const targetRotY = mouseX * 0.5; 
      const targetRotX = mouseY * 0.2;
      
      logoGroup.rotation.y += (targetRotY - logoGroup.rotation.y) * 0.05;
      logoGroup.rotation.x += (targetRotX - logoGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if(mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default GradientLogo;