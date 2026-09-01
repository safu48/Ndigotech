/**
 * NDIGO TECH SOLUTIONS - Interactive 3D Hero Studio
 * Powered by Three.js (WebGL). Features procedural 3D Plotter with moving carriage,
 * sweeping laser beam, floating CAD pattern wireframes, and cursor-reactive particle field.
 */

(function () {
  'use strict';

  function initHero3D() {
    const container = document.getElementById('hero-3d-canvas');
    if (!container || typeof THREE === 'undefined') return;

    let width = container.clientWidth || (container.parentElement ? container.parentElement.clientWidth : 0) || window.innerWidth || 1200;
    let height = container.clientHeight || (container.parentElement ? container.parentElement.clientHeight : 0) || 520;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0f1d, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 16);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x0ea5e9, 2.0);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf59e0b, 1.2);
    fillLight.position.set(-10, 8, -5);
    scene.add(fillLight);

    const laserLight = new THREE.PointLight(0x10b981, 2, 8);
    laserLight.position.set(0, 1.5, 0);
    scene.add(laserLight);

    // 3. 3D Plotter Machine Group
    const plotterGroup = new THREE.Group();
    plotterGroup.position.set(2, -1.2, 0);
    plotterGroup.rotation.y = -0.35;
    plotterGroup.rotation.x = 0.15;
    scene.add(plotterGroup);

    // Machine Stand & Body
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25
    });

    const blueAccentMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.7,
      roughness: 0.3
    });

    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      metalness: 0.1,
      roughness: 0.4
    });

    const paperMat = new THREE.MeshStandardMaterial({
      color: 0xfffbeb,
      metalness: 0.05,
      roughness: 0.85
    });

    // Plotter Main Table / Bed
    const bedGeo = new THREE.BoxGeometry(8.5, 0.3, 3.2);
    const bedMesh = new THREE.Mesh(bedGeo, darkMetalMat);
    bedMesh.position.y = 0;
    plotterGroup.add(bedMesh);

    // Paper Surface on Bed
    const paperGeo = new THREE.PlaneGeometry(7.8, 2.6);
    const paperMesh = new THREE.Mesh(paperGeo, paperMat);
    paperMesh.rotation.x = -Math.PI / 2;
    paperMesh.position.y = 0.16;
    plotterGroup.add(paperMesh);

    // Legs / Stands
    const legMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 });
    const legGeo = new THREE.BoxGeometry(0.35, 2.8, 2.2);
    const leftLeg = new THREE.Mesh(legGeo, legMat);
    leftLeg.position.set(-3.8, -1.4, 0);
    const rightLeg = leftLeg.clone();
    rightLeg.position.x = 3.8;
    plotterGroup.add(leftLeg, rightLeg);

    // Plotter Rail / Gantry
    const railGeo = new THREE.CylinderGeometry(0.08, 0.08, 8.2, 16);
    railGeo.rotateZ(Math.PI / 2);
    const rail1 = new THREE.Mesh(railGeo, blueAccentMat);
    rail1.position.set(0, 0.85, -0.4);
    const rail2 = rail1.clone();
    rail2.position.set(0, 0.85, 0.4);
    plotterGroup.add(rail1, rail2);

    // Gantry Side Towers
    const towerGeo = new THREE.BoxGeometry(0.6, 1.2, 1.4);
    const leftTower = new THREE.Mesh(towerGeo, darkMetalMat);
    leftTower.position.set(-4.0, 0.6, 0);
    const rightTower = leftTower.clone();
    rightTower.position.x = 4.0;
    plotterGroup.add(leftTower, rightTower);

    // Moving Printhead / Cutter Carriage Assembly
    const carriageGroup = new THREE.Group();
    carriageGroup.position.set(0, 0.85, 0);
    plotterGroup.add(carriageGroup);

    const carriageBoxGeo = new THREE.BoxGeometry(1.1, 0.7, 1.0);
    const carriageBox = new THREE.Mesh(carriageBoxGeo, blueAccentMat);
    carriageGroup.add(carriageBox);

    // Dual HP45 Head blocks
    const hpHeadGeo = new THREE.BoxGeometry(0.22, 0.45, 0.3);
    const hpMat = new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.3 });
    const head1 = new THREE.Mesh(hpHeadGeo, hpMat);
    head1.position.set(-0.2, -0.4, 0);
    const head2 = head1.clone();
    head2.position.x = 0.2;
    carriageGroup.add(head1, head2);

    // Laser / Ink Spray Effect Line
    const laserMat = new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 2, transparent: true, opacity: 0.85 });
    const laserPoints = [new THREE.Vector3(0, -0.6, 0), new THREE.Vector3(0, -0.85, 0)];
    const laserGeo = new THREE.BufferGeometry().setFromPoints(laserPoints);
    const laserLine = new THREE.Line(laserGeo, laserMat);
    carriageGroup.add(laserLine);

    // 4. Floating 3D CAD Garment Patterns
    const cadGroup = new THREE.Group();
    scene.add(cadGroup);

    function createCADWireframe(points, color, x, y, z, scale = 1) {
      const shape = new THREE.Shape();
      points.forEach((pt, i) => {
        if (i === 0) shape.moveTo(pt[0], pt[1]);
        else shape.lineTo(pt[0], pt[1]);
      });
      shape.closePath();

      const edges = new THREE.EdgesGeometry(new THREE.ShapeGeometry(shape));
      const lineMat = new THREE.LineBasicMaterial({ color: color, linewidth: 2, transparent: true, opacity: 0.75 });
      const line = new THREE.LineSegments(edges, lineMat);
      line.position.set(x, y, z);
      line.scale.set(scale, scale, scale);
      return line;
    }

    // Pattern 1: Garment Bodice Contour
    const bodicePts = [[-1.2, 0], [-1.4, 1.8], [-0.7, 2.3], [0, 1.8], [0.7, 2.3], [1.4, 1.8], [1.2, 0], [0, 0.2]];
    const cadBodice = createCADWireframe(bodicePts, 0x38bdf8, -4.5, 1.2, 2, 0.9);
    cadGroup.add(cadBodice);

    // Pattern 2: Sleeve Curved Pattern
    const sleevePts = [[-1.5, 0], [-1.2, 1.4], [-0.5, 1.9], [0.5, 1.9], [1.2, 1.4], [1.5, 0], [0, 0.1]];
    const cadSleeve = createCADWireframe(sleevePts, 0xf59e0b, 5.0, 2.5, -2, 0.85);
    cadGroup.add(cadSleeve);

    // Pattern 3: Footwear Pattern Sole & Upper
    const shoePts = [[-1.8, 0], [-1.2, 0.8], [0.4, 0.8], [1.8, 0.3], [1.6, -0.4], [0, -0.4], [-1.6, -0.2]];
    const cadFootwear = createCADWireframe(shoePts, 0x10b981, -3.2, 3.8, -3, 0.75);
    cadGroup.add(cadFootwear);

    // 5. Tech Particle Grid Field
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x38bdf8); // Cyan
    const c2 = new THREE.Color(0xf59e0b); // Amber
    const c3 = new THREE.Color(0x10b981); // Emerald

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 35;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 25;

      const pickColor = Math.random() > 0.6 ? c1 : (Math.random() > 0.3 ? c2 : c3);
      colors[i3] = pickColor.r;
      colors[i3 + 1] = pickColor.g;
      colors[i3 + 2] = pickColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // 6. Interactive Mouse Motion & Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 5;

    function onMouseMove(e) {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX = normX * 1.5;
      mouseY = normY * 1.0;
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // 7. Animation Loop with Intersection Observer for 60FPS efficiency
    let carriageDir = 1;
    let clock = new THREE.Clock();
    let isVisible = true;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.1 });

    observer.observe(container);

    function animate() {
      requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Carriage Motion (Plotting back and forth)
      carriageGroup.position.x += carriageDir * 3.8 * delta;
      if (carriageGroup.position.x > 3.2) {
        carriageGroup.position.x = 3.2;
        carriageDir = -1;
      } else if (carriageGroup.position.x < -3.2) {
        carriageGroup.position.x = -3.2;
        carriageDir = 1;
      }

      laserLight.position.x = carriageGroup.position.x;
      laserLine.scale.y = 0.8 + Math.sin(elapsedTime * 20) * 0.2;

      // Floating CAD Patterns
      cadBodice.rotation.y = elapsedTime * 0.4;
      cadBodice.position.y = 1.2 + Math.sin(elapsedTime * 1.2) * 0.3;

      cadSleeve.rotation.y = -elapsedTime * 0.35;
      cadSleeve.rotation.z = Math.sin(elapsedTime * 0.8) * 0.2;
      cadSleeve.position.y = 2.5 + Math.cos(elapsedTime * 1.5) * 0.35;

      cadFootwear.rotation.x = elapsedTime * 0.3;
      cadFootwear.rotation.y = elapsedTime * 0.5;

      // Particle Field gentle drift
      particleField.rotation.y = elapsedTime * 0.03;

      // Camera Parallax
      targetCameraX = mouseX * 2.5;
      targetCameraY = 5 + mouseY * 1.5;
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.lookAt(0, 0.5, 0);

      renderer.render(scene, camera);
    }

    animate();

    // Window Resize Handler
    function onResize() {
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 480;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener('resize', onResize);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHero3D);
  } else {
    initHero3D();
  }

  window.initHero3D = initHero3D;
})();
