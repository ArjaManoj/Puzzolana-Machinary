'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FileText,
  Layers,
  Calendar,
  Download,
  Plus,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Shield,
  Activity,
  ChevronRight,
  Sparkles,
  AlertCircle,
  Check,
  X,
  FileCheck,
  Building2,
  HardHat,
  Compass,
  FileSpreadsheet,
  Globe,
  MapPin,
  Flame,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Button } from '@/components/common/Button';
import { VERIFIED_ARTICLES } from '@/lib/seedArticles';
import { VERIFIED_CASE_STUDIES } from '@/lib/seedCaseStudies';
import { VERIFIED_EVENTS } from '@/lib/seedEvents';
import { VERIFIED_DOWNLOAD_ASSETS } from '@/lib/seedDownloads';

type ContentTab = 'articles' | 'case-studies' | 'events' | 'downloads';

export default function AdminContentPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<ContentTab>('articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Local state for items
  const [articles, setArticles] = useState(
    VERIFIED_ARTICLES.map((a, idx) => ({
      id: `art-${idx + 1}`,
      postId: `POST-${String(idx + 1).padStart(3, '0')}`,
      slug: a.slug,
      title: a.title,
      type: 'article',
      author: a.author?.name || 'Puzzolana Engineering Bureau',
      category: a.category,
      excerpt: a.excerpt,
      readTimeMinutes: a.readTimeMinutes || 6,
      isPublished: true,
      publishedAt: a.publishedDate || '2026-02-15',
      views: 1240 + idx * 310,
    }))
  );

  const [caseStudies, setCaseStudies] = useState(
    VERIFIED_CASE_STUDIES.map((cs, idx) => ({
      id: `cs-${idx + 1}`,
      caseStudyId: `CS-${String(idx + 1).padStart(3, '0')}`,
      slug: cs.slug,
      title: cs.title,
      clientName: cs.clientName || 'Infrastructure Partner',
      location: cs.location,
      state: cs.state,
      country: cs.country || 'India',
      industry: cs.industry,
      application: cs.application,
      plantCapacityTPH: cs.plantCapacityTPH,
      equipmentSupplied: (cs.equipmentSupplied || []).map((eq) =>
        typeof eq === 'string' ? eq : `${eq.quantity > 1 ? `${eq.quantity}x ` : ''}${eq.model}`
      ),
      isPublished: true,
      results: (cs.results || []).map((r) =>
        typeof r === 'string' ? r : `${r.metric}: ${r.value} (${r.impact})`
      ),
    }))
  );

  const [events, setEvents] = useState(
    VERIFIED_EVENTS.map((e, idx) => ({
      id: e.id || `evt-${idx + 1}`,
      eventId: `EVT-${String(idx + 1).padStart(3, '0')}`,
      slug: e.slug,
      name: e.name,
      category: e.category,
      status: e.status,
      startDate: e.startDate,
      endDate: e.endDate,
      venue: e.venue,
      location: `${e.city}, ${e.country}`,
      boothNumber: e.boothCoordinates,
      isPublished: true,
      delegatesExpected: e.delegatesExpected,
    }))
  );

  const [downloads, setDownloads] = useState(
    VERIFIED_DOWNLOAD_ASSETS.map((d, idx) => ({
      id: d.id || `dl-${idx + 1}`,
      downloadId: d.id,
      title: d.title,
      slug: d.id.toLowerCase(),
      category: d.category,
      equipmentCategory: d.equipmentCategory,
      fileType: d.fileType,
      fileSize: d.fileSize,
      downloadCount: d.downloadCount,
      isGated: d.isGated,
      isActive: true,
    }))
  );

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<any | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<any>({});

  // Auth Protection
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, authLoading, router]);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // Toggle Publication
  const handleTogglePublish = (id: string, type: ContentTab) => {
    if (type === 'articles') {
      setArticles((prev) =>
        prev.map((a) => (a.id === id ? { ...a, isPublished: !a.isPublished } : a))
      );
      showToast('Article publication status updated.');
    } else if (type === 'case-studies') {
      setCaseStudies((prev) =>
        prev.map((cs) => (cs.id === id ? { ...cs, isPublished: !cs.isPublished } : cs))
      );
      showToast('Case study publication status updated.');
    } else if (type === 'events') {
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, isPublished: !e.isPublished } : e))
      );
      showToast('Event publication status updated.');
    } else if (type === 'downloads') {
      setDownloads((prev) =>
        prev.map((d) => (d.id === id ? { ...d, isActive: !d.isActive } : d))
      );
      showToast('Download asset availability status updated.');
    }
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingItem(null);
    if (activeTab === 'articles') {
      setFormData({
        title: '',
        category: 'Metallurgy & Materials Science',
        author: 'Dr. R. K. Sharma (Puzzolana R&D)',
        excerpt: '',
        readTimeMinutes: 6,
        isPublished: true,
      });
    } else if (activeTab === 'case-studies') {
      setFormData({
        title: '',
        clientName: '',
        location: '',
        state: 'Telangana',
        industry: 'Commercial Aggregates',
        application: 'Granite & M-Sand Crushing',
        plantCapacityTPH: 450,
        equipmentSupplied: 'PJC 14076, PCC 2000, PVI 1200',
        results: '450 TPH continuous delivery; 40% reduction in fines',
        isPublished: true,
      });
    } else if (activeTab === 'events') {
      setFormData({
        name: '',
        category: 'National Flagship Expo',
        status: 'upcoming',
        startDate: '2026-12-08',
        endDate: '2026-12-12',
        venue: 'Bangalore International Exhibition Centre (BIEC)',
        location: 'Bengaluru, India',
        boothNumber: 'Outdoor Pavilion OD-12 (2,500 Sq. M)',
        delegatesExpected: '50,000+',
        isPublished: true,
      });
    } else if (activeTab === 'downloads') {
      setFormData({
        title: '',
        category: 'Product Brochures',
        equipmentCategory: 'All Machinery',
        fileType: 'PDF',
        fileSize: '4.8 MB',
        isGated: false,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    if (activeTab === 'articles') {
      setFormData({
        title: item.title,
        category: item.category,
        author: item.author,
        excerpt: item.excerpt,
        readTimeMinutes: item.readTimeMinutes,
        isPublished: item.isPublished,
      });
    } else if (activeTab === 'case-studies') {
      setFormData({
        title: item.title,
        clientName: item.clientName,
        location: item.location,
        state: item.state,
        industry: item.industry,
        application: item.application,
        plantCapacityTPH: item.plantCapacityTPH,
        equipmentSupplied: Array.isArray(item.equipmentSupplied) ? item.equipmentSupplied.join(', ') : item.equipmentSupplied,
        results: Array.isArray(item.results) ? item.results.join('; ') : item.results,
        isPublished: item.isPublished,
      });
    } else if (activeTab === 'events') {
      setFormData({
        name: item.name,
        category: item.category,
        status: item.status,
        startDate: item.startDate,
        endDate: item.endDate,
        venue: item.venue,
        location: item.location,
        boothNumber: item.boothNumber,
        delegatesExpected: item.delegatesExpected,
        isPublished: item.isPublished,
      });
    } else if (activeTab === 'downloads') {
      setFormData({
        title: item.title,
        category: item.category,
        equipmentCategory: item.equipmentCategory || 'All Machinery',
        fileType: item.fileType,
        fileSize: item.fileSize,
        isGated: item.isGated,
        isActive: item.isActive,
      });
    }
    setIsModalOpen(true);
  };

  // Save Item (Create / Edit)
  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'articles') {
      if (!formData.title || !formData.excerpt) return;
      if (editingItem) {
        setArticles((prev) =>
          prev.map((a) => (a.id === editingItem.id ? { ...a, ...formData } : a))
        );
        showToast('Article updated successfully.');
      } else {
        const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const newArt = {
          id: `art-${Date.now()}`,
          postId: `POST-${Math.floor(100 + Math.random() * 900)}`,
          slug,
          views: 0,
          publishedAt: new Date().toISOString().split('T')[0],
          ...formData,
        };
        setArticles((prev) => [newArt, ...prev]);
        showToast('New article created and published.');
      }
    } else if (activeTab === 'case-studies') {
      if (!formData.title || !formData.location || Number(formData.plantCapacityTPH) <= 0) return;
      const equipArr = typeof formData.equipmentSupplied === 'string'
        ? formData.equipmentSupplied.split(',').map((s: string) => s.trim()).filter(Boolean)
        : formData.equipmentSupplied;
      const resArr = typeof formData.results === 'string'
        ? formData.results.split(';').map((s: string) => s.trim()).filter(Boolean)
        : formData.results;

      if (editingItem) {
        setCaseStudies((prev) =>
          prev.map((cs) =>
            cs.id === editingItem.id
              ? { ...cs, ...formData, equipmentSupplied: equipArr, results: resArr, plantCapacityTPH: Number(formData.plantCapacityTPH) }
              : cs
          )
        );
        showToast('Case study updated successfully.');
      } else {
        const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const newCs = {
          id: `cs-${Date.now()}`,
          caseStudyId: `CS-${Math.floor(100 + Math.random() * 900)}`,
          slug,
          country: 'India',
          ...formData,
          plantCapacityTPH: Number(formData.plantCapacityTPH),
          equipmentSupplied: equipArr,
          results: resArr,
        };
        setCaseStudies((prev) => [newCs, ...prev]);
        showToast('Turnkey case study published.');
      }
    } else if (activeTab === 'events') {
      if (!formData.name || !formData.venue) return;
      if (editingItem) {
        setEvents((prev) =>
          prev.map((ev) => (ev.id === editingItem.id ? { ...ev, ...formData } : ev))
        );
        showToast('Event details updated successfully.');
      } else {
        const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const newEv = {
          id: `evt-${Date.now()}`,
          eventId: `EVT-${Math.floor(100 + Math.random() * 900)}`,
          slug,
          ...formData,
        };
        setEvents((prev) => [newEv, ...prev]);
        showToast('Global trade event registered.');
      }
    } else if (activeTab === 'downloads') {
      if (!formData.title) return;
      if (editingItem) {
        setDownloads((prev) =>
          prev.map((d) => (d.id === editingItem.id ? { ...d, ...formData } : d))
        );
        showToast('Download asset specifications updated.');
      } else {
        const newDl = {
          id: `DL-${Date.now().toString().slice(-6)}`,
          downloadId: `DL-${Date.now().toString().slice(-6)}`,
          slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          downloadCount: 0,
          ...formData,
        };
        setDownloads((prev) => [newDl, ...prev]);
        showToast('Technical asset added to repository.');
      }
    }

    setIsModalOpen(false);
  };

  // Delete Action
  const handleDeleteItem = () => {
    if (!deleteConfirmItem) return;

    if (activeTab === 'articles') {
      setArticles((prev) => prev.filter((a) => a.id !== deleteConfirmItem.id));
    } else if (activeTab === 'case-studies') {
      setCaseStudies((prev) => prev.filter((cs) => cs.id !== deleteConfirmItem.id));
    } else if (activeTab === 'events') {
      setEvents((prev) => prev.filter((e) => e.id !== deleteConfirmItem.id));
    } else if (activeTab === 'downloads') {
      setDownloads((prev) => prev.filter((d) => d.id !== deleteConfirmItem.id));
    }

    showToast(`Archived / Removed "${deleteConfirmItem.title || deleteConfirmItem.name}" from public catalog.`);
    setDeleteConfirmItem(null);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-industrial-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Filtered lists
  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && a.isPublished) ||
      (statusFilter === 'draft' && !a.isPublished);
    return matchesSearch && matchesStatus;
  });

  const filteredCaseStudies = caseStudies.filter((cs) => {
    const matchesSearch =
      cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && cs.isPublished) ||
      (statusFilter === 'draft' && !cs.isPublished);
    return matchesSearch && matchesStatus;
  });

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && e.isPublished) ||
      (statusFilter === 'draft' && !e.isPublished);
    return matchesSearch && matchesStatus;
  });

  const filteredDownloads = downloads.filter((d) => {
    const matchesSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.fileType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && d.isActive) ||
      (statusFilter === 'draft' && !d.isActive);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-industrial-950 text-white flex">
      {/* Admin Nav Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-industrial-900/90 backdrop-blur-md border-b border-industrial-800 sticky top-0 z-20 px-8 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-industrial-400">
              <Link href="/admin/dashboard" className="hover:text-brand-yellow transition">
                Operations Command
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-industrial-600" />
              <span className="text-brand-yellow">Content & Editorial Suite</span>
            </div>
            <h1 className="text-xl font-black uppercase tracking-wider text-white mt-1 flex items-center gap-3">
              Editorial Publications & Asset Engine
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30">
                PROD CMS
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenCreate}
              className="flex items-center gap-2 shadow-gold-glow text-xs uppercase font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>
                {activeTab === 'articles' && 'New Technical Article'}
                {activeTab === 'case-studies' && 'New Case Study'}
                {activeTab === 'events' && 'Schedule Trade Expo'}
                {activeTab === 'downloads' && 'Upload Asset / CAD'}
              </span>
            </Button>
          </div>
        </header>

        {/* Success Toast */}
        {successToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 border border-emerald-500 text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-sm font-semibold">{successToast}</span>
          </div>
        )}

        <div className="p-8 space-y-6">
          {/* Top KPI Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div
              onClick={() => setActiveTab('articles')}
              className={`p-5 rounded-xl border transition cursor-pointer ${
                activeTab === 'articles'
                  ? 'bg-industrial-900 border-brand-yellow shadow-gold-glow'
                  : 'bg-industrial-900/60 border-industrial-800 hover:border-industrial-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-industrial-400">
                  Technical Papers
                </span>
                <FileText className="w-5 h-5 text-brand-yellow" />
              </div>
              <div className="text-2xl font-black text-white mt-2">{articles.length}</div>
              <p className="text-[11px] text-industrial-400 mt-1">
                {articles.filter((a) => a.isPublished).length} Published Articles
              </p>
            </div>

            <div
              onClick={() => setActiveTab('case-studies')}
              className={`p-5 rounded-xl border transition cursor-pointer ${
                activeTab === 'case-studies'
                  ? 'bg-industrial-900 border-brand-yellow shadow-gold-glow'
                  : 'bg-industrial-900/60 border-industrial-800 hover:border-industrial-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-industrial-400">
                  Case Studies
                </span>
                <Building2 className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-white mt-2">{caseStudies.length}</div>
              <p className="text-[11px] text-industrial-400 mt-1">
                {caseStudies.reduce((acc, c) => acc + c.plantCapacityTPH, 0).toLocaleString()} Total TPH Tracked
              </p>
            </div>

            <div
              onClick={() => setActiveTab('events')}
              className={`p-5 rounded-xl border transition cursor-pointer ${
                activeTab === 'events'
                  ? 'bg-industrial-900 border-brand-yellow shadow-gold-glow'
                  : 'bg-industrial-900/60 border-industrial-800 hover:border-industrial-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-industrial-400">
                  Global Expos
                </span>
                <Calendar className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white mt-2">{events.length}</div>
              <p className="text-[11px] text-industrial-400 mt-1">
                {events.filter((e) => e.status === 'upcoming').length} Upcoming Exhibitions
              </p>
            </div>

            <div
              onClick={() => setActiveTab('downloads')}
              className={`p-5 rounded-xl border transition cursor-pointer ${
                activeTab === 'downloads'
                  ? 'bg-industrial-900 border-brand-yellow shadow-gold-glow'
                  : 'bg-industrial-900/60 border-industrial-800 hover:border-industrial-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-industrial-400">
                  Technical Assets
                </span>
                <Download className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-white mt-2">{downloads.length}</div>
              <p className="text-[11px] text-industrial-400 mt-1">
                {downloads.reduce((acc, d) => acc + d.downloadCount, 0).toLocaleString()} Global Downloads
              </p>
            </div>
          </div>

          {/* Search, Filter & Tab Navigation Bar */}
          <div className="bg-industrial-900/80 border border-industrial-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Tabs */}
            <div className="flex items-center gap-1 bg-industrial-950 p-1 rounded-lg border border-industrial-800/80 w-full md:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab('articles')}
                className={`px-4 py-2 rounded-md text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'articles'
                    ? 'bg-brand-yellow text-industrial-950 shadow-gold-glow'
                    : 'text-industrial-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Technical Papers ({articles.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('case-studies')}
                className={`px-4 py-2 rounded-md text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'case-studies'
                    ? 'bg-brand-yellow text-industrial-950 shadow-gold-glow'
                    : 'text-industrial-400 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Case Studies ({caseStudies.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('events')}
                className={`px-4 py-2 rounded-md text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'events'
                    ? 'bg-brand-yellow text-industrial-950 shadow-gold-glow'
                    : 'text-industrial-400 hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Trade Expos ({events.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('downloads')}
                className={`px-4 py-2 rounded-md text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'downloads'
                    ? 'bg-brand-yellow text-industrial-950 shadow-gold-glow'
                    : 'text-industrial-400 hover:text-white'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Technical Assets ({downloads.length})</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-industrial-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by title, author, venue..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-industrial-950 border border-industrial-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-industrial-500 focus:outline-none focus:border-brand-yellow"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="bg-industrial-950 border border-industrial-800 rounded-lg px-3 py-2 text-xs text-industrial-300 focus:outline-none focus:border-brand-yellow"
              >
                <option value="all">All Status</option>
                <option value="published">Published / Active</option>
                <option value="draft">Draft / Inactive</option>
              </select>
            </div>
          </div>

          {/* TAB 1: TECHNICAL ARTICLES & PAPERS */}
          {activeTab === 'articles' && (
            <div className="bg-industrial-900/60 border border-industrial-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-industrial-950 border-b border-industrial-800 text-[11px] font-bold uppercase tracking-wider text-industrial-400">
                      <th className="py-3.5 px-4">Article / Whitepaper</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Author</th>
                      <th className="py-3.5 px-4 text-center">Read Time</th>
                      <th className="py-3.5 px-4 text-center">Views</th>
                      <th className="py-3.5 px-4 text-center">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-industrial-800/60">
                    {filteredArticles.map((art) => (
                      <tr key={art.id} className="hover:bg-industrial-800/30 transition group">
                        <td className="py-4 px-4">
                          <div className="font-bold text-white max-w-md group-hover:text-brand-yellow transition">
                            {art.title}
                          </div>
                          <div className="text-[11px] font-mono text-industrial-500 mt-0.5">
                            /{art.slug}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-0.5 rounded bg-industrial-800 border border-industrial-700 text-industrial-300 font-semibold text-[10px]">
                            {art.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-industrial-300 font-medium">
                          {art.author}
                        </td>
                        <td className="py-4 px-4 text-center text-industrial-400 font-mono">
                          {art.readTimeMinutes} mins
                        </td>
                        <td className="py-4 px-4 text-center font-mono text-industrial-300">
                          {art.views.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleTogglePublish(art.id, 'articles')}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border transition inline-flex items-center gap-1.5 ${
                              art.isPublished
                                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700/60 hover:bg-emerald-900/60'
                                : 'bg-industrial-950 text-industrial-400 border-industrial-700 hover:text-white'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                art.isPublished ? 'bg-emerald-400 animate-pulse' : 'bg-industrial-500'
                              }`}
                            />
                            {art.isPublished ? 'Published' : 'Draft'}
                          </button>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/news/${art.slug}`}
                              target="_blank"
                              className="p-1.5 rounded bg-industrial-800 hover:bg-industrial-700 text-industrial-300 hover:text-white transition"
                              title="View Public Page"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(art)}
                              className="p-1.5 rounded bg-industrial-800 hover:bg-brand-yellow/20 hover:text-brand-yellow text-industrial-300 transition"
                              title="Edit Article"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            {isAdmin && (
                              <button
                                type="button"
                                onClick={() => setDeleteConfirmItem(art)}
                                className="p-1.5 rounded bg-industrial-800 hover:bg-red-950/60 hover:text-red-400 text-industrial-400 transition"
                                title="Archive / Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: TURNKEY CASE STUDIES */}
          {activeTab === 'case-studies' && (
            <div className="bg-industrial-900/60 border border-industrial-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-industrial-950 border-b border-industrial-800 text-[11px] font-bold uppercase tracking-wider text-industrial-400">
                      <th className="py-3.5 px-4">Installation Project</th>
                      <th className="py-3.5 px-4">Client & Location</th>
                      <th className="py-3.5 px-4 text-center">Capacity</th>
                      <th className="py-3.5 px-4">Equipment Fleet</th>
                      <th className="py-3.5 px-4 text-center">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-industrial-800/60">
                    {filteredCaseStudies.map((cs) => (
                      <tr key={cs.id} className="hover:bg-industrial-800/30 transition group">
                        <td className="py-4 px-4">
                          <div className="font-bold text-white max-w-sm group-hover:text-brand-yellow transition">
                            {cs.title}
                          </div>
                          <div className="text-[11px] text-industrial-400 mt-0.5">
                            {cs.industry} • {cs.application}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-semibold text-industrial-200">{cs.clientName}</div>
                          <div className="text-[11px] text-industrial-400">
                            {cs.location}, {cs.state}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="font-mono font-bold text-brand-yellow bg-brand-yellow/10 border border-brand-yellow/30 px-2 py-0.5 rounded text-[11px]">
                            {cs.plantCapacityTPH} TPH
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {cs.equipmentSupplied.slice(0, 3).map((eq, i) => (
                              <span
                                key={i}
                                className="px-1.5 py-0.5 rounded bg-industrial-800 text-industrial-300 text-[10px] font-mono"
                              >
                                {eq}
                              </span>
                            ))}
                            {cs.equipmentSupplied.length > 3 && (
                              <span className="text-[10px] text-industrial-500 font-mono">
                                +{cs.equipmentSupplied.length - 3} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleTogglePublish(cs.id, 'case-studies')}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border transition inline-flex items-center gap-1.5 ${
                              cs.isPublished
                                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700/60 hover:bg-emerald-900/60'
                                : 'bg-industrial-950 text-industrial-400 border-industrial-700 hover:text-white'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                cs.isPublished ? 'bg-emerald-400 animate-pulse' : 'bg-industrial-500'
                              }`}
                            />
                            {cs.isPublished ? 'Published' : 'Draft'}
                          </button>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/case-studies/${cs.slug}`}
                              target="_blank"
                              className="p-1.5 rounded bg-industrial-800 hover:bg-industrial-700 text-industrial-300 hover:text-white transition"
                              title="View Public Story"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(cs)}
                              className="p-1.5 rounded bg-industrial-800 hover:bg-brand-yellow/20 hover:text-brand-yellow text-industrial-300 transition"
                              title="Edit Case Study"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            {isAdmin && (
                              <button
                                type="button"
                                onClick={() => setDeleteConfirmItem(cs)}
                                className="p-1.5 rounded bg-industrial-800 hover:bg-red-950/60 hover:text-red-400 text-industrial-400 transition"
                                title="Archive / Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: GLOBAL TRADE EXPOS */}
          {activeTab === 'events' && (
            <div className="bg-industrial-900/60 border border-industrial-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-industrial-950 border-b border-industrial-800 text-[11px] font-bold uppercase tracking-wider text-industrial-400">
                      <th className="py-3.5 px-4">Exhibition / Expo</th>
                      <th className="py-3.5 px-4">Dates</th>
                      <th className="py-3.5 px-4">Venue & Booth</th>
                      <th className="py-3.5 px-4 text-center">Expected Visitors</th>
                      <th className="py-3.5 px-4 text-center">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-industrial-800/60">
                    {filteredEvents.map((evt) => (
                      <tr key={evt.id} className="hover:bg-industrial-800/30 transition group">
                        <td className="py-4 px-4">
                          <div className="font-bold text-white max-w-sm group-hover:text-brand-yellow transition">
                            {evt.name}
                          </div>
                          <div className="text-[11px] text-industrial-400 mt-0.5">
                            {evt.category}
                          </div>
                        </td>
                        <td className="py-4 px-4 font-mono text-industrial-300">
                          <div>{evt.startDate}</div>
                          <div className="text-[10px] text-industrial-500">to {evt.endDate}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-industrial-200 font-medium">{evt.location}</div>
                          <div className="text-[11px] text-brand-yellow font-mono">{evt.boothNumber}</div>
                        </td>
                        <td className="py-4 px-4 text-center font-mono text-industrial-300">
                          {evt.delegatesExpected}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleTogglePublish(evt.id, 'events')}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border transition inline-flex items-center gap-1.5 ${
                              evt.isPublished
                                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700/60 hover:bg-emerald-900/60'
                                : 'bg-industrial-950 text-industrial-400 border-industrial-700 hover:text-white'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                evt.isPublished ? 'bg-emerald-400 animate-pulse' : 'bg-industrial-500'
                              }`}
                            />
                            {evt.isPublished ? 'Listed' : 'Hidden'}
                          </button>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href="/events"
                              target="_blank"
                              className="p-1.5 rounded bg-industrial-800 hover:bg-industrial-700 text-industrial-300 hover:text-white transition"
                              title="View Public Events"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(evt)}
                              className="p-1.5 rounded bg-industrial-800 hover:bg-brand-yellow/20 hover:text-brand-yellow text-industrial-300 transition"
                              title="Edit Event"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            {isAdmin && (
                              <button
                                type="button"
                                onClick={() => setDeleteConfirmItem(evt)}
                                className="p-1.5 rounded bg-industrial-800 hover:bg-red-950/60 hover:text-red-400 text-industrial-400 transition"
                                title="Archive / Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: TECHNICAL ASSETS & CAD DOWNLOADS */}
          {activeTab === 'downloads' && (
            <div className="bg-industrial-900/60 border border-industrial-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-industrial-950 border-b border-industrial-800 text-[11px] font-bold uppercase tracking-wider text-industrial-400">
                      <th className="py-3.5 px-4">Document / Asset Title</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4 text-center">Format & Size</th>
                      <th className="py-3.5 px-4 text-center">Access Policy</th>
                      <th className="py-3.5 px-4 text-center">Downloads</th>
                      <th className="py-3.5 px-4 text-center">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-industrial-800/60">
                    {filteredDownloads.map((dl) => (
                      <tr key={dl.id} className="hover:bg-industrial-800/30 transition group">
                        <td className="py-4 px-4">
                          <div className="font-bold text-white max-w-sm group-hover:text-brand-yellow transition">
                            {dl.title}
                          </div>
                          <div className="text-[11px] font-mono text-industrial-500 mt-0.5">
                            {dl.downloadId}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-0.5 rounded bg-industrial-800 border border-industrial-700 text-industrial-300 font-semibold text-[10px]">
                            {dl.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center font-mono">
                          <span className="text-white font-bold">{dl.fileType}</span>
                          <span className="text-industrial-500 text-[11px] ml-1">({dl.fileSize})</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          {dl.isGated ? (
                            <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-700/60 text-[10px] font-bold uppercase tracking-wider">
                              Gated CAD (RFQ)
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-blue-950/80 text-blue-400 border border-blue-700/60 text-[10px] font-bold uppercase tracking-wider">
                              Public PDF
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center font-mono text-brand-yellow font-bold">
                          {dl.downloadCount.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleTogglePublish(dl.id, 'downloads')}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border transition inline-flex items-center gap-1.5 ${
                              dl.isActive
                                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700/60 hover:bg-emerald-900/60'
                                : 'bg-industrial-950 text-industrial-400 border-industrial-700 hover:text-white'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                dl.isActive ? 'bg-emerald-400 animate-pulse' : 'bg-industrial-500'
                              }`}
                            />
                            {dl.isActive ? 'Active' : 'Archived'}
                          </button>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href="/downloads"
                              target="_blank"
                              className="p-1.5 rounded bg-industrial-800 hover:bg-industrial-700 text-industrial-300 hover:text-white transition"
                              title="View Downloads Center"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(dl)}
                              className="p-1.5 rounded bg-industrial-800 hover:bg-brand-yellow/20 hover:text-brand-yellow text-industrial-300 transition"
                              title="Edit Asset"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            {isAdmin && (
                              <button
                                type="button"
                                onClick={() => setDeleteConfirmItem(dl)}
                                className="p-1.5 rounded bg-industrial-800 hover:bg-red-950/60 hover:text-red-400 text-industrial-400 transition"
                                title="Archive / Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-industrial-900 border border-industrial-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-industrial-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-yellow">
                  {editingItem ? 'Edit Existing' : 'Create New'}
                </span>
                <h3 className="text-lg font-black uppercase tracking-wider text-white">
                  {activeTab === 'articles' && 'Technical Article / Whitepaper'}
                  {activeTab === 'case-studies' && 'Turnkey Installation Case Study'}
                  {activeTab === 'events' && 'Global Trade Expo / Event'}
                  {activeTab === 'downloads' && 'Technical Asset / CAD GA Drawing'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-industrial-800 text-industrial-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4">
              {/* Dynamic form inputs based on activeTab */}
              {activeTab === 'articles' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-industrial-300 uppercase tracking-wider mb-1">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Science of High Manganese Metallurgy in Cone Mantles"
                      className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-industrial-300 uppercase tracking-wider mb-1">
                        Category
                      </label>
                      <select
                        value={formData.category || 'Metallurgy & Materials Science'}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow"
                      >
                        <option value="Metallurgy & Materials Science">Metallurgy & Materials Science</option>
                        <option value="Application Engineering">Application Engineering</option>
                        <option value="Crushing Plant Operations">Crushing Plant Operations</option>
                        <option value="Energy & Efficiency">Energy & Efficiency</option>
                        <option value="Environmental & M-Sand">Environmental & M-Sand</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-industrial-300 uppercase tracking-wider mb-1">
                        Author / Bureau
                      </label>
                      <input
                        type="text"
                        value={formData.author || ''}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        placeholder="e.g. Dr. R. K. Sharma (Puzzolana R&D)"
                        className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-industrial-300 uppercase tracking-wider mb-1">
                      Technical Excerpt / Abstract *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.excerpt || ''}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Brief 2-3 sentence overview for search cards and metadata..."
                      className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-yellow"
                    />
                  </div>
                </>
              )}

              {activeTab === 'case-studies' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-industrial-300 uppercase tracking-wider mb-1">
                      Case Study Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. 600 TPH Granite Crushing & M-Sand Turnkey Plant"
                      className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-industrial-300 uppercase tracking-wider mb-1">
                        Client Name
                      </label>
                      <input
                        type="text"
                        value={formData.clientName || ''}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        placeholder="e.g. Deccan Granite Quarries"
                        className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-industrial-300 uppercase tracking-wider mb-1">
                        Location / District
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location || ''}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Karimnagar"
                        className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-industrial-300 uppercase tracking-wider mb-1">
                        Capacity (TPH) *
                      </label>
                      <input
                        type="number"
                        min={1}
                        required
                        value={formData.plantCapacityTPH || ''}
                        onChange={(e) => setFormData({ ...formData, plantCapacityTPH: e.target.value })}
                        placeholder="e.g. 600"
                        className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-industrial-300 uppercase tracking-wider mb-1">
                      Machinery Supplied (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.equipmentSupplied || ''}
                      onChange={(e) => setFormData({ ...formData, equipmentSupplied: e.target.value })}
                      placeholder="e.g. PJC 14076, PCC 2000, PVI 1200, PSW 200"
                      className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-industrial-300 uppercase tracking-wider mb-1">
                      Verified Results / ROI (semicolon-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.results || ''}
                      onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                      placeholder="e.g. 600 TPH sustained output; 40% waste fines reduction; IS 383 Zone II compliant"
                      className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow"
                    />
                  </div>
                </>
              )}

              {activeTab === 'events' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-industrial-300 uppercase tracking-wider mb-1">
                      Exhibition / Event Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. EXCON 2026: South Asia's Premier Construction Equipment Exhibition"
                      className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-industrial-300 uppercase tracking-wider mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.startDate || ''}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-industrial-300 uppercase tracking-wider mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={formData.endDate || ''}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-industrial-300 uppercase tracking-wider mb-1">
                        Venue & City
                      </label>
                      <input
                        type="text"
                        value={formData.venue || ''}
                        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                        placeholder="e.g. BIEC, Bengaluru, India"
                        className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-industrial-300 uppercase tracking-wider mb-1">
                        Booth / Pavilion Coordinates
                      </label>
                      <input
                        type="text"
                        value={formData.boothNumber || ''}
                        onChange={(e) => setFormData({ ...formData, boothNumber: e.target.value })}
                        placeholder="e.g. Outdoor Pavilion OD-12"
                        className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'downloads' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-industrial-300 uppercase tracking-wider mb-1">
                      Document / Asset Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. PJC 14076 Primary Jaw Crusher GA Foundation Plan"
                      className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-industrial-300 uppercase tracking-wider mb-1">
                        Category
                      </label>
                      <select
                        value={formData.category || 'Product Brochures'}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow"
                      >
                        <option value="Product Brochures">Product Brochures</option>
                        <option value="Technical Datasheets">Technical Datasheets</option>
                        <option value="CAD Layouts & GA">CAD Layouts & GA</option>
                        <option value="O&M Manuals">O&M Manuals</option>
                        <option value="Corporate & ISO Certs">Corporate & ISO Certs</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-industrial-300 uppercase tracking-wider mb-1">
                        File Type
                      </label>
                      <select
                        value={formData.fileType || 'PDF'}
                        onChange={(e) => setFormData({ ...formData, fileType: e.target.value })}
                        className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow"
                      >
                        <option value="PDF">PDF Document</option>
                        <option value="DWG">AutoCAD DWG</option>
                        <option value="STEP">STEP 3D Solid</option>
                        <option value="ZIP">ZIP Archive</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-industrial-300 uppercase tracking-wider mb-1">
                        File Size
                      </label>
                      <input
                        type="text"
                        value={formData.fileSize || '5.2 MB'}
                        onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                        placeholder="e.g. 5.2 MB"
                        className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="isGated"
                      checked={formData.isGated || false}
                      onChange={(e) => setFormData({ ...formData, isGated: e.target.checked })}
                      className="w-4 h-4 rounded text-brand-yellow focus:ring-0 cursor-pointer bg-industrial-950 border-industrial-800"
                    />
                    <label htmlFor="isGated" className="text-xs text-industrial-200 cursor-pointer select-none">
                      Require Corporate Verification (Gated CAD Drawing / Load Spec)
                    </label>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-industrial-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="shadow-gold-glow text-xs uppercase font-bold"
                >
                  {editingItem ? 'Save Updates' : 'Publish & Broadcast'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-industrial-900 border border-red-900/60 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-base font-bold uppercase tracking-wider text-white">
                Confirm Archive / Deletion
              </h3>
            </div>
            <p className="text-xs text-industrial-300 leading-relaxed">
              Are you sure you want to delete or archive{' '}
              <strong className="text-white">
                &ldquo;{deleteConfirmItem.title || deleteConfirmItem.name}&rdquo;
              </strong>
              ? This action will remove the item from public indexing and search discovery.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteConfirmItem(null)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleDeleteItem}
                className="bg-red-600 hover:bg-red-700 text-white border-transparent text-xs font-bold"
              >
                Confirm Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
