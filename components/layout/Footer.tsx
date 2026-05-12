import { COMPANY } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/40">
      <div className="container mx-auto flex flex-col gap-2 px-4 py-8 text-sm text-muted-foreground md:flex-row md:justify-between">
        <p>
          © {new Date().getFullYear()} {COMPANY.nameEn} · {COMPANY.nameZh}
        </p>
        <p>{COMPANY.location}</p>
      </div>
    </footer>
  );
}
