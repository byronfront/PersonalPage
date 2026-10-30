import type { Metadata } from "next";
import { Monogram } from "@/components/brand/Monogram";
import "./globals.css";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "404 — Byron Cardona",
  robots: { index: false, follow: true },
};

/** Unknown URL: the language is unknown too, so the page speaks all three. */
const copy = [
  { lang: "es", title: "Esta página no existe.", link: "Volver al inicio", href: "/es/" },
  { lang: "en", title: "This page does not exist.", link: "Back to home", href: "/en/" },
  { lang: "ru", title: "Такой страницы нет.", link: "На главную", href: "/ru/" },
] as const;

export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body>
        <main className={styles.main}>
          <a href="/es/" className={styles.mark} aria-label="Byron Cardona">
            <Monogram />
          </a>
          <p className={`t-mono ${styles.code}`}>404</p>
          <ul className={styles.list}>
            {copy.map((c) => (
              <li key={c.lang} lang={c.lang}>
                <p className={styles.title}>{c.title}</p>
                <a href={c.href} className="link">
                  {c.link}
                </a>
              </li>
            ))}
          </ul>
        </main>
      </body>
    </html>
  );
}
