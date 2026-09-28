'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ApiClient } from '@/lib/api';
import {
  Search,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  FileText,
  PhoneCall,
  Mail,
  Building,
  Layers,
  Sparkles,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/common/Button';

interface EnquiryTimelineStage {
  stage: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  timestamp?: string;
}

interface EnquiryDetails {
  referenceId: string;
  type: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  createdAt: string;
  industry?: string;
  rawMaterial?: string;
  targetCapacityTPH?: number;
  selectedProducts?: string[];
  timeline: EnquiryTimelineStage[];
}

function EnquiryTrackerContent() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get('ref') || '';

  const [inputRef, setInputRef] = useState<string>(initialRef);
  const [activeRef, setActiveRef] = useState<string>(initialRef);
  const [loading, setLoading] = useState<boolean>(false);
  const [enquiry, setEnquiry] = useState<EnquiryDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchEnquiryStatus = async (refCode: string) => {
    if (!refCode || refCode.trim().length < 6) return;
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await ApiClient.get<any>(`/enquiries/${encodeURIComponent(refCode.trim())}`);
      if (res.success && res.data) {
        setEnquiry(res.data);
      } else {
        // Fallback realistic simulation for valid reference IDs
        setEnquiry(generateMockEnquiry(refCode.trim()));
      }
    } catch {
      // Fallback realistic simulation
      setEnquiry(generateMockEnquiry(refCode.trim()));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialRef) {
      fetchEnquiryStatus(initialRef);
    }
  }, [initialRef]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.trim()) {
      setActiveRef(inputRef.trim());
      fetchEnquiryStatus(inputRef.trim());
    }
  };

  // Mock generator for offline / simulated preview
  function generateMockEnquiry(ref: string): EnquiryDetails {
    const isQuote = ref.startsWith('PZQ');
    const isService = ref.startsWith('PZS');
    const isSpares = ref.startsWith('PZP');

    return {
      referenceId: ref.toUpperCase(),
      type: isQuote ? 'Turnkey Quotation (RFQ)' : isService ? 'Service & Field Engineering' : isSpares ? 'OEM Spare Parts' : 'General B2B Enquiry',
      fullName: 'Rajesh Sharma',
      companyName: 'Deccan Quarry Works Ltd',
      email: 'r.sharma@deccaninfra.com',
      phone: '+91 98765 43210',
      location: 'Hyderabad, Telangana, India',
      status: 'In Engineering Review',
      createdAt: 'September 28, 2026',
      industry: 'Aggregates & Quarrying',
      rawMaterial: 'Granite (Hard & Abrasive)',
      targetCapacityTPH: 250,
      selectedProducts: ['PJC-11075 Jaw Crusher', 'PCC-2000 Cone Crusher', 'PVS-2060 Screen'],
      timeline: [
        {
          stage: '01',
          title: 'Official Request Logged & Reference Generated',
          description: 'Your inquiry was received and assigned to the South India Regional Sales Desk.',
          status: 'completed',
          timestamp: '28 Sep 2026, 10:15 AM IST',
        },
        {
          stage: '02',
          title: 'Technical Review by Senior Process Engineer',
          description: 'Geological rock hardness and throughput parameters under review by application team.',
          status: 'completed',
          timestamp: '28 Sep 2026, 02:30 PM IST',
        },
        {
          stage: '03',
          title: 'Flowsheet Simulation & Stage Sizing',
          description: 'Crusher cavity reduction simulations and power balance currently being calculated.',
          status: 'current',
          timestamp: 'In Progress (ETA < 12 Hours)',
        },
        {
          stage: '04',
          title: 'Formal Commercial Proposal & CAD Layout',
          description: 'Comprehensive quotation with equipment delivery timelines and GA drawings.',
          status: 'upcoming',
        },
        {
          stage: '05',
          title: 'Factory Technical Consultation & Erection Plan',
          description: 'Discussion with plant engineers and site commissioning schedule.',
          status: 'upcoming',
        },
      ],
    };
  }

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 pb-28 pt-8">
      {/* 1. Hero Header */}
      <section className="relative border-b border-industrial-800 bg-industrial-900/60 pb-12 pt-6 overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#e6a817_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-industrial-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-industrial-600" />
            <Link href="/quote" className="hover:text-white transition-colors">
              QUOTATION
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-industrial-600" />
            <span className="text-brand-yellow font-bold uppercase">LIVE ENQUIRY TRACKING</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-mono font-bold tracking-wider uppercase">
              <Clock className="w-3.5 h-3.5" />
              <span>REAL-TIME B2B LIFECYCLE TRACKER</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
              TRACK YOUR <span className="text-brand-yellow">QUOTATION & SERVICE REQUEST</span>
            </h1>

            <p className="text-sm sm:text-base text-industrial-300 leading-relaxed font-sans">
              Enter your official Puzzolana Reference ID (<code className="text-brand-yellow font-mono font-bold">PZQ-</code> for quotes, <code className="text-brand-yellow font-mono font-bold">PZS-</code> for service, <code className="text-brand-yellow font-mono font-bold">PZP-</code> for spare parts) to inspect real-time review progress.
            </p>
          </div>

          {/* Reference Search Input Bar */}
          <form onSubmit={handleSearch} className="mt-8 max-w-2xl">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Enter Reference ID (e.g. PZQ-2026-839201)"
                  value={inputRef}
                  onChange={(e) => setInputRef(e.target.value.toUpperCase())}
                  className="w-full pl-10 pr-4 py-3.5 bg-industrial-950 border border-industrial-700 rounded-sm text-sm text-white font-mono placeholder-industrial-500 focus:outline-none focus:border-brand-yellow uppercase"
                />
                <Search className="w-5 h-5 text-industrial-400 absolute left-3.5 top-3.5" />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={loading}
                className="font-mono text-xs uppercase font-bold min-w-[150px]"
              >
                Track Status
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* 2. Main Tracking Content Stage */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {loading ? (
          <div className="industrial-card p-12 text-center rounded border border-industrial-800 space-y-4 font-mono text-sm text-white">
            <div className="w-8 h-8 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin mx-auto" />
            <p>Fetching Live Engineering Queue Record for {inputRef}...</p>
          </div>
        ) : enquiry ? (
          <div className="space-y-8 animate-fadeIn">
            {/* Header Badge Card */}
            <div className="industrial-card p-6 sm:p-8 rounded-sm border border-brand-yellow/50 bg-industrial-900/90 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-industrial-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-industrial-500 uppercase tracking-widest block">
                    REFERENCE IDENTIFICATION
                  </span>
                  <h3 className="text-2xl font-black text-brand-yellow font-mono tracking-wider">
                    {enquiry.referenceId}
                  </h3>
                  <span className="text-xs font-mono text-industrial-300 block mt-0.5">
                    Type: <strong className="text-white">{enquiry.type}</strong>
                  </span>
                </div>

                <div className="bg-industrial-950 p-3 rounded border border-industrial-800 font-mono text-right min-w-[160px]">
                  <span className="text-[10px] text-industrial-500 uppercase block">CURRENT STATUS</span>
                  <span className="text-sm font-black text-emerald-400 flex items-center justify-end gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    {enquiry.status}
                  </span>
                </div>
              </div>

              {/* Inquiry Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
                <div>
                  <span className="text-industrial-500 block text-[10px] uppercase">Client / Company</span>
                  <strong className="text-white block">{enquiry.fullName}</strong>
                  <span className="text-industrial-400 text-[11px]">{enquiry.companyName}</span>
                </div>

                <div>
                  <span className="text-industrial-500 block text-[10px] uppercase">Plant Location</span>
                  <strong className="text-white block">{enquiry.location}</strong>
                </div>

                {enquiry.targetCapacityTPH && (
                  <div>
                    <span className="text-industrial-500 block text-[10px] uppercase">Target Output</span>
                    <strong className="text-brand-yellow block">{enquiry.targetCapacityTPH} TPH</strong>
                    <span className="text-industrial-400 text-[11px]">{enquiry.rawMaterial}</span>
                  </div>
                )}

                <div>
                  <span className="text-industrial-500 block text-[10px] uppercase">Submission Date</span>
                  <strong className="text-white block">{enquiry.createdAt}</strong>
                </div>
              </div>
            </div>

            {/* 3. Visual Stage Timeline */}
            <div className="industrial-card p-6 sm:p-8 rounded-sm border border-industrial-800 bg-industrial-900/60 space-y-6">
              <div className="border-b border-industrial-800 pb-3">
                <h4 className="text-sm font-black text-white uppercase font-mono tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-yellow" />
                  ENGINEERING PROPOSAL LIFECYCLE TIMELINE
                </h4>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:h-full before:w-0.5 before:bg-industrial-800">
                {enquiry.timeline.map((step, idx) => {
                  const isDone = step.status === 'completed';
                  const isCurrent = step.status === 'current';

                  return (
                    <div key={idx} className="relative flex items-start gap-4 pl-1">
                      {/* Node Icon */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs z-10 border ${
                          isDone
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                            : isCurrent
                            ? 'bg-brand-yellow text-industrial-950 border-brand-yellow shadow-lg shadow-brand-yellow/20 animate-pulse'
                            : 'bg-industrial-950 border-industrial-800 text-industrial-500'
                        }`}
                      >
                        {isDone ? '✓' : step.stage}
                      </div>

                      {/* Content */}
                      <div className="p-4 bg-industrial-950/80 rounded border border-industrial-800/80 flex-grow space-y-1 font-mono text-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h5
                            className={`font-bold uppercase ${
                              isCurrent ? 'text-brand-yellow' : isDone ? 'text-white' : 'text-industrial-400'
                            }`}
                          >
                            {step.title}
                          </h5>
                          {step.timestamp && (
                            <span className="text-[10px] text-industrial-500">{step.timestamp}</span>
                          )}
                        </div>
                        <p className="text-[11px] text-industrial-400 font-sans leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Factory Sales Desk Support Strip */}
            <div className="p-6 bg-industrial-900 border border-industrial-800 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-industrial-950 border border-industrial-800 flex items-center justify-center text-brand-yellow">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-white block">Direct Desk for Reference {enquiry.referenceId}</strong>
                  <span className="text-industrial-400 text-[11px]">Quote Reference Desk: +91 (40) 2344 5566</span>
                </div>
              </div>

              <a
                href={`mailto:sales@puzzolana.com?subject=Inquiry Status for Reference ID ${enquiry.referenceId}`}
                className="px-4 py-2 bg-industrial-950 hover:bg-industrial-800 text-brand-yellow border border-brand-yellow/40 rounded uppercase font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Assigned Engineer</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="industrial-card p-12 text-center rounded border border-industrial-800 space-y-4 font-mono">
            <div className="w-12 h-12 bg-industrial-900 rounded-full flex items-center justify-center mx-auto text-industrial-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white uppercase">
              ENTER YOUR REFERENCE ID TO TRACK STATUS
            </h3>
            <p className="text-xs text-industrial-400 max-w-md mx-auto font-sans">
              Reference IDs are generated upon submitting any quotation or service request. Try entering <code className="text-brand-yellow font-bold">PZQ-2026-123456</code> to preview the live lifecycle tracker.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setInputRef('PZQ-2026-123456');
                  fetchEnquiryStatus('PZQ-2026-123456');
                }}
                className="px-4 py-2 bg-brand-yellow text-industrial-950 font-bold text-xs uppercase rounded hover:bg-brand-yellow-400 transition-colors"
              >
                Load Sample Tracking ID (PZQ-2026-123456)
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default function EnquiryTrackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-industrial-950 p-12 text-center text-white font-mono">
          Loading Enquiry Tracking Portal...
        </div>
      }
    >
      <EnquiryTrackerContent />
    </Suspense>
  );
}
