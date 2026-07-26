import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styles from "./about.module.css";

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": "Why | 2Read",
        "description": "Why 2Read exists: closing the gap between reading and remembering.",
        "url": "https://2read.app/about"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://2read.app/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Why",
            "item": "https://2read.app/about"
          }
        ]
      }
    ]
  };

  return (
    <main className={styles.pageWrapper} role="main">
      <Helmet>
        <title>Why | 2Read</title>
        <meta
          name="description"
          content="Why 2Read exists: closing the gap between reading and remembering."
        />
        <meta name="keywords" content="2Read, reading app, kindle highlights, why 2Read, remember what you read" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://2read.app/about" />

        {/* Open Graph */}
        <meta property="og:title" content="Why 2Read" />
        <meta property="og:description" content="Why 2Read exists: closing the gap between reading and remembering." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://2read.app/about" />
        <meta property="og:site_name" content="2Read" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Why 2Read" />
        <meta name="twitter:description" content="Why 2Read exists: closing the gap between reading and remembering." />

        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      {/* SECTION 1 */}
      <section className={styles.section} aria-label="Introduction">
        <div className={`${styles.content} ${styles.largeText}`}>
          <h1 className={styles.largeTitle}>
            Imagine actually remembering & understanding what you read.          </h1>
          <p>
            Every book you've ever highlighted holds an idea that moved you. A sentence that made you pause. A thought that changed how you see something.
          </p>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className={styles.section} aria-label="The problem">
        <div className={`${styles.content} ${styles.normalText}`}>
          <p>But you never went back to it.</p>
          <p>
            Hundreds of passages sitting in Kindle, untouched. Ideas you loved, forgotten in a list you never open.
          </p>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className={styles.section} aria-label="Existing tools">
        <div className={`${styles.content} ${styles.normalText} ${styles.minimalSpacing}`}>
          <p>
            And the tools built to fix this weren't built for readers. They were built for people who want spreadsheets, browser extensions, export pipelines, a second system to maintain. That was never the problem. The problem was never storage. It was attention.
          </p>
        </div>
      </section>

      {/* SECTION 4 */}
      <section className={styles.section} aria-label="Reading deserves better">
        <div className={`${styles.content} ${styles.normalText}`}>
          <p>
            So 2Read shows you one highlight at a time. One idea, alone on the screen, with room to breathe. Nothing else competing for your eye. Just you and a thought you once found worth keeping, given the space to matter again.
          </p>
        </div>
      </section>

      {/* SECTION 5 */}
      <section className={styles.section} aria-label="2Read's mission">
        <div className={`${styles.content} ${styles.normalText}`}>
          <p>
            And when a passage doesn't quite land, the help is right there on it. Smart Dictionary tells you what a word meant in that sentence, not in general. Unpack explains the idea in plainer terms, with context and an example. You stop skimming and start understanding.
          </p>
        </div>
      </section>

      {/* SECTION 6 */}
      <section className={styles.section} aria-label="Deep understanding">
        <div className={`${styles.content} ${styles.mediumText}`}>
          <p>
            Then it goes further than any one highlight. It draws a whole book together through the parts you chose to keep. It connects an idea in one book to an idea in another you'd never have put side by side. Your highlights stop being a record of what you read and become a way of thinking with it.
          </p>
        </div>
      </section>

      {/* SECTION 7 */}
      <section className={styles.section} aria-label="Origin story">
        <div className={`${styles.content} ${styles.normalText}`}>
          <p>
            I built this because I had 900 highlights across 33 books, and every one of them was an idea I'd genuinely wanted to keep. But when I went back, I'd lost the context, or I couldn't quite reach what I'd seen in it the first time, and there was nowhere to just sit and think with it. So I made the place I wanted.
          </p>
        </div>
      </section>

      {/* SECTION 8 */}
      <section className={styles.section} aria-label="Creator info">
        <div className={`${styles.content} ${styles.normalText}`}>
          <p>
            2Read is built and maintained by Jishnu, a solo founder and reader based in Cologne, Germany. If you have thoughts, I'd like to hear them:{" "}
            <a href="mailto:randomoranges.apps@gmail.com" className={styles.link}>
              randomoranges.apps@gmail.com
            </a>{" "}
            or{" "}
            <a
              href="https://x.com/1TrueJishnu"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              @1truejishnu
            </a>
            .
          </p>
        </div>
      </section>

      {/* SECTION 9 */}
      <section className={styles.section} aria-label="Call to action">
        <div className={`${styles.content} ${styles.normalText}`}>
          <p>
            Your best ideas are already highlighted. They just need a better home.
          </p>
          <div className={styles.ctaWrapper}>
            <Link to="/" className={styles.ctaLink}>
              try 2Read.
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}