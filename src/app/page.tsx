import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import ProjectCard from "@/components/ProjectCard";
import HighlightedText from "@/components/HighlightedText";
import PortraitPlaceholder from "@/components/PortraitPlaceholder";
import FeaturedProjectHero from "@/components/FeaturedProjectHero";
import { getFeaturedProjects, getProfile } from "@/lib/content";

export default function Home() {
  const profile = getProfile();
  const destaques = getFeaturedProjects();
  const [primeiroDestaque, ...outrosDestaques] = destaques;

  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 md:px-10 pt-20 pb-20 md:pt-28 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-y-8 lg:gap-x-10 xl:gap-x-14">
          <FadeIn className="text-center lg:text-right">
            <p className="text-sm uppercase tracking-[0.25em] text-muted mb-4 md:mb-6">
              {profile.nome}
            </p>
            <h1 className="font-serif font-medium uppercase text-5xl sm:text-6xl lg:text-6xl xl:text-7xl leading-[0.95] tracking-tight text-fg">
              {profile.heroTituloLinha1}
            </h1>
          </FadeIn>

          <FadeIn delay={120} className="justify-self-center">
            <PortraitPlaceholder foto={profile.foto} />
          </FadeIn>

          <FadeIn delay={60} className="text-center lg:text-left">
            <h1 className="font-serif font-medium uppercase text-5xl sm:text-6xl lg:text-6xl xl:text-7xl leading-[0.95] tracking-tight text-fg">
              {profile.heroTituloLinha2}
            </h1>
          </FadeIn>
        </div>

        <FadeIn delay={200}>
          <p className="mt-10 md:mt-14 max-w-xl mx-auto text-center text-fg/75 leading-relaxed">
            <HighlightedText
              text={profile.fraseHero}
              highlights={profile.marcasHeroDestaque}
            />
          </p>
        </FadeIn>

        <FadeIn delay={260}>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/projetos"
              className="border-b border-fg pb-0.5 hover:border-accent hover:text-accent transition-colors"
            >
              Ver projetos
            </Link>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-6xl px-6 md:px-10 pb-24">
        <FadeIn>
          <h2 className="font-serif text-2xl mb-10">Projetos em destaque</h2>
        </FadeIn>

        {primeiroDestaque && (
          <FadeIn className="mb-14">
            <FeaturedProjectHero projeto={primeiroDestaque} />
          </FadeIn>
        )}

        {outrosDestaques.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14">
            {outrosDestaques.map((p, i) => (
              <FadeIn key={p.slug} delay={i * 60}>
                <ProjectCard projeto={p} />
              </FadeIn>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-6 md:px-10 pb-28">
        <FadeIn>
          <p className="text-sm text-muted mb-8">
            Experiência com marcas como
          </p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-8">
            {profile.marcasAtendidas.map((marca) => (
              <div
                key={marca.nome}
                className="relative h-14 w-32 md:h-16 md:w-36"
              >
                <Image
                  src={marca.logo}
                  alt={marca.nome}
                  fill
                  sizes="144px"
                  className="object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
