'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTheme } from 'nextra-theme-docs';
import { ImageZoom } from 'nextra/components';

type Props = {
  baseName: string;
  extension?: string;
  alt?: string;
  hasThemedImage?: boolean;
  [key: string]: unknown;
};

type DerivedTheme = 'light' | 'dark';

export default function ThemedImage({
  baseName,
  alt = '',
  extension = 'png',
  hasThemedImage = false,
  ...props
}: Props) {
  const { theme = 'system' } = useTheme();
  const [derivedTheme, setDerivedTheme] = useState<DerivedTheme | null>(null);

  useEffect(() => {
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDerivedTheme(isDark ? 'dark' : 'light');
    } else {
      setDerivedTheme(theme as DerivedTheme);
    }
  }, [theme]);

  // List of possible image sources, from most specific to least
  const candidates = useMemo(() => {
    // Don't generate candidates until we have the actual derived theme
    if (derivedTheme === null) {
      return [];
    }

    const candidates: string[] = [];

    if (hasThemedImage) {
      candidates.push(`/${baseName}-${derivedTheme}.${extension}`);
    }

    candidates.push(`/${baseName}.${extension}`);

    return candidates;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [derivedTheme]);

  const [srcIndex, setSrcIndex] = useState(0);

  useEffect(() => {
    setSrcIndex(0);
  }, [candidates]);

  // Don't render until we have determined the actual theme
  if (derivedTheme === null || candidates.length === 0) {
    return null;
  }

  return (
    <ImageZoom
      src={candidates[srcIndex]}
      alt={alt}
      onError={() => {
        if (srcIndex < candidates.length - 1) setSrcIndex(srcIndex + 1);
      }}
      data-pagefind-index-attrs='title,alt'
      {...props}
    />
  );
}
