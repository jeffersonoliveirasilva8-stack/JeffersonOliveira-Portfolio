type Marca = { nome: string; logo: string };

export default function LogoMarquee({ marcas }: { marcas: Marca[] }) {
  const loop = [...marcas, ...marcas];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="flex w-max items-center gap-14 animate-marquee">
        {loop.map((marca, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${marca.nome}-${i}`}
            src={marca.logo}
            alt={marca.nome}
            className="h-9 md:h-11 w-auto shrink-0 opacity-80 hover:opacity-100 transition-opacity"
          />
        ))}
      </div>
    </div>
  );
}
