import GalleryGrid from "@/components/GalleryGrid";
import { getMaterials } from "@/lib/content";

export const metadata = {
  title: "Galeria — Jefferson Oliveira",
};

export default function GaleriaPage() {
  const materiais = getMaterials();

  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10 pt-16 pb-28">
      <h1 className="font-serif text-4xl mb-4">Galeria</h1>
      <p className="text-muted max-w-xl mb-14">
        Seleção visual de peças, posts e materiais — repertório e domínio técnico,
        sem a estrutura completa de um case.
      </p>
      <GalleryGrid materiais={materiais} />
    </div>
  );
}
