import { Monogram } from "@/components/brand/Monogram";
import { defaultLocale } from "@/i18n/config";
import styles from "./page.module.css";

const target = `/${defaultLocale}/`;

/**
 * "/" on a static host: forwards to the default language without a server
 * rule. Meta refresh works without JavaScript; the script keeps the hash.
 */
export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `location.replace(${JSON.stringify(target)} + location.hash)`,
        }}
      />
      <main className={styles.main}>
        <span className={styles.mark}>
          <Monogram title="Byron Cardona" />
        </span>
        <p>
          <a href={target} lang="es">
            Continuar en español
          </a>
          <span aria-hidden="true"> · </span>
          <a href="/en/" lang="en">
            English
          </a>
          <span aria-hidden="true"> · </span>
          <a href="/ru/" lang="ru">
            Русский
          </a>
        </p>
      </main>
    </>
  );
}
