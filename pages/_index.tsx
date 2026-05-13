import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Sun, Moon, BookOpen, FileUp, BookText, Sparkles, FileText, Star, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../components/Button";
import { useThemeMode } from "../helpers/themeMode";
import styles from "./_index.module.css";

const showcaseTabs = [
  {
    id: "highlights",
    label: "Highlights",
    caption: "Open a book. Swipe through the ideas worth keeping.",
    images: [
      {
        imgLight: "/images/highlights-1-light.png",
        imgDark: "/images/highlights-1-dark.png",
      },
      {
        imgLight: "/images/highlights-2-light.png",
        imgDark: "/images/highlights-2-dark.png",
      }
    ]
  },
  {
    id: "summaries",
    label: "Summaries",
    caption: "Generate a summary, or tell the AI exactly what you want.",
    imgLight: "/images/summaries.png",
    imgDark: "/images/summaries.png",
  },
  {
    id: "streaks",
    label: "Streaks",
    caption: "A small streak. A real reading habit.",
    imgLight: "/images/streaks-light.png",
    imgDark: "/images/streaks-dark.png",
  },
  {
    id: "more",
    label: "And more...",
    caption: "This is what waits for you in the app.",
    imgLight: "",
    imgDark: "",
    customContent: true,
  },
];

export default function LandingPage() {
  const [syncToggle, setSyncToggle] = useState<"kindle" | "sideloaded">("kindle");

  const { resolvedMode, switchToLightMode, switchToDarkMode } = useThemeMode();

  const [showPlayStoreQR, setShowPlayStoreQR] = useState(false);
  const [showAppStoreQR, setShowAppStoreQR] = useState(false);
  const [showMoreReviews, setShowMoreReviews] = useState(false);

  const [activeShowcaseTab, setActiveShowcaseTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [isShowcaseAutoPaused, setIsShowcaseAutoPaused] = useState(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isShowcaseAutoPaused) return;
    const timer = setTimeout(() => {
      const currentTab = showcaseTabs[activeShowcaseTab];
      if (currentTab.images && activeSubTab < currentTab.images.length - 1) {
        setActiveSubTab((prev) => prev + 1);
      } else {
        setActiveSubTab(0);
        setActiveShowcaseTab((prev) => (prev + 1) % showcaseTabs.length);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [activeShowcaseTab, activeSubTab, isShowcaseAutoPaused]);

  const handleShowcaseTabClick = (index: number) => {
    setActiveShowcaseTab(index);
    setActiveSubTab(0);
    setIsShowcaseAutoPaused(true);
    
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsShowcaseAutoPaused(false);
    }, 8000);
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
        <title>2Read | Your Kindle highlights. One swipe at a time.</title>
        <meta name="description" content="2Read captures your Kindle highlights and turns them into beautiful, swipeable cards you'll actually revisit." />
        <meta name="keywords" content="kindle highlights, reading app, book highlights, AI reading assistant, 2Read, highlight management, sideloaded books" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="2Read" />
        <meta property="og:title" content="2Read | Your Kindle highlights. One swipe at a time." />
        <meta property="og:description" content="2Read captures your Kindle highlights and turns them into beautiful, swipeable cards you'll actually revisit." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://2read.app" />
        <meta property="og:site_name" content="2Read" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://2read.app/images/hero-light.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="2Read | Your Kindle highlights. One swipe at a time." />
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
            <h1 className={styles.heroTitle}>
              Your Kindle highlights. <span className={styles.accentItalic}>One swipe</span> at a time.
            </h1>
            <p className={styles.heroSubtitle}>
              2Read brings your Kindle highlights back, one card at a time — including sideloaded books. AI thinks alongside each one.
            </p>
            <div className={styles.heroAction}>
              <Button className={styles.downloadBtn} size="lg" onClick={scrollToCTA}>
                Download for Free
              </Button>
            </div>

            <div className={styles.phoneMockupContainer}>
              <img 
                src={resolvedMode === "dark" 
                  ? "/images/hero-dark.png"
                  : "/images/hero-light.png"} 
                alt="2Read app showing Kindle highlights organized as swipeable cards" 
                className={styles.heroMockupImage} 
              />
            </div>

            <div className={styles.phEmbeds}>
              <a href="https://www.producthunt.com/products/2read-3/launches/2read-4?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_campaign=badge-2read-4" target="_blank" rel="noopener noreferrer">
                <img alt="2Read - AI Kindle Reading Buddy | Product Hunt Top Post Badge" width="250" height="54" src={`https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=695205&theme=${resolvedMode === 'dark' ? 'dark' : 'light'}&period=daily&t=1774880084972`} />
              </a>
              <a href="https://www.producthunt.com/products/2read-3/launches/2read-4?embed=true&utm_source=badge-top-post-topic-badge&utm_medium=badge&utm_campaign=badge-2read-4" target="_blank" rel="noopener noreferrer">
                <img alt="2Read - AI Kindle Reading Buddy | Product Hunt Weekly Topic Badge" width="250" height="54" src={`https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=695205&theme=${resolvedMode === 'dark' ? 'dark' : 'light'}&period=weekly&topic_id=46&t=1774880084972`} />
              </a>
            </div>
            
            <p className={styles.bottomNote}>
              Available on Android & iOS · Free to start · Works without a Kindle device
            </p>
          </div>
        </section>

        {/* TWO WAYS IN SECTION */}
        <section className={styles.section} aria-label="Features">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Two ways in. Both effortless.</h2>
            
            <div className={styles.toggleContainer}>
              <div className={styles.toggleSwitch}>
                <button
                  className={`${styles.toggleBtn} ${syncToggle === "kindle" ? styles.toggleBtnActive : ""}`}
                  onClick={() => setSyncToggle("kindle")}
                >
                  <BookOpen size={18} className={styles.toggleIcon} />
                  Kindle Books
                </button>
                <button
                  className={`${styles.toggleBtn} ${syncToggle === "sideloaded" ? styles.toggleBtnActive : ""}`}
                  onClick={() => setSyncToggle("sideloaded")}
                >
                  <FileUp size={18} className={styles.toggleIcon} />
                  Sideloaded Docs
                </button>
              </div>
            </div>

            <div className={styles.twoColLayout}>
              <div className={styles.videoPlaceholderLarge}>
                <span className={styles.placeholderText}>Video placeholder</span>
              </div>
              <div className={styles.textCol}>
                {syncToggle === "kindle" ? (
                  <>
                    <h3 className={styles.subHeading}>One sync. All your highlights.</h3>
                    <p className={styles.paragraph}>
                    No exports. No manual copying. Sign in once and every highlight from every book is yours, organised and ready to revisit.
                    </p>
                    <button
                      className={styles.inlineSwitchLink}
                      onClick={() => setSyncToggle("sideloaded")}
                    >
                      Got highlights from sideloaded docs, PDFs, ePubs? See how easy it is to import them →
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className={styles.subHeading}>4 taps. That's it.</h3>
                    <p className={styles.paragraph}>
                      Open the Kindle app → tap the three dots on your sideloaded book → tap Annotations → tap Share → select 2Read. Your highlights are instantly in the app. This works with any book, PDF, or document you've sideloaded to your Kindle app.
                    </p>
                    <p className={styles.paragraph}>
                      No cables. No browser extension. No laptop. No export files. Just your phone and 10 seconds.
                    </p>
                    <div className={styles.calloutBox}>
                      <span className={styles.calloutIcon}>💡</span>
                      <p className={styles.calloutText}>
                        <strong>This is the feature other highlight tools can't do.</strong>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className={styles.kindleSetupCallout}>
              <p className={styles.kindleSetupHeadline}>Don't own a Kindle? You don't need one.</p>
              <Link to="/for-you" className={styles.kindleSetupLink}>
                See how to set this up with the free Kindle app <span className={styles.kindleSetupArrow}>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* COME BACK EVERY DAY SECTION */}
        <section className={styles.section} aria-label="Showcase">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Your highlights aren't a spreadsheet export. They're ideas worth revisiting</h2>
            <p className={styles.sectionSubtitle}>
            </p>

            <div className={styles.showcaseContainer}>
              <div className={styles.showcasePhone}>
                {showcaseTabs.map((tab, idx) => {
                  if (tab.customContent) {
                    return (
                      <div
                        key={tab.id}
                        className={`${styles.showcaseCustomContent} ${activeShowcaseTab === idx ? styles.activeScreenshot : ""}`}
                      >
                        <img 
                          src="/images/logo.png"
                          alt="2Read app icon" 
                          className={styles.showcaseAppIcon}
                        />
                        <span className={styles.showcaseMoreText}>and more...</span>
                      </div>
                    );
                  }

                  if (tab.images) {
                    return tab.images.map((imgPair, subIdx) => (
                      <img
                        key={`${tab.id}-${subIdx}`}
                        src={resolvedMode === "dark" ? imgPair.imgDark : imgPair.imgLight}
                        alt={`${tab.label} ${subIdx + 1}`}
                        className={`${styles.showcaseScreenshot} ${activeShowcaseTab === idx && activeSubTab === subIdx ? styles.activeScreenshot : ""}`}
                      />
                    ));
                  }

                  return (
                    <img
                      key={tab.id}
                      src={resolvedMode === "dark" ? tab.imgDark : tab.imgLight}
                      alt={tab.label}
                      className={`${styles.showcaseScreenshot} ${activeShowcaseTab === idx ? styles.activeScreenshot : ""}`}
                    />
                  );
                })}
              </div>

              <div className={styles.showcaseControls}>
                <div className={styles.toggleSwitch}>
                  {showcaseTabs.slice(0, 3).map((tab, idx) => (
                    <button
                      key={tab.id}
                      className={`${styles.toggleBtn} ${activeShowcaseTab === idx ? styles.toggleBtnActive : ""}`}
                      onClick={() => handleShowcaseTabClick(idx)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <p className={styles.showcaseCaption}>
                  {showcaseTabs[activeShowcaseTab].caption}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PERSONAL READING TUTOR SECTION */}
        <section className={styles.section} aria-label="AI Features">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>The book is closed. The ideas aren't.</h2>
            <p className={styles.sectionSubtitle}>
              Tap, ask, summarise, return. The AI makes each highlight live a little longer.
            </p>

            <div className={styles.tutorGrid}>
              <div className={styles.tutorCard}>
                <div className={styles.iconContainer} style={{ backgroundColor: '#fce8e4', color: '#d4735a', borderColor: '#f8d9d3' }}>
                  <BookText size={22} />
                </div>
                <h4 className={styles.tutorCardTitle}>Smart Dictionary — Tap a word.</h4>
                <p className={styles.tutorCardDesc}>
  Get its meaning <em>in this passage</em>, not the dictionary's default.
</p>
              </div>

              <div className={styles.tutorCard}>
                <div className={styles.iconContainer} style={{ backgroundColor: '#e4eaf8', color: '#5b7ec2', borderColor: '#d3dcf2' }}>
                  <Sparkles size={22} />
                </div>
                <h4 className={styles.tutorCardTitle}>AI Insight</h4>
                <p className={styles.tutorCardDesc}>One tap. The AI reads the highlight and gives you what it needs — context, a simpler take, or a deeper unpack.</p>
              </div>

              <div className={styles.tutorCard}>
                <div className={styles.iconContainer} style={{ backgroundColor: '#dff3ed', color: '#4aad8b', borderColor: '#c8e8df' }}>
                  <FileText size={22} />
                </div>
                <h4 className={styles.tutorCardTitle}>AI Summary</h4>
                <p className={styles.tutorCardDesc}>Summarise the book through your own highlights — or tell the AI exactly what to focus on.</p>
              </div>

              <div className={styles.tutorCard}>
                <div className={styles.iconContainer} style={{ backgroundColor: '#ede4f5', color: '#8b6aaf', borderColor: '#e1d2ef' }}>
                  <Star size={22} />
                </div>
                <h4 className={styles.tutorCardTitle}>Daily Wisdom Spark</h4>
                <p className={styles.tutorCardDesc}>15 highlights a day, plus one moment of connection across your library.</p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className={`${styles.section} ${styles.testimonialSection}`} aria-label="Testimonials">
          <div className={styles.container}>
            <p className={styles.testimonialEyebrow}>Reviews</p>
            <h2 className={styles.testimonialTitle}>From readers who already use it.</h2>
            <p className={styles.testimonialSubtitle}>Real users. Real highlights. Real reading.</p>

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
              <h2 className={styles.ctaTitle}>Your highlights are waiting.</h2>
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

              <p className={styles.ctaBottomNote}>
                <Link to="/for-you" className={styles.ctaTrustLink}>
                  No Kindle device needed <span className={styles.ctaTrustArrow}>→</span>
                </Link>
                <span className={styles.ctaTrustSeparator}>·</span>
                <span>Works with Kindle, PDFs, ePubs</span>
                <span className={styles.ctaTrustSeparator}>·</span>
                <span>Free forever for core features</span>
              </p>
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

          <div className={styles.footerGrid}>
            <div className={styles.footerCol}>
              <Link to="/about" className={styles.footerLink}>About</Link>
              <Link to="/pricing" className={styles.footerLink}>Pricing</Link>
              <Link to="/faq" className={styles.footerLink}>FAQ</Link>
            </div>
            <div className={styles.footerCol}>
              <a href="#" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Instagram</a>
              <a href="#" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>YouTube</a>
              <a href="#" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>X</a>
              <a href="#" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>TikTok</a>
            </div>
            <div className={styles.footerCol}>
              <a href="#" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Medium</a>
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