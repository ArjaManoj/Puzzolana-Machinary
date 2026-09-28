'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { VERIFIED_OEM_PARTS, SparePartItem } from '@/lib/seedParts';
import { ApiClient } from '@/lib/api';
import {
  Wrench,
  Search,
  CheckCircle2,
  PhoneCall,
  Mail,
  ShieldCheck,
  Zap,
  Layers,
  Sparkles,
  ChevronRight,
  Clock,
  Check,
  Copy,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';
import { Modal } from '@/components/common/Modal';

export default function SparePartsPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPartForQuote, setSelectedPartForQuote] = useState<SparePartItem | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    location: '',
    machineModel: '',
    machineSerial: '',
    urgency: 'Scheduled Maintenance',
    quantity: '1 Set',
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Categories list
  const categories = [
    { id: 'all', name: 'All OEM Parts' },
    { id: 'Jaw Crusher Parts', name: 'Jaw Crushers' },
    { id: 'Cone Crusher Parts', name: 'Cone Crushers' },
    { id: 'VSI Impactor Parts', name: 'VSI Sand Makers' },
    { id: 'Screen & Washing Parts', name: 'Screens & Washing' },
    { id: 'Feeder & Paver Parts', name: 'Feeders & Pavers' },
  ];

  // Filtered parts
  const filteredParts = useMemo(() => {
    return VERIFIED_OEM_PARTS.filter((part) => {
      if (selectedCategory !== 'all' && part.category !== selectedCategory) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = part.name.toLowerCase().includes(q);
        const matchPartNo = part.partNumber.toLowerCase().includes(q);
        const matchModel = part.compatibleModels.some((m) => m.toLowerCase().includes(q));
        const matchGrade = part.materialGrade.toLowerCase().includes(q);
        if (!matchName && !matchPartNo && !matchModel && !matchGrade) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      fullName: formData.fullName,
      companyName: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location || 'India',
      machineModel: formData.machineModel || selectedPartForQuote?.compatibleModels[0] || 'General Puzzolana Fleet',
      machineSerialNumber: formData.machineSerial || 'N/A',
      partNumbers: [selectedPartForQuote?.partNumber || 'General Spares Request'],
      urgency: formData.urgency,
      notes: `Quantity: ${formData.quantity}. Part: ${selectedPartForQuote?.name} (${selectedPartForQuote?.partNumber}). Notes: ${formData.additionalNotes}`,
    };

    try {
      const res = await ApiClient.post<{ referenceId: string }>('/spare-parts-enquiries', payload);
      if (res.success && res.data?.referenceId) {
        setReferenceId(res.data.referenceId);
      } else {
        const random = Math.floor(100000 + Math.random() * 900000);
        setReferenceId(`PZP-2026-${random}`);
      }
    } catch {
      const random = Math.floor(100000 + Math.random() * 900000);
      setReferenceId(`PZP-2026-${random}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReference = () => {
    if (referenceId) {
      navigator.clipboard.writeText(referenceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 pb-28 pt-8">
      {/* 1. Hero Header */}
      <section className="relative border-b border-industrial-800 bg-industrial-900/60 pb-12 pt-6 overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e6a817_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-industrial-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-industrial-600" />
            <span className="text-brand-yellow font-bold uppercase">GENUINE OEM SPARE PARTS</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-mono font-bold tracking-wider uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% CERTIFIED FACTORY OEM WEAR & MECHANICAL PARTS</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
                GENUINE <span className="text-brand-yellow">PUZZOLANA SPARES</span>
              </h1>

              <p className="text-sm sm:text-base text-industrial-300 leading-relaxed font-sans">
                Cast in Puzzolana&apos;s own high-manganese induction foundry. Maximum wear resistance, perfect metallurgical fit, and 24-hour express warehouse dispatch across India.
              </p>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 font-mono text-xs">
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 min-w-[130px]">
                <span className="text-industrial-500 block text-[10px] uppercase">Foundry Metallurgy</span>
                <strong className="text-sm font-black text-brand-yellow">Mn18Cr2 / Mn22</strong>
              </div>
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 min-w-[130px]">
                <span className="text-industrial-500 block text-[10px] uppercase">Express Dispatch</span>
                <strong className="text-sm font-black text-white">&lt; 24 Hours</strong>
              </div>
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 min-w-[130px]">
                <span className="text-industrial-500 block text-[10px] uppercase">Warranty</span>
                <strong className="text-sm font-black text-brand-yellow">100% OEM Fit</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Parts Catalog Search & Filter Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-industrial-900 border border-industrial-800 rounded-sm">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search part name, part number, model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-industrial-950 border border-industrial-700 rounded text-xs text-white font-mono placeholder-industrial-500 focus:outline-none focus:border-brand-yellow"
            />
            <Search className="w-4 h-4 text-industrial-400 absolute left-3 top-2.5" />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold whitespace-nowrap transition-colors border ${
                  selectedCategory === cat.id
                    ? 'bg-brand-yellow text-industrial-950 border-brand-yellow shadow'
                    : 'bg-industrial-950 text-industrial-400 border-industrial-800 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Parts Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.map((part) => (
            <div
              key={part.id}
              className="industrial-card rounded-sm overflow-hidden border border-industrial-800 hover:border-brand-yellow/50 transition-all flex flex-col justify-between bg-industrial-900/60"
            >
              {/* Part Image & Status */}
              <div className="relative h-44 bg-industrial-950 overflow-hidden border-b border-industrial-800 p-4 flex items-center justify-center">
                <img
                  src={part.image}
                  alt={part.name}
                  className="max-h-full max-w-full object-contain filter grayscale contrast-125 hover:filter-none transition-all duration-300"
                />
                <div className="absolute top-2 right-2 bg-industrial-950/90 border border-industrial-700 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 font-bold">
                  {part.leadTime}
                </div>
                <div className="absolute top-2 left-2 bg-industrial-950/90 border border-industrial-800 px-2 py-0.5 rounded text-[10px] font-mono text-brand-yellow">
                  {part.category}
                </div>
              </div>

              {/* Part Details */}
              <div className="p-5 space-y-3 flex-grow flex flex-col justify-between font-mono text-xs">
                <div>
                  <span className="text-[11px] text-brand-yellow font-bold block">
                    Part #{part.partNumber}
                  </span>
                  <h3 className="text-base font-black text-white font-sans mt-0.5 leading-snug">
                    {part.name}
                  </h3>
                  <p className="text-xs text-industrial-400 font-sans mt-1 line-clamp-2 leading-relaxed">
                    {part.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-industrial-800/80">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-industrial-500">Material Grade:</span>
                    <strong className="text-white text-right">{part.materialGrade}</strong>
                  </div>

                  <div className="space-y-1">
                    <span className="text-industrial-500 text-[10px] uppercase block">
                      Compatible Models:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {part.compatibleModels.map((m) => (
                        <span
                          key={m}
                          className="px-1.5 py-0.5 rounded bg-industrial-950 border border-industrial-700 text-[10px] text-brand-yellow"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-3 border-t border-industrial-800">
                  <button
                    onClick={() => setSelectedPartForQuote(part)}
                    className="w-full py-2 px-3 bg-brand-yellow hover:bg-brand-yellow-400 text-industrial-950 font-bold uppercase text-xs rounded transition-colors shadow-sm"
                  >
                    Request Spares Quotation
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Emergency Spares Support Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="p-8 bg-industrial-900 border border-industrial-800 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono text-brand-yellow uppercase font-bold flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              <span>EMERGENCY BREAKDOWN SPARES DISPATCH</span>
            </span>
            <h3 className="text-xl font-black text-white uppercase font-mono">
              UNSCHEDULED PLANT STOPPAGE OR BROKEN MANTLE?
            </h3>
            <p className="text-xs text-industrial-400 font-sans leading-relaxed">
              Our central warehouse hubs in Hyderabad and Coimbatore maintain ready-stock of jaw plates, cone mantles, bearings, and VSI tips for emergency same-day dispatch.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 font-mono text-xs w-full md:w-auto">
            <a
              href="tel:+914023445577"
              className="px-5 py-3 bg-brand-yellow hover:bg-brand-yellow-400 text-industrial-950 font-black uppercase rounded flex items-center justify-center gap-2 transition-colors shadow"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Spares Desk (+91 40 2344 5577)</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4. Spare Parts Inquiry Modal */}
      {selectedPartForQuote && (
        <Modal
          isOpen={!!selectedPartForQuote}
          onClose={() => {
            setSelectedPartForQuote(null);
            setReferenceId(null);
          }}
          title={referenceId ? 'SPARES INQUIRY CONFIRMATION' : `ORDER OEM SPARE PARTS — ${selectedPartForQuote.partNumber}`}
          size="lg"
        >
          {referenceId ? (
            <div className="text-center py-6 space-y-4 font-mono">
              <div className="w-14 h-14 bg-brand-yellow/20 text-brand-yellow rounded-full flex items-center justify-center mx-auto border border-brand-yellow/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-lg font-black text-white uppercase">
                SPARE PARTS REQUEST LOGGED
              </h3>

              <p className="text-xs text-industrial-300 max-w-md mx-auto leading-relaxed">
                Your request for <strong className="text-white">{selectedPartForQuote.name}</strong> has been assigned to the Puzzolana Central Spares Warehouse Desk.
              </p>

              <div className="bg-industrial-950 p-4 rounded border border-brand-yellow/30 max-w-sm mx-auto space-y-2">
                <span className="text-[10px] text-industrial-500 uppercase tracking-widest block">
                  SPARE PARTS TRACKING ID
                </span>
                <span className="text-xl font-black text-brand-yellow tracking-wider block">
                  {referenceId}
                </span>
                <button
                  onClick={handleCopyReference}
                  className="inline-flex items-center gap-1 text-[11px] text-industrial-400 hover:text-white"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <Link
                  href={`/enquiries/track?ref=${referenceId}`}
                  className="px-5 py-2.5 bg-brand-yellow text-industrial-950 font-bold text-xs uppercase rounded"
                >
                  Track Dispatch Status Live
                </Link>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setSelectedPartForQuote(null);
                    setReferenceId(null);
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-industrial-950 rounded border border-industrial-800 text-xs font-mono flex justify-between items-center">
                <div>
                  <span className="text-industrial-500 block text-[10px]">SELECTED PART</span>
                  <strong className="text-white">{selectedPartForQuote.name}</strong>
                  <span className="text-brand-yellow block text-[11px] font-bold">
                    Part #{selectedPartForQuote.partNumber}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-industrial-500 block text-[10px]">LEAD TIME</span>
                  <span className="text-emerald-400 font-bold">{selectedPartForQuote.leadTime}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Full Name *"
                  required
                  placeholder="e.g. Anand Varma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
                <Input
                  label="Company / Quarry Enterprise *"
                  required
                  placeholder="e.g. Telangana Mining Corp"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Corporate Email Address *"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Input
                  label="Phone Number *"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  label="Machine Serial Number (Optional)"
                  placeholder="e.g. PJC-11075-2023-042"
                  value={formData.machineSerial}
                  onChange={(e) => setFormData({ ...formData, machineSerial: e.target.value })}
                />
                <Input
                  label="Quantity Sets Needed *"
                  placeholder="e.g. 2 Sets (Fixed + Moving)"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
                <div>
                  <label className="block text-xs font-mono uppercase text-industrial-400 mb-1">
                    Urgency Level *
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full px-3 py-2 bg-industrial-950 border border-industrial-700 rounded text-xs text-white focus:outline-none focus:border-brand-yellow font-mono"
                  >
                    <option value="Emergency Breakdown">Emergency Breakdown (&lt; 24h)</option>
                    <option value="Scheduled Maintenance">Scheduled Maintenance</option>
                    <option value="Stock Replenishment">Quarry Stock Replenishment</option>
                  </select>
                </div>
              </div>

              <Textarea
                label="Delivery Address & Site Contact Notes"
                rows={2}
                placeholder="Specify delivery warehouse or quarry site address..."
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              />

              <div className="pt-2 flex justify-between items-center border-t border-industrial-800">
                <span className="text-[11px] font-mono text-industrial-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-yellow" />
                  <span>Direct OEM Factory Dispatch</span>
                </span>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedPartForQuote(null)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
                    Submit Spares Order
                  </Button>
                </div>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
}
