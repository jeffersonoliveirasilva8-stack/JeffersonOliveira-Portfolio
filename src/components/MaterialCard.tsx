import Image from "next/image";
import PlaceholderBox from "./PlaceholderBox";
import type { Material } from "@/lib/types";

export default function MaterialCard({
  material,
  onClick,
}: {
  material: Material;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group block text-left w-full"
    >
      {material.imagem ? (
        <div className="aspect-square w-full overflow-hidden rounded-2xl bg-surface">
          <Image
            src={material.imagem}
            alt={material.titulo}
            width={600}
            height={600}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <PlaceholderBox
          label={material.pendente ? "Imagem a inserir" : material.titulo}
          aspect="aspect-square"
        />
      )}
      <div className="mt-3">
        <p className="text-sm text-fg">{material.titulo}</p>
        <p className="text-xs text-muted">{material.categoria}</p>
      </div>
    </button>
  );
}
