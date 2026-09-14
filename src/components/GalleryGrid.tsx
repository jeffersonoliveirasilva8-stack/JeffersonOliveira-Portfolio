"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import MaterialCard from "./MaterialCard";
import PlaceholderBox from "./PlaceholderBox";
import type { Categoria, Material } from "@/lib/types";

export default function GalleryGrid({ materiais }: { materiais: Material[] }) {
  const [ativo, setAtivo] = useState<Categoria | "Todos">("Todos");
  const [selecionado, setSelecionado] = useState<Material | null>(null);

  const categorias = useMemo(() => {
    const set = new Set<Categoria>();
    materiais.forEach((m) => set.add(m.categoria));
    return Array.from(set);
  }, [materiais]);

  const filtrados = useMemo(
    () =>
      ativo === "Todos" ? materiais : materiais.filter((m) => m.categoria === ativo),
    [materiais, ativo]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-14 text-sm">
        <button
          onClick={() => setAtivo("Todos")}
          className={`transition-colors ${
            ativo === "Todos" ? "text-accent" : "text-muted hover:text-fg"
          }`}
        >
          Todos
        </button>
        {categorias.map((c) => (
          <button
            key={c}
            onClick={() => setAtivo(c)}
            className={`transition-colors ${
              ativo === c ? "text-accent" : "text-muted hover:text-fg"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtrados.map((m) => (
          <MaterialCard key={m.slug} material={m} onClick={() => setSelecionado(m)} />
        ))}
      </div>

      {filtrados.length === 0 && (
        <p className="text-muted text-sm">Nenhum material nesta categoria ainda.</p>
      )}

      {selecionado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={() => setSelecionado(null)}
        >
          <button
            aria-label="Fechar"
            className="absolute top-6 right-6 text-white text-sm hover:text-accent"
            onClick={() => setSelecionado(null)}
          >
            Fechar ✕
          </button>
          <div
            className="max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {selecionado.imagem ? (
              <Image
                src={selecionado.imagem}
                alt={selecionado.titulo}
                width={1000}
                height={1000}
                className="w-full h-auto rounded-2xl"
              />
            ) : (
              <PlaceholderBox
                label={selecionado.pendente ? "Imagem a inserir" : selecionado.titulo}
                aspect="aspect-square"
              />
            )}
            <div className="mt-4 text-white">
              <p className="font-serif text-xl">{selecionado.titulo}</p>
              <p className="text-sm text-white/70">
                {selecionado.ano ? `${selecionado.categoria} · ${selecionado.ano}` : selecionado.categoria}
              </p>
              {selecionado.descricao && (
                <p className="mt-2 text-sm text-white/80">{selecionado.descricao}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
