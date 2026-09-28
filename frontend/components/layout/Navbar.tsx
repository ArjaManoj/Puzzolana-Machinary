'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, FileText, Search, Shield, ChevronDown } from 'lucide-react';
import { GlobalSearchModal } from '@/components/common/GlobalSearchModal';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-industrial-950/90 backdrop-blur-md border-b border-industrial-800">
        {/* Top Bar for B2B Direct Assistance */}
        <div className="bg-industrial-900 border-b border-industrial-800/80 px-4 py-1.5 text-xs text-industrial-400">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center space-x-4">
              <span className="flex items-center gap-1.5 text-brand-yellow font-medium">
                <Shield className="w-3.5 h-3.5" /> Official Corporate Enterprise Platform
              </span>
              <span className="hidden md:inline text-industrial-600">|</span>
              <span className="hidden md:inline">Global Industrial Machinery Manufacturer • Make in India</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/enquiries/track" className="hover:text-brand-yellow transition">
                Track Enquiry
              </Link>
              <Link href="/downloads" className="hover:text-brand-yellow transition">
                Download Centre
              </Link>
              <Link href="/contact" className="flex items-center gap-1 hover:text-brand-yellow transition">
                <Phone className="w-3 h-3 text-brand-yellow" /> Contact Sales
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-brand-yellow rounded-sm flex items-center justify-center font-black text-industrial-950 text-xl tracking-tighter shadow-gold-glow group-hover:scale-105 transition-transform">
                PZ
              </div>
              <div>
                <span className="text-xl font-black tracking-wider text-white uppercase block leading-none">
                  PUZZOLANA
                </span>
                <span className="text-[10px] tracking-widest text-brand-yellow font-semibold uppercase block mt-0.5">
                  MACHINERY & SOLUTIONS
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/products" className="text-sm font-semibold text-industrial-200 hover:text-brand-yellow transition flex items-center gap-1">
                Products <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </Link>
              <Link href="/applications" className="text-sm font-semibold text-industrial-200 hover:text-brand-yellow transition">
                Applications
              </Link>
              <Link href="/finder" className="text-sm font-semibold text-industrial-200 hover:text-brand-yellow transition">
                Machine Finder
              </Link>
              <Link href="/products/compare" className="text-sm font-semibold text-industrial-200 hover:text-brand-yellow transition">
                Compare
              </Link>
              <Link href="/service" className="text-sm font-semibold text-industrial-200 hover:text-brand-yellow transition">
                Service & Spares
              </Link>
              <Link href="/downloads" className="text-sm font-semibold text-industrial-200 hover:text-brand-yellow transition">
                Downloads
              </Link>
              <Link href="/contact" className="text-sm font-semibold text-industrial-200 hover:text-brand-yellow transition">
                Contact
              </Link>
            </nav>

            {/* Action CTAs */}
            <div className="hidden sm:flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-industrial-900 border border-industrial-800 text-industrial-400 hover:text-white hover:border-industrial-700 transition text-xs"
                title="Search Machinery (Ctrl+K)"
              >
                <Search className="w-4 h-4 text-brand-yellow" />
                <span className="hidden md:inline">Search...</span>
                <kbd className="hidden md:inline font-mono text-[10px] bg-industrial-800 text-industrial-300 px-1.5 py-0.5 rounded border border-industrial-700">
                  ⌘K
                </kbd>
              </button>
              <Link href="/quote" className="btn-brand-primary text-xs uppercase tracking-wider py-2.5 px-5 flex items-center gap-2 shadow-gold-glow">
                <FileText className="w-4 h-4" /> Request Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="p-2 rounded-md text-industrial-400 hover:text-white hover:bg-industrial-800"
                aria-label="Open Search"
              >
                <Search className="w-5 h-5 text-brand-yellow" />
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-industrial-400 hover:text-white hover:bg-industrial-800 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-industrial-900 border-b border-industrial-800 px-4 pt-2 pb-6 space-y-3 animate-fade-in">
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-base font-semibold text-brand-yellow hover:bg-industrial-800/50 rounded"
            >
              <Search className="w-4 h-4" /> Global Search
            </Link>
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-industrial-100 hover:text-brand-yellow hover:bg-industrial-800/50 rounded"
            >
              Machinery Products
            </Link>
            <Link
              href="/applications"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-industrial-100 hover:text-brand-yellow hover:bg-industrial-800/50 rounded"
            >
              Applications & Industries
            </Link>
            <Link
              href="/finder"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-industrial-100 hover:text-brand-yellow hover:bg-industrial-800/50 rounded"
            >
              Find Right Machine
            </Link>
            <Link
              href="/products/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-industrial-100 hover:text-brand-yellow hover:bg-industrial-800/50 rounded"
            >
              Compare Machines
            </Link>
            <Link
              href="/downloads"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-industrial-100 hover:text-brand-yellow hover:bg-industrial-800/50 rounded"
            >
              Download Centre
            </Link>
            <Link
              href="/service"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-industrial-100 hover:text-brand-yellow hover:bg-industrial-800/50 rounded"
            >
              Service & Support
            </Link>
            <Link
              href="/quote"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center mt-4 btn-brand-primary text-sm py-3"
            >
              Request Official Quotation
            </Link>
          </div>
        )}
      </header>

      {/* Global Search Modal Component */}
      <GlobalSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
};
