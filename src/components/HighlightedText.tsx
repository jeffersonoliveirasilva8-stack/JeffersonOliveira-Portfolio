export default function HighlightedText({
  text,
  highlights,
}: {
  text: string;
  highlights: string[];
}) {
  if (highlights.length === 0) return <>{text}</>;

  const pattern = new RegExp(`(${highlights.join("|")})`, "g");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) =>
        highlights.includes(part) ? (
          <span key={i} className="text-accent">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
