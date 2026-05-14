import { pickLocalized } from "@/lib/i18n-fields";
import { Card, CardContent } from "@/components/ui/card";
import type { Homepage, Testimonial } from "@/types/sanity";

export function TestimonialsSection({
  homepage,
  fallbackTestimonials,
  locale,
}: {
  homepage: Homepage | null;
  fallbackTestimonials: Testimonial[];
  locale: string;
}) {
  if (homepage?.testimonialsEnabled === false) return null;

  const testimonials =
    homepage?.featuredTestimonials && homepage.featuredTestimonials.length > 0
      ? homepage.featuredTestimonials
      : fallbackTestimonials;

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight md:text-4xl">
          {locale === "en" ? "What Clients Say" : "客户评价"}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => {
            const content = pickLocalized(t, "content", locale);
            return (
              <Card key={t._id}>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 italic">“{content}”</p>
                  <div className="text-sm">
                    <p className="font-semibold">{t.clientName}</p>
                    {t.clientCompany && (
                      <p className="text-muted-foreground">{t.clientCompany}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
