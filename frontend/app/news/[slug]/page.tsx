import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  VERIFIED_ARTICLES,
  ArticlePost,
} from '@/lib/seedArticles';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Award,
  Share2,
  Tag,
  ShieldCheck,
  Zap,
  Building2,
  Layers,
  Sparkles,
  Quote,
} from 'lucide-react';
import { Button } from '@/components/common/Button';

import { JsonLd } from '@/components/seo/JsonLd';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return VERIFIED_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = VERIFIED_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) {
    return {
      title: 'Article Not Found | Puzzolana Technical Bureau',
    };
  }

  return {
    title: `${article.title} | Puzzolana Machinery`,
    description: article.excerpt,
  };
}

export default function ArticleDetailPage({ params }: PageProps) {
  const article = VERIFIED_ARTICLES.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = VERIFIED_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);
  const articleSchema = generateArticleSchema(article);
  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'News & Insights', url: '/news' },
    { name: article.title, url: `/news/${article.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 pb-28 pt-8">
      <JsonLd data={[articleSchema, breadcrumbsSchema]} />
      {/* 1. Header & Breadcrumbs */}
      <section className="relative border-b border-industrial-800 bg-industrial-900/60 pb-12 pt-6 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#e6a817_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-industrial-400 mb-4 flex-wrap">
            <Link href="/" className="hover:text-puzzolana-gold transition-colors">
              HOME
            </Link>
            <span>/</span>
            <Link href="/news" className="hover:text-puzzolana-gold transition-colors">
              NEWS &amp; INSIGHTS
            </Link>
            <span>/</span>
            <span className="text-puzzolana-gold uppercase truncate max-w-xs">{article.slug}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-2.5 py-0.5 rounded bg-puzzolana-gold/15 border border-puzzolana-gold/30 text-puzzolana-gold text-xs font-mono font-bold uppercase">
              {article.category}
            </span>
            <span className="text-xs font-mono text-industrial-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-puzzolana-gold" />
              {article.publishedDate}
            </span>
            <span className="text-xs font-mono text-industrial-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-puzzolana-gold" />
              {article.readTimeMinutes} min read
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white mb-4 leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-industrial-300 leading-relaxed mb-6">
            {article.subtitle}
          </p>

          {/* Author Profile Strip */}
          <div className="flex items-center gap-3 pt-4 border-t border-industrial-800">
            <div className="w-11 h-11 rounded-full bg-industrial-800 border border-puzzolana-gold/40 overflow-hidden flex items-center justify-center font-bold text-puzzolana-gold shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{article.author.name}</div>
              <div className="text-xs text-industrial-400 font-mono">
                {article.author.role} • <span className="text-puzzolana-gold">{article.author.department}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Article Body */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        {/* Featured Image */}
        <div className="rounded-lg overflow-hidden border border-industrial-800 relative h-72 sm:h-96 w-full bg-industrial-900 mb-10">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Executive Key Takeaways Card */}
        <div className="bg-industrial-900 border border-puzzolana-gold/40 rounded-lg p-6 sm:p-7 mb-10 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-mono text-puzzolana-gold uppercase font-bold mb-3">
            <Award className="w-4 h-4 text-puzzolana-gold" />
            <span>Executive Engineering Takeaways</span>
          </div>
          <ul className="space-y-2.5">
            {article.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-industrial-200">
                <CheckCircle2 className="w-4 h-4 text-puzzolana-gold shrink-0 mt-0.5" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Sections */}
        <div className="space-y-10 text-industrial-200 text-sm sm:text-base leading-relaxed">
          {article.contentSections.map((sec, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black font-display text-white tracking-tight pt-2">
                {sec.heading}
              </h2>

              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-industrial-300 leading-relaxed">
                  {p}
                </p>
              ))}

              {/* Callout Quote */}
              {sec.calloutQuote && (
                <div className="my-6 p-5 rounded-lg bg-industrial-900/80 border-l-4 border-puzzolana-gold relative overflow-hidden">
                  <Quote className="w-10 h-10 text-puzzolana-gold/15 absolute top-2 right-2 pointer-events-none" />
                  <p className="text-sm sm:text-base italic text-white font-medium relative z-10 leading-relaxed">
                    &ldquo;{sec.calloutQuote}&rdquo;
                  </p>
                </div>
              )}

              {/* Structured Comparison Data Table */}
              {sec.table && (
                <div className="my-6 overflow-x-auto rounded-lg border border-industrial-800 shadow-md">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-industrial-900 text-industrial-300 uppercase text-[11px] border-b border-industrial-800">
                      <tr>
                        {sec.table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="py-3 px-4">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-industrial-800/70 bg-industrial-950">
                      {sec.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-industrial-900/40">
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`py-3 px-4 ${
                                cIdx === 0 ? 'font-bold text-white' : 'text-industrial-300'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="border-t border-industrial-800 pt-6 mt-12 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-industrial-400 mr-2 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-puzzolana-gold" />
            Tags:
          </span>
          {article.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs font-mono bg-industrial-900 text-industrial-300 px-3 py-1 rounded border border-industrial-800"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Bio Card */}
        <div className="bg-industrial-900 border border-industrial-800 rounded-lg p-6 mt-8 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-16 h-16 rounded-full bg-industrial-800 border-2 border-puzzolana-gold/50 overflow-hidden flex items-center justify-center font-bold text-lg text-puzzolana-gold shrink-0">
            <User className="w-8 h-8" />
          </div>
          <div className="text-center sm:text-left space-y-1">
            <div className="text-base font-bold text-white">{article.author.name}</div>
            <div className="text-xs font-mono text-puzzolana-gold">
              {article.author.role} • {article.author.department}
            </div>
            <p className="text-xs text-industrial-400 pt-1 leading-relaxed">
              Published by the Puzzolana Engineering Knowledge Directorate. For inquiries regarding specific metallurgical specifications or customized flowsheet simulations, contact the technical sales desk.
            </p>
          </div>
        </div>

        {/* Consultation Call to Action */}
        <div className="p-8 rounded-lg bg-gradient-to-r from-industrial-900 via-industrial-900 to-industrial-850 border border-puzzolana-gold/40 mt-10 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">
            Need Expert Flowsheet Sizing for Your Quarry or Mine?
          </h3>
          <p className="text-xs sm:text-sm text-industrial-300 max-w-xl mx-auto leading-relaxed">
            Submit your rock laboratory test data to Puzzolana’s application engineering desk for a custom mass-balance crushing calculation and equipment recommendation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/quote">
              <Button variant="primary" className="font-bold text-xs sm:text-sm">
                Request Technical Sizing Proposal
              </Button>
            </Link>
            <Link href="/finder">
              <Button variant="outline" className="font-semibold text-xs sm:text-sm border-industrial-700 hover:border-puzzolana-gold">
                Launch Product Finder
              </Button>
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-14 pt-8 border-t border-industrial-800">
          <h3 className="text-xl font-black font-display text-white mb-6">
            Related Technical Papers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/news/${rel.slug}`}
                className="bg-industrial-900 border border-industrial-800 hover:border-puzzolana-gold/50 rounded-lg p-4 flex flex-col justify-between transition-colors group"
              >
                <div>
                  <div className="text-[10px] font-mono text-puzzolana-gold uppercase mb-1">
                    {rel.category}
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-puzzolana-gold transition-colors line-clamp-2 mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-[11px] text-industrial-400 line-clamp-2 leading-relaxed">
                    {rel.excerpt}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-industrial-500 pt-3 border-t border-industrial-800/80 mt-3 flex items-center justify-between">
                  <span>{rel.readTimeMinutes} min read</span>
                  <ArrowRight className="w-3 h-3 text-puzzolana-gold" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
