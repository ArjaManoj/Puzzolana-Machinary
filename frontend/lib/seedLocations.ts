export interface FacilityLocation {
  id: string;
  name: string;
  category: 'Headquarters' | 'Manufacturing Plants' | 'Zonal Offices' | 'International Hubs';
  type: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
  workingHours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  features: string[];
  capacityInfo?: string;
  image: string;
}

export interface DepartmentDirectory {
  id: string;
  name: string;
  email: string;
  phone: string;
  purpose: string;
  sla: string;
  icon: string;
}

export const PUZZOLANA_LOCATIONS: FacilityLocation[] = [
  // 1. CORPORATE HEADQUARTERS
  {
    id: 'LOC-HYD-HQ',
    name: 'Puzzolana Corporate Towers (Global HQ)',
    category: 'Headquarters',
    type: 'Global Corporate & Executive Command Center',
    address: 'Puzzolana Towers, Road No. 2, Banjara Hills, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    postalCode: '500034',
    phone: '+91 (40) 2344 8800',
    email: 'info@puzzolana.com',
    workingHours: 'Mon - Sat: 8:30 AM - 7:00 PM (IST)',
    coordinates: { lat: 17.4156, lng: 78.4352 },
    features: [
      'Executive Directorate & Boardrooms',
      'Global Crushing Flowsheet Design Center (120+ CAD Engineers)',
      'Central Customer Relationship & ERP Command',
      'International Export & Project Finance Cell',
    ],
    capacityInfo: 'Headquarters for 1,200+ Global Team Members',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  },

  // 2. MANUFACTURING PLANTS
  {
    id: 'LOC-PLANT-PASHAMYLARAM',
    name: 'Pashamylaram Heavy Machinery Complex & Foundry',
    category: 'Manufacturing Plants',
    type: 'Integrated Heavy Fabrication, Casting Foundry & Assembly Bay',
    address: 'Plot No. 44 & 45, Phase III, IDA Pashamylaram, Patancheru, Sangareddy Dist',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    postalCode: '502307',
    phone: '+91 (8455) 224 400',
    email: 'plant.pashamylaram@puzzolana.com',
    workingHours: '24/7 Continuous Production (3 Shifts)',
    coordinates: { lat: 17.5284, lng: 78.1882 },
    features: [
      '40,000 MT/annum High-Manganese & Alloy Steel Induction Foundry',
      'Heavy CNC Floor Borers & Double Column Machining Centers',
      'Automated Submerged Arc Welding (SAW) Frame Fabrication',
      'Full Plant Pre-Assembly & No-Load Testing Yards',
    ],
    capacityInfo: 'Over 60 Acres Heavy Engineering Footprint',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'LOC-PLANT-CHERLAPALLY',
    name: 'Cherlapally Precision Engineering & Hydraulics Division',
    category: 'Manufacturing Plants',
    type: 'Precision Machining, Hydraulic Systems & Electrical Assembly',
    address: 'Plot 120/A, Phase II, IDA Cherlapally, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    postalCode: '500051',
    phone: '+91 (40) 2712 1100',
    email: 'plant.cherlapally@puzzolana.com',
    workingHours: 'Mon - Sat: 8:00 AM - 8:00 PM',
    coordinates: { lat: 17.4682, lng: 78.6015 },
    features: [
      'Cone Crusher Hydroset & Clamping Cylinder Machining',
      'Automated PLC & VFD Control Panel Manufacturing',
      'High-Pressure Hydraulic Power Pack Test Benches',
      'Vibrator Mechanism Precision Balancing Facility',
    ],
    capacityInfo: 'Dedicated Precision Automation Facility',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
  },

  // 3. ZONAL OFFICES
  {
    id: 'LOC-ZONAL-DELHI',
    name: 'North India Zonal Command & Logistics Hub',
    category: 'Zonal Offices',
    type: 'North India Regional Operations & Project Support',
    address: 'Okhla Industrial Area, Phase III, New Delhi',
    city: 'New Delhi',
    state: 'Delhi NCR',
    country: 'India',
    postalCode: '110020',
    phone: '+91 (11) 4160 5500',
    email: 'delhi.zonal@puzzolana.com',
    workingHours: 'Mon - Sat: 9:00 AM - 6:30 PM',
    coordinates: { lat: 28.5355, lng: 77.2654 },
    features: [
      'National Highway Project Fleet Coordination Desk',
      'Regional Wear Spares Buffer Stock',
      'Mobile Service Van Fleet Dispatch',
      'Government & Infrastructure Liaison Office',
    ],
    capacityInfo: 'Covering Delhi, Rajasthan, Punjab, UP, HP, J&K',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'LOC-ZONAL-MUMBAI',
    name: 'Western India Zonal Headquarters',
    category: 'Zonal Offices',
    type: 'Western Operations, Marine Exports & Mining Liaison',
    address: 'MIDC Industrial Area, Turbhe, Navi Mumbai',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    country: 'India',
    postalCode: '400705',
    phone: '+91 (22) 2780 4455',
    email: 'mumbai.zonal@puzzolana.com',
    workingHours: 'Mon - Sat: 9:00 AM - 7:00 PM',
    coordinates: { lat: 19.0760, lng: 73.0076 },
    features: [
      'Basalt & Granite Quarry Optimization Desk',
      'Port Logistics & Containerized Sea Freight Coordination',
      'Commercial Contract & Project Finance Desk',
      'Rapid Service Response Cell',
    ],
    capacityInfo: 'Covering Maharashtra, Gujarat, Goa, MP',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'LOC-ZONAL-KOLKATA',
    name: 'Eastern India & Mining Belt Operations',
    category: 'Zonal Offices',
    type: 'Eastern Zonal Command & Mineral Processing Desk',
    address: 'Salt Lake Sector V, Block EP & GP, Kolkata',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    postalCode: '700091',
    phone: '+91 (33) 4008 7600',
    email: 'kolkata.zonal@puzzolana.com',
    workingHours: 'Mon - Sat: 9:00 AM - 6:30 PM',
    coordinates: { lat: 22.5804, lng: 88.4378 },
    features: [
      'Coal, Iron Ore & Bauxite Mineral Processing Support',
      'Surface Miner & Feeder Breaker Engineering Hub',
      'Eastern Quarry Spares Depot',
      'Site Erection Supervisor Deployment Desk',
    ],
    capacityInfo: 'Covering West Bengal, Odisha, Jharkhand, North-East',
    image: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80',
  },

  // 4. INTERNATIONAL HUBS
  {
    id: 'LOC-INT-DUBAI',
    name: 'Puzzolana International FZE (MENA Command)',
    category: 'International Hubs',
    type: 'Middle East & North Africa Regional Headquarters',
    address: 'Jebel Ali Free Zone (JAFZA), South Zone 1, PO Box 263412, Dubai',
    city: 'Dubai',
    state: 'Dubai Emirate',
    country: 'United Arab Emirates',
    postalCode: '263412',
    phone: '+971 (4) 880 9944',
    email: 'mena.sales@puzzolana.com',
    workingHours: 'Mon - Sat: 8:00 AM - 6:00 PM (GST)',
    coordinates: { lat: 24.9984, lng: 55.0768 },
    features: [
      'MENA Strategic Spares Buffer Warehouse',
      'High-Ambient (55°C) Desert Crushing Engineering Support',
      'Gulf Quarry Commissioning & Warranty Desk',
      'Direct Maritime Freight Link to Indian Ocean Ports',
    ],
    capacityInfo: 'Serving UAE, Saudi Arabia, Oman, Qatar, Kuwait',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'LOC-INT-NAIROBI',
    name: 'Puzzolana Africa Machinery Ltd',
    category: 'International Hubs',
    type: 'East & Central Africa Distribution Hub',
    address: 'Mombasa Road, Industrial Area, Near Inland Container Depot, Nairobi',
    city: 'Nairobi',
    state: 'Nairobi County',
    country: 'Kenya',
    postalCode: '00100',
    phone: '+254 (20) 698 5000',
    email: 'eastafrica@puzzolana.com',
    workingHours: 'Mon - Fri: 8:00 AM - 5:30 PM (EAT)',
    coordinates: { lat: -1.3197, lng: 36.8523 },
    features: [
      'East African Infrastructure Fleet Support Desk',
      'Rapid Manganese Jaw & Cone Liner Warehouse',
      'Factory-Trained Field Service Technicians',
      'Mobile Crushing Unit Training Center',
    ],
    capacityInfo: 'Serving Kenya, Tanzania, Uganda, Rwanda, Ethiopia',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
  },
];

export const PUZZOLANA_DEPARTMENTS: DepartmentDirectory[] = [
  {
    id: 'DEP-SALES',
    name: 'Plant Sales & Flowsheet Engineering',
    email: 'sales@puzzolana.com',
    phone: '+91 (40) 2344 8800',
    purpose: 'New crushing plant quotations, technical sizing calculations, and turnkey aggregate/mining solutions.',
    sla: 'Within 24 Hours',
    icon: 'Building2',
  },
  {
    id: 'DEP-SPARES',
    name: 'OEM Spares & Wear Castings Desk',
    email: 'spares@puzzolana.com',
    phone: '+91 (40) 2344 8820',
    purpose: 'Factory-direct high manganese jaw plates, cone mantles, tungsten rotor tips, and polyurethane screens.',
    sla: 'Dispatched in 24h for In-Stock Items',
    icon: 'Layers',
  },
  {
    id: 'DEP-SERVICE',
    name: 'Field Engineering & 24/7 Breakdown Cell',
    email: 'service@puzzolana.com',
    phone: '+91 (40) 2344 8830',
    purpose: 'Emergency on-site breakdown technician dispatch, laser shaft alignment, annual maintenance contracts (AMC).',
    sla: 'Immediate Response / 24/7 Hotline',
    icon: 'Wrench',
  },
  {
    id: 'DEP-DEALERS',
    name: 'Dealership & Channel Partner Directorate',
    email: 'dealers@puzzolana.com',
    phone: '+91 (40) 2344 8840',
    purpose: 'Authorized 3S channel partner onboarding, regional territory inquiries, and dealer inventory allocations.',
    sla: 'Within 48 Hours',
    icon: 'ShieldCheck',
  },
  {
    id: 'DEP-HR',
    name: 'Human Resources & Engineering Careers',
    email: 'careers@puzzolana.com',
    phone: '+91 (40) 2344 8850',
    purpose: 'Campus placements, mechanical design engineering recruitment, foundry metallurgists, and technical apprenticeships.',
    sla: 'Application Reviewed in 5 Days',
    icon: 'GraduationCap',
  },
  {
    id: 'DEP-MEDIA',
    name: 'Corporate Communications & Investor Desk',
    email: 'info@puzzolana.com',
    phone: '+91 (40) 2344 8800',
    purpose: 'Media relations, international trade exhibitions (Excon, Bauma, Imme), and corporate governance inquiries.',
    sla: 'Within 24 Hours',
    icon: 'Mail',
  },
];
