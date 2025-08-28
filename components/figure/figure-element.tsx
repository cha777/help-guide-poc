'use client';

import { useEffect, useState } from 'react';
import ThemedImage from './themed-image';
import { useFigureCounter } from './figure-context';

type Props = {
  baseName: string;
  alt: string;
  description?: string;
  [key: string]: any;
};

export default function ThemedLocaleFigure({ baseName, alt, description = '', ...props }: Props) {
  const { increment } = useFigureCounter();
  const [figureNumber, setFigureNumber] = useState(0);

  useEffect(() => {
    setFigureNumber(increment(alt));
  }, []);

  return (
    <figure className='my-8'>
      <ThemedImage
        baseName={baseName}
        alt={alt}
        {...props}
      />
      <figcaption className='text-md mt-2 text-gray-500 dark:text-neutral-400'>
        <span className='font-bold'>Figure {figureNumber}:</span> {description}
      </figcaption>
    </figure>
  );
}
