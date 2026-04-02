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
        "name": "About | 2Read",
        "description": "The story behind 2Read: closing the gap between reading and remembering.",
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
            "name": "About",
            "item": "https://2read.app/about"
          }
        ]
      }
    ]
  };

  return (
    <main className={styles.pageWrapper} role="main">
      <Helmet>
        <title>About | 2Read</title>
        <meta
          name="description"
          content="The story behind 2Read: closing the gap between reading and remembering."
        />
        <meta name="keywords" content="2Read, reading app, kindle highlights, about 2Read, remember what you read" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://2read.app/about" />

        {/* Open Graph */}
        <meta property="og:title" content="About 2Read" />
        <meta property="og:description" content="The story behind 2Read: closing the gap between reading and remembering." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://2read.app/about" />
        <meta property="og:site_name" content="2Read" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About 2Read" />
        <meta name="twitter:description" content="The story behind 2Read: closing the gap between reading and remembering." />

        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      {/* SECTION 1 */}
      <section className={styles.section} aria-label="Introduction">
        <div className={`${styles.content} ${styles.largeText}`}>
          <h1 className={styles.largeTitle}>
            Imagine actually remembering what you read.
          </h1>
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
            We highlight with intention. Then we forget with ease. Hundreds of passages sitting in Kindle, untouched. Brilliant ideas buried in a text file called My Clippings. Insights from sideloaded textbooks and research papers — trapped on a device with no way out.
          </p>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className={styles.section} aria-label="Existing tools">
        <div className={`${styles.content} ${styles.normalText} ${styles.minimalSpacing}`}>
          <p>
            The tools that exist weren't built for you. They were built for power users who export CSVs, install browser extensions, and pipe data into note-taking systems. You just wanted to read and remember.
          </p>
        </div>
      </section>

      {/* SECTION 4 */}
      <section className={styles.section} aria-label="Reading deserves better">
        <div className={`${styles.content} ${styles.normalText}`}>
          <p>
            Reading deserves better than that. Your highlights aren't data. They're the moments a book spoke directly to you. They deserve to be seen again — beautifully, effortlessly, on the device already in your hand.
          </p>
        </div>
      </section>

      {/* SECTION 5 */}
      <section className={styles.section} aria-label="2Read's mission">
        <div className={`${styles.content} ${styles.normalText}`}>
          <p>
            2Read exists to close the gap between reading and remembering. To take the highlights you've already made — from any Kindle book, any sideloaded document, any PDF you're studying — and make them feel alive again.
          </p>
        </div>
      </section>

      {/* SECTION 6 */}
      <section className={styles.section} aria-label="Deep understanding">
        <div className={`${styles.content} ${styles.mediumText}`}>
          <p>
            One swipe at a time. With AI that helps you understand deeply, not just store efficiently.
          </p>
        </div>
      </section>

      {/* SECTION 7 */}
      <section className={styles.section} aria-label="Origin story">
        <div className={`${styles.content} ${styles.normalText}`}>
          <p>
            Built by a reader who got tired of forgetting. 400+ highlights across 30 books. Never looked at again. That frustration became this app.
          </p>
        </div>
      </section>

      {/* SECTION 8 */}
      <section className={styles.section} aria-label="Creator info">
        <div className={`${styles.content} ${styles.normalText}`}>
          <p>
            2Read is built and maintained by Jishnu — a solo founder, reader, and builder based in Cologne, Germany. If you have thoughts or feedback —{" "}
            <a href="mailto:jishnu.matra@gmail.com" className={styles.link}>
              jishnu.matra@gmail.com
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
            Because the best ideas you've ever read are already highlighted. You just need a reason to go back to them.
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