'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Layers, ZoomIn, Maximize2, Shield } from 'lucide-react';
import { CapacityBadge } from '../common/CapacityBadge';

interface ProductGalleryProps {
  primaryImage: string;
  galleryImages: string[];
  productName: string;
  modelNumber: string;
  minTPH: number;
  maxTPH: number;
  mobilityType: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  primaryImage,
  galleryImages,
  productName,
  modelNumber,
  minTPH,
  maxTPH,
  mobilityType,
}) => {
  const allImages = [primaryImage, ...(galleryImages || [])].filter(Boolean);
  const [selectedImage, setSelectedImage] = useState<string>(allImages[0] || primaryImage);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  return (
    <div className="space-y-4">
      {/* Main Image Stage */}
      <div className="relative h-[340px] sm:h-[440px] lg:h-[480px] bg-industrial-950 border border-industrial-800 rounded-sm overflow-hidden flex items-center justify-center p-6 group">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#323b4c10_1px,transparent_1px),linear-gradient(to_bottom,#323b4c10_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Primary Machinery Image */}
        {selectedImage ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={selectedImage}
              alt={`${productName} - ${modelNumber}`}
              className={`max-h-full max-w-full object-contain rounded transition-transform duration-300 ${
                isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in group-hover:scale-105'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-industrial-500">
            <Layers className="w-16 h-16 text-brand-yellow/50 mb-3" />
            <span className="text-sm font-mono uppercase tracking-wider text-industrial-400">
              Technical CAD Model Preview
            </span>
          </div>
        )}

        {/* Overlay Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="bg-industrial-900/90 backdrop-blur border border-industrial-700 px-3 py-1 rounded text-xs font-mono font-bold text-white flex items-center gap-1.5 shadow">
            <Shield className="w-3.5 h-3.5 text-brand-yellow" />
            <span>Heavy Duty Indian Build</span>
          </div>
          <span className="bg-industrial-950/90 backdrop-blur border border-industrial-800 px-2.5 py-0.5 rounded text-[11px] font-mono text-industrial-300 w-fit">
            {mobilityType}
          </span>
        </div>

        {/* Bottom Capacity Pill */}
        <div className="absolute bottom-4 left-4">
          <CapacityBadge minTPH={minTPH} maxTPH={maxTPH} size="md" />
        </div>

        {/* Zoom Trigger Button */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute bottom-4 right-4 p-2 bg-industrial-900/80 hover:bg-industrial-800 text-industrial-300 hover:text-white rounded border border-industrial-700 backdrop-blur transition-colors"
          title={isZoomed ? 'Reset Zoom' : 'Zoom In'}
        >
          <ZoomIn className="w-4 h-4" />
        </button>
      </div>

      {/* Thumbnails Row */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedImage(img);
                setIsZoomed(false);
              }}
              className={`relative w-20 h-20 flex-shrink-0 bg-industrial-950 rounded-sm border p-1 overflow-hidden transition-all ${
                selectedImage === img
                  ? 'border-brand-yellow shadow-md shadow-brand-yellow/10 ring-1 ring-brand-yellow'
                  : 'border-industrial-800 hover:border-industrial-700 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover rounded-sm"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
