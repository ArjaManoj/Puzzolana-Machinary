export interface SustainabilityMetric {
  id: string;
  value: string;
  numericValue: number;
  label: string;
  category: 'Renewable Energy' | 'Resource Conservation' | 'Circular Economy' | 'Community Impact';
  description: string;
  source: string;
}

export interface ESGPillar {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  statBadge: string;
  overview: string;
  keyInitiatives: string[];
  impactSummary: string;
}

export interface CSRProject {
  id: string;
  title: string;
  location: string;
  beneficiaries: string;
  overview: string;
  highlights: string[];
  image: string;
}

export const VERIFIED_ESG_METRICS: SustainabilityMetric[] = [
  {
    id: 'METRIC-SOLAR',
    value: '3.5 MW',
    numericValue: 3.5,
    label: 'Rooftop Solar Array Capacity',
    category: 'Renewable Energy',
    description: 'Installed across Pashamylaram and Cherlapally heavy manufacturing complexes, generating 4.8 Million kWh of clean power annually.',
    source: 'Factory Energy Audit 2025-26',
  },
  {
    id: 'METRIC-MSAND',
    value: '45M MT',
    numericValue: 45,
    label: 'River Sand Substituted Annually',
    category: 'Resource Conservation',
    description: 'Puzzolana M-Sand plants produce over 45 Million MT of IS:383 concrete sand every year, preventing destructive riverbed dredging.',
    source: 'Aggregate Fleet Production Report',
  },
  {
    id: 'METRIC-WATER',
    value: '95%',
    numericValue: 95,
    label: 'Closed-Loop Water Recycled',
    category: 'Resource Conservation',
    description: 'Hydrocyclone washing plants and high-rate thickeners recycle 95% of process water in a closed loop with zero liquid discharge.',
    source: 'Environmental Engineering Audit',
  },
  {
    id: 'METRIC-RECYCLE-STEEL',
    value: '85%+',
    numericValue: 85,
    label: 'Recycled Steel in Foundry Melt',
    category: 'Circular Economy',
    description: 'Medium-frequency induction furnaces utilize over 85% certified scrap steel, cutting virgin iron ore smelting emissions by 60%.',
    source: 'Foundry Material Log 2025',
  },
  {
    id: 'METRIC-APPRENTICES',
    value: '2,500+',
    numericValue: 2500,
    label: 'Vocational Trainees Certified',
    category: 'Community Impact',
    description: 'Puzzolana Technical Academy has trained over 2,500 youth in heavy Submerged Arc Welding, CNC boring, and hydraulic diagnostics.',
    source: 'Corporate CSR Directorate',
  },
  {
    id: 'METRIC-CO2-OFF',
    value: '3,900 MT',
    numericValue: 3900,
    label: 'Annual CO2 Emissions Offset',
    category: 'Renewable Energy',
    description: 'Solar power transition and IE4 ultra-premium efficiency motor drives offset 3,900 metric tons of carbon dioxide each year.',
    source: 'GHG Verification Protocol',
  },
];

export const ESG_PILLARS: ESGPillar[] = [
  {
    id: 'PIL-GREEN-MFG',
    title: 'Decarbonizing Heavy Manufacturing & Foundry Operations',
    subtitle: 'Transitioning to Solar Energy, Induction Melt Optimization & Scrap Recycling',
    icon: 'Sun',
    statBadge: '3.5 MW Solar Capacity',
    overview:
      'Heavy manufacturing traditionally requires high thermal and electrical energy. Puzzolana has integrated 3.5 MW of captive rooftop solar PV panels across its 60-acre Pashamylaram works, supplying over 40% of daytime manufacturing power.',
    keyInitiatives: [
      'Medium-frequency induction melting furnaces with advanced thyristor inverters that consume 18% less electricity per ton of molten steel.',
      'Over 85% of input charge consists of recycled scrap steel and worn manganese crusher liners returned from customer quarries.',
      'Automated sand reclamation system recycling 92% of green molding sand within the foundry.',
      'Zero Liquid Discharge (ZLD) effluent treatment facilities recycling 100% of industrial wash water on-site.',
    ],
    impactSummary: '3,900 MT CO2 avoided per year and 40,000 MT/year of sustainable wear parts casting output.',
  },
  {
    id: 'PIL-ECO-MACHINERY',
    title: 'Eco-Engineering & Energy Efficiency in Fleet Design',
    subtitle: 'Dual-Power Drives, Low Specific Power (kWh/Ton) & High-Torque Transmissions',
    icon: 'Zap',
    statBadge: '45% Fuel Reduction',
    overview:
      'Puzzolana designs crushers with optimized crushing kinematics that maximize rock reduction per kilowatt-hour of connected motor power, lowering the operational carbon footprint of aggregate production.',
    keyInitiatives: [
      'Dual-power diesel-electric track mobile units (PTJ/PTC/PTS) capable of plugging directly into zero-emission local electric grid power.',
      'Standard deployment of IE4 Ultra-Premium Efficiency electric motors across all stationary crusher drives.',
      'Hydroset automatic bowl positioning maintaining calibrated CSS settings to prevent power-wasting crusher chokes.',
      'High-velocity VSI rock-on-rock shaping utilizing natural autogenous rock linings, eliminating metallic wear liner casting waste.',
    ],
    impactSummary: '0.85 kWh/Ton average crushing energy draw and up to 45% reduction in hourly operating fuel expense.',
  },
  {
    id: 'PIL-WATER-SAND',
    title: 'Water Stewardship & Riverbed Protection via M-Sand',
    subtitle: 'Zero Silt Loss Hydrocyclone Washing & Certified Concrete River Sand Alternative',
    icon: 'Droplets',
    statBadge: '45M MT Sand Preserved',
    overview:
      'Unregulated river sand mining destroys aquatic biodiversity and lowers water tables. Puzzolana’s VSI shaping and hydrocyclone washing systems produce manufactured sand meeting IS:383 Zone II standards with zero environmental degradation.',
    keyInitiatives: [
      'PSW-series hydrocyclone washing modules recovering 98% of usable micro-fines (75μm to 150μm) while eliminating slurry tailings ponds.',
      'High-rate thickeners with automated flocculant dosing clarifying process water in minutes with 95% continuous recirculation.',
      'High-frequency linear dewatering screens producing dry aggregate stockpiles with < 12% moisture in under 30 minutes.',
      'Zero freshwater wastage through closed-loop recycling loops requiring only 5% makeup water for evaporative losses.',
    ],
    impactSummary: 'Over 45 Million MT of river sand preserved annually across Indian infrastructure corridors.',
  },
  {
    id: 'PIL-CSR-SAFETY',
    title: 'Community Empowerment, Technical Education & Safety',
    subtitle: 'Puzzolana Technical Foundation, Youth Vocational Training & Zero-Harm Culture',
    icon: 'Users',
    statBadge: '2,500+ Certified Techs',
    overview:
      'We believe sustainable industrialization must uplift surrounding rural communities. Through the Puzzolana Technical Foundation, we provide free vocational apprenticeships, healthcare initiatives, and STEM scholarships.',
    keyInitiatives: [
      'Puzzolana Technical Academy (Hyderabad) providing 12-month certified apprenticeships in CNC Machining, SAW Welding, and Industrial Hydraulics.',
      'Women in Heavy Engineering initiative promoting female mechanical design engineers and CNC operators across Hyderabad plants.',
      'ISO 45001 certified occupational health and safety governance achieving zero lost-time injury milestones across all manufacturing bays.',
      'Mobile primary healthcare and drinking water filtration projects serving 14 villages in Sangareddy and Medchal districts.',
    ],
    impactSummary: 'Over 12,000 community members supported annually through healthcare, vocational skills, and clean water.',
  },
];

export const CSR_COMMUNITY_PROJECTS: CSRProject[] = [
  {
    id: 'CSR-01-ACADEMY',
    title: 'Puzzolana Heavy Engineering Vocational Skill Center',
    location: 'IDA Pashamylaram & Cherlapally, Telangana',
    beneficiaries: '2,500+ Rural Youth & Diploma Holders',
    overview:
      'Free technical training center equipped with CNC simulators, submerged arc welding bays, and hydraulic test benches. Trainees receive government-recognized skill certifications and 100% employment placement assistance.',
    highlights: [
      'Full tuition sponsorship, toolkits, and safety PPE provided.',
      'Curriculum designed in collaboration with National Skill Development Corporation (NSDC).',
      'Over 60% of graduating technicians hired across Puzzolana plants and dealer workshops.',
    ],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'CSR-02-HEALTHCARE',
    location: 'Patancheru & Sangareddy Rural Mandals',
    title: 'Mobile Primary Health Clinic & Pure Drinking Water RO Plants',
    beneficiaries: '14 Villages (18,000+ Residents)',
    overview:
      'Dedicated mobile diagnostic vans providing free general medicine, eye checkups, and diabetes screenings, along with 4 community RO drinking water purification plants.',
    highlights: [
      'Over 24,000 free diagnostic consultations conducted annually.',
      'Community RO plants providing 10,000 liters/day of pure mineral drinking water per village.',
      'Emergency ambulance support for rural industrial zones.',
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'CSR-03-SOLAR-SCHOOLS',
    title: 'Solarization of Government Primary & High Schools',
    location: 'Telangana & Andhra Pradesh Rural Schools',
    beneficiaries: '22 Schools (4,200+ Students)',
    overview:
      'Installation of 5 kW to 10 kW rooftop solar systems and smart digital classrooms with uninterruptible clean power in rural government schools.',
    highlights: [
      'Zero electricity bills for participating rural schools.',
      'Continuous computer lab and digital classroom operation during summer grid power outages.',
      'Clean LED lighting and ceiling fans for all classrooms.',
    ],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
  },
];
