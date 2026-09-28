'use client';

import React from 'react';
import Link from 'next/link';
import { MultiStepRfqWizard } from '@/components/quote';
import {
  FileText,
  ChevronRight,
  ShieldCheck,
  Zap,
  PhoneCall,
  Mail,
  Clock,
  Sparkles,
  Building,
} from 'lucide-react';

export default function QuotePage() {
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
            <span className="text-brand-yellow font-bold uppercase">B2B REQUEST FOR QUOTATION</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-mono font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DIRECT FACTORY COMMERCIAL & ENGINEERING PORTAL</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
                ENTERPRISE <span className="text-brand-yellow">QUOTATION WIZARD</span>
              </h1>

              <p className="text-sm sm:text-base text-industrial-300 leading-relaxed font-sans">
                Submit your quarry and plant specifications to receive a formal commercial proposal, turnkey flowsheet drawings, and power consumption calculations from Puzzolana Engineering.
              </p>
            </div>

            {/* SLA Badges */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 font-mono text-xs">
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 min-w-[130px]">
                <span className="text-industrial-500 block text-[10px] uppercase">Response SLA</span>
                <strong className="text-sm font-black text-brand-yellow">&lt; 24 Hours</strong>
              </div>
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 min-w-[130px]">
                <span className="text-industrial-500 block text-[10px] uppercase">Quote Type</span>
                <strong className="text-sm font-black text-white">Direct OEM</strong>
              </div>
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 min-w-[130px]">
                <span className="text-industrial-500 block text-[10px] uppercase">Tracking</span>
                <strong className="text-sm font-black text-brand-yellow">Live PZQ ID</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Multi-Step RFQ Wizard */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <MultiStepRfqWizard />
      </section>

      {/* 3. Direct Contact Support Strip */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="p-6 bg-industrial-900 border border-industrial-800 rounded-sm grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-industrial-950 border border-industrial-800 flex items-center justify-center text-brand-yellow">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <span className="text-industrial-500 block text-[10px] uppercase">Factory Hotline</span>
              <strong className="text-white text-xs">+91 (40) 2344 5566 / 67</strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-industrial-950 border border-industrial-800 flex items-center justify-center text-brand-yellow">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-industrial-500 block text-[10px] uppercase">Direct Sales Desk</span>
              <strong className="text-brand-yellow text-xs">sales@puzzolana.com</strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-industrial-950 border border-industrial-800 flex items-center justify-center text-brand-yellow">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <span className="text-industrial-500 block text-[10px] uppercase">Headquarters</span>
              <strong className="text-white text-xs">Hyderabad, Telangana</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
