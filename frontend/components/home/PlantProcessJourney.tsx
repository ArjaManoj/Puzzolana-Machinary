'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Layers, Zap, CheckCircle2, Shield, Settings } from 'lucide-react';

interface StageData {
  step: string;
  stageName: string;
  subtitle: string;
  inputFeed: string;
  outputProduct: string;
  primaryMachinery: string;
  machineSlug: string;
  machineCategory: string;
  description: string;
  keyBenefits: string[];
}

const PLANT_STAGES: StageData[] = [
  {
    step: '01',
    stageName: 'PRIMARY CRUSHING',
    subtitle: 'Run-of-Mine Boulder Sizing',
    inputFeed: 'Up to 900 mm Run-of-Quarry Rock',
    outputProduct: '150 - 250 mm Primary Aggregate',
    primaryMachinery: 'Single-Toggle Jaw Crusher PJC 14076',
    machineSlug: 'pjc-14076',
    machineCategory: 'crushers',
    description: 'Receives blasted granite, basalt, or iron ore from heavy dumpers. Deep symmetrical crushing chamber with forged alloy eccentric shaft reduces massive boulders at high throughput.',
    keyBenefits: [
      'Handles feed boulders up to 900 mm without bridging',
      'High reduction ratio up to 6:1',
      'Hydraulic wedge CSS adjustment',
    ],
  },
  {
    step: '02',
    stageName: 'SECONDARY CRUSHING',
    subtitle: 'High-Reduction Intermediate Sizing',
    inputFeed: '150 - 250 mm Primary Jaw Discharge',
    outputProduct: '20 - 40 mm Ballast & Sized Feed',
    primaryMachinery: 'Hydraulic Cone Crusher PCC 2000',
    machineSlug: 'pcc-2000',
    machineCategory: 'crushers',
    description: 'High-speed eccentric throw with automated hydraulic tramp relief. Delivers intense inter-particle crushing to break elongated particles into cubical fractions.',
    keyBenefits: [
      'Automated hydraulic tramp iron protection',
      'Real-time CSS adjustment under full load',
      'Flakiness index strictly maintained below 15%',
    ],
  },
  {
    step: '03',
    stageName: 'TERTIARY SHAPING & M-SAND',
    subtitle: 'Cubical Shaping & Sand Generation',
    inputFeed: '10 - 40 mm Secondary Cone Discharge',
    outputProduct: '0 - 4.75 mm M-Sand & 10/20 mm Cubical Aggregates',
    primaryMachinery: 'Vertical Shaft Impactor PVI 100',
    machineSlug: 'pvi-100',
    machineCategory: 'crushers',
    description: 'High-velocity rock-on-rock crushing chamber accelerates aggregate against a rock-shelf anvil, ensuring superior cubical particle shape and premium manufactured concrete sand.',
    keyBenefits: [
      'Premium IS 383 Zone II compliant manufactured sand',
      'Rock-on-rock crushing minimizes manganese wear costs',
      'Dual-motor balanced drive for continuous uptime',
    ],
  },
  {
    step: '04',
    stageName: 'CLASSIFICATION & SAND WASHING',
    subtitle: 'Ultra-Fine Recovery & Silt Removal',
    inputFeed: '0 - 5 mm Raw Quarry Sand & Fines Slurry',
    outputProduct: 'Ultra-Clean Plaster Sand (<3% Silt)',
    primaryMachinery: 'Hydrocyclone Sand Washing Plant PSW 150',
    machineSlug: 'psw-150',
    machineCategory: 'classifiers',
    description: 'Molded polyurethane hydrocyclones paired with high-G linear dewatering screen strip out silt, clay, and minus-75 micron ultrafines to produce certified concrete sand.',
    keyBenefits: [
      'Reduces silt and clay content to below 3%',
      'Eliminates fine sand loss into settling ponds',
      'Dewatered sand moisture discharge under 12%',
    ],
  },
];

export const PlantProcessJourney: React.FC = () => {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const currentStage = PLANT_STAGES[activeStageIdx];

  return (
    <div className="space-y-8">
      {/* Stage Step Selector Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {PLANT_STAGES.map((stg, idx) => {
          const isActive = idx === activeStageIdx;
          return (
            <button
              key={stg.step}
              onClick={() => setActiveStageIdx(idx)}
              className={`p-4 rounded-sm text-left transition-all border flex flex-col justify-between ${
                isActive
                  ? 'bg-industrial-900 border-brand-yellow shadow-lg shadow-brand-yellow/10 ring-1 ring-brand-yellow'
                  : 'bg-industrial-950/80 border-industrial-800 hover:border-industrial-700 hover:bg-industrial-900/50'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span
                  className={`text-xs font-mono font-black px-2 py-0.5 rounded ${
                    isActive
                      ? 'bg-brand-yellow text-industrial-950'
                      : 'bg-industrial-800 text-industrial-400'
                  }`}
                >
                  STAGE {stg.step}
                </span>
                {isActive && <div className="w-2 h-2 rounded-full bg-brand-yellow animate-ping" />}
              </div>

              <h4 className="text-xs sm:text-sm font-black text-white uppercase font-mono tracking-tight leading-snug">
                {stg.stageName}
              </h4>
              <p className="text-[11px] text-industrial-400 font-sans mt-1 line-clamp-1">
                {stg.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Stage Deep Dive Card */}
      <div className="industrial-card p-6 sm:p-8 rounded-sm border border-brand-yellow/40 bg-industrial-900/90 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Layers className="w-64 h-64 text-brand-yellow" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Stage Explanation & Specs (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-brand-yellow bg-brand-yellow/10 border border-brand-yellow/30 px-2.5 py-0.5 rounded">
                PROCESS STAGE {currentStage.step} OF 04
              </span>
              <span className="text-xs font-mono text-industrial-400">
                {currentStage.subtitle}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {currentStage.stageName}
            </h3>

            <p className="text-sm text-industrial-300 leading-relaxed font-sans">
              {currentStage.description}
            </p>

            {/* Input / Output Metric Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
              <div className="bg-industrial-950 p-3 rounded border border-industrial-800">
                <span className="text-industrial-500 block text-[10px] uppercase">
                  Feed Input Sizing
                </span>
                <strong className="text-white text-xs sm:text-sm font-bold">
                  {currentStage.inputFeed}
                </strong>
              </div>
              <div className="bg-industrial-950 p-3 rounded border border-industrial-800">
                <span className="text-industrial-500 block text-[10px] uppercase">
                  Target Stage Output
                </span>
                <strong className="text-brand-yellow text-xs sm:text-sm font-bold">
                  {currentStage.outputProduct}
                </strong>
              </div>
            </div>

            {/* Key Engineering Benefits */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono uppercase text-industrial-400 tracking-wider block">
                STAGE CRITICAL PERFORMANCE FACTORS:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-industrial-200">
                {currentStage.keyBenefits.map((ben, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                    <span>{ben}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Featured Machine Highlight (5 cols) */}
          <div className="lg:col-span-5 bg-industrial-950 p-6 rounded-sm border border-industrial-800 space-y-4 font-mono">
            <span className="text-[10px] text-brand-yellow uppercase tracking-widest block font-bold">
              RECOMMENDED PUZZOLANA EQUIPMENT
            </span>

            <h4 className="text-lg font-black text-white">{currentStage.primaryMachinery}</h4>

            <div className="p-4 bg-industrial-900 rounded border border-industrial-800 text-xs space-y-2 text-industrial-300">
              <div className="flex justify-between">
                <span className="text-industrial-500">Equipment Line:</span>
                <span className="text-white font-bold">{currentStage.stageName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-industrial-500">Operation Mode:</span>
                <span className="text-emerald-400 font-bold">24/7 Continuous Duty</span>
              </div>
              <div className="flex justify-between">
                <span className="text-industrial-500">Plant Integration:</span>
                <span className="text-brand-yellow font-bold">Modular Interlock</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <Link
                href={`/products/${currentStage.machineCategory}/${currentStage.machineSlug}`}
                className="w-full py-2.5 px-4 bg-brand-yellow hover:bg-brand-yellow-400 text-industrial-950 font-black text-xs uppercase tracking-wider rounded text-center transition-colors flex items-center justify-center gap-2 shadow"
              >
                <span>Inspect Machine Specifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={`/products/${currentStage.machineCategory}`}
                className="w-full py-2 px-4 bg-industrial-900 hover:bg-industrial-800 text-white font-bold text-xs uppercase rounded text-center border border-industrial-700 transition-colors"
              >
                Browse All {currentStage.stageName} Models
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
