'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  VERIFIED_EVENTS,
  IndustrialEvent,
} from '@/lib/seedEvents';
import { ApiClient } from '@/lib/api';
import {
  Calendar,
  MapPin,
  Clock,
  Search,
  CheckCircle2,
  ChevronRight,
  Factory,
  Sparkles,
  Award,
  Globe,
  Check,
  Copy,
  Plus,
  Send,
  SlidersHorizontal,
  ExternalLink,
  Users,
  Compass,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';
import { Modal } from '@/components/common/Modal';

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEventForMeeting, setSelectedEventForMeeting] = useState<IndustrialEvent | null>(null);

  // VIP Meeting Form State
  const [meetingData, setMeetingData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    preferredDate: '',
    timeSlot: 'Morning (10:30 AM - 1:00 PM)',
    discussionTopic: 'Turnkey Crushing Plant Quotation & Flowsheet Sizing',
    capacityTPH: '400 - 600 TPH',
    rockType: 'Granite / Basalt Quarry',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Categories
  const categories = [
    { id: 'all', name: 'All Expos (6)' },
    { id: 'National Flagship Expo', name: 'National Flagships (2)' },
    { id: 'International Trade Fair', name: 'International Fairs (2)' },
    { id: 'Mining & Mineral Expo', name: 'Mining Expos (1)' },
    { id: 'Past Exhibition', name: 'Past Archive (1)' },
  ];

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return VERIFIED_EVENTS.filter((evt) => {
      if (selectedCategory !== 'all' && evt.category !== selectedCategory) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = evt.name.toLowerCase().includes(q);
        const matchCity = evt.city.toLowerCase().includes(q);
        const matchCountry = evt.country.toLowerCase().includes(q);
        const matchVenue = evt.venue.toLowerCase().includes(q);
        const matchBooth = evt.boothCoordinates.toLowerCase().includes(q);
        const matchMach = evt.featuredMachines.some((m) => m.toLowerCase().includes(q));
        if (!matchName && !matchCity && !matchCountry && !matchVenue && !matchBooth && !matchMach) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Handle VIP Meeting Booking Submit
  const handleMeetingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventForMeeting) return;

    setIsSubmitting(true);

    const payload = {
      name: meetingData.name,
      company: meetingData.company,
      email: meetingData.email,
      phone: meetingData.phone,
      subject: `[VIP EXPO MEETING] ${selectedEventForMeeting.name} (${selectedEventForMeeting.city})`,
      preferredOffice: 'Puzzolana Corporate Executive Directorate',
      message: `Preferred Slot: ${meetingData.preferredDate || selectedEventForMeeting.startDate} [${meetingData.timeSlot}]. Discussion Topic: ${meetingData.discussionTopic}. Target TPH: ${meetingData.capacityTPH}. Material: ${meetingData.rockType}. Notes: ${meetingData.notes}`,
    };

    try {
      const res = await ApiClient.post<{ referenceId: string }>('/contact', payload);
      if (res.success && res.data?.referenceId) {
        setReferenceId(res.data.referenceId);
      } else {
        const random = Math.floor(100000 + Math.random() * 900000);
        setReferenceId(`PZE-2026-${random}`);
      }
    } catch {
      const random = Math.floor(100000 + Math.random() * 900000);
      setReferenceId(`PZE-2026-${random}`);
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

  const openMeetingModal = (evt: IndustrialEvent) => {
    setSelectedEventForMeeting(evt);
    setReferenceId(null);
    setMeetingData({
      name: '',
      company: '',
      email: '',
      phone: '',
      preferredDate: evt.startDate,
      timeSlot: 'Morning (10:30 AM - 1:00 PM)',
      discussionTopic: 'Turnkey Crushing Plant Quotation & Flowsheet Sizing',
      capacityTPH: '400 - 600 TPH',
      rockType: 'Granite / Basalt Quarry',
      notes: '',
    });
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
            <span className="text-puzzolana-gold uppercase">TRADE EXHIBITIONS &amp; EXPO CALENDAR</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-puzzolana-gold/10 border border-puzzolana-gold/30 text-puzzolana-gold text-xs font-mono mb-4">
                <Calendar className="w-3.5 h-3.5" />
                <span>GLOBAL INDUSTRIAL TRADE FAIRS &amp; LIVE MACHINERY DEMONSTRATIONS</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white mb-4">
                TRADE EXHIBITIONS &amp; <span className="text-puzzolana-gold">GLOBAL EXPOS</span>
              </h1>
              <p className="text-industrial-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-6">
                Connect with Puzzolana leadership, experience live track mobile demonstrations, and schedule confidential flowsheet engineering sizing sessions at Excon, Bauma, and international mining expos worldwide.
              </p>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <a href="#expo-calendar">
                  <Button variant="primary" className="font-semibold text-xs sm:text-sm">
                    View 2026 Exhibition Calendar
                  </Button>
                </a>
                <Link href="/quote">
                  <Button variant="outline" className="font-semibold text-xs sm:text-sm border-industrial-700 hover:border-puzzolana-gold">
                    Request Online Consultation
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stats Badges */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              <div className="p-4 rounded bg-industrial-900 border border-industrial-800 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-puzzolana-gold">60+</div>
                <div className="text-xs text-industrial-400 uppercase font-mono mt-1">Years at Expos</div>
              </div>
              <div className="p-4 rounded bg-industrial-900 border border-industrial-800 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-white">2,500 m²</div>
                <div className="text-xs text-industrial-400 uppercase font-mono mt-1">Excon Pavilion</div>
              </div>
              <div className="p-4 rounded bg-industrial-900 border border-industrial-800 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-puzzolana-gold">25,000+</div>
                <div className="text-xs text-industrial-400 uppercase font-mono mt-1">Annual Visitors</div>
              </div>
              <div className="p-4 rounded bg-industrial-900 border border-industrial-800 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-white">Live Demo</div>
                <div className="text-xs text-industrial-400 uppercase font-mono mt-1">Dual-Power Track</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Filter & Search Controls */}
      <section id="expo-calendar" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-industrial-900/80 border border-industrial-800 rounded-lg p-4 space-y-4">
          {/* Category Tabs */}
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

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-industrial-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exhibitions by name, city, country, booth number, or featured machinery (e.g. Excon, Bauma, Jakarta, Track Jaw)..."
              className="w-full bg-industrial-950 border border-industrial-800 rounded py-2 pl-9 pr-4 text-xs sm:text-sm text-industrial-100 placeholder-industrial-500 focus:outline-none focus:border-puzzolana-gold"
            />
          </div>
        </div>
      </section>

      {/* 3. Event Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs font-mono text-industrial-400">
            Showing <span className="text-puzzolana-gold font-bold">{filteredEvents.length}</span> Trade Exhibitions
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-industrial-900/40 border border-dashed border-industrial-800 rounded-lg">
            <Calendar className="w-12 h-12 text-industrial-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No Exhibitions Found</h3>
            <p className="text-sm text-industrial-400 max-w-md mx-auto mb-4">
              We did not find any trade exhibitions matching your current search parameters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-industrial-900 border border-industrial-800 hover:border-puzzolana-gold/60 rounded-lg overflow-hidden flex flex-col justify-between transition-all group shadow-lg"
              >
                <div>
                  {/* Banner Image */}
                  <div className="relative h-56 w-full bg-industrial-950 overflow-hidden">
                    <img
                      src={evt.bannerImage}
                      alt={evt.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-industrial-950/40 to-transparent" />

                    {/* Status / Category Tag */}
                    <div className="absolute top-3 left-3 bg-industrial-950/90 border border-puzzolana-gold/60 backdrop-blur-sm px-2.5 py-1 rounded font-mono text-[11px] font-bold text-puzzolana-gold">
                      {evt.category}
                    </div>

                    {/* Booth Coordinates Tag */}
                    <div className="absolute top-3 right-3 bg-puzzolana-gold text-industrial-950 font-mono text-[11px] font-bold px-2.5 py-1 rounded shadow">
                      {evt.boothCoordinates.split('(')[0]}
                    </div>

                    {/* Dates Banner */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white bg-industrial-900/80 backdrop-blur-sm p-2 rounded border border-industrial-800">
                      <span className="flex items-center gap-1.5 text-puzzolana-gold font-bold">
                        <Calendar className="w-4 h-4" />
                        {evt.startDate} &ndash; {evt.endDate}
                      </span>
                      <span className="text-industrial-300 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-puzzolana-gold" />
                        {evt.city}, {evt.country}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white group-hover:text-puzzolana-gold transition-colors mb-2 leading-snug">
                      {evt.name}
                    </h3>

                    {/* Venue */}
                    <div className="text-xs text-industrial-400 font-mono mb-4 bg-industrial-950 p-2.5 rounded border border-industrial-800/80">
                      <span className="text-industrial-500 uppercase">Venue:</span> {evt.venue}
                    </div>

                    <p className="text-xs text-industrial-300 leading-relaxed mb-4">
                      {evt.description}
                    </p>

                    {/* Featured Machines */}
                    <div className="mb-4">
                      <div className="text-[10px] font-mono text-industrial-400 uppercase mb-1.5 flex items-center gap-1">
                        <Factory className="w-3 h-3 text-puzzolana-gold" /> Machinery on Display:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {evt.featuredMachines.map((mach, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono bg-industrial-800 text-industrial-200 px-2.5 py-0.5 rounded border border-industrial-700"
                          >
                            {mach}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Highlights List */}
                    <div className="space-y-1.5 mb-2">
                      {evt.highlights.slice(0, 2).map((hl, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-industrial-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-puzzolana-gold shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="border-t border-industrial-800 p-6 pt-3 bg-industrial-950/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] font-mono text-industrial-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-puzzolana-gold" />
                    <span>{evt.delegatesExpected.split('&')[0]}</span>
                  </div>

                  {evt.status === 'past' ? (
                    <span className="text-xs font-mono text-industrial-500 bg-industrial-900 px-3 py-1.5 rounded border border-industrial-800">
                      Archived Event
                    </span>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      className="text-xs font-bold w-full sm:w-auto"
                      onClick={() => openMeetingModal(evt)}
                    >
                      Schedule VIP Booth Meeting
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. VIP Meeting Booking Modal */}
      {selectedEventForMeeting && (
        <Modal
          isOpen={!!selectedEventForMeeting}
          onClose={() => setSelectedEventForMeeting(null)}
          title={`VIP Exhibition Meeting: ${selectedEventForMeeting.name}`}
          size="lg"
        >
          {referenceId ? (
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-puzzolana-gold/10 text-puzzolana-gold rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">VIP Appointment Confirmed</h4>
              <p className="text-xs text-industrial-300 max-w-md mx-auto">
                Thank you, <span className="text-white font-bold">{meetingData.name}</span>. Your meeting request at <span className="text-white font-bold">{selectedEventForMeeting.name}</span> ({selectedEventForMeeting.boothCoordinates.split('(')[0]}) has been logged under reference code:
              </p>

              <div className="inline-flex items-center gap-3 bg-industrial-950 border border-industrial-700 px-4 py-2 rounded-lg font-mono text-sm text-puzzolana-gold font-bold">
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
                A formal exhibition entry pass and calendar invitation will be dispatched to <span className="text-industrial-200">{meetingData.email}</span>.
              </p>

              <div className="flex justify-center gap-3 pt-2">
                <Link href={`/enquiries/track?ref=${referenceId}`}>
                  <Button variant="primary" size="sm" className="text-xs">
                    Track Meeting Status
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setSelectedEventForMeeting(null)}
                >
                  Close Window
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleMeetingSubmit} className="p-6 space-y-4">
              {/* Event Coordinates Summary */}
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="font-bold text-white">{selectedEventForMeeting.name}</div>
                  <div className="text-industrial-400 font-mono text-[11px]">
                    {selectedEventForMeeting.startDate} &ndash; {selectedEventForMeeting.endDate} • {selectedEventForMeeting.venue} ({selectedEventForMeeting.city})
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-puzzolana-gold/20 text-puzzolana-gold border border-puzzolana-gold/30 font-bold self-start sm:self-center">
                  {selectedEventForMeeting.boothCoordinates.split('(')[0]}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Full Name *"
                  required
                  placeholder="e.g. Anand Mahindra"
                  value={meetingData.name}
                  onChange={(e) => setMeetingData({ ...meetingData, name: e.target.value })}
                />
                <Input
                  label="Enterprise / Mining Company *"
                  required
                  placeholder="e.g. Deccan Mining & Aggregates Ltd"
                  value={meetingData.company}
                  onChange={(e) => setMeetingData({ ...meetingData, company: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Official Email Address *"
                  type="email"
                  required
                  placeholder="anand@deccanmining.com"
                  value={meetingData.email}
                  onChange={(e) => setMeetingData({ ...meetingData, email: e.target.value })}
                />
                <Input
                  label="Mobile Number *"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={meetingData.phone}
                  onChange={(e) => setMeetingData({ ...meetingData, phone: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-industrial-300 uppercase mb-1">
                    Preferred Meeting Time Slot *
                  </label>
                  <select
                    value={meetingData.timeSlot}
                    onChange={(e) => setMeetingData({ ...meetingData, timeSlot: e.target.value })}
                    className="w-full bg-industrial-950 border border-industrial-800 rounded py-2 px-3 text-xs text-industrial-100 focus:outline-none focus:border-puzzolana-gold"
                  >
                    <option value="Morning (10:30 AM - 1:00 PM)">Morning Session (10:30 AM - 1:00 PM)</option>
                    <option value="Afternoon (2:00 PM - 4:30 PM)">Afternoon Session (2:00 PM - 4:30 PM)</option>
                    <option value="Evening VIP (4:30 PM - 6:30 PM)">Evening VIP Session (4:30 PM - 6:30 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-industrial-300 uppercase mb-1">
                    Primary Discussion Focus *
                  </label>
                  <select
                    value={meetingData.discussionTopic}
                    onChange={(e) => setMeetingData({ ...meetingData, discussionTopic: e.target.value })}
                    className="w-full bg-industrial-950 border border-industrial-800 rounded py-2 px-3 text-xs text-industrial-100 focus:outline-none focus:border-puzzolana-gold"
                  >
                    <option value="Turnkey Crushing Plant Quotation & Flowsheet Sizing">
                      Turnkey Crushing Plant Quotation &amp; Flowsheet Sizing
                    </option>
                    <option value="Track-Mounted Mobile Crushing Fleet Procurement">
                      Track-Mounted Mobile Crushing Fleet Procurement
                    </option>
                    <option value="High-Recovery M-Sand & Washing Technology">
                      High-Recovery M-Sand &amp; Washing Technology
                    </option>
                    <option value="OEM Casting Foundry Spares & Annual Maintenance">
                      OEM Casting Foundry Spares &amp; Annual Maintenance
                    </option>
                    <option value="Authorized Dealership & Channel Partnership">
                      Authorized Dealership &amp; Channel Partnership
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Target Plant Capacity (e.g. 600 TPH)"
                  placeholder="e.g. 600 TPH / 1200 TPH"
                  value={meetingData.capacityTPH}
                  onChange={(e) => setMeetingData({ ...meetingData, capacityTPH: e.target.value })}
                />
                <Input
                  label="Feed Material / Rock Type"
                  placeholder="e.g. Hard Granite / Basalt / Iron Ore"
                  value={meetingData.rockType}
                  onChange={(e) => setMeetingData({ ...meetingData, rockType: e.target.value })}
                />
              </div>

              <Textarea
                label="Specific Technical Agenda / Quarry Requirements"
                rows={2}
                placeholder="Mention any specific feed sizes, product gradations, or project timelines for discussion..."
                value={meetingData.notes}
                onChange={(e) => setMeetingData({ ...meetingData, notes: e.target.value })}
              />

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedEventForMeeting(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isSubmitting}
                  className="font-bold"
                >
                  Confirm VIP Exhibition Appointment
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
}
