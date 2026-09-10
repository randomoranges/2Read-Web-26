import React, { useEffect, useState } from "react";
import { Heart, Pencil, Pointer, Repeat, Share, Shuffle, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import styles from "./demos.module.css";
import { DemoShell } from "./DemoShell";

/**
 * The shared phone shell behind every feature demo.
 *
 * One component renders the whole screen — status bar, book heading, highlight
 * card, action keys, result sheet — so the demos are identical by construction
 * rather than by copy-paste. What changes between them is the target the reader
 * is guided to:
 *
 *   word      select a word in the highlight, then tap the chip that appears
 *             (Smart Dictionary)
 *   actionKey tap the ✦ key under the card (Unpack, and the AI features that
 *             work on the whole highlight)
 *
 * The surrounding chrome — dialog, phone screen, status bar, language line —
 * comes from DemoShell, shared with the Daily Review demo.
 */

export interface DemoExample {
  book: string;
  byline: string;
  counter: string;
  location: string;
  quote: string;
  /** Required when targetKind is "word": the word or phrase to select. */
  word?: string;
  /** Summary layout: the chip text, and the heading shown above the body. */
  tabLabel?: string;
  title?: string;
  /** The result content, as markdown. */
  body: string;
}

export interface FeatureDemoConfig {
  /** Screen-reader name for the dialog, e.g. "Smart Dictionary". */
  label: string;
  /** Text of the button that opens this demo, on the ladder rung. */
  triggerLabel: string;
  /**
   * "highlight" is the card screen with the action keys and a result panel
   * over it. "summary" is the book-level screen: title, author, then the
   * summary itself, with no panel.
   */
  layout: "highlight" | "summary";
  examples: DemoExample[];

  /* highlight layout */
  sheetTitle?: string;
  /** Text of the button that moves to the next example. */
  switchLabel?: string;
  /** What the reader is guided to: a word in the highlight, or the ✦ key. */
  targetKind?: "word" | "actionKey";

  /* summary layout */
  /** Small line under the author, e.g. "One summary · 3 of 6 lenses". */
  caption?: string;
  /** Shown before the summaries: whose highlights these are, and what the
   *  three things a reader can ask for actually are. */
  intro?: {
    title: string;
    byline: string;
    items: { head: string; body: string }[];
    action: string;
  };
  /** Lenses the real app offers. The demo carries a subset; the rest are
   *  surfaced as a non-interactive chip so the reader knows they exist. */
  lensTotal?: number;
}

interface FeatureDemoProps extends FeatureDemoConfig {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Ripple + pointing hand. The hand is outline-only so the text it crosses
 *  stays readable, and because lucide's Pointer is built from open paths that
 *  collapse into blobs if you fill them. */
function TapCue({ onKey = false }: { onKey?: boolean }) {
  return (
    <span className={`${styles.tapCue} ${onKey ? styles.keyCue : ""}`} aria-hidden="true">
      <span className={styles.tapRipple} />
      <Pointer className={styles.tapHand} />
    </span>
  );
}

type Step = "target" | "chip" | "result";

export function FeatureDemo({
  open,
  onOpenChange,
  label,
  layout,
  sheetTitle,
  switchLabel,
  targetKind,
  caption,
  lensTotal,
  intro,
  examples,
}: FeatureDemoProps) {
  const isSummary = layout === "summary";
  const [step, setStep] = useState<Step>("target");
  const [saved, setSaved] = useState(false);
  const [index, setIndex] = useState(0);

  // Always reopen on the first highlight and the first beat, rather than
  // wherever it happened to be left.
  useEffect(() => {
    if (!open) return;
    setIndex(0);
    setStep("target");
    setSaved(false);
  }, [open]);

  const restart = () => {
    setStep("target");
    setSaved(false);
  };

  const nextExample = () => {
    setIndex((i) => (i + 1) % examples.length);
    restart();
  };

  const example = examples[index];
  const { book, byline, counter, location, quote } = example;
  const keyIsTarget = targetKind === "actionKey";
  // the intro carries its own heading, so the shell's would double up
  const showIntro = isSummary && !!intro && step === "target";
  const wordIsTarget = targetKind === "word";
  const word = example.word;

  // Split the quote around the selectable word so only that word is a control.
  let before = quote;
  let after = "";
  if (wordIsTarget) {
    if (!word) {
      throw new Error(`FeatureDemo: ${label} example ${index} is missing \`word\``);
    }
    const at = quote.indexOf(word);
    if (at === -1) {
      throw new Error(`FeatureDemo: "${word}" is not in the quote for ${label}`);
    }
    before = quote.slice(0, at);
    after = quote.slice(at + word.length);
  }

  const hint = (() => {
    if (step === "result") return null;
    if (wordIsTarget) {
      return step === "target" ? (
        <>Tap <span className={styles.hintWord}>{word}</span></>
      ) : (
        <>Now tap {sheetTitle}</>
      );
    }
    return <>Tap the <span className={styles.hintWord}>✦</span> button below the highlight</>;
  })();

  const footer = isSummary ? null : (
<div className={styles.footer}>
              <p className={styles.hint} aria-live="polite">
                {hint && (
                  <>
                    <span className={styles.hintDot} aria-hidden="true" />
                    {hint}
                  </>
                )}
              </p>

              {examples.length > 1 && switchLabel && (
                <div className={styles.footerRow}>
                  <button type="button" className={styles.tryAnother} onClick={nextExample}>
                    <Shuffle size={13} aria-hidden="true" />
                    {switchLabel}
                  </button>
                  <span className={styles.exampleCount}>
                    {index + 1} of {examples.length}
                  </span>
                </div>
              )}
            </div>
  );

  return (
    <DemoShell
      open={open}
      onOpenChange={onOpenChange}
      label={label}
      footer={footer}
    >
              {!showIntro && (
                <>
                  <p className={styles.bookTitle}>{book}</p>
                  <p className={styles.bookByline}>{byline}</p>
                  {caption && <p className={styles.bookCaption}>{caption}</p>}
                </>
              )}

              {showIntro && intro ? (
                <>
                  <p className={styles.bookTitle}>{intro.title}</p>
                  <p className={styles.bookByline}>{intro.byline}</p>

                  <div className={styles.introArea}>
                    <ul className={styles.introList}>
                      {intro.items.map((item) => (
                        <li key={item.head}>
                          <span className={styles.introHead}>{item.head}</span>
                          <span className={styles.introBody}>{item.body}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.sparkTriggerSlot}>
                    <button
                      type="button"
                      className={styles.sparkTrigger}
                      onClick={() => setStep("result")}
                    >
                      {intro.action}
                    </button>
                  </div>
                </>
              ) : isSummary ? (
                <>
                  <div className={styles.tabs} role="tablist" aria-label="Summaries">
                    {examples.map((ex, i) => (
                      <React.Fragment key={ex.tabLabel}>
                        {/* the general summary sits apart from the three lenses */}
                        {i === 1 && <span className={styles.tabsDivider} aria-hidden="true" />}
                        <button
                          type="button"
                          role="tab"
                          aria-selected={i === index}
                          className={`${styles.tab} ${i === index ? styles.tabActive : ""}`}
                          onClick={() => setIndex(i)}
                        >
                          {ex.tabLabel}
                        </button>
                      </React.Fragment>
                    ))}

                    {lensTotal && lensTotal > examples.length - 1 && (
                      <span className={styles.tabMore}>
                        +{lensTotal - (examples.length - 1)} more in the app
                      </span>
                    )}
                  </div>

                  <div className={styles.summaryArea}>
                    <div className={styles.summaryScroll}>
                      <p className={styles.summaryEyebrow}>
                        {index === 0
                          ? "General summary"
                          : `Lens ${index} of ${lensTotal ?? examples.length - 1}`}
                      </p>
                      <h3 className={styles.summaryTitle}>{example.title}</h3>
                      <div className={styles.sheetProse}>
                        <ReactMarkdown>{example.body}</ReactMarkdown>
                      </div>
                    </div>
                    <span className={styles.summaryFade} aria-hidden="true" />
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.cardArea}>
                <div
                  className={`${styles.card} ${step === "result" ? styles.cardBlurred : ""}`}
                  aria-hidden={step === "result"}
                >
                  <p className={styles.cardCount}>{counter}</p>

                  <div className={styles.quoteWrap}>
                    <p className={styles.quote}>
                      {before}
                      {wordIsTarget && word && (
                        <span className={styles.wordWrap}>
                          <button
                            type="button"
                            className={`${styles.word} ${step === "target" ? "" : styles.wordSelected}`}
                            onClick={() => step === "target" && setStep("chip")}
                            disabled={step !== "target"}
                            aria-label={
                              step === "target"
                                ? `Select ${word}`
                                : `${word}, selected`
                            }
                          >
                            {word}
                          </button>

                          {step === "target" && (
                            <>
                              <span className={styles.wordTarget} aria-hidden="true" />
                              <TapCue />
                            </>
                          )}

                          {step === "chip" && (
                            <button
                              type="button"
                              className={styles.chip}
                              onClick={() => setStep("result")}
                              autoFocus
                            >
                              {sheetTitle}
                            </button>
                          )}
                        </span>
                      )}
                      {after}
                    </p>
                  </div>

                  <div className={styles.cardFoot}>
                    <span className={styles.cardLocation}>{location}</span>
                    <span className={styles.cardIcons}>
                      <Share size={17} aria-hidden="true" />
                      <Heart size={17} aria-hidden="true" />
                    </span>
                  </div>
                </div>

                {step === "result" && (
                  <div className={styles.sheet} role="group" aria-label={`${label} result`}>
                    <p className={styles.sheetTitle}>{sheetTitle}</p>
                    <div className={styles.sheetScroll}>
                      <div className={styles.sheetProse}>
                        <ReactMarkdown>{example.body}</ReactMarkdown>
                      </div>
                    </div>
                    <span className={styles.sheetScrollFade} aria-hidden="true" />
                    <div className={styles.sheetActions}>
                      <button
                        type="button"
                        className={`${styles.sheetBtn} ${styles.sheetSave}`}
                        onClick={() => setSaved(true)}
                        disabled={saved}
                      >
                        {saved ? "Saved" : "Save"}
                      </button>
                      <button
                        type="button"
                        className={`${styles.sheetBtn} ${styles.sheetClose}`}
                        onClick={restart}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div
                className={`${styles.actions} ${step === "result" ? styles.actionsBlurred : ""}`}
                aria-hidden={!keyIsTarget || step === "result"}
              >
                <span className={styles.actionKey}><Repeat size={24} /></span>
                <span className={styles.actionKey}><Pencil size={24} /></span>
                {keyIsTarget ? (
                  <button
                    type="button"
                    className={`${styles.actionKey} ${styles.actionKeyButton}`}
                    onClick={() => step === "target" && setStep("result")}
                    disabled={step !== "target"}
                    aria-label="Unpack this highlight"
                  >
                    <Sparkles size={24} aria-hidden="true" />
                    {step === "target" && (
                      <>
                        <span className={styles.keyTarget} aria-hidden="true" />
                        <TapCue onKey />
                      </>
                    )}
                  </button>
                ) : (
                  <span className={styles.actionKey}><Sparkles size={24} /></span>
                )}
                  </div>
                </>
              )}
    </DemoShell>
  );
}
