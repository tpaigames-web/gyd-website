import { MessageCircle } from "lucide-react";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { COMPANY } from "@/lib/constants";

export async function WhatsAppButton() {
  const settings = await getSiteSettings();
  const rawNumber = settings?.whatsappNumber || COMPANY.whatsapp;
  if (!rawNumber) return null;

  const number = rawNumber.replace(/[^\d]/g, "");
  const message = encodeURIComponent("您好,我想咨询 GYD Marketing 的服务。");
  const href = `https://wa.me/${number}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 md:right-6 md:bottom-6"
    >
      <MessageCircle className="size-7" />
    </a>
  );
}
