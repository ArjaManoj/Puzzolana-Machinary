'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  X,
  ArrowRight,
  SlidersHorizontal,
  FileText,
  Cpu,
  Layers,
  Sparkles,
  ChevronRight,
  BookOpen,
  Download,
} from 'lucide-react';
import { VERIFIED_FRONTEND_PRODUCTS } from '@/lib/seedCatalog';
import { VERIFIED_INDUSTRY_APPLICATIONS } from '@/lib/seedApplications';
import { VERIFIED_CASE_STUDIES } from '@/lib/seedCaseStudies';
import { VERIFIED_ARTICLES } from '@/lib/seedArticles';
import { VERIFIED_DOWNLOAD_ASSETS } from '@/lib/seedDownloads';

const QUICK_SEARCH_PILLS = [
  'PJC-14076 Jaw Crusher',
  'PCC-2000 Cone Crusher',
  'PVI-1200 VSI Impactor',
  'PTJ-1100 Track Mobile',
  '600 TPH Granite Plant',
  'IS 383 Zone II M-Sand',
  'Mn18Cr2 Jaw Dies',
  'CAD GA Drawings',
];

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global Ctrl+K / Cmd+K and Esc listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();
  const cleanQ = q.replace(/[-_\s]+/g, '');

  // Filter preview items
  const matchedProducts = VERIFIED_FRONTEND_PRODUCTS.filter((p) => {
    if (!q) return false;
    const pCode = (p.modelNumber + p.id + p.name + p.slug).toLowerCase().replace(/[-_\s]+/g, '');
    return pCode.includes(cleanQ) || p.shortDescription.toLowerCase().includes(q);
  }).slice(0, 3);

  const matchedApplications = VERIFIED_INDUSTRY_APPLICATIONS.filter((app) => {
    if (!q) return false;
    return app.name.toLowerCase().includes(q) || app.tagline.toLowerCase().includes(q);
  }).slice(0, 2);

  const matchedCaseStudies = VERIFIED_CASE_STUDIES.filter((cs) => {
    if (!q) return false;
    return cs.title.toLowerCase().includes(q) || cs.location.toLowerCase().includes(q);
  }).slice(0, 2);

  const matchedArticles = VERIFIED_ARTICLES.filter((art) => {
    if (!q) return false;
    return art.title.toLowerCase().includes(q) || art.excerpt.toLowerCase().includes(q);
  }).slice(0, 2);

  const matchedDownloads = VERIFIED_DOWNLOAD_ASSETS.filter((dl) => {
    if (!q) return false;
    return dl.title.toLowerCase().includes(q) || dl.id.toLowerCase().includes(q);
  }).slice(0, 2);

  const totalMatches =
    matchedProducts.length +
    matchedApplications.length +
    matchedCaseStudies.length +
    matchedArticles.length +
    matchedDownloads.length;

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-3xl bg-industrial-900 border border-industrial-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative border-b border-industrial-800 bg-industrial-950 p-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-brand-yellow shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search machinery models (e.g. PJC-14076), rock flows, CAD drawings, metallurgy..."
            className="w-full bg-transparent text-white placeholder-industrial-500 text-base sm:text-lg focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-industrial-500 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-mono bg-industrial-800 hover:bg-industrial-700 text-industrial-300 px-2 py-1 rounded border border-industrial-700"
          >
            ESC
          </button>
        </form>

        {/* Results / Suggestions Box */}
        <div className="overflow-y-auto p-4 space-y-5 divide-y divide-industrial-800/60">
          {!q && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-industrial-400 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
                Popular Technical Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {QUICK_SEARCH_PILLS.map((pill) => (
                  <button
                    key={pill}
                    type="button"
                    onClick={() => {
                      setQuery(pill);
                      router.push(`/search?q=${encodeURIComponent(pill)}`);
                      onClose();
                    }}
                    className="text-xs bg-industrial-800/80 hover:bg-brand-yellow hover:text-industrial-950 text-industrial-200 px-3 py-1.5 rounded-md border border-industrial-700 transition"
                  >
                    {pill}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Machinery Matches */}
          {matchedProducts.length > 0 && (
            <div className="pt-3 first:pt-0">
              <div className="text-xs font-bold uppercase tracking-wider text-industrial-400 mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-brand-yellow" /> Machinery Equipment Models
                </span>
                <span className="text-[10px] bg-industrial-800 text-brand-yellow px-2 py-0.5 rounded">
                  {matchedProducts.length} Matches
                </span>
              </div>
              <div className="space-y-1.5">
                {matchedProducts.map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/products/${prod.category}/${prod.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-industrial-950/60 hover:bg-industrial-800/80 border border-industrial-800/80 hover:border-brand-yellow/40 transition group"
                  >
                    <div>
                      <div className="font-bold text-white group-hover:text-brand-yellow text-sm transition flex items-center gap-2">
                        {prod.modelNumber} — {prod.name}
                        <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-industrial-800 text-industrial-300">
                          {prod.capacityMinTPH}-{prod.capacityMaxTPH} TPH
                        </span>
                      </div>
                      <p className="text-xs text-industrial-400 line-clamp-1 mt-0.5">
                        {prod.shortDescription}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-industrial-500 group-hover:text-brand-yellow group-hover:translate-x-0.5 transition" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Quick Flowsheets & Applications */}
          {matchedApplications.length > 0 && (
            <div className="pt-3">
              <div className="text-xs font-bold uppercase tracking-wider text-industrial-400 mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-brand-yellow" /> Applications & Process Flowsheets
                </span>
                <span className="text-[10px] bg-industrial-800 text-brand-yellow px-2 py-0.5 rounded">
                  {matchedApplications.length} Matches
                </span>
              </div>
              <div className="space-y-1.5">
                {matchedApplications.map((app) => (
                  <Link
                    key={app.id}
                    href={`/applications/${app.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-industrial-950/60 hover:bg-industrial-800/80 border border-industrial-800/80 hover:border-brand-yellow/40 transition group"
                  >
                    <div>
                      <div className="font-bold text-white group-hover:text-brand-yellow text-sm transition">
                        {app.name}
                      </div>
                      <p className="text-xs text-industrial-400 line-clamp-1 mt-0.5">{app.tagline}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-industrial-500 group-hover:text-brand-yellow group-hover:translate-x-0.5 transition" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Quick Technical Articles */}
          {matchedArticles.length > 0 && (
            <div className="pt-3">
              <div className="text-xs font-bold uppercase tracking-wider text-industrial-400 mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-brand-yellow" /> Technical Whitepapers & Insights
                </span>
                <span className="text-[10px] bg-industrial-800 text-brand-yellow px-2 py-0.5 rounded">
                  {matchedArticles.length} Matches
                </span>
              </div>
              <div className="space-y-1.5">
                {matchedArticles.map((art) => (
                  <Link
                    key={art.id}
                    href={`/news/${art.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-industrial-950/60 hover:bg-industrial-800/80 border border-industrial-800/80 hover:border-brand-yellow/40 transition group"
                  >
                    <div>
                      <div className="font-bold text-white group-hover:text-brand-yellow text-sm transition">
                        {art.title}
                      </div>
                      <p className="text-xs text-industrial-400 line-clamp-1 mt-0.5">{art.excerpt}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-industrial-500 group-hover:text-brand-yellow group-hover:translate-x-0.5 transition" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Quick Download & CAD Assets */}
          {matchedDownloads.length > 0 && (
            <div className="pt-3">
              <div className="text-xs font-bold uppercase tracking-wider text-industrial-400 mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-brand-yellow" /> Technical Assets & CADs
                </span>
                <span className="text-[10px] bg-industrial-800 text-brand-yellow px-2 py-0.5 rounded">
                  {matchedDownloads.length} Matches
                </span>
              </div>
              <div className="space-y-1.5">
                {matchedDownloads.map((dl) => (
                  <Link
                    key={dl.id}
                    href="/downloads"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-industrial-950/60 hover:bg-industrial-800/80 border border-industrial-800/80 hover:border-brand-yellow/40 transition group"
                  >
                    <div>
                      <div className="font-bold text-white group-hover:text-brand-yellow text-sm transition">
                        {dl.title}
                      </div>
                      <p className="text-xs text-industrial-400 line-clamp-1 mt-0.5">
                        {dl.id} • {dl.fileType} ({dl.fileSize})
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-industrial-500 group-hover:text-brand-yellow group-hover:translate-x-0.5 transition" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {q && totalMatches === 0 && (
            <div className="py-8 text-center text-industrial-400">
              <p className="text-sm font-semibold text-industrial-300">
                No quick previews matching &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs mt-1 text-industrial-500">
                Press Enter to run comprehensive full-text search across all categories.
              </p>
            </div>
          )}
        </div>

        {/* Footer with Comprehensive Action */}
        <div className="p-3 bg-industrial-950 border-t border-industrial-800 flex items-center justify-between text-xs text-industrial-400">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-industrial-800 text-[10px] text-industrial-300 font-mono">
              ESC
            </kbd>
            <span>Close</span>
          </div>
          <button
            type="button"
            onClick={() => handleSearchSubmit()}
            className="flex items-center gap-1.5 text-brand-yellow font-semibold hover:underline"
          >
            <span>View all search results</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
