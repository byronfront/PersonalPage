import { Monogram } from "@/components/brand/Monogram";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { site } from "@/content/site";
import { locales, localeMeta, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import type { NavItem } from "./Header";
import styles from "./Footer.module.css";

type Props = { locale: Locale; dict: Dictionary; items: NavItem[]; name: string };

export function Footer({ locale, dict, items, name }: Props) {
  const { footer, nav } = dict;

  return (
    <footer className={styles.footer}>
      <div className={`container grid ${styles.layout}`}>
        <div className={styles.brand}>
          <span className={styles.mark}>
            <Monogram />
          </span>
          <p className={styles.wordmark}>
            <span className="t-accent">Byron</span> Cardona
          </p>
        </div>

        <nav className={styles.nav} aria-label={footer.index}>
          <h2 className="t-mono t-faint">{footer.index}</h2>
          <ol>
            {items.map((item) => (
              <li key={item.id}>
                <a href={`/${locale}/#${item.id}`} className={styles.navLink}>
                  <span className={styles.navIndex} aria-hidden="true">
                    {item.index}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.langs}>
          <h2 className="t-mono t-faint">{nav.language}</h2>
          <ul>
            {locales.map((l) => (
              <li key={l}>
                <a
                  href={`/${l}/`}
                  hrefLang={localeMeta[l].htmlLang}
                  lang={localeMeta[l].htmlLang}
                  aria-current={l === locale ? "true" : undefined}
                  className={styles.navLink}
                >
                  {localeMeta[l].label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className={styles.colophon}>{footer.colophon}</p>

        <div className={styles.bottom}>
          <p className="t-mono t-faint">
            © {site.year} {name}. {footer.authorship}
          </p>
          <ArrowLink href="#top" direction="up">
            {footer.backToTop}
          </ArrowLink>
        </div>
      </div>
    </footer>
  );
}
