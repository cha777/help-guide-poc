'use client';

import { useTheme } from 'nextra-theme-docs';
import { useState, useEffect } from 'react';

type Props = {
  baseName: string;
  extension?: string;
  alt?: string;
  [key: string]: unknown;
};

type DerivedTheme = 'light' | 'dark';

export default function ThemedImage({ baseName, alt = '', extension = 'png', ...props }: Props) {
  const { theme = 'system' } = useTheme();

  const [derivedTheme, setDerivedTheme] = useState<DerivedTheme>('light');

  useEffect(() => {
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDerivedTheme(isDark ? 'dark' : 'light');
    } else {
      setDerivedTheme(theme as DerivedTheme);
    }
  }, [theme]);

  // List of possible image sources, from most specific to least
  const candidates = [`/${baseName}-${derivedTheme}.${extension}`, `/${baseName}.${extension}`];

  const [srcIndex, setSrcIndex] = useState(0);

  useEffect(() => {
    setSrcIndex(0);
  }, [derivedTheme, baseName]);

  // fixme: handle image loading and error states

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
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
