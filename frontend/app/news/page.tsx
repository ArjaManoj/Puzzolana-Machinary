'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { VERIFIED_ARTICLES, ArticlePost } from '@/lib/seedArticles';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  Search,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Layers,
  Award,
  Tag,
  Share2,
} from 'lucide-react';
import { Button } from '@/components/common/Button';

export default function NewsDirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', name: 'All Insights (6)' },
    { id: 'Metallurgy & Wear Tech', name: 'Metallurgy & Wear' },
    { id: 'Sand & Aggregate Quality', name: 'M-Sand & Aggregates' },
    { id: 'Equipment Sizing & Economics', name: 'Equipment Economics' },
    { id: 'Plant Flowsheet Engineering', name: 'Flowsheet Design' },
    { id: 'Environmental & Sustainability', name: 'Sustainability & Washing' },
    { id: 'Corporate & Industry News', name: 'Corporate News' },
  ];

  const featuredArticle = VERIFIED_ARTICLES[0];

  const filteredArticles = useMemo(() => {
    return VERIFIED_ARTICLES.filter((article) => {
      if (selectedCategory !== 'all' && article.category !== selectedCategory) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = article.title.toLowerCase().includes(q);
        const matchExcerpt = article.excerpt.toLowerCase().includes(q);
        const matchAuthor = article.author.name.toLowerCase().includes(q);
        const matchTag = article.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchExcerpt && !matchAuthor && !matchTag) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

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
            <span className="text-puzzolana-gold uppercase">TECHNICAL INSIGHTS &amp; NEWS</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-puzzolana-gold/10 border border-puzzolana-gold/30 text-puzzolana-gold text-xs font-mono mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>PUZZOLANA ENGINEERING BUREAU &amp; KNOWLEDGE HUB</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white mb-4">
              TECHNICAL PAPERS &amp; <span className="text-puzzolana-gold">INDUSTRY INSIGHTS</span>
            </h1>
            <p className="text-industrial-300 text-sm sm:text-base leading-relaxed">
              Authoritative engineering whitepapers, metallurgical research, flowsheet sizing methodologies, and corporate updates directly from Puzzolana’s design directorate and heavy foundries.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Featured Lead Article Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-industrial-900 border border-industrial-800 hover:border-puzzolana-gold/60 rounded-lg overflow-hidden transition-all shadow-xl group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Image */}
            <div className="lg:col-span-6 relative h-64 lg:h-auto min-h-[280px] bg-industrial-950 overflow-hidden">
              <img
                src={featuredArticle.featuredImage}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4 bg-puzzolana-gold text-industrial-950 font-mono font-bold text-xs px-2.5 py-1 rounded shadow">
                FEATURED WHITEPAPER
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs font-mono text-industrial-400 mb-3">
                  <span className="text-puzzolana-gold uppercase font-bold">{featuredArticle.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-puzzolana-gold" />
                    {featuredArticle.readTimeMinutes} min read
                  </span>
                  <span>•</span>
                  <span>{featuredArticle.publishedDate}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black font-display text-white group-hover:text-puzzolana-gold transition-colors mb-3 leading-snug">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs sm:text-sm text-industrial-300 leading-relaxed mb-6 line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
              </div>

              {/* Author Strip & Action */}
              <div className="border-t border-industrial-800 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-industrial-800 border border-puzzolana-gold/40 overflow-hidden flex items-center justify-center font-bold text-xs text-puzzolana-gold shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{featuredArticle.author.name}</div>
                    <div className="text-[11px] text-industrial-400 font-mono">
                      {featuredArticle.author.role}
                    </div>
                  </div>
                </div>

                <Link href={`/news/${featuredArticle.slug}`}>
                  <Button variant="primary" size="sm" className="font-bold text-xs flex items-center gap-1.5 w-full sm:w-auto">
                    <span>Read Whitepaper</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Filter Controls Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
              placeholder="Search whitepapers by topic, author, key alloy, or machine technology (e.g. Mn18Cr2, IS:383, VSI, Track Mobile)..."
              className="w-full bg-industrial-950 border border-industrial-800 rounded py-2 pl-9 pr-4 text-xs sm:text-sm text-industrial-100 placeholder-industrial-500 focus:outline-none focus:border-puzzolana-gold"
            />
          </div>
        </div>
      </section>

      {/* 4. Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs font-mono text-industrial-400">
            Showing <span className="text-puzzolana-gold font-bold">{filteredArticles.length}</span> Published Technical Insights
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-industrial-900/40 border border-dashed border-industrial-800 rounded-lg">
            <BookOpen className="w-12 h-12 text-industrial-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No Articles Found</h3>
            <p className="text-sm text-industrial-400 max-w-md mx-auto mb-4">
              We did not find any technical papers matching your query.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-industrial-900 border border-industrial-800 hover:border-puzzolana-gold/60 rounded-lg overflow-hidden flex flex-col justify-between transition-all group shadow-md"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-48 w-full bg-industrial-950 overflow-hidden">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-transparent to-transparent opacity-70" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-industrial-950/90 border border-puzzolana-gold/50 backdrop-blur-sm px-2.5 py-0.5 rounded font-mono text-[10px] font-bold text-puzzolana-gold uppercase">
                      {article.category}
                    </div>

                    {/* Reading Time */}
                    <div className="absolute top-3 right-3 bg-industrial-950/80 border border-industrial-700 backdrop-blur-sm px-2 py-0.5 rounded font-mono text-[11px] text-industrial-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-puzzolana-gold" />
                      <span>{article.readTimeMinutes} min</span>
                    </div>

                    {/* Date */}
                    <div className="absolute bottom-2 left-3 text-[11px] font-mono text-industrial-400">
                      {article.publishedDate}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h3 className="text-base font-bold text-white group-hover:text-puzzolana-gold transition-colors line-clamp-2 mb-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-industrial-300 line-clamp-3 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono bg-industrial-950 text-industrial-400 px-2 py-0.5 rounded border border-industrial-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-industrial-800 p-5 pt-3 bg-industrial-950/40 flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <div className="w-6 h-6 rounded-full bg-industrial-800 text-puzzolana-gold flex items-center justify-center font-bold text-[10px] shrink-0">
                      <User className="w-3 h-3" />
                    </div>
                    <span className="text-[11px] font-mono text-industrial-300 truncate">
                      {article.author.name}
                    </span>
                  </div>

                  <Link href={`/news/${article.slug}`}>
                    <Button variant="outline" size="sm" className="text-xs border-industrial-700 hover:border-puzzolana-gold shrink-0">
                      Read Paper
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
