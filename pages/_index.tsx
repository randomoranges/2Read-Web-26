import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Sun, Moon, BookOpen, FileUp, BookText, Sparkles, FileText, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/Button";
import { useThemeMode } from "../helpers/themeMode";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "../components/Carousel";
import styles from "./_index.module.css";

const showcaseTabs = [
  {
    id: "highlights",
    label: "Highlights",
    caption: "Your highlights, organized by book.",
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
    caption: "AI-powered summaries in one tap.",
    imgLight: "/images/summaries.png",
    imgDark: "/images/summaries.png",
  },
  {
    id: "streaks",
    label: "Streaks",
    caption: "Build your reading streak.",
    imgLight: "/images/streaks-light.png",
    imgDark: "/images/streaks-dark.png",
  },
  {
    id: "more",
    label: "And more...",
    caption: "Download the app to explore everything.",
    imgLight: "",
    imgDark: "",
    customContent: true,
  },
];

export default function LandingPage() {
  const [syncToggle, setSyncToggle] = useState<"kindle" | "sideloaded">("kindle");
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  const { resolvedMode, switchToLightMode, switchToDarkMode } = useThemeMode();

  const [showPlayStoreQR, setShowPlayStoreQR] = useState(false);
  const [showAppStoreQR, setShowAppStoreQR] = useState(false);

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
              2Read captures your Kindle highlights — even from sideloaded books — and turns them into beautiful, swipeable cards you'll actually revisit. Built-in AI helps you understand and remember more.
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
                      Connect your Kindle account once. 2Read pulls in every highlight from every book you've read on Kindle — automatically.
                    </p>
                                        <p className={styles.paragraph}>
                      Your entire reading history, organized by book, ready to review.
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
          </div>
        </section>

        {/* COME BACK EVERY DAY SECTION */}
        <section className={styles.section} aria-label="Showcase">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Designed to make you come back every day.</h2>
            <p className={styles.sectionSubtitle}>
              Your highlights aren't a spreadsheet export. They're ideas worth revisiting.
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
            <h2 className={styles.sectionTitle}>Your personal reading tutor.</h2>
            <p className={styles.sectionSubtitle}>
              Every highlight becomes a learning opportunity. 2Read's AI doesn't just store your highlights — it helps you understand them deeply.
            </p>

            <div className={styles.tutorGrid}>
              <div className={styles.tutorCard}>
                <div className={styles.iconContainer} style={{ backgroundColor: '#fce8e4', color: '#d4735a', borderColor: '#f8d9d3' }}>
                  <BookText size={22} />
                </div>
                <h4 className={styles.tutorCardTitle}>Smart Dictionary</h4>
                <p className={styles.tutorCardDesc}>Tap any word for instant, context-aware definitions.</p>
              </div>

              <div className={styles.tutorCard}>
                <div className={styles.iconContainer} style={{ backgroundColor: '#e4eaf8', color: '#5b7ec2', borderColor: '#d3dcf2' }}>
                  <Sparkles size={22} />
                </div>
                <h4 className={styles.tutorCardTitle}>AI Insight</h4>
                <p className={styles.tutorCardDesc}>Get deeper explanations of complex passages.</p>
              </div>

              <div className={styles.tutorCard}>
                <div className={styles.iconContainer} style={{ backgroundColor: '#dff3ed', color: '#4aad8b', borderColor: '#c8e8df' }}>
                  <FileText size={22} />
                </div>
                <h4 className={styles.tutorCardTitle}>AI Summary</h4>
                <p className={styles.tutorCardDesc}>Generate a summary of all highlights from any book.</p>
              </div>

              <div className={styles.tutorCard}>
                <div className={styles.iconContainer} style={{ backgroundColor: '#ede4f5', color: '#8b6aaf', borderColor: '#e1d2ef' }}>
                  <Star size={22} />
                </div>
                <h4 className={styles.tutorCardTitle}>Daily Wisdom Spark</h4>
                <p className={styles.tutorCardDesc}>Review 15 highlights and unlock a deeper AI insight.</p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className={`${styles.section} ${styles.testimonialSection}`} aria-label="Testimonials">
          <div className={styles.container}>
            <Carousel setApi={setCarouselApi} className={styles.testimonialCarousel}>
              <CarouselContent>
                <CarouselItem>
                  <div className={styles.testimonialSlide}>
                    <div className={styles.bigQuoteMark}>“</div>
                    <p className={styles.quoteText}>
                      "I built 2Read because I had 400+ highlights across 30 books and never looked at any of them. I wanted something that made revisiting highlights feel as good as reading the book in the first place."
                    </p>
                    <div className={styles.quoteAuthor}>
                      <span className={styles.authorLine} />
                      <span className={styles.authorName}>The maker of 2Read</span>
                      <span className={styles.authorLine} />
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className={styles.testimonialSlide}>
                    <div className={styles.bigQuoteMark}>“</div>
                    <p className={styles.quoteText}>
                      "Finally, an app that makes my reading obsession actually useful. The AI features are incredibly well thought out and the design is top notch."
                    </p>
                    <div className={styles.quoteAuthor}>
                      <span className={styles.authorLine} />
                      <span className={styles.authorName}>Sarah J., Early Adopter</span>
                      <span className={styles.authorLine} />
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className={styles.testimonialSlide}>
                    <div className={styles.bigQuoteMark}>“</div>
                    <p className={styles.quoteText}>
                      "I used to export my highlights to Notion and forget about them. Now I review them every morning over coffee. It's totally changed how I retain information."
                    </p>
                    <div className={styles.quoteAuthor}>
                      <span className={styles.authorLine} />
                      <span className={styles.authorName}>Mark T., Product Manager</span>
                      <span className={styles.authorLine} />
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className={styles.testimonialSlide}>
                    <div className={styles.bigQuoteMark}>“</div>
                    <p className={styles.quoteText}>
                      "Love this! Always thought about a better way to review Kindle highlights, and this looks promising, will give it a try!"
                    </p>
                    <div className={styles.quoteAuthor}>
                      <span className={styles.authorLine} />
                      <span className={styles.authorName}>Josh Mead</span>
                      <span className={styles.authorLine} />
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className={styles.testimonialSlide}>
                    <div className={styles.bigQuoteMark}>“</div>
                    <p className={styles.quoteText}>
                      "So excited to try your product!"
                    </p>
                    <div className={styles.quoteAuthor}>
                      <span className={styles.authorLine} />
                      <span className={styles.authorName}>Ursula Rosien</span>
                      <span className={styles.authorLine} />
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className={styles.testimonialSlide}>
                    <div className={styles.bigQuoteMark}>“</div>
                    <p className={styles.quoteText}>
                      "2Read sounds like a fantastic tool for anyone looking to get more out of their Kindle reading! Syncing highlights, reflecting daily, and exploring insights are such great features for deeper engagement."
                    </p>
                    <div className={styles.quoteAuthor}>
                      <span className={styles.authorLine} />
                      <span className={styles.authorName}>Soundarya S</span>
                      <span className={styles.authorLine} />
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className={styles.testimonialSlide}>
                    <div className={styles.bigQuoteMark}>“</div>
                    <p className={styles.quoteText}>
                      "Love the idea."
                    </p>
                    <div className={styles.quoteAuthor}>
                      <span className={styles.authorLine} />
                      <span className={styles.authorName}>Ignacio</span>
                      <span className={styles.authorLine} />
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className={styles.testimonialSlide}>
                    <div className={styles.bigQuoteMark}>“</div>
                    <p className={styles.quoteText}>
                      "I really like the idea and design."
                    </p>
                    <div className={styles.quoteAuthor}>
                      <span className={styles.authorLine} />
                      <span className={styles.authorName}>Berkant Bostan</span>
                      <span className={styles.authorLine} />
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className={styles.testimonialSlide}>
                    <div className={styles.bigQuoteMark}>“</div>
                    <p className={styles.quoteText}>
                      "I love how this app makes my Kindle highlights actually useful. It's a game changer."
                    </p>
                    <div className={styles.quoteAuthor}>
                      <span className={styles.authorLine} />
                      <span className={styles.authorName}>Alex M</span>
                      <span className={styles.authorLine} />
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
            
            <div className={styles.carouselControls}>
              <Button 
                variant="outline" 
                size="icon" 
                className={styles.navBtn}
                onClick={() => carouselApi?.scrollPrev()}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className={styles.navBtn}
                onClick={() => carouselApi?.scrollNext()}
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section id="cta-section" className={styles.ctaSection} aria-label="Download">
          <div className={styles.ctaCurvedTop}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Your highlights are waiting.</h2>
              <p className={styles.ctaSubtitle}>Free to download. No credit card required.</p>
              
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
                Works with the free Kindle app · No Kindle device required
                <br />
                Works with your own PDFs and documents too
              </p>
              <Link to="/for-you" className={styles.footerCtaLink}>
                Show me how this works for me →
              </Link>
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
              <p>Created by <a href="#" className={styles.creatorLink}>1truejishnu</a></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}