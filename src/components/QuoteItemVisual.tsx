import { useState } from 'react';
import { Laptop, Monitor, Computer, Headphones, Keyboard, Cable, Wrench, Package } from 'lucide-react';
import type { Product } from '../lib/store-data';

const categoryIcons = {
  Laptops: Laptop,
  Monitors: Monitor,
  Desktops: Computer,
  Workstations: Computer,
  Docks: Cable,
  'Computer Accessories': Headphones,
  'Input Devices': Keyboard,
};

export default function QuoteItemVisual({ product, name, kind, layout = 'quote' }: { product?: Product; name: string; kind: 'product' | 'service'; layout?: 'quote' | 'catalog' }) {
  const [failedSource, setFailedSource] = useState<string | undefined>();
  const image = product?.image;
  const isService = kind === 'service' || product?.id.startsWith('service-');
  const Icon = kind === 'service' || product?.id.startsWith('service-')
    ? Wrench
    : categoryIcons[product?.category as keyof typeof categoryIcons] || Package;

  return (
    <div className={`quote-item-visual flex shrink-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-xl ${isService && image ? 'p-0' : 'p-3'} ${layout === 'catalog' ? 'mb-4 h-44 w-full sm:h-48' : 'h-28 w-32 sm:h-36 sm:w-40'}`} title={product?.imageCaption}>
      {image && image !== failedSource ? (
        <img
          src={image}
          alt={name}
          width={160}
          height={144}
          loading="lazy"
          decoding="async"
          className={`min-h-0 w-full flex-1 ${isService ? 'object-cover' : 'object-contain'}`}
          onError={() => setFailedSource(image)}
        />
      ) : (
        <>
          <Icon className="h-10 w-10" aria-hidden="true" />
          <span className="text-center text-[10px] font-medium leading-tight">
            {kind === 'service' || product?.id.startsWith('service-') ? 'IT service' : 'Product photo coming soon'}
          </span>
        </>
      )}
      {image && image !== failedSource && product?.imageCaption && (
        <span className="text-center text-[9px] leading-tight">{product.imageCaption}</span>
      )}
    </div>
  );
}
