import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, FileText, Smartphone, RefreshCw, CheckCircle2, ChevronRight, BookOpen, Home } from "lucide-react";
import { Button } from "../components/Button";
import { useThemeMode } from "../helpers/themeMode";
import { FlowAnswers, FlowType, q1Options, q2Options, q3Options, determineFlow } from "../helpers/forYouFlowData";
import styles from "./for-you.module.css";

// Assets
const ICONS = {
  tworead: "/images/icon-tworead.png",
  kindle: "/images/icon-kindle.png",
};

// --- Diagram Component ---
interface DiagramNode {
  type: 'image' | 'icon';
  src?: string;
  icon?: React.ReactNode;
  label: string;
  sublabel?: string;
}

const FlowDiagram = ({ nodes }: { nodes: DiagramNode[] }) => {
  return (
    <div className={styles.diagramContainer}>
      {nodes.map((node, idx) => (
        <React.Fragment key={idx}>
          <div className={styles.diagramNode}>
            <div className={styles.nodeIconWrapper}>
              {node.type === 'image' && node.src ? (
                <img src={node.src} alt={node.label} className={styles.nodeImage} />
              ) : (
                <div className={styles.nodeIcon}>{node.icon}</div>
              )}
            </div>
            <div className={styles.nodeLabel}>{node.label}</div>
            {node.sublabel && <div className={styles.nodeSubLabel}>{node.sublabel}</div>}
          </div>
          {idx < nodes.length - 1 && (
            <div className={styles.diagramArrow}>
              <ArrowRight size={24} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// --- Screen Wrapper ---
const ScreenWrapper = ({ children, active }: { children: React.ReactNode; active: boolean }) => (
  <section className={`${styles.screen} ${active ? styles.screenActive : ""}`}>
    <div className={styles.screenContent}>
      {children}
    </div>
  </section>
);

// --- Page Component ---
export default function ForYouFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FlowAnswers>({
    q1: null,
    q2: [],
    q3: null,
  });
  const [flow, setFlow] = useState<FlowType | null>(null);

  // Swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Flow specific lengths mapping to calculate total dots
  const BASE_STEPS = 4; // 0, 1, 2, 3
  const flowLengths = {
    A: 2, // 5A, 6A
    B: 6, // 5B, 6B, 7B, 8B, 9B, 10B
    C: 3, // 5C, 6C, 7C
  };

  const totalSteps = flow ? BASE_STEPS + flowLengths[flow] : BASE_STEPS;

  const handleNext = () => {
    if (step < totalSteps - 1) setStep((s) => s + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleRoute = (finalAnswers: FlowAnswers) => {
    const determinedFlow = determineFlow(finalAnswers);
    setFlow(determinedFlow);
    setStep(BASE_STEPS);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndEvent = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isRightSwipe && step > 0) {
      handlePrev();
    }
    
    if (isLeftSwipe) {
      // Only allow swipe next if step requirements are met
      if (step === 0) handleNext();
      if (step === 1 && answers.q1) handleNext();
      if (step === 2 && answers.q2.length > 0) handleNext();
      // Step 3 (Q3) routing happens on click, swipe not allowed until answered
      if (step >= 4) handleNext(); 
    }
  };

  // --- Screens Definition ---
    const renderScreen = (idx: number) => {
    const isActive = step === idx;

    // SCREEN 0: Welcome
    if (idx === 0) {
      return (
        <ScreenWrapper active={isActive}>
          <h1 className={styles.headline}>Let’s find the best reading setup for you using 2Read and the Kindle app.</h1>
          <p className={styles.bodyText}>
            3 questions. 30 seconds.<br />
            Then a free system built around how you already read.
          </p>
          <Button className={styles.nextButton} onClick={handleNext}>
            Let's go <ArrowRight className="ml-2" size={20} />
          </Button>
        </ScreenWrapper>
      );
    }

    // SCREEN 1: Q1
    if (idx === 1) {
      return (
        <ScreenWrapper active={isActive}>
          <h2 className={styles.headline}>What best describes you?</h2>
          <div className={styles.optionsList}>
            {q1Options.map((opt) => (
              <button
                key={opt.id}
                className={`${styles.optionCard} ${answers.q1 === opt.id ? styles.optionCardSelected : ""}`}
                onClick={() => {
                  setAnswers({ ...answers, q1: opt.id });
                  setTimeout(handleNext, 300);
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </ScreenWrapper>
      );
    }

    // SCREEN 2: Q2
    if (idx === 2) {
      return (
        <ScreenWrapper active={isActive}>
          <h2 className={styles.headline}>How do you usually read?</h2>
          <p className={styles.bodyText} style={{ marginTop: '-1.5rem', marginBottom: '2rem' }}>
            (pick all that apply)
          </p>
          <div className={styles.optionsGrid}>
            {q2Options.map((opt) => {
              const isSelected = answers.q2.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  className={`${styles.optionCard} ${isSelected ? styles.optionCardSelected : ""}`}
                  onClick={() => {
                    const newQ2 = isSelected
                      ? answers.q2.filter((id) => id !== opt.id)
                      : [...answers.q2, opt.id];
                    setAnswers({ ...answers, q2: newQ2 });
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
          <Button 
            className={`${styles.nextButton} ${styles.fixedBottomBtn}`}
            onClick={handleNext}
            disabled={answers.q2.length === 0}
          >
            Next <ArrowRight className="ml-2" size={20} />
          </Button>
        </ScreenWrapper>
      );
    }

    // SCREEN 3: Q3
    if (idx === 3) {
      return (
        <ScreenWrapper active={isActive}>
          <h2 className={styles.headline}>What frustrates you most?</h2>
          <div className={styles.optionsList}>
            {q3Options.map((opt) => (
              <button
                key={opt.id}
                className={`${styles.optionCard} ${answers.q3 === opt.id ? styles.optionCardSelected : ""}`}
                onClick={() => {
                  const newAnswers = { ...answers, q3: opt.id };
                  setAnswers(newAnswers);
                  setTimeout(() => handleRoute(newAnswers), 300);
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </ScreenWrapper>
      );
    }

    // FLOW ROUTING SCREENS (idx >= 4)
    const flowStep = idx - BASE_STEPS; // 0-indexed flow step

    // --- FLOW A Screens ---
    if (flow === 'A') {
      if (flowStep === 0) { // Screen 5A
        return (
          <ScreenWrapper active={isActive}>
            <h2 className={styles.headline}>You're already set up.</h2>
            
            <FlowDiagram nodes={[
              { type: 'image', src: ICONS.kindle, label: 'You read &', sublabel: 'highlight' },
              { type: 'image', src: ICONS.tworead, label: 'Your highlights', sublabel: 'beautifully organized' }
            ]} />

            <p className={styles.bodyText}>
              2Read pulls your Kindle highlights and turns them into swipeable cards you'll actually revisit.
            </p>

                        <Button
              className={`${styles.nextButton} ${styles.fixedBottomBtn}`}
              onClick={() => window.open("https://2read.app", "_blank")}
            >
              Download 2Read — Free
            </Button>
            
            <button className={styles.textLink} onClick={handleNext}>
              Also read PDFs? Show me how →
            </button>
          </ScreenWrapper>
        );
      }
      if (flowStep === 1) { // Screen 6A
        return (
          <ScreenWrapper active={isActive}>
            <h2 className={styles.headline}>Send any file to your Kindle app.</h2>
            
            <FlowDiagram nodes={[
              { type: 'icon', icon: <FileText size={32} />, label: 'Your PDF' },
              { type: 'icon', icon: <RefreshCw size={32} />, label: 'Send to Kindle', sublabel: 'amazon.com/sendtokindle' },
              { type: 'image', src: ICONS.kindle, label: 'Kindle App', sublabel: 'Read & highlight' },
              { type: 'image', src: ICONS.tworead, label: '2Read', sublabel: 'Share in 4 taps' },
            ]} />

            <div className={styles.tipBox}>
              Tip: Convert PDFs to ePub first for better reading on your phone. Free at cloudconvert.com
            </div>

                        <Button
              className={`${styles.nextButton} ${styles.fixedBottomBtn}`}
              onClick={() => window.open("https://2read.app", "_blank")}
            >
              Download 2Read — Free
            </Button>
          </ScreenWrapper>
        );
      }
    }

    // --- FLOW B Screens ---
    if (flow === 'B') {
      if (flowStep === 0) { // Screen 5B
        return (
          <ScreenWrapper active={isActive}>
            <h2 className={styles.headline}>Most students don't know about this reading system.</h2>
            <p className={styles.bodyText}>
              It's completely <span className={styles.accentText}>free</span>.<br/>
              Just your phone and 10 minutes of setup.
            </p>

            <FlowDiagram nodes={[
              { type: 'icon', icon: <FileText size={32} />, label: 'PDF', sublabel: 'Your study material' },
              { type: 'icon', icon: <RefreshCw size={32} />, label: 'Convert', sublabel: 'ePub (free)' },
              { type: 'image', src: ICONS.kindle, label: 'Kindle', sublabel: 'Read & highlight' },
              { type: 'image', src: ICONS.tworead, label: '2Read', sublabel: 'AI review' },
            ]} />

            <Button className={`${styles.nextButton} ${styles.fixedBottomBtn}`} onClick={handleNext}>
              Show me how <ArrowRight className="ml-2" size={20} />
            </Button>
          </ScreenWrapper>
        );
      }
      if (flowStep === 1) { // Screen 6B
        return (
          <ScreenWrapper active={isActive}>
            <h2 className={styles.headline}>Why not just read PDFs?</h2>
            
            <div className={styles.comparisonContainer}>
              <div className={styles.comparisonBox}>
                <div className={styles.comparisonTitle}>PDF 📄</div>
                <ul className={styles.comparisonList}>
                  <li className={styles.comparisonItem}>Tiny text on phone</li>
                  <li className={styles.comparisonItem}>Pinch to zoom constantly</li>
                  <li className={styles.comparisonItem}>Can't change anything</li>
                  <li className={styles.comparisonItem}>Highlights trapped in one app</li>
                </ul>
              </div>
              <div className={styles.comparisonBox}>
                <div className={styles.comparisonTitle}>ePub 📱</div>
                <ul className={styles.comparisonList}>
                  <li className={styles.comparisonItem}>Text adjusts to screen</li>
                  <li className={styles.comparisonItem}>Perfect font size automatically</li>
                  <li className={styles.comparisonItem}>Change font, spacing, background</li>
                  <li className={styles.comparisonItem}>Highlights shareable to 2Read</li>
                </ul>
              </div>
            </div>

            <p className={styles.bodyText}>
              ePub = same content, designed for your phone screen.
            </p>

            <Button className={`${styles.nextButton} ${styles.fixedBottomBtn}`} onClick={handleNext}>
              Next <ArrowRight className="ml-2" size={20} />
            </Button>
          </ScreenWrapper>
        );
      }
      if (flowStep === 2) { // Screen 7B
        return (
          <ScreenWrapper active={isActive}>
            <h2 className={styles.headline}>Step 1: Convert your PDF</h2>
            
            <div className={styles.stepList}>
              <div className={styles.stepItem}><CheckCircle2 className={styles.stepIcon} size={20} /> Open cloudconvert.com</div>
              <div className={styles.stepItem}><CheckCircle2 className={styles.stepIcon} size={20} /> Upload your PDF</div>
              <div className={styles.stepItem}><CheckCircle2 className={styles.stepIcon} size={20} /> Select "ePub"</div>
              <div className={styles.stepItem}><CheckCircle2 className={styles.stepIcon} size={20} /> Download the file</div>
            </div>

            <p className={styles.bodyText} style={{ fontSize: '0.9375rem' }}>
              Other free options:<br/>zamzar.com | online-convert.com
            </p>

            <div className={styles.stepNote}>
              ⚠️ Works best with digital textbooks. Scanned photocopies may not convert well.
              <br/><br/>
              Already have ePub files? Skip this step.
            </div>

            <Button className={`${styles.nextButton} ${styles.fixedBottomBtn}`} onClick={handleNext}>
              Next <ArrowRight className="ml-2" size={20} />
            </Button>
          </ScreenWrapper>
        );
      }
      if (flowStep === 3) { // Screen 8B
        return (
          <ScreenWrapper active={isActive}>
            <h2 className={styles.headline}>Step 2: Send it to Kindle</h2>
            
            <div className={styles.stepList}>
              <div className={styles.stepItem}>
                <span className={styles.stepIcon}>1.</span> 
                Download the free Kindle app (Play Store or App Store)
              </div>
              <div className={styles.stepItem}>
                <span className={styles.stepIcon}>2.</span> 
                Go to amazon.com/sendtokindle. Sign in with same Amazon account.
              </div>
              <div className={styles.stepItem}>
                <span className={styles.stepIcon}>3.</span> 
                Upload your ePub or PDF
              </div>
              <div className={styles.stepItem}>
                <span className={styles.stepIcon}>4.</span> 
                It appears in your Kindle app within seconds
              </div>
            </div>

            <p className={styles.bodyText}>
              Send all your textbooks at once.<br/>
              <span className={styles.accentText}>Cost: Free.</span>
            </p>

            <Button className={`${styles.nextButton} ${styles.fixedBottomBtn}`} onClick={handleNext}>
              Next <ArrowRight className="ml-2" size={20} />
            </Button>
          </ScreenWrapper>
        );
      }
      if (flowStep === 4) { // Screen 9B
        return (
          <ScreenWrapper active={isActive}>
            <h2 className={styles.headline}>Step 3: Read and highlight</h2>
            
            <div className={styles.stepList}>
              <div className={styles.stepItem}><BookOpen className={styles.stepIcon} size={20} /> Open the Kindle app. Your book is in your library.</div>
              <div className={styles.stepItem}><CheckCircle2 className={styles.stepIcon} size={20} /> When you find something important: Long press → drag → tap Highlight</div>
            </div>

            <p className={styles.bodyText}>
              That's it. Keep reading. Highlight anything you want to remember — definitions, concepts, formulas, key facts.<br/><br/>
              <span className={styles.accentText}>Cost: Free.</span>
            </p>

            <Button className={`${styles.nextButton} ${styles.fixedBottomBtn}`} onClick={handleNext}>
              Next <ArrowRight className="ml-2" size={20} />
            </Button>
          </ScreenWrapper>
        );
      }
      if (flowStep === 5) { // Screen 10B
        return (
          <ScreenWrapper active={isActive}>
            <h2 className={styles.headline}>Step 4: Review in 2Read</h2>
            
            <div className={styles.stepList}>
              <div className={styles.stepItem}>
                <span className={styles.stepIcon}>→</span>
                In the Kindle app: Three dots → Annotations → Share → 2Read
              </div>
            </div>

            <p className={styles.bodyText}>
              Your highlights are now beautiful swipeable cards.<br/><br/>
              Swipe through them daily. AI explains complex concepts. Generate book summaries before exams.<br/><br/>
              Total cost of this system: <span className={styles.accentText}>₹0</span><br/>
              Every tool is free.
            </p>

                        <Button
              className={`${styles.nextButton} ${styles.fixedBottomBtn}`}
              onClick={() => window.open("https://2read.app", "_blank")}
            >
              Download 2Read — Free
            </Button>
          </ScreenWrapper>
        );
      }
    }

    // --- FLOW C Screens ---
    if (flow === 'C') {
      if (flowStep === 0) { // Screen 5C
        return (
          <ScreenWrapper active={isActive}>
            <h2 className={styles.headline}>A simple system to remember what you read.</h2>
            
            <FlowDiagram nodes={[
              { type: 'image', src: ICONS.kindle, label: 'Kindle App', sublabel: 'Read & highlight' },
              { type: 'image', src: ICONS.tworead, label: '2Read', sublabel: 'AI-powered review' },
            ]} />

            <p className={styles.bodyText}>
              Get the free Kindle app. Buy books in it or send your own files to it.
            </p>

            <Button className={`${styles.nextButton} ${styles.fixedBottomBtn}`} onClick={handleNext}>
              Next <ArrowRight className="ml-2" size={20} />
            </Button>
          </ScreenWrapper>
        );
      }
      if (flowStep === 1) { // Screen 6C
        return (
          <ScreenWrapper active={isActive}>
            <h2 className={styles.headline}>Read. Highlight. That's it.</h2>
            
            <p className={styles.bodyText}>
              When something resonates — a great idea, a useful quote, a framework worth keeping — long press and highlight it.
            </p>

            <div className={styles.tipBox}>
              Have your own ebooks or PDFs? Send them to Kindle for free: amazon.com/sendtokindle<br/><br/>
              Tip: Convert PDFs to ePub at cloudconvert.com for better reading on your phone.
            </div>

            <Button className={`${styles.nextButton} ${styles.fixedBottomBtn}`} onClick={handleNext}>
              Next <ArrowRight className="ml-2" size={20} />
            </Button>
          </ScreenWrapper>
        );
      }
      if (flowStep === 2) { // Screen 7C
        return (
          <ScreenWrapper active={isActive}>
            <h2 className={styles.headline}>2Read makes your highlights worth highlighting.</h2>
            
            <p className={styles.bodyText}>
              Swipeable cards. One idea at a time.<br/>
              AI that explains what you read.<br/>
              Summaries of every book.
              <br/><br/>
              Spend 2 minutes each morning with yesterday's highlights. That's all it takes.
            </p>

                        <Button
              className={`${styles.nextButton} ${styles.fixedBottomBtn}`}
              onClick={() => window.open("https://2read.app", "_blank")}
            >
              Download 2Read — Free
            </Button>
          </ScreenWrapper>
        );
      }
    }

    return null;
  };

  return (
    <main 
      className={styles.pageWrapper}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndEvent}
    >
      <Helmet>
        <title>2Read | For You</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
        <meta name="description" content="Find the best reading setup for you using 2Read and the Kindle app. 3 questions. 30 seconds." />
        <meta name="keywords" content="reading setup, kindle, 2Read, epub, pdf reader, highlight management" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="2Read | For You" />
        <meta property="og:description" content="Find the best reading setup for you using 2Read and the Kindle app. 3 questions. 30 seconds." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://2read.app/for-you" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="2Read | For You" />
        <meta name="twitter:description" content="Find the best reading setup for you using 2Read and the Kindle app. 3 questions. 30 seconds." />
        
        {/* Canonical Link */}
        <link rel="canonical" href="https://2read.app/for-you" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "2Read | For You",
              "description": "Find the best reading setup for you using 2Read and the Kindle app.",
              "url": "https://2read.app/for-you"
            }
          `}
        </script>
      </Helmet>

      {/* Top Navigation */}
      <nav className={styles.topNav}>
        {step > 0 && (
          <button className={styles.iconButton} onClick={handlePrev} aria-label="Go back">
            <ArrowLeft size={24} />
          </button>
        )}
        <Link to="/" className={styles.iconButton} aria-label="Go home">
          <Home size={24} />
        </Link>
      </nav>

      {/* Render all potential screens based on current total steps to enable CSS transitions */}
      {Array.from({ length: totalSteps }).map((_, idx) => (
        <React.Fragment key={idx}>
          {renderScreen(idx)}
        </React.Fragment>
      ))}

      {/* Progress Dots */}
      <div className={styles.dotsContainer}>
        {Array.from({ length: totalSteps }).map((_, idx) => (
          <div 
            key={idx} 
            className={`${styles.dot} ${idx === step ? styles.dotActive : ""}`} 
          />
        ))}
      </div>
    </main>
  );
}