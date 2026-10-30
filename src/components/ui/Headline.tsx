import type { ElementType } from "react";

export type HeadlineText = { lead: string; accent: string; tail: string };

type Props = {
  text: HeadlineText;
  as?: ElementType;
  className?: string;
  id?: string;
  /**
   * Split lead / accent / tail into block lines (data-line="lead|accent|tail").
   *  - "reveal": lines unmask in sequence when scrolled into view.
   *  - "static": lines only; the parent decides how (or whether) to animate.
   */
  lines?: "reveal" | "static";
  spec?: string;
};

/**
 * Two voices in one sentence: the structure is set in the regular serif,
 * the accent word in italic.
 */
export function Headline({ text, as: Tag = "h2", className, id, lines, spec }: Props) {
  const parts = [
    { key: "lead", value: text.lead, accent: false },
    { key: "accent", value: text.accent, accent: true },
    { key: "tail", value: text.tail, accent: false },
  ].filter((p) => p.value);

  if (!lines) {
    return (
      <Tag className={className} id={id} data-spec={spec}>
        {parts.map((p, i) => (
          <span key={p.key}>
            {i > 0 ? " " : ""}
            {p.accent ? <span className="t-accent">{p.value}</span> : p.value}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      id={id}
      data-spec={spec}
      data-reveal={lines === "reveal" ? "lines" : undefined}
    >
      {parts.map((p, i) => (
        <span
          key={p.key}
          data-line={p.key}
          style={{ display: "block", ["--reveal-i" as string]: i, ["--line-i" as string]: i }}
        >
          {p.accent ? <span className="t-accent">{p.value}</span> : p.value}
          {i < parts.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
