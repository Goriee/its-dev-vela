import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import './ModelViewer3D.css';

/**
 * ModelViewer3D: Interactive 3D Canvas component
 * Loads mymodel.glb using Three.js with MeshoptDecoder decompression,
 * OrbitControls, floating idle physics, and theme-reactive lighting.
 */
const ModelViewer3D = ({ modelUrl = '/models/mymodel.glb', className = '' }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const modelGroupRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const isVisibleRef = useRef(true);
  const isLoadedRef = useRef(false);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError] = useState(() => {
    if (typeof document === 'undefined') return null;
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
    return gl ? null : 'WebGL is not supported in this browser.';
  });
  const [autoRotate, setAutoRotate] = useState(false);
  const [userInteracting, setUserInteracting] = useState(false);

  // Sync autoRotate state to OrbitControls without re-mounting the scene
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // Toggle Auto-Rotation
  const handleToggleAutoRotate = () => {
    setAutoRotate(prev => !prev);
  };

  // Reset Camera and Model Orientation to default front-facing profile
  const handleResetCamera = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current || !modelGroupRef.current) return;
    cameraRef.current.position.set(0, 0.35, 2.3);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
    modelGroupRef.current.rotation.set(0, -Math.PI / 2, 0);
  }, []);

  useEffect(() => {
    if (loadError) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 2.3);
    cameraRef.current = camera;

    // 3. Renderer with high-DPI support and transparency
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    // 4. OrbitControls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enableZoom = true;
    controls.minDistance = 1.2;
    controls.maxDistance = 4.0;
    controls.maxPolarAngle = Math.PI / 1.75;
    controls.minPolarAngle = Math.PI / 6;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 1.6;

    controls.addEventListener('start', () => setUserInteracting(true));
    controls.addEventListener('end', () => setUserInteracting(false));
    controlsRef.current = controls;

    // 5. Lighting Setup (Cyberpunk / Modern Developer Studio)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Key Light (warm white / violet)
    const keyLight = new THREE.DirectionalLight(0xf8fafc, 2.2);
    keyLight.position.set(4, 6, 4);
    scene.add(keyLight);

    // Fill Light (cyan / blue)
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    fillLight.position.set(-5, 2, -2);
    scene.add(fillLight);

    // Rim / Edge Light (indigo / purple accent)
    const rimLight = new THREE.DirectionalLight(0x818cf8, 2.0);
    rimLight.position.set(0, -3, -4);
    scene.add(rimLight);

    // 6. Model Loader with MeshoptDecoder
    const modelGroup = new THREE.Group();
    modelGroup.rotation.y = -Math.PI / 2;
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);

    loader.load(
      modelUrl,
      (gltf) => {
        const root = gltf.scene;

        // Auto-center and normalize scale to unit box
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z) || 1;
        const targetScale = 1.35 / maxDimension;

        root.scale.setScalar(targetScale);
        root.position.x = -center.x * targetScale;
        root.position.y = -center.y * targetScale;
        root.position.z = -center.z * targetScale;

        // Optimize materials & shadows
        root.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              child.material.roughness = Math.min(child.material.roughness ?? 0.5, 0.85);
            }
          }
        });

        modelGroup.add(root);
        isLoadedRef.current = true;
        setIsLoaded(true);
        setLoadingProgress(100);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadingProgress(percent);
        } else {
          // Approximate progress if Content-Length header is omitted
          setLoadingProgress(prev => Math.min(prev + 10, 90));
        }
      },
      (err) => {
        console.error('Error loading 3D model:', err);
      }
    );

    // 7. Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // 8. Intersection Observer to pause loop when off-screen
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(container);

    // 9. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const elapsedTime = clock.getElapsedTime();

      // Gentle floating oscillation on the model
      if (modelGroupRef.current && isLoadedRef.current) {
        modelGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.04;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 10. Cleanup
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      controls.dispose();

      // Dispose Three.js objects
      if (modelGroupRef.current) {
        modelGroupRef.current.traverse((child) => {
          if (child.isMesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach(m => m.dispose());
            } else {
              child.material?.dispose();
            }
          }
        });
      }
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelUrl]);

  return (
    <div className={`model-viewer ${className}`} ref={containerRef} aria-label="3D Interactive Model Viewer">
      {/* Background ambient lighting pulse */}
      <div className="model-viewer__glow" aria-hidden="true" />

      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="model-viewer__canvas" />

      {/* Loading Screen with Progress Bar */}
      {!isLoaded && !loadError && (
        <div className="model-viewer__loader" role="status" aria-live="polite">
          <div className="model-viewer__loader-spinner" />
          <span className="model-viewer__loader-text">Loading 3D Experience</span>
          <div className="model-viewer__loader-track">
            <div 
              className="model-viewer__loader-bar" 
              style={{ width: `${loadingProgress}%` }} 
            />
          </div>
          <span className="model-viewer__loader-percent">{loadingProgress}%</span>
        </div>
      )}

      {/* Error Fallback */}
      {loadError && (
        <div className="model-viewer__error" role="alert">
          <span className="model-viewer__error-icon">⚠️</span>
          <p className="model-viewer__error-message">{loadError}</p>
        </div>
      )}

      {/* Floating Interactive Controls Bar */}
      {isLoaded && (
        <div className="model-viewer__controls" aria-label="3D Viewer Controls">
          <div className="model-viewer__hint">
            <span className="model-viewer__hint-dot" />
            <span>{userInteracting ? 'Interacting' : 'Drag to rotate • Scroll to zoom'}</span>
          </div>

          <div className="model-viewer__actions">
            <button
              type="button"
              className={`model-viewer__btn ${autoRotate ? 'model-viewer__btn--active' : ''}`}
              onClick={handleToggleAutoRotate}
              title={autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
              aria-label={autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              <span>{autoRotate ? 'Rotating' : 'Auto Rotate'}</span>
            </button>

            <button
              type="button"
              className="model-viewer__btn"
              onClick={handleResetCamera}
              title="Reset View"
              aria-label="Reset View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span>Reset</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

ModelViewer3D.propTypes = {
  modelUrl: PropTypes.string,
  className: PropTypes.string
};

export default ModelViewer3D;
