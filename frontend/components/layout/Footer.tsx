import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-industrial-950 border-t border-industrial-800 text-industrial-300">
      {/* Top Value Banner */}
      <div className="bg-industrial-900/60 border-b border-industrial-800/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow rounded-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Make In India • Global Quality</h4>
              <p className="text-xs text-industrial-400 mt-1">
                Precision heavy engineering compliant with international crushing & screening benchmarks.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow rounded-sm">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Rapid Spare Parts & Service</h4>
              <p className="text-xs text-industrial-400 mt-1">
                Dedicated service network with genuine OEM wear parts and preventive maintenance support.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow rounded-sm">
              <ArrowUpRight className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Turnkey Project Execution</h4>
              <p className="text-xs text-industrial-400 mt-1">
                From initial flow-sheet simulation to plant commissioning and operational training.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-brand-yellow rounded-sm flex items-center justify-center font-black text-industrial-950 text-lg">
                PZ
              </div>
              <span className="text-xl font-black text-white uppercase tracking-wider">
                PUZZOLANA
              </span>
            </div>
            <p className="text-sm text-industrial-400 max-w-sm leading-relaxed">
              Pioneers in crushing, screening, and material handling solutions. Delivering high-throughput, energy-efficient aggregate and mineral processing plants across India and global markets.
            </p>
            <div className="pt-2 text-xs text-industrial-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-yellow shrink-0" />
                <span>IVRCL Towers, Road No. 10, Banjara Hills, Hyderabad - 500034, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-yellow shrink-0" />
                <span>enquiries@puzzolana.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Machinery */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wide uppercase mb-4 border-l-2 border-brand-yellow pl-2">
              Machinery
            </h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products/crushers" className="hover:text-brand-yellow transition">Jaw Crushers (PJC)</Link></li>
              <li><Link href="/products/crushers" className="hover:text-brand-yellow transition">Cone Crushers (PCC)</Link></li>
              <li><Link href="/products/crushers" className="hover:text-brand-yellow transition">VSI Impactors</Link></li>
              <li><Link href="/products/feeders-and-screens" className="hover:text-brand-yellow transition">Vibrating Screens</Link></li>
              <li><Link href="/products/mobile-crushers" className="hover:text-brand-yellow transition">Track-Mounted Plants</Link></li>
              <li><Link href="/products/road-building" className="hover:text-brand-yellow transition">Road Pavers</Link></li>
            </ul>
          </div>

          {/* Col 3: Applications & Solutions */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wide uppercase mb-4 border-l-2 border-brand-yellow pl-2">
              Applications
            </h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/applications/mining" className="hover:text-brand-yellow transition">Mining & Minerals</Link></li>
              <li><Link href="/applications/aggregates" className="hover:text-brand-yellow transition">Commercial Aggregates</Link></li>
              <li><Link href="/applications/infrastructure" className="hover:text-brand-yellow transition">Highway Infrastructure</Link></li>
              <li><Link href="/applications/waste-processing" className="hover:text-brand-yellow transition">C&D Waste Recycling</Link></li>
              <li><Link href="/turnkey-solutions" className="hover:text-brand-yellow transition">Turnkey Plant Design</Link></li>
              <li><Link href="/finder" className="hover:text-brand-yellow transition">Machine Selection Tool</Link></li>
            </ul>
          </div>

          {/* Col 4: Corporate & Portal */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wide uppercase mb-4 border-l-2 border-brand-yellow pl-2">
              Quick Links
            </h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/quote" className="hover:text-brand-yellow transition">Request Quotation</Link></li>
              <li><Link href="/track" className="hover:text-brand-yellow transition">Track Enquiry Status</Link></li>
              <li><Link href="/service" className="hover:text-brand-yellow transition">Spare Parts Enquiry</Link></li>
              <li><Link href="/dealer" className="hover:text-brand-yellow transition">Dealer Network</Link></li>
              <li><Link href="/careers" className="hover:text-brand-yellow transition">Engineering Careers</Link></li>
              <li><Link href="/admin" className="text-xs text-industrial-500 hover:text-industrial-300">Admin Portal</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-industrial-800/80 flex flex-col md:flex-row justify-between items-center text-xs text-industrial-500 gap-4">
          <p>© {new Date().getFullYear()} Puzzolana Machinery. All verified technical data preserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-industrial-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-industrial-300">Terms of Use</Link>
            <Link href="/sitemap.xml" className="hover:text-industrial-300">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
