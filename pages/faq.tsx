import { useState, useCallback, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styles from "./faq.module.css";

// ── Types ──

interface TechnicalAnswer {
  simple: React.ReactNode;
  technical: React.ReactNode;
}

interface FAQItem {
  question: string;
  answer: React.ReactNode | TechnicalAnswer;
}

interface FAQCategory {
  id: string;
  title: string;
  intro?: React.ReactNode;
  items: FAQItem[];
}

// ── Helper: detect simple+technical answer ──

function isTechnical(answer: React.ReactNode | TechnicalAnswer): answer is TechnicalAnswer {
  return typeof answer === "object" && answer !== null && "simple" in answer && "technical" in answer;
}

// ── Accordion Item ──

function AccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);
  const [showTechnical, setShowTechnical] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [open, showTechnical]);

  return (
    <div className={styles.accordionItem}>
      <button
        className={styles.accordionTrigger}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{item.question}</span>
        <svg
          className={`${styles.accordionChevron} ${open ? styles.accordionChevronOpen : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        className={`${styles.accordionContent} ${open ? styles.accordionContentOpen : ""}`}
        style={{ maxHeight: open ? height + 40 : 0 }}
      >
        <div ref={contentRef} className={styles.accordionBody}>
          {isTechnical(item.answer) ? (
            <>
              {item.answer.simple}
              <button
                className={styles.technicalToggle}
                onClick={() => setShowTechnical(!showTechnical)}
              >
                {showTechnical ? "Hide" : "Show"} technical details
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points={showTechnical ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
                </svg>
              </button>
              {showTechnical && (
                <div className={styles.technicalContent}>
                  <div className={styles.technicalLabel}>Technical Details</div>
                  {item.answer.technical}
                </div>
              )}
            </>
          ) : (
            item.answer
          )}
        </div>
      </div>
    </div>
  );
}

// ── FAQ Data ──

const FAQ_DATA: FAQCategory[] = [
  {
    id: "kindle-sync",
    title: "Kindle Sync & Security",
    intro: (
      <p>
        When you tap "Sync Kindle," we open Amazon's official login page inside the app using a built-in secure browser. You log in directly with Amazon — 2Read just waits in the background. Once Amazon confirms your login, we read your highlights from Kindle Cloud Reader. Your highlighted text, book titles, and author names are collected, saved to your phone, and stored securely in your 2Read account. Future syncs happen instantly because Amazon remembers your device through a session cookie — the same way Amazon keeps you logged in on any browser.
      </p>
    ),
    items: [
      {
        question: "Does 2Read store my Amazon email and password?",
        answer: {
          simple: <p>No. When you log in, you're typing directly into Amazon's website. 2Read is waiting in the background. We never see what you type, and your password is never stored anywhere — not on your phone, not on our servers.</p>,
          technical: <p>The login happens inside a sandboxed WebView — a secure browser component embedded in the app using React Native's built-in browser library. When you enter your credentials, the form submission is sent directly from the WebView to Amazon's authentication servers (www.amazon.com) over HTTPS (TLS-encrypted connection). The app's native code runs in a separate process and has no access to the WebView's DOM, form fields, or network requests. This is an architectural limitation of the WebView sandbox — not a policy choice. The technology itself prevents credential interception. After successful authentication, Amazon returns a session cookie to the WebView. Only this cookie is stored locally — never your email or password.</p>,
        },
      },
      {
        question: "Why does 2Read open Amazon's login inside the app instead of my regular browser?",
        answer: {
          simple: <p>Convenience. If we opened your default browser, you'd have to switch between apps, log in there, wait for the sync signal, and switch back. Opening it inside the app keeps the entire process in one place — tap sync, log in, done. That's the only reason.</p>,
          technical: <p>We use React Native's built-in WebView library to render Amazon's login page within the app. This is the same rendering engine your default browser uses — it's not a custom-built login form or a recreated Amazon page. The WebView loads the actual amazon.com URL, which you can verify in the URL bar. The alternative would be launching an external browser via a deep link, which introduces multiple app switches, potential redirect failures, and a significantly worse user experience — especially on older Android devices where app switching can be slow or unreliable. The WebView approach is the industry standard for third-party authentication flows where OAuth is not available.</p>,
        },
      },
      {
        question: "What happens if I don't log in?",
        answer: {
          simple: <p>If you don't log in within 2 minutes, the browser closes automatically and nothing happens. No sync, no data collection, nothing. The app goes back to where you were.</p>,
          technical: <p>When the WebView opens, a 2-minute timeout timer starts. The app monitors the WebView's URL to detect whether Amazon's post-login redirect has occurred. If no successful authentication is detected within 120 seconds, the WebView is programmatically closed, the session is discarded, and no data is read or stored. The timeout exists as a safeguard — if the page fails to load, the user gets distracted, or they decide not to proceed, the process terminates cleanly without any residual state.</p>,
        },
      },
      {
        question: "What exactly does 2Read access from my Amazon account?",
        answer: {
          simple: <p>Only your highlights. The same highlights you can see yourself at read.amazon.com/notebook. We read the highlighted text, the book title, and the author name. That's it. We don't touch your purchase history, payment methods, personal information, Kindle library, or anything else.</p>,
          technical: <p>After successful authentication, the WebView navigates to read.amazon.com/notebook — Amazon's official highlights page available to any authenticated user. The app parses the HTML content of this single page to extract: highlighted passage text, book title, author name, and highlight location metadata. No other Amazon URL is accessed. The app does not navigate to, request, or parse any page related to order history, account settings, payment instruments, Kindle content library, wish lists, or any other Amazon service. The scope of data access is limited strictly to the notebook page. You can verify this by visiting read.amazon.com/notebook in any browser — the highlights you see there are exactly what 2Read reads.</p>,
        },
      },
      {
        question: "Where are my highlights stored after sync?",
        answer: {
          simple: <p>Your highlights are saved in two places — on your phone locally and in your 2Read account database. This means you can access them anytime, and they stay safe even if you switch phones. No Amazon credentials are stored in either location. Only your highlights.</p>,
          technical: <p>After extraction from the notebook page, highlights are written to local storage on the device (using React Native's AsyncStorage or equivalent) for offline access and fast loading. They are also transmitted over HTTPS to 2Read's backend database, where they are stored against your 2Read account (authenticated via Google sign-in, completely separate from Amazon). The database stores: highlight text, book title, author name, location metadata, and your 2Read user ID. It does not store any Amazon credentials, session cookies, account identifiers, or authentication tokens. The Amazon session cookie remains exclusively in the WebView's sandboxed cookie storage on your device and is never transmitted to 2Read's servers.</p>,
        },
      },
      {
        question: 'How does "stay logged in" work on future syncs?',
        answer: {
          simple: <p>After your first login, Amazon remembers your device through a session cookie — exactly like when you stay logged into Amazon in Chrome or Safari. This is not your password. It's a temporary pass that Amazon created and Amazon controls. On future syncs, Amazon sees this pass and lets you through without typing your password again. If you change your Amazon password or sign out of all devices in your Amazon settings, this pass gets revoked and you'll need to log in again.</p>,
          technical: <p>Upon successful authentication, Amazon issues a session cookie that is stored in the WebView's sandboxed cookie jar on the device. This cookie contains an encrypted session token — not the user's credentials. On subsequent sync requests, the WebView loads with the existing cookie jar, and Amazon's servers validate the session token. If valid, the user is automatically authenticated without re-entering credentials. This cookie has an expiration policy controlled entirely by Amazon. It can be invalidated by: changing the Amazon account password, using Amazon's "Sign out of all devices" feature, clearing 2Read's app data, or reinstalling the app. 2Read has no ability to extend, modify, or transfer this cookie.</p>,
        },
      },
      {
        question: "Why is this process secure?",
        answer: {
          simple: <p>Because 2Read physically cannot see your password. The browser we open is a sealed box — your keystrokes go straight to Amazon, encrypted, and our app code sits outside that box with no way in. This isn't a security promise we're making. It's how the technology works. Even if we tried to read your password, the system wouldn't let us. On top of that, everything between you and Amazon is encrypted, your password is never stored anywhere, and the only data we keep is your highlights.</p>,
          technical: (
            <>
              <p>Security is enforced at multiple layers, none of which depend on 2Read's good intentions — they are architectural constraints:</p>
              <p><strong>Browser sandbox isolation.</strong> The WebView runs in a separate process from the app's native code. The native layer cannot inject JavaScript into the WebView to read form fields, attach event listeners to capture keystrokes, or intercept network requests. This isolation is enforced by the operating system (Android's process isolation and iOS's WKWebView security model), not by 2Read.</p>
              <p><strong>Transport encryption.</strong> All communication between the WebView and Amazon's servers uses HTTPS with TLS encryption. The data in transit — including your credentials — is encrypted end-to-end between the WebView and Amazon. 2Read cannot perform a man-in-the-middle attack on this connection because the WebView validates Amazon's SSL certificate directly.</p>
              <p><strong>No credential persistence.</strong> Amazon credentials are processed entirely within the WebView's memory during the login flow. They are not written to disk, not logged, not cached by the app, and not transmitted to any 2Read server. After authentication, the only artifact is the session cookie — which contains a session token, not credentials.</p>
              <p><strong>Timeout safeguard.</strong> The 2-minute automatic timeout ensures the WebView session cannot remain open indefinitely. If authentication doesn't complete, the session is destroyed cleanly.</p>
              <p><strong>No server-side credential handling.</strong> 2Read's backend never receives, processes, or stores any Amazon authentication data. The entire login flow happens locally on your device. Our servers only receive the extracted highlights after sync is complete — never any authentication material.</p>
              <p>For maximum security, we recommend enabling two-factor authentication (2FA) on your Amazon account. With 2FA, logging in requires a one-time code sent to your phone in addition to your password. 2FA works seamlessly inside 2Read's browser — you'll see Amazon's normal OTP prompt during login.</p>
            </>
          ),
        },
      },
      {
        question: "Which Amazon account should I use?",
        answer: <p>Log in with the same Amazon account linked to your Kindle app or Kindle device. This may be different from the account you use for Amazon shopping. If you see zero books after syncing, you likely logged in with a different account than the one connected to your Kindle.</p>,
      },
      {
        question: "Can I sync from Amazon.in, Amazon.com, and other regional stores?",
        answer: <p>Yes. The login page will direct you to the correct regional Amazon store based on your account. Your highlights are synced from whichever store your Kindle account is linked to.</p>,
      },
      {
        question: "How long does syncing take?",
        answer: <p>About 3–4 seconds per book. A library of 10 books takes roughly 30–40 seconds. A library of 30 books takes about 2 minutes. You need to keep the app open during sync — it runs locally on your phone and will stop if you close or minimize the app. This is a one-time setup. Future syncs are much faster.</p>,
      },
      {
        question: "What if I add new highlights after syncing?",
        answer: <p>You can re-sync anytime. 2Read will pull in any new highlights you've made since the last sync and update your existing books.</p>,
      },
    ],
  },
  {
    id: "sideloaded",
    title: "Sideloaded Documents",
    items: [
      {
        question: "What are sideloaded documents?",
        answer: <p>Any file you've sent to your Kindle app yourself — PDFs, ePubs, textbooks, research papers, study material, or personal documents. These are books and files you didn't buy from the Amazon Kindle Store.</p>,
      },
      {
        question: "Why aren't sideloaded highlights included in Kindle sync?",
        answer: <p>Amazon treats sideloaded content as "Personal Documents." Highlights from these documents don't sync to Kindle Cloud Reader, which is where 2Read reads during sync. This is an Amazon limitation, not a 2Read limitation.</p>,
      },
      {
        question: "How do I import sideloaded highlights?",
        answer: (
          <>
            <p>Through the Kindle app's share feature in 4 taps:</p>
            <ol>
              <li>Open the sideloaded book in your Kindle app</li>
              <li>Tap the three dots (⋯) menu</li>
              <li>Tap Annotations, then tap Share</li>
              <li>Select 2Read</li>
            </ol>
            <p>Your highlights appear in 2Read instantly. This works with any book, PDF, or document you've sideloaded to the Kindle app.</p>
          </>
        ),
      },
      {
        question: "Do sideloaded highlights get the same AI features?",
        answer: <p>Yes. Smart Dictionary, AI Insight, AI Summary, and Daily Review all work exactly the same for sideloaded highlights as they do for Kindle-synced highlights. There's no difference once the highlights are in 2Read.</p>,
      },
      {
        question: "This is the feature other highlight tools can't do.",
        answer: <p>Tools like Readwise and Glasp can only access highlights from books purchased through the Amazon Kindle Store. 2Read captures highlights from everything — including your sideloaded material.</p>,
      },
    ],
  },
  {
    id: "ai-features",
    title: "AI Features",
    items: [
      {
        question: "What AI features does 2Read have?",
        answer: (
          <>
            <p>Three AI features built into every highlight:</p>
            <p><strong>Smart Dictionary</strong> — Select any word or phrase on a highlight card, tap Smart Dictionary, and get an instant context-aware definition. Not just a generic dictionary lookup — it explains what the word means in the specific context of what you're reading.</p>
            <p><strong>AI Insight</strong> — Tap the ✦ button below any highlight for a deeper explanation. The AI detects what kind of help you need — simplifying complex language, providing historical or factual context, or exploring deeper implications — and adapts automatically.</p>
            <p><strong>AI Summary</strong> — Generate a full summary of all your highlights from any book. The AI identifies the key ideas across your highlights and organizes them into a coherent narrative of what YOU found important.</p>
          </>
        ),
      },
      {
        question: "How is AI Insight different from copying a highlight into ChatGPT?",
        answer: <p>The quality of the response, the speed, and the permanence. 2Read's AI prompts are specifically engineered for book highlights — they detect whether a passage needs simplification, context, or deeper analysis. The response appears in 2 taps without switching apps, typing a prompt, or waiting. And every AI response is saved alongside your highlight permanently — organized by book, searchable, always accessible. ChatGPT conversations are disposable. 2Read's insights become part of your reading library.</p>,
      },
      {
        question: "Do AI features work offline?",
        answer: <p>No. Smart Dictionary, AI Insight, and AI Summary require an internet connection to generate responses. However, once a response has been generated, it is saved locally and can be viewed offline anytime.</p>,
      },
      {
        question: "Can I regenerate an AI response?",
        answer: <p>Yes. If you're not satisfied with a response, you can regenerate it. This will use one credit from your plan.</p>,
      },
      {
        question: "Do unused AI credits expire?",
        answer: <p>Yes. Unused AI credits expire at the end of each billing month. Scholar plan credits (80 AI Insight and 7 AI Summary) reset monthly and do not roll over. Use them or lose them.</p>,
      },
      {
        question: "What is Wisdom Spark?",
        answer: <p>A daily reward you earn by completing your Daily Review. After reviewing 15 highlights, you unlock a Wisdom Spark — a surprising insight that connects one of your highlights to unexpected ideas from other fields, thinkers, or historical parallels. It's designed to make you see your own highlights differently. Completing a Wisdom Spark also earns you 1 AI Insight credit.</p>,
      },
    ],
  },
  {
    id: "plans-pricing",
    title: "Plans & Pricing",
    items: [
      {
        question: "What plans are available?",
        answer: (
          <>
            <p><strong>Curious (Free)</strong> — Everything you need to start. Kindle sync and sideloaded import for up to 3 books. My Books library, Daily Review, Book Shots. Smart Dictionary, AI Insight, and AI Summary with daily limits. Earn 1 AI credit daily through Wisdom Spark.</p>
            <p><strong>Scholar ($3.99/month or $39.99/year)</strong> — Everything in Curious, plus unlimited books, unlimited Smart Dictionary, 80 AI Insight, 7 AI Summaries per month, bonus Wisdom Spark credit daily, and export to PDF, Markdown, and TXT.</p>
          </>
        ),
      },
      {
        question: "Is there a free trial?",
        answer: <p>Yes. Scholar monthly includes a 7-day free trial. You can cancel anytime during the trial without being charged.</p>,
      },
      {
        question: "What are AI credits?",
        answer: <p>Credits are how AI Insight and AI Summary usage is tracked on the Scholar plan. You receive 80 AI Insight credits and 7 AI Summary credits each month. Unused credits expire at the end of each billing month.</p>,
      },
      {
        question: "How do free users access AI features?",
        answer: <p>Free users have limits — Smart Dictionary (2), AI Insight (2), and AI Summary (1). Additionally, completing the Daily Review earns 1 AI Insight credit through Wisdom Spark.</p>,
      },
      {
        question: "What happens if I downgrade from Scholar to Curious?",
        answer: <p>You keep access to all your synced highlights and saved AI responses. Your library doesn't disappear. But you'll be limited to 3 books for future syncing, AI limits apply, and export is disabled. Any accumulated credits are forfeited upon downgrade.</p>,
      },
      {
        question: "Can I get a refund?",
        answer: (
          <p>
            Refunds are handled through the App Store or Google Play Store, depending on where you subscribed. Follow their standard refund process. If you have issues, contact us at{" "}
            <a href="mailto:randomoranges.apps@gmail.com">randomoranges.apps@gmail.com</a> and we'll help.
          </p>
        ),
      },
    ],
  },
  {
    id: "daily-review",
    title: "Daily Review",
    items: [
      {
        question: "How does Daily Review work?",
        answer: <p>Each day, 2Read selects 15 highlights from across your library for you to review. You swipe through them one at a time — reading and reflecting. It takes about 3 minutes. After completing all 15, you unlock your Wisdom Spark.</p>,
      },
      {
        question: "How are the 15 highlights selected?",
        answer: <p>They're selected from across your entire library — different books, different topics. The selection prioritizes highlights you haven't reviewed recently.</p>,
      },
      {
        question: "What happens if I miss a day?",
        answer: <p>Nothing bad. Your streak resets, but your highlights and credits are unaffected. There's no penalty for missing a day — just pick up again tomorrow.</p>,
      },
      {
        question: "Can I change the number of highlights in Daily Review?",
        answer: <p>Not currently. The 15-highlight format is designed to be completable in about 3 minutes — long enough to be meaningful, short enough to fit into any morning routine.</p>,
      },
    ],
  },
  {
    id: "my-books-bookshots",
    title: "My Books & Book Shots",
    items: [
      {
        question: "What is My Books?",
        answer: <p>A personal reading tracker inside 2Read. Set a yearly reading goal, organize books into three shelves — Already Read, Currently Reading, and Want to Read — and track your progress. Search for any book by title to add it to your shelves.</p>,
      },
      {
        question: "Is My Books connected to my Kindle library?",
        answer: <p>My Books is a separate manual tracker. Books you sync from Kindle appear in your Highlights library. My Books is where you track your broader reading life — including physical books, audiobooks, and books you plan to read.</p>,
      },
      {
        question: "What are Book Shots?",
        answer: (
          <p>
            In-depth summaries of popular non-fiction books, written and curated within 2Read. Think of them as detailed overviews that give you the key ideas from a book in one sitting. Available to all users on both Curious and Scholar plans.{" "}
            <Link to="/bookshots">Explore BookShots →</Link>
          </p>
        ),
      },
    ],
  },
  {
    id: "privacy-data",
    title: "Privacy & Data",
    items: [
      {
        question: "What data does 2Read collect?",
        answer: <p>Your 2Read account information (name, email via Google sign-in), your synced highlights (text, book title, author, location metadata), your AI responses, your My Books library, and your app usage data (features used, review completion). We do not collect your Amazon credentials, payment information, or any personal data beyond what's needed to run the app.</p>,
      },
      {
        question: "Where is my data stored?",
        answer: <p>Your highlights and account data are stored on your device locally and on 2Read's secure servers. This allows you to access your library across devices and ensures your data is safe if you lose your phone.</p>,
      },
      {
        question: "Can I export my data?",
        answer: <p>Yes. Scholar users can export highlights to PDF, Markdown, and TXT formats. This includes your highlights organized by book.</p>,
      },
      {
        question: "Can I delete my account?",
        answer: <p>Yes. You can request account deletion from the app settings. This permanently removes your account, all synced highlights, saved AI responses, My Books data, and any associated information from our servers. This action cannot be undone.</p>,
      },
      {
        question: "Does 2Read share my data with third parties?",
        answer: <p>No. Your highlights, AI responses, reading data, and personal information are never sold, shared, or provided to any third party. AI features use third-party AI models (Google Gemini and Anthropic Claude) to generate responses — your highlight text is sent to these services for processing but is not stored by them beyond the request.</p>,
      },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    items: [
      {
        question: "My highlights are missing after sync.",
        answer: <p>Check that you logged in with the correct Amazon account — the one linked to your Kindle app or device, not your shopping account. You can verify by visiting read.amazon.com/notebook in your browser. The highlights shown there are exactly what 2Read syncs.</p>,
      },
      {
        question: "The app crashed during sync.",
        answer: <p>Reopen the app and try syncing again. Sync will restart from the beginning. Make sure you have a stable internet connection and keep the app open throughout the process.</p>,
      },
      {
        question: "AI features aren't working.",
        answer: <p>AI features require an internet connection. Check your connection and try again. If you're on the free plan, you may have reached your daily limit — limits reset at midnight.</p>,
      },
      {
        question: "I can't find my sideloaded book highlights.",
        answer: (
          <p>
            Sideloaded documents are not included in Kindle sync. You need to import them separately using the 4-tap share flow from the Kindle app: open the book → three dots → Annotations → Share → 2Read.
          </p>
        ),
      },
      {
        question: "How do I contact support?",
        answer: (
          <p>
            Email us at{" "}
            <a href="mailto:randomoranges.apps@gmail.com">randomoranges.apps@gmail.com</a>.
            You can also reach us on Twitter at{" "}
            <a href="https://x.com/1truejishnu" target="_blank" rel="noopener noreferrer">@1truejishnu</a>{" "}
            or{" "}
            <a href="https://x.com/2ReadApp" target="_blank" rel="noopener noreferrer">@2ReadApp</a>.
            We typically respond within 24 hours.
          </p>
        ),
      },
    ],
  },
];

// ── Build JSON-LD FAQPage schema for SEO ──

function buildFaqJsonLd() {
  const allItems: { question: string; answer: string }[] = [];
  for (const cat of FAQ_DATA) {
    for (const item of cat.items) {
      let answerText = item.question;
      if (isTechnical(item.answer)) {
        answerText = "simple and technical answer provided";
      }
      allItems.push({ question: item.question, answer: answerText });
    }
  }
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "FAQ — 2Read",
    description: "Frequently asked questions about 2Read — Kindle sync, security, AI features, pricing, and more.",
    url: "https://2read.app/faq",
    mainEntity: allItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ── Page Component ──

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(FAQ_DATA[0].id);

  const handleCategoryClick = useCallback((id: string) => {
    setActiveCategory(id);
    const el = document.getElementById(`faq-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const jsonLd = buildFaqJsonLd();

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>FAQ — 2Read</title>
        <meta
          name="description"
          content="Frequently asked questions about 2Read — Kindle sync, security, AI features, pricing, and more."
        />
        <link rel="canonical" href="https://2read.app/faq" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          ← Back to Home
        </Link>

        <div className={styles.hero}>
          <h1 className={styles.pageTitle}>Frequently Asked Questions</h1>
          <p className={styles.pageSubtitle}>
            Everything you need to know about 2Read — from Kindle sync security to AI features and pricing.
          </p>
        </div>

        {/* Category Nav */}
        <nav className={styles.categoryNav}>
          {FAQ_DATA.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.categoryNavLink} ${activeCategory === cat.id ? styles.categoryNavLinkActive : ""}`}
              onClick={() => handleCategoryClick(cat.id)}
            >
              {cat.title}
            </button>
          ))}
        </nav>

        {/* FAQ Sections */}
        {FAQ_DATA.map((cat) => (
          <section key={cat.id} id={`faq-${cat.id}`} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{cat.title}</h2>
            {cat.intro && <div className={styles.categoryIntro}>{cat.intro}</div>}
            <div className={styles.accordion}>
              {cat.items.map((item, i) => (
                <AccordionItem key={i} item={item} />
              ))}
            </div>
          </section>
        ))}

        {/* Contact */}
        <div className={styles.contactBlock}>
          <p><strong>Still have questions?</strong></p>
          <p>
            Reach out at{" "}
            <a href="mailto:randomoranges.apps@gmail.com">randomoranges.apps@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
