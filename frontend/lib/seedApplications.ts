import { MachineryProduct } from '../types';

export interface IndustryApplicationData {
  id: string;
  slug: string;
  name: string;
  shortTitle: string;
  tagline: string;
  heroImage: string;
  overview: string;
  challenges: string[];
  puzzolanaSolutions: string[];
  typicalCapacityRange: string;
  targetOutputFractions: string[];
  materialsHandled: string[];
  recommendedMachineIds: string[];
  flowsheetStages: Array<{
    stageNumber: string;
    stageName: string;
    equipment: string;
    functionDesc: string;
    feedInput: string;
    outputSize: string;
  }>;
  technicalStandards: string[];
  plantBenchmark: {
    installedPowerKW: string;
    waterRequirement: string;
    flakinessIndex: string;
    siltContent: string;
  };
}

export const VERIFIED_INDUSTRY_APPLICATIONS: IndustryApplicationData[] = [
  {
    id: 'aggregates-quarrying',
    slug: 'aggregates-quarrying',
    name: 'Aggregates & Quarrying Industry',
    shortTitle: 'Aggregates & Quarrying',
    tagline: 'High-Throughput Multi-Stage Commercial Crushing & Screening Plants',
    heroImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=80',
    overview: 'Commercial aggregate production demands continuous 24/7 quarry crushing with high reduction ratios, low wear part consumption, and tight particle shape control across 40mm, 20mm, 10mm, and 6mm fractions.',
    challenges: [
      'High rock compressive strength (up to 300 MPa in abrasive basalt and granite)',
      'Excessive flakiness and elongation in conventional two-stage crushing circuits',
      'High manganese liner wear and costly downtime in remote quarries',
    ],
    puzzolanaSolutions: [
      'Heavy-duty cast steel frame PJC Jaw Crushers with deep crushing cavities',
      'High-speed eccentric throw PCC Hydraulic Cone Crushers for inter-particle shaping',
      'Huck-bolted PVS Circular Motion Screens with modular polyurethane and wire-cloth decks',
    ],
    typicalCapacityRange: '150 – 600 TPH',
    targetOutputFractions: ['40 mm Sub-Base', '20 mm Concrete Aggregate', '10 mm Concrete Aggregate', '6 mm Grit', '0-4 mm Crushed Fines'],
    materialsHandled: ['Granite', 'Basalt / Trap Rock', 'Limestone', 'Quartzite', 'River Gravel / Cobbles'],
    recommendedMachineIds: ['PJC-11075', 'PCC-2000', 'PVS-2060', 'PGF-1140'],
    flowsheetStages: [
      {
        stageNumber: '01',
        stageName: 'Primary Scalping & Jaw Crushing',
        equipment: 'PGF 1140 Feeder + PJC 11075 Jaw Crusher',
        functionDesc: 'Scalps undersized clay fines and crushes quarry-run boulders down to manageable intermediate sizing.',
        feedInput: '0 – 650 mm Blasted Quarry Rock',
        outputSize: '100 – 180 mm Primary Discharge',
      },
      {
        stageNumber: '02',
        stageName: 'Secondary Hydraulic Cone Reduction',
        equipment: 'PCC 2000 Hydraulic Cone Crusher',
        functionDesc: 'Inter-particle reduction breaking slabby rock into dense cubical aggregate fractions.',
        feedInput: '100 – 180 mm Primary Jaw Feed',
        outputSize: '20 – 40 mm Sized Aggregate',
      },
      {
        stageNumber: '03',
        stageName: 'Multi-Deck Precision Screening',
        equipment: 'PVS 2060 4-Deck Vibrating Screen',
        functionDesc: 'High-frequency classification into four clean fractions with non-blinding polyurethane mesh decks.',
        feedInput: '0 – 40 mm Crushed Circuit Feed',
        outputSize: '4 Final Sized Commercial Products',
      },
    ],
    technicalStandards: ['MoRTH 5th Revision Specs', 'IS 383 Coarse Aggregate Standards', 'ASTM C33 Quality Guidelines'],
    plantBenchmark: {
      installedPowerKW: '350 – 650 kW',
      waterRequirement: 'Dry Circuit / Low Spray',
      flakinessIndex: '< 15% (Compliant with NHAI/MoRTH)',
      siltContent: 'N/A (Coarse Circuit)',
    },
  },
  {
    id: 'mining-minerals',
    slug: 'mining-minerals',
    name: 'Mining & Mineral Processing',
    shortTitle: 'Mining & Minerals',
    tagline: 'High-Tonnage Primary Sizing, Feeder Breakers & Surface Miners',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
    overview: 'Open-pit and underground mining operations require high-capacity continuous extraction, low-profile truck dump feeding, and high-impact reduction for iron ore, coal, bauxite, and limestone.',
    challenges: [
      'Massive lump sizes up to 1000mm requiring heavy dump stations without bridging',
      'Environmental restrictions on drilling and blasting near population zones',
      'Extreme abrasive wear in high-silica iron ore and hard trap rock extraction',
    ],
    puzzolanaSolutions: [
      'PSM 2200 Continuous Surface Miners for blast-free selective thin-seam cutting',
      'PFB 1200 Low-Profile Feeder Breakers for direct truck dump receiving and lump sizing',
      'PJC 14076 Heavy Mining Primary Jaw Crushers capable of 750 TPH primary output',
    ],
    typicalCapacityRange: '400 – 1200 TPH',
    targetOutputFractions: ['0-50 mm Direct Load Sized Coal', '10-40 mm Sized Iron Ore Lumps', '0-10 mm Iron Ore Fines', 'Bauxite Plant Feed'],
    materialsHandled: ['Iron Ore (Hematite/Magnetite)', 'Coal / Lignite', 'Limestone', 'Bauxite', 'Manganese Ore'],
    recommendedMachineIds: ['PSM-2200', 'PFB-1200', 'PJC-14076'],
    flowsheetStages: [
      {
        stageNumber: '01',
        stageName: 'Continuous Blast-Free Open-Pit Extraction',
        equipment: 'PSM 2200 Continuous Surface Miner',
        functionDesc: 'Cuts, pulverizes, and conveys deposit directly into haul trucks in a single continuous pass without blasting.',
        feedInput: 'In-Situ Open-Cast Mineral Seam',
        outputSize: '0 – 50 mm Direct Loaded Ore',
      },
      {
        stageNumber: '02',
        stageName: 'Heavy Low-Profile Dump & Sizing',
        equipment: 'PFB 1200 Drag-Chain Feeder Breaker',
        functionDesc: 'Receives direct rear-dump truck loads and sizes oversized run-of-mine lumps with high-torque pick rolls.',
        feedInput: '0 – 800 mm Run-of-Mine Lumps',
        outputSize: '100 – 200 mm Belt Sized Feed',
      },
      {
        stageNumber: '03',
        stageName: 'Primary High-Capacity Jaw Crushing',
        equipment: 'PJC 14076 Mining Jaw Crusher',
        functionDesc: 'High-reduction primary crushing of hard abrasive iron ore and hard limestone feed.',
        feedInput: 'Up to 900 mm Hard Boulders',
        outputSize: '125 – 250 mm Primary Output',
      },
    ],
    technicalStandards: ['DGMS Mining Safety Guidelines', 'ISO 9001 Mining Plant Standards', 'CIL Coal Sizing Protocols'],
    plantBenchmark: {
      installedPowerKW: '560 – 1200 kW',
      waterRequirement: 'Dry / Dust Suppression Misting',
      flakinessIndex: 'N/A (Direct Mineral Feed)',
      siltContent: 'High Recovery Purity',
    },
  },
  {
    id: 'm-sand-production',
    slug: 'm-sand-production',
    name: 'Manufactured Sand (M-Sand & Plaster Sand)',
    shortTitle: 'M-Sand Production',
    tagline: 'IS 383 Zone II Compliant Manufactured Concrete & Plaster Sand Plants',
    heroImage: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=1600&q=80',
    overview: 'With environmental bans on natural river sand extraction, Puzzolana M-Sand and Sand Washing plants manufacture high-cubicity concrete sand and ultra-fine plaster sand conforming strictly to IS 383 Zone II specifications.',
    challenges: [
      'High silt and minus-75 micron dust content exceeding the 3% concrete limit',
      'Angular flaky particle shapes causing poor concrete workability and higher cement consumption',
      'Loss of valuable 150-micron fine sand in conventional bucket wheel settling ponds',
    ],
    puzzolanaSolutions: [
      'PVI 100 Vertical Shaft Impactors utilizing rock-on-rock shaping for optimal cubicity',
      'PSW 150 Hydrocyclone Sand Washing Plants stripping out clay/silt while retaining ultra-fines',
      'High-G linear motion dewatering screens reducing product moisture below 12%',
    ],
    typicalCapacityRange: '100 – 300 TPH',
    targetOutputFractions: ['0 - 4.75 mm Concrete Sand (IS 383 Zone II)', '0 - 2.36 mm Plastering Sand', '10 mm Aggregate / Grit'],
    materialsHandled: ['Granite M-Sand', 'Basalt Crushed Fines', 'Limestone Fines', 'River Sand / Silica'],
    recommendedMachineIds: ['PVI-100', 'PSW-150', 'PBW-120', 'PVS-2060'],
    flowsheetStages: [
      {
        stageNumber: '01',
        stageName: 'Tertiary Shaping & Micro-Crushing',
        equipment: 'PVI 100 Vertical Shaft Impactor',
        functionDesc: 'Rock-on-rock high velocity impact generates cubical fines with ideal gradation curves.',
        feedInput: '10 – 40 mm Grit / Oversize',
        outputSize: '0 – 5 mm High-Cubicity Sand Feed',
      },
      {
        stageNumber: '02',
        stageName: 'Dry Classification & Dust Scalping',
        equipment: 'PVS 2060 Fine Screen Deck',
        functionDesc: 'Separates 0-4.75mm sand fractions and scalps recirculating oversize back to the VSI.',
        feedInput: '0 – 5 mm VSI Discharge',
        outputSize: '0 – 4.75 mm Raw Sand Stream',
      },
      {
        stageNumber: '03',
        stageName: 'Hydrocyclone Desilting & Dewatering',
        equipment: 'PSW 150 Hydrocyclone Sand Washer',
        functionDesc: 'Polyurethane hydrocyclone clusters strip out clay/silt below 3% and discharge dewatered sand.',
        feedInput: 'Raw Sand Water Slurry',
        outputSize: 'Ultra-Clean Concrete Sand (<3% Silt, <12% Moisture)',
      },
    ],
    technicalStandards: ['IS 383:2016 Zone II Specification', 'ASTM C33 Fine Aggregate Standards', 'MoRTH Concrete Guidelines'],
    plantBenchmark: {
      installedPowerKW: '240 – 450 kW',
      waterRequirement: 'Closed-Loop Water Recycling (85% Recovery)',
      flakinessIndex: '< 10% (Exceptional Cubicity)',
      siltContent: '< 3.0% (Certified Concrete Grade)',
    },
  },
  {
    id: 'highway-infrastructure',
    slug: 'highway-infrastructure',
    name: 'Highway, Expressways & Road Construction',
    shortTitle: 'Highway & Infrastructure',
    tagline: 'Precision Hydrostatic Sensor Pavers & High-Mobility Crushing Trains',
    heroImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1600&q=80',
    overview: 'National highway corridors and expressways require massive daily tonnage of Wet Mix Macadam (WMM), Dense Bituminous Macadam (DBM), and precision sensor paving with stringent International Roughness Index (IRI) smoothness standards.',
    challenges: [
      'Tight project execution deadlines requiring fast site-to-site equipment mobilization',
      'Rigorous IRI surface smoothness and dual-grade elevation compliance for NHAI expressways',
      'High pre-compaction density requirements to prevent road mat segregation and rutting',
    ],
    puzzolanaSolutions: [
      'PPR 900 Hydrostatic Sensor Pavers with hydraulically extendable screeds up to 9.0 meters',
      'PTJ 11075 and PTC 2000 Track-Mounted mobile crushing trains operating directly on highway right-of-way',
      'Electronic MOBA sonic grade and slope sensors for millimeter-accurate road leveling',
    ],
    typicalCapacityRange: '250 – 600 TPH',
    targetOutputFractions: ['Wet Mix Macadam (WMM Base)', 'Dense Bituminous Macadam (DBM)', 'Asphalt Concrete Surface Course'],
    materialsHandled: ['Granite & Basalt Aggregates', 'Bituminous Asphalt Mix', 'WMM Macadam Mix', 'Soil Stabilizers'],
    recommendedMachineIds: ['PPR-900', 'PTJ-11075', 'PTC-2000'],
    flowsheetStages: [
      {
        stageNumber: '01',
        stageName: 'On-Site Track Mobile Crushing',
        equipment: 'PTJ 11075 Track Jaw + PTC 2000 Track Cone',
        functionDesc: 'Mobile track crushing trains produce sub-base and WMM aggregate directly alongside the road corridor.',
        feedInput: 'Excavated Roadway Rock & Borrow Pit Feed',
        outputSize: '0 – 40 mm Certified Road Base',
      },
      {
        stageNumber: '02',
        stageName: 'High-Capacity Receiving & Conveying',
        equipment: 'PPR 900 14-Ton Hopper & Dual Augers',
        functionDesc: 'Receives direct dumper loads without stopping the paving train, distributing mix uniformly.',
        feedInput: 'Hot Mix Asphalt / WMM Truck Discharge',
        outputSize: 'Regulated Screed In-Feed',
      },
      {
        stageNumber: '03',
        stageName: 'Dual Tamper Compaction & Sonic Sensor Paving',
        equipment: 'PPR 900 Hydraulic Extendable Screed',
        functionDesc: 'Dual tamping bars deliver >90% pre-compaction density while sonic grade sensors ensure smooth IRI ride.',
        feedInput: 'Paving Mix',
        outputSize: 'Up to 9.0m Smooth Paved Mat',
      },
    ],
    technicalStandards: ['NHAI Expressway Specs', 'MoRTH Section 500 Paving Protocols', 'IRC:111 IRI Smoothness Standards'],
    plantBenchmark: {
      installedPowerKW: '125 kW (Paver) / 540 kW (Track Train)',
      waterRequirement: 'Dry Paving / Minimum Sprinklers',
      flakinessIndex: '< 15%',
      siltContent: 'Zero Segregation',
    },
  },
  {
    id: 'railway-ballast',
    slug: 'railway-ballast',
    name: 'Railway Track Ballast Production',
    shortTitle: 'Railway Track Ballast',
    tagline: 'High-Impact Angular Ballast Production Meeting RDSO Specifications',
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
    overview: 'High-speed dedicated freight corridors and passenger railway networks require durable, angular, interlocking stone ballast strictly sized between 40mm and 65mm with high impact toughness and low crushing value.',
    challenges: [
      'Strict RDSO (Research Designs and Standards Organisation) flakiness limit (<17%)',
      'High aggregate abrasion value requirements (Los Angeles Abrasion < 30%)',
      'High rejection rates of oversized (>65mm) and undersized (<40mm) chips in poorly configured circuits',
    ],
    puzzolanaSolutions: [
      'Two-stage PJC Jaw Crusher + PCC Heavy Cone Crusher circuits configured for maximum ballast yield',
      'Heavy-duty PVS Circular Motion Screens with stepped top decks to recirculate +65mm oversize',
      'Precise CSS gap control to maximize the target 40–65mm angular fraction yield above 75%',
    ],
    typicalCapacityRange: '200 – 500 TPH',
    targetOutputFractions: ['40 – 65 mm RDSO Track Ballast', '10 – 20 mm Secondary Commercial Aggregate', '0 – 6 mm Ballast Fines / Grit'],
    materialsHandled: ['Granite', 'Basalt / Trap Rock', 'Hard Quartzite', 'Dolerite'],
    recommendedMachineIds: ['PJC-11075', 'PCC-2000', 'PVS-2060'],
    flowsheetStages: [
      {
        stageNumber: '01',
        stageName: 'Primary Heavy Jaw Reduction',
        equipment: 'PJC 11075 Primary Jaw Crusher',
        functionDesc: 'Crushes quarry boulders to 120-200mm feed with low generation of unwanted fine dust.',
        feedInput: '0 – 650 mm Heavy Quarry Boulders',
        outputSize: '120 – 200 mm Primary Output',
      },
      {
        stageNumber: '02',
        stageName: 'Secondary Hydraulic Cone Sizing',
        equipment: 'PCC 2000 Hydraulic Cone Crusher',
        functionDesc: 'Calibrated crushing chamber optimized to fracture stone into angular interlocking ballast particles.',
        feedInput: '120 – 200 mm Primary Feed',
        outputSize: '40 – 65 mm High-Yield Angular Ballast',
      },
      {
        stageNumber: '03',
        stageName: 'Closed-Circuit RDSO Ballast Screen',
        equipment: 'PVS 2060 Vibrating Screen (Closed Circuit)',
        functionDesc: 'Classifies the 40-65mm ballast window, recirculating +65mm back to the cone while extracting commercial byproduct.',
        feedInput: '0 – 100 mm Crushed Circuit Stream',
        outputSize: 'Certified 40-65mm Railway Ballast',
      },
    ],
    technicalStandards: ['Indian Railways RDSO Specification GE-IRS-2', 'ASTM D692 Track Ballast Specs', 'IS 2386 Aggregate Tests'],
    plantBenchmark: {
      installedPowerKW: '380 – 600 kW',
      waterRequirement: 'Dry Classification Circuit',
      flakinessIndex: '< 15% (RDSO Maximum 17%)',
      siltContent: 'Nil (Dust Screened)',
    },
  },
  {
    id: 'waste-recycling',
    slug: 'waste-recycling',
    name: 'C&D Waste & Steel Slag Recovery',
    shortTitle: 'C&D Waste & Slag',
    tagline: 'Heavy Feeder Breakers, Slag Recovery & Demolition Waste Recycling',
    heroImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80',
    overview: 'Urban expansion demands sustainable recovery of Construction & Demolition (C&D) waste, rebar-embedded reinforced concrete, and steel mill slag to produce recycled aggregates and recover high-value scrap metals.',
    challenges: [
      'Uncrushable tramp rebar, steel wire, and wood debris causing catastrophic crusher jams',
      'Extremely high hardness and heavy density of metal-rich metallurgical slag',
      'High dust emissions in congested urban metropolitan processing yards',
    ],
    puzzolanaSolutions: [
      'Heavy drag-chain PFB 1200 Feeder Breakers with pick rolls capable of crushing reinforced concrete without stall',
      'Integrated over-band electro-magnetic separators for automated continuous rebar and scrap steel recovery',
      'PTJ 11075 Track-Mounted mobile crushers with onboard water misting dust suppression systems',
    ],
    typicalCapacityRange: '150 – 500 TPH',
    targetOutputFractions: ['Recycled Concrete Aggregate (RCA 10-20mm)', 'Recycled Sub-Base (GSB 0-40mm)', 'Clean Recycled Scrap Rebar / Iron'],
    materialsHandled: ['Reinforced Concrete Demolition Debris', 'Steel Mill Metallurgical Slag', 'Masonry & Brick Rubble', 'Asphalt Millings'],
    recommendedMachineIds: ['PFB-1200', 'PTJ-11075', 'PVS-2060'],
    flowsheetStages: [
      {
        stageNumber: '01',
        stageName: 'Direct Truck Dump Feeder Breaking',
        equipment: 'PFB 1200 Heavy Feeder Breaker',
        functionDesc: 'Receives concrete slabs and demolition lumps directly from dump trucks, crushing concrete away from embedded rebar.',
        feedInput: 'Demolition Concrete Slabs up to 800 mm',
        outputSize: '100 – 200 mm Liberated Feed',
      },
      {
        stageNumber: '02',
        stageName: 'Magnetic Separation & Metal Extraction',
        equipment: 'Over-Band Electro-Magnetic Cross Belt',
        functionDesc: 'Automatically extracts rebar, mesh, and tramp iron from the crushed stream before secondary processing.',
        feedInput: 'Liberated Concrete & Rebar Stream',
        outputSize: '99% Clean Scrap Steel Rebar & Clean Rock',
      },
      {
        stageNumber: '03',
        stageName: 'Secondary Sizing into Recycled Aggregate',
        equipment: 'PTJ / PVS Closed-Circuit Screen Train',
        functionDesc: 'Sizes recycled material into certified 0-40mm Granular Sub-Base (GSB) and 10-20mm recycled concrete aggregate.',
        feedInput: 'Clean Metal-Free Concrete Rubble',
        outputSize: 'Certified Recycled Aggregates (RCA)',
      },
    ],
    technicalStandards: ['CPWD C&D Waste Guidelines', 'IS 383:2016 Recycled Concrete Aggregates', 'Swachh Bharat Clean City Protocols'],
    plantBenchmark: {
      installedPowerKW: '260 – 480 kW',
      waterRequirement: 'Misting Dust Suppression (<5 m³/hr)',
      flakinessIndex: '< 18%',
      siltContent: 'Metal-Free High Purity',
    },
  },
];
