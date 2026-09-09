import { useEffect, useRef } from "react";

/**
 * Scroll-reveal wiring for a page.
 *
 * Mark up elements declaratively and this hook does the observing:
 *
 *   data-reveal="rise"        the element animates itself (see the CSS variants)
 *   data-reveal-group="name"  the element is a *scene*: it stays visible and its
 *                             CSS animates its own children off the group's state
 *
 * Both get `data-reveal-state="in"` once they scroll into view, and are then
 * unobserved — a reveal happens once and never re-hides on the way back up,
 * which is what makes it read as typesetting rather than as a carousel.
 *
 * Pass `deps` when markup appears later (e.g. an expanding list) so the new
 * nodes get picked up.
 */
export function useScrollReveal<T extends HTMLElement>(deps: unknown[] = []) {
  const rootRef = useRef<T>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-group]"),
    ).filter((el) => el.getAttribute("data-reveal-state") !== "in");

    if (!targets.length) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion, or a browser without the observer: show everything now.
    // The CSS hides these by default, so this fallback is what keeps the page
    // readable rather than blank.
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.setAttribute("data-reveal-state", "in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-reveal-state", "in");
          observer.unobserve(entry.target);
        });
      },
      {
        // Hold the trigger line a little above the fold so the motion finishes
        // as the reader arrives rather than playing under their eyes.
        // threshold 0 (not a fraction) so this stays correct for elements
        // taller than the viewport, which can never reach a fractional ratio.
        rootMargin: "0px 0px -12% 0px",
        threshold: 0,
      },
    );

    targets.forEach((el) => observer.observe(el));

    // Safety net. That -12% band means anything still inside it once the page
    // can scroll no further would never reveal — a footer or a final CTA could
    // sit invisible forever. The same applies when the viewport is taller than
    // the document and no scrolling happens at all, so check immediately too.
    const revealRemainderAtBottom = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (!atBottom) return;
      targets.forEach((el) => el.setAttribute("data-reveal-state", "in"));
      observer.disconnect();
      window.removeEventListener("scroll", revealRemainderAtBottom);
    };

    revealRemainderAtBottom();
    window.addEventListener("scroll", revealRemainderAtBottom, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", revealRemainderAtBottom);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return rootRef;
}
