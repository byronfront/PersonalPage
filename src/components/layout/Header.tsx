"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Monogram } from "@/components/brand/Monogram";
import { locales, localeMeta, type Locale } from "@/i18n/config";
import { useActiveSection } from "@/lib/useActiveSection";
import { StructureToggle } from "./StructureToggle";
import styles from "./Header.module.css";

export type NavItem = { id: string; label: string; index: string };

type Props = {
  locale: Locale;
  name: string;
  items: NavItem[];
  /** Path after the locale for pages other than home, e.g. "work/slug/". */
  path?: string;
  labels: {
    primary: string;
    openMenu: string;
    closeMenu: string;
    menu: string;
    language: string;
    currentLanguage: string;
    home: string;
    show: string;
    hide: string;
    hint: string;
  };
};

export function Header({ locale, name, items, labels, path = "" }: Props) {
  const onHome = path === "";
  const sectionHref = (id: string) => (onHome ? `#${id}` : `/${locale}/#${id}`);
  const idKey = items.map((i) => i.id).join(",");
  const ids = useMemo(() => idKey.split(","), [idKey]);
  const active = useActiveSection(ids);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = useCallback(() => {
    dialogRef.current?.showModal();
    setOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setOpen(false);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-menu-open", open);
  }, [open]);

  const activeItem = items.find((i) => i.id === active) ?? items[0];
  const hash = onHome && active && active !== ids[0] ? `#${active}` : "";

  const languageLinks = (className: string | undefined) => (
    <ul className={className} aria-label={labels.language}>
      {locales.map((l) => {
        const current = l === locale;
        return (
          <li key={l}>
            <a
              href={`/${l}/${path}${hash}`}
              hrefLang={localeMeta[l].htmlLang}
              lang={localeMeta[l].htmlLang}
              aria-current={current ? "true" : undefined}
              title={localeMeta[l].label}
              className={styles.lang}
            >
              <span aria-hidden="true">{localeMeta[l].short}</span>
              <span className="visually-hidden">
                {localeMeta[l].label}
                {current ? ` — ${labels.currentLanguage}` : ""}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <a href={sectionHref("home")} className={styles.brand} aria-label={`${name} — ${labels.home}`}>
          <span className={styles.mark}>
            <Monogram draw />
          </span>
          <span className={styles.wordmark} aria-hidden="true">
            <span className={styles.given}>Byron</span>
            <span className={styles.family}>Cardona</span>
          </span>
        </a>

        <nav className={styles.nav} aria-label={labels.primary}>
          <ol className={styles.list}>
            {items.slice(1).map((item) => (
              <li key={item.id}>
                <a
                  href={sectionHref(item.id)}
                  className={styles.item}
                  aria-current={active === item.id ? "location" : undefined}
                >
                  <span className={styles.index} aria-hidden="true">
                    {item.index}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.tools}>
          <p className={styles.current} aria-hidden="true">
            <span className={styles.index}>{activeItem?.index}</span>
            <span key={activeItem?.id} className={styles.currentLabel}>
              {activeItem?.label}
            </span>
          </p>
          <StructureToggle show={labels.show} hide={labels.hide} hint={labels.hint} />
          {languageLinks(styles.langs)}
          <button
            type="button"
            className={styles.menuButton}
            aria-label={labels.openMenu}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="site-index"
            onClick={openMenu}
          >
            <span className={styles.menuLabel}>{labels.menu}</span>
            <span className={styles.burger} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>
      <span className={styles.progress} aria-hidden="true" />

      <dialog
        id="site-index"
        ref={dialogRef}
        className={styles.dialog}
        aria-label={labels.menu}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu();
        }}
      >
        <div className={styles.sheet}>
          <div className={styles.sheetTop}>
            <span className="t-mono t-faint">{labels.menu}</span>
            <button type="button" className={styles.close} onClick={closeMenu}>
              {labels.closeMenu}
              <span aria-hidden="true" className={styles.cross} />
            </button>
          </div>
          <nav aria-label={labels.primary}>
            <ol className={styles.sheetList}>
              {items.map((item, i) => (
                <li key={item.id} style={{ "--i": i } as CSSProperties}>
                  <a
                    href={sectionHref(item.id)}
                    className={styles.sheetItem}
                    aria-current={active === item.id ? "location" : undefined}
                    onClick={closeMenu}
                  >
                    <span className={styles.index} aria-hidden="true">
                      {item.index}
                    </span>
                    <span className={styles.sheetLabel}>{item.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className={styles.sheetFoot}>
            {languageLinks(styles.sheetLangs)}
            <StructureToggle show={labels.show} hide={labels.hide} hint={labels.hint} />
          </div>
        </div>
      </dialog>
    </header>
  );
}
