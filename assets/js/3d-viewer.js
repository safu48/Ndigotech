/**
 * NDIGO TECH SOLUTIONS - Interactive 360° 3D Machinery Inspection Stage
 * Powered by Three.js & OrbitControls. Enables full 360-degree rotation, zoom,
 * blueprint/wireframe modes, and interactive 3D component hotspots.
 */

(function () {
  'use strict';

  let scene, camera, renderer, controls;
  let currentModelGroup = null;
  let currentRenderMode = 'studio'; // 'studio', 'blueprint', 'laser'
  let autoRotate = true;
  let animationFrameId = null;
  let laserPlane = null;
  let laserDirection = 1;
  let clock = new THREE.Clock();
  let hotspots = [];

  // Hotspots definitions per model
  const modelHotspots = {
    plotter: [
      { pos: [0, 0.9, 0], title: 'Dual HP45 Printheads', desc: 'Ready-stock HP45 ink heads delivering 300 DPI razor-sharp lines at 200 m²/hr.' },
      { pos: [3.8, 0.4, 0], title: 'Brushless Servo Drive', desc: 'Ultra-quiet 36V DC brushless servo motor with optical raster encoder.' },
      { pos: [0, 0.1, 0], title: 'Precision Feed Bed', desc: 'Continuously handles 40g to 300g Kraft paper without wrinkle or jamming.' }
    ],
    cutter: [
      { pos: [0, 0.85, 0], title: 'Dual Tool Head', desc: 'Oscillating knife + pen marker for simultaneous cutting and pattern annotation.' },
      { pos: [0, 0.2, 0], title: 'Vacuum Hold-Down Table', desc: 'Zone-controlled industrial suction bed holding thick PVC & pattern board flat.' },
      { pos: [-3.5, 0.4, 0], title: 'Linear Guide Gantry', desc: 'High-rigidity dual axis linear rails ensuring +/- 0.1mm repeat cutting accuracy.' }
    ],
    digitizer: [
      { pos: [0, 2.8, 0], title: 'High-Res Optical Camera', desc: 'Wide-angle distortion-free lens capturing entire pattern sets in 1 second.' },
      { pos: [0, 0.1, 0], title: 'Magnetic Calibration Table', desc: 'High-contrast matte surface with corner markers for automatic distortion removal.' },
      { pos: [0, 1.5, 0], title: 'Anti-Glare LED Array', desc: 'Even 5500K color illumination eliminating shadows on pattern edges.' }
    ],
    servo: [
      { pos: [0, 0.5, 0], title: 'Heavy-Duty Rotor Core', desc: 'Rare-earth neodymium magnets providing 3.5 N.m continuous dynamic torque.' },
      { pos: [0, -0.4, 0], title: 'Optical Raster Encoder', desc: '2,500 CPR high-resolution feedback for micro-step carriage positioning.' },
      { pos: [1.2, 0.2, 0], title: 'Industrial Wiring Loom', desc: 'Shielded twisted-pair cables protected against high-frequency interference.' }
    ]
  };

  function initMachineryViewer() {
    const container = document.getElementById('machinery-3d-viewport');
    if (!container || typeof THREE === 'undefined') return;

    const width = container.clientWidth || (container.parentElement ? container.parentElement.clientWidth : 0) || window.innerWidth || 800;
    const height = container.clientHeight || 520;

    // 1. Scene & Camera
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1d);

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(7, 5, 11);

    // 2. Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Orbit Controls (Native or Built-in Fallback)
    if (typeof THREE.OrbitControls !== 'undefined') {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.maxPolarAngle = Math.PI / 2 - 0.02; // Don't go below floor
      controls.minDistance = 4;
      controls.maxDistance = 25;
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 1.2;
    } else {
      // Robust built-in mouse & touch drag orbit fallback
      let isDragging = false;
      let prevMousePos = { x: 0, y: 0 };
      let spherical = { radius: 14, theta: 0.6, phi: 1.1 };

      function updateCameraFromSpherical() {
        spherical.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, spherical.phi));
        spherical.radius = Math.max(4, Math.min(25, spherical.radius));
        camera.position.x = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
        camera.position.y = spherical.radius * Math.cos(spherical.phi);
        camera.position.z = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
        camera.lookAt(0, 0, 0);
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

    // 5. Floor Grid
    setupFloorGrid();

    // 6. Laser Scan Plane
    setupLaserScanPlane();

    // 7. Load Default Model (Plotter)
    load3DModel('plotter');

    // 8. Bind UI Events
    bindViewerControls(container);

    // 9. Start Animation
    animateViewer();

    // Resize Handler
    window.addEventListener('resize', () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }

  function setupStudioLighting() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const mainSpot = new THREE.SpotLight(0xffffff, 2.2);
    mainSpot.position.set(12, 18, 12);
    mainSpot.angle = Math.PI / 4;
    mainSpot.penumbra = 0.4;
    mainSpot.castShadow = true;
    mainSpot.shadow.mapSize.width = 1024;
    mainSpot.shadow.mapSize.height = 1024;
    scene.add(mainSpot);

    const rimLight = new THREE.DirectionalLight(0x0284c7, 1.8);
    rimLight.position.set(-10, 8, -10);
    scene.add(rimLight);

    const warmFill = new THREE.DirectionalLight(0xf59e0b, 1.0);
    warmFill.position.set(10, 4, -8);
    scene.add(warmFill);
  }

  function setupFloorGrid() {
    const grid = new THREE.GridHelper(24, 24, 0x0284c7, 0x1e293b);
    grid.position.y = -1.6;
    grid.material.opacity = 0.4;
    grid.material.transparent = true;
    scene.add(grid);

    // Subtle dark circular platform beneath machine
    const platformGeo = new THREE.CylinderGeometry(8, 8.2, 0.2, 48);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.8,
      metalness: 0.3
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = -1.7;
    platform.receiveShadow = true;
    scene.add(platform);
  }

  function setupLaserScanPlane() {
    const laserGeo = new THREE.PlaneGeometry(8, 0.08);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });
    laserPlane = new THREE.Mesh(laserGeo, laserMat);
    laserPlane.rotation.x = Math.PI / 2;
    laserPlane.position.set(0, 0.15, 0);
    laserPlane.visible = false;
    scene.add(laserPlane);
  }

  /* -------------------------------------------------------------
     Procedural 3D Machine Builders (High visual fidelity, 0MB download)
     ------------------------------------------------------------- */
  function buildPlotterModel() {
    const group = new THREE.Group();

    const frameMat = getMaterial(0x1e293b, 0.8, 0.2);
    const accentMat = getMaterial(0x0284c7, 0.7, 0.3);
    const paperMat = getMaterial(0xfffbeb, 0.1, 0.9);
    const chromeMat = getMaterial(0xe2e8f0, 0.95, 0.1);

    // Bed
    const bed = new THREE.Mesh(new THREE.BoxGeometry(8, 0.3, 3), frameMat);
    bed.castShadow = true;
    bed.receiveShadow = true;
    group.add(bed);

    // Paper roll & sheet
    const paper = new THREE.Mesh(new THREE.PlaneGeometry(7.4, 2.5), paperMat);
    paper.rotation.x = -Math.PI / 2;
    paper.position.y = 0.16;
    group.add(paper);

    // Legs
    const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.35, 2.8, 2.2), frameMat);
    leftLeg.position.set(-3.6, -1.4, 0);
    leftLeg.castShadow = true;
    const rightLeg = leftLeg.clone();
    rightLeg.position.x = 3.6;
    group.add(leftLeg, rightLeg);

    // Rails
    const rail1 = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 7.8, 16), chromeMat);
    rail1.rotateZ(Math.PI / 2);
    rail1.position.set(0, 0.8, -0.35);
    const rail2 = rail1.clone();
    rail2.position.set(0, 0.8, 0.35);
    group.add(rail1, rail2);

    // Gantry side covers
    const leftTower = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.2, 1.4), accentMat);
    leftTower.position.set(-3.7, 0.6, 0);
    leftTower.castShadow = true;
    const rightTower = leftTower.clone();
    rightTower.position.x = 3.7;
    group.add(leftTower, rightTower);

    // Carriage Head
    const carriage = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.7, 0.9), accentMat);
    carriage.position.set(0, 0.8, 0);
    carriage.castShadow = true;

    // HP45 Head blocks
    const head1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.4, 0.25), getMaterial(0x020617, 0.2, 0.5));
    head1.position.set(-0.22, -0.35, 0);
    const head2 = head1.clone();
    head2.position.x = 0.22;
    carriage.add(head1, head2);
    group.add(carriage);

    group.userData.carriage = carriage;
    return group;
  }

  function buildCutterModel() {
    const group = new THREE.Group();

    const tableMat = getMaterial(0x334155, 0.7, 0.3);
    const gantryMat = getMaterial(0xf59e0b, 0.6, 0.4);
    const gridMat = getMaterial(0x0f172a, 0.9, 0.2);

    // Large Flat-Bed (1500 x 1200 style)
    const bed = new THREE.Mesh(new THREE.BoxGeometry(7, 0.4, 5.5), tableMat);
    bed.castShadow = true;
    bed.receiveShadow = true;
    group.add(bed);

    // Suction Mat
    const mat = new THREE.Mesh(new THREE.PlaneGeometry(6.6, 5.1), gridMat);
    mat.rotation.x = -Math.PI / 2;
    mat.position.y = 0.21;
    group.add(mat);

    // Four Heavy Base Pillars
    const legGeo = new THREE.CylinderGeometry(0.25, 0.25, 2.6, 16);
    const p1 = new THREE.Mesh(legGeo, tableMat);
    p1.position.set(-3.1, -1.3, -2.3);
    const p2 = p1.clone(); p2.position.x = 3.1;
    const p3 = p1.clone(); p3.position.z = 2.3;
    const p4 = p2.clone(); p4.position.z = 2.3;
    group.add(p1, p2, p3, p4);

    // High Rigidity Gantry Bridge
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.8, 5.7), gantryMat);
    bridge.position.set(0, 0.65, 0);
    bridge.castShadow = true;
    group.add(bridge);

    // Precision Tool Head (Oscillating Blade + Pen)
    const toolHead = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.9, 0.6), getMaterial(0x1e293b, 0.8, 0.2));
    toolHead.position.set(0.1, 0.75, 0);
    const blade = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.35, 16), getMaterial(0xe2e8f0, 0.98, 0.05));
    blade.rotation.x = Math.PI;
    blade.position.set(0, -0.55, 0);
    toolHead.add(blade);
    group.add(toolHead);

    group.userData.gantry = bridge;
    group.userData.toolHead = toolHead;
    return group;
  }

  function buildDigitizerModel() {
    const group = new THREE.Group();

    const standMat = getMaterial(0x0f172a, 0.9, 0.2);
    const cameraMat = getMaterial(0x10b981, 0.6, 0.4);
    const boardMat = getMaterial(0xf8fafc, 0.2, 0.8);

    // Base Digitizing Board
    const board = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.2, 4.2), boardMat);
    board.castShadow = true;
    board.receiveShadow = true;
    group.add(board);

    // Corner Calibration Targets
    const cornerMat = getMaterial(0x0284c7, 0.8, 0.2);
    const c1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.22, 0.4), cornerMat);
    c1.position.set(-2.5, 0.02, -1.9);
    const c2 = c1.clone(); c2.position.x = 2.5;
    const c3 = c1.clone(); c3.position.z = 1.9;
    const c4 = c2.clone(); c4.position.z = 1.9;
    group.add(c1, c2, c3, c4);

    // Vertical Camera Rig Tower
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3.8, 16), standMat);
    tower.position.set(0, 1.8, -2.2);
    group.add(tower);

    // Overhang Boom Arm
    const boom = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 2.4), standMat);
    boom.position.set(0, 3.6, -1.1);
    group.add(boom);

    // High-Resolution Camera Body & Lens
    const camBody = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, 0.5), cameraMat);
    camBody.position.set(0, 3.4, 0);

    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.35, 24), getMaterial(0x020617, 0.9, 0.1));
    lens.position.set(0, -0.3, 0);
    camBody.add(lens);
    group.add(camBody);

    return group;
  }

  function buildServoModel() {
    const group = new THREE.Group();

    const motorBodyMat = getMaterial(0x1e293b, 0.9, 0.2);
    const shaftMat = getMaterial(0xe2e8f0, 0.98, 0.05);
    const copperMat = getMaterial(0xb45309, 0.85, 0.25);

    // Cylindrical Motor Body
    const body = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 2.8, 32), motorBodyMat);
    body.rotation.z = Math.PI / 2;
    body.castShadow = true;
    group.add(body);

    // Drive Shaft
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 1.4, 24), shaftMat);
    shaft.rotation.z = Math.PI / 2;
    shaft.position.set(1.9, 0, 0);
    shaft.castShadow = true;
    group.add(shaft);

    // Rear Optical Encoder Housing
    const encoder = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 0.8, 32), copperMat);
    encoder.rotation.z = Math.PI / 2;
    encoder.position.set(-1.6, 0, 0);
    group.add(encoder);

    // Mounting Flange
    const flange = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.8, 2.8), motorBodyMat);
    flange.position.set(1.3, 0, 0);
    group.add(flange);

    group.userData.shaft = shaft;
    return group;
  }

  function getMaterial(color, metalness, roughness) {
    if (currentRenderMode === 'blueprint') {
      return new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true
      });
    }
    return new THREE.MeshStandardMaterial({
      color: color,
      metalness: metalness,
      roughness: roughness
    });
  }

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

    // Recreate Hotspots for this model
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

  function bindViewerControls(container) {
    // Model Selector Pills
    const modelBtns = document.querySelectorAll('.btn-3d-model');
    modelBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modelBtns.forEach(b => b.classList.remove('active', 'bg-amber-400', 'text-slate-950'));
        modelBtns.forEach(b => b.classList.add('bg-slate-800', 'text-slate-300'));

        btn.classList.add('active', 'bg-amber-400', 'text-slate-950');
        btn.classList.remove('bg-slate-800', 'text-slate-300');

        const model = btn.getAttribute('data-model');
        load3DModel(model);
      });
    });

    // Render Mode Tabs (Studio, Blueprint, Laser)
    const modeBtns = document.querySelectorAll('.btn-3d-mode');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active', 'text-amber-400', 'border-amber-400'));
        modeBtns.forEach(b => b.classList.add('text-slate-400', 'border-transparent'));

        btn.classList.add('active', 'text-amber-400', 'border-amber-400');
        btn.classList.remove('text-slate-400', 'border-transparent');

        currentRenderMode = btn.getAttribute('data-mode');
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
        rotateBtn.classList.toggle('text-amber-400', autoRotate);
      });
    }

    // Reset Camera
    const resetBtn = document.getElementById('btn-3d-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        camera.position.set(7, 5, 11);
        if (controls) controls.target.set(0, 0, 0);
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

  function animateViewer() {
    animationFrameId = requestAnimationFrame(animateViewer);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    if (controls) controls.update();

    // Laser scan animation
    if (laserPlane && laserPlane.visible) {
      laserPlane.position.x += laserDirection * 2.5 * delta;
      if (laserPlane.position.x > 3.5) {
        laserPlane.position.x = 3.5;
        laserDirection = -1;
      } else if (laserPlane.position.x < -3.5) {
        laserPlane.position.x = -3.5;
        laserDirection = 1;
      }
    }

    // Dynamic machine sub-animations
    if (currentModelGroup && currentModelGroup.userData.carriage) {
      currentModelGroup.userData.carriage.position.x = Math.sin(elapsedTime * 2.2) * 2.8;
    }
    if (currentModelGroup && currentModelGroup.userData.shaft) {
      currentModelGroup.userData.shaft.rotation.x += 4.0 * delta;
    }
    if (currentModelGroup && currentModelGroup.userData.gantry) {
      currentModelGroup.userData.gantry.position.z = Math.sin(elapsedTime * 1.5) * 1.8;
    }

    updateHotspotsScreenPositions();

    renderer.render(scene, camera);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMachineryViewer);
  } else {
    initMachineryViewer();
  }

  window.initMachineryViewer = initMachineryViewer;
})();
