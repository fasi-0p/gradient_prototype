import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Star field that creates the space travel effect
const StarField = ({ count = 3000, speed = 1, inView = true }) => {
  const points = useRef();
  
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Spread stars in a tunnel formation
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.5 + Math.random() * 4;
      
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
      
      spd[i] = 0.5 + Math.random() * 1.5;
    }
    
    return [pos, spd];
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current || !inView) return;
    
    const posArray = points.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      // Move stars toward camera
      posArray[i * 3 + 2] += speeds[i] * speed * delta * 20;
      
      // Reset stars that pass the camera
      if (posArray[i * 3 + 2] > 25) {
        posArray[i * 3 + 2] = -25;
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.5 + Math.random() * 4;
        posArray[i * 3] = Math.cos(angle) * radius;
        posArray[i * 3 + 1] = Math.sin(angle) * radius;
      }
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Speed lines effect
const SpeedLines = ({ count = 100, speed = 1 }) => {
  const linesRef = useRef();
  
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 6); // 2 vertices per line
    const spd = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1 + Math.random() * 3;
      const z = (Math.random() - 0.5) * 50;
      
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      // Start point
      pos[i * 6] = x;
      pos[i * 6 + 1] = y;
      pos[i * 6 + 2] = z;
      
      // End point (stretched)
      pos[i * 6 + 3] = x;
      pos[i * 6 + 4] = y;
      pos[i * 6 + 5] = z + 2;
      
      spd[i] = 0.5 + Math.random() * 1.5;
    }
    
    return [pos, spd];
  }, [count]);

  useFrame((state, delta) => {
    if (!linesRef.current) return;
    
    const posArray = linesRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      posArray[i * 6 + 2] += speeds[i] * speed * delta * 30;
      posArray[i * 6 + 5] += speeds[i] * speed * delta * 30;
      
      if (posArray[i * 6 + 2] > 25) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 1 + Math.random() * 3;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        posArray[i * 6] = x;
        posArray[i * 6 + 1] = y;
        posArray[i * 6 + 2] = -25;
        posArray[i * 6 + 3] = x;
        posArray[i * 6 + 4] = y;
        posArray[i * 6 + 5] = -23;
      }
    }
    
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count * 2}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial 
        color="#ff00ff"
        transparent 
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
};

const SpaceTravelScene = ({ speed = 1, inView = true }) => {
  return (
    <>
      <color attach="background" args={['#030014']} />
      <fog attach="fog" args={['#030014', 5, 30]} />
      
      <StarField count={2000} speed={speed} inView={inView} />
      <SpeedLines count={80} speed={speed} />
    </>
  );
};

const SpaceTravel = ({ className = '', speed = 1, inView = true }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={null}>
          <SpaceTravelScene speed={speed} inView={inView} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SpaceTravel;
