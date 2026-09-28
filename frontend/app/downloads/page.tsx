'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  VERIFIED_DOWNLOAD_ASSETS,
  DownloadAsset,
} from '@/lib/seedDownloads';
import { ApiClient } from '@/lib/api';
import {
  Download,
  FileText,
  Search,
  CheckCircle2,
  ChevronRight,
  Factory,
  Layers,
  Sparkles,
  Award,
  ShieldCheck,
  Lock,
  Unlock,
  Check,
  Copy,
  ExternalLink,
  FileCode,
  FileSpreadsheet,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';
import { Modal } from '@/components/common/Modal';

export default function DownloadsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGatedAsset, setSelectedGatedAsset] = useState<DownloadAsset | null>(null);

  // Gated Access Form State
  const [gatedFormData, setGatedFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectPurpose: 'Plant Engineering & Civil Layout Planning',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [downloadUnlocked, setDownloadUnlocked] = useState<boolean>(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  // Categories
  const categories = [
    { id: 'all', name: 'All Documents (17)' },
    { id: 'Product Brochures', name: 'Brochures (5)' },
    { id: 'Technical Datasheets', name: 'Datasheets (4)' },
    { id: 'CAD Layouts & GA', name: 'CAD & GA Layouts (3)' },
    { id: 'O&M Manuals', name: 'O&M Manuals (2)' },
    { id: 'Corporate & ISO Certs', name: 'ISO Certs (3)' },
  ];

  const equipmentCategories = [
    'All Machinery',
    'Jaw Crushers',
    'Cone Crushers',
    'VSI & Sand Washing',
    'Track Mobile Plants',
    'Screens & Feeders',
    'Corporate',
  ];

  // Filtered Assets
  const filteredAssets = useMemo(() => {
    return VERIFIED_DOWNLOAD_ASSETS.filter((asset) => {
      if (selectedCategory !== 'all' && asset.category !== selectedCategory) {
        return false;
      }
      if (selectedEquipment !== 'all' && asset.equipmentCategory !== selectedEquipment && asset.equipmentCategory !== 'All Machinery') {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = asset.title.toLowerCase().includes(q);
        const matchDesc = asset.description.toLowerCase().includes(q);
        const matchExt = asset.fileType.toLowerCase().includes(q);
        const matchModel = asset.productModel?.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchExt && !matchModel) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedEquipment, searchQuery]);

  // Handle Download Action
  const handleDownloadClick = (asset: DownloadAsset) => {
    if (asset.isGated) {
      setSelectedGatedAsset(asset);
      setDownloadUnlocked(false);
      setGatedFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        projectPurpose: 'Plant Engineering & Civil Layout Planning',
      });
    } else {
      triggerDirectDownload(asset);
    }
  };

  const triggerDirectDownload = (asset: DownloadAsset) => {
    // Record telemetry event if available
    try {
      ApiClient.post('/telemetry', { event: 'download_document', documentId: asset.id }).catch(() => {});
    } catch {
      // ignore
    }

    setDownloadSuccessToast(`Downloading "${asset.title}" (${asset.fileSize})...`);
    setTimeout(() => {
      setDownloadSuccessToast(null);
    }, 4000);
  };

  const handleGatedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setDownloadUnlocked(true);
      if (selectedGatedAsset) {
        triggerDirectDownload(selectedGatedAsset);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 pb-28 pt-8">
      {/* Download Success Toast Notification */}
      {downloadSuccessToast && (
        <div className="fixed bottom-8 right-8 z-50 bg-industrial-900 border border-puzzolana-gold text-white p-4 rounded-lg shadow-2xl flex items-center gap-3 animate-fade-in">
          <div className="w-8 h-8 rounded-full bg-puzzolana-gold/20 text-puzzolana-gold flex items-center justify-center font-bold">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Download Initiated</div>
            <div className="text-[11px] text-industrial-300 font-mono">{downloadSuccessToast}</div>
          </div>
        </div>
      )}

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
            <span className="text-puzzolana-gold uppercase">TECHNICAL DOWNLOAD CENTRE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-puzzolana-gold/10 border border-puzzolana-gold/30 text-puzzolana-gold text-xs font-mono mb-4">
                <FileText className="w-3.5 h-3.5" />
                <span>OFFICIAL ENGINEERING ASSET REPOSITORY</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white mb-4">
                TECHNICAL DOWNLOADS &amp; <span className="text-puzzolana-gold">CAD DRAWINGS</span>
              </h1>
              <p className="text-industrial-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-6">
                Access official Puzzolana machinery brochures, technical datasheets, 2D/3D CAD general arrangement drawings, O&amp;M manuals, and accredited ISO certifications.
              </p>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <a href="#repository">
                  <Button variant="primary" className="font-semibold text-xs sm:text-sm">
                    Browse Document Repository
                  </Button>
                </a>
                <Link href="/quote?subject=Custom%20CAD%20Layout%20Request">
                  <Button variant="outline" className="font-semibold text-xs sm:text-sm border-industrial-700 hover:border-puzzolana-gold">
                    Request Custom 3D Plant Layout
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stats Badges */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              <div className="p-4 rounded bg-industrial-900 border border-industrial-800 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-puzzolana-gold">17</div>
                <div className="text-xs text-industrial-400 uppercase font-mono mt-1">Verified Assets</div>
              </div>
              <div className="p-4 rounded bg-industrial-900 border border-industrial-800 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-white">20,000+</div>
                <div className="text-xs text-industrial-400 uppercase font-mono mt-1">Downloads</div>
              </div>
              <div className="p-4 rounded bg-industrial-900 border border-industrial-800 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-puzzolana-gold">2D / 3D</div>
                <div className="text-xs text-industrial-400 uppercase font-mono mt-1">CAD GA Models</div>
              </div>
              <div className="p-4 rounded bg-industrial-900 border border-industrial-800 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-white">ISO</div>
                <div className="text-xs text-industrial-400 uppercase font-mono mt-1">9001 / 14001 / 45001</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Filter Controls Bar */}
      <section id="repository" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
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

          {/* Search & Equipment Filter */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-industrial-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents by title, model (e.g. PJC 14076, PCC 2000, 600 TPH GA, O&M Manual)..."
                className="w-full bg-industrial-950 border border-industrial-800 rounded py-2 pl-9 pr-4 text-xs sm:text-sm text-industrial-100 placeholder-industrial-500 focus:outline-none focus:border-puzzolana-gold"
              />
            </div>

            <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-2">
              <span className="text-xs font-mono text-industrial-400 shrink-0">Equipment:</span>
              <select
                value={selectedEquipment}
                onChange={(e) => setSelectedEquipment(e.target.value)}
                className="bg-industrial-950 border border-industrial-800 rounded py-1.5 px-3 text-xs text-industrial-200 focus:outline-none focus:border-puzzolana-gold w-full sm:w-auto font-mono"
              >
                {equipmentCategories.map((eq) => (
                  <option key={eq} value={eq}>
                    {eq}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Document Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs font-mono text-industrial-400">
            Showing <span className="text-puzzolana-gold font-bold">{filteredAssets.length}</span> Verified Documents
          </div>
        </div>

        {filteredAssets.length === 0 ? (
          <div className="text-center py-16 bg-industrial-900/40 border border-dashed border-industrial-800 rounded-lg">
            <FileText className="w-12 h-12 text-industrial-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No Documents Found</h3>
            <p className="text-sm text-industrial-400 max-w-md mx-auto mb-4">
              We did not find any technical assets matching your search criteria.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedEquipment('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="bg-industrial-900 border border-industrial-800 hover:border-puzzolana-gold/60 rounded-lg p-6 flex flex-col justify-between transition-all group shadow-md"
              >
                <div>
                  {/* Top Bar Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                        asset.fileType === 'DWG' || asset.fileType === 'STEP'
                          ? 'bg-puzzolana-gold/20 text-puzzolana-gold border border-puzzolana-gold/40'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {asset.fileType} • {asset.fileSize}
                    </span>

                    {asset.isGated ? (
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 flex items-center gap-1 font-bold">
                        <Lock className="w-3 h-3" />
                        Gated B2B Access
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                        Direct PDF
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-puzzolana-gold transition-colors mb-2 leading-snug">
                    {asset.title}
                  </h3>

                  {/* Metadata line */}
                  <div className="flex flex-wrap gap-2 text-[11px] font-mono text-industrial-400 mb-3">
                    <span className="text-puzzolana-gold">{asset.category}</span>
                    {asset.productModel && (
                      <>
                        <span>•</span>
                        <span className="text-industrial-300 font-bold">{asset.productModel}</span>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-industrial-300 leading-relaxed mb-4">
                    {asset.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="border-t border-industrial-800 pt-4 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-industrial-500 flex items-center gap-1">
                    <Download className="w-3.5 h-3.5 text-puzzolana-gold" />
                    <span>{asset.downloadCount.toLocaleString()}+</span>
                  </div>

                  <Button
                    variant={asset.isGated ? 'outline' : 'primary'}
                    size="sm"
                    className="text-xs font-bold flex items-center gap-1.5"
                    onClick={() => handleDownloadClick(asset)}
                  >
                    {asset.isGated ? <Lock className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                    <span>{asset.isGated ? 'Request Access' : 'Download'}</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. Custom CAD Plant Layout Callout Banner */}
        <div className="p-8 rounded-lg bg-gradient-to-r from-industrial-900 via-industrial-900 to-industrial-850 border border-puzzolana-gold/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <h3 className="text-lg font-bold text-white">
              Need a Custom 3D GA Plant Layout for Your Quarry Site?
            </h3>
            <p className="text-xs text-industrial-300 leading-relaxed">
              Our 120+ CAD design engineers generate customized 3D civil foundation drawings, conveyor slope calculations, and crusher clearance models matching your site topography.
            </p>
          </div>
          <Link href="/quote?subject=Custom%203D%20CAD%20Plant%20Layout%20Request" className="shrink-0">
            <Button variant="primary" className="font-bold text-xs">
              Request Customized CAD Layout
            </Button>
          </Link>
        </div>
      </section>

      {/* 5. Gated Asset Verification Modal */}
      {selectedGatedAsset && (
        <Modal
          isOpen={!!selectedGatedAsset}
          onClose={() => setSelectedGatedAsset(null)}
          title={`Technical Access Request: ${selectedGatedAsset.title}`}
          size="lg"
        >
          {downloadUnlocked ? (
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Technical Asset Unlocked</h4>
              <p className="text-xs text-industrial-300 max-w-md mx-auto">
                Thank you, <span className="text-white font-bold">{gatedFormData.name}</span>. Your verification has been approved. The file <span className="text-white font-bold">{selectedGatedAsset.title}</span> ({selectedGatedAsset.fileType} • {selectedGatedAsset.fileSize}) is ready.
              </p>

              <div className="pt-2 flex justify-center gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  className="text-xs font-bold"
                  onClick={() => triggerDirectDownload(selectedGatedAsset)}
                >
                  Download Asset Now ({selectedGatedAsset.fileSize})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setSelectedGatedAsset(null)}
                >
                  Close Window
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleGatedSubmit} className="p-6 space-y-4">
              {/* Asset Summary Banner */}
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="font-bold text-white">{selectedGatedAsset.title}</div>
                  <div className="text-industrial-400 font-mono text-[11px]">
                    {selectedGatedAsset.category} • {selectedGatedAsset.fileType} ({selectedGatedAsset.fileSize})
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-puzzolana-gold/20 text-puzzolana-gold border border-puzzolana-gold/30 self-start sm:self-center">
                  B2B Engineering Asset
                </span>
              </div>

              <p className="text-xs text-industrial-400">
                Please provide your corporate details to download this detailed CAD engineering model or O&amp;M manual.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Full Name *"
                  required
                  placeholder="e.g. S. K. Mukherjee"
                  value={gatedFormData.name}
                  onChange={(e) => setGatedFormData({ ...gatedFormData, name: e.target.value })}
                />
                <Input
                  label="Company / Enterprise Name *"
                  required
                  placeholder="e.g. Reliance Infra / Kalinga Quarries"
                  value={gatedFormData.company}
                  onChange={(e) => setGatedFormData({ ...gatedFormData, company: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Corporate Email Address *"
                  type="email"
                  required
                  placeholder="mukherjee@relianceinfra.com"
                  value={gatedFormData.email}
                  onChange={(e) => setGatedFormData({ ...gatedFormData, email: e.target.value })}
                />
                <Input
                  label="Mobile / Telephone Number *"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={gatedFormData.phone}
                  onChange={(e) => setGatedFormData({ ...gatedFormData, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-industrial-300 uppercase mb-1">
                  Intended Project Purpose *
                </label>
                <select
                  value={gatedFormData.projectPurpose}
                  onChange={(e) => setGatedFormData({ ...gatedFormData, projectPurpose: e.target.value })}
                  className="w-full bg-industrial-950 border border-industrial-800 rounded py-2 px-3 text-xs text-industrial-100 focus:outline-none focus:border-puzzolana-gold"
                >
                  <option value="Plant Engineering & Civil Layout Planning">
                    Quarry / Mining Plant Civil Layout Planning
                  </option>
                  <option value="Machinery Procurement & Tender Sizing">
                    Machinery Procurement &amp; Tender Evaluation
                  </option>
                  <option value="Plant Maintenance & Liner Replacement">
                    Plant Maintenance &amp; Liner Replacement
                  </option>
                  <option value="Academic / Technical Research">
                    Academic / Mineral Processing Research
                  </option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedGatedAsset(null)}
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
                  Unlock &amp; Download Asset
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
}
