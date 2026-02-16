'use client';

import { Suspense } from 'react';
import CatalogContent from '@/components/catalog/CatalogContent';
import Loader from '@/components/ui/Loader';

export default function CatalogPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 min-h-screen bg-gray-50">
      
      <div className="lg:hidden mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Каталог</h1>
      </div>

      <Suspense fallback={
        <div className="flex h-[50vh] items-center justify-center">
          <Loader centered variant="spinner" size="lg" />
        </div>
      }>
        <CatalogContent />
      </Suspense>
    </div>
  );
}