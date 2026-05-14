export function PagePlaceholder({
  title,
  hint,
}: {
  title: string;
  hint: string;
}) {
  return (
    <main className="container mx-auto px-4 py-20">
      <h1 className="mb-4 text-4xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground text-lg">{hint}</p>
    </main>
  );
}
