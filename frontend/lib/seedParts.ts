export interface SparePartItem {
  id: string;
  partNumber: string;
  name: string;
  category: 'Jaw Crusher Parts' | 'Cone Crusher Parts' | 'VSI Impactor Parts' | 'Screen & Washing Parts' | 'Feeder & Paver Parts';
  compatibleModels: string[];
  materialGrade: string;
  leadTime: string;
  description: string;
  image: string;
}

export interface MaintenanceChecklist {
  interval: string;
  title: string;
  checkpoints: Array<{
    component: string;
    action: string;
    criticality: 'Standard' | 'Critical' | 'Safety Mandatory';
  }>;
}

export const VERIFIED_OEM_PARTS: SparePartItem[] = [
  {
    id: 'PZP-JAW-MN18',
    partNumber: 'PZ-JP-11075-MN18',
    name: 'High-Manganese Reversible Jaw Plate (Mn18Cr2)',
    category: 'Jaw Crusher Parts',
    compatibleModels: ['PJC 9060', 'PJC 11075', 'PJC 14076', 'PTJ 11075'],
    materialGrade: 'Austenitic Manganese Steel (Mn 18% + Cr 2%)',
    leadTime: 'In-Stock / Dispatched in 24 Hours',
    description: 'Deep-profile corrugation engineered in Puzzolana’s in-house foundry for high impact work-hardening and extended crushing life in abrasive granite.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'PZP-JAW-CHEEK',
    partNumber: 'PZ-CP-14076-HARDOX',
    name: 'Heavy-Duty Side Cheek Liner Plates',
    category: 'Jaw Crusher Parts',
    compatibleModels: ['PJC 11075', 'PJC 14076', 'PTJ 11075'],
    materialGrade: 'Hardox 500 / High-Alloy Wear Steel',
    leadTime: 'In-Stock',
    description: 'Precision machined side frame protective liners with countersunk bolt cavities preventing structural frame scouring.',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'PZP-CONE-MANTLE',
    partNumber: 'PZ-CM-2000-MN22',
    name: 'Precision Hydraulic Cone Mantle & Bowl Liner',
    category: 'Cone Crusher Parts',
    compatibleModels: ['PCC 2000', 'PTC 2000', 'PCC 1500'],
    materialGrade: 'Ultra-High Manganese (Mn 22% + Cr 2.5%)',
    leadTime: 'In-Stock / Dispatched in 24 Hours',
    description: 'Balanced casting profile ensuring uniform wear distribution, maintaining calibrated CSS gap setting throughout mantle service life.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'PZP-CONE-BUSHING',
    partNumber: 'PZ-CB-2000-BRZ',
    name: 'High-Lead Tin Bronze Eccentric Bushings',
    category: 'Cone Crusher Parts',
    compatibleModels: ['PCC 2000', 'PTC 2000'],
    materialGrade: 'High-Lead Leaded Bronze (CuSn10Pb10)',
    leadTime: 'In-Stock',
    description: 'Precision CNC-machined bearing bushings with spiral oil grooves ensuring continuous hydrodynamic oil lubrication film under extreme loads.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'PZP-VSI-TIPS',
    partNumber: 'PZ-VT-100-TC',
    name: 'Tungsten Carbide VSI Rotor Tips & Back-Up Bars',
    category: 'VSI Impactor Parts',
    compatibleModels: ['PVI 100', 'PVI 75'],
    materialGrade: 'Premium Sintered Tungsten Carbide Inserts',
    leadTime: 'In-Stock / Dispatched in 24 Hours',
    description: 'Extreme abrasion-resistant carbide tips engineered for high peripheral rotor speeds (up to 75 m/s) in hard silica sand manufacturing.',
    image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'PZP-SCREEN-POLY',
    partNumber: 'PZ-SP-2060-PU',
    name: 'Modular Polyurethane Screen Deck Panels',
    category: 'Screen & Washing Parts',
    compatibleModels: ['PVS 2060', 'PVS 1845', 'PSW 150'],
    materialGrade: 'Injection Molded Elastomeric Polyurethane',
    leadTime: 'In-Stock (All Apertures: 2mm to 40mm)',
    description: 'Self-relieving tapered aperture modules providing up to 8x longer service life compared to woven wire mesh without deck blinding.',
    image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'PZP-CYCLONE-LINER',
    partNumber: 'PZ-HC-150-PU',
    name: 'Hydrocyclone Vortex Finder & Apex Nozzles',
    category: 'Screen & Washing Parts',
    compatibleModels: ['PSW 150', 'PSW 100'],
    materialGrade: 'High-Density Polyurethane & Natural Rubber',
    leadTime: 'In-Stock',
    description: 'Replaceable apex spigots and vortex finders calibrated for precise minus-75 micron fines retention and silt separation.',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'PZP-BREAKER-CHAIN',
    partNumber: 'PZ-BC-1200-ALLOY',
    name: 'Forged Alloy Drag Flight Chain & Drive Sprockets',
    category: 'Feeder & Paver Parts',
    compatibleModels: ['PFB 1200', 'PFB 1000'],
    materialGrade: 'Case-Hardened Forged Alloy Steel',
    leadTime: 'Ready for Dispatch',
    description: 'Heavy continuous drag chain links with induction-hardened pins engineered for extreme tensile pull in mining breaker hoppers.',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'PZP-PAVER-SCREED',
    partNumber: 'PZ-PS-900-HEAT',
    name: 'Hydrostatic Screed Tamper Bars & Heating Plates',
    category: 'Feeder & Paver Parts',
    compatibleModels: ['PPR 900', 'PPR 750'],
    materialGrade: 'High-Thermal Conductivity Hardened Steel',
    leadTime: 'In-Stock',
    description: 'Dual tamping bars and electric heating elements ensuring uniform thermal distribution and high mat pre-compaction density above 90%.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
  },
];

export const PREVENTATIVE_MAINTENANCE_SCHEDULES: MaintenanceChecklist[] = [
  {
    interval: 'Daily / 10-Hour Shift',
    title: 'Daily Pre-Start & Shift Check',
    checkpoints: [
      { component: 'Bearing Grease Levels', action: 'Inspect automated grease lines and verify purge around labyrinth seals.', criticality: 'Critical' },
      { component: 'Jaw / Cone CSS Gap', action: 'Measure discharge CSS setting using lead test plug or ultrasonic sensor.', criticality: 'Critical' },
      { component: 'Screen Mesh Tension', action: 'Check polyurethane locking pins and wire deck tension bolts.', criticality: 'Standard' },
      { component: 'Hydraulic Oil Pressure & Temp', action: 'Confirm operating oil temp is < 65°C and hydraulic pressure within green zone.', criticality: 'Safety Mandatory' },
    ],
  },
  {
    interval: '250 Operating Hours',
    title: 'Monthly Inspection & Filter Replacement',
    checkpoints: [
      { component: 'Hydraulic Return Filters', action: 'Replace 10-micron return line filter cartridges on cone crushers.', criticality: 'Critical' },
      { component: 'Manganese Liner Wear Gauge', action: 'Inspect jaw corrugation depth and cone mantle thickness; record wear profile.', criticality: 'Standard' },
      { component: 'V-Belt Tension & Alignment', action: 'Check motor drive belt deflection (15-20 mm) and pulley laser alignment.', criticality: 'Standard' },
      { component: 'Structural Huck Bolts', action: 'Inspect torque on screen cross-beams and crusher mounting foundation bolts.', criticality: 'Safety Mandatory' },
    ],
  },
  {
    interval: '1,000 Operating Hours',
    title: 'Quarterly Comprehensive Overhaul',
    checkpoints: [
      { component: 'Lube Oil Analysis (Spectrographic)', action: 'Take oil sample to test for brass/bronze particles (indicates bushing wear).', criticality: 'Critical' },
      { component: 'VSI Rotor Tip Replacement', action: 'Rotate or replace tungsten carbide rotor tips and distributor plate.', criticality: 'Critical' },
      { component: 'Toggle Plate & Thrust Seats', action: 'Inspect mechanical toggle plate wear pads and safety break-away clearance.', criticality: 'Safety Mandatory' },
      { component: 'Motor Insulation Resistance (Megger)', action: 'Perform 1000V Megger test on crusher drive motors and MCC contactors.', criticality: 'Safety Mandatory' },
    ],
  },
];
