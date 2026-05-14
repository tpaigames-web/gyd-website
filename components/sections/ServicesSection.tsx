import Image from "next/image";
import { urlFor } from "@/lib/sanity/client";
import { pickLocalized } from "@/lib/i18n-fields";
import { Card, CardContent } from "@/components/ui/card";
import type { Homepage, Service } from "@/types/sanity";

export function ServicesSection({
  homepage,
  fallbackServices,
  locale,
}: {
  homepage: Homepage | null;
  fallbackServices: Service[];
  locale: string;
}) {
  if (homepage?.servicesEnabled === false) return null;

  const services =
    homepage?.featuredServices && homepage.featuredServices.length > 0
      ? homepage.featuredServices
      : fallbackServices;

  if (services.length === 0) return null;

  const sectionTitle = pickLocalized(
    homepage,
    "servicesTitle",
    locale,
    locale === "en" ? "Our Services" : "我们的服务",
  );

  return (
    <section className="border-t bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight md:text-4xl">
          {sectionTitle}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const title = pickLocalized(service, "title", locale);
            const desc = pickLocalized(service, "shortDesc", locale);
            return (
              <Card key={service._id} className="overflow-hidden">
                {service.icon && (
                  <div className="relative h-12 w-12 px-6 pt-6">
                    <Image
                      src={urlFor(service.icon).width(96).height(96).url()}
                      alt=""
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">{title}</h3>
                  <p className="text-muted-foreground text-sm">{desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
