import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const GradientLogo = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    // State Variables
    let scene, camera, renderer, pivot;
    let rimLight;
    let spotLights = [];
    let spinGlow;

    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let currentSpeed = 0;
    let targetSpeed = 0;
    let glowIntensity = 0;

    let targetTiltX = 0;
    let currentTiltX = 0;
    const maxTiltX = 0.5;

    // DETECT MOBILE 
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent) || window.innerWidth < 768;

    // --- SCENE ---
    scene = new THREE.Scene();
    // 1. REMOVED the hardcoded background color so the Tailwind CSS background shows through!

    // --- CAMERA ---
    camera = new THREE.PerspectiveCamera(
      50,
      mountNode.clientWidth / mountNode.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 0);
    camera.lookAt(0, 0, 0);
    camera.up.set(0, 0, -1);

    // --- RENDERER ---
    renderer = new THREE.WebGLRenderer({
      alpha: true, // 2. CRITICAL: Allows the canvas to be transparent
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });

    renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
    renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.6;
    
    // We keep shadowmaps enabled globally, but disable them on the mesh to fix the waves
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mountNode.appendChild(renderer.domElement);

    // --- LIGHTING ---
    scene.add(new THREE.AmbientLight(0x2a1a4a, 4.0));

    const keyLight = new THREE.DirectionalLight(0xfff5e0, 5.0);
    keyLight.position.set(-5, 8, 4);
    keyLight.castShadow = !isMobile;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8866ff, 3.0);
    fillLight.position.set(6, 3, -3);
    scene.add(fillLight);

    rimLight = new THREE.DirectionalLight(0xff33bb, 5.0);
    rimLight.position.set(1, -8, -7);
    scene.add(rimLight);

    const spotDefs = [
      { color: 0xff44ee, x:  0, y: 14, z:  0,  intensity: 8, angle: 0.30, penumbra: 0.5, os: 0.25, or: 4.0 },
      { color: 0x3322ff, x:  0, y:-14, z:  0,  intensity: 8, angle: 0.30, penumbra: 0.5, os: 0.25, or: 4.0 },
      { color: 0x00ddff, x:-12, y:  3, z:  0,  intensity: 6, angle: 0.28, penumbra: 0.6, os: 0.20, or: 3.0 },
      { color: 0xbb44ff, x: 12, y:  3, z:  0,  intensity: 6, angle: 0.28, penumbra: 0.6, os: 0.20, or: 3.0 },
      { color: 0xff99dd, x:  0, y:  4, z: 12,  intensity: 7, angle: 0.32, penumbra: 0.5, os: 0.15, or: 2.5 },
      { color: 0x2244ff, x:  0, y:  4, z:-12,  intensity: 6, angle: 0.32, penumbra: 0.5, os: 0.15, or: 2.5 },
    ];

    spotDefs.forEach((def) => {
      const spot = new THREE.SpotLight(def.color, def.intensity);
      spot.position.set(def.x, def.y, def.z);
      spot.target.position.set(0, 0, 0);
      spot.angle      = def.angle;
      spot.penumbra   = def.penumbra;
      spot.decay      = 1.0;
      spot.distance   = 30;
      spot.castShadow = false;

      spot.userData.orbitSpeed    = def.os;
      spot.userData.orbitRadius   = def.or;
      spot.userData.baseX         = def.x;
      spot.userData.baseY         = def.y;
      spot.userData.baseZ         = def.z;
      spot.userData.baseIntensity = def.intensity;
      spot.userData.phase         = Math.random() * Math.PI * 2;

      scene.add(spot);
      scene.add(spot.target);
      spotLights.push(spot);
    });

    spinGlow = new THREE.PointLight(0xff88ff, 0, 25);
    spinGlow.position.set(0, 9, 0);
    scene.add(spinGlow);

    // --- LOAD MODEL ---
    const loader = new GLTFLoader();
    
    loader.load('/logo_frontlook_model.glb', (gltf) => {
      const model = gltf.scene;

      model.traverse((child) => {
        if (!child.isMesh) return;
        const tex = child.material?.map;
        if (tex) {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.needsUpdate = true;
        }
        child.material = new THREE.MeshStandardMaterial({
          map:             tex || null,
          color:           tex ? 0xffffff : 0x9933ff,
          roughness:       0.2,
          metalness:       0.10,
          side:            THREE.DoubleSide,
          envMapIntensity: 1.5,
        });
        
        // 3. CRITICAL FIX: Disabled Shadows on the mesh to prevent the "Wave" Striping (Shadow Acne)
        child.castShadow    = false; 
        child.receiveShadow = false; 
      });

      model.updateMatrixWorld(true);
      const box1   = new THREE.Box3().setFromObject(model);
      const size1  = box1.getSize(new THREE.Vector3());
      model.scale.set(1, 1, 1);

      // recompute bounds on ORIGINAL model
      model.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);

      // now apply base scale
      const baseScale = 6.0 / maxDim;

      model.scale.set( 
        baseScale, //length
        baseScale*0.3, //depth
        baseScale //height
      );
            

      model.updateMatrixWorld(true);
      const box2   = new THREE.Box3().setFromObject(model);
      const center = box2.getCenter(new THREE.Vector3());
      model.position.sub(center);

      pivot = new THREE.Group();
      pivot.add(model);
      scene.add(pivot);

    }, undefined, (err) => console.error('[Loader] ', err));

    // --- INPUT: MOUSE + TOUCH ---
    const canvas = renderer.domElement;
    // Handled purely via CSS now for better consistency

    const onMouseDown = (e) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      targetSpeed = 0;
      currentSpeed = 0;
    };

    const onMouseMove = (e) => {
      if (!isDragging || !pivot) return;
      const deltaX = e.clientX - prevX;
      const deltaY = e.clientY - prevY;

      // 4. SWIPE FIX: Changed deltaX from positive to negative multiplier (-0.006)
      targetSpeed = deltaX * -0.006; 
      targetTiltX += deltaY * 0.01;
      targetTiltX = THREE.MathUtils.clamp(targetTiltX, -maxTiltX, maxTiltX);

      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
      targetTiltX = 0; 
    };

    const onTouchStart = (e) => {
      isDragging   = true;
      prevX        = e.touches[0].clientX;
      prevY        = e.touches[0].clientY;
      targetSpeed  = 0;
      currentSpeed = 0;
    };

    const onTouchMove = (e) => {
      if (isDragging) e.preventDefault();
      if (!isDragging || !pivot) return;

      const deltaX = e.touches[0].clientX - prevX;
      const deltaY = e.touches[0].clientY - prevY;

      // 4. SWIPE FIX: Changed deltaX from positive to negative multiplier (-0.006)
      targetSpeed = deltaX * -0.006;
      targetTiltX += deltaY * 0.01;
      targetTiltX = THREE.MathUtils.clamp(targetTiltX, -maxTiltX, maxTiltX);

      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isDragging = false;
      targetTiltX = 0;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);
    canvas.addEventListener('touchcancel', onTouchEnd);

    // --- RESIZE HANDLER ---
    const onWindowResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // --- ANIMATION LOOP ---
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;

      if (pivot) {
        currentSpeed += isDragging
          ? (targetSpeed - currentSpeed) * 0.18
          : (0 - currentSpeed) * 0.04;

        if (isDragging) {
          currentTiltX += (targetTiltX - currentTiltX) * 0.18;
        } else {
          currentTiltX += (0 - currentTiltX) * 0.12;
          if (Math.abs(currentTiltX) < 0.001) currentTiltX = 0;
        }

        pivot.rotation.x = currentTiltX;  
        pivot.rotation.z += currentSpeed; 
      }

      const speedAbs   = Math.abs(currentSpeed);
      const targetGlow = Math.min(speedAbs * 80, 1.0);
      glowIntensity   += (targetGlow - glowIntensity) * 0.05;
      if (spinGlow) spinGlow.intensity = glowIntensity * 8.0;

      spotLights.forEach((spot, i) => {
        const { orbitSpeed, orbitRadius, baseY, phase, baseIntensity } = spot.userData;
        if (i === 0 || i === 1) {
          spot.position.x = Math.sin(t * orbitSpeed + phase) * orbitRadius;
          spot.position.z = Math.cos(t * orbitSpeed + phase) * orbitRadius;
        }
        if (i === 2 || i === 3) {
          spot.position.y = baseY + Math.sin(t * orbitSpeed + phase) * orbitRadius;
          spot.position.z = Math.cos(t * orbitSpeed + phase) * orbitRadius;
        }
        if (i === 4 || i === 5) {
          spot.position.x = Math.sin(t * orbitSpeed + phase) * orbitRadius;
          spot.position.y = baseY + Math.cos(t * orbitSpeed + phase) * 1.5;
        }
        spot.intensity = baseIntensity + Math.sin(t * 0.8 + phase) * 1.5;
      });

      if (rimLight) rimLight.intensity = 5.0 + Math.sin(t * 1.4) * 1.0;

      renderer.render(scene, camera);
    };

    animate();

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onWindowResize);
      
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      canvas.removeEventListener('touchcancel', onTouchEnd);

      if (mountNode && renderer.domElement) {
        mountNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    /* The Framer Purple Background Wrapper */
    <div className="relative w-full max-w-[500px] aspect-square rounded-[2rem] mx-auto overflow-hidden bg-gradient-to-br from-[#4c1d68] via-[#2c1358] to-[#0a0a1a] shadow-[0_0_50px_rgba(91,33,182,0.3)] cursor-grab active:cursor-grabbing">
      
      {/* Concentric Rings Details */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="absolute w-[35%] h-[35%] rounded-full border border-[#ec4899]" />
        <div className="absolute w-[60%] h-[60%] rounded-full border border-[#c084fc]" />
        <div className="absolute w-[85%] h-[85%] rounded-full border border-[#3b82f6]" />
      </div>

      {/* The 3D Canvas Mount Point */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />
      
    </div>
  );
};

export default GradientLogo;