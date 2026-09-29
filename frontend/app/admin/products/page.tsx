'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Cpu,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  ArrowUpDown,
  X,
  Check,
  Zap,
  Layers,
  Sparkles,
  Shield,
  Tag,
  FileText,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { VERIFIED_FRONTEND_PRODUCTS, OFFICIAL_CATEGORIES } from '@/lib/seedCatalog';
import { MachineryProduct, EquipmentCategorySlug } from '@/types';
import { getApiBaseUrl } from '@/lib/api';

export default function AdminProductsPage() {
  const router = useRouter();
  const { user, token, isAuthenticated, isAdmin, isEditor, isLoading: authLoading } = useAuth();

  const [products, setProducts] = useState<MachineryProduct[]>(VERIFIED_FRONTEND_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modal State for Create / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<MachineryProduct | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete Confirm State
  const [deletingProduct, setDeletingProduct] = useState<MachineryProduct | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    modelNumber: '',
    slug: '',
    category: 'crushers' as EquipmentCategorySlug,
    categoryName: 'Crushers',
    subcategory: 'Jaw Crushers',
    productFamily: 'PJC Heavy Duty Series',
    capacityMinTPH: 150,
    capacityMaxTPH: 450,
    maxFeedSizeMM: 650,
    powerRatingKW: 110,
    dischargeSizeMM: '75 - 180 mm',
    mobilityType: 'Stationary' as 'Stationary' | 'Track-Mounted' | 'Wheel-Mounted',
    shortDescription: '',
    fullDescription: '',
    status: 'published' as 'published' | 'draft',
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [authLoading, isAuthenticated, router]);

  // Load from API if token available
  const fetchProducts = async () => {
    setIsRefreshing(true);
    try {
      if (token) {
        const res = await fetch(`${getApiBaseUrl()}/admin/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            setProducts(json.data);
          }
        }
      }
    } catch {
      // Retain robust verified seed catalog
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated, token]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      id: `PZ-NEW-${Date.now().toString().slice(-4)}`,
      name: '',
      modelNumber: '',
      slug: '',
      category: 'crushers',
      categoryName: 'Crushers',
      subcategory: 'Jaw Crushers',
      productFamily: 'PJC Heavy Duty Series',
      capacityMinTPH: 200,
      capacityMaxTPH: 500,
      maxFeedSizeMM: 700,
      powerRatingKW: 132,
      dischargeSizeMM: '80 - 180 mm',
      mobilityType: 'Stationary',
      shortDescription: '',
      fullDescription: '',
      status: 'published',
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (prod: MachineryProduct) => {
    setEditingProduct(prod);
    setFormData({
      id: prod.id,
      name: prod.name,
      modelNumber: prod.modelNumber,
      slug: prod.slug,
      category: prod.category,
      categoryName: prod.categoryName || 'Crushers',
      subcategory: prod.subcategory,
      productFamily: prod.productFamily,
      capacityMinTPH: prod.capacityMinTPH,
      capacityMaxTPH: prod.capacityMaxTPH,
      maxFeedSizeMM: prod.maxFeedSizeMM,
      powerRatingKW: prod.powerRatingKW || 110,
      dischargeSizeMM: prod.dischargeSizeMM || '75 - 180 mm',
      mobilityType: prod.mobilityType === 'Track-Mounted' ? 'Track-Mounted' : prod.mobilityType === 'Wheel-Mounted' ? 'Wheel-Mounted' : 'Stationary',
      shortDescription: prod.shortDescription,
      fullDescription: prod.fullDescription,
      status: (prod as any).status || 'published',
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  // Submit Create or Edit Form
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation (Zero-Suppression Engine Compliance)
    if (!formData.name.trim() || !formData.modelNumber.trim()) {
      setFormError('Product Name and Model Number are mandatory.');
      return;
    }
    if (formData.capacityMaxTPH <= 0 || formData.capacityMinTPH <= 0) {
      setFormError('Capacity ratings must be strictly positive non-zero numbers.');
      return;
    }
    if (formData.capacityMaxTPH < formData.capacityMinTPH) {
      setFormError('Maximum capacity cannot be smaller than minimum capacity.');
      return;
    }
    if (formData.powerRatingKW <= 0 || formData.maxFeedSizeMM <= 0) {
      setFormError('Motor Power rating and Max Feed Size must be strictly positive.');
      return;
    }

    setIsSaving(true);
    try {
      const generatedSlug = formData.slug.trim() || formData.modelNumber.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      const payload: Partial<MachineryProduct> = {
        id: formData.id || formData.modelNumber,
        name: formData.name,
        modelNumber: formData.modelNumber,
        slug: generatedSlug,
        category: formData.category,
        categoryName: OFFICIAL_CATEGORIES.find((c) => c.id === formData.category)?.name || formData.categoryName,
        subcategory: formData.subcategory,
        productFamily: formData.productFamily,
        capacityMinTPH: Number(formData.capacityMinTPH),
        capacityMaxTPH: Number(formData.capacityMaxTPH),
        maxFeedSizeMM: Number(formData.maxFeedSizeMM),
        powerRatingKW: Number(formData.powerRatingKW),
        dischargeSizeMM: formData.dischargeSizeMM,
        mobilityType: formData.mobilityType,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        primaryImage: editingProduct?.primaryImage || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        galleryImages: editingProduct?.galleryImages || [],
        applications: editingProduct?.applications || ['Aggregates & Quarrying', 'Highway Construction'],
        materialsHandled: editingProduct?.materialsHandled || ['Granite', 'Basalt', 'Iron Ore'],
        features: editingProduct?.features || ['Heavy alloy steel construction', 'Hydraulic gap shim adjustment'],
        benefits: editingProduct?.benefits || ['High reduction efficiency', 'Low kWh energy consumption per ton'],
        specifications: editingProduct?.specifications || [
          {
            groupName: 'General',
            specifications: [
              { name: 'Maximum Feed Size', value: `${formData.maxFeedSizeMM}`, unit: 'mm' },
              { name: 'Discharge Setting Range (CSS)', value: formData.dischargeSizeMM, unit: 'mm' },
            ],
          },
          {
            groupName: 'Capacity',
            specifications: [
              { name: 'Capacity Range', value: `${formData.capacityMinTPH} - ${formData.capacityMaxTPH}`, unit: 'TPH' },
            ],
          },
          {
            groupName: 'Power',
            specifications: [
              { name: 'Electric Motor Rating', value: `${formData.powerRatingKW}`, unit: 'kW' },
            ],
          },
        ],
      };

      if (editingProduct) {
        // Update
        if (token) {
          await fetch(`${getApiBaseUrl()}/admin/products/${editingProduct.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          });
        }
        setProducts((prev) =>
          prev.map((item) => (item.id === editingProduct.id ? ({ ...item, ...payload } as MachineryProduct) : item))
        );
      } else {
        // Create
        if (token) {
          await fetch(`${getApiBaseUrl()}/admin/products`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          });
        }
        setProducts((prev) => [payload as MachineryProduct, ...prev]);
      }

      setIsModalOpen(false);
    } catch (err) {
      setFormError((err as Error).message || 'Failed to save product changes.');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Product
  const handleDeleteConfirm = async () => {
    if (!deletingProduct) return;
    setIsDeleting(true);
    try {
      if (token) {
        await fetch(`${getApiBaseUrl()}/admin/products/${deletingProduct.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setProducts((prev) => prev.filter((item) => item.id !== deletingProduct.id));
      setDeletingProduct(null);
    } catch (err) {
      console.error('Delete error', err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered List
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        p.modelNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.productFamily.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-industrial-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Fleet Management Area */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-industrial-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-industrial-400 uppercase tracking-wider">
              <span>Engineering Ops</span>
              <span className="text-industrial-600">•</span>
              <span className="text-brand-yellow">Machinery Specifications</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-1 flex items-center gap-3">
              <Cpu className="w-7 h-7 text-brand-yellow" />
              Machinery Fleet Manager
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchProducts}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-industrial-900 hover:bg-industrial-800 text-industrial-300 hover:text-white border border-industrial-800 transition text-xs font-semibold"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-brand-yellow' : ''}`} />
              <span>Sync Fleet</span>
            </button>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="btn-brand-primary text-xs uppercase tracking-wider py-2 px-4 flex items-center gap-1.5 shadow-gold-glow"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Model</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-industrial-900 border border-industrial-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-industrial-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search model code (e.g. PJC 14076), series, or name..."
              className="w-full bg-industrial-950 border border-industrial-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-industrial-500 focus:outline-none focus:border-brand-yellow"
            />
          </div>

          <div className="flex items-center flex-wrap gap-2 text-xs">
            <span className="text-industrial-400 font-semibold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-brand-yellow" /> Category:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-industrial-950 border border-industrial-700 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-yellow"
            >
              <option value="all">All 8 Segments ({products.length})</option>
              {OFFICIAL_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Data Table */}
        <div className="bg-industrial-900 border border-industrial-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-industrial-800 flex items-center justify-between text-xs text-industrial-400">
            <span>
              Total Fleet Models: <strong className="text-white font-mono">{filteredProducts.length}</strong>
            </span>
            <span className="text-[11px] font-mono text-brand-yellow">Zero-Suppression Spec Validated</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-industrial-950 text-industrial-400 font-mono uppercase tracking-wider border-b border-industrial-800">
                <tr>
                  <th className="py-3.5 px-4">Model & Name</th>
                  <th className="py-3.5 px-4">Segment / Subcategory</th>
                  <th className="py-3.5 px-4 text-right">Rated TPH</th>
                  <th className="py-3.5 px-4 text-right">Motor (kW)</th>
                  <th className="py-3.5 px-4 text-right">Feed (mm)</th>
                  <th className="py-3.5 px-4">Mobility</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-industrial-800/60 font-medium text-industrial-300">
                {filteredProducts.map((p) => {
                  const isTrack = p.mobilityType === 'Track-Mounted';
                  return (
                    <tr key={p.id} className="hover:bg-industrial-800/30 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white font-mono flex items-center gap-2">
                          <span>{p.modelNumber}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-industrial-800 text-industrial-400 font-sans">
                            {p.productFamily}
                          </span>
                        </div>
                        <div className="text-[11px] text-industrial-400 line-clamp-1 mt-0.5">{p.name}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-industrial-200 capitalize">{p.category}</span>
                        <div className="text-[10px] text-industrial-500">{p.subcategory}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-brand-yellow">
                        {p.capacityMinTPH} - {p.capacityMaxTPH}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-industrial-200">
                        {p.powerRatingKW ? `${p.powerRatingKW} kW` : 'Custom'}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-industrial-300">
                        {p.maxFeedSizeMM ? `${p.maxFeedSizeMM} mm` : '—'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            isTrack
                              ? 'bg-amber-950/80 text-amber-400 border border-amber-800/60'
                              : 'bg-industrial-950 text-industrial-300 border border-industrial-800'
                          }`}
                        >
                          {p.mobilityType}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                          Published
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/products/${p.category}/${p.slug}`}
                            target="_blank"
                            className="p-1.5 rounded bg-industrial-950 hover:bg-industrial-800 text-industrial-400 hover:text-white transition"
                            title="Preview Public Page"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 rounded bg-industrial-800 hover:bg-brand-yellow hover:text-industrial-950 text-industrial-300 transition"
                            title="Edit Technical Specifications"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() => setDeletingProduct(p)}
                              className="p-1.5 rounded bg-industrial-950 hover:bg-red-950 text-industrial-500 hover:text-red-400 transition"
                              title="Delete/Archive Model (Admin Only)"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Create / Edit Technical Specification Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl bg-industrial-900 border border-industrial-700 rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 border-b border-industrial-800 bg-industrial-950 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                  {editingProduct ? `Edit ${editingProduct.modelNumber}` : 'Create Machinery Model'}
                </h3>
                <p className="text-xs text-industrial-400">
                  Configure technical capacity ratings, power drive, and CSS ranges
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-industrial-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-5 text-xs">
              {formError && (
                <div className="p-3 bg-red-950/80 border border-red-800 text-red-300 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Identification Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-industrial-300 mb-1">
                    Model Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.modelNumber}
                    onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })}
                    placeholder="e.g. PJC 14076"
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-lg p-2.5 text-white font-mono focus:border-brand-yellow focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-industrial-300 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. pjc-14076"
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-lg p-2.5 text-white font-mono focus:border-brand-yellow focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold uppercase tracking-wider text-industrial-300 mb-1">
                    Full Equipment Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Primary Heavy Duty Single-Toggle Jaw Crusher PJC 14076"
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-lg p-2.5 text-white focus:border-brand-yellow focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-industrial-300 mb-1">
                    Equipment Segment *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-lg p-2.5 text-white focus:border-brand-yellow focus:outline-none"
                  >
                    {OFFICIAL_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-industrial-300 mb-1">
                    Subcategory / Family
                  </label>
                  <input
                    type="text"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    placeholder="e.g. Jaw Crushers"
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-lg p-2.5 text-white focus:border-brand-yellow focus:outline-none"
                  />
                </div>
              </div>

              {/* Technical Ratings Grid */}
              <div className="pt-2 border-t border-industrial-800">
                <h4 className="font-bold uppercase tracking-wider text-brand-yellow mb-3 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Technical Ratings (Zero-Suppression Guarded)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-bold text-industrial-300 mb-1">Min TPH *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.capacityMinTPH}
                      onChange={(e) => setFormData({ ...formData, capacityMinTPH: parseInt(e.target.value, 10) || 0 })}
                      className="w-full bg-industrial-950 border border-industrial-700 rounded-lg p-2 text-white font-mono focus:border-brand-yellow focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-industrial-300 mb-1">Max TPH *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.capacityMaxTPH}
                      onChange={(e) => setFormData({ ...formData, capacityMaxTPH: parseInt(e.target.value, 10) || 0 })}
                      className="w-full bg-industrial-950 border border-industrial-700 rounded-lg p-2 text-white font-mono focus:border-brand-yellow focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-industrial-300 mb-1">Max Feed (mm) *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.maxFeedSizeMM}
                      onChange={(e) => setFormData({ ...formData, maxFeedSizeMM: parseInt(e.target.value, 10) || 0 })}
                      className="w-full bg-industrial-950 border border-industrial-700 rounded-lg p-2 text-white font-mono focus:border-brand-yellow focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-industrial-300 mb-1">Motor (kW) *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.powerRatingKW}
                      onChange={(e) => setFormData({ ...formData, powerRatingKW: parseInt(e.target.value, 10) || 0 })}
                      className="w-full bg-industrial-950 border border-industrial-700 rounded-lg p-2 text-white font-mono focus:border-brand-yellow focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block font-bold text-industrial-300 mb-1">
                      Discharge Range (CSS)
                    </label>
                    <input
                      type="text"
                      value={formData.dischargeSizeMM}
                      onChange={(e) => setFormData({ ...formData, dischargeSizeMM: e.target.value })}
                      placeholder="e.g. 90 - 200 mm"
                      className="w-full bg-industrial-950 border border-industrial-700 rounded-lg p-2.5 text-white font-mono focus:border-brand-yellow focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-industrial-300 mb-1">
                      Mobility Architecture
                    </label>
                    <select
                      value={formData.mobilityType}
                      onChange={(e) => setFormData({ ...formData, mobilityType: e.target.value as any })}
                      className="w-full bg-industrial-950 border border-industrial-700 rounded-lg p-2.5 text-white focus:border-brand-yellow focus:outline-none"
                    >
                      <option value="Stationary">Stationary Foundational</option>
                      <option value="Track-Mounted">Track-Mounted Mobile</option>
                      <option value="Wheel-Mounted">Wheel-Mounted Semi-Mobile</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pt-2 border-t border-industrial-800 space-y-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-industrial-300 mb-1">
                    Short Overview Summary
                  </label>
                  <textarea
                    rows={2}
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="Brief technical summary displayed on catalog grids and finder matrices..."
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-lg p-2.5 text-white focus:border-brand-yellow focus:outline-none"
                  />
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-industrial-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-industrial-800 hover:bg-industrial-700 text-industrial-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn-brand-primary px-5 py-2 uppercase tracking-wider font-bold flex items-center gap-1.5 shadow-gold-glow"
                >
                  {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                  <span>{editingProduct ? 'Update Model' : 'Create Model'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-industrial-900 border border-red-800/80 rounded-xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <div className="w-10 h-10 rounded-full bg-red-950 flex items-center justify-center border border-red-800">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Archive Machinery Model
                </h3>
                <p className="text-xs font-mono text-red-400">{deletingProduct.modelNumber}</p>
              </div>
            </div>

            <p className="text-xs text-industrial-300 leading-relaxed">
              Are you sure you want to remove <strong className="text-white">{deletingProduct.name}</strong> from the
              public product catalogue? This action will be logged in the immutable engineering audit trail.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingProduct(null)}
                className="px-4 py-2 rounded-lg bg-industrial-800 hover:bg-industrial-700 text-industrial-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
              >
                {isDeleting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>Confirm Archive</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
