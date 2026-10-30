"use client";

import { useSyncExternalStore } from "react";
import styles from "./StructureToggle.module.css";

const ATTR = "data-structure";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: [ATTR] });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.getAttribute(ATTR) === "on";
const getServerSnapshot = () => false;

/** Reveals the grid and type specifications behind the composition. */
export function StructureToggle({ show, hide, hint }: { show: string; hide: string; hint: string }) {
  const on = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <button
      type="button"
      className={styles.toggle}
      aria-pressed={on}
      title={hint}
      onClick={() => document.documentElement.setAttribute(ATTR, on ? "off" : "on")}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true" className={styles.icon}>
        <path d="M1.5 1.5h13v13h-13z M5.83 1.5v13 M10.17 1.5v13" />
      </svg>
      <span className={styles.label}>{on ? hide : show}</span>
    </button>
  );
}
