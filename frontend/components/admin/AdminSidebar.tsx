'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Cpu,
  FileText,
  Layers,
  BarChart3,
  Download,
  Users,
  Shield,
  LogOut,
  Settings,
  ExternalLink,
  Activity,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const ADMIN_NAV_LINKS = [
  { href: '/admin/dashboard', label: 'Command Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Machinery Fleet', icon: Cpu },
  { href: '/admin/content', label: 'Content & Articles', icon: FileText },
  { href: '/finder', label: 'Machine Finder Simulator', icon: Layers, external: true },
  { href: '/downloads', label: 'Technical Downloads', icon: Download, external: true },
  { href: '/dealers', label: 'Dealer Network', icon: Users, external: true },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 bg-industrial-950 border-r border-industrial-800 flex flex-col h-screen sticky top-0 shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-industrial-800 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-brand-yellow rounded-sm flex items-center justify-center font-black text-industrial-950 text-lg shadow-gold-glow">
            PZ
          </div>
          <div>
            <span className="text-sm font-black text-white uppercase tracking-wider block leading-none">
              PUZZOLANA
            </span>
            <span className="text-[9px] tracking-widest text-brand-yellow font-bold uppercase block mt-1">
              OPS COMMAND
            </span>
          </div>
        </Link>
      </div>

      {/* Role / Current Session Card */}
      <div className="p-4 mx-3 my-3 rounded-lg bg-industrial-900 border border-industrial-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Shield className="w-3.5 h-3.5 text-brand-yellow" />
            <span className="truncate">{user?.name || 'Administrator'}</span>
          </div>
          <span
            className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase font-mono ${
              isAdmin
                ? 'bg-red-950/80 text-red-400 border border-red-800/60'
                : 'bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30'
            }`}
          >
            {user?.role || 'ADMIN'}
          </span>
        </div>
        <p className="text-[11px] text-industrial-400 truncate mt-1">{user?.email || 'admin@puzzolana.com'}</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-industrial-500">
          Management Subsystems
        </div>
        {ADMIN_NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          if (link.external) {
            return (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold text-industrial-400 hover:text-industrial-100 hover:bg-industrial-900 transition"
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-industrial-500" />
                  <span>{link.label}</span>
                </span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </Link>
            );
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition ${
                isActive
                  ? 'bg-brand-yellow text-industrial-950 font-bold shadow-gold-glow'
                  : 'text-industrial-300 hover:text-white hover:bg-industrial-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-industrial-950' : 'text-brand-yellow'}`} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / System Status & Logout */}
      <div className="p-3 border-t border-industrial-800 space-y-2">
        <div className="flex items-center justify-between px-2 py-1 text-[10px] text-industrial-400">
          <span className="flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Telemetry Live</span>
          </span>
          <span className="font-mono text-industrial-500">v1.0-PROD</span>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-industrial-900 hover:bg-red-950/50 text-industrial-300 hover:text-red-300 border border-industrial-800 hover:border-red-800/60 transition text-xs font-semibold"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Secure Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
