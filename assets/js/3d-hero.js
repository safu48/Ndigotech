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

    // 1. Scene, Camera & Renderer Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 4.5, 15);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. High Contrast Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x0ea5e9, 2.2);
    keyLight.position.set(8, 14, 10);
    scene.add(keyLight);

    const emeraldRim = new THREE.DirectionalLight(0x10b981, 1.8);
    emeraldRim.position.set(-10, 8, -6);
    scene.add(emeraldRim);

    const laserLight = new THREE.PointLight(0x10b981, 2.5, 9);
    laserLight.position.set(0, 1.8, 0);
    scene.add(laserLight);

    // 3. Helper for CAD Edge Lines
    function addEdgeLines(mesh, color = 0x334155) {
      try {
        const edges = new THREE.EdgesGeometry(mesh.geometry, 28);
        const lineMat = new THREE.LineBasicMaterial({ color: color, linewidth: 1, transparent: true, opacity: 0.5 });
        const lines = new THREE.LineSegments(edges, lineMat);
        mesh.add(lines);
      } catch (e) {}
    }

    // 4. Procedural CAD Marker Paper Texture for Hero Plotter
    function createHeroMarkerTexture() {
      const cv = document.createElement('canvas');
      cv.width = 1024;
      cv.height = 512;
      const ctx = cv.getContext('2d');

      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, 1024, 512);

      // Border and ruler marks
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.strokeRect(12, 12, 1000, 488);

      // Grid guide dots
      ctx.fillStyle = '#cbd5e1';
      for (let x = 24; x < 1024; x += 48) {
        for (let y = 24; y < 512; y += 48) {
          ctx.fillRect(x, y, 2, 2);
        }
      }

      // Garment pattern contours
      function drawPattern(pts, name, strokeCol) {
        ctx.beginPath();
        pts.forEach((p, i) => { if (i === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]); });
        ctx.closePath();
        ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
        ctx.fill();
        ctx.strokeStyle = strokeCol;
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(name, pts[0][0] + 10, pts[0][1] + 35);
      }

      drawPattern([[40, 50], [200, 50], [220, 150], [190, 420], [110, 430], [50, 360]], 'PANTS_FRONT #01', '#0369a1');
      drawPattern([[240, 45], [400, 45], [420, 160], [380, 440], [300, 450], [250, 380]], 'PANTS_BACK #02', '#0369a1');
      drawPattern([[450, 60], [600, 60], [620, 160], [590, 400], [460, 400]], 'JACKET_BODY #03', '#059669');
      drawPattern([[650, 60], [750, 40], [850, 60], [830, 260], [670, 260]], 'SLEEVE_L #04', '#0f172a');

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('NDIGO CAD HIGH-SPEED PLOTTER • 220CM INDUSTRIAL BED', 50, 480);

      const tex = new THREE.CanvasTexture(cv);
      tex.anisotropy = 4;
      return tex;
    }

    // 5. 3D Plotter Machine Group (Shifted & Scaled to be clearly visible)
    const plotterGroup = new THREE.Group();
    plotterGroup.position.set(1.8, -0.6, -1.0);
    plotterGroup.scale.set(0.95, 0.95, 0.95);
    plotterGroup.rotation.y = -0.32;
    plotterGroup.rotation.x = 0.16;
    scene.add(plotterGroup);

    // Machine Stand & Body Materials
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25
    });

    const emeraldAccentMat = new THREE.MeshStandardMaterial({
      color: 0x059669,
      metalness: 0.65,
      roughness: 0.3
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.95,
      roughness: 0.08
    });

    // Plotter Main Table Bed
    const bedGeo = new THREE.BoxGeometry(8.5, 0.3, 3.2);
    const bedMesh = new THREE.Mesh(bedGeo, darkMetalMat);
    bedMesh.position.y = 0;
    addEdgeLines(bedMesh);
    plotterGroup.add(bedMesh);

    // Printed CAD Garment Paper Surface
    const paperGeo = new THREE.PlaneGeometry(7.9, 2.7);
    const paperMesh = new THREE.Mesh(paperGeo, new THREE.MeshStandardMaterial({
      map: createHeroMarkerTexture(),
      roughness: 0.8,
      metalness: 0.05
    }));
    paperMesh.rotation.x = -Math.PI / 2;
    paperMesh.position.y = 0.16;
    plotterGroup.add(paperMesh);

    // Legs / Stands
    const legGeo = new THREE.BoxGeometry(0.35, 2.8, 2.2);
    const leftLeg = new THREE.Mesh(legGeo, darkMetalMat);
    leftLeg.position.set(-3.8, -1.4, 0);
    const rightLeg = leftLeg.clone();
    rightLeg.position.x = 3.8;
    addEdgeLines(leftLeg); addEdgeLines(rightLeg);
    plotterGroup.add(leftLeg, rightLeg);

    // Lower Cross-Brace Bar
    const crossBar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 7.6, 16), chromeMat);
    crossBar.rotateZ(Math.PI / 2);
    crossBar.position.set(0, -1.8, 0);
    plotterGroup.add(crossBar);

    // Kraft Paper Roll
    const rollGeo = new THREE.CylinderGeometry(0.25, 0.25, 7.6, 32);
    rollGeo.rotateZ(Math.PI / 2);
    const rollMesh = new THREE.Mesh(rollGeo, new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7 }));
    rollMesh.position.set(0, -1.2, -0.4);
    plotterGroup.add(rollMesh);

    // Plotter Rail / Gantry (Polished Chrome)
    const railGeo = new THREE.CylinderGeometry(0.08, 0.08, 8.2, 16);
    railGeo.rotateZ(Math.PI / 2);
    const rail1 = new THREE.Mesh(railGeo, chromeMat);
    rail1.position.set(0, 0.85, -0.4);
    const rail2 = rail1.clone();
    rail2.position.set(0, 0.85, 0.4);
    plotterGroup.add(rail1, rail2);

    // Gantry Side Towers
    const towerGeo = new THREE.BoxGeometry(0.6, 1.2, 1.4);
    const leftTower = new THREE.Mesh(towerGeo, emeraldAccentMat);
    leftTower.position.set(-4.0, 0.6, 0);
    const rightTower = leftTower.clone();
    rightTower.position.x = 4.0;
    addEdgeLines(leftTower, 0x047857); addEdgeLines(rightTower, 0x047857);
    plotterGroup.add(leftTower, rightTower);

    // Moving Printhead Carriage Assembly
    const carriageGroup = new THREE.Group();
    carriageGroup.position.set(0, 0.85, 0);
    plotterGroup.add(carriageGroup);

    const carriageBoxGeo = new THREE.BoxGeometry(1.2, 0.75, 1.0);
    const carriageBox = new THREE.Mesh(carriageBoxGeo, emeraldAccentMat);
    addEdgeLines(carriageBox, 0x047857);
    carriageGroup.add(carriageBox);

    // Dual HP45 Head blocks
    const hpHeadGeo = new THREE.BoxGeometry(0.24, 0.48, 0.32);
    const hpMat = new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.3 });
    const head1 = new THREE.Mesh(hpHeadGeo, hpMat);
    head1.position.set(-0.24, -0.4, 0);
    const head2 = head1.clone();
    head2.position.x = 0.24;
    carriageGroup.add(head1, head2);

    // Laser / Ink Spray Guide Line
    const laserMat = new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 2.5, transparent: true, opacity: 0.9 });
    const laserPoints = [new THREE.Vector3(0, -0.6, 0), new THREE.Vector3(0, -0.85, 0)];
    const laserGeo = new THREE.BufferGeometry().setFromPoints(laserPoints);
    const laserLine = new THREE.Line(laserGeo, laserMat);
    carriageGroup.add(laserLine);

    // 6. Floating 3D CAD Garment Patterns
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
      const lineMat = new THREE.LineBasicMaterial({ color: color, linewidth: 2.5, transparent: true, opacity: 0.85 });
      const line = new THREE.LineSegments(edges, lineMat);
      line.position.set(x, y, z);
      line.scale.set(scale, scale, scale);
      return line;
    }

    // Pattern 1: Garment Bodice Contour
    const bodicePts = [[-1.2, 0], [-1.4, 1.8], [-0.7, 2.3], [0, 1.8], [0.7, 2.3], [1.4, 1.8], [1.2, 0], [0, 0.2]];
    const cadBodice = createCADWireframe(bodicePts, 0x0284c7, -5.2, 1.6, 1.5, 0.95);
    cadGroup.add(cadBodice);

    // Pattern 2: Sleeve Curved Pattern
    const sleevePts = [[-1.5, 0], [-1.2, 1.4], [-0.5, 1.9], [0.5, 1.9], [1.2, 1.4], [1.5, 0], [0, 0.1]];
    const cadSleeve = createCADWireframe(sleevePts, 0x4f46e5, 5.2, 2.8, -1.8, 0.9);
    cadGroup.add(cadSleeve);

    // Pattern 3: Footwear Pattern Sole & Upper
    const shoePts = [[-1.8, 0], [-1.2, 0.8], [0.4, 0.8], [1.8, 0.3], [1.6, -0.4], [0, -0.4], [-1.6, -0.2]];
    const cadFootwear = createCADWireframe(shoePts, 0x059669, -3.8, 3.8, -2.5, 0.8);
    cadGroup.add(cadFootwear);

    // 7. Tech Particle Grid Field
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x0284c7); // Cyan
    const c2 = new THREE.Color(0x4f46e5); // Indigo Tech
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
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // 8. Interactive Mouse Motion & Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 4.5;

    function onMouseMove(e) {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX = normX * 1.5;
      mouseY = normY * 1.0;
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // 9. Animation Loop with Intersection Observer
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

      laserLight.position.x = carriageGroup.position.x + 1.8;
      laserLine.scale.y = 0.8 + Math.sin(elapsedTime * 20) * 0.2;

      // Floating CAD Patterns
      cadBodice.rotation.y = elapsedTime * 0.4;
      cadBodice.position.y = 1.6 + Math.sin(elapsedTime * 1.2) * 0.3;

      cadSleeve.rotation.y = -elapsedTime * 0.35;
      cadSleeve.rotation.z = Math.sin(elapsedTime * 0.8) * 0.2;
      cadSleeve.position.y = 2.8 + Math.cos(elapsedTime * 1.5) * 0.35;

      cadFootwear.rotation.x = elapsedTime * 0.3;
      cadFootwear.rotation.y = elapsedTime * 0.5;

      // Particle Field gentle drift
      particleField.rotation.y = elapsedTime * 0.03;

      // Camera Parallax
      targetCameraX = mouseX * 2.2;
      targetCameraY = 4.5 + mouseY * 1.2;
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
