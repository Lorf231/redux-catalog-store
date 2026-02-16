'use client';

import Image from 'next/image';

interface ProductImageProps {
  image?: string;
  title: string;
  category: string;
}

export default function ProductImage({ image, title, category }: ProductImageProps) {
  
  const cleanImageUrl = (url?: string) => {
    if (!url || !url.startsWith('http')) return 'https://placehold.co/600?text=No+Image';
    return url.replace(/["[\]]/g, '');
  };

  const imageUrl = cleanImageUrl(image);

  return (
    <figure className="relative w-full lg:w-1/2 h-96 lg:h-[500px] bg-white flex items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-gray-100">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-contain hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />
      <div className="absolute top-4 left-4 badge badge-primary badge-outline bg-white/90">
        {category}
      </div>
    </figure>
  );
}