import React, { useRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import styles from "./demos.module.css";

/**
 * The chrome every feature demo shares: the dialog, the phone screen, the iOS
 * status bar, the dismiss link and the supported-languages line.
 *
 * Extracted so the demos can't drift apart — a fix to the status bar or the
 * scaling maths lands in all of them at once. What each demo supplies is the
 * inside of the screen, and optionally a footer under it.
 *
 * Built on the Radix dialog primitives rather than the styled Dialog component
 * so it gets the focus trap, Escape handling, scroll lock and portal while the
 * visuals stay a pixel match for the phone.
 */

/**
 * Languages the AI features read and answer in. This is the intersection of
 * the languages Claude publishes benchmark scores for and the languages Gemini
 * lists as supported, ordered by Claude's own performance ranking — so every
 * name here is well supported by both models rather than by one of them.
 * Yoruba is in Claude's table but absent from Gemini's list, so it is omitted.
 */
const SUPPORTED_LANGUAGES = [
  "English",
  "Spanish",
  "Portuguese",
  "Italian",
  "French",
  "Indonesian",
  "German",
  "Arabic",
  "Chinese",
  "Korean",
  "Japanese",
  "Hindi",
  "Bengali",
  "Swahili",
];

/* iOS status-bar glyphs, drawn by hand: the lucide equivalents are outline
   icons on a different grid and read as Android next to the real thing. */

function SignalIcon() {
  return (
    <svg className={`${styles.statusIcon} ${styles.signalIcon}`} viewBox="0 0 17 12" aria-hidden="true">
      <rect x="0" y="8.5" width="3" height="3.5" rx="1" />
      <rect x="4.667" y="6" width="3" height="6" rx="1" />
      <rect x="9.333" y="3.2" width="3" height="8.8" rx="1" />
      <rect x="14" y="0" width="3" height="12" rx="1" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg className={`${styles.statusIcon} ${styles.wifiIcon}`} viewBox="0 0 16 12" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M5.542 8.679A3 3 0 0 1 10.458 8.679" />
        <path d="M3.249 7.073A5.8 5.8 0 0 1 12.751 7.073" />
        <path d="M0.955 5.467A8.6 8.6 0 0 1 15.045 5.467" />
      </g>
      <circle cx="8" cy="10.4" r="1.15" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg className={`${styles.statusIcon} ${styles.batteryIcon}`} viewBox="0 0 26 12" aria-hidden="true">
      <rect x="0.5" y="0.5" width="22" height="11" rx="3.2" fill="none" stroke="currentColor" strokeOpacity="0.38" />
      <rect x="2" y="2" width="17" height="8" rx="2" />
      <path d="M24 4.2v3.6a2 2 0 0 0 0-3.6Z" fillOpacity="0.4" />
    </svg>
  );
}

interface DemoShellProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Screen-reader name for the dialog, e.g. "Smart Dictionary". */
  label: string;
  /**
   * Optional override of the shared height budget. Leave unset: every demo is
   * the same phone at the same size, and a per-demo budget would scale the
   * panels differently, which is what made the Wisdom Spark screen a different
   * height from the rest.
   */
  panelEm?: number;
  /** Extra class on the screen, e.g. the dark Wisdom Spark treatment. */
  screenClassName?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * Height budget in `em` for the whole panel: the phone screen (a fixed 48.5em),
 * plus the dismiss link above and the footer and language line below. Shared by
 * every demo so they all scale identically. MEASURED, not estimated —
 * undershoot it and the panel overflows a short window, which centring then
 * clips at the top.
 */
const PANEL_EM = 58;

export function DemoShell({
  open,
  onOpenChange,
  label,
  panelEm = PANEL_EM,
  screenClassName,
  children,
  footer,
}: DemoShellProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={styles.overlay}>
          <DialogPrimitive.Content
            ref={contentRef}
            className={styles.content}
            style={{ "--panel-em": panelEm } as React.CSSProperties}
            aria-label={`${label} interactive demo`}
            onOpenAutoFocus={(event) => {
              // Focus the dialog shell, not the target: focusing the target
              // paints its focus state and makes it read as already activated,
              // which is what the tap cue exists to avoid. The trap still holds.
              event.preventDefault();
              contentRef.current?.focus();
            }}
          >
            <DialogPrimitive.Title className={styles.srOnly}>
              {label} interactive demo
            </DialogPrimitive.Title>

            <DialogPrimitive.Close className={styles.dismiss}>
              <X size={15} aria-hidden="true" />
              Close demo
            </DialogPrimitive.Close>

            <div className={`${styles.screen} ${screenClassName ?? ""}`}>
              <div className={styles.statusBar} aria-hidden="true">
                <span className={styles.statusTime}>9:41</span>
                <span className={styles.statusIcons}>
                  <SignalIcon />
                  <WifiIcon />
                  <BatteryIcon />
                </span>
              </div>
              {children}
            </div>

            {footer}

            <p className={styles.provenance}>
              Real outputs, from my own highlights
            </p>

            <div className={styles.languages}>
              <p className={styles.languagesLabel}>Works in</p>
              <p className={styles.languagesList}>
                {/* NBSP before each separator so a "·" can never start a line */}
                {SUPPORTED_LANGUAGES.join(" · ")}{" "}
                <span className={styles.languagesMore}>and more</span>
              </p>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
