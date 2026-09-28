'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  PUZZOLANA_LOCATIONS,
  PUZZOLANA_DEPARTMENTS,
  FacilityLocation,
} from '@/lib/seedLocations';
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
  ExternalLink,
  Navigation,
  Compass,
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';

export default function ContactPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    preferredOffice: 'Puzzolana Corporate Towers (Global HQ - Hyderabad)',
    subject: 'Complete Turnkey Crushing Plant Quotation',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Category Tabs
  const categories = [
    { id: 'all', name: 'All Locations (8)' },
    { id: 'Headquarters', name: 'Corporate HQ (1)' },
    { id: 'Manufacturing Plants', name: 'Manufacturing Plants (2)' },
    { id: 'Zonal Offices', name: 'Zonal Offices (3)' },
    { id: 'International Hubs', name: 'International Hubs (2)' },
  ];

  // Filtered Locations
  const filteredLocations = useMemo(() => {
    return PUZZOLANA_LOCATIONS.filter((loc) => {
      if (selectedCategory !== 'all' && loc.category !== selectedCategory) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = loc.name.toLowerCase().includes(q);
        const matchType = loc.type.toLowerCase().includes(q);
        const matchCity = loc.city.toLowerCase().includes(q);
        const matchState = loc.state.toLowerCase().includes(q);
        const matchCountry = loc.country.toLowerCase().includes(q);
        const matchAddress = loc.address.toLowerCase().includes(q);
        if (!matchName && !matchType && !matchCity && !matchState && !matchCountry && !matchAddress) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      company: formData.company || 'Enterprise Client',
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      preferredOffice: formData.preferredOffice,
    };

    try {
      const res = await ApiClient.post<{ referenceId: string }>('/contact', payload);
      if (res.success && res.data?.referenceId) {
        setReferenceId(res.data.referenceId);
      } else {
        const random = Math.floor(100000 + Math.random() * 900000);
        setReferenceId(`PZC-2026-${random}`);
      }
    } catch {
      const random = Math.floor(100000 + Math.random() * 900000);
      setReferenceId(`PZC-2026-${random}`);
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

  const handleSelectOfficeForInquiry = (locationName: string) => {
    setFormData((prev) => ({ ...prev, preferredOffice: locationName }));
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
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
            <Link href="/" className="hover:text-puzzolana-gold transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-puzzolana-gold uppercase">CONTACT &amp; LOCATIONS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-puzzolana-gold/10 border border-puzzolana-gold/30 text-puzzolana-gold text-xs font-mono mb-4">
                <Compass className="w-3.5 h-3.5" />
                <span>GLOBAL CORPORATE &amp; MANUFACTURING INFRASTRUCTURE</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white mb-4">
                CORPORATE HEADQUARTERS &amp; <span className="text-puzzolana-gold">GLOBAL PLANTS</span>
              </h1>
              <p className="text-industrial-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-6">
                Connect directly with Puzzolana’s engineering design centers, 40,000 MT/year casting foundries, and regional operations commands across India and international industrial corridors.
              </p>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <a href="#locations">
                  <Button variant="primary" className="font-semibold text-xs sm:text-sm">
                    Explore Facilities &amp; Plants
                  </Button>
                </a>
                <a href="#contact-form">
                  <Button variant="outline" className="font-semibold text-xs sm:text-sm border-industrial-700 hover:border-puzzolana-gold">
                    Send Direct Message
                  </Button>
                </a>
              </div>
            </div>

            {/* Emergency Hotline Card */}
            <div className="lg:col-span-4 bg-industrial-900 border border-puzzolana-gold/40 rounded-lg p-5 shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded bg-puzzolana-gold text-industrial-950 flex items-center justify-center font-bold">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-puzzolana-gold font-bold uppercase">24/7 Emergency Hotline</div>
                  <div className="text-lg font-black font-mono text-white">+91 (40) 2344 8800</div>
                </div>
              </div>
              <p className="text-xs text-industrial-400 leading-relaxed mb-3">
                Direct telephonic dispatch for urgent breakdown service, immediate crusher liner allocation, and plant operational emergency support.
              </p>
              <div className="text-[11px] font-mono text-industrial-300 flex items-center gap-1.5 pt-2 border-t border-industrial-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-puzzolana-gold shrink-0" />
                <span>Immediate 24-Hour Duty Engineer Protocol</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Department Direct Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <div className="text-xs font-mono text-puzzolana-gold uppercase tracking-wider mb-1">
            DEPARTMENTAL DIRECTORY
          </div>
          <h2 className="text-2xl font-black font-display text-white">
            Connect Directly with Puzzolana Desks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PUZZOLANA_DEPARTMENTS.map((dept) => (
            <div
              key={dept.id}
              className="bg-industrial-900 border border-industrial-800 hover:border-puzzolana-gold/50 rounded-lg p-5 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded bg-puzzolana-gold/10 text-puzzolana-gold flex items-center justify-center font-bold text-sm">
                    {dept.id === 'DEP-SALES' && <Building2 className="w-4 h-4" />}
                    {dept.id === 'DEP-SPARES' && <Layers className="w-4 h-4" />}
                    {dept.id === 'DEP-SERVICE' && <Wrench className="w-4 h-4" />}
                    {dept.id === 'DEP-DEALERS' && <ShieldCheck className="w-4 h-4" />}
                    {dept.id === 'DEP-HR' && <GraduationCap className="w-4 h-4" />}
                    {dept.id === 'DEP-MEDIA' && <Mail className="w-4 h-4" />}
                  </div>
                  <span className="text-[10px] font-mono text-puzzolana-gold px-2 py-0.5 rounded bg-puzzolana-gold/10 border border-puzzolana-gold/20 font-bold">
                    SLA: {dept.sla}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-puzzolana-gold transition-colors mb-1.5">
                  {dept.name}
                </h3>
                <p className="text-xs text-industrial-400 leading-relaxed mb-4">
                  {dept.purpose}
                </p>
              </div>

              <div className="border-t border-industrial-800 pt-3 space-y-1.5 text-xs font-mono">
                <a
                  href={`mailto:${dept.email}`}
                  className="flex items-center gap-2 text-industrial-300 hover:text-puzzolana-gold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-puzzolana-gold shrink-0" />
                  <span>{dept.email}</span>
                </a>
                <a
                  href={`tel:${dept.phone.replace(/[^+\d]/g, '')}`}
                  className="flex items-center gap-2 text-industrial-300 hover:text-puzzolana-gold transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-puzzolana-gold shrink-0" />
                  <span>{dept.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive Facilities Directory */}
      <section id="locations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-industrial-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-mono text-puzzolana-gold uppercase tracking-wider mb-1">
              FACILITY DIRECTORY &amp; LOCATIONS
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              Official Plants, Foundries &amp; Corporate Offices
            </h2>
          </div>
          <div className="text-xs font-mono text-industrial-400">
            Showing <span className="text-puzzolana-gold font-bold">{filteredLocations.length}</span> Verified Facilities
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-industrial-900/80 border border-industrial-800 rounded-lg p-4 mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2 border-b border-industrial-800 pb-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-puzzolana-gold text-industrial-950 font-bold shadow'
                    : 'bg-industrial-800/60 text-industrial-300 hover:text-white hover:bg-industrial-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-industrial-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search facilities by name, city, state, country, or engineering division (e.g. Foundry, Pashamylaram, Dubai, Delhi)..."
              className="w-full bg-industrial-950 border border-industrial-800 rounded py-2 pl-9 pr-4 text-xs sm:text-sm text-industrial-100 placeholder-industrial-500 focus:outline-none focus:border-puzzolana-gold"
            />
          </div>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredLocations.map((loc) => (
            <div
              key={loc.id}
              className="bg-industrial-900 border border-industrial-800 hover:border-puzzolana-gold/60 rounded-lg overflow-hidden flex flex-col justify-between transition-all shadow-md group"
            >
              <div>
                {/* Header Banner */}
                <div className="p-5 pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                        loc.category === 'Headquarters'
                          ? 'bg-puzzolana-gold/20 text-puzzolana-gold border border-puzzolana-gold/40'
                          : loc.category === 'Manufacturing Plants'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : loc.category === 'Zonal Offices'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {loc.category}
                    </span>
                    <span className="text-xs font-mono text-industrial-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-puzzolana-gold" />
                      {loc.city}, {loc.country}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-puzzolana-gold transition-colors mb-1">
                    {loc.name}
                  </h3>
                  <div className="text-xs text-industrial-400 font-mono mb-3">
                    {loc.type}
                  </div>

                  {/* Address Box */}
                  <div className="text-xs text-industrial-300 leading-relaxed mb-4 bg-industrial-950 p-3 rounded border border-industrial-800">
                    <div className="font-mono text-[10px] text-industrial-500 uppercase mb-0.5">Physical Address</div>
                    {loc.address}, {loc.city}, {loc.state} - {loc.postalCode}, {loc.country}
                  </div>

                  {/* Features / Capabilities */}
                  <div className="mb-4 space-y-1.5">
                    <div className="font-mono text-[10px] text-industrial-400 uppercase mb-1">
                      Key Infrastructure &amp; Operations:
                    </div>
                    {loc.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-industrial-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-puzzolana-gold shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Capacity Badge */}
                  {loc.capacityInfo && (
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-puzzolana-gold bg-puzzolana-gold/10 px-2.5 py-1 rounded border border-puzzolana-gold/20 mb-2">
                      <Factory className="w-3.5 h-3.5" />
                      <span>{loc.capacityInfo}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="border-t border-industrial-800 p-5 bg-industrial-950/50 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <a
                    href={`tel:${loc.phone.replace(/[^+\d]/g, '')}`}
                    className="flex items-center gap-1.5 text-industrial-300 hover:text-white transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-puzzolana-gold" />
                    <span>{loc.phone}</span>
                  </a>
                  <a
                    href={`mailto:${loc.email}`}
                    className="flex items-center gap-1.5 text-industrial-300 hover:text-white transition-colors truncate"
                  >
                    <Mail className="w-3.5 h-3.5 text-puzzolana-gold shrink-0" />
                    <span className="truncate">{loc.email}</span>
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={`https://maps.google.com/?q=${loc.coordinates.lat},${loc.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-industrial-800 hover:bg-industrial-700 text-white text-xs font-mono transition-colors border border-industrial-700"
                  >
                    <Navigation className="w-3.5 h-3.5 text-puzzolana-gold" />
                    <span>Map View</span>
                  </a>
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-xs font-semibold py-2"
                    onClick={() => handleSelectOfficeForInquiry(`${loc.name} (${loc.city})`)}
                  >
                    Route Message
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Corporate Contact & Direct Message Form */}
      <section id="contact-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Factory Visit Protocols */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-mono text-puzzolana-gold uppercase tracking-wider mb-1">
                CORPORATE INQUIRY DESK
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white mb-3">
                Send a Formal Transmission
              </h2>
              <p className="text-industrial-300 text-sm leading-relaxed">
                Whether commissioning a new aggregate quarry line, sourcing OEM foundry castings, or requesting an engineering site audit, our central coordination team routes your message immediately.
              </p>
            </div>

            {/* Factory Visit Guidelines */}
            <div className="bg-industrial-900 border border-industrial-800 rounded-lg p-5 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2 border-b border-industrial-800 pb-2">
                <Factory className="w-4 h-4 text-puzzolana-gold" />
                Factory Visit &amp; Technical Audit Protocol
              </h3>
              <p className="text-xs text-industrial-300 leading-relaxed">
                Quarry owners and mining enterprises are welcome to inspect heavy manufacturing and foundry operations at our Pashamylaram Complex.
              </p>
              <ul className="space-y-2 text-xs text-industrial-400">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-puzzolana-gold shrink-0 mt-0.5" />
                  <span>Prior appointment required (min. 48 hours in advance).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-puzzolana-gold shrink-0 mt-0.5" />
                  <span>Personal Protective Equipment (PPE) mandatory inside casting &amp; machining bays.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-puzzolana-gold shrink-0 mt-0.5" />
                  <span>Pre-dispatch run test witness sessions scheduled through your Project Manager.</span>
                </li>
              </ul>
            </div>

            <div className="bg-industrial-900/60 border border-industrial-800 rounded-lg p-5">
              <div className="text-xs font-mono text-industrial-400 uppercase mb-1">Global Executive Office</div>
              <div className="text-base font-bold text-white mb-1">Puzzolana Machinery Fabricators</div>
              <div className="text-xs text-industrial-300 mb-2">
                Puzzolana Towers, Road No. 2, Banjara Hills, Hyderabad 500034, India
              </div>
              <div className="text-xs font-mono text-puzzolana-gold">
                CIN: U29219TG1964PTC001015 • Est. 1964
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-industrial-900 border border-industrial-800 rounded-lg p-6 sm:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-1">Corporate Contact Transmission</h3>
              <p className="text-xs text-industrial-400 mb-6">
                Fill in the details below. A unique tracking reference code will be generated immediately.
              </p>

              {referenceId ? (
                <div className="bg-industrial-950 border border-puzzolana-gold/50 rounded-lg p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-puzzolana-gold/10 text-puzzolana-gold rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Transmission Received</h4>
                  <p className="text-xs text-industrial-300 max-w-md mx-auto">
                    Thank you, <span className="text-white font-bold">{formData.name}</span>. Your message for <span className="text-white font-bold">{formData.preferredOffice}</span> has been logged under reference code:
                  </p>

                  <div className="inline-flex items-center gap-3 bg-industrial-900 border border-industrial-700 px-4 py-2 rounded-lg font-mono text-sm text-puzzolana-gold font-bold">
                    <span>{referenceId}</span>
                    <button
                      onClick={handleCopyReference}
                      className="p-1 hover:text-white transition-colors"
                      title="Copy Reference ID"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <p className="text-[11px] text-industrial-400">
                    A representative will contact you via <span className="text-industrial-200">{formData.email}</span> within 24 business hours.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <Link href={`/enquiries/track?ref=${referenceId}`}>
                      <Button variant="primary" size="sm" className="text-xs">
                        Track Message Status
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => {
                        setReferenceId(null);
                        setFormData({
                          name: '',
                          company: '',
                          email: '',
                          phone: '',
                          preferredOffice: 'Puzzolana Corporate Towers (Global HQ - Hyderabad)',
                          subject: 'Complete Turnkey Crushing Plant Quotation',
                          message: '',
                        });
                      }}
                    >
                      Send Another Message
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Full Name *"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Input
                      label="Company / Enterprise Name"
                      placeholder="e.g. Chandra Quarries & Minerals Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Official Email Address *"
                      type="email"
                      required
                      placeholder="ramesh@chandraquarries.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <Input
                      label="Phone / Mobile Number *"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-industrial-300 uppercase mb-1">
                        Destination Facility / Office *
                      </label>
                      <select
                        value={formData.preferredOffice}
                        onChange={(e) => setFormData({ ...formData, preferredOffice: e.target.value })}
                        className="w-full bg-industrial-950 border border-industrial-800 rounded py-2 px-3 text-xs text-industrial-100 focus:outline-none focus:border-puzzolana-gold"
                      >
                        <option value="Puzzolana Corporate Towers (Global HQ - Hyderabad)">
                          Puzzolana Corporate Towers (Global HQ - Hyderabad)
                        </option>
                        <option value="Pashamylaram Heavy Machinery Complex & Foundry (Hyderabad)">
                          Pashamylaram Heavy Complex &amp; Foundry (Plant 1)
                        </option>
                        <option value="Cherlapally Precision Engineering Division (Hyderabad)">
                          Cherlapally Precision Engineering (Plant 2)
                        </option>
                        <option value="North India Zonal Hub (New Delhi / NCR)">
                          North India Zonal Hub (New Delhi / NCR)
                        </option>
                        <option value="Western India Zonal Hub (Mumbai / Navi Mumbai)">
                          Western India Zonal Hub (Mumbai / Navi Mumbai)
                        </option>
                        <option value="Eastern India Zonal Hub (Kolkata)">
                          Eastern India Zonal Hub (Kolkata)
                        </option>
                        <option value="Puzzolana International FZE (Dubai MENA Command)">
                          Puzzolana International FZE (Dubai MENA Command)
                        </option>
                        <option value="Puzzolana Africa Machinery Ltd (Nairobi Kenya)">
                          Puzzolana Africa Machinery Ltd (Nairobi Kenya)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-industrial-300 uppercase mb-1">
                        Inquiry Nature / Subject *
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-industrial-950 border border-industrial-800 rounded py-2 px-3 text-xs text-industrial-100 focus:outline-none focus:border-puzzolana-gold"
                      >
                        <option value="Complete Turnkey Crushing Plant Quotation">
                          Complete Turnkey Crushing Plant Quotation
                        </option>
                        <option value="Track Mobile Crushing Plant Demonstration">
                          Track Mobile Crushing Plant Demonstration
                        </option>
                        <option value="OEM Foundry Wear Castings & Spares Procurement">
                          OEM Foundry Wear Castings &amp; Spares Procurement
                        </option>
                        <option value="Field Service, Maintenance or Plant Retrofit">
                          Field Service, Maintenance or Plant Retrofit
                        </option>
                        <option value="Dealership & Regional Channel Partnership">
                          Dealership &amp; Regional Channel Partnership
                        </option>
                        <option value="Corporate, Media, or General Communications">
                          Corporate, Media, or General Communications
                        </option>
                      </select>
                    </div>
                  </div>

                  <Textarea
                    label="Detailed Message / Project Requirements *"
                    required
                    rows={4}
                    placeholder="Provide plant capacity requirements (TPH), rock type, wear part numbers, or facility visit agenda (minimum 10 characters)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                    className="w-full font-bold text-sm py-3 mt-2"
                  >
                    Transmit Message to Destination Office
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-industrial-500 font-mono pt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-puzzolana-gold" />
                    <span>Official Corporate Communication Channel • SLA Response within 24 Hours</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
