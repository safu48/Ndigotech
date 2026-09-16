/**
 * NDIGO TECH SOLUTIONS - Master Product Catalog & Global JavaScript Engine
 * Official Garments CAD/CAM Service Provider
 */

const EXCHANGE_RATE = 123;

// Master Product Catalog (30 Products)
const PRODUCT_CATALOG = [
  // --- 1. CAD SOFTWARE ---
  {
    id: 'gmac-cad-40',
    name: 'GMAC 40.2 Garments Auto CAD Software Suite',
    category: 'software',
    price: 3500,
    listPrice: 4200,
    priceBdt: 430500,
    listPriceBdt: 516600,
    rating: 4.9,
    reviews: 128,
    badge: 'Best Seller',
    image: 'assets/images/products/sq-gmac-cad-software.jpg',
    desc: 'Complete 2D pattern design, super-fast grading, and Super Nesting ++Pro auto marker making that cuts fabric wastage by 3% to 6%. Opens Lectra, Gerber, and Optitex native files.',
    specs: [
      'Pattern Design (PDS) & Auto Grading Engine',
      'Super Nesting ++Pro (Ultra-Core Fabric Saving: 3%–6%)',
      'Universal Gerber / Lectra / DXF / AAMA / HPGL File Converter',
      'Knit fabric weight calculation (Kg/Dzn) & mini-marker reports',
      'Five Years Service Warranty • Lifetime License • Free Major Update'
    ],
    compareSpecs: {
      'System Type': '2D Pattern Design, Grading & Marker CAD Suite',
      'Nesting Engine': 'Super Nesting ++Pro (Ultra-Core 60-Second Compaction)',
      'File Formats': 'Lectra (.mdl, .iba), Gerber (.zip, .tmp), DXF, AAMA, HPGL/PLT',
      'Operating System': 'Windows 7 / 8.1 / 10 / 11 (32 & 64 bit)',
      'Language': 'English & Multilingual Support',
      'License Type': 'Perpetual USB Hardlock Dongle License',
      'Warranty': '5 Years Free Service Warranty + Lifetime License Protection'
    }
  },
  {
    id: 'gmac-footwear-cad',
    name: 'G-MAC Footwear 3D CAD Software Suite',
    category: 'software',
    price: 2800,
    listPrice: 3400,
    priceBdt: 344400,
    listPriceBdt: 418200,
    rating: 4.8,
    reviews: 64,
    badge: 'NTS Choice',
    image: 'assets/images/products/sq-footwear-3d-cad.jpg',
    desc: '3D shoe last digitization, virtual upper and sole styling, and automatic 2D pattern flattening for direct laser, knife, and CNC cutting.',
    specs: [
      '3D Shoe Last & Sole Design System',
      'Drawing Tablet & Precision Digitizing Integration',
      'Automatic 3D-to-2D Pattern Flattening',
      'Texture and Material Library (Leather, Mesh, Rubber, Synthetic)',
      'Five Years Service Warranty • Lifetime License Protection'
    ],
    compareSpecs: {
      'System Type': '3D Footwear Design & 2D Pattern Flattening Suite',
      'Rendering': 'Real-Time 3D Photorealistic Texture & Lighting Engine',
      'Pattern Flattening': 'Precision Mathematical Unfolding for Upper & Lining',
      'Hardware Export': 'Direct CNC Milling, Laser Cutting & Flatbed Output',
      'Warranty': '5 Years Free Service Warranty + Lifetime Dongle License'
    }
  },
  {
    id: 'gmac-3d-cad',
    name: 'G-MAC 3D Garments Virtual Sampling CAD',
    category: 'software',
    price: 3200,
    listPrice: 3900,
    priceBdt: 393600,
    listPriceBdt: 479700,
    rating: 4.9,
    reviews: 95,
    badge: 'Hot Deal',
    image: 'assets/images/products/sq-garment-3d-cad.jpg',
    desc: 'Virtual 3D fitting software with customizable digital avatars and real-time fabric drape simulation. Reduces physical sample room approval rounds by 80%.',
    specs: [
      '3D Virtual Avatar Dressing & Drape Simulation',
      'Fabric Tension & Seam Stress Heatmaps',
      'Customizable Fit Mannequins (Asian, European, US Standards)',
      'Virtual 360° Photo-Realistic 4K Sample Rendering',
      'Five Years Service Warranty • Lifetime License Protection'
    ],
    compareSpecs: {
      'System Type': '3D Virtual Garment Sampling & Physics Simulation CAD',
      'Simulation Speed': 'Real-Time Drape & Seam Tension Computation',
      'Avatar Library': 'Men, Women, Kids, Plus-Size & Custom Factory Mannequins',
      'Export Formats': '3D OBJ, FBX, High-Res PNG/MP4 360° Turntable Video',
      'Warranty': '5 Years Free Service Warranty + Lifetime License'
    }
  },

  // --- 2. HIGH-SPEED PLOTTERS & CUTTERS ---
  {
    id: 'gmac-plotter-gen04',
    name: 'G-MAC Smart Plotter GEN-04 (220cm)',
    category: 'hardware',
    price: 3250,
    listPrice: 3850,
    priceBdt: 399750,
    listPriceBdt: 473550,
    rating: 5.0,
    reviews: 142,
    badge: 'Flagship Hardware',
    image: 'assets/images/products/sq-gmac-plotter-gen04.jpg',
    desc: 'Heavy-duty 4-head HP45 inkjet garment plotter. Delivers 180 to 220 m²/h plotting speed with continuous feed, automated ink inspection, and electric head cleaning.',
    specs: [
      'Print Width: 220 cm (Models 185cm–250cm available)',
      'Print Heads: 4 × HP45 Inkjet Technology (300–600 DPI)',
      'Plotting Speed: 180–220 m²/h (Up to 700–800 patterns/day)',
      'Continuous Roll Feed & Motorized Take-Up System',
      '1-Year Spare Parts Warranty • 2-Year Free Service Warranty'
    ],
    compareSpecs: {
      'Max Plotting Width': '220 cm (Optional: 185cm, 205cm, 225cm, 250cm)',
      'Print Technology': '4 × HP45 Thermal Inkjet Printhead System',
      'Plotting Speed': '180 – 220 m²/hour continuous high-speed',
      'Resolution': '300 DPI Draft / 600 DPI High-Precision',
      'Data Interface': 'High-Speed 100M Ethernet Network & USB 2.0',
      'Supported Formats': 'HP-GL, HP-GL/2, PLT, DXF, Gerber, Lectra files',
      'Warranty': '1 Year Full Parts Warranty + 2 Years Free Service Support'
    }
  },
  {
    id: 'nts-jw4-cloud',
    name: 'NTS-JW4 Cloud Network Plotter (220cm)',
    category: 'hardware',
    price: 3400,
    listPrice: 4000,
    priceBdt: 418200,
    listPriceBdt: 492000,
    rating: 4.9,
    reviews: 87,
    badge: 'Cloud Powered',
    image: 'assets/images/products/sq-nts-jw4-plotter.jpg',
    desc: 'Smart 4-head network plotter featuring central cloud queue management. Connect up to 50 plotters across a local factory network without PC freeze.',
    specs: [
      'Multi-Machine Central Cloud Network Controller (up to 50 plotters)',
      'Print Technology: 4 × HP45 Multi-Head Carriage (300–600 DPI)',
      'Plotting Speed: 200 m²/hour Ultra-Fast',
      'Auto-Resume on Power Interruption & Electronic Head Purge',
      '1-Year Spare Parts Warranty • 2-Year Free Service Warranty'
    ],
    compareSpecs: {
      'Max Plotting Width': '220 cm (Standard Apparel Width)',
      'Print Technology': '4-Head HP45 High-Capacity Inkjet',
      'Plotting Speed': '200 m²/hour synchronized output',
      'Network Feature': 'Centralized Cloud Queue Manager & Remote Job Monitoring',
      'Power Recovery': 'Auto-Resume Print from Exact Coordinate Point',
      'Warranty': '1 Year Full Parts Warranty + 2 Years Free Service Support'
    }
  },
  {
    id: 'sinhajet-fg1512',
    name: 'SINHAJET FG1512 Flat-Bed Pattern Cutter (1500×1200mm)',
    category: 'hardware',
    price: 6500,
    listPrice: 7800,
    priceBdt: 799500,
    listPriceBdt: 959400,
    rating: 5.0,
    reviews: 73,
    badge: 'Heavy Industrial',
    image: 'assets/images/products/sq-sinhajet-fg1512-cutter.jpg',
    desc: 'Industrial pattern cutter with closed-loop servo system, alloy knife holder, and vacuum suction table. Cuts Kraft paper (0.1–1.1mm) up to 1200 mm/s speed with <0.1mm repeat accuracy.',
    specs: [
      'Cutting Area: 1500 mm × 1200 mm Flat Bed',
      'Speed: 800–1200 mm/s (Cutting capacity ≤ 70 m²/hour)',
      'Dual Tools: HP45 Ink Cartridge + High-Hardness Alloy Drag Knife',
      'Material fixing: High-Performance Multi-Zone Vacuum Adsorption',
      '2-Year Spare Parts Warranty • 2-Year Free Service Warranty'
    ],
    compareSpecs: {
      'Effective Cutting Bed': '1500 mm × 1200 mm (150 × 120 cm)',
      'Cutting Speed': '800 – 1200 mm/second (≤ 70 m²/hour)',
      'Repeat Precision': '≤ 0.1 mm mechanical micro-accuracy',
      'Cutting Material': 'All Kraft paper, cardboard, plastic template (0.1 – 1.1 mm)',
      'Control System': 'High-Speed DSP & Closed-Loop Digital Servo Motors',
      'Warranty': '2 Years Full Parts Warranty + 2 Years Free Service Support'
    }
  },
  {
    id: 'sinhajet-fg1209',
    name: 'SINHAJET FG1209 Compact Flatbed Cutter (1200×900mm)',
    category: 'hardware',
    price: 5200,
    listPrice: 6100,
    priceBdt: 639600,
    listPriceBdt: 750300,
    rating: 4.8,
    reviews: 51,
    badge: 'Space Saver',
    image: 'assets/images/products/sq-sinhajet-fg1209-cutter.jpg',
    desc: 'Space-saving flat-bed pattern cutter designed for factory sampling rooms and boutique garment units. Features high vacuum adsorption and 1000 mm/s cutting speed.',
    specs: [
      'Cutting Area: 1200 mm × 900 mm Flat Table',
      'Dual Tools: HP45 Plotting Head + Precision Knife Holder',
      'Closed-Loop Servo Drive with <0.1mm precision',
      'Cuts Kraft paper, duplex board, and PVC sheets up to 1.0mm',
      '2-Year Spare Parts Warranty • 2-Year Free Service Warranty'
    ],
    compareSpecs: {
      'Effective Cutting Bed': '1200 mm × 900 mm (120 × 90 cm)',
      'Cutting Speed': 'Up to 1000 mm/second',
      'Table System': 'Segmented Vacuum Adsorption with Silenced Air Blower',
      'Material Thickness': '0.1 mm – 1.0 mm Kraft / Duplex / Plastic',
      'Warranty': '2 Years Full Parts Warranty + 2 Years Free Service Support'
    }
  },
  {
    id: 'nts-vertical-cutter',
    name: 'NTS Vertical Roll Cutter Plotter (180cm)',
    category: 'hardware',
    price: 4200,
    listPrice: 5000,
    priceBdt: 516600,
    listPriceBdt: 615000,
    rating: 4.8,
    reviews: 38,
    badge: 'High Efficiency',
    image: 'assets/images/products/sq-nts-vertical-cutter.jpg',
    desc: 'Dual-mode vertical roll-feed printer and knife cutter for kraft paper up to 300g. Up to 1200m continuous roll feeding without deviation.',
    specs: [
      'Cutting Width: 180 cm (Vertical roll feed format)',
      'Dual Head: HP45 Ink Cartridge + High-Speed Oscillating Cutter',
      'Supports paper weight from 45g to 300g Kraft paper',
      'Continuous feed up to 1200 meters without alignment drift',
      '1-Year Spare Parts Warranty • 2-Year Free Service Warranty'
    ],
    compareSpecs: {
      'Working Width': '180 cm continuous vertical feed',
      'Dual Function': 'High-Speed Plotting & Knife Cutting Simultaneously',
      'Paper Compatibility': '45g – 300g Virgin Kraft / Recycled Marker Paper',
      'Roll Capacity': 'Continuous feed up to 1200 meters',
      'Warranty': '1 Year Full Parts Warranty + 2 Years Free Service Support'
    }
  },
  {
    id: 'nts-template-cutter',
    name: 'NTS Template Router Cutter Machine',
    category: 'hardware',
    price: 4500,
    listPrice: 5400,
    priceBdt: 553500,
    listPriceBdt: 664200,
    rating: 4.9,
    reviews: 44,
    badge: 'Milling & Routing',
    image: 'assets/images/products/sq-nts-template-cutter.jpg',
    desc: 'Heavy-duty 24,000 RPM high-speed router cutter designed for acrylic and PVC sewing templates (1-3mm) and heavy pattern cardboard.',
    specs: [
      '24,000 RPM Water-Cooled High-Speed Spindle Motor with ER20 Collet',
      'Work Area: 1500 mm × 1200 mm Vacuum T-Slot Clamping Bed',
      'Cuts Acrylic boards (1–3mm), PVC template plates, and hardboard',
      'High-rigidity gantry with recirculating ball screw linear rails',
      '1-Year Spare Parts Warranty • 2-Year Free Service Warranty'
    ],
    compareSpecs: {
      'Spindle Speed': '24,000 RPM Water-Cooled Precision Motor',
      'Bed Dimensions': '1500 mm × 1200 mm Vacuum T-Slot Surface',
      'Supported Materials': 'Acrylic (1–3 mm), PVC sheets, Hard cardboard, Bakelite',
      'Collet Chuck': 'Standard ER20 (1 mm – 13 mm bits)',
      'Warranty': '1 Year Full Parts Warranty + 2 Years Free Service Support'
    }
  },
  {
    id: 'nts-relaxing-machine',
    name: 'NTS Automatic Fabric Relaxing Machine',
    category: 'hardware',
    price: 3800,
    listPrice: 4500,
    priceBdt: 467400,
    listPriceBdt: 553500,
    rating: 4.7,
    reviews: 32,
    badge: 'Spreading Prep',
    image: 'assets/images/products/sq-fabric-relaxing-machine.jpg',
    desc: 'Automatic 2100mm fabric unrolling and tension-free relaxing machine. Eliminates shrinkage and roll-tension before spreading and cutting.',
    specs: [
      'Fabric Working Width: 2100 mm (2.1 meters)',
      'Dual expanding cradle feed rollers for roll and flat-fold textiles',
      'Infrared photoelectric automatic loop alignment sensor',
      'Variable speed digital inverter controller with auto-stop',
      '1-Year Spare Parts Warranty • 2-Year Free Service Warranty'
    ],
    compareSpecs: {
      'Max Roll Width': '2100 mm (DM-2100-II series)',
      'Feeder Mechanism': 'Expanding Dual Motor Cradle Rollers',
      'Sensor System': 'Infrared Photoelectric Edge Alignment & Loop Control',
      'Tension Relief': '100% Tension-Free Natural Relaxation Chamber',
      'Warranty': '1 Year Full Parts Warranty + 2 Years Free Service Support'
    }
  },

  // --- 3. CAMERA DIGITIZER ---
  {
    id: 'gmac-ras-digitizer',
    name: 'G-MAC RAS 1-Click Camera Digitizer System',
    category: 'digitizer',
    price: 1545,
    listPrice: 1950,
    priceBdt: 190000,
    listPriceBdt: 240000,
    rating: 5.0,
    reviews: 69,
    badge: '1-Click Scan',
    image: 'assets/images/products/sq-gmac-ras-digitizer.jpg',
    desc: 'Instant 1-click optical camera digitizer. Place multiple physical garment patterns on the calibration board; software auto-detects contours, grainlines, notches, and internal drill holes.',
    specs: [
      '1-Click Instant Multi-Piece Optical Vectorization',
      'G-MAC RAS Digital Input CAD Software V1.0 Included',
      'Includes Overhead Camera Boom Stand, Lens & LED Calibration Ring',
      'Universal Export: Lectra, Gerber, Optitex, Tukatech, DXF, HPGL',
      'One Year Full Parts Warranty • Two Years Service Warranty'
    ],
    compareSpecs: {
      'Capture System': 'High-Resolution Industrial Optical Camera with Distortion-Free Lens',
      'Capture Speed': 'Instant 1-Click Multi-Piece Vectorization (< 2 seconds)',
      'Pattern Elements': 'Contours, Seam Allowance, Notches, Drill Holes, Grainlines',
      'Export Formats': 'Gerber AccuMark, Lectra (.mdl, .iba), Optitex, CLO3D, DXF/AAMA',
      'Warranty': '1 Year Full Parts Warranty + 2 Years Free Service Support'
    }
  },

  // --- 4. FACTORY SPARE PARTS & CONSUMABLES ---
  {
    id: 'spare-hp45-cartridges',
    name: 'HP45 Original Ink Cartridges (10-Pack Bundle)',
    category: 'inks',
    price: 250,
    listPrice: 320,
    priceBdt: 30750,
    listPriceBdt: 39360,
    rating: 5.0,
    reviews: 210,
    badge: 'Bulk Savings',
    image: 'assets/images/products/sq-hp45-10pack.jpg',
    desc: 'Box of 10 genuine HP-45 black inkjet cartridges. Guaranteed authentic formula with factory batch code and 100% replacement warranty against clogging.',
    specs: [
      'Pack Contains: 10 Original HP-45 Inkjet Cartridges',
      'Factory Fresh Batch • High Optical Density Black Ink',
      'Instant-Drying Anti-Clog Formula for continuous plotting',
      '100% Immediate Replacement Guarantee on defective cartridges'
    ],
    compareSpecs: {
      'Packaging': '10 Cartridges per sealed factory carton',
      'Ink Chemistry': 'High-Density Pigment Black Fast-Drying Formulation',
      'Machine Compatibility': 'G-MAC, NTS, Sinajet, Richpeace, Algotex, Ioline, Gerber',
      'Guarantee': '100% Replacement Warranty & Free Service Hotline'
    }
  },
  {
    id: 'spare-kraft-paper',
    name: 'Virgin Kraft Paper Rolls (5 Rolls / 200kg Bundle)',
    category: 'spares',
    price: 350,
    listPrice: 420,
    priceBdt: 43050,
    listPriceBdt: 51660,
    rating: 4.8,
    reviews: 115,
    badge: 'Factory Stock',
    image: 'assets/images/products/sq-part-kraft-paper.jpg',
    desc: 'High-tensile virgin wood pulp Kraft paper rolls for plotters and flatbed cutting machines. Smooth surface ensures zero head scratches and uniform vacuum suction.',
    specs: [
      'Pack Contains: 5 Heavy Industrial Kraft Paper Rolls (200kg total)',
      'Roll Width: 60 to 72 inches (152cm – 183cm)',
      'Smooth micro-finish with optimum porosity for vacuum tables',
      'Prevents plotter blade wear and ensures accurate pattern edges'
    ],
    compareSpecs: {
      'Paper Grade': 'Virgin Wood Pulp High-Tensile Kraft Paper',
      'Basis Weight': '45g – 80g Plotter Paper / 150g – 300g Cutting Paper',
      'Roll Length': '150m – 300m continuous winding',
      'Core Diameter': 'Standard 3-inch rigid cardboard tube core'
    }
  },
  {
    id: 'part-mainboard',
    name: 'Plotter Mainboard & Carriage Board Set',
    category: 'spares',
    price: 450,
    listPrice: 550,
    priceBdt: 55350,
    listPriceBdt: 67650,
    rating: 4.9,
    reviews: 48,
    badge: 'Genuine OEM',
    image: 'assets/images/products/sq-part-motherboard.jpg',
    desc: 'Official replacement industrial mainboard and carriage printhead PCB kit for G-MAC, NTS, and Sinhajet plotters. Comes pre-flashed with latest stable firmware.',
    specs: [
      'Complete Set: Motherboard + Head Carriage Driver Board',
      'Pre-flashed firmware ready for plug-and-play installation',
      'High-speed 100M Ethernet port, USB, and encoder optical inputs',
      '6 Months Replacement Warranty • Free Remote Technician Setup'
    ],
    compareSpecs: {
      'Components': 'Industrial Central Controller PCB + 4-Head Carriage PCB',
      'Interface': 'Ethernet RJ45, High-Speed USB, Optical Linear Encoder Bus',
      'Firmware': 'Pre-configured for G-MAC GEN-04 & NTS-JW4 Series',
      'Warranty': '6 Months Full Replacement Warranty + Engineer Setup'
    }
  },
  {
    id: 'part-servo-motor',
    name: 'Brushless DC Servo Motor & Encoder Kit',
    category: 'spares',
    price: 320,
    listPrice: 400,
    priceBdt: 39360,
    listPriceBdt: 49200,
    rating: 4.9,
    reviews: 62,
    badge: 'High Precision',
    image: 'assets/images/products/sq-part-servo-motor.jpg',
    desc: 'Precision brushless DC servo drive motor with high-resolution optical rotary encoder. Provides jitter-free movement and silent operation.',
    specs: [
      'High-Torque Brushless DC Servo Motor (X & Y Axis drive)',
      'Integrated High-Resolution Optical Rotary Encoder',
      'Aviation Military-Grade Shielded Cable Harness Included',
      '1-Year Warranty • Ready Stock in Uttara & Savar'
    ],
    compareSpecs: {
      'Motor Type': 'Industrial High-Torque Brushless DC Servo Motor',
      'Encoder': 'Built-in 2500-Line Optical Rotary Encoder',
      'Drive Voltage': 'DC 24V – 36V Closed-Loop System',
      'Warranty': '1 Year Full Replacement Warranty'
    }
  },
  {
    id: 'part-blades-knives',
    name: 'Tungsten Alloy Cutting Blades & Holder (5-Pack)',
    category: 'spares',
    price: 180,
    listPrice: 230,
    priceBdt: 22140,
    listPriceBdt: 28290,
    rating: 5.0,
    reviews: 83,
    badge: 'Micro Polish',
    image: 'assets/images/products/sq-part-cutting-blades.jpg',
    desc: 'Pack of 5 ultra-hard tungsten carbide cutting blades (30°, 45°, 60°) with gold-anodized alloy knife holder. Cuts clean, burr-free pattern lines.',
    specs: [
      '5 × Tungsten Carbide Blades (Choice of 30°, 45°, 60° cutting angles)',
      '1 × CNC Precision Aluminum Blade Holder with Micro-Depth Dial',
      'Compatible with Sinhajet, NTS, Gerber, Kuris, and Bullmer cutters',
      'Long-life mirror-polished edge with micro-bevel finish'
    ],
    compareSpecs: {
      'Blade Material': 'Ultra-Fine Micro-Grain Tungsten Carbide Steel',
      'Available Angles': '30° (Fine details), 45° (Standard Kraft), 60° (Heavy Board)',
      'Holder Body': 'CNC Machined Gold Anodized Aluminum with Micrometer Dial',
      'Compatibility': 'Universal Sinhajet, NTS, Gerber, Bullmer Flatbed Cutters'
    }
  },
  {
    id: 'part-power-supply',
    name: 'Industrial MeanWell Power Supply Unit (24V / 36V)',
    category: 'spares',
    price: 140,
    listPrice: 180,
    priceBdt: 17220,
    listPriceBdt: 22140,
    rating: 4.8,
    reviews: 57,
    badge: 'Heavy Duty',
    image: 'assets/images/products/sq-part-power-supply.jpg',
    desc: 'Heavy-duty industrial switching power supply unit. Protected against short circuit, overload, and voltage surges.',
    specs: [
      'Rated Output: DC 24V / 36V Stable High-Current Output',
      'Perforated Honeycomb Aluminum Heat Dissipation Enclosure',
      'Built-in Surge, Overload, and Thermal Protection Circuitry',
      '1-Year Warranty • Tested and calibrated before dispatch'
    ],
    compareSpecs: {
      'Brand / Style': 'MeanWell Industrial Switching Power Supply',
      'Output Voltage': 'DC 24V / 36V Adjustable Potentiometer (±10%)',
      'Protection': 'Short Circuit / Overload / Overvoltage / Over-Temperature',
      'Warranty': '1 Year Full Replacement Warranty'
    }
  },
  {
    id: 'part-timing-belts',
    name: 'Heavy-Duty Timing Belts & Pinch Rollers Kit',
    category: 'spares',
    price: 95,
    listPrice: 130,
    priceBdt: 11685,
    listPriceBdt: 15990,
    rating: 4.9,
    reviews: 76,
    badge: 'Wear Resistant',
    image: 'assets/images/products/sq-part-timing-belt.jpg',
    desc: 'Steel-cord reinforced polyurethane timing belt with dual precision rubber pinch rollers and ball bearings for slip-free paper feeding.',
    specs: [
      '1 × High-Tensile Steel Cord Reinforced Toothed Timing Belt (5m roll)',
      '2 × Precision Steel & Rubber Pinch Rollers with Chrome Ball Bearings',
      'Zero elongation and high tooth shear resistance under rapid shifts',
      'Compatible with G-MAC, NTS, Sinhajet, and Richpeace plotters'
    ],
    compareSpecs: {
      'Belt Construction': 'Polyurethane Body with Internal High-Tensile Steel Cords',
      'Rollers': 'High-Density Anti-Static Rubber with Dual ABEC-7 Bearings',
      'Durability': 'Oil-Resistant, Wear-Resistant, Low-Noise Operation',
      'Warranty': '6 Months Replacement Warranty'
    }
  },

  // --- 5. GARMENT PLOTTER INKS (HP45 & LECTRA ALYS) ---
  {
    id: 'ink-45-regular',
    name: '45 Regular Plotter Ink Cartridge',
    category: 'inks',
    price: 15,
    listPrice: 17,
    priceBdt: 1850,
    listPriceBdt: 2100,
    rating: 4.8,
    reviews: 240,
    badge: 'Daily Choice',
    image: 'assets/images/products/sq-ink-45-regular.jpg',
    desc: 'Economical high-density black ink cartridge for daily garment marker plotting. Fast-drying formula designed for standard kraft and bond paper.',
    specs: [
      'Origin: Made In China (Direct Factory Import)',
      'Price: 1,850 BDT (Regular: 2,100 BDT)',
      'Fast drying time prevents ink smudging during high-speed feed',
      '100% Replacement Warranty & Free Technical Support'
    ],
    compareSpecs: {
      'Ink Type': 'High-Density Pigment Black Plotter Ink',
      'Volume': '42 ml Standard Capacity',
      'Dry Time': 'Instant (< 1.5 seconds on bond/kraft paper)',
      'Warranty': '100% Replacement Guarantee on Clogs'
    }
  },
  {
    id: 'ink-wecare-45',
    name: 'Wecare 45 High-Clarity Ink Cartridge',
    category: 'inks',
    price: 18,
    listPrice: 20,
    priceBdt: 2200,
    listPriceBdt: 2500,
    rating: 4.9,
    reviews: 180,
    badge: 'Popular',
    image: 'assets/images/products/sq-ink-wecare-45.jpg',
    desc: 'High-clarity formulation offering sharp line definition for intricate garment grading and multi-size pattern markers.',
    specs: [
      'Origin: Made In China (Quality Certified)',
      'Price: 2,200 BDT (Regular: 2,500 BDT)',
      'Micro-filtered ink prevents nozzle clogging and dropouts',
      '100% Replacement Warranty • Free Delivery in Dhaka for 10+ pcs'
    ],
    compareSpecs: {
      'Brand': 'Wecare Premium Industrial Series',
      'Nozzle Technology': '42ml Thermal Inkjet Head',
      'Line Sharpness': 'Crisp Vector Lines for Micro-Grading',
      'Warranty': '100% Replacement Guarantee'
    }
  },
  {
    id: 'ink-nts-45a',
    name: 'NTS 45A Premium Plotter Ink Cartridge',
    category: 'inks',
    price: 28.5,
    listPrice: 30,
    priceBdt: 3500,
    listPriceBdt: 3700,
    rating: 5.0,
    reviews: 310,
    badge: 'NTS Signature',
    image: 'assets/images/products/sq-ink-nts-45a.jpg',
    desc: 'Signature NTS formulation engineered for continuous industrial 24/7 garment plotting. High optical density with ultra-fine continuous flow.',
    specs: [
      'Origin: Made In China (NTS Proprietary Formulation)',
      'Price: 3,500 BDT (Regular: 3,700 BDT)',
      'Engineered specifically for G-MAC & NTS High-Speed Plotters',
      '100% Replacement Warranty • Free Machine Maintenance Service'
    ],
    compareSpecs: {
      'Brand': 'NTS Original Signature Line',
      'Flow Rate': 'Ultra-Smooth Continuous Output at 220 m²/h',
      'Paper Compatibility': 'All Kraft, Bond, Newsprint & Recycled Marker Paper',
      'Warranty': '100% Factory Replacement Guarantee'
    }
  },
  {
    id: 'ink-wecare-45a-plus',
    name: 'Wecare 45A Plus High-Yield Cartridge',
    category: 'inks',
    price: 31.3,
    listPrice: 33,
    priceBdt: 3850,
    listPriceBdt: 4000,
    rating: 4.9,
    reviews: 145,
    badge: 'High Yield',
    image: 'assets/images/products/sq-ink-wecare-45a-plus.jpg',
    desc: 'Extended high-capacity ink reservoir designed for large export garment factories running double shifts. Extra-deep black lines.',
    specs: [
      'Origin: Made In China (Export Grade)',
      'Price: 3,850 BDT (Regular: 4,000 BDT)',
      'Extra 25% print volume over standard cartridges',
      '100% Replacement Warranty • VAT/TAX Exempted'
    ],
    compareSpecs: {
      'Capacity': 'High-Yield 52 ml Extended Chamber',
      'Black Density': 'Dmax > 1.45 (Deep Carbon Black)',
      'Shelf Life': '24 Months Sealed Factory Shelf Life',
      'Warranty': '100% Replacement Guarantee'
    }
  },
  {
    id: 'ink-tkt-45',
    name: 'TKT 45 Original European Ink Cartridge',
    category: 'inks',
    price: 31.7,
    listPrice: 34,
    priceBdt: 3900,
    listPriceBdt: 4200,
    rating: 5.0,
    reviews: 195,
    badge: 'Import Ireland',
    image: 'assets/images/products/sq-ink-tkt-45.jpg',
    desc: 'Imported European formulation manufactured in Ireland. Highest grade printhead electronics ensure zero missing jet lines.',
    specs: [
      'Origin: Made In Ireland (European Formulation)',
      'Price: 3,900 BDT (Regular: 4,300 BDT)',
      'Certified for export factory compliance and high-speed CAD',
      '100% Replacement Warranty • Ready Stock in Dhaka'
    ],
    compareSpecs: {
      'Origin': 'Made in Ireland (European Standard)',
      'Printhead': 'OEM Grade Precision Silicon Micro-Nozzle',
      'Applications': 'Garments, Leather Goods & Technical Textiles',
      'Warranty': '100% Immediate Replacement Guarantee'
    }
  },
  {
    id: 'ink-nts-45a-plus',
    name: 'NTS 45A Plus Ultra Cartridge',
    category: 'inks',
    price: 32.1,
    listPrice: 35,
    priceBdt: 3950,
    listPriceBdt: 4300,
    rating: 5.0,
    reviews: 220,
    badge: 'Top Tier',
    image: 'assets/images/products/sq-ink-nts-45a-plus.jpg',
    desc: 'Top-tier plotting cartridge delivering maximum optical density and instant drying on all types of recycled and brown kraft marker paper.',
    specs: [
      'Origin: Made In China (Ultra Formulation)',
      'Price: 4,200 BDT (Regular: 4,500 BDT)',
      'Zero nozzle drying even during machine idle periods',
      '100% Replacement Warranty • Dedicated Engineer Support'
    ],
    compareSpecs: {
      'Series': 'NTS Ultra Performance Line',
      'Nozzle Clog Resistance': 'Decap Time > 48 Hours without capping',
      'Contrast': 'Maximum Barcode & Pattern Contour Sharpness',
      'Warranty': '100% Replacement Guarantee'
    }
  },
  {
    id: 'ink-hp45-original-india',
    name: 'HP-45 Original Ink Cartridge (Made In Ireland)',
    category: 'inks',
    price: 35,
    listPrice: 39,
    priceBdt: 4300,
    listPriceBdt: 4800,
    rating: 5.0,
    reviews: 420,
    badge: '100% Original',
    image: 'assets/images/products/sq-hp45-original-ireland.jpg',
    desc: 'Genuine HP-45 black print cartridge manufactured by HP Ireland. Verified serial number and hologram seal. The industry standard for CAD plotters.',
    specs: [
      'Origin: Made In Ireland (HP Original Hologram Seal)',
      'Price: 5,000 BDT (Regular: 5,500 BDT)',
      '100% Genuine OEM Cartridge with verified batch code',
      '100% Replacement Guarantee against manufacturing defects'
    ],
    compareSpecs: {
      'Brand': 'Hewlett-Packard (HP Original)',
      'Country of Origin': 'Made in Ireland',
      'Ink Chemistry': 'Genuine HP TIJ 2.5 Pigment Black',
      'Cartridge Model': 'HP 51645A (HP45)',
      'Warranty': '100% Genuine Guarantee & Replacement'
    }
  },
  {
    id: 'ink-hp45-original-china',
    name: 'HP-45 Original (Import China / Made in Singapore)',
    category: 'inks',
    price: 39,
    listPrice: 43,
    priceBdt: 4800,
    listPriceBdt: 5300,
    rating: 4.9,
    reviews: 280,
    badge: 'Original HP',
    image: 'assets/images/products/sq-hp45-china-import.jpg',
    desc: 'Genuine HP-45 cartridge sourced through Asian distribution channel. Identical print performance with factory warranty.',
    specs: [
      'Origin: Import China / Sourced Asia (Original HP Seal)',
      'Price: 4,500 BDT (Regular: 4,900 BDT)',
      'High optical contrast on thin bond and heavy kraft papers',
      '100% Replacement Warranty • Bulk carton discounts available'
    ],
    compareSpecs: {
      'Brand': 'Hewlett-Packard (HP)',
      'Channel': 'Certified Authorized Asian Distribution',
      'Performance': 'Identical 600 DPI CAD Marker Quality',
      'Warranty': '100% Replacement Guarantee'
    }
  },
  {
    id: 'ink-hp45-local',
    name: 'HP-45 Local Utility Ink Cartridge',
    category: 'inks',
    price: 13.8,
    listPrice: 15,
    priceBdt: 1700,
    listPriceBdt: 1850,
    rating: 4.7,
    reviews: 130,
    badge: 'Budget Pick',
    image: 'assets/images/products/sq-hp45-utility.jpg',
    desc: 'Economical cartridge for high-volume daily marker checking and non-critical pattern runs. Tested on all HP-compatible plotters.',
    specs: [
      'Origin: Local Supply / Re-certified',
      'Price: 3,200 BDT (Regular: 3,600 BDT)',
      'Low cost per marker meter for budget-conscious factories',
      '100% Replacement Warranty on any failure'
    ],
    compareSpecs: {
      'Grade': 'Utility Production Grade',
      'Compatibility': 'Universal HP45 Plotter Carriage Clamps',
      'Cost Efficiency': 'Lowest Cost per Linear Marker Meter',
      'Warranty': '100% Replacement Guarantee'
    }
  },
  {
    id: 'ink-alys-china',
    name: 'Lectra Alys Ink Cartridge Block',
    category: 'inks',
    price: 85.4,
    listPrice: 98,
    priceBdt: 10500,
    listPriceBdt: 12000,
    rating: 4.8,
    reviews: 165,
    badge: 'Lectra Ready',
    image: 'assets/images/products/sq-ink-alys-block.jpg',
    desc: 'Compatible ink cassette block designed specifically for Lectra Alys 20, 30, and 60 series plotters. Drop-in replacement with clean flow.',
    specs: [
      'Origin: Made In China (Lectra Alys Compatible Block)',
      'Price: 3,000 BDT (Regular: 3,400 BDT)',
      'Direct fit into Lectra Alys printhead bays without modification',
      '100% Replacement Warranty • Ready Stock in Savar & Uttara'
    ],
    compareSpecs: {
      'Compatibility': 'Lectra Alys 20, 30, 60, 120 Plotter Series',
      'Body Design': 'Rectangular Sealed Cassette Block with Flow Valve',
      'Ink Volume': 'High-Yield Long Run Formula',
      'Warranty': '100% Replacement Guarantee'
    }
  },
  {
    id: 'ink-alys-vietnam',
    name: 'Lectra Alys Ink Cartridge Block (Vietnam)',
    category: 'inks',
    price: 101.6,
    listPrice: 114,
    priceBdt: 12500,
    listPriceBdt: 14000,
    rating: 4.9,
    reviews: 110,
    badge: 'Vietnam Grade',
    image: 'assets/images/products/sq-ink-alys-vietnam.jpg',
    desc: 'High-purity ink cassette for Lectra Alys plotters manufactured in Vietnam. Smooth line continuity without head clogs.',
    specs: [
      'Origin: Made In Vietnam (Export Apparel Grade)',
      'Price: 3,500 BDT (Regular: 3,900 BDT)',
      'Certified for export factories running sensitive marker fabrics',
      '100% Replacement Warranty • Free On-Site Test'
    ],
    compareSpecs: {
      'Origin': 'Made in Vietnam',
      'Machine': 'Lectra Alys Plotters & Cutters',
      'Purity': 'Micro-Filtered Low Sediment Formula',
      'Warranty': '100% Replacement Guarantee'
    }
  },
  {
    id: 'ink-alys-premium-703730',
    name: 'Premium Lectra Alys 703730 Ink Cassette',
    category: 'inks',
    price: 122,
    listPrice: 130,
    priceBdt: 15000,
    listPriceBdt: 16000,
    rating: 5.0,
    reviews: 275,
    badge: 'Original OEM',
    image: 'assets/images/products/sq-ink-alys-703730.jpg',
    desc: 'Genuine OEM replacement for Lectra part number 703730. Maximum reliability for mission-critical apparel cutting rooms.',
    specs: [
      'Part Number: 703730 (Lectra Original OEM Specification)',
      'Price: 5,500 BDT (Regular: 6,200 BDT)',
      'Zero deviation, factory guaranteed formulation for Lectra Alys',
      '100% Replacement Warranty • Same day delivery in Dhaka'
    ],
    compareSpecs: {
      'Lectra OEM Part': '703730 Original Ink Block',
      'Compatibility': 'Lectra Alys 20 / 30 / 60 / 120 Plotter Systems',
      'Ink Type': 'Lectra Certified High-Contrast Black',
      'Warranty': '100% Genuine Guarantee & Replacement'
    }
  }
];

// Initialize all features on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initNavbarScroll();
  initProductDetailsPage();
  initProductCardClicks();
  initGlobalSearch();
  initSparePartsFilter();
  initHeroAutoSlider();
  initRoiCalculator();
  initCompareEngine();
  initReviewModal();
  initDemoVideoModal();
  initContactFormHandler();
});

/* Mobile Menu Toggle */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

/* Sticky Navbar Glass Effect on Scroll */
function initNavbarScroll() {
  const navbar = document.getElementById('main-navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('shadow-md', 'bg-white/95');
        navbar.classList.remove('bg-white/90');
      } else {
        navbar.classList.remove('shadow-md', 'bg-white/95');
        navbar.classList.add('bg-white/90');
      }
    });
  }
}

/* Make All Product Cards Across the Entire Site Clickable */
function initProductCardClicks() {
  // Delegate clicks on product cards to navigate to product-details.html
  document.addEventListener('click', (e) => {
    const card = e.target.closest('[data-id], .product-card, .part-card');
    if (!card) return;

    // If clicking on an anchor tag directly, let normal navigation occur
    if (e.target.closest('a')) return;

    const productId = card.getAttribute('data-id');
    if (productId) {
      window.location.href = `product-details.html?id=${productId}`;
    }
  });
}

/* Dedicated Product Details Page Engine */
function initProductDetailsPage() {
  const titleEl = document.getElementById('product-title');
  if (!titleEl) return; // Not on product-details.html

  // Read product ID from query parameter
  const urlParams = new URLSearchParams(window.location.search);
  let productId = urlParams.get('id');

  // Fallback to flagship plotter if no valid id
  if (!productId) {
    productId = 'gmac-plotter-gen04';
  }

  const product = PRODUCT_CATALOG.find(p => p.id === productId) || PRODUCT_CATALOG[0];

  // Update Page Meta
  document.title = `${product.name} | NDIGO TECH SOLUTIONS`;

  // Update Breadcrumbs
  const breadcrumbCat = document.getElementById('breadcrumb-category');
  const breadcrumbTitle = document.getElementById('breadcrumb-title');
  if (breadcrumbCat) breadcrumbCat.textContent = product.category;
  if (breadcrumbTitle) breadcrumbTitle.textContent = product.name;

  // Update Left Column Media
  const badgeEl = document.getElementById('product-badge');
  const imgEl = document.getElementById('product-image');
  const zoomBtn = document.getElementById('btn-zoom-image');
  const warrantyBadgeText = document.getElementById('warranty-badge-text');

  if (badgeEl) badgeEl.textContent = product.badge || 'Official';
  if (imgEl) {
    imgEl.src = product.image;
    imgEl.alt = product.name;
  }
  if (zoomBtn) zoomBtn.href = product.image;
  if (warrantyBadgeText) {
    if (product.category === 'software') warrantyBadgeText.textContent = '5-Year Software Warranty';
    else if (product.category === 'hardware') warrantyBadgeText.textContent = '1-Yr Parts / 2-Yr Service';
    else warrantyBadgeText.textContent = '100% Genuine Guarantee';
  }

  // Update Right Column Info
  const catEl = document.getElementById('product-category');
  const ratingEl = document.getElementById('product-rating');
  const reviewsEl = document.getElementById('product-reviews');
  const descEl = document.getElementById('product-description');

  if (catEl) catEl.textContent = product.category;
  if (ratingEl) ratingEl.textContent = product.rating ? product.rating.toFixed(1) : '5.0';
  if (reviewsEl) reviewsEl.textContent = product.reviews || '85';
  titleEl.textContent = product.name;
  if (descEl) descEl.textContent = product.desc;

  // Pricing: do NOT display prices — show WhatsApp for Price instead
  const priceBdtEl = document.getElementById('price-bdt');
  const priceUsdEl = document.getElementById('price-usd');
  const regularBdtEl = document.getElementById('price-regular-bdt');
  const discountBadgeEl = document.getElementById('price-discount-badge');

  if (priceBdtEl) {
    priceBdtEl.innerHTML = '<i class="fa-brands fa-whatsapp text-emerald-500 mr-1"></i> WhatsApp for Price';
  }
  if (priceUsdEl) priceUsdEl.textContent = '';
  if (regularBdtEl) regularBdtEl.textContent = '';
  if (discountBadgeEl) discountBadgeEl.textContent = '';

  // Set WhatsApp inquiry URL with product name
  const waMsg = encodeURIComponent(`Hello NDIGO TECH SOLUTIONS! Please provide price quotation and delivery time for: ${product.name}.`);
  const waInquiryUrl = `https://wa.me/8801770082829?text=${waMsg}`;
  document.querySelectorAll('[data-wa-inquiry]').forEach(el => {
    el.href = waInquiryUrl;
  });

  // Key Highlights checklist
  const specsList = document.getElementById('product-specs-list');
  if (specsList && product.specs) {
    specsList.innerHTML = product.specs.map(s => `
      <li class="flex items-start gap-2.5">
        <i class="fa-solid fa-circle-check text-emerald-500 mt-1 flex-shrink-0"></i>
        <span>${s}</span>
      </li>
    `).join('');
  }

  // Pre-fill WhatsApp Contact Button
  const btnWa = document.getElementById('btn-whatsapp-owner');
  const btnHeaderWa = document.getElementById('header-whatsapp-link');
  const btnFloatingWa = document.getElementById('floating-whatsapp-link');

  if (btnWa) btnWa.href = waInquiryUrl;
  if (btnHeaderWa) btnHeaderWa.href = waInquiryUrl;
  if (btnFloatingWa) btnFloatingWa.href = waInquiryUrl;

  // Technical Specifications Table
  const specsContainer = document.getElementById('specs-table-container');
  if (specsContainer && product.compareSpecs) {
    const specEntries = Object.entries(product.compareSpecs);
    specsContainer.innerHTML = specEntries.map(([key, val]) => `
      <div class="flex items-start justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
        <span class="font-bold text-slate-700 w-2/5">${key}</span>
        <span class="text-slate-600 w-3/5 text-right font-medium">${val}</span>
      </div>
    `).join('');
  }

  // Related Products Grid (4 items from same or other categories)
  const relatedGrid = document.getElementById('related-products-grid');
  if (relatedGrid) {
    const related = PRODUCT_CATALOG.filter(p => p.id !== product.id).slice(0, 4);
    relatedGrid.innerHTML = related.map(rel => {
      return `
        <a href="product-details.html?id=${rel.id}" class="group block bg-slate-50 hover:bg-white rounded-2xl p-4 border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all">
          <div class="aspect-square w-full rounded-xl bg-white border border-slate-200/60 overflow-hidden mb-3 p-2 flex items-center justify-center">
            <img src="${rel.image}" alt="${rel.name}" class="max-h-full object-contain group-hover:scale-105 transition-transform duration-300">
          </div>
          <span class="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">${rel.category}</span>
          <h4 class="text-xs font-bold text-slate-800 line-clamp-2 mt-0.5 group-hover:text-emerald-600 transition">${rel.name}</h4>
          <div class="mt-2 flex items-center gap-1.5">
            <i class="fa-brands fa-whatsapp text-emerald-600 text-xs"></i>
            <span class="text-xs font-bold text-emerald-700">WhatsApp for Price</span>
          </div>
          <div class="mt-2.5 w-full py-1.5 rounded-lg bg-slate-900 group-hover:bg-emerald-600 text-white text-[11px] font-bold text-center transition">
            View Details &rarr;
          </div>
        </a>
      `;
    }).join('');
  }
}

/* Spare Parts Catalog Live Filter & Search */
function initSparePartsFilter() {
  const searchInput = document.getElementById('part-search-input');
  const categoryFilter = document.getElementById('part-category-select');
  const partCards = document.querySelectorAll('.part-card');

  if (!searchInput && !categoryFilter) return;

  function filterParts() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : 'all';

    partCards.forEach(card => {
      const title = card.getAttribute('data-name')?.toLowerCase() || '';
      const category = card.getAttribute('data-category') || '';
      const compatible = card.getAttribute('data-compat')?.toLowerCase() || '';

      const matchesQuery = title.includes(query) || compatible.includes(query);
      const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

      if (matchesQuery && matchesCategory) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  if (searchInput) searchInput.addEventListener('input', filterParts);
  if (categoryFilter) categoryFilter.addEventListener('change', filterParts);
}

/* Automatic Scrolling Hero Card with 3 Products */
function initHeroAutoSlider() {
  const slides = document.querySelectorAll('.bestseller-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.getElementById('btn-hero-prev');
  const nextBtn = document.getElementById('btn-hero-next');
  const sliderContainer = document.getElementById('hero-slider-container');

  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoSlideInterval = null;

  function goToSlide(index) {
    currentIndex = ((index % slides.length) + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add('active');
        slide.style.display = 'block';
      } else {
        slide.classList.remove('active');
        slide.style.display = 'none';
      }
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
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
    prevBtn.addEventListener('click', () => { goToSlide(currentIndex - 1); startAutoSlide(); });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => { goToSlide(currentIndex + 1); startAutoSlide(); });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goToSlide(i); startAutoSlide(); });
  });

  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
  }

  // Make sure slide 0 is active on init
  goToSlide(0);
  startAutoSlide();
}

/* Global Search Bar */
function initGlobalSearch() {
  const searchInput = document.getElementById('amazon-global-search');
  const searchResults = document.getElementById('amazon-search-results');
  if (!searchInput || !searchResults) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length < 2) {
      searchResults.classList.add('hidden');
      searchResults.innerHTML = '';
      return;
    }

    const matches = PRODUCT_CATALOG.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query)
    ).slice(0, 5);

    if (matches.length === 0) {
      searchResults.innerHTML = '<div class="p-3 text-xs text-slate-500 text-center">No products matching query</div>';
      searchResults.classList.remove('hidden');
      return;
    }

    searchResults.innerHTML = matches.map(p => `
      <a href="product-details.html?id=${p.id}" class="flex items-center gap-3 p-2.5 hover:bg-slate-50 border-b border-slate-100 last:border-0 transition">
        <img src="${p.image}" alt="${p.name}" class="w-10 h-10 object-contain rounded-lg border border-slate-200">
        <div class="flex-grow">
          <p class="text-xs font-bold text-slate-800 line-clamp-1">${p.name}</p>
          <span class="text-[10px] text-emerald-600 font-semibold uppercase">${p.category}</span>
        </div>
        <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1"><i class="fa-brands fa-whatsapp text-emerald-600"></i> Price on WhatsApp</span>
      </a>
    `).join('');
    searchResults.classList.remove('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.add('hidden');
    }
  });
}

/* Hardware Comparison Engine */
function initCompareEngine() {
  const compareTable = document.getElementById('spec-comparison-table');
  const typeSelect = document.getElementById('compare-type-select');
  if (!compareTable || !typeSelect) return;

  function renderComparison() {
    const category = typeSelect.value;
    const products = PRODUCT_CATALOG.filter(p => category === 'all' || p.category === category).slice(0, 4);

    if (products.length === 0) return;

    let headersHtml = '<th class="p-3 bg-slate-900 text-white font-bold text-xs text-left rounded-tl-xl">Specification</th>';
    products.forEach(p => {
      headersHtml += `
        <th class="p-3 bg-slate-900 text-white text-center">
          <img src="${p.image}" class="w-12 h-12 object-contain mx-auto mb-1 bg-white rounded p-1">
          <a href="product-details.html?id=${p.id}" class="text-xs font-bold block text-white hover:text-emerald-400 line-clamp-1">${p.name}</a>
          <span class="text-xs text-emerald-400 font-extrabold">WhatsApp for Price</span>
        </th>
      `;
    });

    const specKeys = ['Max Plotting Width', 'Effective Cutting Bed', 'Print Technology', 'Plotting Speed', 'Cutting Speed', 'Warranty'];
    let rowsHtml = '';

    specKeys.forEach(key => {
      let row = `<tr class="border-b border-slate-200 hover:bg-slate-50"><td class="p-3 text-xs font-bold text-slate-700 bg-slate-100">${key}</td>`;
      products.forEach(p => {
        const val = p.compareSpecs && p.compareSpecs[key] ? p.compareSpecs[key] : '—';
        row += `<td class="p-3 text-xs text-slate-600 text-center font-medium">${val}</td>`;
      });
      row += '</tr>';
      rowsHtml += row;
    });

    compareTable.innerHTML = `<thead><tr>${headersHtml}</tr></thead><tbody>${rowsHtml}</tbody>`;
  }

  typeSelect.addEventListener('change', renderComparison);
  renderComparison();
}

/* ROI Calculator */
function initRoiCalculator() {
  const fabricCostInput = document.getElementById('roi-fabric-cost');
  const monthlyMarkerInput = document.getElementById('roi-monthly-markers');
  const currentWastageInput = document.getElementById('roi-current-wastage');
  const resultMonthlyEl = document.getElementById('roi-result-monthly');
  const resultYearlyEl = document.getElementById('roi-result-yearly');

  if (!fabricCostInput || !resultMonthlyEl) return;

  function calculateRoi() {
    const fabricCost = parseFloat(fabricCostInput.value) || 280;
    const monthlyMeters = parseFloat(monthlyMarkerInput.value) || 50000;
    const wastage = parseFloat(currentWastageInput.value) || 12;

    const gmacSavingPct = 0.045; // 4.5% average savings with Super Nesting ++Pro
    const monthlySavingsBdt = monthlyMeters * fabricCost * gmacSavingPct;
    const yearlySavingsBdt = monthlySavingsBdt * 12;

    resultMonthlyEl.textContent = `৳ ${Math.round(monthlySavingsBdt).toLocaleString('en-IN')}`;
    resultYearlyEl.textContent = `৳ ${Math.round(yearlySavingsBdt).toLocaleString('en-IN')}`;
  }

  [fabricCostInput, monthlyMarkerInput, currentWastageInput].forEach(inp => {
    if (inp) inp.addEventListener('input', calculateRoi);
  });

  calculateRoi();
}

/* Review Modal & Video Demo */
let selectedReviewRating = 5;

function initReviewModal() {
  const openBtn = document.getElementById('btn-open-write-review');
  const closeBtn = document.getElementById('btn-close-write-review');
  const modal = document.getElementById('write-review-modal');
  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  }
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  const stars = document.querySelectorAll('.review-star-select');
  stars.forEach((star) => {
    star.addEventListener('click', () => {
      selectedReviewRating = parseInt(star.getAttribute('data-val')) || 5;
      stars.forEach((s) => {
        const val = parseInt(s.getAttribute('data-val')) || 0;
        if (val <= selectedReviewRating) {
          s.classList.remove('fa-regular');
          s.classList.add('fa-solid');
        } else {
          s.classList.remove('fa-solid');
          s.classList.add('fa-regular');
        }
      });
    });
  });
}

window.submitCustomerReview = function(e) {
  if (e) e.preventDefault();
  const author = document.getElementById('rev-author')?.value || 'Valued Client';
  const factory = document.getElementById('rev-factory')?.value || 'Factory Partner';
  const comment = document.getElementById('rev-comment')?.value || '';
  const starsText = '⭐'.repeat(selectedReviewRating);

  const waMsg = encodeURIComponent(`Factory Review for NDIGO TECH SOLUTIONS:
Rating: ${starsText} (${selectedReviewRating}/5)
Name: ${author}
Company: ${factory}
Feedback: ${comment}`);

  window.open(`https://wa.me/8801770082829?text=${waMsg}`, '_blank');

  const modal = document.getElementById('write-review-modal');
  if (modal) modal.classList.add('hidden');
};

function initDemoVideoModal() {
  const closeBtn = document.getElementById('btn-close-demo-video');
  const modal = document.getElementById('demo-video-modal');
  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  }
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
}

window.openDemoVideo = function(title) {
  const modal = document.getElementById('demo-video-modal');
  const titleEl = document.getElementById('demo-video-title');
  if (titleEl && title) titleEl.textContent = `${title} Live Demonstration`;
  if (modal) modal.classList.remove('hidden');
};

/* Contact Form Handler */
function initContactFormHandler() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name')?.value || '';
    const phone = document.getElementById('contact-phone')?.value || '';
    const message = document.getElementById('contact-message')?.value || '';

    const waMsg = encodeURIComponent(`Hello NDIGO TECH SOLUTIONS,
Name: ${name}
Phone: ${phone}
Message: ${message}`);
    window.open(`https://wa.me/8801770082829?text=${waMsg}`, '_blank');
  });
}

/* ── Category Filter ── */
window.filterHomeProducts = function(category, btn) {
  // Update active tab style
  document.querySelectorAll('.home-filter-tab').forEach(function(tab) {
    tab.classList.remove('bg-slate-900', 'text-white', 'shadow-sm');
    tab.classList.add('bg-white', 'hover:bg-slate-100', 'text-slate-700', 'border', 'border-slate-200');
  });
  if (btn) {
    btn.classList.add('bg-slate-900', 'text-white', 'shadow-sm');
    btn.classList.remove('bg-white', 'hover:bg-slate-100', 'text-slate-700', 'border', 'border-slate-200');
  }

  // Show/hide category group rows
  document.querySelectorAll('.category-group-row').forEach(function(row) {
    if (category === 'all') {
      row.style.display = '';
    } else {
      var rowCat = row.getAttribute('data-category') || '';
      row.style.display = (rowCat === category) ? '' : 'none';
    }
  });

  // When filtering to a specific category, reveal extra items in that category
  if (category !== 'all') {
    document.querySelectorAll('.category-group-row').forEach(function(row) {
      var rowCat = row.getAttribute('data-category') || '';
      if (rowCat === category) {
        row.querySelectorAll('.extra-cat-item').forEach(function(item) {
          item.classList.remove('hidden');
        });
      }
    });
  }
};

/* ── See More / Show Less Toggle ── */
window.toggleCategoryExpand = function(gridId, btn) {
  var grid = document.getElementById(gridId);
  if (!grid || !btn) return;

  var isExpanded = btn.getAttribute('data-expanded') === 'true';
  var extraItems = grid.querySelectorAll('.extra-cat-item');
  var icon = btn.querySelector('i');
  // Support both .btn-label class and plain <span>
  var label = btn.querySelector('.btn-label') || btn.querySelector('span');

  extraItems.forEach(function(item) {
    if (isExpanded) {
      item.classList.add('hidden');
    } else {
      item.classList.remove('hidden');
    }
  });

  btn.setAttribute('data-expanded', isExpanded ? 'false' : 'true');

  if (icon) {
    if (isExpanded) {
      icon.classList.remove('fa-chevron-up');
      icon.classList.add('fa-chevron-down');
    } else {
      icon.classList.remove('fa-chevron-down');
      icon.classList.add('fa-chevron-up');
    }
  }

  if (label) {
    label.textContent = isExpanded ? 'See More Options' : 'Show Less';
  }
};

