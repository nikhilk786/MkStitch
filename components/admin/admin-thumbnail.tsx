export function AdminThumbnail({
  image,
  label,
}: {
  image: string | null;
  label: string;
}) {
  if (!image) {
    return (
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-xs font-semibold text-zinc-400">
        N/A
      </div>
    );
  }

  return (
    <div
      aria-label={`${label} image`}
      className="size-12 shrink-0 rounded-xl bg-zinc-100 bg-cover bg-center"
      role="img"
      style={{ backgroundImage: `url("${image.replaceAll('"', '\\"')}")` }}
    />
  );
}
