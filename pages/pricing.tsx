import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Sun, Moon, Check, Sparkle } from "lucide-react";
import { Button } from "../components/Button";
import { useThemeMode } from "../helpers/themeMode";
import styles from "./pricing.module.css";

export default function PricingPage() {
  const { resolvedMode, switchToLightMode, switchToDarkMode } = useThemeMode();
  const [isIndia, setIsIndia] = useState(false);
  const [isYearly, setIsYearly] = useState(true);

  const monthlyPrice = isIndia ? "₹399" : "$4.99";
  const yearlyPrice = isIndia ? "₹3,999" : "$49.99";

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') {
        setIsIndia(true);
      }
    } catch (e) {
      // Ignore if Intl is not supported
    }
  }, []);

  const toggleTheme = () => {
    if (resolvedMode === "dark") {
      switchToLightMode();
    } else {
      switchToDarkMode();
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": "Pricing | 2Read",
        "description": "Start free, upgrade when you're ready. Check out the pricing plans for 2Read.",
        "url": "https://2read.app/pricing"
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
            "name": "Pricing",
            "item": "https://2read.app/pricing"
          }
        ]
      },
      {
        "@type": "Product",
        "name": "2Read Reading App",
        "description": "App for bringing kindle and sideloaded highlights back to life.",
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": isIndia ? "INR" : "USD",
          "lowPrice": "0",
          "highPrice": isIndia ? "1199" : "39.99",
          "offers": [
            {
              "@type": "Offer",
              "name": "Curious (Free)",
              "price": "0",
              "priceCurrency": isIndia ? "INR" : "USD"
            },
            {
              "@type": "Offer",
              "name": "Scholar (Paid)",
              "price": isIndia ? "1199" : "39.99",
              "priceCurrency": isIndia ? "INR" : "USD"
            }
          ]
        }
      }
    ]
  };

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>Pricing | 2Read</title>
        <meta
          name="description"
          content="Start free, upgrade when you're ready. Check out the pricing plans for 2Read."
        />
        <meta name="keywords" content="2Read pricing, reading app plans, kindle highlight app pricing, free reading app" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://2read.app/pricing" />

        {/* Open Graph */}
        <meta property="og:title" content="Pricing | 2Read" />
        <meta property="og:description" content="Start free, upgrade when you're ready. Check out the pricing plans for 2Read." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://2read.app/pricing" />
        <meta property="og:site_name" content="2Read" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pricing | 2Read" />
        <meta name="twitter:description" content="Start free, upgrade when you're ready. Check out the pricing plans for 2Read." />

        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      {/* HEADER (Replicated from Landing Page) */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link to="/" className={styles.logoArea}>
            <img 
              src="/images/logo.png" 
              alt="2Read logo" 
              className={styles.logoImage} 
            />
            <span className={styles.logoText}>2Read.</span>
          </Link>
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
            <Button asChild className={styles.getAppBtn}>
              <a href="#download">Get the app</a>
            </Button>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.pricingSection} aria-label="Pricing Plans">
          <div className={styles.container}>
            <div className={styles.headerArea}>
              <h1 className={styles.pageTitle}>Become a Scholar</h1>
              <p className={styles.pageSubtitle}>Start free, upgrade when you're ready.</p>
            </div>

            <div className={styles.cardsContainer}>
              {/* CURIOUS PLAN (FREE) */}
              <div className={`${styles.card} ${styles.cardCurious}`}>
                <h2 className={styles.planName}>Curious</h2>
                <div className={styles.priceRow}>
                  <span className={styles.planPrice}>Free</span>
                  <span className={styles.priceSuffix}>· forever</span>
                </div>

                <ul className={styles.flatFeatureList}>
                  <li className={styles.flatItem}>
                    <Check size={18} className={styles.checkIcon} strokeWidth={2} />
                    <span>3 books from Kindle or sideloaded</span>
                  </li>
                  <li className={styles.flatItem}>
                    <Check size={18} className={styles.checkIcon} strokeWidth={2} />
                    <span>Daily Review</span>
                  </li>
                  <li className={styles.flatItem}>
                    <Check size={18} className={styles.checkIcon} strokeWidth={2} />
                    <span>Recall Notes</span>
                  </li>
                  <li className={styles.flatItem}>
                    <Check size={18} className={styles.checkIcon} strokeWidth={2} />
                    <span>Your ledger, with Wall of Books</span>
                  </li>
                  <li className={styles.flatItem}>
                    <Check size={18} className={styles.checkIcon} strokeWidth={2} />
                    <span>Bookshots</span>
                  </li>
                  <li className={styles.flatItem}>
                    <Check size={18} className={styles.checkIcon} strokeWidth={2} />
                    <span>Smart Dictionary <span className={styles.mutedInline}>(starter credits)</span></span>
                  </li>
                  <li className={styles.flatItem}>
                    <Check size={18} className={styles.checkIcon} strokeWidth={2} />
                    <span>Unpack <span className={styles.mutedInline}>(starter credits)</span></span>
                  </li>
                  <li className={styles.flatItem}>
                    <Check size={18} className={styles.checkIcon} strokeWidth={2} />
                    <span>Synthesis <span className={styles.mutedInline}>(starter credits)</span></span>
                  </li>
                </ul>
              </div>

              {/* SCHOLAR — merged with monthly/yearly toggle */}
              <div className={`${styles.card} ${styles.cardScholar}`}>
                <div className={styles.cardTopRow}>
                  <h2 className={styles.planName}>Scholar</h2>
                  <div className={styles.billingToggle}>
                    <button
                      className={`${styles.billingToggleBtn} ${!isYearly ? styles.billingToggleBtnActive : ""}`}
                      onClick={() => setIsYearly(false)}
                    >
                      Monthly
                    </button>
                    <button
                      className={`${styles.billingToggleBtn} ${isYearly ? styles.billingToggleBtnActive : ""}`}
                      onClick={() => setIsYearly(true)}
                    >
                      Yearly
                      <span className={styles.savingsInlineBadge}>17% off</span>
                    </button>
                  </div>
                </div>

                <div className={styles.priceRow}>
                  <span className={styles.planPrice}>{isYearly ? yearlyPrice : monthlyPrice}</span>
                </div>
                <p className={styles.billingText}>
                  {isYearly ? "Billed yearly · 7-day trial" : "Billed monthly · 7-day trial"}
                </p>

                <p className={styles.plusLabel}>Everything from Curious, plus:</p>

                <div className={styles.wisdomBlock}>
                  <div className={styles.wisdomHeader}>
                    <Sparkle size={18} className={styles.sparkleIcon} strokeWidth={2} />
                    <span className={styles.wisdomTitle}>Wisdom Spark returns</span>
                  </div>
                  <p className={styles.wisdomDesc}>
                    A small essay after each Daily Review, drawn from your library.
                  </p>
                </div>

                <div className={styles.featureSection}>
                  <h3 className={styles.sectionTitle}>Your Full Library</h3>
                  <ul className={styles.groupedList}>
                    <li className={styles.groupedItem}>
                      <Check size={16} className={styles.checkIconMuted} strokeWidth={2} />
                      <span>Unlimited books from Kindle</span>
                    </li>
                    <li className={styles.groupedItem}>
                      <Check size={16} className={styles.checkIconMuted} strokeWidth={2} />
                      <span>Unlimited sideloaded imports</span>
                    </li>
                  </ul>
                </div>

                <div className={styles.featureSection}>
                  <h3 className={styles.sectionTitle}>Your Thinking Partner</h3>
                  <ul className={styles.groupedList}>
                    <li className={styles.groupedItem}>
                      <Check size={16} className={styles.checkIconMuted} strokeWidth={2} />
                      <span>Unlimited Smart Dictionary</span>
                    </li>
                    <li className={styles.groupedItem}>
                      <Check size={16} className={styles.checkIconMuted} strokeWidth={2} />
                      <span>50 Unpack calls each month</span>
                    </li>
                    <li className={styles.groupedItem}>
                      <Check size={16} className={styles.checkIconMuted} strokeWidth={2} />
                      <span>5 Synthesis reports each month</span>
                    </li>
                  </ul>
                </div>

                <div className={styles.featureSection}>
                  <h3 className={styles.sectionTitle}>Take It With You</h3>
                  <ul className={styles.groupedList}>
                    <li className={styles.groupedItem}>
                      <Check size={16} className={styles.checkIconMuted} strokeWidth={2} />
                      <span>Export as PDF, Markdown, or plain text</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}