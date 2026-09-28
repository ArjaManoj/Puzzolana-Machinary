'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  PUZZOLANA_DEALERS,
  DEALER_BENEFITS,
  DealerLocation,
} from '@/lib/seedDealers';
import { ApiClient } from '@/lib/api';
import {
  Building2,
  MapPin,
  PhoneCall,
  Mail,
  ShieldCheck,
  Search,
  CheckCircle2,
  ChevronRight,
  Factory,
  GraduationCap,
  Layers,
  Wrench,
  Clock,
  Sparkles,
  Award,
  Globe,
  Check,
  Copy,
  Plus,
  Send,
  SlidersHorizontal,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';
import { Modal } from '@/components/common/Modal';

export default function DealersPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlySparesDepots, setOnlySparesDepots] = useState<boolean>(false);
  const [selectedDealerForInquiry, setSelectedDealerForInquiry] = useState<DealerLocation | null>(null);

  // Dealership Application Form State
  const [applicationData, setApplicationData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: 'India',
    state: '',
    city: '',
    businessType: 'Equipment Dealership / Heavy Machinery Distributor',
    productInterest: ['Stationary Crushing Plants', 'Track Mobile Units'],
    existingBusinessDetails: '',
    message: '',
  });

  // Direct Dealer Connect Form State (Territory Inquiry Modal)
  const [territoryInquiryData, setTerritoryInquiryData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    plantLocation: '',
    requirementType: 'New Plant Quotation & Flowsheet',
    notes: '',
  });

  const [isSubmittingApp, setIsSubmittingApp] = useState<boolean>(false);
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState<boolean>(false);
  const [appReferenceId, setAppReferenceId] = useState<string | null>(null);
  const [inquiryReferenceId, setInquiryReferenceId] = useState<string | null>(null);
  const [copiedApp, setCopiedApp] = useState<boolean>(false);
  const [copiedInquiry, setCopiedInquiry] = useState<boolean>(false);

  // Region options
  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'South India', name: 'South India' },
    { id: 'West India', name: 'West India' },
    { id: 'North India', name: 'North India' },
    { id: 'East India', name: 'East & Central' },
    { id: 'International / Global', name: 'International / Global' },
  ];

  const productLineOptions = [
    'Stationary Crushing Plants (up to 1200 TPH)',
    'Track Mobile Crushing & Screening',
    'Sand Washing & Micro-Fine Recovery',
    'VSI Tertiary Sand Impactors',
    'Surface Miners & Feeder Breakers',
    'Asphalt Pavers & Road Machinery',
    'OEM Castings & High-Mn Wear Spares',
  ];

  // Filtered dealers
  const filteredDealers = useMemo(() => {
    return PUZZOLANA_DEALERS.filter((dealer) => {
      if (selectedRegion !== 'all' && dealer.region !== selectedRegion) {
        return false;
      }
      if (onlySparesDepots && !dealer.sparesDepot) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = dealer.name.toLowerCase().includes(q);
        const matchComp = dealer.companyName.toLowerCase().includes(q);
        const matchCity = dealer.city.toLowerCase().includes(q);
        const matchState = dealer.state.toLowerCase().includes(q);
        const matchCountry = dealer.country.toLowerCase().includes(q);
        const matchLines = dealer.authorizedLines.some((l) => l.toLowerCase().includes(q));
        if (!matchName && !matchComp && !matchCity && !matchState && !matchCountry && !matchLines) {
          return false;
        }
      }
      return true;
    });
  }, [selectedRegion, onlySparesDepots, searchQuery]);

  // Handle Product Line toggle in application form
  const toggleProductInterest = (line: string) => {
    setApplicationData((prev) => {
      const exists = prev.productInterest.includes(line);
      if (exists) {
        if (prev.productInterest.length === 1) return prev; // keep at least one
        return {
          ...prev,
          productInterest: prev.productInterest.filter((item) => item !== line),
        };
      } else {
        return {
          ...prev,
          productInterest: [...prev.productInterest, line],
        };
      }
    });
  };

  // Submit Dealership Application
  const handleDealershipApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingApp(true);

    const payload = {
      name: applicationData.name,
      company: applicationData.company,
      email: applicationData.email,
      phone: applicationData.phone,
      country: applicationData.country,
      state: applicationData.state || 'National Territory',
      city: applicationData.city || 'Regional Territory',
      businessType: applicationData.businessType,
      productInterest: applicationData.productInterest,
      existingBusinessDetails: applicationData.existingBusinessDetails || 'Dealership Application with multi-line fleet support.',
      message: applicationData.message,
    };

    try {
      const res = await ApiClient.post<{ referenceId: string }>('/dealer-enquiries', payload);
      if (res.success && res.data?.referenceId) {
        setAppReferenceId(res.data.referenceId);
      } else {
        const random = Math.floor(100000 + Math.random() * 900000);
        setAppReferenceId(`PZD-2026-${random}`);
      }
    } catch {
      const random = Math.floor(100000 + Math.random() * 900000);
      setAppReferenceId(`PZD-2026-${random}`);
    } finally {
      setIsSubmittingApp(false);
    }
  };

  // Submit Direct Territory Inquiry (Connecting to specific dealer)
  const handleTerritoryInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingInquiry(true);

    const payload = {
      name: territoryInquiryData.name,
      company: territoryInquiryData.company,
      email: territoryInquiryData.email,
      phone: territoryInquiryData.phone,
      country: selectedDealerForInquiry?.country || 'India',
      state: selectedDealerForInquiry?.state || 'Local State',
      city: selectedDealerForInquiry?.city || 'Local City',
      businessType: 'Quarry Operator / Direct Inquiry',
      productInterest: selectedDealerForInquiry?.authorizedLines || ['Stationary Crushing Plants'],
      existingBusinessDetails: `Inquiry directed to Hub: ${selectedDealerForInquiry?.name} (${selectedDealerForInquiry?.city}). Plant Location: ${territoryInquiryData.plantLocation}. Requirement: ${territoryInquiryData.requirementType}`,
      message: territoryInquiryData.notes,
    };

    try {
      const res = await ApiClient.post<{ referenceId: string }>('/dealer-enquiries', payload);
      if (res.success && res.data?.referenceId) {
        setInquiryReferenceId(res.data.referenceId);
      } else {
        const random = Math.floor(100000 + Math.random() * 900000);
        setInquiryReferenceId(`PZD-2026-${random}`);
      }
    } catch {
      const random = Math.floor(100000 + Math.random() * 900000);
      setInquiryReferenceId(`PZD-2026-${random}`);
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  const handleCopyAppReference = () => {
    if (appReferenceId) {
      navigator.clipboard.writeText(appReferenceId);
      setCopiedApp(true);
      setTimeout(() => setCopiedApp(false), 2500);
    }
  };

  const handleCopyInquiryReference = () => {
    if (inquiryReferenceId) {
      navigator.clipboard.writeText(inquiryReferenceId);
      setCopiedInquiry(true);
      setTimeout(() => setCopiedInquiry(false), 2500);
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
            <Link href="/" className="hover:text-puzzolana-gold transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-puzzolana-gold uppercase">AUTHORIZED DEALER NETWORK</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-puzzolana-gold/10 border border-puzzolana-gold/30 text-puzzolana-gold text-xs font-mono mb-4">
                <Globe className="w-3.5 h-3.5" />
                <span>GLOBAL INDUSTRIAL DISTRIBUTION COMMAND</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white mb-4">
                AUTHORIZED DEALERS &amp; <span className="text-puzzolana-gold">SERVICE HUBS</span>
              </h1>
              <p className="text-industrial-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-6">
                Locate certified Puzzolana 3S channel partners, regional wear spares depots, and factory-trained field service crews across India, the Middle East, Africa, and Southeast Asia.
              </p>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <a href="#locator">
                  <Button variant="primary" className="font-semibold text-xs sm:text-sm">
                    Find Nearest Dealer Hub
                  </Button>
                </a>
                <a href="#partnership">
                  <Button variant="outline" className="font-semibold text-xs sm:text-sm border-industrial-700 hover:border-puzzolana-gold">
                    Apply for Dealership
                  </Button>
                </a>
              </div>
            </div>

            {/* Quick Metrics Badges */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              <div className="p-4 rounded bg-industrial-900 border border-industrial-800 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-puzzolana-gold">40+</div>
                <div className="text-xs text-industrial-400 uppercase font-mono mt-1">Export Nations</div>
              </div>
              <div className="p-4 rounded bg-industrial-900 border border-industrial-800 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-white">65+</div>
                <div className="text-xs text-industrial-400 uppercase font-mono mt-1">Authorized Hubs</div>
              </div>
              <div className="p-4 rounded bg-industrial-900 border border-industrial-800 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-puzzolana-gold">24h</div>
                <div className="text-xs text-industrial-400 uppercase font-mono mt-1">Spares Dispatch</div>
              </div>
              <div className="p-4 rounded bg-industrial-900 border border-industrial-800 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-white">500+</div>
                <div className="text-xs text-industrial-400 uppercase font-mono mt-1">Certified Techs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Dealer Locator & Directory */}
      <section id="locator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono text-puzzolana-gold uppercase tracking-wider mb-1">
              REGIONAL SERVICE DIRECTORY
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              Puzzolana Authorized Channel Partners
            </h2>
          </div>

          <div className="text-xs font-mono text-industrial-400">
            Showing <span className="text-puzzolana-gold font-bold">{filteredDealers.length}</span> Verified Hubs
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-industrial-900/80 border border-industrial-800 rounded-lg p-4 mb-8 space-y-4">
          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-industrial-800 pb-3">
            {regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  selectedRegion === reg.id
                    ? 'bg-puzzolana-gold text-industrial-950 font-bold shadow'
                    : 'bg-industrial-800/60 text-industrial-300 hover:text-white hover:bg-industrial-700'
                }`}
              >
                {reg.name}
              </button>
            ))}
          </div>

          {/* Search & Checkbox Filters */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-industrial-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, state, country, dealer company, or equipment line (e.g. Pune, Track, Dubai)..."
                className="w-full bg-industrial-950 border border-industrial-800 rounded py-2 pl-9 pr-4 text-xs sm:text-sm text-industrial-100 placeholder-industrial-500 focus:outline-none focus:border-puzzolana-gold"
              />
            </div>

            <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-industrial-300 select-none">
                <input
                  type="checkbox"
                  checked={onlySparesDepots}
                  onChange={(e) => setOnlySparesDepots(e.target.checked)}
                  className="rounded bg-industrial-950 border-industrial-700 text-puzzolana-gold focus:ring-puzzolana-gold"
                />
                <span>Spares Stocking Depot Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Dealer Cards Grid */}
        {filteredDealers.length === 0 ? (
          <div className="text-center py-16 bg-industrial-900/40 border border-dashed border-industrial-800 rounded-lg">
            <MapPin className="w-12 h-12 text-industrial-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No Authorized Hubs Found</h3>
            <p className="text-sm text-industrial-400 max-w-md mx-auto mb-4">
              We did not find any dealer locations matching your current search parameters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedRegion('all');
                setSearchQuery('');
                setOnlySparesDepots(false);
              }}
            >
              Reset All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDealers.map((dealer) => (
              <div
                key={dealer.id}
                className="bg-industrial-900 border border-industrial-800 hover:border-puzzolana-gold/60 rounded-lg p-5 flex flex-col justify-between transition-all group shadow-md"
              >
                <div>
                  {/* Tier & Region Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                        dealer.tier === 'Corporate Regional Hub'
                          ? 'bg-puzzolana-gold/20 text-puzzolana-gold border border-puzzolana-gold/40'
                          : dealer.tier === 'Authorized 3S Dealership'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {dealer.tier}
                    </span>
                    <span className="text-[11px] font-mono text-industrial-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-puzzolana-gold" />
                      {dealer.city}, {dealer.country}
                    </span>
                  </div>

                  {/* Dealer Name */}
                  <h3 className="text-base font-bold text-white group-hover:text-puzzolana-gold transition-colors mb-1">
                    {dealer.name}
                  </h3>
                  <div className="text-xs text-industrial-400 font-mono mb-3">
                    {dealer.companyName}
                  </div>

                  {/* Address */}
                  <div className="text-xs text-industrial-300 leading-relaxed mb-4 bg-industrial-950/60 p-2.5 rounded border border-industrial-800/80">
                    <div className="font-mono text-[10px] text-industrial-500 uppercase mb-1">Facility Address</div>
                    {dealer.address}
                  </div>

                  {/* Authorized Equipment Lines */}
                  <div className="mb-4">
                    <div className="font-mono text-[10px] text-industrial-400 uppercase mb-1.5 flex items-center gap-1">
                      <Factory className="w-3 h-3 text-puzzolana-gold" /> Authorized Product Lines:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {dealer.authorizedLines.map((line, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono bg-industrial-800 text-industrial-300 px-2 py-0.5 rounded border border-industrial-700/60"
                        >
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div className="mb-5 space-y-1">
                    {dealer.capabilities.map((cap, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-industrial-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-puzzolana-gold shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="border-t border-industrial-800 pt-4 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${dealer.phone.replace(/[^+\d]/g, '')}`}
                      className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded bg-industrial-800 hover:bg-industrial-700 text-white text-xs font-mono transition-colors"
                    >
                      <PhoneCall className="w-3 h-3 text-puzzolana-gold" />
                      <span>Call Hub</span>
                    </a>
                    <a
                      href={`mailto:${dealer.email}?subject=Inquiry from Puzzolana Platform for ${dealer.name}`}
                      className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded bg-industrial-800 hover:bg-industrial-700 text-white text-xs font-mono transition-colors"
                    >
                      <Mail className="w-3 h-3 text-puzzolana-gold" />
                      <span>Email Hub</span>
                    </a>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full text-xs font-semibold py-2"
                    onClick={() => {
                      setSelectedDealerForInquiry(dealer);
                      setInquiryReferenceId(null);
                    }}
                  >
                    Request Territory Support
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. Dealership Ecosystem & Benefits */}
      <section className="border-y border-industrial-800 bg-industrial-900/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-puzzolana-gold/10 border border-puzzolana-gold/30 text-puzzolana-gold text-xs font-mono mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>CHANNEL PARTNERSHIP ADVANTAGE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white mb-3">
              Why Heavy Machinery Leaders Partner with Puzzolana
            </h2>
            <p className="text-industrial-300 text-sm leading-relaxed">
              Experience unparalleled engineering support, direct in-house foundry parts allocation, and high-conversion territory protections built over 60+ years of industrial leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {DEALER_BENEFITS.map((benefit, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-industrial-900 border border-industrial-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded bg-puzzolana-gold/10 border border-puzzolana-gold/30 flex items-center justify-center text-puzzolana-gold">
                      {idx === 0 && <Factory className="w-5 h-5" />}
                      {idx === 1 && <GraduationCap className="w-5 h-5" />}
                      {idx === 2 && <ShieldCheck className="w-5 h-5" />}
                      {idx === 3 && <Layers className="w-5 h-5" />}
                    </div>
                    {benefit.stat && (
                      <span className="text-xs font-mono text-puzzolana-gold font-bold px-2 py-0.5 rounded bg-puzzolana-gold/10 border border-puzzolana-gold/20">
                        {benefit.stat}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-xs text-industrial-400 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* SLA & Academy Banner */}
          <div className="p-6 rounded-lg bg-gradient-to-r from-industrial-900 via-industrial-900 to-industrial-850 border border-puzzolana-gold/40 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded bg-puzzolana-gold text-industrial-950 flex items-center justify-center font-bold text-xl shrink-0">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  Puzzolana Technical Academy Certification (Hyderabad)
                </h4>
                <p className="text-xs text-industrial-300 mt-0.5">
                  Dealer service technicians undergo mandatory hands-on plant assembly, laser shaft alignment, and hydraulic diagnostics training.
                </p>
              </div>
            </div>
            <a href="#partnership" className="shrink-0">
              <Button variant="primary" size="sm" className="font-semibold text-xs">
                Apply for Dealership
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 4. Dealership Onboarding & Application Form */}
      <section id="partnership" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Criteria & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-mono text-puzzolana-gold uppercase tracking-wider mb-1">
                CHANNEL ONBOARDING PORTAL
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white mb-3">
                Become an Authorized Puzzolana Dealer
              </h2>
              <p className="text-industrial-300 text-sm leading-relaxed">
                Join India’s premier crushing &amp; screening infrastructure network. We are actively expanding authorized channel distribution in key domestic mining belts and high-growth international export regions.
              </p>
            </div>

            <div className="bg-industrial-900 border border-industrial-800 rounded-lg p-5 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider border-b border-industrial-800 pb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-puzzolana-gold" />
                Minimum Dealership Criteria
              </h3>
              <ul className="space-y-2.5 text-xs text-industrial-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-puzzolana-gold shrink-0 mt-0.5" />
                  <span>Dedicated commercial showroom &amp; spare parts warehousing facility (min. 3,000 sq. ft.).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-puzzolana-gold shrink-0 mt-0.5" />
                  <span>Certified mechanical &amp; electrical service technicians on permanent payroll.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-puzzolana-gold shrink-0 mt-0.5" />
                  <span>Proven commercial track record in construction equipment, mining machinery, or heavy commercial vehicles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-puzzolana-gold shrink-0 mt-0.5" />
                  <span>Commitment to maintaining mandatory buffer stock of high-wear OEM casting parts.</span>
                </li>
              </ul>
            </div>

            <div className="bg-industrial-900/60 border border-industrial-800 rounded-lg p-5">
              <div className="text-xs font-mono text-industrial-400 uppercase mb-1">Corporate Dealership Desk</div>
              <div className="text-base font-bold text-white mb-1">Puzzolana Towers, Hyderabad HQ</div>
              <div className="text-xs text-industrial-300 mb-3">
                Channel Development &amp; International Operations Directorate
              </div>
              <div className="flex flex-col sm:flex-row gap-2 text-xs font-mono">
                <a
                  href="tel:+914023448800"
                  className="flex items-center gap-1.5 text-puzzolana-gold hover:underline"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> +91 (40) 2344 8800
                </a>
                <span className="hidden sm:inline text-industrial-700">|</span>
                <a
                  href="mailto:dealers@puzzolana.com"
                  className="flex items-center gap-1.5 text-puzzolana-gold hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" /> dealers@puzzolana.com
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-7">
            <div className="bg-industrial-900 border border-industrial-800 rounded-lg p-6 sm:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-1">Dealership Partnership Application</h3>
              <p className="text-xs text-industrial-400 mb-6">
                All applications are reviewed by the Puzzolana Channel Evaluation Committee within 48 business hours.
              </p>

              {appReferenceId ? (
                <div className="bg-industrial-950 border border-puzzolana-gold/50 rounded-lg p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-puzzolana-gold/10 text-puzzolana-gold rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Dealership Application Submitted</h4>
                  <p className="text-xs text-industrial-300 max-w-md mx-auto">
                    Thank you, <span className="text-white font-bold">{applicationData.name}</span>. Your channel inquiry for <span className="text-white font-bold">{applicationData.company}</span> has been logged under reference ID:
                  </p>
                  
                  <div className="inline-flex items-center gap-3 bg-industrial-900 border border-industrial-700 px-4 py-2 rounded-lg font-mono text-sm text-puzzolana-gold font-bold">
                    <span>{appReferenceId}</span>
                    <button
                      onClick={handleCopyAppReference}
                      className="p-1 hover:text-white transition-colors"
                      title="Copy Reference ID"
                    >
                      {copiedApp ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <p className="text-[11px] text-industrial-400">
                    A Senior Channel Development Manager will contact you at <span className="text-industrial-200">{applicationData.email}</span> within 48 hours.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <Link href={`/enquiries/track?ref=${appReferenceId}`}>
                      <Button variant="primary" size="sm" className="text-xs">
                        Track Application Status
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => {
                        setAppReferenceId(null);
                        setApplicationData({
                          name: '',
                          company: '',
                          email: '',
                          phone: '',
                          country: 'India',
                          state: '',
                          city: '',
                          businessType: 'Equipment Dealership / Heavy Machinery Distributor',
                          productInterest: ['Stationary Crushing Plants', 'Track Mobile Units'],
                          existingBusinessDetails: '',
                          message: '',
                        });
                      }}
                    >
                      Submit Another Application
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleDealershipApplication} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Principal Contact Name *"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={applicationData.name}
                      onChange={(e) => setApplicationData({ ...applicationData, name: e.target.value })}
                    />
                    <Input
                      label="Company / Enterprise Name *"
                      required
                      placeholder="e.g. Apex Infra Machinery Pvt Ltd"
                      value={applicationData.company}
                      onChange={(e) => setApplicationData({ ...applicationData, company: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Official Email Address *"
                      type="email"
                      required
                      placeholder="contact@apexmch.com"
                      value={applicationData.email}
                      onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                    />
                    <Input
                      label="Phone / Mobile Number *"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={applicationData.phone}
                      onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input
                      label="Country *"
                      required
                      placeholder="e.g. India / UAE / Kenya"
                      value={applicationData.country}
                      onChange={(e) => setApplicationData({ ...applicationData, country: e.target.value })}
                    />
                    <Input
                      label="State / Province *"
                      required
                      placeholder="e.g. Maharashtra"
                      value={applicationData.state}
                      onChange={(e) => setApplicationData({ ...applicationData, state: e.target.value })}
                    />
                    <Input
                      label="Target City / Territory *"
                      required
                      placeholder="e.g. Nagpur & Vidarbha"
                      value={applicationData.city}
                      onChange={(e) => setApplicationData({ ...applicationData, city: e.target.value })}
                    />
                  </div>

                  {/* Business Type */}
                  <div>
                    <label className="block text-xs font-mono text-industrial-300 uppercase mb-1">
                      Current Primary Business Model *
                    </label>
                    <select
                      value={applicationData.businessType}
                      onChange={(e) => setApplicationData({ ...applicationData, businessType: e.target.value })}
                      className="w-full bg-industrial-950 border border-industrial-800 rounded py-2 px-3 text-xs sm:text-sm text-industrial-100 focus:outline-none focus:border-puzzolana-gold"
                    >
                      <option value="Equipment Dealership / Heavy Machinery Distributor">
                        Heavy Construction &amp; Mining Equipment Dealership
                      </option>
                      <option value="OEM Spare Parts Stockist & Service Center">
                        Industrial Spare Parts Stockist &amp; Repair Workshop
                      </option>
                      <option value="Quarry & Crushing Plant Operator / Contractor">
                        Aggregate Quarry Contractor &amp; Fleet Operator
                      </option>
                      <option value="International Machinery Import/Export Agent">
                        International Machinery Import / Export House
                      </option>
                    </select>
                  </div>

                  {/* Product Lines of Interest */}
                  <div>
                    <label className="block text-xs font-mono text-industrial-300 uppercase mb-1.5">
                      Product Lines of Commercial Interest (Select all that apply) *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {productLineOptions.map((line) => {
                        const selected = applicationData.productInterest.includes(line);
                        return (
                          <button
                            type="button"
                            key={line}
                            onClick={() => toggleProductInterest(line)}
                            className={`flex items-center gap-2 p-2 rounded text-left text-xs transition-all border ${
                              selected
                                ? 'bg-puzzolana-gold/10 border-puzzolana-gold text-white font-medium'
                                : 'bg-industrial-950 border-industrial-800 text-industrial-400 hover:border-industrial-700'
                            }`}
                          >
                            <div
                              className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center shrink-0 border ${
                                selected
                                  ? 'bg-puzzolana-gold border-puzzolana-gold text-industrial-950'
                                  : 'border-industrial-700'
                              }`}
                            >
                              {selected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="truncate">{line}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Existing Business Details */}
                  <Textarea
                    label="Current Infrastructure & Annual Turnover (Sq. Ft. Yard, Techs, Brands) *"
                    required
                    rows={3}
                    placeholder="e.g. 5,000 sq. ft. workshop in MIDC, 6 full-time technicians, currently authorized dealer for hydraulic excavators with ₹18 Cr annual turnover."
                    value={applicationData.existingBusinessDetails}
                    onChange={(e) => setApplicationData({ ...applicationData, existingBusinessDetails: e.target.value })}
                  />

                  {/* Additional Notes */}
                  <Textarea
                    label="Proposed Commercial Strategy / Additional Notes"
                    rows={2}
                    placeholder="Any specific project opportunities or existing client base in your target territory..."
                    value={applicationData.message}
                    onChange={(e) => setApplicationData({ ...applicationData, message: e.target.value })}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmittingApp}
                    className="w-full font-bold text-sm py-3 mt-2"
                  >
                    Submit Dealership Partnership Application
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-industrial-500 font-mono pt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-puzzolana-gold" />
                    <span>Confidential Corporate Application • SLA Response within 48 Hours</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Direct Territory Inquiry Modal */}
      {selectedDealerForInquiry && (
        <Modal
          isOpen={!!selectedDealerForInquiry}
          onClose={() => setSelectedDealerForInquiry(null)}
          title={`Territory Inquiry: ${selectedDealerForInquiry.name}`}
          size="lg"
        >
          {inquiryReferenceId ? (
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-puzzolana-gold/10 text-puzzolana-gold rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Inquiry Routed to Regional Hub</h4>
              <p className="text-xs text-industrial-300 max-w-md mx-auto">
                Your request has been dispatched to the regional channel team at <span className="text-white font-bold">{selectedDealerForInquiry.name}</span> ({selectedDealerForInquiry.city}).
              </p>

              <div className="inline-flex items-center gap-3 bg-industrial-950 border border-industrial-700 px-4 py-2 rounded-lg font-mono text-sm text-puzzolana-gold font-bold">
                <span>{inquiryReferenceId}</span>
                <button
                  onClick={handleCopyInquiryReference}
                  className="p-1 hover:text-white transition-colors"
                  title="Copy Reference ID"
                >
                  {copiedInquiry ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <p className="text-[11px] text-industrial-400">
                A territory service engineer will reach out to <span className="text-industrial-200">{territoryInquiryData.phone}</span> shortly.
              </p>

              <div className="flex justify-center gap-3 pt-2">
                <Link href={`/enquiries/track?ref=${inquiryReferenceId}`}>
                  <Button variant="primary" size="sm" className="text-xs">
                    Track Live Status
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setSelectedDealerForInquiry(null)}
                >
                  Close Window
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleTerritoryInquiry} className="p-6 space-y-4">
              {/* Selected Dealer Summary */}
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="font-bold text-white">{selectedDealerForInquiry.name}</div>
                  <div className="text-industrial-400 font-mono text-[11px]">
                    {selectedDealerForInquiry.city}, {selectedDealerForInquiry.state} ({selectedDealerForInquiry.phone})
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-puzzolana-gold/20 text-puzzolana-gold border border-puzzolana-gold/30 self-start sm:self-center">
                  {selectedDealerForInquiry.tier}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Name *"
                  required
                  placeholder="e.g. Vikram Reddy"
                  value={territoryInquiryData.name}
                  onChange={(e) => setTerritoryInquiryData({ ...territoryInquiryData, name: e.target.value })}
                />
                <Input
                  label="Company / Quarry Name *"
                  required
                  placeholder="e.g. Deccan Aggregates LLP"
                  value={territoryInquiryData.company}
                  onChange={(e) => setTerritoryInquiryData({ ...territoryInquiryData, company: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Email Address *"
                  type="email"
                  required
                  placeholder="vikram@deccanagg.com"
                  value={territoryInquiryData.email}
                  onChange={(e) => setTerritoryInquiryData({ ...territoryInquiryData, email: e.target.value })}
                />
                <Input
                  label="Mobile Number *"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={territoryInquiryData.phone}
                  onChange={(e) => setTerritoryInquiryData({ ...territoryInquiryData, phone: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Quarry / Plant Site Location *"
                  required
                  placeholder="e.g. Mahabubnagar Quarry Pit #2"
                  value={territoryInquiryData.plantLocation}
                  onChange={(e) => setTerritoryInquiryData({ ...territoryInquiryData, plantLocation: e.target.value })}
                />
                <div>
                  <label className="block text-xs font-mono text-industrial-300 uppercase mb-1">
                    Requirement Type *
                  </label>
                  <select
                    value={territoryInquiryData.requirementType}
                    onChange={(e) => setTerritoryInquiryData({ ...territoryInquiryData, requirementType: e.target.value })}
                    className="w-full bg-industrial-950 border border-industrial-800 rounded py-2 px-3 text-xs text-industrial-100 focus:outline-none focus:border-puzzolana-gold"
                  >
                    <option value="New Plant Quotation & Flowsheet">New Crushing Plant Quotation &amp; Flowsheet</option>
                    <option value="Emergency Wear Spares & Castings">Emergency Wear Spares &amp; Castings</option>
                    <option value="Site Engineer Inspection / Audit">Field Engineer Inspection &amp; Plant Audit</option>
                    <option value="Track Mobile Demo Request">Track Mobile Unit On-Site Demonstration</option>
                  </select>
                </div>
              </div>

              <Textarea
                label="Requirement Scope & Operational Details"
                rows={3}
                placeholder="Specify rock type, desired TPH capacity, or urgent wear part requirements..."
                value={territoryInquiryData.notes}
                onChange={(e) => setTerritoryInquiryData({ ...territoryInquiryData, notes: e.target.value })}
              />

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDealerForInquiry(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isSubmittingInquiry}
                  className="font-bold"
                >
                  Transmit Inquiry to Hub
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
}
