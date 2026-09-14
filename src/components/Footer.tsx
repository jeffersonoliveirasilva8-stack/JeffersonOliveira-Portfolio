import Link from "next/link";
import type { Perfil } from "@/lib/types";

export default function Footer({ profile }: { profile: Perfil }) {
  const { contato } = profile;
  return (
    <footer className="border-t border-border/70 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <p className="font-serif text-3xl md:text-4xl italic text-fg mb-8">
          Vamos conversar?
        </p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-fg/80">
          <a
            href={`mailto:${contato.email}`}
            className="hover:text-accent transition-colors"
          >
            {contato.email}
          </a>
          <span>{contato.localizacao}</span>
          {contato.behance && (
            <a
              href={`https://${contato.behance}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Behance
            </a>
          )}
          {contato.linkedin && (
            <a
              href={contato.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
          )}
          {contato.instagram && (
            <a
              href={contato.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Instagram
            </a>
          )}
          <Link href="/contato" className="hover:text-accent transition-colors">
            Página de contato →
          </Link>
        </div>
        <p className="mt-12 text-xs text-fg/40">
          © {new Date().getFullYear()} {profile.nome}
        </p>
      </div>
    </footer>
  );
}
