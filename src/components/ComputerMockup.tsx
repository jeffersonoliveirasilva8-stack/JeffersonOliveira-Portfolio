"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ComputerMockup({
  imagens,
  titulo,
}: {
  imagens: string[];
  titulo: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (imagens.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % imagens.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [imagens.length]);

  if (imagens.length === 0) return null;

  const ir = (delta: number) => {
    setIndex((i) => (i + delta + imagens.length) % imagens.length);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-xl sm:rounded-2xl border border-border bg-[#0d0d0d] p-2 sm:p-3 shadow-2xl">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md sm:rounded-lg bg-surface">
          {imagens.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${titulo} — tela ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 900px, 100vw"
              priority={i === 0}
              className={`object-contain object-center transition-opacity duration-700 ease-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {imagens.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Tela anterior"
                onClick={() => ir(-1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white/80 text-lg hover:bg-black/60 hover:text-white transition-colors"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Próxima tela"
                onClick={() => ir(1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white/80 text-lg hover:bg-black/60 hover:text-white transition-colors"
              >
                ›
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mx-auto h-4 w-20 sm:h-5 sm:w-24 rounded-b-xl bg-[#0d0d0d]" />
      <div className="mx-auto -mt-px h-1.5 w-36 sm:w-44 rounded-full bg-[#1a1a1a]" />

      {imagens.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {imagens.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Ir para tela ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-accent" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
