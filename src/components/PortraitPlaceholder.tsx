import Image from "next/image";

export default function PortraitPlaceholder({ foto }: { foto?: string }) {
  return (
    <div className="relative mx-auto w-[220px] sm:w-[260px] md:w-[300px]">
      <div className="aspect-[4/5] w-full rounded-[28px] overflow-hidden bg-surface border border-border flex items-center justify-center">
        {foto ? (
          <Image
            src={foto}
            alt="Retrato"
            width={600}
            height={750}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent, transparent 11px, var(--color-border) 11px, var(--color-border) 12px)",
            }}
          />
        )}
        {!foto && (
          <span className="relative text-xs uppercase tracking-widest text-muted text-center px-4">
            Foto a inserir
          </span>
        )}
      </div>
      <div className="absolute -bottom-4 -right-4 w-14 h-14 rounded-full bg-accent text-bg flex items-center justify-center text-sm font-medium animate-wave shadow-lg">
        Olá
      </div>
    </div>
  );
}
