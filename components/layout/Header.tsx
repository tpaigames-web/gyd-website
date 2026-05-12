import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("Navigation");

  const links = [
    { href: "/", key: "home" },
    { href: "/about", key: "about" },
    { href: "/services", key: "services" },
    { href: "/team", key: "team" },
    { href: "/blog", key: "blog" },
    { href: "/faq", key: "faq" },
    { href: "/contact", key: "contact" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold">
          GYD Marketing
        </Link>
        <nav className="hidden gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.key} href={link.href} className="text-sm hover:text-primary">
              {t(link.key)}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
