'use client';

import React, { useState } from 'react';
import {
  Button,
  Badge,
  Card,
  Container,
  SectionHeader,
  Input,
  Select,
  Textarea,
  Modal,
  Tabs,
  DataTable,
  CapacityBadge,
  StatCounter,
  Breadcrumb,
  EmptyState,
  Spinner,
} from '@/components/common';
import { MachineCard, SpecMatrixTable } from '@/components/machinery';
import { MachineryProduct } from '@/types';
import { Layers, ShieldCheck, Zap, SlidersHorizontal, Download } from 'lucide-react';

export default function DesignSystemPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const sampleProduct: MachineryProduct = {
    id: 'pjc-14076',
    name: 'Primary Jaw Crusher PJC 14076',
    slug: 'pjc-14076',
    category: 'crushers',
    categoryName: 'Crushers',
    subcategory: 'Jaw Crushers',
    productFamily: 'PJC Heavy Duty Series',
    modelNumber: 'PJC 14076',
    shortDescription: 'High-throughput primary single-toggle jaw crusher engineered for high compressive strength abrasive granite and basalt quarrying.',
    fullDescription: 'The Puzzolana PJC 14076 offers deep symmetrical crushing chamber design, high reduction ratio, and forged alloy steel eccentric shaft.',
    primaryImage: '/images/products/pjc-14076.png',
    galleryImages: [],
    capacityMinTPH: 350,
    capacityMaxTPH: 600,
    maxFeedSizeMM: 850,
    powerRatingKW: 160,
    dischargeSizeMM: '100 - 250 mm',
    mobilityType: 'Stationary',
    applications: ['Granite Quarrying', 'Mining Primary Crushing', 'Basalt Aggregate Production'],
    materialsHandled: ['Granite', 'Basalt', 'Iron Ore', 'Quartzite'],
    features: ['Forged alloy steel eccentric shaft', 'Hydraulic gap setting adjustment', 'Heavy duty cast steel frame'],
    benefits: ['High reduction ratio', 'Low energy consumption per ton', 'Extended liner service life'],
    specifications: [
      {
        groupName: 'General',
        specifications: [
          { name: 'Feed Opening (Width x Depth)', value: '1400 x 760', unit: 'mm' },
          { name: 'Max Feed Size', value: '850', unit: 'mm' },
          { name: 'CSS Discharge Range', value: '100 - 250', unit: 'mm' },
        ],
      },
      {
        groupName: 'Power',
        specifications: [
          { name: 'Electric Motor Power', value: '160', unit: 'kW (215 HP)' },
          { name: 'Flywheel Speed', value: '250', unit: 'RPM' },
        ],
      },
      {
        groupName: 'Dimensions',
        specifications: [
          { name: 'Total Weight', value: '42,500', unit: 'kg' },
          { name: 'Overall Dimensions (L x W x H)', value: '4150 x 2850 x 3100', unit: 'mm' },
        ],
      },
    ],
    relatedProductSlugs: ['pjc-12090', 'pcc-cone-series'],
    status: 'published',
  };

  const sampleTableData = [
    { model: 'PJC 9060', feedOpening: '900 x 600 mm', maxFeed: '500 mm', power: '75 kW', capacity: '120 - 250 TPH' },
    { model: 'PJC 11075', feedOpening: '1100 x 750 mm', maxFeed: '650 mm', power: '110 kW', capacity: '200 - 400 TPH' },
    { model: 'PJC 14076', feedOpening: '1400 x 760 mm', maxFeed: '850 mm', power: '160 kW', capacity: '350 - 600 TPH' },
    { model: 'PJC 16012', feedOpening: '1600 x 1200 mm', maxFeed: '1050 mm', power: '250 kW', capacity: '600 - 1100 TPH' },
  ];

  const tableColumns = [
    { key: 'model', header: 'Model Number', isSticky: true },
    { key: 'feedOpening', header: 'Feed Opening' },
    { key: 'maxFeed', header: 'Max Feed Size' },
    { key: 'power', header: 'Motor Power' },
    { key: 'capacity', header: 'Rated Capacity' },
  ];

  return (
    <div className="py-12 bg-industrial-950 min-h-screen text-industrial-100">
      <Container size="lg" className="space-y-16">
        {/* Breadcrumb Header */}
        <Breadcrumb items={[{ label: 'Developer Portal' }, { label: 'Industrial Design System' }]} />

        <SectionHeader
          badge="Design System & Component Library"
          title="PUZZOLANA INDUSTRIAL DESIGN TOKENS"
          subtitle="Enterprise atomic components, heavy-engineering color palette, responsive technical data matrices, and verified metrics counters."
        />

        {/* 1. Color Palette Tokens */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider border-l-2 border-brand-yellow pl-3">
            1. Industrial Color System
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded bg-[#E6A817] text-industrial-950 font-mono font-bold text-xs shadow-gold-glow">
              <span className="block text-sm font-black">Brand Yellow</span>
              #E6A817 (PZ Gold)
            </div>
            <div className="p-4 rounded bg-[#D49405] text-white font-mono font-bold text-xs">
              <span className="block text-sm font-black">Safety Amber</span>
              #D49405
            </div>
            <div className="p-4 rounded bg-[#11141A] text-white font-mono font-bold text-xs border border-industrial-800">
              <span className="block text-sm font-black">Charcoal 900</span>
              #11141A
            </div>
            <div className="p-4 rounded bg-[#181C24] text-white font-mono font-bold text-xs border border-industrial-700">
              <span className="block text-sm font-black">Industrial 850</span>
              #181C24
            </div>
            <div className="p-4 rounded bg-[#323B4C] text-white font-mono font-bold text-xs">
              <span className="block text-sm font-black">Steel 700</span>
              #323B4C
            </div>
            <div className="p-4 rounded bg-[#0B0D11] text-white font-mono font-bold text-xs border border-industrial-800">
              <span className="block text-sm font-black">Void 950</span>
              #0B0D11
            </div>
          </div>
        </section>

        {/* 2. Buttons & Badges */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider border-l-2 border-brand-yellow pl-3">
            2. Action Buttons & Status Badges
          </h3>
          <div className="flex flex-wrap items-center gap-4 p-6 bg-industrial-900 border border-industrial-800 rounded">
            <Button variant="primary">Primary Quote Action</Button>
            <Button variant="secondary">Secondary Explorer</Button>
            <Button variant="outline">Technical Outline</Button>
            <Button variant="ghost">Ghost Link</Button>
            <Button variant="primary" isLoading>Submitting</Button>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>Open Quote Modal</Button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="yellow">Make in India</Badge>
            <Badge variant="emerald">Verified Specification</Badge>
            <Badge variant="steel">Track Mounted</Badge>
            <Badge variant="charcoal">ISO 9001:2015</Badge>
            <CapacityBadge minTPH={350} maxTPH={600} />
          </div>
        </section>

        {/* 3. Database-Driven Statistics Counter (Issue 1 Solved) */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider border-l-2 border-brand-yellow pl-3">
            3. Verified Company Statistics Engine (Hides 0 / Inactive)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCounter value={50} suffix="+" label="Years of Engineering Heritage" source="Corporate Charter" lastUpdated="2026-01-15" />
            <StatCounter value={5000} suffix="+" label="Plant Installations" source="Sales Operations" lastUpdated="2026-01-15" />
            <StatCounter value={35} suffix="+" label="Countries Exported" source="Export Division" lastUpdated="2026-01-15" />
            <StatCounter value={4} label="Heavy Manufacturing Units" source="Infrastructure Audit" lastUpdated="2026-01-15" />
          </div>
        </section>

        {/* 4. Machinery Product Card */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider border-l-2 border-brand-yellow pl-3">
            4. Machinery Product Card
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MachineCard
              product={sampleProduct}
              isCompared={compareIds.includes(sampleProduct.id)}
              onToggleCompare={(id) =>
                setCompareIds((prev) =>
                  prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
                )
              }
              onRequestQuote={() => setIsModalOpen(true)}
            />
          </div>
        </section>

        {/* 5. Technical Tabs & Specification Matrix Table */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider border-l-2 border-brand-yellow pl-3">
            5. Technical Specification Matrix & Responsive Data Tables
          </h3>
          <Tabs
            tabs={[
              { id: 'overview', label: 'Overview Matrix', icon: <Layers className="w-4 h-4" /> },
              { id: 'specs', label: 'Full Engineering Specs', icon: <SlidersHorizontal className="w-4 h-4" /> },
              { id: 'downloads', label: 'Documents & CAD', icon: <Download className="w-4 h-4" />, badge: 2 },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {activeTab === 'overview' && (
            <DataTable
              columns={tableColumns}
              data={sampleTableData}
              keyExtractor={(item) => item.model}
            />
          )}

          {activeTab === 'specs' && (
            <SpecMatrixTable groups={sampleProduct.specifications} modelNumber={sampleProduct.modelNumber} />
          )}

          {activeTab === 'downloads' && (
            <EmptyState
              title="CAD Drawings & Technical Datasheets"
              description="Official engineering drawings and PDF brochures for PJC 14076 are available for download."
              actionLabel="Download Technical PDF"
              onAction={() => alert('Download initiated')}
            />
          )}
        </section>

        {/* 6. Form Components Preview */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider border-l-2 border-brand-yellow pl-3">
            6. Industrial Form Fields
          </h3>
          <Card className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input label="Full Name" placeholder="e.g. Ramesh Kumar" required />
            <Select
              label="Application Sector"
              options={[
                { value: 'aggregates', label: 'Commercial Aggregates' },
                { value: 'mining', label: 'Mining & Mineral Processing' },
                { value: 'infrastructure', label: 'Highway & Road Building' },
              ]}
              placeholder="Select Industry"
              required
            />
            <Textarea label="Project Requirements / Feed Material" placeholder="Specify maximum feed lump size and desired TPH capacity..." />
          </Card>
        </section>
      </Container>

      {/* Interactive Quotation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="REQUEST B2B QUOTATION"
        subtitle="Official engineering quotation from Puzzolana Machinery Sales Desk"
        size="lg"
      >
        <div className="space-y-4">
          <div className="bg-industrial-950 p-3 rounded border border-brand-yellow/30 flex items-center justify-between text-xs">
            <span className="font-bold text-white">Selected Equipment: {sampleProduct.name}</span>
            <CapacityBadge minTPH={sampleProduct.capacityMinTPH} maxTPH={sampleProduct.capacityMaxTPH} size="sm" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Contact Person" placeholder="Your Name" required />
            <Input label="Company Name" placeholder="Organization / Quarry Name" required />
            <Input label="Work Email" type="email" placeholder="name@company.com" required />
            <Input label="Mobile / WhatsApp" placeholder="+91 98765 43210" required />
          </div>
          <Textarea label="Required Output Fraction & Sizing" placeholder="e.g. 0-5mm, 10-20mm, 20-40mm aggregate output..." />
          <div className="flex justify-end gap-3 pt-3 border-t border-industrial-800">
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={() => { alert('Quotation request simulated!'); setIsModalOpen(false); }}>
              Submit Official RFQ
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
