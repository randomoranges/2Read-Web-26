import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Pointer } from "lucide-react";
import styles from "./demos.module.css";
import { DemoShell } from "./DemoShell";
import { REVIEW_BOOK_COUNT, REVIEW_HIGHLIGHTS, WISDOM_SPARK } from "./dailyReview";

/**
 * Daily Review — swipe the day's fifteen highlights, then the last card offers
 * the Wisdom Spark drawn from one of them.
 *
 * Beats:
 *   intro    what the ritual is, before any cards, so the fifteen make sense
 *   review   card 1..15, advanced by tap, swipe or arrow key
 *   ready    the fifteenth card, with "Get today's wisdom spark"
 *   crafting a short wait, so the spark reads as generated rather than canned
 *   spark    the dark result screen
 *
 * The chrome comes from DemoShell, shared with the other demos.
 */

const CRAFTING_MS = 2400;
const SWIPE_PX = 40;

type Step = "intro" | "review" | "crafting" | "spark";

/** What the ritual is, said before the cards rather than discovered from them. */
const INTRO_STEPS = [
  {
    head: "15 highlights, picked at random",
    body: "At a time you choose, 2Read draws 15 highlights from everything you've read and sends you a notification.",
  },
  {
    head: "One card at a time",
    body: "You go through them in a few minutes. No searching, no deciding what is worth revisiting.",
  },
  {
    head: "It ends with a Wisdom Spark",
    body: "One of the 15 gets a fresh reading that connects it to the rest of your library.",
  },
];

interface DailyReviewDemoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DailyReviewDemo({ open, onOpenChange }: DailyReviewDemoProps) {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState<Step>("intro");
  const [showBooks, setShowBooks] = useState(false);
  const dragFrom = useRef<number | null>(null);

  const total = REVIEW_HIGHLIGHTS.length;
  const isLast = index === total - 1;
  const highlight = REVIEW_HIGHLIGHTS[index];

  const restart = () => {
    setIndex(0);
    setStep("intro");
    setShowBooks(false);
  };

  useEffect(() => {
    if (open) restart();
  }, [open]);

  // The wait is what makes the spark feel drawn from the session just finished.
  useEffect(() => {
    if (step !== "crafting") return;
    const timer = window.setTimeout(() => setStep("spark"), CRAFTING_MS);
    return () => window.clearTimeout(timer);
  }, [step]);

  const next = () => setIndex((i) => Math.min(i + 1, total - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  const onPointerDown = (e: React.PointerEvent) => {
    dragFrom.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const from = dragFrom.current;
    dragFrom.current = null;
    if (from === null) return;
    const dx = e.clientX - from;
    // a tap (no meaningful travel) also advances, so a mouse works like a thumb
    if (Math.abs(dx) < SWIPE_PX) {
      if (!isLast) next();
      return;
    }
    if (dx < 0) next();
    else prev();
  };

  const hint = (() => {
    if (step !== "review") return null;
    if (isLast) return <>That's all fifteen. Get your spark</>;
    return index === 0 ? (
      <>Swipe or tap the card to review</>
    ) : (
      <>{total - index} more to review</>
    );
  })();

  const footer =
    step === "spark" ? null : (
      <div className={styles.footer}>
        <p className={styles.hint} aria-live="polite">
          {hint && (
            <>
              <span className={styles.hintDot} aria-hidden="true" />
              {hint}
            </>
          )}
        </p>
        {step === "review" && !isLast && (
          <div className={styles.footerRow}>
            <button
              type="button"
              className={styles.tryAnother}
              onClick={() => setIndex(total - 1)}
            >
              Skip to the end
            </button>
          </div>
        )}
      </div>
    );

  return (
    <DemoShell
      open={open}
      onOpenChange={onOpenChange}
      label="Daily Review"
      screenClassName={step === "spark" ? styles.screenDark : ""}
      footer={footer}
    >
      {step === "spark" ? (
        <>
          <div className={styles.sparkCard}>
            <p className={styles.sparkHeading}>Today's Wisdom Spark</p>
            <p className={styles.sparkQuote}>“{WISDOM_SPARK.quote}”</p>
            <p className={styles.sparkAttribution}>
              — <strong>{WISDOM_SPARK.book}</strong> by {WISDOM_SPARK.author}
            </p>
            {WISDOM_SPARK.body.map((paragraph, i) => (
              <p key={i} className={styles.sparkBody}>{paragraph}</p>
            ))}
          </div>

          <div className={styles.sparkActions}>
            <button
              type="button"
              className={styles.sparkPrimary}
              onClick={() => setShowBooks(true)}
            >
              See today's {REVIEW_BOOK_COUNT} books
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={styles.sparkSecondary}
              onClick={() => onOpenChange(false)}
            >
              Finish review
            </button>
          </div>

          {showBooks && (
            <div className={styles.booksPopup} role="dialog" aria-label="Today's books">
              <p className={styles.booksPopupTitle}>Today's {REVIEW_BOOK_COUNT} books</p>
              <p className={styles.booksPopupBody}>
                Every book that appeared in today's review is here. Open any one to read all
                of its highlights, available in the app.
              </p>
              <button
                type="button"
                className={styles.booksPopupClose}
                onClick={() => setShowBooks(false)}
                autoFocus
              >
                Got it
              </button>
            </div>
          )}
        </>
      ) : step === "intro" ? (
        <>
          <p className={styles.bookTitle}>Daily Review</p>
          <p className={styles.bookByline}>A few minutes, once a day</p>

          <div className={styles.introArea}>
            <ol className={styles.introSteps}>
              {INTRO_STEPS.map((s, i) => (
                <li key={s.head} className={styles.introStep}>
                  <span className={styles.introNum} aria-hidden="true">{i + 1}</span>
                  <span>
                    <span className={styles.introHead}>{s.head}</span>
                    <span className={styles.introBody}>{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.sparkTriggerSlot}>
            <button
              type="button"
              className={styles.sparkTrigger}
              onClick={() => setStep("review")}
            >
              Start review
            </button>
          </div>
        </>
      ) : (
        <>
          <p className={styles.bookTitle}>{highlight.book}</p>
          <p className={styles.bookByline}>Book by {highlight.author}</p>

          <div className={styles.reviewArea}>
            <div
              className={styles.reviewCard}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") next();
                if (e.key === "ArrowLeft") prev();
              }}
              role="group"
              aria-label={`Highlight ${index + 1} of ${total}`}
              tabIndex={0}
            >
              <p className={styles.reviewQuote}>{highlight.quote}</p>

              {step === "review" && index === 0 && (
                <span className={styles.reviewCue} aria-hidden="true">
                  <span className={styles.tapRipple} />
                  <Pointer className={styles.tapHand} />
                </span>
              )}
            </div>

            {step === "crafting" && (
              <div className={styles.crafting} role="status">
                <span className={styles.craftingDots} aria-hidden="true">
                  <span /><span /><span />
                </span>
                <p className={styles.craftingText}>Crafting spark…</p>
              </div>
            )}
          </div>

          <div className={styles.sparkTriggerSlot}>
            {isLast && step === "review" && (
              <button
                type="button"
                className={styles.sparkTrigger}
                onClick={() => setStep("crafting")}
              >
                Get today's wisdom spark
              </button>
            )}
          </div>

          <p className={styles.reviewCounter}>
            <strong>{String(index + 1).padStart(2, "0")}</strong>
            <em>of</em>
            {total}
          </p>
        </>
      )}
    </DemoShell>
  );
}
