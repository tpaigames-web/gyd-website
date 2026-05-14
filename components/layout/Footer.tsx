import { Mail, Phone, MapPin } from "lucide-react";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { COMPANY } from "@/lib/constants";

export async function Footer() {
  const settings = await getSiteSettings();

  const phone = settings?.phone || "";
  const email = settings?.email || COMPANY.email;
  const address = settings?.address || COMPANY.location;

  const socials = [
    { url: settings?.socialMedia?.facebook, label: "Facebook", short: "f" },
    { url: settings?.socialMedia?.instagram, label: "Instagram", short: "IG" },
    { url: settings?.socialMedia?.tiktok, label: "TikTok", short: "TT" },
    { url: settings?.socialMedia?.xiaohongshu, label: "小红书", short: "红" },
    { url: settings?.googleBusinessProfile, label: "Google 商家档案", short: "G" },
  ].filter((s) => s.url);

  return (
    <footer className="mt-auto border-t bg-muted/40">
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <p className="text-lg font-bold">{COMPANY.nameEn}</p>
          <p className="text-muted-foreground text-sm">{COMPANY.nameZh}</p>
        </div>

        <div className="space-y-2 text-sm">
          {address && (
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>{address}</span>
            </p>
          )}
          {phone && (
            <p className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" />
              <a href={`tel:${phone}`} className="hover:underline">{phone}</a>
            </p>
          )}
          {email && (
            <p className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" />
              <a href={`mailto:${email}`} className="hover:underline">{email}</a>
            </p>
          )}
        </div>

        {socials.length > 0 && (
          <div className="flex flex-wrap items-start gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="border-border hover:border-primary hover:text-primary flex size-9 items-center justify-center rounded-full border text-xs font-semibold transition-colors"
              >
                {s.short}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="border-t">
        <p className="container mx-auto px-4 py-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {COMPANY.nameEn} · {COMPANY.nameZh}
        </p>
      </div>
    </footer>
  );
}
