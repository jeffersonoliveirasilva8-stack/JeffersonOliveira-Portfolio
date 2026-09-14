import profileData from "../../content/profile.json";
import experienceData from "../../content/experience.json";
import projectsData from "../../content/projects.json";
import type { Experiencia, Perfil, Projeto } from "./types";

export function getProfile(): Perfil {
  return profileData as Perfil;
}

export function getExperience(): Experiencia[] {
  return experienceData as Experiencia[];
}

export function getExperienceSummary() {
  return getExperience().map((exp) => {
    const cargoAtual = exp.cargos[exp.cargos.length - 1];
    return {
      empresa: exp.empresa,
      cargo: cargoAtual.cargo,
      periodo: cargoAtual.periodo,
    };
  });
}

export function getProjects(): Projeto[] {
  return projectsData as Projeto[];
}

const MAX_FEATURED_HOME = 7;

export function getFeaturedProjects(): Projeto[] {
  return getProjects()
    .filter((p) => p.destaque)
    .sort((a, b) => (a.ordemDestaque ?? 999) - (b.ordemDestaque ?? 999))
    .slice(0, MAX_FEATURED_HOME);
}

export function getProfessionalProjects(): Projeto[] {
  return getProjects().filter((p) => p.tipo === "Profissional");
}

export function getAuthorialProjects(): Projeto[] {
  return getProjects().filter((p) => p.tipo === "Autoral");
}

export function getProjectBySlug(slug: string): Projeto | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function isVideo(path?: string): boolean {
  return !!path && path.toLowerCase().endsWith(".mp4");
}
