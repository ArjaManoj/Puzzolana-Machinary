export interface InstalledEquipment {
  model: string;
  name: string;
  stage: 'Primary' | 'Secondary' | 'Tertiary' | 'Screening & Washing' | 'Material Handling';
  powerKW: number;
  quantity: number;
}

export interface OperationalResult {
  metric: string;
  value: string;
  impact: string;
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  location: string;
  state: string;
  country: string;
  industry: 'Commercial Aggregate Quarries' | 'Highway Infrastructure' | 'Iron Ore & Mineral Mining' | 'Manufactured Sand (M-Sand)' | 'Coal Mining';
  application: string;
  rockType: string;
  feedSizeMax: string;
  plantCapacityTPH: number;
  yearCommissioned: number;
  equipmentSupplied: InstalledEquipment[];
  productsProduced: string[];
  featuredImage: string;
  galleryImages: string[];
  challenge: string;
  solution: string;
  flowsheetOverview: string[];
  results: OperationalResult[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  downloads: Array<{
    title: string;
    fileType: string;
    size: string;
  }>;
}

export const VERIFIED_CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'CS-600-GRANITE-TEL',
    slug: '600-tph-granite-crushing-msand-telangana',
    title: '600 TPH 4-Stage Stationary Granite Crushing & M-Sand Plant',
    clientName: 'Deccan Mega Quarries LLP',
    location: 'Mahabubnagar / Hyderabad Region',
    state: 'Telangana',
    country: 'India',
    industry: 'Commercial Aggregate Quarries',
    application: 'High-Strength Concrete Aggregates & Manufactured Sand (IS:383 Zone II)',
    rockType: 'Abrasive Blue Granite (UCS: 240 MPa, Quartz Content: ~35%)',
    feedSizeMax: '0 - 800 mm Blasted Quarry Rock',
    plantCapacityTPH: 600,
    yearCommissioned: 2024,
    equipmentSupplied: [
      { model: 'PJC 14076', name: 'Deep Cavity Primary Jaw Crusher', stage: 'Primary', powerKW: 200, quantity: 1 },
      { model: 'PCC 2000', name: 'Heavy-Duty Hydraulic Cone Crusher', stage: 'Secondary', powerKW: 220, quantity: 2 },
      { model: 'PVI 100', name: 'High-Velocity Vertical Shaft Impactor (VSI)', stage: 'Tertiary', powerKW: 260, quantity: 1 },
      { model: 'PVS 2060', name: '4-Deck Inclined Circular Motion Sizing Screen', stage: 'Screening & Washing', powerKW: 30, quantity: 2 },
      { model: 'PSW 150', name: 'Hydrocyclone Fines Recovery & Sand Washing System', stage: 'Screening & Washing', powerKW: 45, quantity: 1 },
    ],
    productsProduced: [
      '40 mm Railway Ballast & Sub-base',
      '20 mm Concrete Coarse Aggregate (MoRTH Grade)',
      '10 mm High-Strength Concrete Aggregate',
      '0-4 mm IS:383 Zone II Manufactured Concrete Sand',
      '0-2 mm Plastering Sand with Silt < 3%',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
    ],
    challenge:
      'The client faced extreme abrasive wear when crushing high-quartz pink/blue granite. The existing competitor plant yielded excessive flakiness (>28%) in 20mm aggregates and generated 14% waste dust with high river silt contamination that failed state infrastructure quality tests.',
    solution:
      'Puzzolana engineered an integrated 4-stage closed-circuit crushing and washing plant. Primary reduction through a PJC 14076 Jaw Crusher reduces ROM feed to -180mm. Twin PCC 2000 hydraulic cone crushers handle secondary and tertiary reduction with automated CSS gap regulation. A high-speed PVI 100 VSI impactor cubizes aggregate shapes before dispatching through a PSW 150 hydrocyclone washing module that recovers 98% of usable micro-fines.',
    flowsheetOverview: [
      'Stage 1: Dump hopper with PGF 1445 grizzly feeder scalping out minus 40mm natural soil, feeding PJC 14076 Jaw Crusher (0-180mm output).',
      'Stage 2: Surge bunker buffer feeding secondary PCC 2000 Hydraulic Cone Crusher in closed circuit with primary sizing screen.',
      'Stage 3: Secondary product split feeding tertiary PCC 2000 cone and PVI 100 VSI rock-on-rock shaping chamber.',
      'Stage 4: Twin PVS 2060 4-deck vibrating screens producing calibrated 40/20/10/6mm fractions.',
      'Stage 5: Minus 4mm sand stream routed to PSW 150 hydrocyclone dewatering system producing clean IS:383 M-Sand and plaster sand.',
    ],
    results: [
      { metric: 'Flakiness & Elongation Index', value: '11.4%', impact: 'Reduced from 28.5% to 11.4%, well below MoRTH 15% threshold' },
      { metric: 'Continuous Plant Throughput', value: '625 TPH', impact: 'Exceeded nameplate capacity rating by 4.1%' },
      { metric: 'Wear Part Lifetime Extension', value: '+45%', impact: 'Puzzolana Mn18Cr2 jaw and bowl liners extended replacement cycle to 650 operating hours' },
      { metric: 'Fines Recovery & Water Recycling', value: '92% Recovery', impact: 'PSW 150 hydrocyclone reclaimed 28 TPH of minus 75-micron sand previously lost to settling ponds' },
    ],
    testimonial: {
      quote:
        'Puzzolana’s 4-stage plant solved our flakiness and high wear costs completely. We supply concrete aggregates to the Hyderabad Metro and National Highway projects with zero rejections on aggregate shape and gradation.',
      author: 'G. Venkat Reddy',
      role: 'Managing Partner',
      company: 'Deccan Mega Quarries LLP',
    },
    downloads: [
      { title: '600 TPH Plant Flowsheet & Technical Drawing', fileType: 'PDF', size: '3.4 MB' },
      { title: 'IS:383 Aggregate Gradation & Test Certificate', fileType: 'PDF', size: '1.2 MB' },
    ],
  },
  {
    id: 'CS-800-BASALT-MAH',
    slug: '800-tph-basalt-crushing-expressway-maharashtra',
    title: '800 TPH High-Capacity Basalt Crushing Plant for Expressways',
    clientName: 'Western Corridor Infrastructure Corp',
    location: 'Panvel / Navi Mumbai',
    state: 'Maharashtra',
    country: 'India',
    industry: 'Highway Infrastructure',
    application: 'Expressway Pavement Concrete (DLC / PQC) & Sub-base Aggregates',
    rockType: 'Dense Deccan Trap Basalt (UCS: 280 MPa, Highly Tough)',
    feedSizeMax: '0 - 900 mm Blasted Boulders',
    plantCapacityTPH: 800,
    yearCommissioned: 2023,
    equipmentSupplied: [
      { model: 'PJC 14076', name: 'Heavy-Duty Primary Jaw Crusher', stage: 'Primary', powerKW: 200, quantity: 1 },
      { model: 'PCC 2000', name: 'Hydroset Secondary Cone Crusher', stage: 'Secondary', powerKW: 220, quantity: 2 },
      { model: 'PCC 1500', name: 'Tertiary Fine Hydraulic Cone Crusher', stage: 'Tertiary', powerKW: 160, quantity: 2 },
      { model: 'PVS 2465', name: 'High-G Vibrating Sizing Screen (3-Deck)', stage: 'Screening & Washing', powerKW: 37, quantity: 3 },
    ],
    productsProduced: [
      '63 - 40 mm GSB (Granular Sub-Base)',
      '40 - 20 mm Wet Mix Macadam (WMM)',
      '20 mm Pavement Quality Concrete (PQC) Aggregate',
      '10 mm Dry Lean Concrete (DLC) Aggregate',
      '0 - 6 mm Crushed Stone Sand',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    ],
    challenge:
      'The contractor had a strict 18-month timeline to supply 3.5 Million MT of PQC and WMM aggregate for a 6-lane Greenfield Expressway. The high compressive strength of Deccan Basalt caused frequent motor tripping and premature manganese cracking on existing legacy equipment.',
    solution:
      'Puzzolana designed a dual-stream heavy basalt crushing line with a cast-steel PJC 14076 Jaw Crusher and twin PCC 2000 secondary cones equipped with tramp iron relief cylinders. Heavy surge bins decoupled the primary and secondary circuits, guaranteeing continuous 800+ TPH feeding regardless of quarry blasting schedules.',
    flowsheetOverview: [
      'Primary crushing via heavy grizzly feeder and PJC 14076 jaw reduction to 0-200mm.',
      'Intermediate surge pile (5,000 MT live capacity) with electro-magnetic vibrating tunnel feeders.',
      'Twin secondary PCC 2000 hydraulic cone crushers operating in parallel with auto-hydraulic bowl clamping.',
      'Three multi-deck PVS 2465 screens with rubber deck impact zones handling massive recirculating loads.',
      'Automated belt weigher telemetry sending real-time tonnage data to the central SCADA cabin.',
    ],
    results: [
      { metric: 'Total Aggregate Supplied', value: '3.65 Million MT', impact: 'Completed 60 days ahead of contractual expressway deadline' },
      { metric: 'Power Efficiency', value: '1.42 kWh/Ton', impact: '22% lower specific energy consumption compared to standard market plants' },
      { metric: 'Plant Availability / Uptime', value: '98.4%', impact: 'Round-the-clock 20-hour daily continuous production achieved' },
      { metric: 'PQC Concrete Strength Compliance', value: '100% Pass', impact: 'Consistent aggregate interlocking achieved target M40 PQC design strength' },
    ],
    testimonial: {
      quote:
        'Puzzolana’s 800 TPH plant proved to be the backbone of our expressway package. We produced over 16,000 MT per day consistently during peak paving months.',
      author: 'Sunil Kulkarni',
      role: 'Chief Project Engineer',
      company: 'Western Corridor Infrastructure Corp',
    },
    downloads: [
      { title: '800 TPH Basalt Plant Layout & Specification Sheet', fileType: 'PDF', size: '4.1 MB' },
    ],
  },
  {
    id: 'CS-450-TRACK-RAJ',
    slug: '450-tph-track-mobile-fleet-highway-rajasthan',
    title: '450 TPH Track-Mounted Mobile Fleet for Fast-Track Highway Construction',
    clientName: 'North-West Highway Developers Pvt Ltd',
    location: 'Jaipur - Bikaner Corridor',
    state: 'Rajasthan',
    country: 'India',
    industry: 'Highway Infrastructure',
    application: 'Rapid-Relocation Mobile Highway Crushing (GSB, WMM & Bituminous Aggregates)',
    rockType: 'Hard Quartzite & Calcareous Limestone',
    feedSizeMax: '0 - 750 mm Blasted Face',
    plantCapacityTPH: 450,
    yearCommissioned: 2024,
    equipmentSupplied: [
      { model: 'PTJ 11075', name: 'Track-Mounted Mobile Jaw Crusher Unit', stage: 'Primary', powerKW: 260, quantity: 1 },
      { model: 'PTC 2000', name: 'Track-Mounted Mobile Hydraulic Cone Crusher Unit', stage: 'Secondary', powerKW: 290, quantity: 1 },
      { model: 'PTS 2060', name: 'Track-Mounted Mobile 3-Deck Sizing Screen', stage: 'Screening & Washing', powerKW: 90, quantity: 1 },
    ],
    productsProduced: [
      '0 - 40 mm Granular Sub Base (GSB)',
      '0 - 20 mm Wet Mix Macadam (WMM)',
      '20 mm & 10 mm Dense Bituminous Macadam (DBM) Aggregates',
      '0 - 4 mm Stone Sand for Asphalt Mixes',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    ],
    challenge:
      'A 180 km road widening project required crushing operations to shift every 45 km to minimize dump truck haulage expenses. Erecting stationary foundations at four separate locations would have added ₹4.2 Crore in civil costs and 6 months of commissioning delays.',
    solution:
      'Puzzolana deployed a 3-unit mobile track fleet comprising PTJ 11075 Jaw, PTC 2000 Cone, and PTS 2060 Screen. Dual-power drive systems (Direct Grid Electric or On-board Tier-4 Diesel Genset) gave the contractor maximum operational flexibility in remote desert areas.',
    flowsheetOverview: [
      'Excavator directly loads PTJ 11075 track jaw hopper at quarry pit face.',
      'Primary crushed rock transfers via hydraulic folding conveyor to PTC 2000 track cone unit.',
      'Secondary crushed output feeds closed-circuit PTS 2060 track screen with oversize recirculating loop.',
      'Hydraulic folding side conveyors discharge four separate calibrated aggregate stockpiles directly onto haul trucks.',
    ],
    results: [
      { metric: 'Relocation & Setup Time', value: '< 4 Hours', impact: 'Complete 3-unit fleet relocation between quarry pits completed in under half a day' },
      { metric: 'Haulage Fuel Savings', value: '₹1.85 Cr Saved', impact: 'Crushing directly at the quarry face eliminated 14 km of off-road dump truck transport' },
      { metric: 'Civil Foundation Costs', value: '₹0 (Zero Civil Work)', impact: 'Completely eliminated heavy RCC concrete civil foundation investments' },
      { metric: 'Fuel Consumption in Electric Mode', value: '0.85 kWh/Ton', impact: 'Plugging into grid power cut hourly operating costs by 48%' },
    ],
    testimonial: {
      quote:
        'Puzzolana Track Mobile units gave us the agility we needed. When a quarry permit shifted, we tracked the entire crushing plant to the new pit within 3 hours and commenced crushing the same afternoon.',
      author: 'Maheshwar Choudhury',
      role: 'Project Director',
      company: 'North-West Highway Developers Pvt Ltd',
    },
    downloads: [
      { title: 'Track Mobile Fleet Highway Case Study & Specs', fileType: 'PDF', size: '2.8 MB' },
    ],
  },
  {
    id: 'CS-1200-IRONORE-ODI',
    slug: '1200-tph-iron-ore-beneficiation-odisha',
    title: '1200 TPH Iron Ore Crushing, Screening & Beneficiation Plant',
    clientName: 'Kalinga Mineral Mining Corporation',
    location: 'Barbil / Keonjhar Mining Belt',
    state: 'Odisha',
    country: 'India',
    industry: 'Iron Ore & Mineral Mining',
    application: 'High-Grade Calibrated Lump Ore (CLO) & Sinter Feed Production',
    rockType: 'Hematite & Hard Iron Ore (Fe Grade: 58% - 64%, High Bulk Density)',
    feedSizeMax: '0 - 1000 mm Pit ROM Feed',
    plantCapacityTPH: 1200,
    yearCommissioned: 2022,
    equipmentSupplied: [
      { model: 'PJC 14076', name: 'Primary Jaw Crusher (Heavy Mining Execution)', stage: 'Primary', powerKW: 200, quantity: 2 },
      { model: 'PCC 2000', name: 'Secondary Cone Crusher', stage: 'Secondary', powerKW: 220, quantity: 3 },
      { model: 'PVS 2465', name: 'Heavy Duty 3-Deck Iron Ore Sizing Screen', stage: 'Screening & Washing', powerKW: 37, quantity: 4 },
      { model: 'PSW 200', name: 'High-Tonnage Wet Beneficiation Cyclone System', stage: 'Screening & Washing', powerKW: 75, quantity: 2 },
    ],
    productsProduced: [
      '10 - 30 mm High-Grade Calibrated Lump Ore (CLO) (Fe > 64%)',
      '0 - 10 mm Sinter Feed for Blast Furnaces',
      'Pellet Feed Concentrate (-100 mesh beneficiated fines)',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    ],
    challenge:
      'High alumina and clay impurities in wet monsoon season caused severe screen deck blinding and choked secondary crushers, forcing mining operations to halt 3 months every year during peak rains.',
    solution:
      'Puzzolana designed a dual-circuit wet/dry beneficiation plant with specialized polyurethane modular screen decks, high-pressure water spray manifolds, and heavy hydrocyclones to deslime iron ore fines and eliminate clay agglomerations.',
    flowsheetOverview: [
      'Dual dump hoppers with hydraulic rock breakers and PJC 14076 primary jaw reduction.',
      'Primary screen scalping sticky alumina slime prior to cone crushing chambers.',
      'Three PCC 2000 secondary cones operating under automated hydraulic pressure monitoring.',
      'Four heavy-duty PVS wet screens washing and sizing 10-30mm Calibrated Lump Ore.',
      'PSW 200 hydrocyclone desliming cluster recovering Fe 63.5% sinter fines while sending alumina tailings to thickeners.',
    ],
    results: [
      { metric: 'Annual Plant Output', value: '7.2 Million MT', impact: 'Maintained full production through 4 consecutive monsoon seasons without rain shutdowns' },
      { metric: 'Fe Grade Enhancement', value: '+2.8% Fe', impact: 'Upgraded low-grade 59% Fe raw ore into 62.4% Fe premium sinter feed' },
      { metric: 'Alumina (Al2O3) Reduction', value: '< 2.2%', impact: 'Desliming hydrocyclones reduced sticky alumina content from 4.8% to 2.1%' },
      { metric: 'Tailings Water Recycling', value: '88% Water Recycled', impact: 'Closed-loop thickener system minimized freshwater consumption in eco-sensitive forest zone' },
    ],
    testimonial: {
      quote:
        'Puzzolana’s heavy mining execution handles our dense hematite with zero structural fatigue. Even during heavy torrential rains in Odisha, the wet screening and hydrocyclone system runs non-stop.',
      author: 'Pradeep Mohapatra',
      role: 'VP - Mining Operations',
      company: 'Kalinga Mineral Mining Corporation',
    },
    downloads: [
      { title: '1200 TPH Iron Ore Beneficiation Plant Technical Report', fileType: 'PDF', size: '5.2 MB' },
    ],
  },
  {
    id: 'CS-300-SAND-KAR',
    slug: '300-tph-zero-waste-plaster-sand-washing-karnataka',
    title: '300 TPH Turnkey M-Sand & Plaster Sand Washing Plant with Zero Silt Loss',
    clientName: 'Bengaluru Sustainable Aggregates Pvt Ltd',
    location: 'Nelamangala / Bengaluru West',
    state: 'Karnataka',
    country: 'India',
    industry: 'Manufactured Sand (M-Sand)',
    application: 'Premium River Sand Replacement (Plaster Sand & Ready-Mix Concrete Sand)',
    rockType: 'Granite & Gneiss Quarry Tailings (0 - 10 mm Feed)',
    feedSizeMax: '0 - 10 mm Crusher Screenings',
    plantCapacityTPH: 300,
    yearCommissioned: 2023,
    equipmentSupplied: [
      { model: 'PVI 100', name: 'High-Velocity Rock-on-Rock VSI Impactor', stage: 'Tertiary', powerKW: 260, quantity: 1 },
      { model: 'PVS 1845', name: 'High-Frequency Sand Dewatering Screen', stage: 'Screening & Washing', powerKW: 18.5, quantity: 2 },
      { model: 'PSW 150', name: 'Dual Hydrocyclone Fines Recovery Unit', stage: 'Screening & Washing', powerKW: 45, quantity: 2 },
    ],
    productsProduced: [
      '0 - 4 mm IS:383 Zone II Concrete Manufactured Sand (M-Sand)',
      '0 - 2 mm High-Fineness Plastering Sand with Silt < 2.5%',
      'Recycled Clean Water for Closed-Loop Slurry Recirculation',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    ],
    challenge:
      'With state river sand mining bans in Karnataka, the client needed to produce high-grade plaster sand with silt content strictly below 3% while meeting strict zero-effluent discharge pollution regulations in the Bengaluru peri-urban green belt.',
    solution:
      'Puzzolana installed a dedicated PVI 100 VSI rock-on-rock shaping unit paired with a dual PSW 150 hydrocyclone washing and dewatering system. The system strips minus 75-micron clay particles while capturing 98% of 150-micron fine sand essential for smooth plaster finish.',
    flowsheetOverview: [
      'Crusher 0-10mm grit loaded into surge hopper and metered into PVI 100 VSI rotor at 72 m/s.',
      'VSI shaped output slurried with water and pumped into twin polyurethane hydrocyclones.',
      'Cyclone apex discharge drops onto high-frequency linear dewatering screens, discharging sand with < 12% moisture.',
      'Cyclone overflow with clay/silt directed to high-rate thickener and filter press.',
      '95% clarified water returned instantly to the washing circuit.',
    ],
    results: [
      { metric: 'Plaster Sand Silt Content', value: '2.1% Silt', impact: 'Complies with IS:1542 plastering sand standard (limit 3.0%)' },
      { metric: 'Selling Price Premium', value: '+35% Margin', impact: 'Premium plaster sand fetched ₹1,450/ton compared to ₹950/ton for unwashed grit' },
      { metric: 'Water Recycling Rate', value: '95% Closed Loop', impact: 'Zero water discharge to surroundings, requiring only 5% makeup water' },
      { metric: 'Dry Sand Stockpile Readiness', value: 'Ready in 30 Mins', impact: 'High-frequency dewatering screen reduced discharge moisture to under 12%' },
    ],
    testimonial: {
      quote:
        'Puzzolana’s washing technology turned our surplus 0-10mm quarry waste into our highest margin product line. Major ready-mix concrete suppliers in Bengaluru have contracted 100% of our production.',
      author: 'Anand Kumar Swamy',
      role: 'Executive Director',
      company: 'Bengaluru Sustainable Aggregates Pvt Ltd',
    },
    downloads: [
      { title: 'Zero-Waste M-Sand & Plaster Sand Washing Whitepaper', fileType: 'PDF', size: '2.4 MB' },
    ],
  },
  {
    id: 'CS-2500-COAL-SIN',
    slug: '2500-tph-coal-feeder-breaker-surface-mining-singrauli',
    title: '2500 TPH Open-Cast Coal Feeder Breaker & Surface Mining Installation',
    clientName: 'Eastern Energy Resources Ltd',
    location: 'Singrauli Coalfield / Northern Belt',
    state: 'Madhya Pradesh',
    country: 'India',
    industry: 'Coal Mining',
    application: 'Direct Pit-Head Coal Sizing for Thermal Power Plant Conveyor Feed',
    rockType: 'Sub-Bituminous Coal with Sandstone / Shale Partings (Hardness: 3.5 Mohs)',
    feedSizeMax: '0 - 1200 mm Heavy Coal Seam Lumps',
    plantCapacityTPH: 2500,
    yearCommissioned: 2021,
    equipmentSupplied: [
      { model: 'PFB 2000', name: 'High-Capacity Heavy Duty Feeder Breaker', stage: 'Primary', powerKW: 315, quantity: 2 },
      { model: 'PSM 2200', name: 'Continuous Surface Miner (3.8m Drum Width)', stage: 'Primary', powerKW: 560, quantity: 2 },
      { model: 'PVS 2465', name: 'Heavy Coal Sizing Screen (Single Deck)', stage: 'Screening & Washing', powerKW: 30, quantity: 2 },
    ],
    productsProduced: [
      '0 - 100 mm Direct Thermal Power Plant Boiler Feed',
      '0 - 50 mm Calibrated Industrial Boiler Coal',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    ],
    challenge:
      'Blasting near inhabited villages and railway sidings was prohibited by environmental authorities. The coal operator needed continuous non-explosive surface extraction and rapid pit-head lump reduction to feed cross-country overland conveyors.',
    solution:
      'Puzzolana deployed PSM continuous surface miners for selective blast-free extraction and twin heavy-duty PFB 2000 Feeder Breakers at the pit edge to size blasted and ripped coal down to -100mm in a single high-tonnage pass.',
    flowsheetOverview: [
      'PSM Surface Miner extracts coal cleanly along bedding planes with zero blasting.',
      'Heavy 100-ton mining dump trucks dump directly into PFB 2000 low-profile receiving hoppers.',
      'Heavy flight scraper chain conveys coal under high-torque pick-tipped breaker rolls.',
      'Continuous minus 100mm coal discharges straight onto the 4.5 km overland belt conveyor.',
    ],
    results: [
      { metric: 'Blast-Free Extraction', value: '100% Non-Explosive', impact: 'Eliminated all blasting vibrations, ground noise, and fly-rock complaints' },
      { metric: 'Continuous Hourly Throughput', value: '2,580 TPH', impact: 'Achieved full power plant delivery contract specifications' },
      { metric: 'Coal Fines Generation (<0.5mm)', value: '-18% Reduction', impact: 'Pick breaker action generated 18% less unmanageable coal dust fines than high-speed crushers' },
      { metric: 'Direct Truck Dumping Cycle', value: '< 45 Seconds', impact: 'Low profile feeder hopper allowed 100-ton dumpers to unload without expensive civil ramps' },
    ],
    testimonial: {
      quote:
        'Puzzolana’s Feeder Breakers operate in the harshest open-cast coal conditions. The robust pick breaker roll crushes heavy shale inclusions effortlessly, protecting our downstream belt systems.',
      author: 'Rajiv Sengupta',
      role: 'Chief Technical Officer',
      company: 'Eastern Energy Resources Ltd',
    },
    downloads: [
      { title: '2500 TPH Feeder Breaker & Surface Mining Engineering Report', fileType: 'PDF', size: '4.8 MB' },
    ],
  },
];
