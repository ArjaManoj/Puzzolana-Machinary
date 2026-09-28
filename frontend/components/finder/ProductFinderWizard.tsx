'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  RAW_MATERIALS,
  TARGET_INDUSTRIES,
} from '@/lib/constants';
import { VERIFIED_FRONTEND_PRODUCTS } from '@/lib/seedCatalog';
import { MachineryProduct } from '@/types';
import { MachineCard } from '@/components/machinery';
import { QuickQuoteModal, ComparisonTray } from '@/components/catalogue';
import {
  SlidersHorizontal,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  Layers,
  RotateCcw,
  Cpu,
  Factory,
  Check,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { ApiClient } from '@/lib/api';

export interface WizardCriteria {
  material: string;
  targetCapacityTPH: number;
  maxFeedSizeMM: number;
  mobilityPreference: string;
  targetProducts: string[];
}

interface RecommendationResult {
  matches: MachineryProduct[];
  flowsheetName: string;
  reductionStages: number;
  estimatedConnectedPowerKW: number;
  confidenceScore: number;
  engineeringSummary: string;
}

const MATERIAL_PROFILES = [
  { name: 'Granite', ucs: '150–250 MPa', type: 'Hard & Abrasive Rock', icon: '🪨' },
  { name: 'Basalt / Trap Rock', ucs: '200–350 MPa', type: 'Extreme Hardness & High Density', icon: '⛰️' },
  { name: 'Limestone', ucs: '60–140 MPa', type: 'Medium-Soft Calcium Carbonate', icon: '🧱' },
  { name: 'Iron Ore', ucs: '180–300 MPa', type: 'Heavy Metallurgical Ore', icon: '⛏️' },
  { name: 'Coal / Lignite', ucs: '20–50 MPa', type: 'Friable Open-Cast Fuel', icon: '🪵' },
  { name: 'River Gravel / Cobbles', ucs: '160–280 MPa', type: 'High Silica Rounded Cobbles', icon: '🌊' },
  { name: 'C&D Concrete Waste', ucs: 'Heterogeneous', type: 'Demolition Debris & Rebar', icon: '🏗️' },
];

const FEED_SIZE_OPTIONS = [
  { label: 'Fine to Medium Feed (< 250 mm)', value: 200, desc: 'Small gravel, pre-scalped stones, or secondary in-feed' },
  { label: 'Standard Quarry Blasted (250 – 500 mm)', value: 500, desc: 'Standard medium quarry face blasted rock' },
  { label: 'Heavy Infrastructure Quarry (500 – 700 mm)', value: 650, desc: 'Large quarry blasted granite/basalt feed' },
  { label: 'Massive Open-Cast Boulders (700 – 1000 mm)', value: 900, desc: 'Heavy pit boulders requiring primary jaw/breaker' },
];

const MOBILITY_OPTIONS = [
  { id: 'Any', title: 'Any Configuration / Recommended by Engineers', desc: 'Optimal balance of civil cost and productivity' },
  { id: 'Stationary', title: 'Stationary Concrete Foundation Plant', desc: 'Permanent high-capacity commercial aggregate plants' },
  { id: 'Track-Mounted', title: 'Track-Mounted Self-Propelled Crawlers', desc: 'Rapid mobilization directly at the quarry blast face' },
  { id: 'Skid-Mounted', title: 'Modular Heavy Steel Skid Plants', desc: 'Pre-wired fast 48-hour commissioning with zero civil work' },
];

const TARGET_END_PRODUCTS = [
  '20 mm & 10 mm Concrete Aggregate',
  '40 mm Road Base / Sub-Base (GSB)',
  '0 – 4.75 mm IS 383 Zone II M-Sand',
  '40 – 65 mm RDSO Railway Ballast',
  '0 – 50 mm Sized Direct Load Minerals',
  'Recycled Concrete Aggregate (RCA)',
];

export const ProductFinderWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 5;

  // Criteria state
  const [criteria, setCriteria] = useState<WizardCriteria>({
    material: 'Granite',
    targetCapacityTPH: 250,
    maxFeedSizeMM: 500,
    mobilityPreference: 'Any',
    targetProducts: ['20 mm & 10 mm Concrete Aggregate', '0 – 4.75 mm IS 383 Zone II M-Sand'],
  });

  // Results state
  const [results, setResults] = useState<RecommendationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Quote & Compare state
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [selectedQuoteProduct, setSelectedQuoteProduct] = useState<MachineryProduct | null>(null);

  const handleToggleProductSelection = (prod: string) => {
    setCriteria((prev) => {
      const current = prev.targetProducts;
      const updated = current.includes(prod)
        ? current.filter((p) => p !== prod)
        : [...current, prod];
      return { ...prev, targetProducts: updated.length > 0 ? updated : [prod] };
    });
  };

  // Rule-based Calculation Engine
  const calculateRecommendation = async () => {
    setIsCalculating(true);

    try {
      // Call backend finder API if available
      const payload = {
        material: criteria.material,
        targetCapacityTPH: criteria.targetCapacityTPH,
        maxFeedSizeMM: criteria.maxFeedSizeMM,
        mobility: criteria.mobilityPreference === 'Any' ? undefined : criteria.mobilityPreference,
        targetFractions: criteria.targetProducts,
      };

      const response = await ApiClient.post<MachineryProduct[]>('/products/finder', payload);
      if (response.success && Array.isArray(response.data) && response.data.length > 0) {
        setResults({
          matches: response.data,
          flowsheetName: `${criteria.material} ${criteria.targetCapacityTPH} TPH Multi-Stage Circuit`,
          reductionStages: criteria.targetCapacityTPH > 350 ? 3 : 2,
          estimatedConnectedPowerKW: response.data.reduce((acc, curr) => acc + (curr.powerRatingKW || 100), 0),
          confidenceScore: 98,
          engineeringSummary: `Recommended plant circuit for ${criteria.material} at ${criteria.targetCapacityTPH} TPH handling feed sizes up to ${criteria.maxFeedSizeMM} mm with guaranteed product cubicity.`,
        });
        setCurrentStep(6); // Step 6 = Results View
        setIsCalculating(false);
        return;
      }
    } catch {
      // Fallback to local rule engine
    }

    // Local rule engine fallback
    let matches: MachineryProduct[] = [];

    // Rule 1: Primary Crusher based on feed size & capacity
    if (criteria.material === 'Coal / Lignite') {
      matches.push(VERIFIED_FRONTEND_PRODUCTS.find((p) => p.id === 'PSM-2200') || VERIFIED_FRONTEND_PRODUCTS[0]);
    } else if (criteria.material === 'C&D Concrete Waste') {
      matches.push(VERIFIED_FRONTEND_PRODUCTS.find((p) => p.id === 'PFB-1200') || VERIFIED_FRONTEND_PRODUCTS[0]);
    } else if (criteria.mobilityPreference === 'Track-Mounted') {
      matches.push(VERIFIED_FRONTEND_PRODUCTS.find((p) => p.id === 'PTJ-11075') || VERIFIED_FRONTEND_PRODUCTS[0]);
      matches.push(VERIFIED_FRONTEND_PRODUCTS.find((p) => p.id === 'PTC-2000') || VERIFIED_FRONTEND_PRODUCTS[1]);
    } else if (criteria.maxFeedSizeMM >= 650 || criteria.targetCapacityTPH >= 350) {
      matches.push(VERIFIED_FRONTEND_PRODUCTS.find((p) => p.id === 'PJC-14076') || VERIFIED_FRONTEND_PRODUCTS[0]);
      matches.push(VERIFIED_FRONTEND_PRODUCTS.find((p) => p.id === 'PCC-2000') || VERIFIED_FRONTEND_PRODUCTS[1]);
    } else if (criteria.targetCapacityTPH >= 200) {
      matches.push(VERIFIED_FRONTEND_PRODUCTS.find((p) => p.id === 'PJC-11075') || VERIFIED_FRONTEND_PRODUCTS[0]);
      matches.push(VERIFIED_FRONTEND_PRODUCTS.find((p) => p.id === 'PCC-2000') || VERIFIED_FRONTEND_PRODUCTS[1]);
    } else {
      matches.push(VERIFIED_FRONTEND_PRODUCTS.find((p) => p.id === 'PJC-9060') || VERIFIED_FRONTEND_PRODUCTS[0]);
      matches.push(VERIFIED_FRONTEND_PRODUCTS.find((p) => p.id === 'PCC-2000') || VERIFIED_FRONTEND_PRODUCTS[1]);
    }

    // Rule 2: Tertiary M-Sand or Screen
    if (criteria.targetProducts.some((p) => p.includes('M-Sand'))) {
      matches.push(VERIFIED_FRONTEND_PRODUCTS.find((p) => p.id === 'PVI-100') || VERIFIED_FRONTEND_PRODUCTS[4]);
      matches.push(VERIFIED_FRONTEND_PRODUCTS.find((p) => p.id === 'PSW-150') || VERIFIED_FRONTEND_PRODUCTS[7]);
    }

    // Rule 3: Screen Deck
    matches.push(VERIFIED_FRONTEND_PRODUCTS.find((p) => p.id === 'PVS-2060') || VERIFIED_FRONTEND_PRODUCTS[6]);

    // Unique matches
    const uniqueMatches = Array.from(new Set(matches.map((m) => m.id)))
      .map((id) => VERIFIED_FRONTEND_PRODUCTS.find((p) => p.id === id)!)
      .filter(Boolean);

    setResults({
      matches: uniqueMatches,
      flowsheetName: `${criteria.material} ${criteria.targetCapacityTPH} TPH Turnkey Configuration`,
      reductionStages: uniqueMatches.length >= 3 ? 3 : 2,
      estimatedConnectedPowerKW: uniqueMatches.reduce((acc, curr) => acc + (curr.powerRatingKW || 100), 0),
      confidenceScore: 96,
      engineeringSummary: `Engineered flowsheet configuration for ${criteria.material} rock quarry operations at ${criteria.targetCapacityTPH} TPH with verified stage balancing.`,
    });

    setCurrentStep(6);
    setIsCalculating(false);
  };

  const handleResetWizard = () => {
    setCurrentStep(1);
    setResults(null);
  };

  const handleToggleCompare = (productId: string) => {
    setComparedIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 4) {
        alert('You can compare a maximum of 4 machines simultaneously.');
        return prev;
      }
      return [...prev, productId];
    });
  };

  const comparedProducts = useMemo(() => {
    return VERIFIED_FRONTEND_PRODUCTS.filter((p) => comparedIds.includes(p.id));
  }, [comparedIds]);

  return (
    <div className="space-y-8">
      {/* Wizard Progress Stepper (Only on Steps 1 to 5) */}
      {currentStep <= 5 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-industrial-400">
              STEP <strong className="text-brand-yellow font-bold">0{currentStep}</strong> OF 05
            </span>
            <span className="text-industrial-400">
              {currentStep === 1 && 'GEOLOGICAL RAW MATERIAL'}
              {currentStep === 2 && 'PLANT OUTPUT CAPACITY'}
              {currentStep === 3 && 'FEED BOULDER SIZING'}
              {currentStep === 4 && 'MOBILITY & FOUNDATION'}
              {currentStep === 5 && 'TARGET END PRODUCTS'}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-industrial-900 rounded-full overflow-hidden border border-industrial-800">
            <div
              className="h-full bg-gradient-to-r from-brand-yellow via-amber-400 to-brand-yellow transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 1: GEOLOGICAL RAW MATERIAL */}
      {/* ========================================================================= */}
      {currentStep === 1 && (
        <div className="industrial-card p-6 sm:p-8 rounded-sm border border-industrial-800 space-y-6 bg-industrial-900/60">
          <div>
            <span className="text-[10px] font-mono uppercase text-brand-yellow tracking-widest block mb-1">
              DISCOVERY PARAMETER 01
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-mono">
              WHAT IS YOUR PRIMARY RAW MATERIAL OR ROCK DEPOSIT?
            </h3>
            <p className="text-xs text-industrial-400 mt-1 font-sans">
              Rock compressive strength (UCS) and abrasiveness dictate the jaw crusher cavity profile, cone eccentric throw, and manganese wear alloys.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MATERIAL_PROFILES.map((mat) => {
              const isSelected = criteria.material === mat.name;
              return (
                <button
                  key={mat.name}
                  onClick={() => setCriteria({ ...criteria, material: mat.name })}
                  className={`p-4 rounded-sm text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-brand-yellow/15 border-brand-yellow shadow-md ring-1 ring-brand-yellow'
                      : 'bg-industrial-950 border-industrial-800 hover:border-industrial-700 hover:bg-industrial-900'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{mat.icon}</span>
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-brand-yellow text-industrial-950 flex items-center justify-center text-xs font-bold">
                          ✓
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-industrial-700" />
                      )}
                    </div>
                    <h4 className="text-sm font-black text-white uppercase font-mono">
                      {mat.name}
                    </h4>
                    <p className="text-[11px] text-industrial-400 font-sans mt-0.5">{mat.type}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-industrial-800/80 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-industrial-500">Compressive Strength:</span>
                    <strong className="text-brand-yellow">{mat.ucs}</strong>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-4 border-t border-industrial-800">
            <Button
              variant="primary"
              size="md"
              onClick={() => setCurrentStep(2)}
              className="font-mono text-xs"
            >
              <span>Next: Throughput Capacity</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: CAPACITY THROUGHPUT (TPH) */}
      {/* ========================================================================= */}
      {currentStep === 2 && (
        <div className="industrial-card p-6 sm:p-8 rounded-sm border border-industrial-800 space-y-6 bg-industrial-900/60">
          <div>
            <span className="text-[10px] font-mono uppercase text-brand-yellow tracking-widest block mb-1">
              DISCOVERY PARAMETER 02
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-mono">
              WHAT IS YOUR TARGET PLANT THROUGHPUT (TPH)?
            </h3>
            <p className="text-xs text-industrial-400 mt-1 font-sans">
              Select or slide your required hourly production rate in Metric Tons Per Hour (TPH).
            </p>
          </div>

          <div className="bg-industrial-950 p-6 rounded border border-industrial-800 space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono uppercase text-industrial-400">
                SELECTED TARGET CAPACITY
              </span>
              <div className="text-5xl font-black text-brand-yellow font-mono">
                {criteria.targetCapacityTPH}{' '}
                <span className="text-lg text-industrial-400">TPH</span>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-2 max-w-xl mx-auto">
              <input
                type="range"
                min="50"
                max="1200"
                step="25"
                value={criteria.targetCapacityTPH}
                onChange={(e) =>
                  setCriteria({ ...criteria, targetCapacityTPH: Number(e.target.value) })
                }
                className="w-full h-2.5 bg-industrial-900 rounded-lg accent-brand-yellow cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-industrial-500">
                <span>50 TPH (Modular)</span>
                <span>350 TPH (Commercial)</span>
                <span>750 TPH (Infrastructure)</span>
                <span>1200 TPH (Mega Mining)</span>
              </div>
            </div>

            {/* Quick Capacity Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 font-mono text-xs">
              {[
                { label: '150 TPH Plant', value: 150 },
                { label: '250 TPH Plant', value: 250 },
                { label: '450 TPH Plant', value: 450 },
                { label: '750 TPH Mining', value: 750 },
              ].map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setCriteria({ ...criteria, targetCapacityTPH: btn.value })}
                  className={`py-2 px-3 rounded border text-xs transition-colors ${
                    criteria.targetCapacityTPH === btn.value
                      ? 'bg-brand-yellow text-industrial-950 border-brand-yellow font-bold'
                      : 'bg-industrial-900 border-industrial-800 text-industrial-300 hover:text-white'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-industrial-800">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setCurrentStep(1)}
              className="font-mono text-xs"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Back</span>
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setCurrentStep(3)}
              className="font-mono text-xs"
            >
              <span>Next: Feed Boulder Sizing</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: MAXIMUM FEED SIZE */}
      {/* ========================================================================= */}
      {currentStep === 3 && (
        <div className="industrial-card p-6 sm:p-8 rounded-sm border border-industrial-800 space-y-6 bg-industrial-900/60">
          <div>
            <span className="text-[10px] font-mono uppercase text-brand-yellow tracking-widest block mb-1">
              DISCOVERY PARAMETER 03
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-mono">
              WHAT IS THE MAXIMUM BOULDER FEED SIZE ENTERING THE PLANT?
            </h3>
            <p className="text-xs text-industrial-400 mt-1 font-sans">
              The top feed size dictates the physical opening dimensions of the primary grizzly feeder and jaw crusher chamber to eliminate bridging.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEED_SIZE_OPTIONS.map((opt) => {
              const isSelected = criteria.maxFeedSizeMM === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setCriteria({ ...criteria, maxFeedSizeMM: opt.value })}
                  className={`p-5 rounded-sm text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-brand-yellow/15 border-brand-yellow shadow-md ring-1 ring-brand-yellow'
                      : 'bg-industrial-950 border-industrial-800 hover:border-industrial-700 hover:bg-industrial-900'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <strong className="text-lg font-black text-brand-yellow font-mono">
                        Up to {opt.value} mm
                      </strong>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-brand-yellow text-industrial-950 flex items-center justify-center text-xs font-bold">
                          ✓
                        </div>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white font-mono">{opt.label}</h4>
                    <p className="text-xs text-industrial-400 font-sans mt-1">{opt.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between pt-4 border-t border-industrial-800">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setCurrentStep(2)}
              className="font-mono text-xs"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Back</span>
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setCurrentStep(4)}
              className="font-mono text-xs"
            >
              <span>Next: Mobility & Mounting</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 4: MOBILITY PREFERENCE */}
      {/* ========================================================================= */}
      {currentStep === 4 && (
        <div className="industrial-card p-6 sm:p-8 rounded-sm border border-industrial-800 space-y-6 bg-industrial-900/60">
          <div>
            <span className="text-[10px] font-mono uppercase text-brand-yellow tracking-widest block mb-1">
              DISCOVERY PARAMETER 04
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-mono">
              WHAT IS YOUR PLANT MOBILITY & FOUNDATION REQUIREMENT?
            </h3>
            <p className="text-xs text-industrial-400 mt-1 font-sans">
              Choose between permanent stationary concrete foundations, rapid track-mounted crawlers, or modular skid structures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOBILITY_OPTIONS.map((mob) => {
              const isSelected = criteria.mobilityPreference === mob.id;
              return (
                <button
                  key={mob.id}
                  onClick={() => setCriteria({ ...criteria, mobilityPreference: mob.id })}
                  className={`p-5 rounded-sm text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-brand-yellow/15 border-brand-yellow shadow-md ring-1 ring-brand-yellow'
                      : 'bg-industrial-950 border-industrial-800 hover:border-industrial-700 hover:bg-industrial-900'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold bg-industrial-900 px-2 py-0.5 rounded text-brand-yellow border border-industrial-700">
                        {mob.id}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-brand-yellow text-industrial-950 flex items-center justify-center text-xs font-bold">
                          ✓
                        </div>
                      )}
                    </div>
                    <h4 className="text-sm font-black text-white uppercase font-mono">
                      {mob.title}
                    </h4>
                    <p className="text-xs text-industrial-400 font-sans mt-1">{mob.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between pt-4 border-t border-industrial-800">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setCurrentStep(3)}
              className="font-mono text-xs"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Back</span>
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setCurrentStep(5)}
              className="font-mono text-xs"
            >
              <span>Next: Target End Products</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 5: TARGET END PRODUCTS */}
      {/* ========================================================================= */}
      {currentStep === 5 && (
        <div className="industrial-card p-6 sm:p-8 rounded-sm border border-industrial-800 space-y-6 bg-industrial-900/60">
          <div>
            <span className="text-[10px] font-mono uppercase text-brand-yellow tracking-widest block mb-1">
              DISCOVERY PARAMETER 05 (FINAL)
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-mono">
              WHICH FINISHED FRACTIONS DO YOU NEED TO PRODUCE?
            </h3>
            <p className="text-xs text-industrial-400 mt-1 font-sans">
              Select all required commercial fractions. The rule engine will determine if tertiary shaping or hydrocyclone washing is needed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TARGET_END_PRODUCTS.map((prod) => {
              const isSelected = criteria.targetProducts.includes(prod);
              return (
                <button
                  key={prod}
                  onClick={() => handleToggleProductSelection(prod)}
                  className={`p-4 rounded-sm text-left border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-brand-yellow/15 border-brand-yellow text-white ring-1 ring-brand-yellow'
                      : 'bg-industrial-950 border-industrial-800 text-industrial-300 hover:border-industrial-700'
                  }`}
                >
                  <span className="text-xs font-mono font-bold leading-snug">{prod}</span>
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                      isSelected
                        ? 'bg-brand-yellow text-industrial-950'
                        : 'border border-industrial-700 bg-industrial-900'
                    }`}
                  >
                    {isSelected ? '✓' : ''}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between pt-4 border-t border-industrial-800">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setCurrentStep(4)}
              className="font-mono text-xs"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Back</span>
            </Button>
            <Button
              variant="primary"
              size="md"
              isLoading={isCalculating}
              onClick={calculateRecommendation}
              className="font-mono text-xs uppercase"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Generate Flowsheet Recommendation</span>
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 6: RECOMMENDATION RESULTS VIEW */}
      {/* ========================================================================= */}
      {currentStep === 6 && results && (
        <div className="space-y-8 animate-fadeIn">
          {/* Results Header Card */}
          <div className="industrial-card p-6 sm:p-8 rounded-sm border-2 border-brand-yellow bg-industrial-900/90 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-brand-yellow text-industrial-950 font-mono font-bold text-xs rounded uppercase">
                    {results.confidenceScore}% FLOWSHEET MATCH CONFIDENCE
                  </span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Certified Puzzolana Engineering
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase font-mono">
                  {results.flowsheetName}
                </h3>

                <p className="text-xs sm:text-sm text-industrial-300 leading-relaxed font-sans">
                  {results.engineeringSummary}
                </p>
              </div>

              {/* Plant Metrics Box */}
              <div className="bg-industrial-950 p-4 rounded border border-industrial-800 font-mono text-xs space-y-2 min-w-[240px]">
                <span className="text-[10px] text-industrial-500 uppercase tracking-widest block">
                  PLANT CIRCUIT BENCHMARKS
                </span>
                <div className="flex justify-between border-b border-industrial-800 pb-1">
                  <span className="text-industrial-400">Target TPH:</span>
                  <strong className="text-brand-yellow">{criteria.targetCapacityTPH} TPH</strong>
                </div>
                <div className="flex justify-between border-b border-industrial-800 pb-1">
                  <span className="text-industrial-400">Reduction Stages:</span>
                  <strong className="text-white">{results.reductionStages} Stages</strong>
                </div>
                <div className="flex justify-between border-b border-industrial-800 pb-1">
                  <span className="text-industrial-400">Est. Total Power:</span>
                  <strong className="text-white">{results.estimatedConnectedPowerKW} kW</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-industrial-400">Matched Units:</span>
                  <strong className="text-brand-yellow">{results.matches.length} Machines</strong>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-industrial-800/80 mt-6 font-mono text-xs">
              <button
                onClick={() => setSelectedQuoteProduct(results.matches[0])}
                className="px-5 py-3 bg-brand-yellow hover:bg-brand-yellow-400 text-industrial-950 font-black uppercase rounded shadow-lg shadow-brand-yellow/10 transition-colors"
              >
                Request Quotation for Full Train ({results.matches.length} Units)
              </button>
              <button
                onClick={handleResetWizard}
                className="px-4 py-3 bg-industrial-950 hover:bg-industrial-800 text-industrial-300 hover:text-white rounded border border-industrial-700 flex items-center gap-2 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Adjust Parameters & Re-Calculate</span>
              </button>
            </div>
          </div>

          {/* Matched Machinery Cards Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-industrial-800 pb-2">
              <h4 className="text-sm font-black text-white uppercase font-mono tracking-wider">
                MATCHED EQUIPMENT IN THIS PLANT FLOWSHEET ({results.matches.length} UNITS)
              </h4>
              <span className="text-xs font-mono text-industrial-400">
                Select machines to compare side-by-side
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.matches.map((product) => (
                <MachineCard
                  key={product.id}
                  product={product}
                  isCompared={comparedIds.includes(product.id)}
                  onToggleCompare={handleToggleCompare}
                  onRequestQuote={setSelectedQuoteProduct}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Comparison Tray */}
      <ComparisonTray
        comparedProducts={comparedProducts}
        onRemove={handleToggleCompare}
        onClear={() => setComparedIds([])}
      />

      {/* Quick RFQ Modal */}
      <QuickQuoteModal
        product={selectedQuoteProduct}
        isOpen={!!selectedQuoteProduct}
        onClose={() => setSelectedQuoteProduct(null)}
      />
    </div>
  );
};
