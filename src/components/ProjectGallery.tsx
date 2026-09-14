"use client";

import { useMemo, useState } from "react";
import { isVideo } from "@/lib/content";

type Grupo = { titulo?: string; descricao?: string; itens: string[]; layout?: "masonry" | "stack" | "full" };

export default function ProjectGallery({
  titulo,
  grupos,
  itens,
}: {
  titulo: string;
  grupos?: Grupo[];
  itens?: string[];
}) {
  const gruposNormalizados: Grupo[] = useMemo(
    () => grupos ?? (itens ? [{ itens }] : []),
    [grupos, itens]
  );

  const flat = useMemo(
    () => gruposNormalizados.flatMap((g) => g.itens),
    [gruposNormalizados]
  );

  const [aberto, setAberto] = useState<number | null>(null);

  if (flat.length === 0) return null;

  const irPara = (delta: number) => {
    if (aberto === null) return;
    const proximo = (aberto + delta + flat.length) % flat.length;
    setAberto(proximo);
  };

  return (
    <div className="space-y-14">
      {gruposNormalizados.map((grupo, gi) => (
        <div key={gi}>
          {grupo.titulo && (
            <h3 className="text-sm uppercase tracking-widest text-muted mb-2">
              {grupo.titulo}
            </h3>
          )}
          {grupo.descricao && (
            <p className="text-sm text-fg/70 mb-5 max-w-2xl">{grupo.descricao}</p>
          )}
          <div
            className={
              grupo.layout === "full"
                ? "flex flex-col gap-4"
                : grupo.layout === "stack"
                ? "flex flex-col gap-4 max-w-2xl"
                : "columns-2 md:columns-3 gap-4 [column-fill:_balance]"
            }
          >
            {grupo.itens.map((src) => {
              const indiceGlobal = flat.indexOf(src);
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setAberto(indiceGlobal)}
                  className={
                    grupo.layout === "stack" || grupo.layout === "full"
                      ? "block w-full overflow-hidden rounded-2xl bg-surface"
                      : "mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-surface"
                  }
                >
                  {isVideo(src) ? (
                    <video
                      src={src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="w-full h-auto block"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={src}
                      alt={titulo}
                      loading="lazy"
                      className="w-full h-auto block"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {aberto !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={() => setAberto(null)}
        >
          <button
            aria-label="Fechar"
            className="absolute top-6 right-6 text-white text-sm hover:text-accent"
            onClick={() => setAberto(null)}
          >
            Fechar ✕
          </button>
          <button
            aria-label="Anterior"
            className="absolute left-4 md:left-8 text-white text-3xl hover:text-accent"
            onClick={(e) => {
              e.stopPropagation();
              irPara(-1);
            }}
          >
            ‹
          </button>
          <button
            aria-label="Próxima"
            className="absolute right-4 md:right-8 text-white text-3xl hover:text-accent"
            onClick={(e) => {
              e.stopPropagation();
              irPara(1);
            }}
          >
            ›
          </button>

          <div className="max-w-4xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            {isVideo(flat[aberto]) ? (
              <video
                src={flat[aberto]}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="max-w-full max-h-[85vh] rounded-2xl"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={flat[aberto]}
                alt={titulo}
                className="max-w-full max-h-[85vh] rounded-2xl object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
