import type { ReactNode } from "react";
import { profile } from "@/content/profile";
import { sectionIds } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { Footer } from "./Footer";
import { Header, type NavItem } from "./Header";

type Props = {
  locale: Locale;
  dict: Dictionary;
  /** Path after the locale for pages other than home, e.g. "work/slug/". */
  path?: string;
  children: ReactNode;
};

export function SiteShell({ locale, dict, path, children }: Props) {
  const items: NavItem[] = sectionIds.map((id, i) => ({
    id,
    label: dict.nav.sections[id],
    index: String(i + 1).padStart(2, "0"),
  }));

  return (
    <>
      <a href="#main" className="skip-link">
        {dict.nav.skip}
      </a>
      <Header
        locale={locale}
        name={profile.name}
        items={items}
        path={path}
        labels={{
          primary: dict.nav.primary,
          openMenu: dict.nav.openMenu,
          closeMenu: dict.nav.closeMenu,
          menu: dict.nav.menu,
          language: dict.nav.language,
          currentLanguage: dict.nav.currentLanguage,
          home: dict.nav.home,
          show: dict.structure.show,
          hide: dict.structure.hide,
          hint: dict.structure.hint,
        }}
      />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer locale={locale} dict={dict} items={items} name={profile.name} />
    </>
  );
}
