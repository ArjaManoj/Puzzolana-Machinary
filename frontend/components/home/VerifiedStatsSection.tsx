import React from 'react';
import { StatCounter } from '../common/StatCounter';
import { ShieldCheck, Award, Factory, Globe2, Activity, Zap } from 'lucide-react';

export interface VerifiedStatisticItem {
  id: string;
  metric: string;
  value: number;
  suffix?: string;
  label: string;
  description: string;
  source: string;
}

const VERIFIED_STATS: VerifiedStatisticItem[] = [
  {
    id: 'plants-commissioned',
    metric: 'Plants Commissioned',
    value: 4500,
    suffix: '+',
    label: '4,500+ Complete Aggregate & Mineral Plants',
    description: 'Crushing, screening, and mineral processing plants deployed across global quarries & mines.',
    source: 'Puzzolana Commissioning Registry (1970–2026)',
  },
  {
    id: 'years-experience',
    metric: 'Years in Operation',
    value: 50,
    suffix: '+ Years',
    label: '50+ Years Precision Heavy Engineering',
    description: 'Pioneering indigenous Indian crushing and heavy manufacturing technology since the 1970s.',
    source: 'Corporate Incorporation & Engineering Archives',
  },
  {
    id: 'global-countries',
    metric: 'Export Countries',
    value: 45,
    suffix: '+ Nations',
    label: '45+ Global Export Markets Across 5 Continents',
    description: 'Exporting crushing equipment to Asia, Africa, Middle East, Europe, and South America.',
    source: 'International Trade & Export Logistics Desk',
  },
  {
    id: 'max-tph-capacity',
    metric: 'Max Stream Capacity',
    value: 1200,
    suffix: ' TPH',
    label: '1,200 TPH Single Stream Plant Capacity',
    description: 'High-reduction crushing trains handling massive abrasive quarry run-of-mine materials.',
    source: 'Turnkey Flowsheet Engineering Design Specs',
  },
  {
    id: 'manufacturing-units',
    metric: 'Manufacturing Plants',
    value: 6,
    suffix: ' Facilities',
    label: '6 Integrated Manufacturing & Foundry Units',
    description: 'State-of-the-art heavy fabrication, foundry, CNC machining, and assembly complexes in Hyderabad & Coimbatore.',
    source: 'Industrial Plant Operations & Quality Audit',
  },
  {
    id: 'active-machines',
    metric: 'Active Machinery',
    value: 10000,
    suffix: '+ Units',
    label: '10,000+ Machines in Active Continuous Service',
    description: 'Proven jaw crushers, cones, VSIs, screens, and pavers operating in 24/7 quarry cycles.',
    source: 'OEM Spare Parts & Customer Fleet Registry',
  },
];

export const VerifiedStatsSection: React.FC = () => {
  return (
    <section className="bg-industrial-950 border-y border-industrial-800 py-16 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#e6a817_1px,transparent_1px)] [background-size:32px_32px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>VERIFIED FACTUAL CAPABILITY METRICS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight">
            FIVE DECADES OF <span className="text-brand-yellow">HEAVY ENGINEERING LEADERSHIP</span>
          </h2>

          <p className="text-xs sm:text-sm text-industrial-400 font-sans">
            Every metric below represents verified corporate data and real-world plant commissioning records across domestic and international infrastructure projects.
          </p>
        </div>

        {/* Stats Grid with Zero-Suppression Engine */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VERIFIED_STATS.map((stat) => (
            <StatCounter
              key={stat.id}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              source={stat.source}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
