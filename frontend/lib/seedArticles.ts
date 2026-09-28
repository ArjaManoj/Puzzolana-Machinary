export interface AuthorProfile {
  name: string;
  role: string;
  department: string;
  avatar: string;
}

export interface ContentSection {
  heading: string;
  paragraphs: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  calloutQuote?: string;
}

export interface ArticlePost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Metallurgy & Wear Tech' | 'Sand & Aggregate Quality' | 'Equipment Sizing & Economics' | 'Plant Flowsheet Engineering' | 'Environmental & Sustainability' | 'Corporate & Industry News';
  author: AuthorProfile;
  publishedDate: string;
  readTimeMinutes: number;
  featuredImage: string;
  excerpt: string;
  keyTakeaways: string[];
  contentSections: ContentSection[];
  tags: string[];
}

export const VERIFIED_ARTICLES: ArticlePost[] = [
  {
    id: 'ART-01-METALLURGY',
    slug: 'science-of-high-manganese-metallurgy-mn18cr2-crusher-jaw-life',
    title: 'The Science of High-Manganese Metallurgy: Why Mn18Cr2 Extends Crusher Jaw Life in Abrasive Granite',
    subtitle: 'An in-depth metallurgical analysis of austenitic work-hardening, chromium alloying, and water-quenching heat treatments from Puzzolana’s in-house foundry.',
    category: 'Metallurgy & Wear Tech',
    author: {
      name: 'Dr. K. Srinivas Rao',
      role: 'Head of Metallurgy & Casting R&D',
      department: 'Pashamylaram Foundry Directorate',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    publishedDate: 'February 12, 2026',
    readTimeMinutes: 6,
    featuredImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Crushing hard igneous rocks with high quartz content demands metallurgy that hardens on impact while maintaining ductile fracture toughness. Discover how Puzzolana’s Mn18Cr2 formulation doubles wear life.',
    keyTakeaways: [
      'Standard Hadfield manganese (Mn12-14%) undergoes rapid abrasive gouging in quartzites exceeding 220 MPa compressive strength.',
      'Adding 2.0% Chromium (Mn18Cr2) stabilizes the carbide matrix and accelerates work-hardening from 220 HB up to 550 HB under repeated impact.',
      'Precision water-quenching from 1,050°C dissolves brittle grain-boundary carbides, preventing catastrophic premature fracture.',
      'Deep tooth corrugated profiles ensure balanced compressive wear across the entire crushing cavity.',
    ],
    contentSections: [
      {
        heading: '1. The Work-Hardening Mechanism in Austenitic Manganese Steel',
        paragraphs: [
          'In primary jaw crushing, the liner surface experiences severe compressive impact combined with high-stress sliding abrasion. Standard austenitic Hadfield steel (12-14% Mn, 1.2% C) was historically the industry standard because of its unique capacity to work-harden from an initial 200-220 HB to over 450 HB under repeated impacts.',
          'However, in hard granite, basalt, and quartzite containing over 30% quartz (Mohs hardness 7), standard manganese wear plates abrade faster than the rate of surface work-hardening. As a result, the unhardened ductile substrate is continuously gouged away, causing premature liner replacement.',
        ],
        calloutQuote:
          'When crushing hard granite with 35% quartz content, standard Hadfield manganese wears down before it has time to work-harden. Mn18Cr2 solves this with immediate solid-solution hardening.',
      },
      {
        heading: '2. Comparative Metallurgy: Standard Mn14 vs. Puzzolana Mn18Cr2',
        paragraphs: [
          'Puzzolana’s metallurgical engineering team developed an optimized austenitic formulation containing 18% Manganese and 2.0-2.5% Chromium. Chromium acts as a powerful solid-solution strengthener, increasing the initial yield strength by 28% while accelerating the transformation hardening rate.',
        ],
        table: {
          headers: ['Metallurgical Property', 'Standard Hadfield (Mn13%)', 'Puzzolana Foundry (Mn18Cr2)', 'Ultra-High (Mn22Cr2.5)'],
          rows: [
            ['Initial Surface Hardness', '210 - 230 HB', '240 - 260 HB', '260 - 280 HB'],
            ['Hardness After Work-Hardening', '450 - 480 HB', '530 - 560 HB', '580 - 620 HB'],
            ['Yield Strength (MPa)', '380 MPa', '490 MPa', '540 MPa'],
            ['Typical Wear Life in Hard Granite', '320 Operating Hours', '580 Operating Hours', '720 Operating Hours'],
          ],
        },
      },
      {
        heading: '3. Solution Heat Treatment and Thermal Quenching Protocols',
        paragraphs: [
          'The secret to exceptional manganese casting performance lies in the post-casting thermal cycle. In raw cast state, heavy manganese sections contain brittle grain boundary iron-manganese carbides that make the casting susceptible to sudden cracking.',
          'At Puzzolana’s Pashamylaram foundry, all castings undergo automated solution annealing at 1,050°C to 1,100°C for 8 to 12 hours. This dissolves all carbides back into the solid austenite matrix. Castings are then plunged into high-flow agitated water tanks in under 45 seconds to freeze the 100% austenitic microstructure.',
        ],
      },
    ],
    tags: ['Metallurgy', 'Crusher Jaw Plates', 'Mn18Cr2', 'Wear Technology', 'Foundry'],
  },
  {
    id: 'ART-02-MSAND',
    slug: 'achieving-is-383-zone-ii-compliance-msand-vs-river-sand-concrete',
    title: 'Achieving IS:383 Zone II Compliance: M-Sand vs Natural River Sand in High-Strength Concrete',
    subtitle: 'How rock-on-rock VSI shaping and calibrated hydrocyclone washing produce manufactured sand with superior compressive strength to dredged river sand.',
    category: 'Sand & Aggregate Quality',
    author: {
      name: 'P. N. Ramanathan',
      role: 'Chief Application & Concrete Specialist',
      department: 'Aggregate Quality Directorate',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    publishedDate: 'February 05, 2026',
    readTimeMinutes: 8,
    featuredImage: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'With increasing environmental restrictions on riverbed dredging, manufactured sand (M-Sand) engineered through VSI impactors and hydrocyclones provides higher concrete bond strength and zero organic silt.',
    keyTakeaways: [
      'Natural river sand contains up to 8% clay, mica, and organic silt that reduce 28-day concrete compressive strength by 15-20%.',
      'Rock-on-rock VSI crushing creates cubical manufactured sand with a balanced fineness modulus (2.4 to 2.8), strictly conforming to IS:383 Zone II.',
      'Hydrocyclone washing captures micro-fines (75μm to 150μm) required for workability while removing minus-75μm deleterious clays.',
      'Ready-mix concrete producers achieve 8-10% cement savings due to optimal aggregate packing and lower water-cement ratios.',
    ],
    contentSections: [
      {
        heading: '1. The Problem with Dredged River Sand',
        paragraphs: [
          'Historically, construction contractors relied on dredged river sand. However, natural river sand suffers from erratic gradation, high organic impurities, and deleterious silt contents ranging from 5% to 12%. When mixed into high-performance concrete (M40, M50, and M60 grades), these silt coatings prevent effective cement paste adhesion to aggregate particles.',
        ],
        calloutQuote:
          'M-Sand produced via calibrated VSI impactors and hydrocyclones delivers up to 18% higher 28-day concrete compressive strength than dredged river sand.',
      },
      {
        heading: '2. IS:383 Zone II Gradation Standard Comparison',
        paragraphs: [
          'The Indian Standard IS:383 specifies four grading zones for fine aggregate. Zone II is the gold standard for high-strength reinforced concrete. The table below illustrates how Puzzolana M-Sand compares against natural river sand.',
        ],
        table: {
          headers: ['IS Sieve Designation', 'IS:383 Zone II Standard %', 'Puzzolana Engineered M-Sand', 'Typical Dredged River Sand'],
          rows: [
            ['4.75 mm', '90 - 100%', '98.5%', '92.0%'],
            ['2.36 mm', '75 - 100%', '84.2%', '78.5%'],
            ['1.18 mm', '55 - 90%', '68.0%', '54.0% (Deficient)'],
            ['600 micron', '35 - 59%', '46.5%', '31.0%'],
            ['300 micron', '8 - 30%', '18.2%', '12.0%'],
            ['150 micron', '0 - 10%', '6.4%', '4.0%'],
            ['Silt Content (<75 micron)', '< 3.0%', '1.8%', '6.5% - 9.0% (Exceeds Limit)'],
          ],
        },
      },
      {
        heading: '3. Role of the VSI Impactor in Cubical Particle Morphology',
        paragraphs: [
          'Cone and jaw crushers produce elongated and flaky needle-like grit due to shear compression. Passing 0-10mm crusher screenings through a PVI-series Vertical Shaft Impactor (VSI) accelerates rock particles against an autogenous rock lining at speeds exceeding 70 m/s.',
          'High-velocity rock-on-rock collisions chip off weak edges, resulting in cubical, polyhedral particle shapes that increase concrete pumpability and slump retention without extra water addition.',
        ],
      },
    ],
    tags: ['M-Sand', 'IS:383 Zone II', 'Concrete Quality', 'VSI Impactors', 'Hydrocyclones'],
  },
  {
    id: 'ART-03-TRACK-VS-STAT',
    slug: 'track-mounted-vs-stationary-crushing-plants-tco-comparison-expressways',
    title: 'Track-Mounted vs Stationary Crushing Plants: Total Cost of Ownership (TCO) Comparison for Expressway Projects',
    subtitle: 'A comprehensive financial and operational evaluation of mobile track fleets vs stationary crushing installations across 100+ km road packages.',
    category: 'Equipment Sizing & Economics',
    author: {
      name: 'Rajesh V. Menon',
      role: 'VP - Application Engineering & Estimations',
      department: 'Corporate Project Solutions',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    publishedDate: 'January 28, 2026',
    readTimeMinutes: 7,
    featuredImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'For linear highway packages exceeding 80 km, track mobile crushers eliminate RCC civil foundations and reduce dump truck haulage by crushing directly at the quarry face.',
    keyTakeaways: [
      'Stationary plants require ₹80 Lakh to ₹1.5 Crore in concrete civil foundations, environmental clearances, and 4-6 months of site erection time.',
      'Track-mounted units (PTJ/PTC/PTS) commence production within 48 hours of site delivery with zero civil construction costs.',
      'Moving the crushing fleet every 30-40 km saves up to ₹2.2 Crore in dump truck diesel fuel haulage costs on large road contracts.',
      'Dual-power diesel-electric systems enable track units to plug into local high-tension grid power, slashing hourly energy expenses by 45%.',
    ],
    contentSections: [
      {
        heading: '1. Capex vs. Setup Speed: The Civil Infrastructure Factor',
        paragraphs: [
          'Linear infrastructure projects like the Bharatmala Expressway network span hundreds of kilometers across diverse terrain. When contractors opt for stationary crushing plants, they face substantial upfront civil construction costs: reinforced concrete retaining walls, deep jaw foundation footings, and complex steel structure erection taking 120 to 180 days.',
          'In contrast, track-mounted mobile crushing and screening units require zero civil foundations. They drive off low-bed trailers directly into the quarry pit under hydraulic track power and start crushing within 2 hours of arrival.',
        ],
        calloutQuote:
          'On a 150 km highway package, eliminating off-road dump truck haulage by tracking the crushing plant closer to the active paving front saved our client ₹2.4 Crore in diesel fuel.',
      },
      {
        heading: '2. 3-Year Total Cost of Ownership (TCO) Comparison (400 TPH Fleet)',
        paragraphs: [
          'The financial matrix below models a 400 TPH aggregate production requirement producing 4.0 Million MT of WMM, DBM, and PQC aggregate over a 36-month expressway contract.',
        ],
        table: {
          headers: ['Cost Component', 'Stationary 400 TPH Plant (4 Relocations)', 'Track Mobile 400 TPH Fleet (Dual Power)'],
          rows: [
            ['Initial Equipment Capex', '₹11.2 Crore', '₹14.5 Crore'],
            ['Civil Works & Foundation (4 Sites)', '₹3.8 Crore', '₹0 (Zero Civil Foundations)'],
            ['Erection, Dismantling & Relocation', '₹1.9 Crore (180 days downtime)', '₹0.35 Crore (6 days total downtime)'],
            ['Quarry Pit to Plant Haulage Diesel', '₹5.2 Crore (Avg 8.5 km haul)', '₹2.8 Crore (Crushing at Pit Face)'],
            ['3-Year Total Cost of Ownership', '₹22.1 Crore', '₹17.65 Crore (20.1% Net Savings)'],
          ],
        },
      },
    ],
    tags: ['Track Mobile', 'Stationary Plants', 'TCO Economics', 'Expressway Construction', 'Highway Aggregates'],
  },
  {
    id: 'ART-04-VSI-SHAPING',
    slug: 'optimizing-closed-circuit-tertiary-vsi-sub-12-flakiness-index',
    title: 'Optimizing Closed-Circuit Tertiary VSI Impactors for Sub-12% Flakiness Index',
    subtitle: 'Technical guide on rotor tip peripheral speed, cascade feeding ratios, and closed-circuit screening to meet strict MoRTH and airport paving specs.',
    category: 'Plant Flowsheet Engineering',
    author: {
      name: 'Vikramaditya Rao',
      role: 'Lead Flowsheet Design Engineer',
      department: 'Crushing Systems Engineering',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    publishedDate: 'January 18, 2026',
    readTimeMinutes: 5,
    featuredImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Discover how adjusting the rotor-to-cascade feed ratio in PVI-series Vertical Shaft Impactors optimizes aggregate cubicity while reducing specific kilowatt-hour power draw.',
    keyTakeaways: [
      'The Ministry of Road Transport and Highways (MoRTH) mandates a combined Flakiness and Elongation Index of < 15% for surface course asphalt.',
      'Operating PVI VSIs in closed circuit with high-frequency screens ensures 100% of coarse fractions undergo shaping passes.',
      'Employing a 70:30 rotor-to-cascade feed ratio provides maximum cubical conversion while lowering tungsten carbide rotor wear by 25%.',
      'Tungsten carbide tipped backup bars maintain calibrated rotor balance at tip speeds up to 75 m/s.',
    ],
    contentSections: [
      {
        heading: '1. Why Aggregate Shape Directly Determines Pavement Longevity',
        paragraphs: [
          'Flaky and elongated aggregate particles break under heavy rolling compaction and traffic loading, causing premature asphalt rutting and concrete micro-cracking. Indian specifications (MoRTH Section 500) strictly limit flakiness to 15% for Dense Bituminous Macadam (DBM) and Stone Matrix Asphalt (SMA).',
          'While secondary cone crushers excel at high reduction ratios, their compressive shear action inevitably generates 22% to 30% flaky particles when crushing laminated granite or basalt.',
        ],
      },
      {
        heading: '2. The Mechanics of Dual-Stream Cascade Rock-on-Rock Impact',
        paragraphs: [
          'Puzzolana PVI-series Vertical Shaft Impactors utilize a dual-stream rock-on-rock chamber. Up to 70% of the feed enters the high-speed centrifugal rotor, accelerating out at 65-75 m/s into the crushing chamber.',
          'Simultaneously, a secondary "cascade" feed stream bypasses the rotor and falls directly into the perimeter impact zone. The high-speed rotor stream collides violently with the falling cascade curtain, creating intense multi-particle attrition that chips off flaky edges without excessive motor power consumption.',
        ],
      },
    ],
    tags: ['VSI Impactors', 'Flakiness Index', 'MoRTH Specs', 'Flowsheet Design', 'Cubical Aggregate'],
  },
  {
    id: 'ART-05-HYDROCYCLONE',
    slug: 'next-gen-hydrocyclone-washing-zero-waste-fines-recovery-water-management',
    title: 'Next-Gen Hydrocyclone Washing: Zero-Waste Micro-Fine Recovery and Closed-Loop Water Management',
    subtitle: 'How polyurethane hydrocyclones and high-frequency dewatering screens reclaim valuable minus 150-micron sand while recycling 95% of process wash water.',
    category: 'Environmental & Sustainability',
    author: {
      name: 'S. Ananya Murthy',
      role: 'Washing Systems & Sustainability Specialist',
      department: 'Mineral Processing Division',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    publishedDate: 'January 10, 2026',
    readTimeMinutes: 6,
    featuredImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Traditional bucket wheel sand washers lose up to 25% of valuable fine sand to tailings ponds. Learn how Puzzolana PSW hydrocyclone systems achieve 98% fines recovery and 95% water recycling.',
    keyTakeaways: [
      'Bucket wheel sand washers lose valuable 75μm to 150μm fines to settling lagoons, creating massive slurry cleanup liabilities.',
      'Centrifugal vortex separation in polyurethane hydrocyclones captures 98% of usable sand down to 75 microns.',
      'Linear high-frequency dewatering screens discharge sand with < 12% moisture, making stockpiles instantly loadable onto trucks.',
      'Pairing hydrocyclones with high-rate thickeners returns 95% clarified water to the plant in a continuous closed loop.',
    ],
    contentSections: [
      {
        heading: '1. The Inefficiencies of Conventional Bucket Wheel Washers',
        paragraphs: [
          'In traditional aggregate washing plants, bucket wheel washers rely on gravity settling in an open water trough. Because fine sand (75 to 150 microns) has a slow settling velocity, it remains suspended and flows over the weir directly into settling ponds.',
          'This causes two severe economic losses: 15 to 25 TPH of high-value sand is permanently lost, and the quarry owner must spend lakhs every month excavating and dredging choked settling lagoons.',
        ],
      },
      {
        heading: '2. Hydrocyclone Vortex Principle and Dewatering Efficiency',
        paragraphs: [
          'Puzzolana PSW-series sand washing systems pump the sand-water slurry at calibrated pressure into an involute polyurethane hydrocyclone. The centrifugal acceleration (up to 50G) separates dense sand particles towards the outer cyclone wall, discharging them through the rubber apex spigot.',
          'The de-silted sand drops onto a high-frequency vibrating screen equipped with 0.5mm polyurethane modular aperture panels. High G-force vibration strips free moisture, discharging clean, drip-free M-Sand ready for immediate dispatch.',
        ],
      },
    ],
    tags: ['Hydrocyclone', 'Sand Washing', 'Water Recycling', 'Sustainability', 'Zero Waste'],
  },
  {
    id: 'ART-06-EXCON-NEWS',
    slug: 'puzzolana-showcases-1200-tph-mining-fleet-excon-exhibition',
    title: 'Puzzolana Showcases 1200 TPH High-Tonnage Mining Fleet at Excon Exhibition',
    subtitle: 'Over 25,000 visitors experience Puzzolana’s flagship PJC 14076 Jaw Crusher, PTJ 11075 Track Unit, and in-house casting foundry technological breakthrough.',
    category: 'Corporate & Industry News',
    author: {
      name: 'Corporate Communications Desk',
      role: 'Media & Public Relations Directorate',
      department: 'Hyderabad Executive Office',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    },
    publishedDate: 'December 20, 2025',
    readTimeMinutes: 4,
    featuredImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Puzzolana marked its presence at South Asia’s largest construction equipment exhibition by unveiling its flagship 1200 TPH heavy mining crushing fleet and automated SCADA control systems.',
    keyTakeaways: [
      'Unveiled the massive 58-Ton PJC 14076 Primary Jaw Crusher engineered for hard iron ore and granite boulders.',
      'Demonstrated live CAN-bus IoT telemetry on the PTJ 11075 Track Mobile Jaw Unit with dual electric-diesel drive.',
      'Announced expansion of the Pashamylaram heavy casting foundry capacity to 40,000 MT per year.',
      'Signed 14 turnkey crushing plant supply agreements with major Indian and African mining infrastructure conglomerates.',
    ],
    contentSections: [
      {
        heading: '1. Industrial Innovation at the Forefront of Excon',
        paragraphs: [
          'At the recent Excon Exhibition in Bengaluru, Puzzolana Machinery Fabricators demonstrated its 60-year leadership in crushing, screening, and surface mining technology. Spanning over 2,000 sq. meters of outdoor demonstration space, the Puzzolana pavilion was visited by over 25,000 industry professionals, quarry owners, and international delegates.',
          'The centerpiece of the exhibit was the towering PJC 14076 Primary Jaw Crusher—a 58-ton heavy mining monster capable of crushing 800 TPH of blasted rock in a single pass.',
        ],
      },
    ],
    tags: ['Excon', 'Corporate News', 'Exhibitions', 'Mining Machinery', 'PJC 14076'],
  },
];
