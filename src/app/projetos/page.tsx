import ProjectsGrid from "@/components/ProjectsGrid";
import { getAuthorialProjects, getProfessionalProjects } from "@/lib/content";

export const metadata = {
  title: "Projetos — Jefferson Oliveira",
};

export default function ProjetosPage() {
  const profissionais = getProfessionalProjects();
  const autorais = getAuthorialProjects();

  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10 pt-16 pb-28">
      <h1 className="font-serif text-4xl mb-4">Projetos</h1>
      <p className="text-muted max-w-xl mb-14">
        Uma seleção de trabalhos completos, do contexto até a solução aplicada.
      </p>
      <ProjectsGrid profissionais={profissionais} autorais={autorais} />
    </div>
  );
}
