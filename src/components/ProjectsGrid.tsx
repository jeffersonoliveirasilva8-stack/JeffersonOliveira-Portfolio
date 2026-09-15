"use client";

import { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Categoria, Projeto } from "@/lib/types";

const FILTROS = [
  "Design Gráfico",
  "Identidade Visual",
  "Digital",
  "UI/UX",
  "Comunicação",
] as const;
type Filtro = (typeof FILTROS)[number];

const CATEGORIA_PARA_FILTRO: Record<Categoria, Filtro> = {
  "Criativos para Redes Sociais": "Comunicação",
  "Comunicação Institucional": "Comunicação",
  "Identidade Visual": "Identidade Visual",
  "Materiais Impressos": "Design Gráfico",
  "UI/UX": "UI/UX",
  "Produto Digital": "Digital",
  Website: "Digital",
  "Comunicação de Evento": "Comunicação",
  "Cobertura de Evento": "Comunicação",
  Apresentação: "Design Gráfico",
  Publicidade: "Comunicação",
  Branding: "Identidade Visual",
  "Design Gráfico": "Design Gráfico",
  Motion: "Digital",
  Digital: "Digital",
  "Direção de Arte": "Design Gráfico",
  Outros: "Design Gráfico",
};

function useCategoryFilter(projetos: Projeto[]) {
  const [ativo, setAtivo] = useState<Filtro | "Todos">("Todos");

  const filtrados = useMemo(
    () =>
      ativo === "Todos"
        ? projetos
        : projetos.filter((p) =>
            p.categorias.some((c) => CATEGORIA_PARA_FILTRO[c] === ativo)
          ),
    [projetos, ativo]
  );

  return { ativo, setAtivo, categorias: FILTROS, filtrados };
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
            Projetos desenvolvidos por iniciativa própria, explorando
            identidade visual, comunicação e produtos digitais.
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
