import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { About } from "@/components/sections/About";
import { Capabilities } from "@/components/sections/Capabilities";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <SiteShell locale={lang} dict={dict}>
      <Hero locale={lang} dict={dict} />
      <About dict={dict} />
      <Experience locale={lang} dict={dict} />
      <Capabilities locale={lang} dict={dict} />
      <Work locale={lang} dict={dict} />
      <Contact dict={dict} />
    </SiteShell>
  );
}
