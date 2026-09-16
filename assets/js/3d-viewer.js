/**
 * NDIGO TECH SOLUTIONS - Interactive 360° 3D Machinery Inspection Stage
 * Powered by Three.js & OrbitControls. Enables full 360-degree rotation, zoom,
 * high-contrast Studio (Dark & Light), Blueprint CAD, and Laser Scan modes.
 */

(function () {
  'use strict';

  let scene, camera, renderer, controls;
  let currentModelGroup = null;
  let currentRenderMode = 'studio-dark'; // 'studio-dark', 'studio-light', 'blueprint', 'laser'
  let autoRotate = true;
  let animationFrameId = null;
  let laserPlane = null;
  let laserDirection = 1;
  let clock = new THREE.Clock();
  let hotspots = [];
  let lightsGroup = null;
  let turntableGroup = null;

  // Cached procedural textures
  let cachedPlotterTexture = null;
  let cachedCutterTexture = null;
  let cachedDigitizerTexture = null;

  // Hotspots definitions per model (Aligned with true grounded Y coordinates)
  const modelHotspots = {
    plotter: [
      { pos: [0, 3.3, 0.4], title: 'Dual HP45 Printheads', desc: 'Ready-stock HP45 ink heads delivering 300 DPI razor-sharp lines at 200 m²/hr with active laser guide alignment.' },
      { pos: [3.7, 2.9, 0], title: 'Brushless Servo Drive', desc: 'Ultra-quiet 36V DC brushless servo motor with optical raster encoder for micro-step carriage positioning.' },
      { pos: [0, 2.45, 0], title: 'Continuous Kraft Feed Bed', desc: 'Handles 40g to 300g Kraft paper without wrinkle or jamming, fed by heavy bottom roll spindle.' }
    ],
    cutter: [
      { pos: [0, 3.1, 0.3], title: 'Multi-Tool Cutting Head', desc: 'High-frequency oscillating knife (carbide tungsten) + creasing wheel + pattern pen for simultaneous cutting & labeling.' },
      { pos: [0, 2.25, 0], title: 'Vacuum Hold-Down Bed', desc: 'Multi-zone industrial suction table with honeycomb anti-static mat holding PVC, cardstock, & pattern boards flat.' },
      { pos: [-3.2, 2.85, 0], title: 'High-Rigidity Linear Gantry', desc: 'Hardened dual-axis linear guide rails with helical rack drive ensuring ±0.1mm repeat cutting precision.' }
    ],
    digitizer: [
      { pos: [0, 4.0, 0], title: 'High-Res Optical Camera', desc: 'Wide-angle industrial camera capturing complete pattern sets in 1 second with automatic lens distortion correction.' },
      { pos: [0, 2.1, 0], title: 'Magnetic Calibration Table', desc: '15° ergonomic tilt surface with high-contrast metric grid and magnetic pattern holding bars.' },
      { pos: [0, 3.7, 0], title: 'Shadowless Ring Illuminator', desc: 'Even 5500K daylight LED array eliminating shadows along garment pattern curves and notch marks.' }
    ],
    servo: [
      { pos: [0, 1.6, 0], title: 'Rare-Earth Rotor Core', desc: 'Neodymium magnets providing 3.5 N.m continuous dynamic torque with rapid start-stop acceleration.' },
      { pos: [-1.7, 1.6, 0], title: 'Optical Raster Encoder', desc: '2,500 CPR high-resolution optical encoder ensuring real-time closed-loop position feedback.' },
      { pos: [2.0, 1.6, 0], title: 'Precision Timing Pulley', desc: 'Machined steel drive pulley with keyed shaft coupling for direct-drive gantry synchronization.' }
    ]
  };

  /* -------------------------------------------------------------
     Procedural Canvas Textures (0 Network Request, High Contrast)
     ------------------------------------------------------------- */
  function getPlotterMarkerTexture() {
    if (cachedPlotterTexture) return cachedPlotterTexture;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Clean off-white Kraft paper base
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 1024, 512);

    // Subtle grid guide dots
    ctx.fillStyle = '#e2e8f0';
    for (let x = 20; x < 1024; x += 40) {
      for (let y = 20; y < 512; y += 40) {
        ctx.fillRect(x, y, 2, 2);
      }
    }

    // Ruler borders
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, 1004, 492);

    // Ticks on ruler
    ctx.fillStyle = '#64748b';
    ctx.font = '10px monospace';
    for (let x = 40; x < 1000; x += 80) {
      ctx.fillRect(x, 10, 1, 6);
      ctx.fillText((x / 10) + 'cm', x - 10, 24);
    }

    // Authentic Garment CAD Marker Patterns (Pants, Bodice, Sleeves, Collars)
    function drawPatternPiece(points, label, color) {
      ctx.beginPath();
      points.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt[0], pt[1]);
        else ctx.lineTo(pt[0], pt[1]);
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(5, 150, 105, 0.06)';
      ctx.fill();
      ctx.strokeStyle = color || '#0f172a';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Grainline arrow
      if (points.length >= 4) {
        const midX = (points[0][0] + points[2][0]) / 2;
        const midY = (points[0][1] + points[2][1]) / 2;
        ctx.beginPath();
        ctx.moveTo(midX - 25, midY);
        ctx.lineTo(midX + 25, midY);
        ctx.lineTo(midX + 18, midY - 4);
        ctx.moveTo(midX + 25, midY);
        ctx.lineTo(midX + 18, midY + 4);
        ctx.strokeStyle = '#059669';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(label, midX - 25, midY - 8);
      }
    }

    // Piece 1: Trouser Front (Left)
    drawPatternPiece([[40, 50], [180, 50], [210, 140], [190, 420], [120, 430], [50, 360], [60, 150]], 'PANTS_FRONT #01 [SZ: 32]', '#0369a1');

    // Piece 2: Trouser Back (Middle-Left)
    drawPatternPiece([[225, 45], [375, 45], [410, 160], [380, 440], [310, 450], [235, 380], [245, 160]], 'PANTS_BACK #02 [SZ: 32]', '#0369a1');

    // Piece 3: Jacket Bodice Panel (Middle-Right)
    drawPatternPiece([[430, 60], [560, 60], [580, 130], [620, 170], [600, 390], [450, 390], [435, 200]], 'JACKET_BODY_L [SZ: L]', '#047857');

    // Piece 4: Sleeve (Upper-Right)
    drawPatternPiece([[650, 60], [740, 40], [830, 60], [810, 240], [670, 240]], 'SLEEVE_OUTER #04', '#0f172a');

    // Piece 5: Collar & Pocket Facings (Bottom-Right)
    drawPatternPiece([[660, 280], [820, 280], [820, 350], [660, 350]], 'COLLAR_STAND #05', '#0f172a');
    drawPatternPiece([[660, 380], [820, 380], [800, 450], [680, 450]], 'POCKET_FLAP #06', '#047857');

    // Marker Header info text
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('NDIGO CAD SYSTEM v2026 • ORDER: BANGLA-TEX #8824 • EFFICIENCY: 88.4% • WIDTH: 220cm', 40, 485);

    cachedPlotterTexture = new THREE.CanvasTexture(canvas);
    cachedPlotterTexture.anisotropy = 4;
    return cachedPlotterTexture;
  }

  function getCutterBedTexture() {
    if (cachedCutterTexture) return cachedCutterTexture;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Dark industrial cutting mat
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 512, 512);

    // Grid lines (10cm increments)
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1.5;
    for (let x = 0; x <= 512; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0); ctx.lineTo(x, 512);
      ctx.stroke();
    }
    for (let y = 0; y <= 512; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y); ctx.lineTo(512, y);
      ctx.stroke();
    }

    // Major 50cm accent lines
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 2;
    for (let x = 0; x <= 512; x += 128) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 512); ctx.stroke();
    }
    for (let y = 0; y <= 512; y += 128) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke();
    }

    // Vacuum suction holes matrix
    ctx.fillStyle = '#020617';
    for (let x = 16; x < 512; x += 32) {
      for (let y = 16; y < 512; y += 32) {
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Metric markings along border
    ctx.fillStyle = '#94a3b8';
    ctx.font = '9px monospace';
    for (let x = 32; x < 500; x += 64) {
      ctx.fillText(x * 3 + 'mm', x - 12, 14);
    }

    cachedCutterTexture = new THREE.CanvasTexture(canvas);
    cachedCutterTexture.anisotropy = 4;
    return cachedCutterTexture;
  }

  function getDigitizerBoardTexture() {
    if (cachedDigitizerTexture) return cachedDigitizerTexture;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // High contrast matte slate
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 512, 512);

    // Fine calibration grid
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 512; i += 25.6) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 512); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke();
    }

    // 4 Optical Corner Targets (Bullseyes)
    function drawBullseye(x, y) {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(x, y, 18, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#10b981';
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(x - 24, y); ctx.lineTo(x + 24, y);
      ctx.moveTo(x, y - 24); ctx.lineTo(x + 24, y);
      ctx.stroke();
    }

    drawBullseye(36, 36);
    drawBullseye(476, 36);
    drawBullseye(36, 476);
    drawBullseye(476, 476);

    // Central pattern placement outline
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.strokeRect(100, 100, 312, 312);
    ctx.setLineDash([]);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('+ OPTICAL DIGITIZING TARGET FIELD +', 130, 260);

    cachedDigitizerTexture = new THREE.CanvasTexture(canvas);
    cachedDigitizerTexture.anisotropy = 4;
    return cachedDigitizerTexture;
  }

  /* -------------------------------------------------------------
     Main Viewer Initialization
     ------------------------------------------------------------- */
  function initMachineryViewer() {
    const container = document.getElementById('machinery-3d-viewport');
    if (!container || typeof THREE === 'undefined') return;

    const width = container.clientWidth || (container.parentElement ? container.parentElement.clientWidth : 0) || window.innerWidth || 800;
    const height = container.clientHeight || 540;

    // 1. Scene & Camera Setup
    scene = new THREE.Scene();
    updateSceneBackground();

    camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(5.5, 3.8, 8.5);

    // 2. Renderer Setup with Tone Mapping
    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Orbit Controls Setup
    if (typeof THREE.OrbitControls !== 'undefined') {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.target.set(0, 1.8, 0); // Focus at center height of machines
      controls.maxPolarAngle = Math.PI / 2 - 0.02; // Restrict camera from going below floor
      controls.minDistance = 3.5;
      controls.maxDistance = 18;
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 1.0;
    } else {
      // Mouse Orbit Fallback
      let isDragging = false;
      let prevMousePos = { x: 0, y: 0 };
      let spherical = { radius: 10.5, theta: 0.65, phi: 1.05 };

      function updateCameraFromSpherical() {
        spherical.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, spherical.phi));
        spherical.radius = Math.max(3.5, Math.min(18, spherical.radius));
        camera.position.x = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
        camera.position.y = 1.8 + spherical.radius * Math.cos(spherical.phi);
        camera.position.z = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
        camera.lookAt(0, 1.8, 0);
      }
      updateCameraFromSpherical();

      renderer.domElement.addEventListener('mousedown', (e) => {
        isDragging = true;
        prevMousePos = { x: e.clientX, y: e.clientY };
      });
      window.addEventListener('mouseup', () => { isDragging = false; });
      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - prevMousePos.x;
        const deltaY = e.clientY - prevMousePos.y;
        prevMousePos = { x: e.clientX, y: e.clientY };
        spherical.theta -= deltaX * 0.008;
        spherical.phi -= deltaY * 0.008;
        updateCameraFromSpherical();
      });
      renderer.domElement.addEventListener('wheel', (e) => {
        e.preventDefault();
        spherical.radius += e.deltaY * 0.01;
        updateCameraFromSpherical();
      }, { passive: false });
    }

    // 4. Lighting Rig
    setupStudioLighting();

    // 5. Ground Floor & Turntable (Top disc at Y = 0)
    setupFloorTurntable();

    // 6. Laser Scan Plane
    setupLaserScanPlane();

    // 7. Load Default Model (G-MAC Plotter)
    load3DModel('plotter');

    // 8. Bind UI Controls
    bindViewerControls(container);

    // 9. Start Animation Loop
    animateViewer();

    // Click outside hotspots to close tooltips
    container.addEventListener('click', () => {
      container.querySelectorAll('.hotspot-3d-pin').forEach(p => p.classList.remove('active-pin'));
    });

    // Window Resize Handler
    window.addEventListener('resize', () => {
      const w = container.clientWidth || (container.parentElement ? container.parentElement.clientWidth : 0) || window.innerWidth || 800;
      const h = container.clientHeight || 540;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }

  function updateSceneBackground() {
    if (!scene) return;
    if (currentRenderMode === 'studio-dark' || currentRenderMode === 'laser') {
      scene.background = new THREE.Color(0x0a0f1d); // Deep Obsidian Slate
    } else if (currentRenderMode === 'studio-light') {
      scene.background = new THREE.Color(0xe2e8f0); // Clean Slate
    } else if (currentRenderMode === 'blueprint') {
      scene.background = new THREE.Color(0x0c1938); // Blueprint Deep Blue
    }
  }

  function setupStudioLighting() {
    if (lightsGroup) scene.remove(lightsGroup);
    lightsGroup = new THREE.Group();

    // Ambient illumination
    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    lightsGroup.add(ambient);

    // Main Key Spot Light with shadow
    const mainSpot = new THREE.SpotLight(0xffffff, 2.0);
    mainSpot.position.set(10, 16, 10);
    mainSpot.angle = Math.PI / 4;
    mainSpot.penumbra = 0.4;
    mainSpot.castShadow = true;
    mainSpot.shadow.mapSize.width = 1024;
    mainSpot.shadow.mapSize.height = 1024;
    mainSpot.shadow.camera.near = 2;
    mainSpot.shadow.camera.far = 30;
    lightsGroup.add(mainSpot);

    // Tech Emerald Rim Light for silhouette edge pop
    const rimLight = new THREE.DirectionalLight(0x10b981, 1.8);
    rimLight.position.set(-10, 10, -10);
    lightsGroup.add(rimLight);

    // Soft Blue Fill Light
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.7);
    fillLight.position.set(10, 6, -8);
    lightsGroup.add(fillLight);

    // Front Eye Key Light
    const frontKey = new THREE.DirectionalLight(0xffffff, 0.85);
    frontKey.position.set(0, 8, 12);
    lightsGroup.add(frontKey);

    scene.add(lightsGroup);
  }

  function setupFloorTurntable() {
    if (turntableGroup) scene.remove(turntableGroup);
    turntableGroup = new THREE.Group();

    // Grid helper on the floor
    const grid = new THREE.GridHelper(26, 26, 0x10b981, 0x334155);
    grid.position.y = -0.001;
    grid.material.opacity = 0.25;
    grid.material.transparent = true;
    turntableGroup.add(grid);

    // Turntable Base Platform (Below Y = 0)
    const baseGeo = new THREE.CylinderGeometry(8.2, 8.5, 0.22, 64);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.35,
      metalness: 0.85
    });
    const basePlatform = new THREE.Mesh(baseGeo, baseMat);
    basePlatform.position.y = -0.15;
    basePlatform.receiveShadow = true;
    turntableGroup.add(basePlatform);

    // Precision Emerald Glowing Accent Ring
    const ringGeo = new THREE.TorusGeometry(8.1, 0.04, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const accentRing = new THREE.Mesh(ringGeo, ringMat);
    accentRing.rotation.x = Math.PI / 2;
    accentRing.position.y = 0.005;
    turntableGroup.add(accentRing);

    // Precision Calibrated Inspection Disc (Top surface sits at Y = 0 exactly)
    const topDiscGeo = new THREE.CylinderGeometry(7.8, 7.8, 0.08, 64);
    const topDiscMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.5,
      metalness: 0.4
    });
    const topDisc = new THREE.Mesh(topDiscGeo, topDiscMat);
    topDisc.position.y = -0.04;
    topDisc.receiveShadow = true;
    turntableGroup.add(topDisc);

    scene.add(turntableGroup);
  }

  function setupLaserScanPlane() {
    const laserGeo = new THREE.PlaneGeometry(8.5, 0.06);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    });
    laserPlane = new THREE.Mesh(laserGeo, laserMat);
    laserPlane.rotation.x = Math.PI / 2;
    laserPlane.position.set(0, 2.5, 0);
    laserPlane.visible = (currentRenderMode === 'laser');
    scene.add(laserPlane);
  }

  /* -------------------------------------------------------------
     Material Factory with Sharp Contrast & CAD Edge Outlines
     ------------------------------------------------------------- */
  function getMaterial(color, metalness, roughness) {
    if (currentRenderMode === 'blueprint') {
      return new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true
      });
    }
    return new THREE.MeshStandardMaterial({
      color: color,
      metalness: metalness !== undefined ? metalness : 0.6,
      roughness: roughness !== undefined ? roughness : 0.3
    });
  }

  function addEdgeLines(mesh, color = 0x334155, thresholdAngle = 30) {
    if (currentRenderMode === 'blueprint') return;
    try {
      const edges = new THREE.EdgesGeometry(mesh.geometry, thresholdAngle);
      const lineMat = new THREE.LineBasicMaterial({
        color: color,
        linewidth: 1,
        transparent: true,
        opacity: 0.45
      });
      const lines = new THREE.LineSegments(edges, lineMat);
      mesh.add(lines);
    } catch (e) {}
  }

  /* -------------------------------------------------------------
     Procedural 3D Machine Builders (All Resting Solidly at Y = 0)
     ------------------------------------------------------------- */

  // 1. G-MAC Garment Plotter (Height: 0 to 3.6, Width: 8.2)
  function buildPlotterModel() {
    const group = new THREE.Group();

    const frameMat = getMaterial(0x1e293b, 0.8, 0.25);
    const darkAccentMat = getMaterial(0x0f172a, 0.9, 0.2);
    const emeraldAccentMat = getMaterial(0x059669, 0.6, 0.3);
    const chromeMat = getMaterial(0xf1f5f9, 0.95, 0.08);
    const rollerMat = getMaterial(0x475569, 0.85, 0.2);
    const kraftMat = getMaterial(0xd97706, 0.2, 0.7);

    // Left & Right Stand Feet (resting on Y = 0)
    const footGeo = new THREE.BoxGeometry(0.6, 0.12, 2.4);
    const leftFoot = new THREE.Mesh(footGeo, darkAccentMat);
    leftFoot.position.set(-3.6, 0.06, 0);
    leftFoot.castShadow = true;
    leftFoot.receiveShadow = true;
    const rightFoot = leftFoot.clone();
    rightFoot.position.x = 3.6;
    addEdgeLines(leftFoot); addEdgeLines(rightFoot);
    group.add(leftFoot, rightFoot);

    // Upright Stand Columns (Y: 0.12 to 2.36)
    const legGeo = new THREE.BoxGeometry(0.35, 2.24, 1.2);
    const leftLeg = new THREE.Mesh(legGeo, frameMat);
    leftLeg.position.set(-3.6, 1.24, 0);
    leftLeg.castShadow = true;
    const rightLeg = leftLeg.clone();
    rightLeg.position.x = 3.6;
    addEdgeLines(leftLeg); addEdgeLines(rightLeg);
    group.add(leftLeg, rightLeg);

    // Lower Structural Cross-Truss Bar (Y = 0.7)
    const trussBar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 7.2, 16), chromeMat);
    trussBar.rotateZ(Math.PI / 2);
    trussBar.position.set(0, 0.7, 0);
    trussBar.castShadow = true;
    group.add(trussBar);

    // Bottom Kraft Paper Roll Spindle (Y = 1.15, Z = -0.35)
    const rollGeo = new THREE.CylinderGeometry(0.24, 0.24, 7.4, 32);
    rollGeo.rotateZ(Math.PI / 2);
    const paperRoll = new THREE.Mesh(rollGeo, kraftMat);
    paperRoll.position.set(0, 1.15, -0.35);
    paperRoll.castShadow = true;
    group.add(paperRoll);

    // Main Plotter Vacuum Feed Bed (Y = 2.4)
    const bedGeo = new THREE.BoxGeometry(8.2, 0.28, 3.2);
    const bed = new THREE.Mesh(bedGeo, frameMat);
    bed.position.set(0, 2.4, 0);
    bed.castShadow = true;
    bed.receiveShadow = true;
    addEdgeLines(bed);
    group.add(bed);

    // Authentic Garment Marker CAD Paper Sheet on Bed (Y = 2.55)
    const paperGeo = new THREE.PlaneGeometry(7.6, 2.6);
    let paperMat;
    if (currentRenderMode === 'blueprint') {
      paperMat = getMaterial(0x38bdf8, 0, 1);
    } else {
      paperMat = new THREE.MeshStandardMaterial({
        map: getPlotterMarkerTexture(),
        roughness: 0.85,
        metalness: 0.05
      });
    }
    const paper = new THREE.Mesh(paperGeo, paperMat);
    paper.rotation.x = -Math.PI / 2;
    paper.position.set(0, 2.55, 0);
    paper.receiveShadow = true;
    group.add(paper);

    // Dual Pinch Feed Rollers (Y = 2.62)
    const rollerGeo = new THREE.CylinderGeometry(0.06, 0.06, 7.8, 16);
    rollerGeo.rotateZ(Math.PI / 2);
    const frontRoller = new THREE.Mesh(rollerGeo, rollerMat);
    frontRoller.position.set(0, 2.62, 0.65);
    const rearRoller = frontRoller.clone();
    rearRoller.position.z = -0.65;
    group.add(frontRoller, rearRoller);

    // Left & Right Drive Towers (Y = 2.95)
    const towerGeo = new THREE.BoxGeometry(0.7, 1.1, 1.8);
    const leftTower = new THREE.Mesh(towerGeo, emeraldAccentMat);
    leftTower.position.set(-3.7, 2.95, 0);
    leftTower.castShadow = true;
    const rightTower = leftTower.clone();
    rightTower.position.x = 3.7;
    addEdgeLines(leftTower, 0x047857); addEdgeLines(rightTower, 0x047857);
    group.add(leftTower, rightTower);

    // Left Tower LCD Control Panel Screen
    const lcdGeo = new THREE.PlaneGeometry(0.35, 0.25);
    const lcdMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const lcd = new THREE.Mesh(lcdGeo, lcdMat);
    lcd.position.set(-3.34, 3.2, 0.4);
    lcd.rotation.y = Math.PI / 2;
    group.add(lcd);

    // Right Tower Emergency Stop Button
    const estopGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.1, 16);
    const estopMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
    const estop = new THREE.Mesh(estopGeo, estopMat);
    estop.position.set(3.7, 3.55, 0.3);
    group.add(estop);

    // Dual Polished Chrome Linear Guide Rails (Y = 3.22)
    const railGeo = new THREE.CylinderGeometry(0.07, 0.07, 8.0, 24);
    railGeo.rotateZ(Math.PI / 2);
    const frontRail = new THREE.Mesh(railGeo, chromeMat);
    frontRail.position.set(0, 3.22, 0.35);
    const rearRail = frontRail.clone();
    rearRail.position.z = -0.35;
    group.add(frontRail, rearRail);

    // Moving HP45 Dual Print Carriage (Y = 3.25)
    const carriage = new THREE.Group();
    carriage.position.set(0, 3.25, 0);

    const carriageBody = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.75, 1.1), emeraldAccentMat);
    carriageBody.castShadow = true;
    addEdgeLines(carriageBody, 0x047857);
    carriage.add(carriageBody);

    // Dual HP45 Head blocks
    const hpGeo = new THREE.BoxGeometry(0.24, 0.45, 0.32);
    const hpMat = getMaterial(0x020617, 0.3, 0.4);
    const head1 = new THREE.Mesh(hpGeo, hpMat);
    head1.position.set(-0.25, -0.38, 0);
    const head2 = head1.clone();
    head2.position.x = 0.25;
    carriage.add(head1, head2);

    // Downward active laser guide alignment line
    const laserMat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.85 });
    const laserPoints = [new THREE.Vector3(0, -0.4, 0), new THREE.Vector3(0, -0.7, 0)];
    const laserGeo = new THREE.BufferGeometry().setFromPoints(laserPoints);
    const laserLine = new THREE.Line(laserGeo, laserMat);
    carriage.add(laserLine);

    group.add(carriage);
    group.userData.carriage = carriage;

    return group;
  }

  // 2. SINHAJET Flat-Bed Cutter (Height: 0 to 3.3, Width: 7.4)
  function buildCutterModel() {
    const group = new THREE.Group();

    const tableMat = getMaterial(0x1e293b, 0.8, 0.25);
    const gantryMat = getMaterial(0x059669, 0.6, 0.35);
    const rimMat = getMaterial(0x64748b, 0.9, 0.15);
    const bladeMat = getMaterial(0xf8fafc, 0.98, 0.05);

    // 4 Corner Structural Heavy Pillars (Y = 0 to 2.1)
    const legGeo = new THREE.CylinderGeometry(0.25, 0.25, 2.1, 16);
    const p1 = new THREE.Mesh(legGeo, tableMat);
    p1.position.set(-3.2, 1.05, -2.4);
    p1.castShadow = true;
    const p2 = p1.clone(); p2.position.x = 3.2;
    const p3 = p1.clone(); p3.position.z = 2.4;
    const p4 = p2.clone(); p4.position.z = 2.4;
    addEdgeLines(p1); addEdgeLines(p2); addEdgeLines(p3); addEdgeLines(p4);
    group.add(p1, p2, p3, p4);

    // Lower Vacuum Turbine Housing Unit (Y = 0.55)
    const vacUnit = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.5, 3.8), getMaterial(0x0f172a, 0.9, 0.2));
    vacUnit.position.set(0, 0.55, 0);
    vacUnit.castShadow = true;
    addEdgeLines(vacUnit);
    group.add(vacUnit);

    // Aluminum Perimeter Edge Frame (Y = 2.15)
    const bedFrame = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.35, 5.8), rimMat);
    bedFrame.position.set(0, 2.15, 0);
    bedFrame.castShadow = true;
    bedFrame.receiveShadow = true;
    addEdgeLines(bedFrame);
    group.add(bedFrame);

    // Vacuum Cutting Honeycomb Bed Surface (Y = 2.34)
    const bedMat = (currentRenderMode === 'blueprint')
      ? getMaterial(0x38bdf8, 0, 1)
      : new THREE.MeshStandardMaterial({ map: getCutterBedTexture(), roughness: 0.6, metalness: 0.2 });

    const mat = new THREE.Mesh(new THREE.PlaneGeometry(6.8, 5.2), bedMat);
    mat.rotation.x = -Math.PI / 2;
    mat.position.set(0, 2.34, 0);
    mat.receiveShadow = true;
    group.add(mat);

    // Dual Linear Drive Rails along X axis
    const gantryRailGeo = new THREE.CylinderGeometry(0.08, 0.08, 7.2, 16);
    gantryRailGeo.rotateZ(Math.PI / 2);
    const railFront = new THREE.Mesh(gantryRailGeo, rimMat);
    railFront.position.set(0, 2.42, 2.75);
    const railRear = railFront.clone();
    railRear.position.z = -2.75;
    group.add(railFront, railRear);

    // Heavy Gantry Bridge Traversing Z Axis (Y = 2.85)
    const gantryGroup = new THREE.Group();
    gantryGroup.position.set(0, 2.85, 0);

    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.85, 5.9), gantryMat);
    bridge.castShadow = true;
    addEdgeLines(bridge, 0x047857);
    gantryGroup.add(bridge);

    // Multi-Tool Head (Oscillating Knife + Creasing Wheel + Pen)
    const toolHead = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.9, 0.65), getMaterial(0x0f172a, 0.8, 0.2));
    toolHead.position.set(0.1, 0.1, 0);
    toolHead.castShadow = true;
    addEdgeLines(toolHead);

    // Carbide Tangential Blade
    const blade = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.4, 16), bladeMat);
    blade.rotation.x = Math.PI;
    blade.position.set(0, -0.6, 0);
    toolHead.add(blade);

    // Tool Guide Light
    const toolLight = new THREE.PointLight(0x10b981, 1.5, 4);
    toolLight.position.set(0, -0.5, 0);
    toolHead.add(toolLight);

    gantryGroup.add(toolHead);
    group.add(gantryGroup);

    group.userData.gantry = gantryGroup;
    group.userData.toolHead = toolHead;

    return group;
  }

  // 3. G-MAC RAS Camera Digitizer (Height: 0 to 4.2, Width: 5.8)
  function buildDigitizerModel() {
    const group = new THREE.Group();

    const standMat = getMaterial(0x0f172a, 0.9, 0.2);
    const cameraMat = getMaterial(0x059669, 0.6, 0.35);
    const rimMat = getMaterial(0x64748b, 0.95, 0.15);

    // Solid Industrial Dual-Column H-Stand (Resting on Y = 0)
    const runnerGeo = new THREE.BoxGeometry(0.45, 0.14, 3.6);
    const leftRunner = new THREE.Mesh(runnerGeo, standMat);
    leftRunner.position.set(-2.4, 0.07, 0);
    leftRunner.castShadow = true;
    leftRunner.receiveShadow = true;
    const rightRunner = leftRunner.clone();
    rightRunner.position.x = 2.4;
    addEdgeLines(leftRunner); addEdgeLines(rightRunner);
    group.add(leftRunner, rightRunner);

    // Spreader Crossbar (Y = 0.2)
    const spreader = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 4.8, 16), standMat);
    spreader.rotateZ(Math.PI / 2);
    spreader.position.set(0, 0.2, 0);
    group.add(spreader);

    // Vertical Stand Columns (Y = 0.14 to 1.9)
    const colGeo = new THREE.BoxGeometry(0.3, 1.8, 0.35);
    const leftCol = new THREE.Mesh(colGeo, standMat);
    leftCol.position.set(-2.4, 1.04, 0);
    leftCol.castShadow = true;
    const rightCol = leftCol.clone();
    rightCol.position.x = 2.4;
    addEdgeLines(leftCol); addEdgeLines(rightCol);
    group.add(leftCol, rightCol);

    // Digitizing Board Cradle with 12-degree Ergonomic Tilt (Y = 2.05)
    const boardGroup = new THREE.Group();
    boardGroup.position.set(0, 2.05, 0);
    boardGroup.rotation.x = 0.18; // 10 degree tilt

    // Board Outer Aluminum Rim
    const outerRim = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.22, 4.4), rimMat);
    outerRim.castShadow = true;
    addEdgeLines(outerRim);
    boardGroup.add(outerRim);

    // High Contrast Metric Calibration Drafting Surface
    const calibMat = (currentRenderMode === 'blueprint')
      ? getMaterial(0x38bdf8, 0, 1)
      : new THREE.MeshStandardMaterial({ map: getDigitizerBoardTexture(), roughness: 0.5, metalness: 0.2 });

    const boardMatMesh = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 3.8), calibMat);
    boardMatMesh.rotation.x = -Math.PI / 2;
    boardMatMesh.position.y = 0.12;
    boardMatMesh.receiveShadow = true;
    boardGroup.add(boardMatMesh);

    group.add(boardGroup);

    // High-Rigidity Vertical Optical Mast (Rising from rear stand to Y = 4.1)
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 3.8, 16), standMat);
    mast.position.set(0, 2.1, -2.1);
    mast.castShadow = true;
    addEdgeLines(mast);
    group.add(mast);

    // Overhang Boom Arm (Y = 4.05)
    const boom = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 2.4), standMat);
    boom.position.set(0, 4.05, -0.95);
    boom.castShadow = true;
    addEdgeLines(boom);
    group.add(boom);

    // Industrial Optical Camera Head (Y = 3.9)
    const camBody = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 0.6), cameraMat);
    camBody.position.set(0, 3.9, 0);
    addEdgeLines(camBody, 0x047857);

    // Optical Lens
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.35, 24), getMaterial(0x020617, 0.9, 0.1));
    lens.position.set(0, -0.35, 0);
    camBody.add(lens);

    // Circular 360° Shadowless LED Ring Illuminator
    const ringGeo = new THREE.TorusGeometry(0.5, 0.05, 16, 32);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.8 });
    const ledRing = new THREE.Mesh(ringGeo, ringMat);
    ledRing.rotation.x = Math.PI / 2;
    ledRing.position.set(0, -0.38, 0);
    camBody.add(ledRing);

    group.add(camBody);

    return group;
  }

  // 4. Brushless Servo Motor Kit (Height: 0 to 2.4, Width: 4.6)
  function buildServoModel() {
    const group = new THREE.Group();

    const motorBodyMat = getMaterial(0x1e293b, 0.85, 0.25);
    const shaftMat = getMaterial(0xf1f5f9, 0.95, 0.08);
    const copperMat = getMaterial(0xb45309, 0.8, 0.3);
    const standMat = getMaterial(0x0f172a, 0.9, 0.2);

    // Machined Aluminum Heavy Test Bench / Base Stand (Resting on Y = 0)
    const benchBase = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.3, 3.4), standMat);
    benchBase.position.set(0, 0.15, 0);
    benchBase.castShadow = true;
    benchBase.receiveShadow = true;
    addEdgeLines(benchBase);
    group.add(benchBase);

    // Heavy Mounting Upright Cradle Flange (Y = 0.3 to 2.3)
    const flange = new THREE.Mesh(new THREE.BoxGeometry(0.35, 2.0, 2.6), motorBodyMat);
    flange.position.set(1.1, 1.3, 0);
    flange.castShadow = true;
    addEdgeLines(flange);
    group.add(flange);

    // Cylindrical Motor Stator Housing (Y = 1.6)
    const body = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 2.6, 32), motorBodyMat);
    body.rotation.z = Math.PI / 2;
    body.position.set(0, 1.6, 0);
    body.castShadow = true;
    addEdgeLines(body);
    group.add(body);

    // Cooling Heatsink Ribs on Motor Stator
    for (let i = -1.0; i <= 0.8; i += 0.35) {
      const rib = new THREE.Mesh(new THREE.TorusGeometry(1.22, 0.04, 16, 32), getMaterial(0x334155, 0.7, 0.3));
      rib.rotation.y = Math.PI / 2;
      rib.position.set(i, 1.6, 0);
      group.add(rib);
    }

    // High-Precision Ground Drive Shaft (Y = 1.6, Extending out to X = 2.2)
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.6, 24), shaftMat);
    shaft.rotation.z = Math.PI / 2;
    shaft.position.set(1.9, 1.6, 0);
    shaft.castShadow = true;
    group.add(shaft);

    // Machined Timing Belt Drive Pulley on Shaft Tip
    const pulley = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.5, 32), getMaterial(0x64748b, 0.9, 0.15));
    pulley.rotation.z = Math.PI / 2;
    pulley.position.set(2.2, 1.6, 0);
    pulley.castShadow = true;
    addEdgeLines(pulley);
    group.add(pulley);

    // Rear High-Resolution Optical Encoder Housing (Y = 1.6, X = -1.65)
    const encoder = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.8, 32), copperMat);
    encoder.rotation.z = Math.PI / 2;
    encoder.position.set(-1.65, 1.6, 0);
    encoder.castShadow = true;
    addEdgeLines(encoder, 0x92400e);
    group.add(encoder);

    // IP67 Shielded Conduit Junction Box
    const jbox = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.6), standMat);
    jbox.position.set(-0.6, 2.4, 0);
    addEdgeLines(jbox);
    group.add(jbox);

    group.userData.shaft = shaft;
    group.userData.pulley = pulley;

    return group;
  }

  /* -------------------------------------------------------------
     Model Loader & Hotspots Handler
     ------------------------------------------------------------- */
  function load3DModel(modelKey) {
    if (currentModelGroup) {
      scene.remove(currentModelGroup);
    }

    clearHotspots();

    let model;
    if (modelKey === 'cutter') model = buildCutterModel();
    else if (modelKey === 'digitizer') model = buildDigitizerModel();
    else if (modelKey === 'servo') model = buildServoModel();
    else model = buildPlotterModel();

    currentModelGroup = model;
    currentModelGroup.userData.key = modelKey;
    scene.add(currentModelGroup);

    // Recreate Hotspots with aligned grounded positions
    createHotspots(modelKey);

    // Update laser visibility
    if (laserPlane) {
      laserPlane.visible = (currentRenderMode === 'laser');
    }
  }

  function createHotspots(modelKey) {
    const list = modelHotspots[modelKey] || [];
    const container = document.getElementById('machinery-3d-viewport');
    if (!container) return;

    list.forEach((item, idx) => {
      const pin = document.createElement('div');
      pin.className = 'hotspot-3d-pin';
      pin.innerHTML = `
        <span class="hotspot-pulse"></span>
        <span class="hotspot-number">${idx + 1}</span>
        <div class="hotspot-tooltip">
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
      `;
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        const wasActive = pin.classList.contains('active-pin');
        container.querySelectorAll('.hotspot-3d-pin').forEach(p => p.classList.remove('active-pin'));
        if (!wasActive) {
          pin.classList.add('active-pin');
        }
      });

      container.appendChild(pin);

      hotspots.push({
        element: pin,
        pos: new THREE.Vector3(...item.pos)
      });
    });
  }

  function clearHotspots() {
    hotspots.forEach(h => {
      if (h.element && h.element.parentNode) {
        h.element.parentNode.removeChild(h.element);
      }
    });
    hotspots = [];
  }

  function updateHotspotsScreenPositions() {
    if (!camera || !renderer) return;
    const widthHalf = renderer.domElement.clientWidth / 2;
    const heightHalf = renderer.domElement.clientHeight / 2;

    hotspots.forEach(h => {
      const v = h.pos.clone();
      v.project(camera);

      // Check if behind camera
      if (v.z > 1) {
        h.element.style.display = 'none';
        return;
      }

      h.element.style.display = 'flex';
      const x = (v.x * widthHalf) + widthHalf;
      const y = -(v.y * heightHalf) + heightHalf;
      h.element.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    });
  }

  /* -------------------------------------------------------------
     UI Events Binding
     ------------------------------------------------------------- */
  function bindViewerControls(container) {
    // Model Selector Tabs
    const modelBtns = document.querySelectorAll('.btn-3d-model');
    modelBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modelBtns.forEach(b => {
          b.classList.remove('active', 'bg-emerald-600', 'text-white');
          b.classList.add('bg-slate-100', 'text-slate-700');
        });

        btn.classList.add('active', 'bg-emerald-600', 'text-white');
        btn.classList.remove('bg-slate-100', 'text-slate-700');

        const model = btn.getAttribute('data-model');
        load3DModel(model);
      });
    });

    // Render Mode Tabs (Studio Dark, Studio Light, Blueprint, Laser)
    const modeBtns = document.querySelectorAll('.btn-3d-mode');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => {
          b.classList.remove('active', 'text-emerald-700', 'font-bold', 'border-emerald-600', 'bg-white', 'shadow-xs');
          b.classList.add('text-slate-600', 'border-transparent');
        });

        btn.classList.add('active', 'text-emerald-700', 'font-bold', 'border-emerald-600', 'bg-white', 'shadow-xs');
        btn.classList.remove('text-slate-600', 'border-transparent');

        currentRenderMode = btn.getAttribute('data-mode');
        updateSceneBackground();

        if (currentModelGroup) {
          load3DModel(currentModelGroup.userData.key || 'plotter');
        }
      });
    });

    // Auto-Rotate Toggle
    const rotateBtn = document.getElementById('btn-3d-rotate');
    if (rotateBtn) {
      rotateBtn.addEventListener('click', () => {
        autoRotate = !autoRotate;
        if (controls) controls.autoRotate = autoRotate;
        rotateBtn.classList.toggle('text-emerald-400', autoRotate);
      });
    }

    // Reset Camera
    const resetBtn = document.getElementById('btn-3d-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        camera.position.set(5.5, 3.8, 8.5);
        if (controls) controls.target.set(0, 1.8, 0);
      });
    }

    // Fullscreen Toggle
    const fsBtn = document.getElementById('btn-3d-fullscreen');
    if (fsBtn) {
      fsBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          container.parentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen();
        }
      });
    }
  }

  /* -------------------------------------------------------------
     Animation Loop
     ------------------------------------------------------------- */
  function animateViewer() {
    animationFrameId = requestAnimationFrame(animateViewer);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    if (controls) controls.update();

    // Laser scan sweeping plane animation
    if (laserPlane && laserPlane.visible) {
      laserPlane.position.x += laserDirection * 2.8 * delta;
      if (laserPlane.position.x > 3.6) {
        laserPlane.position.x = 3.6;
        laserDirection = -1;
      } else if (laserPlane.position.x < -3.6) {
        laserPlane.position.x = -3.6;
        laserDirection = 1;
      }
    }

    // Dynamic machine component sub-animations
    if (currentModelGroup && currentModelGroup.userData.carriage) {
      currentModelGroup.userData.carriage.position.x = Math.sin(elapsedTime * 2.2) * 2.8;
    }
    if (currentModelGroup && currentModelGroup.userData.shaft) {
      currentModelGroup.userData.shaft.rotation.x += 4.5 * delta;
      if (currentModelGroup.userData.pulley) {
        currentModelGroup.userData.pulley.rotation.x += 4.5 * delta;
      }
    }
    if (currentModelGroup && currentModelGroup.userData.gantry) {
      currentModelGroup.userData.gantry.position.z = Math.sin(elapsedTime * 1.4) * 1.8;
    }

    updateHotspotsScreenPositions();

    renderer.render(scene, camera);
  }

  /* -------------------------------------------------------------
     External Inspection Trigger (Called from Bestseller Card buttons)
     ------------------------------------------------------------- */
  function inspectProductIn3D(modelKey) {
    if (!modelKey) modelKey = 'plotter';

    if (!scene) {
      initMachineryViewer();
    }

    // Synchronize 3D model selector buttons in the UI
    const modelBtns = document.querySelectorAll('.btn-3d-model');
    modelBtns.forEach(btn => {
      const isTarget = btn.getAttribute('data-model') === modelKey;
      btn.classList.toggle('active', isTarget);
      btn.classList.toggle('bg-emerald-600', isTarget);
      btn.classList.toggle('text-white', isTarget);
      btn.classList.toggle('bg-slate-100', !isTarget);
      btn.classList.toggle('text-slate-700', !isTarget);
    });

    // Switch to the requested 3D model
    load3DModel(modelKey);

    // Smoothly scroll down to the 3D machinery stage
    const section = document.getElementById('machinery-3d-section') || document.getElementById('machinery-3d-viewport');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Highlight pulse on the 3D viewport
      const viewport = document.getElementById('machinery-3d-viewport');
      if (viewport) {
        viewport.style.transition = 'box-shadow 0.4s ease, border-color 0.4s ease';
        viewport.style.borderColor = '#10b981';
        viewport.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.4), 0 20px 40px rgba(0, 0, 0, 0.5)';
        setTimeout(() => {
          viewport.style.borderColor = '#334155';
          viewport.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
        }, 2400);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMachineryViewer);
  } else {
    initMachineryViewer();
  }

  window.initMachineryViewer = initMachineryViewer;
  window.inspectProductIn3D = inspectProductIn3D;
})();
