'use client';

import { useFigureCounter } from './figure-context';

export default function FigureRef({ label }: { label: string }) {
  const { getFigureNumber } = useFigureCounter();

  const number = getFigureNumber(label);

  return number ? <span>Figure {number}</span> : <span>Figure ?</span>;
}
