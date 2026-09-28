export interface IndustrialEvent {
  id: string;
  slug: string;
  name: string;
  category: 'National Flagship Expo' | 'International Trade Fair' | 'Mining & Mineral Expo' | 'Past Exhibition';
  status: 'upcoming' | 'ongoing' | 'past';
  startDate: string;
  endDate: string;
  venue: string;
  city: string;
  country: string;
  boothCoordinates: string;
  pavilionType: 'Mega Outdoor Demonstration Arena' | 'Indoor Prime Engineering Stall' | 'International Country Pavilion';
  featuredMachines: string[];
  description: string;
  bannerImage: string;
  galleryImages: string[];
  delegatesExpected: string;
  highlights: string[];
}

export const VERIFIED_EVENTS: IndustrialEvent[] = [
  {
    id: 'EVT-EXCON-2026',
    slug: 'excon-2026-bengaluru',
    name: 'EXCON 2026: South Asia’s Largest Construction Equipment & Machinery Exhibition',
    category: 'National Flagship Expo',
    status: 'upcoming',
    startDate: 'December 08, 2026',
    endDate: 'December 12, 2026',
    venue: 'Bangalore International Exhibition Centre (BIEC), Tumkur Road',
    city: 'Bengaluru',
    country: 'India',
    boothCoordinates: 'Outdoor Pavilion OD-12 (2,500 Sq. Meters)',
    pavilionType: 'Mega Outdoor Demonstration Arena',
    featuredMachines: [
      'PJC 14076 Primary Deep-Cavity Jaw Crusher',
      'PTJ 11075 Track-Mounted Mobile Jaw Plant (Dual-Power)',
      'PCC 2000 Hydraulic Cone Crusher',
      'PSW 150 Ultra-Fine Hydrocyclone Sand Washer',
    ],
    description:
      'Experience Puzzolana’s flagship 2,500 sq. meter outdoor demonstration pavilion at EXCON 2026. Witness live demonstrations of dual-power track crushers, interact with our Hyderabad foundry metallurgists, and explore custom flowsheet configurations up to 1,200 TPH.',
    bannerImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    ],
    delegatesExpected: '60,000+ Trade Visitors & Infrastructure Contractors',
    highlights: [
      'Live dynamic demonstration of PTJ 11075 dual-power track crusher switching from grid to diesel generator.',
      'Unveiling of the new Mn22Cr2.5 high-shock manganese cone mantles manufactured in Pashamylaram.',
      'Exclusive 1-on-1 technical flowsheet sizing sessions with Puzzolana Chief Application Engineers.',
      'VIP networking lounge for turnkey quarry operators and mining fleet owners.',
    ],
  },
  {
    id: 'EVT-BAUMA-INDIA-2026',
    slug: 'bauma-conexpo-india-2026-delhi-ncr',
    name: 'bauma CONEXPO INDIA 2026: International Trade Fair for Construction Machinery',
    category: 'National Flagship Expo',
    status: 'upcoming',
    startDate: 'November 03, 2026',
    endDate: 'November 06, 2026',
    venue: 'India Expo Centre & Mart (IEML), Knowledge Park II',
    city: 'Greater Noida / Delhi NCR',
    country: 'India',
    boothCoordinates: 'Hall 3, Stand H3.B20 & Outdoor Demo Area O-08',
    pavilionType: 'Indoor Prime Engineering Stall',
    featuredMachines: [
      'PVI 100 High-Velocity Vertical Shaft Impactor (VSI)',
      'PVS 2060 4-Deck Modular Sizing Screen',
      'PPR 90 Track Asphalt Highway Paver',
    ],
    description:
      'Connecting Northern and Western India infrastructure contractors with high-efficiency crushing technologies. Spotlighting manufactured sand solutions (IS:383 Zone II) and heavy-duty highway paving fleets.',
    bannerImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80',
    ],
    delegatesExpected: '45,000+ Business Executives & Government Engineers',
    highlights: [
      'Live demonstration of VSI rock-on-rock shaping for sub-12% flakiness concrete aggregates.',
      'Introduction of automated SCADA control cabins with real-time IoT cloud telemetry.',
      'MoU signing desk for regional equipment dealerships across Northern mining belts.',
    ],
  },
  {
    id: 'EVT-IMME-2026',
    slug: 'imme-2026-kolkata-mining-expo',
    name: 'IMME 2026: 18th International Mining & Machinery Exhibition',
    category: 'Mining & Mineral Expo',
    status: 'upcoming',
    startDate: 'October 21, 2026',
    endDate: 'October 24, 2026',
    venue: 'Eco Park Exhibition Grounds, Rajarhat',
    city: 'Kolkata',
    country: 'India',
    boothCoordinates: 'Pavilion 2, Mining Machinery Block Stand M-44',
    pavilionType: 'Indoor Prime Engineering Stall',
    featuredMachines: [
      'PFB 2000 Heavy Duty Open-Cast Feeder Breaker',
      'PSM 2200 Continuous Surface Miner',
      'High-Tonnage Iron Ore Wet Beneficiation Screens',
    ],
    description:
      'Focused on high-tonnage coal, iron ore, and bauxite mining solutions for Eastern India and international mining conglomerates. Featuring blast-free surface mining technology.',
    bannerImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    ],
    delegatesExpected: '30,000+ Mining Engineers, Coal & Mineral Operators',
    highlights: [
      'Direct technical consultations with Puzzolana Mineral Processing Specialists.',
      'Feeder breaker pick roll geometry demonstrations for non-explosive coal extraction.',
      'Iron ore fines washing and hydrocyclone desliming whitepaper release.',
    ],
  },
  {
    id: 'EVT-MINING-INDONESIA-2026',
    slug: 'mining-indonesia-2026-jakarta',
    name: 'MINING INDONESIA 2026: 22nd International Mining & Mineral Recovery Exhibition',
    category: 'International Trade Fair',
    status: 'upcoming',
    startDate: 'September 16, 2026',
    endDate: 'September 19, 2026',
    venue: 'Jakarta International Expo (JIExpo), Kemayoran',
    city: 'Jakarta',
    country: 'Indonesia',
    boothCoordinates: 'Hall A2, Stand 2410 (International Pavilion)',
    pavilionType: 'International Country Pavilion',
    featuredMachines: [
      'PTC 2000 Track-Mounted Mobile Cone Crusher',
      'PCC-Series Nickel & Andesite Heavy Secondary Cones',
      'Tropical Monsoon Wet Washing Plants',
    ],
    description:
      'Serving Southeast Asia’s booming nickel, copper, and volcanic andesite quarry sectors with high-durability crushing machinery engineered for high-humidity tropical conditions.',
    bannerImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    ],
    delegatesExpected: '28,000+ ASEAN Mining Contractors & Equipment Importers',
    highlights: [
      'Southeast Asia regional spares distribution agreement launch with Jakarta depot.',
      'High-ambient cooling systems for 50°C tropical mine operations.',
      'English & Bahasa Indonesian technical engineering consultation desk.',
    ],
  },
  {
    id: 'EVT-INDABA-2026',
    slug: 'mining-indaba-2026-cape-town',
    name: 'MINING INDABA 2026: Investing in African Mining Indaba',
    category: 'International Trade Fair',
    status: 'upcoming',
    startDate: 'February 02, 2026',
    endDate: 'February 05, 2026',
    venue: 'Cape Town International Convention Centre (CTICC)',
    city: 'Cape Town',
    country: 'South Africa',
    boothCoordinates: 'Stand 714, Mineral Processing Hall',
    pavilionType: 'International Country Pavilion',
    featuredMachines: [
      'PJC Heavy Underground & Open-Cast Jaw Crushers',
      'Extreme-Abrasion Manganese Liners for Gold & Copper Ores',
    ],
    description:
      'Strengthening Puzzolana’s footprint across the African Copperbelt, Ghana, Kenya, and Zambia. Delivering rugged, low-maintenance crushing plants for remote off-grid mining sites.',
    bannerImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    ],
    delegatesExpected: '10,000+ Global Mining Executives & Institutional Investors',
    highlights: [
      'Pan-African dealer network expansion and Nairobi regional hub presentation.',
      'Off-grid dual-power generator crushing configurations for remote bush installations.',
    ],
  },
  {
    id: 'EVT-EXCON-2024-ARCHIVE',
    slug: 'excon-2024-bengaluru-highlights',
    name: 'EXCON 2024: Puzzolana Mega Demonstration Highlights (Archive)',
    category: 'Past Exhibition',
    status: 'past',
    startDate: 'December 12, 2024',
    endDate: 'December 16, 2024',
    venue: 'Bangalore International Exhibition Centre (BIEC)',
    city: 'Bengaluru',
    country: 'India',
    boothCoordinates: 'Outdoor Pavilion OD-10',
    pavilionType: 'Mega Outdoor Demonstration Arena',
    featuredMachines: [
      '1200 TPH Primary Jaw Crusher',
      'Dual-Power Track Mobile Screening Plant',
      'Fully Automated IoT Plant Control Cabin',
    ],
    description:
      'A historic exhibition for Puzzolana, hosting over 25,000 visitors and signing 18 turnkey plant contracts with major highway and mining concessionaires.',
    bannerImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    ],
    delegatesExpected: '55,000+ Attendees Recorded',
    highlights: [
      'Over ₹120 Crore in contractual equipment orders signed during the 5-day exhibition.',
      'Conferred the CII Excon Innovation Award for Eco-Washing Hydrocyclone Technology.',
    ],
  },
];
