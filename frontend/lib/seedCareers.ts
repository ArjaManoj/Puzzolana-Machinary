export interface JobOpening {
  id: string;
  jobCode: string;
  title: string;
  department: 'Mechanical Engineering' | 'Manufacturing & Assembly' | 'Service & Field Support' | 'Corporate & Sales' | 'R&D';
  location: string;
  experienceLevel: 'Entry / GET (0-2 Yrs)' | 'Mid-Level (3-7 Yrs)' | 'Senior / Lead (8+ Yrs)';
  employmentType: 'Full-Time Permanent' | 'On-Site Specialist' | 'Rotational Field Deployment';
  minExperienceYears: number;
  education: string;
  overview: string;
  keyResponsibilities: string[];
  requiredSkills: string[];
  postedDate: string;
  vacancies: number;
}

export interface CareerPerk {
  title: string;
  description: string;
  icon: string;
  highlight?: string;
}

export const VERIFIED_JOB_OPENINGS: JobOpening[] = [
  {
    id: 'JOB-MECH-CONE-01',
    jobCode: 'PZ-JOB-2026-01',
    title: 'Senior Mechanical Design Engineer (Hydraulic Cone Crushers & FEA)',
    department: 'Mechanical Engineering',
    location: 'Hyderabad (Corporate HQ / R&D Center)',
    experienceLevel: 'Senior / Lead (8+ Yrs)',
    employmentType: 'Full-Time Permanent',
    minExperienceYears: 8,
    education: 'B.Tech / M.Tech in Mechanical Engineering / Machine Design',
    overview:
      'Lead the mechanical design, kinematic simulation, and structural FEA optimization of next-generation PCC-series hydraulic cone crushers up to 600 kW rating.',
    keyResponsibilities: [
      'Design high-torque eccentric shafts, spider assemblies, and hydroset hydraulic cylinders in SolidWorks / Creo.',
      'Perform non-linear Finite Element Analysis (FEA) on heavy cast steel mainframe housings subject to high dynamic crushing shock loads.',
      'Collaborate with the in-house Pashamylaram foundry team for casting pattern optimization and solidification simulations.',
      'Develop standard operating tolerances and CNC manufacturing drawings for precision lead-bronze bushings.',
    ],
    requiredSkills: [
      'SolidWorks 3D / Creo Parametric',
      'ANSYS Structural FEA',
      'Heavy Machinery DFM / DFA',
      'Hydraulic Power Pack Systems',
      'Cast Steel Metallurgy',
    ],
    postedDate: '2026-02-01',
    vacancies: 2,
  },
  {
    id: 'JOB-FND-MET-01',
    jobCode: 'PZ-JOB-2026-02',
    title: 'Lead Foundry Metallurgist & Induction Melting Specialist',
    department: 'Manufacturing & Assembly',
    location: 'Hyderabad (Pashamylaram Heavy Foundry Complex)',
    experienceLevel: 'Senior / Lead (8+ Yrs)',
    employmentType: 'Full-Time Permanent',
    minExperienceYears: 8,
    education: 'B.Tech / M.Tech in Metallurgical Engineering / Materials Science',
    overview:
      'Oversee metallurgical quality control, melt chemistry, and heat treatment for 40,000 MT/year production of austenitic high-manganese (Mn18Cr2, Mn22Cr2.5) and high-chromium white cast iron wear liners.',
    keyResponsibilities: [
      'Manage medium-frequency induction furnace melting parameters and optical emission spectrometer (OES) chemical analysis.',
      'Formulate water-quenching heat treatment cycles for austenitic manganese steel castings to eliminate grain boundary carbide precipitation.',
      'Perform microstructural examination, Charpy V-notch impact toughness testing, and Brinell hardness verification.',
      'Implement root-cause corrective actions for casting defects (shrinkage porosity, hot tearing, sand inclusions).',
    ],
    requiredSkills: [
      'Induction Furnace Melting',
      'Spectrometric Melt Analysis',
      'Austenitic Manganese Heat Treatment',
      'Foundry Solidification Simulation (AutoCAST / MAGMA)',
      'ISO 9001 / ASTM Quality Audits',
    ],
    postedDate: '2026-02-10',
    vacancies: 1,
  },
  {
    id: 'JOB-SRV-TRK-01',
    jobCode: 'PZ-JOB-2026-03',
    title: 'Senior Field Commissioning Engineer (Track Mobile Crushing Plants)',
    department: 'Service & Field Support',
    location: 'Regional Zonal Deployment (Pan-India & International Projects)',
    experienceLevel: 'Mid-Level (3-7 Yrs)',
    employmentType: 'Rotational Field Deployment',
    minExperienceYears: 4,
    education: 'Diploma / B.Tech in Mechanical or Automobile Engineering',
    overview:
      'Execute on-site installation, hydraulic calibration, diesel-electric dual drive commissioning, and customer operator training for track-mounted crushing & screening plants (PTJ / PTC / PTS series).',
    keyResponsibilities: [
      'Perform pre-commissioning mechanical checks, hydraulic pressure tests, and alignment of heavy vibrating screen decks.',
      'Commission Tier-4 diesel engines, hydrostatic track drives, and CAN-bus automated PLC control systems.',
      'Conduct 72-hour continuous aggregate production trials at customer quarry pits to verify contractual TPH and flakiness specs.',
      'Diagnose and rectify hydraulic proportional valve faults, bearing overheating, and conveyor tracking issues.',
    ],
    requiredSkills: [
      'Heavy Equipment Field Troubleshooting',
      'Mobile Hydraulics & Hydrostatic Drives',
      'Tier-4 Diesel Engine Diagnostics',
      'Laser Pulley & Shaft Alignment',
      'Client Training & Field Leadership',
    ],
    postedDate: '2026-02-15',
    vacancies: 4,
  },
  {
    id: 'JOB-APP-ENG-01',
    jobCode: 'PZ-JOB-2026-04',
    title: 'Mineral Flowsheet & Application Sizing Engineer',
    department: 'R&D',
    location: 'Hyderabad (Corporate HQ)',
    experienceLevel: 'Mid-Level (3-7 Yrs)',
    employmentType: 'Full-Time Permanent',
    minExperienceYears: 4,
    education: 'B.Tech in Mining Engineering / Mineral Processing / Mechanical Engineering',
    overview:
      'Model 2-stage to 4-stage crushing, screening, and sand washing flowsheets based on client rock lab tests (UCS, Abrasion Index, Quartz content) to deliver turnkey plant proposals.',
    keyResponsibilities: [
      'Calculate mass-balance simulations, recirculating loads, and stage-by-stage reduction ratios for stationary and mobile plants.',
      'Select optimal crusher cavity profiles (Extra Coarse, Coarse, Medium, Fine) and screen aperture configurations.',
      'Prepare technical bid packages, equipment sizing datasheets, and 2D/3D General Arrangement (GA) layouts.',
      'Conduct on-site plant audits to optimize aggregate grading and minimize recirculating energy consumption.',
    ],
    requiredSkills: [
      'Crushing Flowsheet Modeling (Bruno / JKSimMet / AggFlow)',
      'AutoCAD & 3D Plant Layouts',
      'Mineral Processing & Rock Mechanics',
      'Technical Bid Proposal Engineering',
    ],
    postedDate: '2026-02-18',
    vacancies: 2,
  },
  {
    id: 'JOB-ELEC-PLC-01',
    jobCode: 'PZ-JOB-2026-05',
    title: 'PLC Automation & Plant SCADA Control Systems Engineer',
    department: 'Manufacturing & Assembly',
    location: 'Hyderabad (Cherlapally Precision Division)',
    experienceLevel: 'Mid-Level (3-7 Yrs)',
    employmentType: 'Full-Time Permanent',
    minExperienceYears: 3,
    education: 'B.Tech in Electrical / Instrumentation & Control Engineering',
    overview:
      'Develop PLC programs, HMI graphical touchscreens, and IoT telemetry systems for automated crushing plant control cabins and track mobile units.',
    keyResponsibilities: [
      'Program Siemens S7-1200/1500 and Rockwell ControlLogix PLCs for auto-CSS adjustment and sequential plant interlocking.',
      'Develop SCADA graphics and remote IoT telemetry dashboards showing live motor current, hydraulic temperature, and TPH tonnage.',
      'Design electrical schematic diagrams (EPLAN) for Motor Control Centers (MCC) and Variable Frequency Drives (VFDs).',
      'Conduct factory acceptance testing (FAT) of electrical control panels before site dispatch.',
    ],
    requiredSkills: [
      'Siemens TIA Portal / Rockwell RSLogix',
      'SCADA & HMI Touchscreen Development',
      'VFD & Soft Starter Integration',
      'EPLAN Electrical CAD',
      'Industrial IoT / Modbus / Profinet',
    ],
    postedDate: '2026-02-20',
    vacancies: 2,
  },
  {
    id: 'JOB-GET-FAB-01',
    jobCode: 'PZ-JOB-2026-06',
    title: 'Graduate Engineer Trainee (GET) - Heavy Fabrication & Welded Structures',
    department: 'Mechanical Engineering',
    location: 'Hyderabad (Pashamylaram Manufacturing Complex)',
    experienceLevel: 'Entry / GET (0-2 Yrs)',
    employmentType: 'Full-Time Permanent',
    minExperienceYears: 0,
    education: 'B.Tech in Mechanical / Production / Manufacturing Engineering (2024 - 2026 Batch)',
    overview:
      'Fast-track 12-month structured engineering rotational program across heavy boiler-quality plate cutting, Submerged Arc Welding (SAW), CNC boring, and final machine assembly bays.',
    keyResponsibilities: [
      'Assist senior fabrication managers in raw material plate nesting, plasma CNC cutting, and weld joint preparation.',
      'Learn ultrasonic (UT) and magnetic particle (MPI) non-destructive testing (NDT) inspection standards for heavy crusher chassis frames.',
      'Participate in stage-gate quality audits and dimensional verification using coordinate measuring systems.',
      'Receive full-spectrum hands-on training at the Puzzolana Technical Academy in Hyderabad.',
    ],
    requiredSkills: [
      'Core Mechanical Engineering Fundamentals',
      'Engineering Drawing & GD&T Reading',
      'Basic Knowledge of Welding Standards (AWS / ASME)',
      'Passion for Heavy Industrial Manufacturing',
    ],
    postedDate: '2026-02-25',
    vacancies: 6,
  },
];

export const CAREER_PERKS: CareerPerk[] = [
  {
    title: 'Heavy Engineering Heritage',
    description: 'Work on India’s largest crushing and screening machinery, powering national highways and high-tonnage open-cast mining belts.',
    icon: 'Factory',
    highlight: '60+ Years Legacy',
  },
  {
    title: 'Puzzolana Technical Academy',
    description: 'Structured continuous learning, CAD modeling certifications, hydraulic training benches, and metallurgical lab access in Hyderabad.',
    icon: 'GraduationCap',
    highlight: '100% Upskilling',
  },
  {
    title: 'Global Field Exposure',
    description: 'Opportunities for commissioning and technical leadership across 40+ countries in the Middle East, Africa, and Southeast Asia.',
    icon: 'Globe',
    highlight: '40+ Countries',
  },
  {
    title: 'Innovation & In-House Foundry',
    description: 'Experience the entire product lifecycle under one roof—from raw induction melt casting to 3D CAD design and final plant assembly.',
    icon: 'Layers',
    highlight: '40,000 MT Foundry',
  },
];
