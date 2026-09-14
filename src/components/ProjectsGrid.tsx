"use client";

import { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Categoria, Projeto } from "@/lib/types";

function useCategoryFilter(projetos: Projeto[]) {
  const [ativo, setAtivo] = useState<Categoria | "Todos">("Todos");

  const categorias = useMemo(() => {
    const set = new Set<Categoria>();
    projetos.forEach((p) => p.categorias.forEach((c) => set.add(c)));
    return Array.from(set);
  }, [projetos]);

  const filtrados = useMemo(
    () =>
      ativo === "Todos"
        ? projetos
        : projetos.filter((p) => p.categorias.includes(ativo)),
    [projetos, ativo]
  );

  return { ativo, setAtivo, categorias, filtrados };
}

export default function ProjectsGrid({
  profissionais,
  autorais,
}: {
  profissionais: Projeto[];
  autorais: Projeto[];
}) {
  const todos = useMemo(() => [...profissionais, ...autorais], [profissionais, autorais]);
  const { ativo, setAtivo, categorias, filtrados: filtradosTodos } =
    useCategoryFilter(todos);

  const filtradosProfissionais = useMemo(
    () => filtradosTodos.filter((p) => p.tipo === "Profissional"),
    [filtradosTodos]
  );
  const filtradosAutorais = useMemo(
    () => filtradosTodos.filter((p) => p.tipo === "Autoral"),
    [filtradosTodos]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-16 text-sm">
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

      <section className="mb-24">
        <h2 className="text-sm uppercase tracking-widest text-muted mb-10">
          Projetos Profissionais
        </h2>
        {filtradosProfissionais.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14">
            {filtradosProfissionais.map((p) => (
              <ProjectCard key={p.slug} projeto={p} />
            ))}
          </div>
        ) : (
          <p className="text-muted text-sm">
            Nenhum projeto profissional nesta categoria ainda.
          </p>
        )}
      </section>

      {filtradosAutorais.length > 0 && (
        <section>
          <h2 className="text-sm uppercase tracking-widest text-muted mb-2">
            Projetos Autorais
          </h2>
          <p className="text-sm text-muted mb-10 max-w-md">
            Iniciativas próprias: repertório, direção criativa e capacidade de
            construir um projeto do zero.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {filtradosAutorais.map((p) => (
              <ProjectCard key={p.slug} projeto={p} compact />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
