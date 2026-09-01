/**
 * NDIGO TECH SOLUTIONS - Complete CAD/CAM Store Frontend & ASP.NET API Integration
 * Sourced from PLUMMY VENTURE LIMITED.-CADCAM.pdf, nts.pdf & digitizer.pdf
 */

// Exchange Rate: 1 USD = 123 BDT
const EXCHANGE_RATE = 123;

// Master Product Catalog
const PRODUCT_CATALOG = [
  // --- 1. CAD SOFTWARE ---
  {
    id: 'gmac-cad-40',
    name: 'GMAC 40.2 Garments Auto CAD Software Suite',
    category: 'software',
    price: 3500,
    listPrice: 4200,
    rating: 4.9,
    reviews: 128,
    badge: 'Best Seller',
    image: 'assets/images/products/gmac-cad-screens.png',
    desc: 'Complete 2D pattern design, super-fast grading, and Super Nesting ++Pro auto marker making that cuts fabric wastage by 3% to 6%. Opens Lectra, Gerber, and Optitex files.',
    specs: ['Pattern Design (PDS) & Auto Grading', 'Super Nesting ++Pro (Fabric Saving)', 'Gerber / Lectra / DXF File Converter', 'Five Years Service Warranty • Lifetime License Warranty • Major ONE Update Free'],
    compareSpecs: {
      type: '2D & Marker CAD Suite',
      speed: 'Instant Nesting (60s)',
      capacity: 'Unlimited Markers & Graded Sizes',
      power: 'Windows 7/8/10/11 Compatible',
      warranty: 'Five Years Service Warranty + Lifetime License + Major ONE Update Free'
    }
  },
  {
    id: 'gmac-footwear-cad',
    name: 'G-MAC Footwear 3D CAD Software Suite',
    category: 'software',
    price: 2800,
    listPrice: 3400,
    rating: 4.8,
    reviews: 64,
    badge: 'NTS Choice',
    image: 'assets/images/products/footwear-3d-cad.png',
    desc: '3D shoe last digitization, virtual upper/sole design, and automatic 2D pattern flattening for laser and CNC cutting.',
    specs: ['3D Shoe Last & Sole Design', 'Drawing Tablet Integration', 'Automatic 2D Pattern Flattening', 'Five Years Service Warranty • Lifetime License Warranty'],
    compareSpecs: {
      type: '3D Footwear CAD',
      speed: 'Real-Time 3D Rendering',
      capacity: 'Men, Women & Sports Shoe Library',
      power: 'Direct CNC / Laser Export',
      warranty: 'Five Years Service Warranty + Lifetime License'
    }
  },
  {
    id: 'gmac-3d-cad',
    name: 'G-MAC 3D Garments Virtual Sampling CAD',
    category: 'software',
    price: 3200,
    listPrice: 3900,
    rating: 4.9,
    reviews: 95,
    badge: 'Hot Deal',
    image: 'assets/images/products/garments-3d-cad.png',
    desc: 'Virtual 3D fitting software with customizable digital avatars and fabric drape simulation. Reduces physical sample room approval rounds by 80%.',
    specs: ['3D Virtual Avatar Dressing & Drape', 'Fabric Tension & Stress Heatmaps', 'Virtual Photo-Realistic Rendering', 'Five Years Service Warranty • Lifetime License Warranty'],
    compareSpecs: {
      type: '3D Virtual Garment CAD',
      speed: 'Real-Time Drape Simulation',
      capacity: 'Custom Sizing & Mannequin Avatars',
      power: 'High-Res 3D Export',
      warranty: 'Five Years Service Warranty + Lifetime License'
    }
  },

  // --- 2. HIGH-SPEED PLOTTERS & CUTTERS ---
  {
    id: 'gmac-plotter-gen04',
    name: 'G-MAC Smart Plotter GEN-04 (220cm)',
    category: 'hardware',
    price: 3250,
    listPrice: 3850,
    rating: 5.0,
    reviews: 210,
    badge: 'Best Seller',
    image: 'assets/images/products/gmac-gen04-plotter.png',
    desc: '220 cm wide industrial inkjet plotter with 4 HP printing heads. Prints up to 200 m²/h on virgin Kraft paper with auto paper feed and roll take-up.',
    specs: ['220 cm Print Width', '4 HP High-Speed Inkjet Heads', '120 - 200 m²/h Print Speed', 'One Year Parts Warranty + Two Years Service Warranty • Ready Stock'],
    compareSpecs: {
      type: '4-Head HP Inkjet Plotter',
      speed: '120 - 200 m²/h',
      capacity: '220 cm Width, 40-120g Paper',
      power: '220V AC, 150W Energy Saver',
      warranty: 'One Year Parts Warranty + Two Years Service Warranty'
    }
  },
  {
    id: 'nts-jw4-cloud',
    name: 'NTS-JW4 Cloud Network Plotter',
    category: 'hardware',
    price: 3400,
    listPrice: 4000,
    rating: 4.8,
    reviews: 82,
    badge: 'NTS Choice',
    image: 'assets/images/products/nts-jw4-cloud-plotter.png',
    desc: 'Multi-machine cloud networked garment plotter. Allows up to 50 CAD operators to send print queues simultaneously over LAN/WiFi.',
    specs: ['200cm Width Cloud Network Queue', '4 HP45 Quick-Dry Heads', 'Auto Resume After Power Cuts', 'One Year Parts Warranty + Two Years Service Warranty'],
    compareSpecs: {
      type: 'Cloud Network Plotter',
      speed: '140 - 180 m²/h',
      capacity: '200 cm Width, LAN/WiFi Queue',
      power: '220V AC, 180W',
      warranty: 'One Year Parts Warranty + Two Years Service Warranty'
    }
  },
  {
    id: 'sinhajet-fg1512',
    name: 'SINHAJET FG1512 Flat-Bed Pattern Cutter',
    category: 'hardware',
    price: 6500,
    listPrice: 7800,
    rating: 5.0,
    reviews: 175,
    badge: 'Best Seller',
    image: 'assets/images/products/sinhajet-fg1512-cutter.png',
    desc: '1500 x 1200 mm flatbed sample room cutter. Features dual tools (HP45 pen + alloy vibrating knife) with strong vacuum suction.',
    specs: ['1500 x 1200 mm Bed Size', 'Dual Tool: HP45 Pen + Alloy Knife', 'Cuts up to 300g Kraft & Cardboard', 'Two Year Parts Warranty + Two Years Service Warranty'],
    compareSpecs: {
      type: 'Flat-Bed Pattern Cutter',
      speed: 'Up to 1,200 mm/s',
      capacity: '1500 x 1200 mm (Cuts 300g Kraft)',
      power: '220V AC / 1.5kW Vacuum Pump',
      warranty: 'Two Year Parts Warranty + Two Years Service Warranty'
    }
  },
  {
    id: 'sinhajet-fg1209',
    name: 'SINHAJET FG1209 Compact Flat-Bed Cutter',
    category: 'hardware',
    price: 5200,
    listPrice: 6100,
    rating: 4.8,
    reviews: 62,
    badge: 'Compact Size',
    image: 'assets/images/products/sinhajet-fg1512-cutter.png',
    desc: '1200 x 900 mm compact flatbed pattern cutter designed for boutique sample rooms and smaller design studios.',
    specs: ['1200 x 900 mm Bed Size', 'Dual Tool: Pen Drawing + Knife Cutting', 'Cuts up to 250g Kraft Paper', 'Two Year Parts Warranty + Two Years Service Warranty'],
    compareSpecs: {
      type: 'Compact Flatbed Cutter',
      speed: 'Up to 1,000 mm/s',
      capacity: '1200 x 900 mm Table',
      power: '220V AC / 1.1kW Vacuum',
      warranty: 'Two Year Parts Warranty + Two Years Service Warranty'
    }
  },
  {
    id: 'nts-vertical-cutter',
    name: 'NTS Vertical Cutting Plotter (180cm)',
    category: 'hardware',
    price: 4200,
    listPrice: 5000,
    rating: 4.8,
    reviews: 58,
    badge: 'Factory Pick',
    image: 'assets/images/products/nts-vertical-cutter.png',
    desc: 'Continuous roll-fed 2-in-1 marker printer and pattern cutter. Prints and cuts markers up to 1200 meters continuously.',
    specs: ['180cm Width Continuous Roll Feed', '2-in-1 Plot & Cut in Single Pass', 'Cuts 80g to 300g Kraft Paper', 'One Year Parts Warranty + Two Years Service Warranty'],
    compareSpecs: {
      type: 'Vertical Roll Cutter Plotter',
      speed: '800 mm/s Cut / 120 m²/h Plot',
      capacity: '180 cm Continuous Roll',
      power: '220V AC, 350W',
      warranty: 'One Year Parts Warranty + Two Years Service Warranty'
    }
  },
  {
    id: 'nts-template-cutter',
    name: 'NTS Template Router Cutter (24,000 RPM)',
    category: 'hardware',
    price: 4500,
    listPrice: 5400,
    rating: 4.7,
    reviews: 47,
    badge: 'Heavy Duty',
    image: 'assets/images/products/nts-template-cutter.png',
    desc: 'High-speed CNC milling and router machine for cutting acrylic sewing templates, collar dies, and PVC plastic jigs (1-3mm).',
    specs: ['24,000 RPM High-Speed Spindle', '1200 x 900 mm Vacuum Table', 'Milling for Acrylic, PVC, Plastic Jigs', 'One Year Parts Warranty + Two Years Service Warranty'],
    compareSpecs: {
      type: 'CNC Template Router',
      speed: '24,000 RPM Spindle',
      capacity: '1200 x 900 mm (1-3mm Acrylic/PVC)',
      power: '220V AC / 1.5kW Spindle',
      warranty: 'One Year Parts Warranty + Two Years Service Warranty'
    }
  },
  {
    id: 'nts-relaxing-machine',
    name: 'NTS Automatic Fabric Relaxing Machine',
    category: 'hardware',
    price: 3800,
    listPrice: 4500,
    rating: 4.8,
    reviews: 35,
    badge: 'Fabric Care',
    image: 'assets/images/products/part-paper-roll.png',
    desc: 'Vibrating fabric unwinder that relaxes knitted and woven fabric rolls before spreading to eliminate shrinkage and tension.',
    specs: ['Width: Up to 220 cm Rolls', 'Vibration Relaxation Bed', 'Auto Edge Alignment Sensor', 'One Year Parts Warranty + Two Years Service Warranty'],
    compareSpecs: {
      type: 'Fabric Relaxing Machine',
      speed: '0 - 80 m/min',
      capacity: 'Rolls up to 220cm / 80kg',
      power: '220V AC, 750W',
      warranty: 'One Year Parts Warranty + Two Years Service Warranty'
    }
  },

  // --- 3. DIGITIZERS ---
  {
    id: 'gmac-ras-digitizer',
    name: 'G-MAC RAS 1-Click Camera Digitizer',
    category: 'digitizer',
    price: 1545,
    listPrice: 1950,
    rating: 4.9,
    reviews: 142,
    badge: 'Deal of the Day',
    image: 'assets/images/products/gmac-ras-camera-rig.png',
    desc: 'Take 1 photo of your paper patterns and turn them into CAD vector files in seconds. Opens in Gerber, Lectra, and Optitex.',
    specs: ['1-Click Instant Photo Scan', 'G-MAC RAS CAD Software Included', 'Price: 1,90,000 BDT', 'One Year Full Parts Warranty + Two Years Service Warranty • Delivery 12-14 Days'],
    compareSpecs: {
      type: 'Optical Camera Digitizer',
      speed: '1 Second Capture',
      capacity: 'Multi-Piece Simultaneous Scan',
      power: 'USB 3.0 HD Camera',
      warranty: 'One Year Full Parts Warranty + Two Years Service Warranty'
    }
  },

  // --- 4. READY-STOCK SPARE PARTS & CONSUMABLES ---
  {
    id: 'spare-hp45-cartridges',
    name: 'HP45 / HP45A Original Ink Cartridges (10-Pack)',
    category: 'spares',
    price: 250,
    listPrice: 320,
    rating: 4.9,
    reviews: 310,
    badge: 'Best Seller',
    image: 'assets/images/products/part-hp45-cartridge.png',
    desc: 'Original quick-drying black ink cartridges for all garment plotters and flatbed cutting machines.',
    specs: ['Box of 10 Genuine Cartridges', 'Quick-Drying Dark Black Ink', 'Ready in Stock at Savar', 'Fits All Standard Plotters'],
    compareSpecs: {
      type: 'Original Ink Cartridge',
      speed: 'Quick Drying (3 Sec)',
      capacity: '42ml per Cartridge (10-Pack)',
      power: 'Standard HP 45A Head',
      warranty: '100% Genuine Guarantee'
    }
  },
  {
    id: 'spare-kraft-paper',
    name: 'Virgin Kraft Paper Rolls (5 Big Rolls)',
    category: 'spares',
    price: 350,
    listPrice: 420,
    rating: 4.8,
    reviews: 165,
    badge: 'Bulk Savings',
    image: 'assets/images/products/part-paper-roll.png',
    desc: 'Smooth & tear-resistant Kraft paper rolls (80gsm to 300gsm) for high-speed pattern printing and flatbed cutting.',
    specs: ['Pack of 5 Heavy Rolls', '200 Meters per Roll (Width: 180-220cm)', 'Smooth Surface for No Ink Bleed', 'Ready in Stock at Savar'],
    compareSpecs: {
      type: 'Virgin Kraft Paper',
      speed: 'Tear-Resistant Feed',
      capacity: '5 Rolls x 200m Length',
      power: '80 - 300 GSM Grades',
      warranty: 'Quality Assured'
    }
  },
  {
    id: 'part-mainboard',
    name: 'Plotter Mainboard & Carriage Board Set',
    category: 'spares',
    price: 450,
    listPrice: 550,
    rating: 4.8,
    reviews: 42,
    badge: 'OEM Genuine',
    image: 'assets/images/products/part-motherboard.png',
    desc: 'High-speed CPU motherboard and head carriage board for G-MAC, NTS, Gerber, and Bullmer inkjet plotters.',
    specs: ['Industrial 32-Bit ARM CPU', 'Integrated LAN & USB Ports', 'Supports 2-Head & 4-Head Setups', '6 Months Replacement Warranty'],
    compareSpecs: {
      type: 'Plotter Control Board',
      speed: 'High-Speed Bus Processing',
      capacity: 'Universal 2/4 Head Compatibility',
      power: '24V DC Regulated',
      warranty: '6 Months Replacement'
    }
  },
  {
    id: 'part-servo-motor',
    name: 'Brushless DC Servo Motor & Encoder Kit',
    category: 'spares',
    price: 320,
    listPrice: 400,
    rating: 4.9,
    reviews: 53,
    badge: 'High Precision',
    image: 'assets/images/products/part-servo-motor.png',
    desc: 'Ultra-quiet brushless servo motor with optical raster encoder for smooth and accurate carriage movement.',
    specs: ['Brushless High-Torque Motor', 'High-Resolution Optical Encoder', 'Ultra-Quiet Smooth Motion', '1-Year Parts Warranty'],
    compareSpecs: {
      type: 'DC Servo Motor + Encoder',
      speed: '3000 RPM Dynamic Torque',
      capacity: 'Continuous 24/7 Duty',
      power: '36V DC Brushless',
      warranty: '1-Year Full Warranty'
    }
  },
  {
    id: 'part-blades-knives',
    name: 'Tungsten Alloy Cutting Blades & Holder (5-Pack)',
    category: 'spares',
    price: 180,
    listPrice: 230,
    rating: 4.9,
    reviews: 89,
    badge: 'Super Sharp',
    image: 'assets/images/products/part-circular-blade.png',
    desc: 'Tungsten carbide alloy blades (30°, 45°, 60°) for clean and sharp cuts on 300g Kraft paper, pattern cardboard, and PVC.',
    specs: ['Box of 5 Tungsten Alloy Blades', 'Includes Bearing Blade Holder', 'Angles: 30°, 45°, 60° Available', 'Long-Life Wear Resistant Edge'],
    compareSpecs: {
      type: 'Tungsten Carbide Blades',
      speed: 'Clean Burr-Free Cut',
      capacity: '5 Blades + 1 Aluminum Holder',
      power: 'Fits All Sinhajet & G-MAC Cutters',
      warranty: '100% Genuine'
    }
  },
  {
    id: 'part-power-supply',
    name: 'Industrial MeanWell Power Supply (24V/36V)',
    category: 'spares',
    price: 140,
    listPrice: 180,
    rating: 4.7,
    reviews: 38,
    badge: 'Heavy Duty',
    image: 'assets/images/products/part-power-supply.png',
    desc: 'Heavy-duty industrial power supply with overload and over-voltage protection for garment CAD plotters.',
    specs: ['MeanWell Industrial Standard', 'Dual Voltage: 24V / 36V 350W', 'Short-Circuit & Overheat Protection', '1-Year Warranty'],
    compareSpecs: {
      type: 'Industrial SMPS Power Unit',
      speed: 'Constant Voltage Output',
      capacity: '350W Continuous Load',
      power: '110V/220V Input Switchable',
      warranty: '1-Year Replacement'
    }
  },
  {
    id: 'part-timing-belts',
    name: 'Heavy-Duty Timing Belts & Pinch Rollers Kit',
    category: 'spares',
    price: 95,
    listPrice: 130,
    rating: 4.8,
    reviews: 71,
    badge: 'Non-Stretch',
    image: 'assets/images/products/part-timing-belt.png',
    desc: 'Non-stretch polyurethane timing belts with embedded steel wire cords and precision pinch rollers for plotter paper feed.',
    specs: ['Steel Wire Core Non-Stretch Belt', 'Pack of 8 Rubber Pinch Rollers', 'Fits 180cm, 200cm, 220cm Plotters', 'High Tensile Strength'],
    compareSpecs: {
      type: 'Steel Core Timing Belt',
      speed: 'Zero Slip Traction',
      capacity: 'Fits All 220cm Plotters',
      power: 'High Tensile PU',
      warranty: '100% Genuine'
    }
  },
  /* Official Ink Products from INK.pdf */
  {
    id: 'ink-45-regular',
    name: '45 Regular Plotter Ink Cartridge (Made In China)',
    category: 'spares',
    price: 15,
    listPrice: 17,
    rating: 4.8,
    reviews: 142,
    badge: 'Best Seller',
    image: 'assets/images/products/ink-45-regular.jpg',
    desc: '45 Regular standard density black ink cartridge for apparel inkjet plotters. 100% replacement warranty without physical damage.',
    specs: ['Origin: Made In China', 'Price: 1,850 TK (Reg: 2,100 TK)', '100% Replacement Warranty', 'Free Machine & CAD Service'],
    compareSpecs: {
      type: 'HP45 Regular Ink',
      speed: 'Quick Drying Black',
      capacity: 'Standard 42ml Reservoir',
      power: 'Universal 45 Fitting',
      warranty: '100% Replacement (No Physical Damage)'
    }
  },
  {
    id: 'ink-wecare-45',
    name: 'Wecare 45 High-Clarity Ink Cartridge (Made In China)',
    category: 'spares',
    price: 18,
    listPrice: 20,
    rating: 4.9,
    reviews: 98,
    badge: 'Popular',
    image: 'assets/images/products/ink-wecare-45.jpg',
    desc: 'Wecare 45 quick-drying dark black ink cartridge with anti-clogging formula for crisp pattern lines and markers.',
    specs: ['Origin: Made In China', 'Price: 2,200 TK (Reg: 2,500 TK)', 'High Clarity Anti-Clog Formula', '1-Year Product Warranty'],
    compareSpecs: {
      type: 'Wecare 45 Ink',
      speed: 'Instant Drying',
      capacity: '45ml High Density',
      power: 'Fits G-MAC, NTS, Gerber',
      warranty: '1-Year Product Warranty'
    }
  },
  {
    id: 'ink-nts-45a',
    name: 'NTS 45A Premium Plotter Ink Cartridge (Made In China)',
    category: 'spares',
    price: 28.5,
    listPrice: 30,
    rating: 4.9,
    reviews: 186,
    badge: 'NTS Choice',
    image: 'assets/images/products/ink-nts-45a.jpg',
    desc: 'Official NTS 45A cartridge engineered for high-speed continuous plotting with zero line skips and dark marker contrast.',
    specs: ['Origin: Made In China', 'Price: 3,500 TK (Reg: 3,700 TK)', 'Ultra-Fine Continuous Flow', 'Free Ink Machine Service'],
    compareSpecs: {
      type: 'NTS 45A Premium Ink',
      speed: '200 m²/h Continuous High-Speed',
      capacity: 'Extended Life Cartridge',
      power: 'Fits All NTS & HP Plotters',
      warranty: '100% Replacement Warranty'
    }
  },
  {
    id: 'ink-wecare-45a-plus',
    name: 'Wecare 45A Plus High-Yield Ink (Made In China)',
    category: 'spares',
    price: 31.3,
    listPrice: 33,
    rating: 4.8,
    reviews: 74,
    badge: 'Extended Yield',
    image: 'assets/images/products/ink-wecare-45a-plus.jpg',
    desc: 'Wecare 45A Plus heavy-duty cartridge with extra ink capacity for large export garment cutting and pattern rooms.',
    specs: ['Origin: Made In China', 'Price: 3,850 TK (Reg: 4,000 TK)', 'High Capacity Ink Reservoir', 'VAT/TAX Exempted'],
    compareSpecs: {
      type: 'Wecare 45A Plus',
      speed: 'Dark Contrast Plotting',
      capacity: 'Extended 48ml Reservoir',
      power: 'Universal 45 Bayonet',
      warranty: '1-Year Full Warranty'
    }
  },
  {
    id: 'ink-tkt-45',
    name: 'TKT 45 Original European Ink Cartridge (Made In Ireland)',
    category: 'spares',
    price: 31.7,
    listPrice: 34,
    rating: 5.0,
    reviews: 112,
    badge: 'OEM Ireland',
    image: 'assets/images/products/ink-tkt-45.jpg',
    desc: 'Authentic European TKT 45 ink cartridge manufactured in Ireland for maximum precision, razor-sharp outlines, and zero nozzle drying.',
    specs: ['Origin: Made In Ireland', 'Price: 3,900 TK (Reg: 4,200 TK)', 'Original European Standard', '100% Replacement Warranty'],
    compareSpecs: {
      type: 'TKT 45 (Made in Ireland)',
      speed: 'Ultra High Precision',
      capacity: 'Original Ireland Fill',
      power: 'European Certified Standard',
      warranty: '1-Year Product Warranty'
    }
  },
  {
    id: 'ink-nts-45a-plus',
    name: 'NTS 45A Plus Ultra Cartridge (Made In Hong Kong)',
    category: 'spares',
    price: 32.1,
    listPrice: 35,
    rating: 4.9,
    reviews: 135,
    badge: 'Hong Kong Edition',
    image: 'assets/images/products/ink-nts-45a-plus.jpg',
    desc: 'Top-tier NTS 45A Plus export-grade cartridge manufactured in Hong Kong for high-volume 24/7 garment factory operations.',
    specs: ['Origin: Made In Hong Kong', 'Price: 3,950 TK (Reg: 4,300 TK)', 'Extra Dark Pigment Flow', 'Free CAD Software Service'],
    compareSpecs: {
      type: 'NTS 45A Plus (Hong Kong)',
      speed: 'Continuous Heavy Duty Flow',
      capacity: 'High-Purity Pigment',
      power: 'Fits 2-Head & 4-Head Plotters',
      warranty: '100% Replacement Warranty'
    }
  },
  {
    id: 'ink-hp45-original-india',
    name: 'HP-45 Original Cartridge - Import India (Made In Ireland)',
    category: 'spares',
    price: 35,
    listPrice: 39,
    rating: 5.0,
    reviews: 215,
    badge: '100% Original',
    image: 'assets/images/products/ink-hp45-original.jpg',
    desc: 'Genuine HP-45 51645A black print cartridge made in Ireland, imported directly from India with sealed verification.',
    specs: ['Origin: Made In Ireland (Import India)', 'Price: 4,300 TK (Reg: 4,800 TK)', '100% Genuine HP Sealed', 'Free Machine Service'],
    compareSpecs: {
      type: 'HP-45 Original (Import India)',
      speed: 'Official Hewlett-Packard Spec',
      capacity: '42ml Factory Sealed',
      power: 'All Garment Inkjet Plotters',
      warranty: '100% Genuine Replacement'
    }
  },
  {
    id: 'ink-hp45-original-china',
    name: 'HP-45 Original Cartridge - Import China (Made In Ireland)',
    category: 'spares',
    price: 39,
    listPrice: 43,
    rating: 5.0,
    reviews: 168,
    badge: '100% Original',
    image: 'assets/images/products/part-hp45-cartridge.png',
    desc: 'Original factory sealed HP-45 print cartridge manufactured in Ireland and imported via China with authentic manufacturer serials.',
    specs: ['Origin: Made In Ireland (Import China)', 'Price: 4,800 TK (Reg: 5,300 TK)', 'Authentic Serial & Seal', 'VAT/TAX Exempted'],
    compareSpecs: {
      type: 'HP-45 Original (Import China)',
      speed: 'Official Hewlett-Packard Spec',
      capacity: '42ml Factory Sealed',
      power: 'All Garment Inkjet Plotters',
      warranty: '100% Genuine Replacement'
    }
  },
  {
    id: 'ink-hp45-local',
    name: 'HP-45 Local Utility Ink Cartridge (Without QR Code)',
    category: 'spares',
    price: 13.8,
    listPrice: 15,
    rating: 4.6,
    reviews: 83,
    badge: 'Budget Pick',
    image: 'assets/images/products/part-hp45-cartridge.png',
    desc: 'Cost-effective utility 45 ink cartridge without QR code, ideal for daily internal marker printing and test drafts.',
    specs: ['Type: Local Utility (Without QR)', 'Price: 1,700 TK (Reg: 1,850 TK)', 'Budget-Friendly Daily Plotting', '100% Replacement Warranty'],
    compareSpecs: {
      type: 'HP-45 Local Utility',
      speed: 'Standard Daily Plotting',
      capacity: '42ml Standard',
      power: 'All HP45 Head Plotters',
      warranty: 'Replacement Assured'
    }
  },
  {
    id: 'ink-alys-china',
    name: 'Lectra Alys Ink Cartridge Block (Made In China)',
    category: 'spares',
    price: 85.4,
    listPrice: 98,
    rating: 4.8,
    reviews: 51,
    badge: 'Lectra Compatible',
    image: 'assets/images/products/ink-alys-china.jpg',
    desc: 'Continuous ink block specifically designed for Lectra Alys 20, 30, 60, and 120 series apparel plotters.',
    specs: ['Origin: Made In China', 'Price: 10,500 TK (Reg: 12,000 TK)', 'Fits Lectra Alys 20/30/60/120', '1-Year Product Warranty'],
    compareSpecs: {
      type: 'Lectra Alys Ink Block',
      speed: 'Continuous Siphon Feed',
      capacity: 'High-Volume Alys Tank',
      power: 'Lectra Alys Compatible',
      warranty: '1-Year Warranty'
    }
  },
  {
    id: 'ink-alys-vietnam',
    name: 'Lectra Alys Ink Cartridge Block (Made In Vietnam)',
    category: 'spares',
    price: 101.6,
    listPrice: 114,
    rating: 4.9,
    reviews: 44,
    badge: 'Vietnam Grade',
    image: 'assets/images/products/ink-alys-vietnam.jpg',
    desc: 'High-purity ink block manufactured in Vietnam for Lectra Alys series plotters with smooth gravity ink delivery.',
    specs: ['Origin: Made In Vietnam', 'Price: 12,500 TK (Reg: 14,000 TK)', 'High Purity Nozzle Protection', 'Free Machine Service'],
    compareSpecs: {
      type: 'Lectra Alys Ink Block',
      speed: 'Continuous High Flow',
      capacity: 'High-Volume Alys Tank',
      power: 'Lectra Alys Plotters',
      warranty: '1-Year Product Warranty'
    }
  },
  {
    id: 'ink-alys-premium-703730',
    name: 'Premium Quality Lectra Alys 703730 Ink (Made In China)',
    category: 'spares',
    price: 122,
    listPrice: 130,
    rating: 5.0,
    reviews: 62,
    badge: 'OEM 703730',
    image: 'assets/images/products/ink-alys-premium-703730.jpg',
    desc: 'OEM standard Lectra part 703730 replacement ink cassette for high-volume non-stop industrial apparel plotting.',
    specs: ['Part Code: Lectra 703730', 'Price: 15,000 TK (Reg: 16,000 TK)', 'OEM Standard Heavy Duty', '100% Replacement Warranty'],
    compareSpecs: {
      type: 'Lectra Alys 703730 OEM',
      speed: 'Industrial Heavy Duty',
      capacity: 'Maximum Factory Fill',
      power: 'Lectra Alys High-End Series',
      warranty: '100% Replacement Warranty'
    }
  }
];

// App States
let quoteCart = [];
let compareList = [];

// Initialize all features on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  loadCartFromStorage();
  initGlobalSearch();
  initCartDrawer();
  initCountdownTimer();
  initQuickViewModal();
  initAddToCartButtons();
  initQuoteCalculator();
  initRoiCalculator();
  initCompareEngine();
  initReviewModal();
  initDemoVideoModal();
  initHeroAutoSlider();
  initContactFormHandler();
});

/* Session Cart Management (Empty by default on new visits) */
function loadCartFromStorage() {
  try {
    // Clear legacy localStorage so new visitors start completely fresh
    localStorage.removeItem('nts_quote_cart');
    const saved = sessionStorage.getItem('nts_quote_cart');
    if (saved) {
      quoteCart = JSON.parse(saved);
    } else {
      quoteCart = [];
    }
  } catch (e) {
    quoteCart = [];
  }
  updateCartBadge();
}

function saveCartToStorage() {
  try {
    sessionStorage.setItem('nts_quote_cart', JSON.stringify(quoteCart));
  } catch (e) {}
  updateCartBadge();
  renderCartDrawerItems();
}

function updateCartBadge() {
  const countEls = document.querySelectorAll('.cart-count-badge');
  const totalCount = quoteCart.reduce((sum, item) => sum + item.qty, 0);

  countEls.forEach(el => {
    el.textContent = totalCount;
    if (totalCount > 0) {
      el.classList.remove('hidden');
      el.classList.add('cart-animate-bounce');
      setTimeout(() => el.classList.remove('cart-animate-bounce'), 500);
    } else {
      el.classList.add('hidden');
    }
  });
}

function showToast(message) {
  let toast = document.getElementById('nts-global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'nts-global-toast';
    toast.className = 'fixed bottom-24 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 text-sm font-semibold pointer-events-none';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400 text-lg"></i> <span>${message}</span>`;
  toast.classList.remove('hidden', 'toast-out');
  toast.classList.add('toast-in');

  setTimeout(() => {
    toast.classList.remove('toast-in');
    toast.classList.add('toast-out');
    setTimeout(() => toast.classList.add('hidden'), 300);
  }, 2500);
}

/* Feature: Automatic Scrolling Hero Card with 3 Products */
function initHeroAutoSlider() {
  const track = document.getElementById('hero-slider-track');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.getElementById('btn-hero-prev');
  const nextBtn = document.getElementById('btn-hero-next');
  const sliderContainer = document.getElementById('hero-slider-container');

  if (!track || dots.length === 0) return;

  let currentIndex = 0;
  const totalSlides = dots.length;
  let autoSlideInterval = null;

  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 3500);
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      startAutoSlide();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-index') || 0);
      goToSlide(targetIndex);
      startAutoSlide();
    });
  });

  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
    sliderContainer.addEventListener('touchstart', stopAutoSlide, { passive: true });
    sliderContainer.addEventListener('touchend', startAutoSlide, { passive: true });
  }

  startAutoSlide();
}

/* Global Live Search */
function initGlobalSearch() {
  const searchInput = document.getElementById('amazon-global-search');
  const categorySelect = document.getElementById('amazon-search-category');
  const resultsContainer = document.getElementById('amazon-search-results');

  if (!searchInput || !resultsContainer) return;

  function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    const category = categorySelect ? categorySelect.value : 'all';

    if (query.length < 2) {
      resultsContainer.classList.add('hidden');
      return;
    }

    const matches = PRODUCT_CATALOG.filter(p => {
      const matchCat = (category === 'all' || p.category === category);
      const matchText = p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
      return matchCat && matchText;
    });

    if (matches.length === 0) {
      resultsContainer.innerHTML = `<div class="p-4 text-xs text-slate-500 text-center">No products found for "<strong>${query}</strong>". Try typing "Plotter", "CAD", "Cutter", "Cartridge", or "Blade".</div>`;
    } else {
      resultsContainer.innerHTML = matches.map(p => `
        <div class="p-3 border-b border-slate-100 hover:bg-sky-50 flex items-center justify-between gap-3 cursor-pointer transition" onclick="openQuickView('${p.id}')">
          <div class="flex items-center gap-3">
            <img src="${p.image}" alt="${p.name}" class="w-10 h-10 object-contain rounded bg-white border border-slate-200 p-1 shrink-0">
            <div>
              <p class="text-xs font-bold text-slate-900 leading-tight">${p.name}</p>
              <p class="text-[11px] text-slate-500">${p.specs[0]} • ⭐ ${p.rating} (${p.reviews})</p>
            </div>
          </div>
          <div class="text-right shrink-0">
            <span class="text-xs font-extrabold text-amber-600 font-heading">$${p.price.toLocaleString()}</span>
            <span class="block text-[10px] text-emerald-600 font-semibold">${(p.price * EXCHANGE_RATE).toLocaleString()} BDT</span>
          </div>
        </div>
      `).join('');
    }
    resultsContainer.classList.remove('hidden');
  }

  searchInput.addEventListener('input', handleSearch);
  if (categorySelect) categorySelect.addEventListener('change', handleSearch);

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
      resultsContainer.classList.add('hidden');
    }
  });
}

/* Cart Drawer Logic */
function initCartDrawer() {
  const openButtons = document.querySelectorAll('.btn-open-cart');
  const closeButton = document.getElementById('btn-close-cart');
  const drawerOverlay = document.getElementById('cart-drawer-overlay');
  const drawer = document.getElementById('cart-drawer');

  function openDrawer() {
    if (drawerOverlay && drawer) {
      renderCartDrawerItems();
      drawerOverlay.classList.remove('hidden');
      setTimeout(() => {
        drawerOverlay.classList.remove('opacity-0');
        drawer.classList.remove('translate-x-full');
      }, 10);
    }
  }

  function closeDrawer() {
    if (drawerOverlay && drawer) {
      drawerOverlay.classList.add('opacity-0');
      drawer.classList.add('translate-x-full');
      setTimeout(() => drawerOverlay.classList.add('hidden'), 300);
    }
  }

  openButtons.forEach(btn => btn.addEventListener('click', openDrawer));
  if (closeButton) closeButton.addEventListener('click', closeDrawer);
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) closeDrawer();
    });
  }
}

function renderCartDrawerItems() {
  const container = document.getElementById('cart-drawer-items');
  const subtotalUsdEl = document.getElementById('cart-drawer-subtotal-usd');
  const subtotalBdtEl = document.getElementById('cart-drawer-subtotal-bdt');

  if (!container) return;

  if (quoteCart.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center text-slate-400">
        <i class="fa-solid fa-cart-arrow-down text-4xl mb-3 text-slate-300"></i>
        <p class="text-sm font-semibold text-slate-700">Your Quote Cart is Empty</p>
        <p class="text-xs text-slate-500 mt-1">Click "Add to Quote" on any product to see prices here.</p>
      </div>
    `;
    if (subtotalUsdEl) subtotalUsdEl.textContent = '$0';
    if (subtotalBdtEl) subtotalBdtEl.textContent = '0 BDT';
    return;
  }

  let subtotal = 0;

  container.innerHTML = quoteCart.map((item, index) => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    return `
      <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex gap-3 items-center justify-between">
        <img src="${item.image}" alt="${item.name}" class="w-14 h-14 object-contain rounded-lg bg-white border border-slate-200 p-1 shrink-0">
        <div class="flex-1 min-w-0">
          <h5 class="text-xs font-bold text-slate-900 truncate">${item.name}</h5>
          <p class="text-[11px] text-slate-500">$${item.price.toLocaleString()} USD each</p>
          <div class="flex items-center gap-2 mt-1.5">
            <button type="button" onclick="updateItemQty(${index}, -1)" class="w-6 h-6 rounded bg-slate-200 text-slate-700 font-bold hover:bg-slate-300 flex items-center justify-center text-xs">-</button>
            <span class="text-xs font-bold text-slate-800">${item.qty}</span>
            <button type="button" onclick="updateItemQty(${index}, 1)" class="w-6 h-6 rounded bg-slate-200 text-slate-700 font-bold hover:bg-slate-300 flex items-center justify-center text-xs">+</button>
            <button type="button" onclick="removeItemFromCart(${index})" class="text-[11px] text-rose-500 hover:text-rose-700 ml-2" title="Remove"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>
        <div class="text-right shrink-0">
          <p class="text-xs font-bold text-slate-900 font-heading">$${itemTotal.toLocaleString()}</p>
          <p class="text-[10px] text-emerald-600 font-semibold">${(itemTotal * EXCHANGE_RATE).toLocaleString()} BDT</p>
        </div>
      </div>
    `;
  }).join('');

  if (subtotalUsdEl) subtotalUsdEl.textContent = `$${subtotal.toLocaleString()}`;
  if (subtotalBdtEl) subtotalBdtEl.textContent = `${(subtotal * EXCHANGE_RATE).toLocaleString()} BDT`;
}

window.updateItemQty = function(index, delta) {
  if (quoteCart[index]) {
    quoteCart[index].qty += delta;
    if (quoteCart[index].qty <= 0) {
      quoteCart.splice(index, 1);
    }
    saveCartToStorage();
  }
};

window.removeItemFromCart = function(index) {
  quoteCart.splice(index, 1);
  saveCartToStorage();
  showToast('Item removed from cart.');
};

window.clearCart = function() {
  quoteCart = [];
  saveCartToStorage();
  showToast('Cart cleared.');
};

window.sendCartToWhatsApp = function() {
  if (quoteCart.length === 0) {
    showToast('Your quote cart is empty! Please add products first.');
    return;
  }

  let totalUsd = 0;
  let lines = quoteCart.map((item, idx) => {
    const itemTotal = item.price * item.qty;
    totalUsd += itemTotal;
    return `${idx + 1}. *${item.name}* (Qty: ${item.qty}) - $${itemTotal.toLocaleString()} USD`;
  }).join('%0A');

  const totalBdt = (totalUsd * EXCHANGE_RATE).toLocaleString();
  const msg = `Hello NDIGO TECH SOLUTIONS!%0A%0AI would like an official quotation for the following items from my cart:%0A${lines}%0A%0A*Total Estimated Price:* $${totalUsd.toLocaleString()} USD (~${totalBdt} BDT)%0A%0APlease contact me with delivery and payment details. Thank you!`;

  window.open(`https://wa.me/8801770082829?text=${msg}`, '_blank');
};

function initAddToCartButtons() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-add-to-quote');
    if (!btn) return;

    const id = btn.getAttribute('data-id');
    const product = PRODUCT_CATALOG.find(p => p.id === id);

    if (product) {
      const existing = quoteCart.find(item => item.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        quoteCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1
        });
      }
      saveCartToStorage();
      showToast(`Added "${product.name.split(' (')[0]}" to Quote Cart!`);
    }
  });
}

/* Frequently Bought Together Bundle Adder */
window.addFrequentBundle = function() {
  const bundleIds = ['gmac-plotter-gen04', 'spare-hp45-cartridges', 'spare-kraft-paper'];
  bundleIds.forEach(id => {
    const product = PRODUCT_CATALOG.find(p => p.id === id);
    if (product) {
      const existing = quoteCart.find(item => item.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        quoteCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1
        });
      }
    }
  });
  saveCartToStorage();
  showToast('Added Complete 3-in-1 Plotter Bundle to Quote Cart!');
};

/* Quick View Modal Handler */
function initQuickViewModal() {
  const modal = document.getElementById('product-quick-view-modal');
  const closeBtn = document.getElementById('btn-close-quick-view');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }
}

window.openQuickView = function(productId) {
  const product = PRODUCT_CATALOG.find(p => p.id === productId);
  const modal = document.getElementById('product-quick-view-modal');

  if (!product || !modal) return;

  document.getElementById('qv-title').textContent = product.name;
  document.getElementById('qv-image').src = product.image;
  document.getElementById('qv-desc').textContent = product.desc;
  document.getElementById('qv-price').textContent = `$${product.price.toLocaleString()} USD`;
  document.getElementById('qv-bdt-price').textContent = `${(product.price * EXCHANGE_RATE).toLocaleString()} BDT`;
  document.getElementById('qv-list-price').textContent = `$${product.listPrice.toLocaleString()} USD`;
  
  const discountPercent = Math.round(((product.listPrice - product.price) / product.listPrice) * 100);
  document.getElementById('qv-discount-badge').textContent = `Save ${discountPercent}%`;

  const specsContainer = document.getElementById('qv-specs');
  if (specsContainer) {
    specsContainer.innerHTML = product.specs.map(s => `
      <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-emerald-500 text-xs"></i> <span>${s}</span></li>
    `).join('');
  }

  const addBtn = document.getElementById('qv-add-btn');
  if (addBtn) {
    addBtn.setAttribute('data-id', product.id);
  }

  modal.classList.remove('hidden');
};

/* Feature 1: Interactive ROI & Fabric Savings Calculator */
function initRoiCalculator() {
  const fabricSlider = document.getElementById('roi-fabric-usage');
  const priceSlider = document.getElementById('roi-fabric-price');
  const wasteSlider = document.getElementById('roi-waste-reduction');

  const fabricValEl = document.getElementById('roi-fabric-usage-val');
  const priceValEl = document.getElementById('roi-fabric-price-val');
  const wasteValEl = document.getElementById('roi-waste-val');

  const savedFabricEl = document.getElementById('roi-saved-fabric');
  const savedUsdEl = document.getElementById('roi-saved-usd');
  const savedBdtEl = document.getElementById('roi-saved-bdt');
  const paybackEl = document.getElementById('roi-payback-days');

  if (!fabricSlider || !priceSlider || !wasteSlider) return;

  function calculateRoi() {
    const monthlyMeters = parseFloat(fabricSlider.value);
    const pricePerMeter = parseFloat(priceSlider.value);
    const wastePercent = parseFloat(wasteSlider.value);

    fabricValEl.textContent = `${monthlyMeters.toLocaleString()} meters / month`;
    priceValEl.textContent = `$${pricePerMeter.toFixed(2)} / meter`;
    wasteValEl.textContent = `${wastePercent}% fabric saved`;

    const savedMeters = Math.round(monthlyMeters * (wastePercent / 100));
    const savedUsd = Math.round(savedMeters * pricePerMeter);
    const savedBdt = savedUsd * EXCHANGE_RATE;

    const bundleCostUsd = 8500;
    const paybackMonths = bundleCostUsd / (savedUsd || 1);
    const paybackDays = Math.max(15, Math.round(paybackMonths * 30));

    if (savedFabricEl) savedFabricEl.textContent = `${savedMeters.toLocaleString()} meters`;
    if (savedUsdEl) savedUsdEl.textContent = `$${savedUsd.toLocaleString()} USD`;
    if (savedBdtEl) savedBdtEl.textContent = `${savedBdt.toLocaleString()} BDT`;
    if (paybackEl) paybackEl.textContent = `${paybackDays} Days`;
  }

  [fabricSlider, priceSlider, wasteSlider].forEach(input => {
    input.addEventListener('input', calculateRoi);
  });

  calculateRoi();
}

/* Feature 2: Side-by-Side Product Comparison Engine */
function initCompareEngine() {
  document.addEventListener('change', (e) => {
    if (e.target.classList.contains('compare-checkbox')) {
      const id = e.target.getAttribute('data-id');
      if (e.target.checked) {
        if (compareList.length >= 3) {
          e.target.checked = false;
          showToast('You can compare a maximum of 3 products at a time.');
          return;
        }
        if (!compareList.includes(id)) compareList.push(id);
      } else {
        compareList = compareList.filter(item => item !== id);
      }
      updateCompareBar();
    }
  });

  const closeCompareBtn = document.getElementById('btn-close-compare');
  const modal = document.getElementById('compare-matrix-modal');
  if (closeCompareBtn && modal) {
    closeCompareBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }
}

function updateCompareBar() {
  const bar = document.getElementById('compare-floating-bar');
  const countEl = document.getElementById('compare-item-count');
  if (!bar || !countEl) return;

  countEl.textContent = compareList.length;

  if (compareList.length > 0) {
    bar.classList.remove('hidden');
    setTimeout(() => {
      bar.classList.remove('translate-y-24', 'opacity-0');
    }, 10);
  } else {
    bar.classList.add('translate-y-24', 'opacity-0');
    setTimeout(() => bar.classList.add('hidden'), 300);
  }
}

window.clearCompareList = function() {
  compareList = [];
  document.querySelectorAll('.compare-checkbox').forEach(cb => cb.checked = false);
  updateCompareBar();
};

window.openCompareModal = function() {
  if (compareList.length === 0) return;

  const modal = document.getElementById('compare-matrix-modal');
  const container = document.getElementById('compare-table-container');

  const products = compareList.map(id => PRODUCT_CATALOG.find(p => p.id === id)).filter(Boolean);

  container.innerHTML = `
    <table class="w-full text-xs text-left border-collapse">
      <thead>
        <tr class="border-b-2 border-slate-200">
          <th class="py-3 px-3 text-slate-500 font-semibold w-1/4">Specification</th>
          ${products.map(p => `
            <th class="py-3 px-3 font-bold text-slate-900 text-center w-1/3">
              <img src="${p.image}" alt="${p.name}" class="h-20 object-contain mx-auto mb-2">
              <p class="truncate font-heading text-sm">${p.name}</p>
              <p class="text-amber-600 font-extrabold text-sm">$${p.price.toLocaleString()} USD</p>
            </th>
          `).join('')}
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
        <tr>
          <td class="py-2.5 px-3 font-bold text-slate-700">Category</td>
          ${products.map(p => `<td class="py-2.5 px-3 text-center uppercase text-[10px] font-bold text-sky-700">${p.category}</td>`).join('')}
        </tr>
        <tr>
          <td class="py-2.5 px-3 font-bold text-slate-700">Speed / Output</td>
          ${products.map(p => `<td class="py-2.5 px-3 text-center text-slate-700">${p.compareSpecs?.speed || 'Standard'}</td>`).join('')}
        </tr>
        <tr>
          <td class="py-2.5 px-3 font-bold text-slate-700">Capacity / Size</td>
          ${products.map(p => `<td class="py-2.5 px-3 text-center text-slate-700">${p.compareSpecs?.capacity || 'High Capacity'}</td>`).join('')}
        </tr>
        <tr>
          <td class="py-2.5 px-3 font-bold text-slate-700">Power / System</td>
          ${products.map(p => `<td class="py-2.5 px-3 text-center text-slate-700">${p.compareSpecs?.power || '220V AC'}</td>`).join('')}
        </tr>
        <tr>
          <td class="py-2.5 px-3 font-bold text-slate-700">Warranty Term</td>
          ${products.map(p => `<td class="py-2.5 px-3 text-center text-emerald-600 font-bold">${p.compareSpecs?.warranty || '1-Yr Parts Warranty'}</td>`).join('')}
        </tr>
      </tbody>
    </table>
  `;

  modal.classList.remove('hidden');
};

/* Feature 3: Verified Customer Review Submission Modal */
let currentSelectedReviewRating = 5;

function initReviewModal() {
  const openBtn = document.getElementById('btn-open-write-review');
  const closeBtn = document.getElementById('btn-close-write-review');
  const modal = document.getElementById('write-review-modal');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      currentSelectedReviewRating = 5;
      const starSelects = document.querySelectorAll('.review-star-select');
      starSelects.forEach(s => {
        s.classList.add('text-amber-400');
        s.classList.remove('text-slate-300');
      });
      modal.classList.remove('hidden');
    });
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  }

  const starSelects = document.querySelectorAll('.review-star-select');
  starSelects.forEach(star => {
    star.addEventListener('click', () => {
      currentSelectedReviewRating = parseInt(star.getAttribute('data-val') || '5', 10);
      starSelects.forEach((s, idx) => {
        if (idx < currentSelectedReviewRating) {
          s.classList.add('text-amber-400');
          s.classList.remove('text-slate-300');
        } else {
          s.classList.remove('text-amber-400');
          s.classList.add('text-slate-300');
        }
      });
    });
  });

  loadSavedCustomerReviews();
}

function loadSavedCustomerReviews() {
  const reviewList = document.getElementById('customer-reviews-list');
  if (!reviewList) return;

  try {
    const saved = JSON.parse(sessionStorage.getItem('nts_user_reviews') || '[]');
    saved.forEach(rev => {
      renderReviewCard(rev, false);
    });
  } catch (e) {}
}

function renderReviewCard(rev, isNew = false) {
  const reviewList = document.getElementById('customer-reviews-list');
  if (!reviewList) return;

  const starHtml = Array.from({ length: 5 }, (_, i) => {
    return i < rev.rating
      ? `<i class="fa-solid fa-star text-amber-400"></i>`
      : `<i class="fa-regular fa-star text-slate-300"></i>`;
  }).join('');

  const newCard = document.createElement('div');
  newCard.className = isNew
    ? 'p-4 bg-white rounded-xl border-2 border-emerald-500 shadow-md space-y-2 transition duration-500'
    : 'p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2';

  newCard.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shadow-sm">
          ${rev.author.charAt(0).toUpperCase()}
        </div>
        <div>
          <p class="text-xs font-bold text-slate-900">${rev.author}</p>
          <p class="text-[10px] text-slate-500">${rev.factory} • <span class="text-emerald-600 font-semibold"><i class="fa-solid fa-circle-check"></i> Verified Factory Buyer</span></p>
        </div>
      </div>
      <div class="star-rating text-xs flex gap-0.5">
        ${starHtml}
      </div>
    </div>
    <p class="text-xs text-slate-700 leading-relaxed font-normal">"${rev.comment}"</p>
  `;

  reviewList.prepend(newCard);

  if (isNew) {
    setTimeout(() => {
      newCard.classList.remove('border-2', 'border-emerald-500', 'shadow-md');
      newCard.classList.add('border', 'border-slate-200', 'shadow-sm');
    }, 2000);
  }
}

window.submitCustomerReview = function(e) {
  e.preventDefault();
  const authorInput = document.getElementById('rev-author');
  const factoryInput = document.getElementById('rev-factory');
  const commentInput = document.getElementById('rev-comment');

  const author = authorInput?.value.trim() || 'Garment Factory Manager';
  const factory = factoryInput?.value.trim() || 'Garment Factory Ltd.';
  const comment = commentInput?.value.trim() || 'Great machinery and responsive customer support.';
  const rating = currentSelectedReviewRating || 5;

  const reviewObj = { author, factory, comment, rating, date: new Date().toISOString() };

  // Render to DOM with solid crisp card (no fading)
  renderReviewCard(reviewObj, true);

  // Save to sessionStorage
  try {
    const existing = JSON.parse(sessionStorage.getItem('nts_user_reviews') || '[]');
    existing.unshift(reviewObj);
    sessionStorage.setItem('nts_user_reviews', JSON.stringify(existing));
  } catch (err) {}

  // Reset form inputs
  if (authorInput) authorInput.value = '';
  if (factoryInput) factoryInput.value = '';
  if (commentInput) commentInput.value = '';

  document.getElementById('write-review-modal')?.classList.add('hidden');
  showToast('Thank you! Your verified factory review has been published.');
};

/* Feature 4: Machine Video Demo Modal */
function initDemoVideoModal() {
  const closeBtn = document.getElementById('btn-close-demo-video');
  const modal = document.getElementById('demo-video-modal');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  }
}

window.openDemoVideo = function(title) {
  const modal = document.getElementById('demo-video-modal');
  const titleEl = document.getElementById('demo-video-title');
  if (modal) {
    if (titleEl) titleEl.textContent = `Live Operation Demo: ${title}`;
    modal.classList.remove('hidden');
  }
};

/* Feature 5: Countdown Deal Timer */
function initCountdownTimer() {
  const timerEl = document.getElementById('deal-countdown-timer');
  if (!timerEl) return;

  let totalSeconds = 14 * 3600 + 28 * 60 + 12;

  setInterval(() => {
    totalSeconds--;
    if (totalSeconds < 0) totalSeconds = 24 * 3600;

    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    timerEl.textContent = `${hours}h : ${mins}m : ${secs}s`;
  }, 1000);
}

/* Feature 6: Homepage Category Expander & Filter */
window.toggleCategoryExpand = function(gridId, btn) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  const extraItems = grid.querySelectorAll('.extra-cat-item');
  const isExpanded = btn.getAttribute('data-expanded') === 'true';

  if (isExpanded) {
    extraItems.forEach(item => {
      item.classList.add('hidden');
      item.classList.remove('flex');
    });
    btn.setAttribute('data-expanded', 'false');
    const count = extraItems.length;
    btn.innerHTML = `<span>See More (${count} More)</span> <i class="fa-solid fa-chevron-down ml-1.5"></i>`;
  } else {
    extraItems.forEach(item => {
      item.classList.remove('hidden');
      item.classList.add('flex');
    });
    btn.setAttribute('data-expanded', 'true');
    btn.innerHTML = `<span>See Less</span> <i class="fa-solid fa-chevron-up ml-1.5"></i>`;
  }
};

window.filterHomeProducts = function(category, clickedBtn) {
  const sections = document.querySelectorAll('.category-group-row');
  const tabs = document.querySelectorAll('.home-filter-tab');

  tabs.forEach(tab => {
    tab.classList.remove('bg-slate-900', 'text-white', 'shadow-sm');
    tab.classList.add('bg-white', 'text-slate-700', 'border', 'border-slate-200');
  });

  if (clickedBtn) {
    clickedBtn.classList.remove('bg-white', 'text-slate-700', 'border', 'border-slate-200');
    clickedBtn.classList.add('bg-slate-900', 'text-white', 'shadow-sm');
  }

  if (sections.length > 0) {
    sections.forEach(sec => {
      const secCat = sec.getAttribute('data-category');
      if (category === 'all' || secCat === category) {
        sec.style.display = 'block';
      } else {
        sec.style.display = 'none';
      }
    });
  }
};

/* Feature 7: Working Quick Message / Contact Form with ASP.NET API & WhatsApp Fallback */
function initContactFormHandler() {
  const contactForm = document.getElementById('contact-inquiry-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value || '';
    const company = document.getElementById('contact-company')?.value || '';
    const phone = document.getElementById('contact-phone')?.value || '';
    const product = document.getElementById('contact-product')?.value || '';
    const message = document.getElementById('contact-message')?.value || '';

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit Message';
    if (submitBtn) {
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Sending...`;
      submitBtn.disabled = true;
    }

    const payload = { name, company, phone, product, message };

    // Format instant WhatsApp URL
    const whatsappMsg = `Hello NDIGO Tech Solutions!%0A%0AI have submitted an inquiry from your website:%0A- *Name:* ${encodeURIComponent(name)}%0A- *Company:* ${encodeURIComponent(company)}%0A- *Phone:* ${encodeURIComponent(phone)}%0A- *Product of Interest:* ${encodeURIComponent(product)}%0A- *Message:* ${encodeURIComponent(message)}`;
    const whatsappUrl = `https://wa.me/8801770082829?text=${whatsappMsg}`;

    // Try posting to ASP.NET endpoint (api/ContactHandler.ashx)
    try {
      await fetch('/api/ContactHandler.ashx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      // Backend not running in ASP.NET mode, fallback gracefully
    }

    // Show success feedback
    const feedbackContainer = document.getElementById('contact-form-feedback');
    if (feedbackContainer) {
      feedbackContainer.innerHTML = `
        <div class="p-5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3 animate-fade-in">
          <div class="flex items-center gap-2 text-emerald-800 font-bold">
            <i class="fa-solid fa-circle-check text-xl text-emerald-600"></i>
            <span>Inquiry Received Successfully!</span>
          </div>
          <p class="text-xs text-slate-700">Thank you <strong>${name}</strong>. Your message for <strong>${company}</strong> has been logged. Nowshar Alam (+88 01770-082829) will contact you shortly.</p>
          <div class="pt-1">
            <a href="${whatsappUrl}" target="_blank" class="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition shadow">
              <i class="fa-brands fa-whatsapp text-sm"></i> Send Instant Copy to WhatsApp
            </a>
          </div>
        </div>
      `;
      feedbackContainer.classList.remove('hidden');
    }

    contactForm.reset();
    if (submitBtn) {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }

    showToast('Your message has been received!');
  });
}

/* Feature 8: Dynamic Quotation Builder */
function initQuoteCalculator() {
  const form = document.getElementById('quotation-config-form');
  if (!form) return;

  const companyInput = document.getElementById('quote-company-name');
  const contactPersonInput = document.getElementById('quote-contact-person');
  const addressInput = document.getElementById('quote-address');

  const docCompany = document.getElementById('doc-client-company');
  const docPerson = document.getElementById('doc-client-person');
  const docAddress = document.getElementById('doc-client-address');

  function updateClientDocInfo() {
    if (docCompany) {
      docCompany.textContent = companyInput?.value.trim() || '[Enter Company / Garments Name]';
    }
    if (docPerson) {
      const val = contactPersonInput?.value.trim();
      docPerson.textContent = val ? `Attn: ${val}` : 'Attn: [Attention / Contact Person]';
    }
    if (docAddress) {
      docAddress.textContent = addressInput?.value.trim() || '[Factory Address]';
    }
  }

  [companyInput, contactPersonInput, addressInput].forEach(inp => {
    if (inp) inp.addEventListener('input', updateClientDocInfo);
  });

  const softwareSelect = document.getElementById('cfg-software');
  const plotterSelect = document.getElementById('cfg-plotter');
  const cutterSelect = document.getElementById('cfg-cutter');
  const digitizerSelect = document.getElementById('cfg-digitizer');
  const sparesCheckboxes = document.querySelectorAll('.cfg-spare-item');

  const totalUsdEl = document.getElementById('quote-total-usd');
  const totalBdtEl = document.getElementById('quote-total-bdt');
  const tableItemsBody = document.getElementById('quote-preview-items');

  function calculateQuote() {
    let subtotalUsd = 0;
    let selectedItems = [];

    if (softwareSelect && softwareSelect.value !== 'none') {
      const option = softwareSelect.options[softwareSelect.selectedIndex];
      const price = parseFloat(option.getAttribute('data-price') || 0);
      const name = option.text.split(' - ')[0];
      subtotalUsd += price;
      selectedItems.push({
        name: name,
        desc: 'Garments Auto CAD Software Suite + Super Nesting ++Pro',
        qty: '01 License',
        price: price
      });
    }

    if (plotterSelect && plotterSelect.value !== 'none') {
      const option = plotterSelect.options[plotterSelect.selectedIndex];
      const price = parseFloat(option.getAttribute('data-price') || 0);
      const name = option.text.split(' - ')[0];
      subtotalUsd += price;
      selectedItems.push({
        name: name,
        desc: '4 HP Inkjet Heads, Floor Stand, Auto Paper Feed & Take-Up',
        qty: '01 Unit',
        price: price
      });
    }

    if (cutterSelect && cutterSelect.value !== 'none') {
      const option = cutterSelect.options[cutterSelect.selectedIndex];
      const price = parseFloat(option.getAttribute('data-price') || 0);
      const name = option.text.split(' - ')[0];
      subtotalUsd += price;
      selectedItems.push({
        name: name,
        desc: 'Flat-Bed Pattern Cutter with Dual Tools (Pen + Alloy Knife)',
        qty: '01 Unit',
        price: price
      });
    }

    if (digitizerSelect && digitizerSelect.value !== 'none') {
      const option = digitizerSelect.options[digitizerSelect.selectedIndex];
      const price = parseFloat(option.getAttribute('data-price') || 0);
      const name = option.text.split(' - ')[0];
      subtotalUsd += price;
      selectedItems.push({
        name: name,
        desc: '1-Click Camera Digitizer + G-MAC RAS CAD Software Included',
        qty: '01 Set',
        price: price
      });
    }

    sparesCheckboxes.forEach(cb => {
      if (cb.checked) {
        const price = parseFloat(cb.getAttribute('data-price') || 0);
        const name = cb.getAttribute('data-name');
        subtotalUsd += price;
        selectedItems.push({
          name: name,
          desc: 'Original Genuine Consumable / Spare Parts Pack',
          qty: '01 Pkg',
          price: price
        });
      }
    });

    const totalUsd = Math.max(0, subtotalUsd);
    const totalBdt = totalUsd * EXCHANGE_RATE;

    if (totalUsdEl) totalUsdEl.textContent = `$${totalUsd.toLocaleString()}`;
    if (totalBdtEl) totalBdtEl.textContent = `${totalBdt.toLocaleString()} BDT`;

    if (tableItemsBody) {
      if (selectedItems.length === 0) {
        tableItemsBody.innerHTML = `<tr><td colspan="4" class="py-8 text-center text-slate-400">No items selected yet. Choose products from the form above.</td></tr>`;
      } else {
        const itemsHtml = selectedItems.map((item, idx) => `
          <tr class="border-b border-slate-200">
            <td class="py-3 px-4 font-medium text-slate-900">${idx + 1}. ${item.name}<br><span class="text-xs text-slate-500 font-normal">${item.desc}</span></td>
            <td class="py-3 px-4 text-center text-slate-700 font-semibold">${item.qty}</td>
            <td class="py-3 px-4 text-right font-medium text-slate-800">$${item.price.toLocaleString()}</td>
            <td class="py-3 px-4 text-right font-bold text-slate-950">$${item.price.toLocaleString()}</td>
          </tr>
        `).join('');

        const totalRowHtml = `
          <tr class="bg-slate-100 font-bold border-t-2 border-slate-900">
            <td colspan="3" class="py-3 px-4 text-slate-900 uppercase text-right">Total Offer Price (USD):</td>
            <td class="py-3 px-4 text-right text-base text-slate-950 font-black font-heading">$${totalUsd.toLocaleString()} USD</td>
          </tr>
          <tr class="bg-slate-50 font-bold border-t border-slate-200">
            <td colspan="3" class="py-2.5 px-4 text-slate-700 text-xs text-right">Approximate Total in BDT (1 USD = 123 TK):</td>
            <td class="py-2.5 px-4 text-right text-sm text-emerald-700 font-extrabold font-heading">${totalBdt.toLocaleString()} BDT</td>
          </tr>
        `;

        tableItemsBody.innerHTML = itemsHtml + totalRowHtml;
      }
    }
  }

  [softwareSelect, plotterSelect, cutterSelect, digitizerSelect].forEach(el => {
    if (el) el.addEventListener('change', calculateQuote);
  });
  sparesCheckboxes.forEach(cb => cb.addEventListener('change', calculateQuote));

  updateClientDocInfo();
  calculateQuote();

  const printBtn = document.getElementById('btn-print-quote');
  if (printBtn) {
    printBtn.addEventListener('click', (e) => {
      e.preventDefault();
      updateClientDocInfo();
      calculateQuote();
      setTimeout(() => {
        window.print();
      }, 50);
    });
  }

  const whatsappBtn = document.getElementById('btn-whatsapp-quote');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const companyName = companyInput?.value.trim() || 'Garment Factory';
      const contactPerson = contactPersonInput?.value.trim() || 'Client';
      const totalUsd = totalUsdEl?.textContent || '$0';
      const totalBdt = totalBdtEl?.textContent || '0 BDT';

      const message = `Hello NDIGO Tech Solutions!%0A%0AI want to request an official quotation for:%0A- *Company:* ${encodeURIComponent(companyName)}%0A- *Contact:* ${encodeURIComponent(contactPerson)}%0A- *Total Price:* ${encodeURIComponent(totalUsd)} (${encodeURIComponent(totalBdt)})%0A%0APlease contact me. Thank you!`;
      window.open(`https://wa.me/8801770082829?text=${message}`, '_blank');
    });
  }
}
