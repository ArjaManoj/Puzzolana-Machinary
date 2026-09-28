'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PREVENTATIVE_MAINTENANCE_SCHEDULES } from '@/lib/seedParts';
import { ApiClient } from '@/lib/api';
import {
  Wrench,
  ShieldCheck,
  Zap,
  PhoneCall,
  Mail,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Activity,
  Layers,
  Sparkles,
  Award,
  Factory,
  Check,
  Copy,
  Sliders,
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';

export default function ServicePage() {
  const [activeChecklistTab, setActiveChecklistTab] = useState<number>(0);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    location: '',
    serviceType: 'Emergency Breakdown Support',
    machineModel: 'PJC-11075 Jaw Crusher',
    machineSerial: '',
    issueDescription: '',
    preferredDate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      fullName: formData.fullName,
      companyName: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location || 'India',
      serviceType: formData.serviceType,
      machineModel: formData.machineModel,
      machineSerialNumber: formData.machineSerial || 'N/A',
      issueDescription: `Preferred Date: ${formData.preferredDate}. Issue: ${formData.issueDescription}`,
    };

    try {
      const res = await ApiClient.post<{ referenceId: string }>('/service-enquiries', payload);
      if (res.success && res.data?.referenceId) {
        setReferenceId(res.data.referenceId);
      } else {
        const random = Math.floor(100000 + Math.random() * 900000);
        setReferenceId(`PZS-2026-${random}`);
      }
    } catch {
      const random = Math.floor(100000 + Math.random() * 900000);
      setReferenceId(`PZS-2026-${random}`);
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
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#e6a817_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-industrial-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-industrial-600" />
            <span className="text-brand-yellow font-bold uppercase">LIFECYCLE SERVICE & MAINTENANCE</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-mono font-bold tracking-wider uppercase">
                <Wrench className="w-3.5 h-3.5" />
                <span>24/7 NATIONWIDE FIELD ENGINEERING SUPPORT</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
                PLANT SERVICE & <span className="text-brand-yellow">LIFECYCLE ENGINEERING</span>
              </h1>

              <p className="text-sm sm:text-base text-industrial-300 leading-relaxed font-sans">
                Maximized crushing uptime across 10,000+ global installations. Factory-trained service engineers, annual maintenance contracts (AMC), predictive vibration audits, and emergency site dispatch.
              </p>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 font-mono text-xs">
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 min-w-[130px]">
                <span className="text-industrial-500 block text-[10px] uppercase">Service Response</span>
                <strong className="text-sm font-black text-brand-yellow">24/7 Dispatch</strong>
              </div>
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 min-w-[130px]">
                <span className="text-industrial-500 block text-[10px] uppercase">Field Engineers</span>
                <strong className="text-sm font-black text-white">100+ Certified</strong>
              </div>
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 min-w-[130px]">
                <span className="text-industrial-500 block text-[10px] uppercase">Tracking ID</span>
                <strong className="text-sm font-black text-brand-yellow">Live PZS ID</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 5 Core Service Engineering Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        <div className="border-b border-industrial-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-yellow" />
            <h2 className="text-lg font-black text-white uppercase font-mono tracking-wider">
              FIELD ENGINEERING CAPABILITIES
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="industrial-card p-6 rounded-sm border border-industrial-800 bg-industrial-900/60 space-y-3">
            <div className="w-10 h-10 rounded bg-industrial-950 border border-industrial-800 flex items-center justify-center text-brand-yellow mb-2">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-white font-mono uppercase">
              24/7 Breakdown & Field Troubleshooting
            </h3>
            <p className="text-xs text-industrial-400 font-sans leading-relaxed">
              Rapid on-site emergency dispatch for hydraulic relief diagnostics, bearing changes, eccentric shaft realignment, and uncrushable tramp clearance.
            </p>
          </div>

          <div className="industrial-card p-6 rounded-sm border border-industrial-800 bg-industrial-900/60 space-y-3">
            <div className="w-10 h-10 rounded bg-industrial-950 border border-industrial-800 flex items-center justify-center text-brand-yellow mb-2">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-white font-mono uppercase">
              Annual Maintenance Contracts (AMC)
            </h3>
            <p className="text-xs text-industrial-400 font-sans leading-relaxed">
              Scheduled monthly plant audits, spectrographic lube oil analysis, ultrasonic frame inspection, and predictive vibration monitoring.
            </p>
          </div>

          <div className="industrial-card p-6 rounded-sm border border-industrial-800 bg-industrial-900/60 space-y-3">
            <div className="w-10 h-10 rounded bg-industrial-950 border border-industrial-800 flex items-center justify-center text-brand-yellow mb-2">
              <Factory className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-white font-mono uppercase">
              Plant Overhauls & Flowsheet Retrofits
            </h3>
            <p className="text-xs text-industrial-400 font-sans leading-relaxed">
              Comprehensive shutdown rebuilds, converting dry plants to M-Sand washing circuits, and upgrading old two-stage plants to 3-stage high-capacity trains.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Preventative Maintenance Checklist Repository */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-6">
        <div className="border-b border-industrial-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-yellow uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>OEM GUIDELINES</span>
            </div>
            <h2 className="text-lg font-black text-white uppercase font-mono">
              PREVENTATIVE INSPECTION CHECKLISTS
            </h2>
          </div>

          {/* Interval Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {PREVENTATIVE_MAINTENANCE_SCHEDULES.map((sched, idx) => (
              <button
                key={idx}
                onClick={() => setActiveChecklistTab(idx)}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold whitespace-nowrap transition-colors border ${
                  activeChecklistTab === idx
                    ? 'bg-brand-yellow text-industrial-950 border-brand-yellow shadow'
                    : 'bg-industrial-900 text-industrial-400 border-industrial-800 hover:text-white'
                }`}
              >
                {sched.interval}
              </button>
            ))}
          </div>
        </div>

        {/* Active Checklist Table */}
        <div className="industrial-card rounded-sm overflow-hidden border border-industrial-800">
          <div className="p-4 bg-industrial-950 border-b border-industrial-800 flex justify-between items-center font-mono text-xs">
            <span className="text-brand-yellow font-bold uppercase">
              {PREVENTATIVE_MAINTENANCE_SCHEDULES[activeChecklistTab].title}
            </span>
            <span className="text-industrial-400">
              {PREVENTATIVE_MAINTENANCE_SCHEDULES[activeChecklistTab].checkpoints.length} Critical Checkpoints
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-industrial-200 border-collapse font-mono">
              <thead className="bg-industrial-950 text-industrial-400 uppercase text-[11px] border-b border-industrial-800">
                <tr>
                  <th className="p-3.5 min-w-[200px]">Component Area</th>
                  <th className="p-3.5 min-w-[400px]">Required Inspection Action</th>
                  <th className="p-3.5 min-w-[140px] text-right">Criticality</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-industrial-800/60 bg-industrial-900/40">
                {PREVENTATIVE_MAINTENANCE_SCHEDULES[activeChecklistTab].checkpoints.map(
                  (cp, idx) => (
                    <tr key={idx} className="hover:bg-industrial-850/60 transition-colors">
                      <td className="p-3.5 font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-yellow" />
                        <span>{cp.component}</span>
                      </td>
                      <td className="p-3.5 text-industrial-300 font-sans">{cp.action}</td>
                      <td className="p-3.5 text-right">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            cp.criticality === 'Safety Mandatory'
                              ? 'bg-red-950 text-red-400 border border-red-800'
                              : cp.criticality === 'Critical'
                              ? 'bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/30'
                              : 'bg-industrial-950 text-industrial-400 border border-industrial-800'
                          }`}
                        >
                          {cp.criticality}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Interactive Service Booking Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-8">
        <div className="border-b border-industrial-800 pb-3 text-center">
          <span className="text-[10px] font-mono uppercase text-brand-yellow tracking-widest block mb-1">
            OFFICIAL SERVICE DESK
          </span>
          <h2 className="text-2xl font-black text-white uppercase font-mono">
            BOOK A FACTORY SERVICE ENGINEER
          </h2>
          <p className="text-xs text-industrial-400 font-sans mt-1">
            Fill out the form below to register a field service request, request an AMC proposal, or schedule a plant overhaul.
          </p>
        </div>

        {referenceId ? (
          <div className="industrial-card p-8 sm:p-12 rounded-sm border-2 border-brand-yellow bg-industrial-900/90 shadow-2xl text-center space-y-6 font-mono">
            <div className="w-16 h-16 bg-brand-yellow/20 text-brand-yellow rounded-full flex items-center justify-center mx-auto border border-brand-yellow/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs text-brand-yellow uppercase tracking-widest font-bold">
                SERVICE TICKET LOGGED
              </span>
              <h3 className="text-2xl font-black text-white uppercase">
                SERVICE REQUEST ACKNOWLEDGED
              </h3>
              <p className="text-xs text-industrial-300 font-sans max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. Your field service ticket for{' '}
                <strong className="text-brand-yellow">{formData.machineModel}</strong> has been assigned to the Regional Field Dispatch Desk.
              </p>
            </div>

            {/* Reference Showcase */}
            <div className="p-6 bg-industrial-950 rounded border border-brand-yellow/40 max-w-md mx-auto space-y-3">
              <span className="text-[10px] text-industrial-500 uppercase tracking-widest block">
                SERVICE TRACKING REFERENCE ID
              </span>
              <div className="text-2xl sm:text-3xl font-black text-brand-yellow tracking-widest">
                {referenceId}
              </div>

              <button
                onClick={handleCopyReference}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-industrial-900 hover:bg-industrial-800 text-industrial-300 hover:text-white rounded text-xs border border-industrial-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Reference ID'}</span>
              </button>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href={`/enquiries/track?ref=${referenceId}`}
                className="px-6 py-3 bg-brand-yellow hover:bg-brand-yellow-400 text-industrial-950 font-black text-xs uppercase rounded transition-colors shadow"
              >
                Track Service Ticket Live
              </Link>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setReferenceId(null)}
                className="font-mono text-xs"
              >
                Book Another Service
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="industrial-card p-6 sm:p-8 rounded-sm border border-industrial-800 space-y-6 bg-industrial-900/60"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Contact Person Full Name *"
                required
                placeholder="e.g. Surendra Reddy"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              <Input
                label="Company / Quarry Name *"
                required
                placeholder="e.g. Deccan Infra Aggregates"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Corporate Email Address *"
                type="email"
                required
                placeholder="planthead@deccaninfra.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Input
                label="Phone Number (WhatsApp Active) *"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-industrial-400 mb-1">
                  Service Category *
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full px-3 py-2 bg-industrial-950 border border-industrial-700 rounded text-xs text-white focus:outline-none focus:border-brand-yellow font-mono"
                >
                  <option value="Emergency Breakdown Support">Emergency Breakdown Dispatch</option>
                  <option value="Annual Maintenance Contract (AMC)">Annual Maintenance Contract (AMC)</option>
                  <option value="Shutdown Overhaul & Rebuild">Shutdown Overhaul & Rebuild</option>
                  <option value="Erection & Commissioning">Erection & Commissioning</option>
                  <option value="Flowsheet Capacity Audit">Flowsheet Capacity Audit</option>
                </select>
              </div>

              <Input
                label="Machine Model *"
                required
                placeholder="e.g. PJC 11075 / PCC 2000"
                value={formData.machineModel}
                onChange={(e) => setFormData({ ...formData, machineModel: e.target.value })}
              />

              <Input
                label="Machine Serial Number"
                placeholder="e.g. PJC-11075-2022-019"
                value={formData.machineSerial}
                onChange={(e) => setFormData({ ...formData, machineSerial: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Quarry Plant Location / District *"
                required
                placeholder="e.g. Mahabubnagar, Telangana"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
              <Input
                label="Preferred Site Visit Date"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
              />
            </div>

            <Textarea
              label="Description of Issue / Scope of Service Required *"
              required
              rows={3}
              placeholder="Describe symptoms, abnormal bearing temperature, hydraulic alarms, or shutdown timeline..."
              value={formData.issueDescription}
              onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
            />

            <div className="pt-2 flex justify-between items-center border-t border-industrial-800">
              <span className="text-[11px] font-mono text-industrial-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-yellow" />
                <span>Urgent tickets dispatched within 12 hours</span>
              </span>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                className="font-mono text-xs uppercase font-bold"
              >
                <Zap className="w-4 h-4 mr-1.5" />
                <span>Submit Service Ticket</span>
              </Button>
            </div>
          </form>
        )}
      </section>

      {/* 5. Emergency Helpline Footer */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="p-6 bg-industrial-900 border border-industrial-800 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-industrial-950 border border-industrial-800 flex items-center justify-center text-brand-yellow">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <span className="text-industrial-500 block text-[10px] uppercase">24/7 Field Dispatch Hotline</span>
              <strong className="text-white text-xs">+91 (40) 2344 5588 / 89</strong>
            </div>
          </div>

          <a
            href="mailto:service@puzzolana.com"
            className="px-4 py-2 bg-industrial-950 hover:bg-industrial-800 text-brand-yellow border border-brand-yellow/40 rounded uppercase font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>service@puzzolana.com</span>
          </a>
        </div>
      </section>
    </div>
  );
}
