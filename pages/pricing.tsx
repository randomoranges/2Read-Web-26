import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Sun, Moon, Check } from "lucide-react";
import { Button } from "../components/Button";
import { useThemeMode } from "../helpers/themeMode";
import styles from "./pricing.module.css";

export default function PricingPage() {
  const { resolvedMode, switchToLightMode, switchToDarkMode } = useThemeMode();
  const [isYearly, setIsYearly] = useState(true);
  const [isIndia, setIsIndia] = useState(false);

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
              <h1 className={styles.pageTitle}>Upgrade your reading</h1>
              <p className={styles.pageSubtitle}>Start free, upgrade when you're ready.</p>
            </div>

            <div className={styles.cardsContainer}>
              {/* CURIOUS PLAN (FREE) */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.planName}>Curious</h2>
                  <div className={styles.priceContainer}>
                    <span className={styles.planPrice}>Free <span className={styles.priceSuffix}>· forever</span></span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <p className={styles.listLabel}>Included:</p>
                  <ul className={styles.featureList}>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.checkIcon} />
                      <span>Kindle Sync (3 books)</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.checkIcon} />
                      <span>Sideloaded Import (3 books)</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.checkIcon} />
                      <span>My Books library</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.checkIcon} />
                      <span>Daily Review</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.checkIcon} />
                      <span>Book Shots</span>
                    </li>
                  </ul>

                  <p className={styles.listLabel}>Try AI features:</p>
                  <ul className={styles.featureList}>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.checkIcon} />
                      <span>Smart Dictionary (limited)</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.checkIcon} />
                      <span>AI Insight (limited)</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.checkIcon} />
                      <span>AI Summary (limited)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* SCHOLAR PLAN (PAID) */}
              <div className={`${styles.card} ${styles.cardFeatured}`}>
                <div className={styles.badgeWrapper}>
                  <span className={styles.badge}>
                    {isIndia ? "Save 35% Annually" : "Save 17% Annually"}
                  </span>
                </div>
                
                <div className={styles.cardHeader}>
                  <h2 className={styles.planName}>Scholar</h2>
                  
                  <div className={styles.toggleContainer}>
                    <div className={styles.toggleSwitch}>
                      <button
                        className={`${styles.toggleBtn} ${!isYearly ? styles.toggleBtnActive : ""}`}
                        onClick={() => setIsYearly(false)}
                      >
                        Monthly
                      </button>
                      <button
                        className={`${styles.toggleBtn} ${isYearly ? styles.toggleBtnActive : ""}`}
                        onClick={() => setIsYearly(true)}
                      >
                        Yearly
                      </button>
                    </div>
                  </div>

                  <div className={styles.priceContainer}>
                    <span className={styles.planPrice}>
                      {isYearly 
                        ? (isIndia ? "₹1,199" : "$39.99") 
                        : (isIndia ? "₹149" : "$3.99")}
                    </span>
                    <span className={styles.billingText}>
                      {isYearly ? "Billed yearly · 7-day trial" : "Billed monthly · 7-day trial"}
                    </span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <p className={styles.listLabel}>Everything in Curious, plus:</p>
                  <ul className={styles.featureList}>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.checkIcon} />
                      <span>Unlimited books</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.checkIcon} />
                      <span>Sideloaded Import (unlimited)</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.checkIcon} />
                      <span>Unlimited Smart Dictionary</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.checkIcon} />
                      <span>Unlimited AI Insight</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.checkIcon} />
                      <span>AI Summary (12/month)</span>
                    </li>
                    <li className={styles.featureItem}>
                      <Check size={18} className={styles.checkIcon} />
                      <span>Export (PDF, MD, TXT)</span>
                    </li>
                  </ul>

                  <p className={styles.subText}>
                    Includes a 7-day free trial
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DOWNLOAD SECTION */}
        <section id="download" className={styles.downloadSection} aria-label="Download App">
          <div className={styles.container}>
            <div className={styles.downloadContent}>
              <h2 className={styles.downloadTitle}>Get 2Read</h2>
              
              <div className={styles.storeButtonsRow}>
                <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className={styles.storeBadgeLink}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className={styles.storeBadgeImg} />
                </a>
                
                <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className={styles.storeBadgeLink}>
                  <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83" alt="Download on the App Store" className={styles.storeBadgeImg} />
                </a>
              </div>

              <p className={styles.bottomNote}>
                Works with the free Kindle app · No Kindle device required
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER (Replicated from Landing Page) */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerLogo}>
            <img 
              src="/images/logo.png" 
              alt="2Read app logo" 
              className={styles.logoImage} 
            />
            <span className={styles.logoText}>2Read.</span>
          </div>

          <div className={styles.footerGrid}>
            <div className={styles.footerCol}>
              <Link to="/about" className={styles.footerLink}>About</Link>
              <Link to="/pricing" className={styles.footerLink}>Pricing</Link>
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
              <a href="#" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Producthunt</a>
            </div>
            <div className={styles.footerCol}>
              <Link to="/privacy" className={styles.footerLink}>Privacy</Link>
              <Link to="/terms" className={styles.footerLink}>Terms</Link>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>© 2026 2Read. Built for readers who mean it.</p>
            <div className={styles.creatorInfo}>
              <img src="/images/creator-avatar.png" alt="Creator Jishnu's avatar" className={styles.creatorLogo} />
              <p>Created by <a href="#" className={styles.creatorLink}>1truejishnu</a></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}