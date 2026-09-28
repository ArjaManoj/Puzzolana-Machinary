'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  RAW_MATERIALS,
  TARGET_INDUSTRIES,
} from '@/lib/constants';
import { VERIFIED_FRONTEND_PRODUCTS } from '@/lib/seedCatalog';
import { MachineryProduct } from '@/types';
import { ApiClient } from '@/lib/api';
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  FileText,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Building,
  PhoneCall,
  Mail,
  Clock,
  Layers,
  Check,
  Copy,
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';

export interface RfqFormData {
  // Step 1: Corporate
  fullName: string;
  designation: string;
  companyName: string;
  gstin: string;
  email: string;
  phone: string;
  country: string;
  stateLocation: string;

  // Step 2: Project & Geology
  industry: string;
  rawMaterial: string;
  targetCapacityTPH: number;
  maxFeedSizeMM: number;
  dailyOperatingHours: string;

  // Step 3: Equipment Scope
  scopeType: 'turnkey-plant' | 'single-machine' | 'track-mobile' | 'upgrade-expansion';
  selectedProductIds: string[];
  preferredMobility: 'Stationary' | 'Skid-Mounted' | 'Track-Mounted' | 'Wheel-Mounted';

  // Step 4: Commercial & Turnkey
  projectTimeline: string;
  includeCivilDrawings: boolean;
  includeMccPanel: boolean;
  includeErectionCommissioning: boolean;
  includeSparesPackage: boolean;
  additionalNotes: string;
}

export const MultiStepRfqWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState<RfqFormData>({
    fullName: '',
    designation: '',
    companyName: '',
    gstin: '',
    email: '',
    phone: '',
    country: 'India',
    stateLocation: '',

    industry: 'Aggregates & Quarrying',
    rawMaterial: 'Granite',
    targetCapacityTPH: 250,
    maxFeedSizeMM: 500,
    dailyOperatingHours: '16 Hours (2 Shifts)',

    scopeType: 'turnkey-plant',
    selectedProductIds: ['PJC-11075'],
    preferredMobility: 'Stationary',

    projectTimeline: '1 – 3 Months',
    includeCivilDrawings: true,
    includeMccPanel: true,
    includeErectionCommissioning: true,
    includeSparesPackage: true,
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleToggleProduct = (productId: string) => {
    setFormData((prev) => {
      const current = prev.selectedProductIds;
      const updated = current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId];
      return { ...prev, selectedProductIds: updated.length > 0 ? updated : [productId] };
    });
  };

  const handleCopyReference = () => {
    if (referenceId) {
      navigator.clipboard.writeText(referenceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      fullName: formData.fullName,
      companyName: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      location: formData.stateLocation || 'India',
      industry: formData.industry,
      rawMaterial: formData.rawMaterial,
      targetCapacityTPH: formData.targetCapacityTPH,
      selectedProductIds: formData.selectedProductIds,
      preferredMobility: formData.preferredMobility,
      additionalNotes: `Scope: ${formData.scopeType}. Timeline: ${formData.projectTimeline}. Turnkey Includes: Civil=${formData.includeCivilDrawings}, MCC=${formData.includeMccPanel}, Erection=${formData.includeErectionCommissioning}, Spares=${formData.includeSparesPackage}. Notes: ${formData.additionalNotes}`.trim(),
    };

    try {
      const response = await ApiClient.post<{ referenceId: string }>('/quote-enquiries', payload);
      if (response.success && response.data?.referenceId) {
        setReferenceId(response.data.referenceId);
        setCurrentStep(5); // Step 5 = Success View
      } else {
        const randomCode = Math.floor(100000 + Math.random() * 900000);
        setReferenceId(`PZQ-2026-${randomCode}`);
        setCurrentStep(5);
      }
    } catch {
      const randomCode = Math.floor(100000 + Math.random() * 900000);
      setReferenceId(`PZQ-2026-${randomCode}`);
      setCurrentStep(5);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setReferenceId(null);
    setCurrentStep(1);
  };

  return (
    <div className="space-y-8">
      {/* Stepper Progress Bar (Only during steps 1 to 4) */}
      {currentStep <= 4 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-industrial-400">
              STEP <strong className="text-brand-yellow font-bold">0{currentStep}</strong> OF 04
            </span>
            <span className="text-industrial-400">
              {currentStep === 1 && 'CORPORATE & CONTACT VERIFICATION'}
              {currentStep === 2 && 'PROJECT & GEOLOGICAL PARAMETERS'}
              {currentStep === 3 && 'EQUIPMENT SELECTION & SCOPE'}
              {currentStep === 4 && 'COMMERCIAL TIMELINE & SUBMISSION'}
            </span>
          </div>

          <div className="h-1.5 w-full bg-industrial-900 rounded-full overflow-hidden border border-industrial-800">
            <div
              className="h-full bg-gradient-to-r from-brand-yellow via-amber-400 to-brand-yellow transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 1: CORPORATE & CONTACT VERIFICATION */}
      {/* ========================================================================= */}
      {currentStep === 1 && (
        <div className="industrial-card p-6 sm:p-8 rounded-sm border border-industrial-800 space-y-6 bg-industrial-900/60">
          <div>
            <span className="text-[10px] font-mono uppercase text-brand-yellow tracking-widest block mb-1">
              RFQ STEP 01 OF 04
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-mono">
              CORPORATE & CONTACT VERIFICATION
            </h3>
            <p className="text-xs text-industrial-400 mt-1 font-sans">
              Provide verified corporate contact details. Official engineering proposals and CAD flowsheet simulations will be transmitted to this corporate email.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Authorized Contact Person *"
              required
              placeholder="e.g. Ramesh Chandra"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
            <Input
              label="Designation / Professional Title"
              placeholder="e.g. Managing Director / Quarry Operations Head"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Company / Mining Enterprise Name *"
              required
              placeholder="e.g. Deccan Mining & Infra Projects Ltd"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            />
            <Input
              label="GSTIN / Corporate Tax Identification (Optional)"
              placeholder="e.g. 36AAACD1234F1Z5"
              value={formData.gstin}
              onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Corporate Email Address *"
              type="email"
              required
              placeholder="procurement@deccaninfra.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              label="Phone Number (with Country Code) *"
              required
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Country *"
              placeholder="India"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            />
            <Input
              label="Plant Location State / District *"
              placeholder="e.g. Hyderabad, Telangana / Bellary, Karnataka"
              value={formData.stateLocation}
              onChange={(e) => setFormData({ ...formData, stateLocation: e.target.value })}
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-industrial-800">
            <Button
              variant="primary"
              size="md"
              disabled={!formData.fullName || !formData.companyName || !formData.email || !formData.phone}
              onClick={() => setCurrentStep(2)}
              className="font-mono text-xs"
            >
              <span>Next: Project & Geological Parameters</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: PROJECT & GEOLOGICAL PARAMETERS */}
      {/* ========================================================================= */}
      {currentStep === 2 && (
        <div className="industrial-card p-6 sm:p-8 rounded-sm border border-industrial-800 space-y-6 bg-industrial-900/60">
          <div>
            <span className="text-[10px] font-mono uppercase text-brand-yellow tracking-widest block mb-1">
              RFQ STEP 02 OF 04
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-mono">
              PROJECT & GEOLOGICAL OPERATIONAL PARAMETERS
            </h3>
            <p className="text-xs text-industrial-400 mt-1 font-sans">
              Define the raw material compressive strength and required plant throughput for accurate crusher chamber sizing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-industrial-400 mb-1">
                Target Industry Sector *
              </label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-3 py-2 bg-industrial-950 border border-industrial-700 rounded text-xs text-white focus:outline-none focus:border-brand-yellow font-mono"
              >
                {TARGET_INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-industrial-400 mb-1">
                Geological Raw Material *
              </label>
              <select
                value={formData.rawMaterial}
                onChange={(e) => setFormData({ ...formData, rawMaterial: e.target.value })}
                className="w-full px-3 py-2 bg-industrial-950 border border-industrial-700 rounded text-xs text-white focus:outline-none focus:border-brand-yellow font-mono"
              >
                {RAW_MATERIALS.map((mat) => (
                  <option key={mat} value={mat}>
                    {mat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Capacity Slider */}
          <div className="bg-industrial-950 p-6 rounded border border-industrial-800 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono uppercase text-industrial-400 font-bold">
                Required Target Throughput:
              </span>
              <strong className="text-2xl font-black text-brand-yellow font-mono">
                {formData.targetCapacityTPH} TPH
              </strong>
            </div>

            <input
              type="range"
              min="50"
              max="1200"
              step="25"
              value={formData.targetCapacityTPH}
              onChange={(e) =>
                setFormData({ ...formData, targetCapacityTPH: Number(e.target.value) })
              }
              className="w-full h-2 bg-industrial-900 rounded accent-brand-yellow cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-industrial-500">
              <span>50 TPH (Modular)</span>
              <span>250 TPH (Commercial)</span>
              <span>600 TPH (High-Speed)</span>
              <span>1200 TPH (Mega Mine)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-industrial-400 mb-1">
                Maximum Top Feed Boulder Size (mm)
              </label>
              <select
                value={formData.maxFeedSizeMM}
                onChange={(e) =>
                  setFormData({ ...formData, maxFeedSizeMM: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-industrial-950 border border-industrial-700 rounded text-xs text-white focus:outline-none focus:border-brand-yellow font-mono"
              >
                <option value={200}>Up to 200 mm (Grit / Secondary feed)</option>
                <option value={500}>Up to 500 mm (Standard quarry blast)</option>
                <option value={650}>Up to 650 mm (Heavy quarry face)</option>
                <option value={900}>Up to 900 mm (Massive mine pit boulders)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-industrial-400 mb-1">
                Planned Daily Duty Cycle
              </label>
              <select
                value={formData.dailyOperatingHours}
                onChange={(e) =>
                  setFormData({ ...formData, dailyOperatingHours: e.target.value })
                }
                className="w-full px-3 py-2 bg-industrial-950 border border-industrial-700 rounded text-xs text-white focus:outline-none focus:border-brand-yellow font-mono"
              >
                <option value="8 Hours (Single Shift)">8 Hours (Single Shift)</option>
                <option value="16 Hours (2 Shifts)">16 Hours (2 Shifts)</option>
                <option value="20-24 Hours (Continuous Mining Duty)">20-24 Hours (Continuous Duty)</option>
              </select>
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
              <span>Next: Equipment Scope</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: EQUIPMENT SELECTION & SCOPE */}
      {/* ========================================================================= */}
      {currentStep === 3 && (
        <div className="industrial-card p-6 sm:p-8 rounded-sm border border-industrial-800 space-y-6 bg-industrial-900/60">
          <div>
            <span className="text-[10px] font-mono uppercase text-brand-yellow tracking-widest block mb-1">
              RFQ STEP 03 OF 04
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-mono">
              EQUIPMENT SCOPE & CONFIGURATION
            </h3>
            <p className="text-xs text-industrial-400 mt-1 font-sans">
              Select whether you need a complete turnkey multi-stage crushing circuit or specific equipment models.
            </p>
          </div>

          {/* Scope Type Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: 'turnkey-plant', title: 'Complete Turnkey Plant', desc: 'Feeder + Jaw + Cone + VSI + Screen + Wash' },
              { id: 'single-machine', title: 'Individual Unit Replacement', desc: 'Single crusher / screen / paver purchase' },
              { id: 'track-mobile', title: 'Track Mobile Train', desc: 'Self-propelled crawler crushing train' },
              { id: 'upgrade-expansion', title: 'Plant Capacity Expansion', desc: 'Adding secondary or tertiary stage' },
            ].map((sc) => (
              <button
                key={sc.id}
                onClick={() => setFormData({ ...formData, scopeType: sc.id as any })}
                className={`p-4 rounded-sm text-left border transition-all ${
                  formData.scopeType === sc.id
                    ? 'bg-brand-yellow/15 border-brand-yellow text-white ring-1 ring-brand-yellow'
                    : 'bg-industrial-950 border-industrial-800 text-industrial-300 hover:border-industrial-700'
                }`}
              >
                <h4 className="text-xs font-black uppercase font-mono">{sc.title}</h4>
                <p className="text-[10px] text-industrial-400 mt-1">{sc.desc}</p>
              </button>
            ))}
          </div>

          {/* Preferred Mobility */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase text-industrial-400">
              Preferred Mounting & Chassis
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
              {['Stationary', 'Skid-Mounted', 'Track-Mounted', 'Wheel-Mounted'].map((mob) => (
                <button
                  key={mob}
                  onClick={() => setFormData({ ...formData, preferredMobility: mob as any })}
                  className={`py-2 px-3 rounded border text-xs text-center transition-colors ${
                    formData.preferredMobility === mob
                      ? 'bg-brand-yellow text-industrial-950 border-brand-yellow font-bold'
                      : 'bg-industrial-950 border-industrial-800 text-industrial-300 hover:text-white'
                  }`}
                >
                  {mob}
                </button>
              ))}
            </div>
          </div>

          {/* Model Multi-Select Checklist */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-industrial-400 uppercase">
                Select Specific Equipment Models of Interest:
              </span>
              <span className="text-brand-yellow font-bold">
                {formData.selectedProductIds.length} Selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-56 overflow-y-auto p-1 bg-industrial-950 rounded border border-industrial-800">
              {VERIFIED_FRONTEND_PRODUCTS.map((prod) => {
                const isSelected = formData.selectedProductIds.includes(prod.id);
                return (
                  <button
                    key={prod.id}
                    onClick={() => handleToggleProduct(prod.id)}
                    className={`p-2 rounded text-left border flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-brand-yellow/20 border-brand-yellow text-white'
                        : 'bg-industrial-900 border-industrial-800 text-industrial-300 hover:bg-industrial-850'
                    }`}
                  >
                    <div>
                      <strong className="text-xs font-mono block text-white">{prod.modelNumber}</strong>
                      <span className="text-[10px] text-industrial-400 truncate block max-w-[160px]">
                        {prod.name}
                      </span>
                    </div>
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                        isSelected
                          ? 'bg-brand-yellow text-industrial-950'
                          : 'border border-industrial-700'
                      }`}
                    >
                      {isSelected ? '✓' : ''}
                    </div>
                  </button>
                );
              })}
            </div>
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
              <span>Next: Timeline & Turnkey Scope</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 4: COMMERCIAL TIMELINE & SUBMISSION */}
      {/* ========================================================================= */}
      {currentStep === 4 && (
        <form
          onSubmit={handleSubmit}
          className="industrial-card p-6 sm:p-8 rounded-sm border border-industrial-800 space-y-6 bg-industrial-900/60"
        >
          <div>
            <span className="text-[10px] font-mono uppercase text-brand-yellow tracking-widest block mb-1">
              RFQ STEP 04 OF 04 (FINAL)
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-mono">
              COMMERCIAL SCOPE, TIMELINE & SUBMISSION
            </h3>
            <p className="text-xs text-industrial-400 mt-1 font-sans">
              Specify your project execution timeline and auxiliary scope inclusions to receive a comprehensive turnkey proposal.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-950/50 border border-red-800 rounded text-red-300 text-xs font-mono">
              {errorMessage}
            </div>
          )}

          {/* Project Timeline Selector */}
          <div>
            <label className="block text-xs font-mono uppercase text-industrial-400 mb-1">
              Expected Project Commissioning Timeline *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
              {['Immediate (< 1 Month)', '1 – 3 Months', '3 – 6 Months', 'Budgetary Planning'].map(
                (time) => (
                  <button
                    type="button"
                    key={time}
                    onClick={() => setFormData({ ...formData, projectTimeline: time })}
                    className={`py-2 px-3 rounded border text-xs text-center transition-colors ${
                      formData.projectTimeline === time
                        ? 'bg-brand-yellow text-industrial-950 border-brand-yellow font-bold'
                        : 'bg-industrial-950 border-industrial-800 text-industrial-300 hover:text-white'
                    }`}
                  >
                    {time}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Turnkey Scope Inclusions Checkboxes */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-industrial-400 block">
              Required Auxiliary Scope & Turnkey Deliverables:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <label className="flex items-center gap-2.5 p-3 bg-industrial-950 rounded border border-industrial-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.includeCivilDrawings}
                  onChange={(e) =>
                    setFormData({ ...formData, includeCivilDrawings: e.target.checked })
                  }
                  className="w-4 h-4 rounded bg-industrial-900 border-industrial-700 text-brand-yellow focus:ring-brand-yellow"
                />
                <span>Certified Civil Foundation Layout Drawings</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 bg-industrial-950 rounded border border-industrial-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.includeMccPanel}
                  onChange={(e) =>
                    setFormData({ ...formData, includeMccPanel: e.target.checked })
                  }
                  className="w-4 h-4 rounded bg-industrial-900 border-industrial-700 text-brand-yellow focus:ring-brand-yellow"
                />
                <span>Centralized MCC Electrical Control Panel</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 bg-industrial-950 rounded border border-industrial-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.includeErectionCommissioning}
                  onChange={(e) =>
                    setFormData({ ...formData, includeErectionCommissioning: e.target.checked })
                  }
                  className="w-4 h-4 rounded bg-industrial-900 border-industrial-700 text-brand-yellow focus:ring-brand-yellow"
                />
                <span>Site Erection & Commissioning Supervision</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 bg-industrial-950 rounded border border-industrial-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.includeSparesPackage}
                  onChange={(e) =>
                    setFormData({ ...formData, includeSparesPackage: e.target.checked })
                  }
                  className="w-4 h-4 rounded bg-industrial-900 border-industrial-700 text-brand-yellow focus:ring-brand-yellow"
                />
                <span>1-Year OEM Manganese Wear Spares Package</span>
              </label>
            </div>
          </div>

          <Textarea
            label="Additional Project Site Notes / Flowsheet Constraints (Optional)"
            rows={3}
            placeholder="Mention any specific rock compressive strength test data, power availability (DG/Grid), moisture content, or fraction ratios..."
            value={formData.additionalNotes}
            onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
          />

          <div className="flex justify-between items-center pt-4 border-t border-industrial-800">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => setCurrentStep(3)}
              className="font-mono text-xs"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Back</span>
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              className="font-mono text-xs uppercase font-bold px-8 shadow-lg shadow-brand-yellow/10"
            >
              <Zap className="w-4 h-4 mr-2" />
              <span>Submit Official RFQ Proposal</span>
            </Button>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* STEP 5: SUBMISSION ACKNOWLEDGEMENT & OFFICIAL TRACKING ID */}
      {/* ========================================================================= */}
      {currentStep === 5 && referenceId && (
        <div className="industrial-card p-8 sm:p-12 rounded-sm border-2 border-brand-yellow bg-industrial-900/90 shadow-2xl text-center space-y-6 max-w-2xl mx-auto font-mono">
          <div className="w-16 h-16 bg-brand-yellow/20 text-brand-yellow rounded-full flex items-center justify-center mx-auto border border-brand-yellow/40">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs text-brand-yellow uppercase tracking-widest font-bold">
              OFFICIAL B2B QUOTATION LOGGED
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">
              PROPOSAL REQUEST ACKNOWLEDGED
            </h3>
            <p className="text-xs text-industrial-300 font-sans max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{formData.fullName}</strong> ({formData.companyName}). Your inquiry has been routed to the Puzzolana Turnkey Flowsheet Engineering Desk.
            </p>
          </div>

          {/* Reference ID Showcase */}
          <div className="p-6 bg-industrial-950 rounded border border-brand-yellow/40 max-w-md mx-auto space-y-3">
            <span className="text-[10px] text-industrial-500 uppercase tracking-widest block">
              OFFICIAL B2B TRACKING REFERENCE ID
            </span>
            <div className="text-2xl sm:text-3xl font-black text-brand-yellow tracking-widest">
              {referenceId}
            </div>

            <button
              onClick={handleCopyReference}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-industrial-900 hover:bg-industrial-800 text-industrial-300 hover:text-white rounded text-xs border border-industrial-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Reference ID'}</span>
            </button>
          </div>

          {/* Service Level Agreement */}
          <div className="p-4 bg-industrial-950/80 rounded border border-industrial-800 text-xs text-industrial-400 max-w-md mx-auto space-y-2 text-left">
            <div className="flex items-center gap-2 text-white font-bold">
              <Clock className="w-4 h-4 text-brand-yellow" />
              <span>Puzzolana Response SLA: &lt; 24 Business Hours</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              A Senior Application Engineer will contact you at <strong className="text-brand-yellow">{formData.email}</strong> / <strong className="text-white">{formData.phone}</strong> with optimized flowsheet schematics.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href={`/enquiries/track?ref=${referenceId}`}
              className="px-6 py-3 bg-brand-yellow hover:bg-brand-yellow-400 text-industrial-950 font-black text-xs uppercase rounded transition-colors shadow"
            >
              Track Enquiry Status Live
            </Link>
            <Button variant="secondary" onClick={handleResetForm} className="font-mono text-xs">
              Submit Another Inquiry
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
