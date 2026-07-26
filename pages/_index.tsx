import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Sun, Moon, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../components/Button";
import { useThemeMode } from "../helpers/themeMode";
import styles from "./_index.module.css";

export default function LandingPage() {
  const { resolvedMode, switchToLightMode, switchToDarkMode } = useThemeMode();

  const [showPlayStoreQR, setShowPlayStoreQR] = useState(false);
  const [showAppStoreQR, setShowAppStoreQR] = useState(false);
  const [showMoreReviews, setShowMoreReviews] = useState(false);
  const [activeReaderGroup, setActiveReaderGroup] = useState<null | "A" | "B" | "C" | "overlap">(null);

  const readerGroupDescriptions: Record<"A" | "B" | "C" | "overlap", string> = {
    A: "If you read a lot of these, the AI has plenty to work with: practical ideas it can explain, unpack, and tie back to things you already know. It's at its best here.",
    B: "If you read a lot of these, the AI is just as strong: dense arguments it can clarify, trace, and set against other thinkers. It's at its best here too.",
    overlap: "If your library is a mix of these, two of them or all three, this is where 2Read goes furthest. The Wisdom Spark has the most to connect: an idea from one shelf meeting an idea from another you'd never have put together.",
    C: "If you read mostly novels, there's less for the AI to unpack. Fiction leans on context that a single highlight loses, so an insight can miss. But Smart Dictionary shines here. For older books especially, it nails what a word meant in its time. Newer fiction, less so. That's why it's lighter to unpack but lovely to revisit.",
  };

  const canHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(hover: hover)").matches;

  const handleGroupEnter = (g: "A" | "B" | "C" | "overlap") => {
    if (canHover()) setActiveReaderGroup(g);
  };

  const handleGroupLeave = () => {
    if (canHover()) setActiveReaderGroup(null);
  };

  const handleGroupClick = (g: "A" | "B" | "C" | "overlap") => {
    setActiveReaderGroup((prev) => (prev === g ? null : g));
  };

  const toggleTheme = () => {
    if (resolvedMode === "dark") {
      switchToLightMode();
    } else {
      switchToDarkMode();
    }
  };

  const scrollToCTA = () => {
    document.getElementById("cta-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>2Read | Your highlights, thinking with you.</title>
        <meta name="description" content="2Read captures your Kindle highlights and turns them into beautiful, swipeable cards you'll actually revisit." />
        <meta name="keywords" content="kindle highlights, reading app, book highlights, AI reading assistant, 2Read, highlight management, sideloaded books" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="2Read" />
        <meta property="og:title" content="2Read | Your highlights, thinking with you." />
        <meta property="og:description" content="2Read captures your Kindle highlights and turns them into beautiful, swipeable cards you'll actually revisit." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://2read.app" />
        <meta property="og:site_name" content="2Read" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://2read.app/images/hero-light.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="2Read | Your highlights, thinking with you." />
        <meta name="twitter:description" content="2Read captures your Kindle highlights and turns them into beautiful, swipeable cards you'll actually revisit." />
        <meta name="twitter:image" content="https://2read.app/images/hero-light.png" />
        <link rel="canonical" href="https://2read.app" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "name": "2Read",
                "url": "https://2read.app",
                "description": "2Read captures your Kindle highlights and turns them into beautiful, swipeable cards you'll actually revisit."
              },
              {
                "@type": "SoftwareApplication",
                "name": "2Read",
                "operatingSystem": "Android, iOS",
                "applicationCategory": "UtilitiesApplication",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "description": "2Read captures your Kindle highlights and turns them into beautiful, swipeable cards you'll actually revisit."
              },
              {
                "@type": "Organization",
                "name": "2Read",
                "url": "https://2read.app",
                "logo": "https://2read.app/images/logo.png"
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is 2Read?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "2Read captures your Kindle highlights and turns them into beautiful, swipeable cards you'll actually revisit. Built-in AI helps you understand and remember more."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Does 2Read work with sideloaded books?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. Open the Kindle app, tap the three dots on your sideloaded book, tap Annotations, tap Share, and select 2Read. Your highlights are instantly in the app."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is 2Read free?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, 2Read is free to start. No credit card required."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do I need a Kindle device?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "No, 2Read works with the free Kindle app. No Kindle device is required."
                    }
                  }
                ]
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://2read.app"
                  }
                ]
              }
            ]
          })}
        </script>
      </Helmet>

      {/* HEADER */}
      <header className={styles.header} role="banner">
        <div className={styles.headerContainer}>
          <div className={styles.logoArea}>
            <img 
              src="/images/logo.png"
              alt="2Read logo"
              className={styles.logoImage}
            />
            <span className={styles.logoText}>2Read.</span>
          </div>
          <div className={styles.headerActions}>
            <button 
              className={styles.themeToggle} 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <div className={`${styles.themeTogglePill} ${resolvedMode === "dark" ? styles.themeTogglePillDark : ""}`}>
                {resolvedMode === "dark" ? <Moon size={14} className={styles.themeToggleIcon} /> : <Sun size={14} className={styles.themeToggleIcon} />}
              </div>
            </button>
            <Button className={styles.getAppBtn}>Get the app</Button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className={styles.heroSection} aria-label="Hero">
          <div className={styles.container}>
            <div className={styles.heroCopy}>
              <h1 className={styles.heroTitle}>
                Your highlights, <span className={styles.accentItalic}>thinking with you.</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Works with every highlight on your Kindle, sideloaded books included. Not a place to store them — a place to sit with them, understand them, and make them yours.
              </p>
              <div className={styles.heroAction}>
                <Button className={styles.downloadBtn} size="lg" onClick={scrollToCTA}>
                  Download for Free
                </Button>
              </div>
            </div>

            {/*
              Phone mockup — kept for later. Uncomment and restore .heroGrid wrapper to bring it back.
              <div className={styles.heroPhoneCol}>
                <div className={styles.phoneMockupContainer}>
                  <img
                    src={resolvedMode === "dark"
                      ? "/images/hero-dark.png"
                      : "/images/hero-light.png"}
                    alt="2Read app showing Kindle highlights organized as swipeable cards"
                    className={styles.heroMockupImage}
                  />
                </div>
              </div>
            */}
          </div>
        </section>

        {/* SECTION I — THE PROMISE */}
        <section className={styles.editorialSection} aria-label="The promise">
          <div className={styles.editorialWrap}>
            <div className={styles.editorialMarker}>I</div>
            <h2 className={styles.editorialTitle}>
              You underlined the best parts of every book.<br />
              <span className={styles.accentItalic}>Then you closed it, and that was that.</span>
            </h2>
            <div className={styles.editorialTurn}>
              <p className={styles.editorialBody}>
                The highlights are still there. You're just never going to open that notebook again. It was never a storage problem — Kindle already keeps them. It's that a list of old highlights gives you no reason to return. So you don't, and slowly everything you read becomes something you used to know.
              </p>
              <p className={styles.editorialBodyMuted}>
                2Read is the thing in between. It takes what you underline and turns it into something that stays with you — read, revisited, and understood, a few minutes at a time.
              </p>
            </div>

            <div className={styles.diagramLabel}>How it works</div>
            <div className={styles.bridgeDiagram}>
              <svg viewBox="0 0 640 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="bridgeFan" x1="246" y1="150" x2="580" y2="150" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="var(--text-main)" stopOpacity="0" />
                    <stop offset="1" stopColor="var(--text-main)" stopOpacity="0.14" />
                  </linearGradient>
                  <marker id="bridgeArrow" markerWidth="11" markerHeight="11" refX="6" refY="5.5" orient="auto">
                    <path d="M0,0 L9,5.5 L0,11 z" style={{ fill: "var(--text-main)" }} />
                  </marker>
                </defs>
                <path d="M246 150 L560 52 Q592 150 560 248 Z" fill="url(#bridgeFan)" />
                <line x1="60" y1="92" x2="590" y2="257" style={{ stroke: "var(--text-main)" }} strokeWidth="1.4" markerEnd="url(#bridgeArrow)" />
                <line x1="60" y1="208" x2="590" y2="43" style={{ stroke: "var(--text-main)" }} strokeWidth="1.4" markerEnd="url(#bridgeArrow)" />
                <text x="74" y="83" style={{ fill: "var(--text-main)" }} fontFamily="'Inter', sans-serif" fontSize="13.5" letterSpacing="1.6" transform="rotate(17 74 83)">YOUR HIGHLIGHTS</text>
                <text x="74" y="225" style={{ fill: "var(--text-main)" }} fontFamily="'Inter', sans-serif" fontSize="13.5" letterSpacing="1.6" transform="rotate(-17 74 225)">A BEAUTIFUL SYSTEM</text>
                <text x="430" y="156" style={{ fill: "var(--text-main)" }} fontFamily="'Inter', sans-serif" fontSize="13.5" letterSpacing="1.6" fontWeight="500">IDEAS THAT STAY</text>
              </svg>
            </div>

            <div className={styles.sideloadBlock}>
              <p className={styles.sideloadLead}>
                And not just the books you bought. <b>The ones you sideloaded too</b> — the part no other tool can reach.
              </p>
              <div className={styles.sideloadSteps}>
                <span className={styles.sideloadStep}>Open the Kindle app</span>
                <span className={styles.sideloadArrow}>→</span>
                <span className={styles.sideloadStep}>the book's <b>···</b> menu</span>
                <span className={styles.sideloadArrow}>→</span>
                <span className={styles.sideloadStep}>Annotations</span>
                <span className={styles.sideloadArrow}>→</span>
                <span className={styles.sideloadStep}>Share</span>
                <span className={styles.sideloadArrow}>→</span>
                <span className={`${styles.sideloadStep} ${styles.sideloadStepAccent}`}>2Read</span>
              </div>
              <p className={styles.sideloadFoot}>
                Any PDF, ePub, or document you've sent to Kindle. No cables, no browser extension, no laptop, no export files — just your phone and ten seconds. And no Kindle device required; the free Kindle app is enough.
              </p>
            </div>

            <div className={styles.kindleSetupCallout}>
              <p className={styles.kindleSetupHeadline}>Don't own a Kindle? You don't need one.</p>
              <Link to="/for-you" className={styles.kindleSetupLink}>
                See how to set this up with the free Kindle app <span className={styles.kindleSetupArrow}>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION II — THE THINKING PARTNER */}
        <section className={styles.editorialSection} aria-label="Thinking partner">
          <div className={styles.editorialWrap}>
            <div className={styles.editorialMarker}>II</div>
            <h2 className={styles.editorialTitle}>Less a library. More a thinking partner.</h2>
            <p className={styles.ladderIntro}>
              A companion doesn't just hold your reading — it thinks alongside it, at whatever scale you're reading. Meaning builds in four steps, and there's something waiting at each one.
            </p>

            {[
              {
                scale: "Word",
                name: "Smart Dictionary",
                q: "What does this actually mean, here?",
                a: <>Select a word or a phrase and get its meaning <b>in this passage</b> — the sense the author intended, not the flat dictionary default. It works even on the terms authors coin, the ones no dictionary lists.</>,
              },
              {
                scale: "Passage",
                name: "Insight",
                q: "Help me actually take this in.",
                a: <><b>Unpacks the highlight</b> — puts it in simpler terms when it needs them, adds a little context, gives you an example. The dense sentence you underlined and half-understood becomes one you hold onto.</>,
              },
              {
                scale: "Book",
                name: "Synthesis",
                q: "What was this whole book, to me?",
                a: <><b>Draws the book together through your own highlights</b> — not a generic summary, but a synthesis of the parts you chose to keep. And you can tell it what to focus on.</>,
              },
              {
                scale: "Library",
                name: "Wisdom Spark",
                q: "What does this connect to, across everything I've read?",
                a: <><b>Reaches across your entire library</b> for a connection you'd never have drawn yourself — one highlight, linked to a thinker, a discipline, or a book you read years ago.</>,
              },
            ].map((r) => (
              <div key={r.scale} className={styles.ladderRung}>
                <div className={styles.ladderScale}>
                  <span className={styles.ladderScaleLabel}>{r.scale}</span>
                  {r.name}
                </div>
                <div>
                  <p className={styles.ladderQ}>{r.q}</p>
                  <p className={styles.ladderA}>{r.a}</p>
                </div>
              </div>
            ))}

            <p className={styles.ladderClose}>
              Word, passage, book, library. <span className={styles.accentItalic}>That's not a feature list — it's the shape of how thinking with someone actually works.</span>
            </p>
          </div>
        </section>

        {/* SECTION III — WHO THE PARTNER SERVES */}
        <section className={styles.editorialSection} aria-label="Who the partner serves">
          <div className={styles.editorialWide}>
            <div className={styles.editorialMarker}>III</div>
            <h2 className={styles.editorialTitle}>It's a companion for every reader. A thinking partner for some.</h2>
            <p className={styles.readersIntro}>
              The daily review, the ritual, the keeping — that works for anyone who underlines. But the AI, the part that explains and connects, has the most to do where the reading is dense. Which is to say: non-fiction.
            </p>

            <div className={styles.diagramLabel}>Where the thinking partner (AI) does its best work</div>
            <div className={styles.readerDiagram}>
              <svg viewBox="0 0 900 540" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="readerA" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#D9836A" stopOpacity="0.34" />
                    <stop offset="70%" stopColor="#D9836A" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#D9836A" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="readerB" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#89A197" stopOpacity="0.32" />
                    <stop offset="70%" stopColor="#89A197" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#89A197" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="readerC" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#B5A088" stopOpacity="0.28" />
                    <stop offset="70%" stopColor="#B5A088" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#B5A088" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <g
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => handleGroupEnter("A")}
                  onMouseLeave={handleGroupLeave}
                  onClick={() => handleGroupClick("A")}
                >
                  <circle cx="340" cy="220" r="185" fill="url(#readerA)" />
                  <circle cx="340" cy="220" r="150" fill="none" stroke="#D9836A" strokeOpacity="0.35" strokeWidth="1" />
                </g>

                <g
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => handleGroupEnter("B")}
                  onMouseLeave={handleGroupLeave}
                  onClick={() => handleGroupClick("B")}
                >
                  <circle cx="560" cy="220" r="185" fill="url(#readerB)" />
                  <circle cx="560" cy="220" r="150" fill="none" stroke="#89A197" strokeOpacity="0.40" strokeWidth="1" />
                </g>

                <g
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => handleGroupEnter("C")}
                  onMouseLeave={handleGroupLeave}
                  onClick={() => handleGroupClick("C")}
                >
                  <circle cx="450" cy="430" r="120" fill="url(#readerC)" />
                  <circle cx="450" cy="430" r="95" fill="none" stroke="#B5A088" strokeOpacity="0.45" strokeWidth="1" />
                </g>

                <g style={{ pointerEvents: "none" }}>
                  {/* Reader A labels — left-aligned block, visually centered in circle A */}
                  <text x="300" y="152" style={{ fill: "var(--text-muted)" }} fontFamily="'Inter', sans-serif" fontSize="11.5" letterSpacing="0.16em">READER A</text>
                  <text x="300" y="184" style={{ fill: "var(--text-main)" }} fontFamily="'Newsreader', serif" fontSize="18">Self-help</text>
                  <text x="300" y="209" style={{ fill: "var(--text-main)" }} fontFamily="'Newsreader', serif" fontSize="18">Business</text>
                  <text x="300" y="234" style={{ fill: "var(--text-main)" }} fontFamily="'Newsreader', serif" fontSize="18">Psychology</text>
                  <text x="300" y="259" style={{ fill: "var(--text-main)" }} fontFamily="'Newsreader', serif" fontSize="18">Health</text>

                  {/* Reader B labels — left-aligned block, visually centered in circle B */}
                  <text x="520" y="140" style={{ fill: "var(--text-muted)" }} fontFamily="'Inter', sans-serif" fontSize="11.5" letterSpacing="0.16em">READER B</text>
                  <text x="520" y="172" style={{ fill: "var(--text-main)" }} fontFamily="'Newsreader', serif" fontSize="18">Philosophy</text>
                  <text x="520" y="197" style={{ fill: "var(--text-main)" }} fontFamily="'Newsreader', serif" fontSize="18">History</text>
                  <text x="520" y="222" style={{ fill: "var(--text-main)" }} fontFamily="'Newsreader', serif" fontSize="18">Economics</text>
                  <text x="520" y="247" style={{ fill: "var(--text-main)" }} fontFamily="'Newsreader', serif" fontSize="18">Literature</text>
                  <text x="520" y="272" style={{ fill: "var(--text-main)" }} fontFamily="'Newsreader', serif" fontSize="18">Academic</text>

                  {/* Overlap inner label */}
                  <text x="450" y="216" textAnchor="middle" style={{ fill: "var(--text-muted)" }} fontFamily="'Newsreader', serif" fontStyle="italic" fontSize="15">sweet</text>
                  <text x="450" y="236" textAnchor="middle" style={{ fill: "var(--text-muted)" }} fontFamily="'Newsreader', serif" fontStyle="italic" fontSize="15">spot</text>

                  {/* Reader C labels */}
                  <text x="450" y="400" textAnchor="middle" style={{ fill: "var(--text-muted)" }} fontFamily="'Inter', sans-serif" fontSize="11.5" letterSpacing="0.16em">READER C</text>
                  <text x="450" y="432" textAnchor="middle" style={{ fill: "var(--text-main)" }} fontFamily="'Newsreader', serif" fontSize="18">Novels · Fiction</text>
                  <text x="450" y="458" textAnchor="middle" style={{ fill: "var(--text-main)" }} fontFamily="'Newsreader', serif" fontSize="18">Memoir · Essays</text>

                  {/* Left "works beautifully" — parked in the outer empty space, well above C */}
                  <path d="M195 380 Q220 360 245 335" fill="none" style={{ stroke: "var(--text-main)" }} strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M245 335 l-13 -1 M245 335 l-4 12" fill="none" style={{ stroke: "var(--text-main)" }} strokeWidth="1.6" strokeLinecap="round" />
                  <text x="20" y="395" style={{ fill: "var(--text-main)" }} fontFamily="'Caveat', cursive" fontSize="28" fontWeight="500">works beautifully</text>

                  {/* Right "works beautifully" — mirror */}
                  <path d="M705 380 Q680 360 655 335" fill="none" style={{ stroke: "var(--text-main)" }} strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M655 335 l13 -1 M655 335 l4 12" fill="none" style={{ stroke: "var(--text-main)" }} strokeWidth="1.6" strokeLinecap="round" />
                  <text x="880" y="395" textAnchor="end" style={{ fill: "var(--text-main)" }} fontFamily="'Caveat', cursive" fontSize="28" fontWeight="500">works beautifully</text>

                  {/* Top "the richest reading" — navy in light, white in dark */}
                  <path d="M450 78 Q450 128 450 180" fill="none" style={{ stroke: "var(--richest-color)" }} strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M450 180 l-8 -11 M450 180 l8 -11" fill="none" style={{ stroke: "var(--richest-color)" }} strokeWidth="1.8" strokeLinecap="round" />
                  <text x="450" y="58" textAnchor="middle" style={{ fill: "var(--richest-color)" }} fontFamily="'Caveat', cursive" fontSize="34" fontWeight="600">the richest reading</text>

                  {/* Right side C annotation — right-aligned so it stays inside the viewbox */}
                  <path d="M710 465 Q640 460 555 448" fill="none" style={{ stroke: "var(--text-muted)" }} strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M555 448 l12 -4 M555 448 l11 7" fill="none" style={{ stroke: "var(--text-muted)" }} strokeWidth="1.5" strokeLinecap="round" />
                  <text x="885" y="465" textAnchor="end" style={{ fill: "var(--text-muted)" }} fontFamily="'Caveat', cursive" fontSize="24" fontWeight="500">lovely to revisit —</text>
                  <text x="885" y="491" textAnchor="end" style={{ fill: "var(--text-muted)" }} fontFamily="'Caveat', cursive" fontSize="24" fontWeight="500">less to unpack.</text>
                </g>

                {/* Invisible overlap interaction zone — drawn last so it captures events over A/B */}
                <ellipse
                  cx="450"
                  cy="220"
                  rx="42"
                  ry="95"
                  fill="transparent"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => handleGroupEnter("overlap")}
                  onMouseLeave={handleGroupLeave}
                  onClick={() => handleGroupClick("overlap")}
                />
              </svg>

              {activeReaderGroup && (
                <div className={styles.readerTooltip} role="status" aria-live="polite">
                  {readerGroupDescriptions[activeReaderGroup]}
                </div>
              )}
            </div>

            <p className={styles.readersResolve}>
              Best for non-fiction. Sharpest across two shelves at once. <span className={styles.accentItalic}>A good companion no matter what you read.</span>
            </p>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className={`${styles.section} ${styles.testimonialSection}`} aria-label="Testimonials">
          <div className={styles.container}>
            <p className={styles.testimonialEyebrow}>Reviews</p>
            <h2 className={styles.testimonialTitle}>From readers who already use it.</h2>

            <div className={styles.testimonialGrid}>
              {([
                { source: "appstore", quote: "I love how this app makes my Kindle highlights actually useful. It's a game changer.", author: "Alex M" },
                { source: "playstore", quote: "This app is amazing. It helps me in my reading profoundly.", author: "Lim Kenny" },
                { source: "producthunt", quote: "Always thought about a better way to review Kindle highlights. This looks promising.", author: "Josh Mead" },
                { source: "producthunt", quote: "2Read sounds like a fantastic tool for anyone looking to get more out of their Kindle reading! Syncing highlights, reflecting daily, and exploring insights are such great features for deeper engagement.", author: "Soundarya S" },
                { source: "producthunt", quote: "I really like the idea and design.", author: "Berkant Bostan" },
                { source: "producthunt", quote: "So excited to try your product!", author: "Ursula Rosien" },
                { source: "x", quote: "Love the idea.", author: "Ignacio" },
              ]).slice(0, showMoreReviews ? undefined : 3).map((t, i) => (
                <div key={i} className={styles.testimonialCard}>
                  <div className={styles.sourceBadge}>
                    {t.source === "producthunt" && (
                      <>
                        <svg className={styles.sourceIcon} viewBox="0 0 24 24" fill="#DA552F"><path d="M13.604 8.4h-3.405V12h3.405a1.8 1.8 0 000-3.6zM12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm1.604 14.4h-3.405V18H7.801V6h5.804a4.2 4.2 0 010 8.4z"/></svg>
                        <span>Product Hunt</span>
                      </>
                    )}
                    {t.source === "appstore" && (
                      <>
                        <svg className={styles.sourceIcon} viewBox="0 0 24 24" fill="#0D96F6"><path d="M8.8086 14.9194l6.1107-11.0368c.0837-.1513.1682-.302.2437-.4584.0685-.142.1267-.2854.1646-.4403.0803-.3259.0588-.6656-.066-.9767-.1238-.3095-.3417-.5678-.6201-.7355a1.4175 1.4175 0 0 0-.921-.1924c-.3207.043-.6135.1935-.8443.4288-.1094.1118-.1996.2361-.2832.369-.092.1463-.175.2979-.259.4492l-.3864.6979-.3865-.6979c-.0837-.1515-.1667-.303-.2587-.4492-.0837-.1329-.1739-.2572-.2835-.369-.2305-.2353-.5233-.3857-.844-.429a1.4181 1.4181 0 0 0-.921.1926c-.2784.1677-.4964.426-.6203.7355-.1246.311-.1461.6508-.066.9767.038.155.0962.2984.1648.4403.0753.1564.1598.307.2437.4584l1.248 2.2543-4.8625 8.7825H2.0295c-.1676 0-.3351-.0007-.5026.0092-.1522.009-.3004.0284-.448.0714-.3108.0906-.5822.2798-.7783.548-.195.2665-.3006.5929-.3006.9279 0 .3352.1057.6612.3006.9277.196.2683.4675.4575.7782.548.1477.043.296.0623.4481.0715.1675.01.335.009.5026.009h13.0974c.0171-.0357.059-.1294.1-.2697.415-1.4151-.6156-2.843-2.0347-2.843zM3.113 18.5418l-.7922 1.5008c-.0818.1553-.1644.31-.2384.4705-.067.1458-.124.293-.1611.452-.0785.3346-.0576.6834.0645 1.0029.1212.3175.3346.583.607.7549.2727.172.5891.2416.9013.1975.3139-.044.6005-.1986.8263-.4402.1072-.1148.1954-.2424.2772-.3787.0902-.1503.1714-.3059.2535-.4612L6 19.4636c-.0896-.149-.9473-1.4704-2.887-.9218m20.5861-3.0056a1.4707 1.4707 0 0 0-.779-.5407c-.1476-.0425-.2961-.0616-.4483-.0705-.1678-.0099-.3352-.0091-.503-.0091H18.648l-4.3891-7.817c-.6655.7005-.9632 1.485-1.0773 2.1976-.1655 1.0333.0367 2.0934.546 3.0004l5.2741 9.3933c.084.1494.167.299.2591.4435.0837.131.1739.2537.2836.364.231.2323.5238.3809.8449.4232.3192.0424.643-.0244.9217-.1899.2784-.1653.4968-.4204.621-.7257.1246-.3072.146-.6425.0658-.9641-.0381-.1529-.0962-.2945-.165-.4346-.0753-.1543-.1598-.303-.2438-.4524l-1.216-2.1662h1.596c.1677 0 .3351.0009.5029-.009.1522-.009.3007-.028.4483-.0705a1.4707 1.4707 0 0 0 .779-.5407A1.5386 1.5386 0 0 0 24 16.452a1.539 1.539 0 0 0-.3009-.9158Z"/></svg>
                        <span>App Store</span>
                      </>
                    )}
                    {t.source === "playstore" && (
                      <>
                        <svg className={styles.sourceIcon} viewBox="0 0 24 24" fill="#34A853"><path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z"/></svg>
                        <span>Play Store</span>
                      </>
                    )}
                    {t.source === "x" && (
                      <>
                        <svg className={styles.sourceIcon} viewBox="0 0 24 24" fill="var(--text-main)"><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/></svg>
                        <span>X (Twitter)</span>
                      </>
                    )}
                  </div>
                  <div className={styles.bigQuoteMark}>{"\u201C"}</div>
                  <p className={styles.quoteText}>{t.quote}</p>
                  <div className={styles.quoteAuthor}>
                    <span className={styles.authorLine} />
                    <span className={styles.authorName}>{t.author}</span>
                    <span className={styles.authorLine} />
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.testimonialFooter}>
              <button
                className={styles.testimonialFooterToggle}
                onClick={() => setShowMoreReviews(!showMoreReviews)}
                aria-expanded={showMoreReviews}
              >
                {showMoreReviews ? (
                  <>Show less <ChevronUp size={16} className={styles.toggleArrow} /></>
                ) : (
                  <>Plus reviews from <strong>Soundarya S</strong>, <strong>Berkant Bostan</strong>, <strong>Ursula Rosien</strong>, and others <ChevronDown size={16} className={styles.toggleArrow} /></>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section id="cta-section" className={styles.ctaSection} aria-label="Download">
          <div className={styles.ctaCurvedTop}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Give your highlights a thinking partner.</h2>
              <p className={styles.ctaSubtitle}>Free to download. No credit card required.</p>
              <p className={styles.ctaSubtitleSecondary}>Built for readers who already highlight. Now those highlights have a home.</p>

              <div className={styles.storeButtonsRow}>
                <div className={styles.storeCol}>
                  <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className={styles.storeBadgeLink}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className={styles.storeBadgeImg} />
                  </a>
                  <button className={styles.qrToggle} onClick={() => setShowPlayStoreQR(!showPlayStoreQR)}>
                    {showPlayStoreQR ? "Hide QR" : "Show QR"}
                  </button>
                  {showPlayStoreQR && <div className={styles.qrPlaceholder}>QR Code</div>}
                </div>

                <div className={styles.storeCol}>
                  <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className={styles.storeBadgeLink}>
                    <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83" alt="Download on the App Store" className={styles.storeBadgeImg} />
                  </a>
                  <button className={styles.qrToggle} onClick={() => setShowAppStoreQR(!showAppStoreQR)}>
                    {showAppStoreQR ? "Hide QR" : "Show QR"}
                  </button>
                  {showAppStoreQR && <div className={styles.qrPlaceholder}>QR Code</div>}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer} role="contentinfo">
        <div className={styles.container}>
          <div className={styles.footerLogo}>
            <img
              src="/images/logo.png"
              alt="2Read logo"
              className={styles.logoImage}
            />
            <span className={styles.logoText}>2Read.</span>
          </div>

          <div className={styles.footerBody}>
            <div className={styles.footerBadges}>
              <a
                href="https://www.producthunt.com/products/2read-3/launches/2read-4"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerBadgeLink}
              >
                <img
                  src="/images/ph-badge-day.png"
                  alt="Product Hunt — Product of the Day #4"
                  className={styles.footerBadgeImg}
                />
              </a>
              <a
                href="https://www.producthunt.com/products/2read-3/launches/2read-4"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerBadgeLink}
              >
                <img
                  src="/images/ph-badge-week.png"
                  alt="Product Hunt — Product of the Week #3 in Productivity"
                  className={styles.footerBadgeImg}
                />
              </a>
            </div>

            <div className={styles.footerCol}>
              <Link to="/about" className={styles.footerLink}>Why</Link>
              <Link to="/pricing" className={styles.footerLink}>Pricing</Link>
              <Link to="/faq" className={styles.footerLink}>FAQ</Link>
            </div>
            <div className={styles.footerCol}>
              <a href="#" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>X</a>
              <a href="#" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Substack</a>
              <Link to="/bookshots" className={styles.footerLinkAccent}>BookShots</Link>
            </div>
            <div className={styles.footerCol}>
              <Link to="/privacy" className={styles.footerLink}>Privacy</Link>
              <Link to="/terms" className={styles.footerLink}>Terms</Link>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>© 2026 2Read. Built for readers who mean it.</p>
            <div className={styles.creatorInfo}>
              <img src="/images/creator-avatar.png" alt="Creator logo" className={styles.creatorLogo} />
              <p>Created by <a href="#" className={styles.creatorLink}>Jishnu</a></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}