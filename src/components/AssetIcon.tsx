type AssetIconProps = {
  src: string;
  alt: string;
  box: number;
  leaf: number;
};

export function AssetIcon({ src, alt, box, leaf }: AssetIconProps) {
  const pad = Math.max(0, (box - leaf) / 2);
  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center overflow-hidden"
      style={{ width: box, height: box, padding: pad }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={leaf} height={leaf} className="block max-w-none" />
    </span>
  );
}
