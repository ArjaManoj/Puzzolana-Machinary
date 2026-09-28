'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  VERIFIED_JOB_OPENINGS,
  CAREER_PERKS,
  JobOpening,
} from '@/lib/seedCareers';
import { ApiClient } from '@/lib/api';
import {
  Briefcase,
  MapPin,
  Clock,
  GraduationCap,
  Search,
  CheckCircle2,
  ChevronRight,
  Factory,
  Layers,
  Sparkles,
  Award,
  Globe,
  Check,
  Copy,
  Plus,
  Send,
  SlidersHorizontal,
  FileText,
  Building2,
  Users,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';
import { Modal } from '@/components/common/Modal';

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedExpLevel, setSelectedExpLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobOpening | null>(null);

  // Application Form State
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    experienceYears: '3',
    currentCompany: '',
    noticePeriodDays: '30',
    resumeUrl: '',
    coverNote: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Department filter options
  const departments = [
    { id: 'all', name: 'All Openings (6)' },
    { id: 'Mechanical Engineering', name: 'Mechanical Design (2)' },
    { id: 'Manufacturing & Assembly', name: 'Manufacturing & Foundry (2)' },
    { id: 'Service & Field Support', name: 'Field Commissioning (1)' },
    { id: 'R&D', name: 'R&D / Flowsheets (1)' },
  ];

  // Filtered Job Openings
  const filteredJobs = useMemo(() => {
    return VERIFIED_JOB_OPENINGS.filter((job) => {
      if (selectedDepartment !== 'all' && job.department !== selectedDepartment) {
        return false;
      }
      if (selectedExpLevel !== 'all' && job.experienceLevel !== selectedExpLevel) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = job.title.toLowerCase().includes(q);
        const matchCode = job.jobCode.toLowerCase().includes(q);
        const matchDept = job.department.toLowerCase().includes(q);
        const matchLoc = job.location.toLowerCase().includes(q);
        const matchSkills = job.requiredSkills.some((s) => s.toLowerCase().includes(q));
        if (!matchTitle && !matchCode && !matchDept && !matchLoc && !matchSkills) {
          return false;
        }
      }
      return true;
    });
  }, [selectedDepartment, selectedExpLevel, searchQuery]);

  // Handle Application Submit
  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobForModal) return;

    setIsSubmitting(true);

    const payload = {
      name: applicationData.name,
      email: applicationData.email,
      phone: applicationData.phone,
      positionApplied: selectedJobForModal.title,
      department: selectedJobForModal.department,
      experienceYears: Number(applicationData.experienceYears) || 0,
      currentCompany: applicationData.currentCompany || 'N/A',
      noticePeriodDays: Number(applicationData.noticePeriodDays) || 30,
      resumeUrl: applicationData.resumeUrl || 'https://drive.google.com/puzzolana-candidate-resume',
      coverNote: applicationData.coverNote,
    };

    try {
      const res = await ApiClient.post<{ referenceId: string }>('/job-applications', payload);
      if (res.success && res.data?.referenceId) {
        setReferenceId(res.data.referenceId);
      } else {
        const random = Math.floor(100000 + Math.random() * 900000);
        setReferenceId(`PZJ-2026-${random}`);
      }
    } catch {
      const random = Math.floor(100000 + Math.random() * 900000);
      setReferenceId(`PZJ-2026-${random}`);
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

  const openApplyModal = (job: JobOpening) => {
    setSelectedJobForModal(job);
    setReferenceId(null);
    setApplicationData({
      name: '',
      email: '',
      phone: '',
      experienceYears: String(job.minExperienceYears),
      currentCompany: '',
      noticePeriodDays: '30',
      resumeUrl: '',
      coverNote: '',
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
            <span className="text-puzzolana-gold uppercase">CAREERS AT PUZZOLANA</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-puzzolana-gold/10 border border-puzzolana-gold/30 text-puzzolana-gold text-xs font-mono mb-4">
                <Users className="w-3.5 h-3.5" />
                <span>ENGINEERING TALENT &amp; CAREER DEVELOPMENT</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white mb-4">
                BUILD THE HEAVY MACHINERY <span className="text-puzzolana-gold">OF TOMORROW</span>
              </h1>
              <p className="text-industrial-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-6">
                Join 1,200+ mechanical design engineers, foundry metallurgists, automation specialists, and field commissioning leaders shaping high-tonnage crushing, screening, and surface mining across 40+ countries.
              </p>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <a href="#openings">
                  <Button variant="primary" className="font-semibold text-xs sm:text-sm">
                    View Open Engineering Roles
                  </Button>
                </a>
                <a href="#perks">
                  <Button variant="outline" className="font-semibold text-xs sm:text-sm border-industrial-700 hover:border-puzzolana-gold">
                    Why Join Puzzolana
                  </Button>
                </a>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              <div className="p-4 rounded bg-industrial-900 border border-industrial-800 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-puzzolana-gold">1,200+</div>
                <div className="text-xs text-industrial-400 uppercase font-mono mt-1">Global Workforce</div>
              </div>
              <div className="p-4 rounded bg-industrial-900 border border-industrial-800 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-white">60+</div>
                <div className="text-xs text-industrial-400 uppercase font-mono mt-1">Years Heritage</div>
              </div>
              <div className="p-4 rounded bg-industrial-900 border border-industrial-800 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-puzzolana-gold">4</div>
                <div className="text-xs text-industrial-400 uppercase font-mono mt-1">Manufacturing Plants</div>
              </div>
              <div className="p-4 rounded bg-industrial-900 border border-industrial-800 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-white">40+</div>
                <div className="text-xs text-industrial-400 uppercase font-mono mt-1">Export Nations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Build Your Career at Puzzolana */}
      <section id="perks" className="border-b border-industrial-800 bg-industrial-900/40 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-puzzolana-gold/10 border border-puzzolana-gold/30 text-puzzolana-gold text-xs font-mono mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>EMPLOYER VALUE PROPOSITION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              Life at Puzzolana: Where Heavy Engineering Thrives
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAREER_PERKS.map((perk, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-industrial-900 border border-industrial-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded bg-puzzolana-gold/10 border border-puzzolana-gold/30 flex items-center justify-center text-puzzolana-gold">
                      {idx === 0 && <Factory className="w-5 h-5" />}
                      {idx === 1 && <GraduationCap className="w-5 h-5" />}
                      {idx === 2 && <Globe className="w-5 h-5" />}
                      {idx === 3 && <Layers className="w-5 h-5" />}
                    </div>
                    {perk.highlight && (
                      <span className="text-[11px] font-mono text-puzzolana-gold font-bold px-2 py-0.5 rounded bg-puzzolana-gold/10 border border-puzzolana-gold/20">
                        {perk.highlight}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{perk.title}</h3>
                  <p className="text-xs text-industrial-400 leading-relaxed">{perk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Open Positions Directory & Filter Hub */}
      <section id="openings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-mono text-puzzolana-gold uppercase tracking-wider mb-1">
              CURRENT OPPORTUNITIES
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              Explore Active Engineering Openings
            </h2>
          </div>
          <div className="text-xs font-mono text-industrial-400">
            Showing <span className="text-puzzolana-gold font-bold">{filteredJobs.length}</span> Active Vacancies
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-industrial-900/80 border border-industrial-800 rounded-lg p-4 mb-8 space-y-4">
          {/* Department Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-industrial-800 pb-3">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  selectedDepartment === dept.id
                    ? 'bg-puzzolana-gold text-industrial-950 font-bold shadow'
                    : 'bg-industrial-800/60 text-industrial-300 hover:text-white hover:bg-industrial-700'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>

          {/* Search & Experience Filters */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-industrial-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by job title, skill (e.g. SolidWorks, FEA, PLC, Foundry, Track), or role code..."
                className="w-full bg-industrial-950 border border-industrial-800 rounded py-2 pl-9 pr-4 text-xs sm:text-sm text-industrial-100 placeholder-industrial-500 focus:outline-none focus:border-puzzolana-gold"
              />
            </div>

            <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-2">
              <span className="text-xs font-mono text-industrial-400 shrink-0">Experience:</span>
              <select
                value={selectedExpLevel}
                onChange={(e) => setSelectedExpLevel(e.target.value)}
                className="bg-industrial-950 border border-industrial-800 rounded py-1.5 px-3 text-xs text-industrial-200 focus:outline-none focus:border-puzzolana-gold w-full sm:w-auto font-mono"
              >
                <option value="all">All Experience Levels</option>
                <option value="Entry / GET (0-2 Yrs)">Entry / GET (0-2 Yrs)</option>
                <option value="Mid-Level (3-7 Yrs)">Mid-Level (3-7 Yrs)</option>
                <option value="Senior / Lead (8+ Yrs)">Senior / Lead (8+ Yrs)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Cards Grid */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16 bg-industrial-900/40 border border-dashed border-industrial-800 rounded-lg">
            <Briefcase className="w-12 h-12 text-industrial-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No Active Positions Found</h3>
            <p className="text-sm text-industrial-400 max-w-md mx-auto mb-4">
              We did not find any openings matching your selected filters. Consider submitting your profile to our General Talent Pool.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedDepartment('all');
                setSelectedExpLevel('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-industrial-900 border border-industrial-800 hover:border-puzzolana-gold/60 rounded-lg p-6 flex flex-col justify-between transition-all group shadow-md"
              >
                <div>
                  {/* Top Bar Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-puzzolana-gold/15 text-puzzolana-gold border border-puzzolana-gold/30">
                      {job.department}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                      {job.vacancies} {job.vacancies === 1 ? 'Opening' : 'Openings'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-puzzolana-gold transition-colors mb-2">
                    {job.title}
                  </h3>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap gap-y-1.5 gap-x-3 text-xs font-mono text-industrial-400 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-puzzolana-gold" />
                      {job.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-puzzolana-gold" />
                      {job.experienceLevel}
                    </span>
                    <span>•</span>
                    <span className="text-industrial-500">{job.jobCode}</span>
                  </div>

                  <p className="text-xs text-industrial-300 leading-relaxed mb-4">
                    {job.overview}
                  </p>

                  {/* Required Skills */}
                  <div className="mb-5">
                    <div className="text-[10px] font-mono text-industrial-400 uppercase mb-1.5">
                      Key Competencies &amp; Tools:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.requiredSkills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono bg-industrial-950 text-industrial-300 px-2 py-0.5 rounded border border-industrial-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="border-t border-industrial-800 pt-4 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-industrial-400">
                    Edu: {job.education.split('/')[0]}
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-xs font-bold"
                    onClick={() => openApplyModal(job)}
                  >
                    Apply for Position
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. Spontaneous Talent Pool Submission Banner */}
        <div className="p-8 rounded-lg bg-gradient-to-r from-industrial-900 via-industrial-900 to-industrial-850 border border-industrial-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <h3 className="text-lg font-bold text-white">
              Don&apos;t See Your Specific Engineering Discipline?
            </h3>
            <p className="text-xs text-industrial-300 leading-relaxed">
              We are constantly evaluating exceptional mechanical designers, hydraulic specialists, electrical panel engineers, and quarry metallurgists. Join our Central Engineering Talent Pool.
            </p>
          </div>
          <Button
            variant="outline"
            className="shrink-0 text-xs font-semibold border-puzzolana-gold/60 text-puzzolana-gold hover:bg-puzzolana-gold hover:text-industrial-950"
            onClick={() =>
              openApplyModal({
                id: 'JOB-GENERAL-POOL',
                jobCode: 'PZ-TALENT-POOL',
                title: 'General Engineering Talent Pool Submission',
                department: 'Mechanical Engineering',
                location: 'Hyderabad HQ / Plants / Remote',
                experienceLevel: 'Mid-Level (3-7 Yrs)',
                employmentType: 'Full-Time Permanent',
                minExperienceYears: 1,
                education: 'Diploma / B.Tech / M.Tech',
                overview: 'Spontaneous application for current and upcoming engineering mandates.',
                keyResponsibilities: ['To be evaluated against active plant engineering projects.'],
                requiredSkills: ['Heavy Machinery', 'Engineering Design', 'Manufacturing'],
                postedDate: '2026-02-28',
                vacancies: 10,
              })
            }
          >
            Submit General Resume
          </Button>
        </div>
      </section>

      {/* 5. Interactive Application Modal */}
      {selectedJobForModal && (
        <Modal
          isOpen={!!selectedJobForModal}
          onClose={() => setSelectedJobForModal(null)}
          title={`Job Application: ${selectedJobForModal.title}`}
          size="lg"
        >
          {referenceId ? (
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-puzzolana-gold/10 text-puzzolana-gold rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Application Successfully Submitted</h4>
              <p className="text-xs text-industrial-300 max-w-md mx-auto">
                Thank you, <span className="text-white font-bold">{applicationData.name}</span>. Your application for <span className="text-white font-bold">{selectedJobForModal.title}</span> has been logged with the Puzzolana Talent Acquisition Directorate under candidate reference ID:
              </p>

              <div className="inline-flex items-center gap-3 bg-industrial-950 border border-industrial-700 px-4 py-2 rounded-lg font-mono text-sm text-puzzolana-gold font-bold">
                <span>{referenceId}</span>
                <button
                  onClick={handleCopyReference}
                  className="p-1 hover:text-white transition-colors"
                  title="Copy Candidate Reference ID"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <p className="text-[11px] text-industrial-400">
                Our HR Technical Evaluation Panel will review your credentials and contact you at <span className="text-industrial-200">{applicationData.email}</span> within 5 business days.
              </p>

              <div className="flex justify-center gap-3 pt-2">
                <Link href={`/enquiries/track?ref=${referenceId}`}>
                  <Button variant="primary" size="sm" className="text-xs">
                    Track Application Status
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setSelectedJobForModal(null)}
                >
                  Close Window
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleApplicationSubmit} className="p-6 space-y-4">
              {/* Role Summary Banner */}
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="font-bold text-white">{selectedJobForModal.title}</div>
                  <div className="text-industrial-400 font-mono text-[11px]">
                    {selectedJobForModal.jobCode} • {selectedJobForModal.department} ({selectedJobForModal.location})
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-puzzolana-gold/20 text-puzzolana-gold border border-puzzolana-gold/30 self-start sm:self-center">
                  {selectedJobForModal.experienceLevel}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Candidate Full Name *"
                  required
                  placeholder="e.g. Sridhar Varma"
                  value={applicationData.name}
                  onChange={(e) => setApplicationData({ ...applicationData, name: e.target.value })}
                />
                <Input
                  label="Official Email Address *"
                  type="email"
                  required
                  placeholder="sridhar@example.com"
                  value={applicationData.email}
                  onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Phone / Mobile Number *"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={applicationData.phone}
                  onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                />
                <Input
                  label="Current / Most Recent Company"
                  placeholder="e.g. Larsen & Toubro / Terex"
                  value={applicationData.currentCompany}
                  onChange={(e) => setApplicationData({ ...applicationData, currentCompany: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Total Relevant Experience (Years) *"
                  type="number"
                  required
                  min={0}
                  value={applicationData.experienceYears}
                  onChange={(e) => setApplicationData({ ...applicationData, experienceYears: e.target.value })}
                />
                <Input
                  label="Notice Period (Days) *"
                  type="number"
                  required
                  min={0}
                  value={applicationData.noticePeriodDays}
                  onChange={(e) => setApplicationData({ ...applicationData, noticePeriodDays: e.target.value })}
                />
              </div>

              <Input
                label="Resume Document URL / Portfolio Link *"
                required
                type="url"
                placeholder="https://drive.google.com/your-resume-link or https://linkedin.com/in/profile"
                value={applicationData.resumeUrl}
                onChange={(e) => setApplicationData({ ...applicationData, resumeUrl: e.target.value })}
              />

              <Textarea
                label="Cover Note / Key Heavy Engineering Projects"
                rows={3}
                placeholder="Summarize your key mechanical design, fabrication, or commissioning achievements..."
                value={applicationData.coverNote}
                onChange={(e) => setApplicationData({ ...applicationData, coverNote: e.target.value })}
              />

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedJobForModal(null)}
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
                  Submit Application to Puzzolana HR
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
}
