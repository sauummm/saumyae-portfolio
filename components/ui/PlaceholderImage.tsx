import Image from 'next/image';
import { ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Asset } from '@/types';

interface PlaceholderImageProps {
  asset: Asset;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  width?: number;
  height?: number;
  /** Above-the-fold usage (e.g. hero/thumbnail) — eager-loads instead of lazy. */
  eager?: boolean;
}

/**
 * Renders `asset` as a real image once it has a `src` and `status: 'ready'`;
 * otherwise renders a labeled placeholder box — never a broken <img> and
 * never a silently blank gap. See types/index.ts `Asset` for why.
 */
export function PlaceholderImage({
  asset,
  className,
  imageClassName,
  sizes,
  width,
  height,
  eager,
}: PlaceholderImageProps) {
  if (asset.src && asset.status === 'ready') {
    const fixedSize = width && height;

    return (
      <div className={cn('relative overflow-hidden rounded-lg bg-muted', className)}>
        {fixedSize ? (
          <Image
            src={asset.src}
            alt={asset.alt}
            width={width}
            height={height}
            sizes={sizes}
            loading={eager ? 'eager' : undefined}
            fetchPriority={eager ? 'high' : undefined}
            className={cn('object-cover', imageClassName)}
          />
        ) : (
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            sizes={sizes}
            loading={eager ? 'eager' : undefined}
            fetchPriority={eager ? 'high' : undefined}
            className={cn('object-cover', imageClassName)}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted p-6 text-center',
        className
      )}
      role="img"
      aria-label={asset.alt}
    >
      <ImageOff className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
      <p className="text-sm font-medium text-muted-foreground">{asset.alt}</p>
      {asset.note && <p className="text-xs text-muted-foreground/80">{asset.note}</p>}
    </div>
  );
}
