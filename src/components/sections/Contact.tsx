import { CopyButton } from "@/components/ui/CopyButton";
import { Headline } from "@/components/ui/Headline";
import { SectionHead } from "@/components/ui/SectionHead";
import { contact, getChannels } from "@/content/contact";
import type { Dictionary } from "@/i18n";
import styles from "./Contact.module.css";

export function Contact({ dict }: { dict: Dictionary }) {
  const { contact: copy } = dict;
  const channels = getChannels();

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className="container">
        <SectionHead index="06" label={copy.label} />

        <Headline
          id="contact-title"
          text={copy.title}
          lines="reveal"
          className={`t-display ${styles.title}`}
          spec="Cormorant 320 · italic accent · indent 2 col"
        />

        <div className={`grid ${styles.layout}`}>
          <p className={`t-lead ${styles.body}`} data-reveal>
            {copy.body}
          </p>

          <ul className={styles.channels}>
            {channels.map((channel, i) => {
              const label = copy.channels[channel.id];
              return (
                <li
                  key={channel.id}
                  className={styles.channel}
                  data-reveal
                  data-pending={channel.href ? undefined : ""}
                  style={{ ["--reveal-i" as string]: i }}
                >
                  <span className={`t-mono t-faint ${styles.channelLabel}`}>{label}</span>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className={styles.channelLink}
                      {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <span className={styles.channelValue}>{channel.display}</span>
                      {channel.external && <span className="visually-hidden"> ({copy.newTab})</span>}
                      <svg className={styles.channelArrow} viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M3 13L13 3M5 3h8v8" />
                      </svg>
                    </a>
                  ) : (
                    <span className={styles.channelPending}>{copy.pending}</span>
                  )}
                  {channel.id === "email" && contact.email && (
                    <CopyButton
                      value={contact.email}
                      label={copy.copy}
                      done={copy.copied}
                      className={styles.copy}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
