/**
 * Puzzolana Platform Verified Constants & Taxonomies
 */

export const EQUIPMENT_CATEGORIES = [
  { id: 'crushers', name: 'Crushers', description: 'Jaw, Cone, and Impact Crushers for Primary to Tertiary Stages' },
  { id: 'feeders-and-screens', name: 'Feeders & Screens', description: 'Grizzly Feeders and Multi-Deck High Performance Vibrating Screens' },
  { id: 'classifiers', name: 'Classifiers & Washing', description: 'Bucket Wheel Classifiers and Hydro-cyclone Sand Washing Plants' },
  { id: 'mobile-crushers', name: 'Mobile Crushers', description: 'Track-Mounted Diesel/Electric Crushing and Screening Units' },
  { id: 'semi-mobile', name: 'Semi-Mobile / Skid', description: 'Modular Wheel and Skid Mounted Crushing Configurations' },
  { id: 'mining', name: 'Mining Solutions', description: 'Heavy Duty Feeder Breakers, Surface Miners, and Mineral Processing Plants' },
  { id: 'waste-processing', name: 'Waste Processing', description: 'Construction & Demolition (C&D) Recycling and Slag Processing Plants' },
  { id: 'road-building', name: 'Road Building', description: 'Hydrostatic Sensor Pavers, Asphalt Batch Mixers, and Soil Stabilizers' },
] as const;

export const TARGET_INDUSTRIES = [
  'Aggregates & Quarrying',
  'Mining & Mineral Processing',
  'Highway & Road Construction',
  'Railway Ballast Production',
  'Cement & Concrete Batching',
  'C&D Waste Recycling',
  'Steel Slag Recovery',
] as const;

export const RAW_MATERIALS = [
  'Basalt / Trap Rock',
  'Granite',
  'Limestone',
  'Iron Ore',
  'River Gravel / Cobbles',
  'Coal / Lignite',
  'Bauxite',
  'C&D Concrete Waste',
] as const;
