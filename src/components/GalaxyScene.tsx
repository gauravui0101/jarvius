import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type GalaxySector = 'overview' | 'core' | 'arms' | 'edge';

interface GalaxySceneProps {
  reducedMotion?: boolean;
  sector?: GalaxySector;
  speedMultiplier?: number;
  starDensity?: 'low' | 'medium' | 'high';
}

export const GalaxyScene: React.FC<GalaxySceneProps> = ({
  reducedMotion = false,
  sector = 'overview',
  speedMultiplier = 1,
  starDensity = 'high',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const cameraPosTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 4.2, 8.8));

  // Update target camera position based on sector
  useEffect(() => {
    switch (sector) {
      case 'core':
        cameraPosTargetRef.current.set(0, 2.2, 4.5);
        cameraTargetRef.current.set(0, 0, 0);
        break;
      case 'arms':
        cameraPosTargetRef.current.set(4.5, 3.8, 6.2);
        cameraTargetRef.current.set(1.5, 0, 0.5);
        break;
      case 'edge':
        cameraPosTargetRef.current.set(0, 0.8, 9.2);
        cameraTargetRef.current.set(0, 0, 0);
        break;
      case 'overview':
      default:
        cameraPosTargetRef.current.set(0, 4.2, 8.8);
        cameraTargetRef.current.set(0, 0, 0);
        break;
    }
  }, [sector]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- 1. Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030014, 0.035);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.copy(cameraPosTargetRef.current);

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x030014, 1);
    container.appendChild(renderer.domElement);

    // --- 2. Procedural Textures ---
    // Soft glowing star texture generator
    const createStarTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(224, 215, 255, 0.9)');
      gradient.addColorStop(0.45, 'rgba(168, 85, 247, 0.4)');
      gradient.addColorStop(0.7, 'rgba(126, 34, 206, 0.12)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      return texture;
    };

    // Soft nebula puff texture generator
    const createNebulaTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(217, 70, 239, 0.8)');
      gradient.addColorStop(0.3, 'rgba(147, 51, 234, 0.4)');
      gradient.addColorStop(0.6, 'rgba(59, 130, 246, 0.15)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      return texture;
    };

    const starTexture = createStarTexture();
    const nebulaTexture = createNebulaTexture();

    // --- 3. Galaxy Spiral Points ---
    const galaxyGroup = new THREE.Group();
    scene.add(galaxyGroup);

    // Particle count based on setting
    const countMap = { low: 25000, medium: 45000, high: 65000 };
    const starsCount = countMap[starDensity] || 55000;
    const branches = 3;
    const radius = 7.5;
    const spin = 1.25;

    const positions = new Float32Array(starsCount * 3);
    const colors = new Float32Array(starsCount * 3);
    const sizes = new Float32Array(starsCount);

    // Palette:
    const colorCore = new THREE.Color('#fff7ed'); // warm white/cream
    const colorInner = new THREE.Color('#c084fc'); // luminous violet
    const colorArm = new THREE.Color('#818cf8'); // indigo blue
    const colorOuter = new THREE.Color('#e879f9'); // magenta
    const colorDeep = new THREE.Color('#38bdf8'); // sky blue accents

    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      // Exponential distribution towards center
      const r = Math.pow(Math.random(), 2.1) * radius;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = r * spin;

      // Realistic dispersion: tighter near center, spreading out along disk
      const randomSpread = 0.45 * Math.pow(r / radius, 0.8);
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * randomSpread;
      // Disk height decays outward
      const diskHeight = (1 - Math.pow(r / radius, 1.8)) * 0.5 + 0.1;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * diskHeight;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * randomSpread;

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      // Color gradation
      const mixedColor = new THREE.Color();
      const normRadius = r / radius;

      if (normRadius < 0.2) {
        mixedColor.copy(colorCore).lerp(colorInner, normRadius / 0.2);
      } else if (normRadius < 0.55) {
        mixedColor.copy(colorInner).lerp(colorArm, (normRadius - 0.2) / 0.35);
      } else {
        const t = (normRadius - 0.55) / 0.45;
        mixedColor.copy(colorArm).lerp(Math.random() > 0.4 ? colorOuter : colorDeep, t);
      }

      // Add occasional bright blue supergiant or golden star
      if (Math.random() < 0.03) {
        mixedColor.set(Math.random() > 0.5 ? '#67e8f9' : '#fef08a');
      }

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      // Sizes: stars near core are brighter/larger, some outer beacons
      const baseSize = 0.04 + Math.random() * 0.05;
      sizes[i] = normRadius < 0.15 ? baseSize * 1.8 : baseSize;
    }

    const galaxyGeometry = new THREE.BufferGeometry();
    galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    galaxyGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const galaxyMaterial = new THREE.PointsMaterial({
      size: 0.14,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      map: starTexture,
      transparent: true,
      opacity: 0.92,
    });

    const galaxyPoints = new THREE.Points(galaxyGeometry, galaxyMaterial);
    galaxyGroup.add(galaxyPoints);

    // --- 4. Interstellar Nebula Clouds (Dust Lanes) ---
    const nebulaCount = 1200;
    const nebulaPositions = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);

    const nebulaViolet = new THREE.Color('#9333ea');
    const nebulaMagenta = new THREE.Color('#db2777');
    const nebulaCyan = new THREE.Color('#0284c7');

    for (let i = 0; i < nebulaCount; i++) {
      const i3 = i * 3;
      const r = Math.pow(Math.random(), 1.5) * (radius * 0.85) + 0.5;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = r * spin + 0.15; // slightly offset from star arms

      const spread = 0.7;
      const randomX = (Math.random() - 0.5) * spread;
      const randomY = (Math.random() - 0.5) * 0.25;
      const randomZ = (Math.random() - 0.5) * spread;

      nebulaPositions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      nebulaPositions[i3 + 1] = randomY;
      nebulaPositions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      const pickColor = new THREE.Color();
      const rand = Math.random();
      if (rand < 0.45) {
        pickColor.copy(nebulaViolet);
      } else if (rand < 0.8) {
        pickColor.copy(nebulaMagenta);
      } else {
        pickColor.copy(nebulaCyan);
      }

      nebulaColors[i3] = pickColor.r;
      nebulaColors[i3 + 1] = pickColor.g;
      nebulaColors[i3 + 2] = pickColor.b;
    }

    const nebulaGeometry = new THREE.BufferGeometry();
    nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
    nebulaGeometry.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));

    const nebulaMaterial = new THREE.PointsMaterial({
      size: 1.8,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      map: nebulaTexture,
      transparent: true,
      opacity: 0.16,
    });

    const nebulaPoints = new THREE.Points(nebulaGeometry, nebulaMaterial);
    galaxyGroup.add(nebulaPoints);

    // --- 5. Galactic Core Luminous Aura ---
    const coreGlowGeo = new THREE.BufferGeometry();
    const coreCount = 180;
    const corePos = new Float32Array(coreCount * 3);
    const coreCols = new Float32Array(coreCount * 3);

    for (let i = 0; i < coreCount; i++) {
      const i3 = i * 3;
      const r = Math.pow(Math.random(), 2.5) * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      corePos[i3] = r * Math.cos(phi) * Math.cos(theta);
      corePos[i3 + 1] = r * Math.sin(phi) * 0.4;
      corePos[i3 + 2] = r * Math.cos(phi) * Math.sin(theta);

      const c = new THREE.Color('#fdf4ff').lerp(new THREE.Color('#d946ef'), r / 1.2);
      coreCols[i3] = c.r;
      coreCols[i3 + 1] = c.g;
      coreCols[i3 + 2] = c.b;
    }

    coreGlowGeo.setAttribute('position', new THREE.BufferAttribute(corePos, 3));
    coreGlowGeo.setAttribute('color', new THREE.BufferAttribute(coreCols, 3));

    const coreGlowMat = new THREE.PointsMaterial({
      size: 0.9,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      map: nebulaTexture,
      transparent: true,
      opacity: 0.45,
    });

    const coreGlowPoints = new THREE.Points(coreGlowGeo, coreGlowMat);
    galaxyGroup.add(coreGlowPoints);

    // --- 6. Deep Cosmic Background Starfield ---
    const bgStarCount = 3500;
    const bgPositions = new Float32Array(bgStarCount * 3);
    const bgColors = new Float32Array(bgStarCount * 3);

    for (let i = 0; i < bgStarCount; i++) {
      const i3 = i * 3;
      // Spherical shell distribution far away
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const dist = 32 + Math.random() * 25;

      bgPositions[i3] = dist * Math.sin(phi) * Math.cos(theta);
      bgPositions[i3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      bgPositions[i3 + 2] = dist * Math.cos(phi);

      const c = new THREE.Color('#ffffff');
      const tint = Math.random();
      if (tint < 0.25) c.set('#c084fc'); // violet
      else if (tint < 0.45) c.set('#93c5fd'); // blue
      else if (tint < 0.55) c.set('#fde047'); // yellow

      bgColors[i3] = c.r;
      bgColors[i3 + 1] = c.g;
      bgColors[i3 + 2] = c.b;
    }

    const bgGeometry = new THREE.BufferGeometry();
    bgGeometry.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));
    bgGeometry.setAttribute('color', new THREE.BufferAttribute(bgColors, 3));

    const bgMaterial = new THREE.PointsMaterial({
      size: 0.12,
      sizeAttenuation: true,
      vertexColors: true,
      map: starTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const bgStars = new THREE.Points(bgGeometry, bgMaterial);
    scene.add(bgStars);

    // Initial slight tilt of the galaxy plane for cinematic framing
    galaxyGroup.rotation.x = 0.45;
    galaxyGroup.rotation.z = -0.15;

    // --- 7. Pointer and Touch Interaction ---
    const handlePointerMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth) * 2 - 1;
        const y = -(touch.clientY / window.innerHeight) * 2 + 1;
        mouseRef.current.targetX = x * 0.7;
        mouseRef.current.targetY = y * 0.7;
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // --- 8. Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // --- 9. Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isVisible = true;

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) clock.start();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;
      const delta = clock.getDelta();

      // Smooth pointer damping (lerp)
      const lerpFactor = reducedMotion ? 0.01 : 0.045;
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * lerpFactor;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * lerpFactor;

      // Base rotation (slow, non-distracting)
      if (!reducedMotion) {
        const rotSpeed = 0.05 * speedMultiplier;
        galaxyGroup.rotation.y += delta * rotSpeed;
        bgStars.rotation.y -= delta * (rotSpeed * 0.08);
      }

      // Parallax tilt on galaxy group from pointer
      if (!reducedMotion) {
        const tiltX = 0.45 + mouseRef.current.y * 0.18;
        const tiltZ = -0.15 + mouseRef.current.x * 0.22;
        galaxyGroup.rotation.x += (tiltX - galaxyGroup.rotation.x) * 0.05;
        galaxyGroup.rotation.z += (tiltZ - galaxyGroup.rotation.z) * 0.05;
      }

      // Smooth camera transition to target sector
      camera.position.lerp(cameraPosTargetRef.current, 0.035);
      const currentLookAt = cameraTargetRef.current;
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
    };

    animate();

    // --- 10. Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Three.js resources
      galaxyGeometry.dispose();
      galaxyMaterial.dispose();
      nebulaGeometry.dispose();
      nebulaMaterial.dispose();
      coreGlowGeo.dispose();
      coreGlowMat.dispose();
      bgGeometry.dispose();
      bgMaterial.dispose();
      starTexture.dispose();
      nebulaTexture.dispose();
      renderer.dispose();
    };
  }, [reducedMotion, speedMultiplier, starDensity]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ touchAction: 'none' }}
      aria-hidden="true"
    />
  );
};
