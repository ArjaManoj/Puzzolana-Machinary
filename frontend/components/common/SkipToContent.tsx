'use client';

import React from 'react';

export const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="fixed top-3 left-4 z-50 -translate-y-28 focus:translate-y-0 bg-brand-yellow text-industrial-950 font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded shadow-2xl ring-2 ring-white ring-offset-2 ring-offset-industrial-950 transition-transform duration-200 outline-none"
    >
      Skip to main content &rarr;
    </a>
  );
};
