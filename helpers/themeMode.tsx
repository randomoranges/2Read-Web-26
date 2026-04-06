import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from "react";

export type ThemeMode = "light" | "dark" | "auto";

// Event mechanism to sync standalone functions with React Context
type ThemeChangeListener = () => void;
const listeners = new Set<ThemeChangeListener>();

function notifyThemeChange() {
  listeners.forEach((listener) => listener());
}

function subscribeToThemeChange(listener: ThemeChangeListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function updateTheme(darkPreferred: boolean): void {
  if (darkPreferred) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

let currentMediaQuery: MediaQueryList | null = null;

/**
 * Switch to dark mode by adding the "dark" class to document.body.
 */
export function switchToDarkMode(): void {
  if (currentMediaQuery) {
    currentMediaQuery.onchange = null;
    currentMediaQuery = null;
  }
  document.body.classList.add("dark");
  notifyThemeChange();
}

/**
 * Switch to light mode by removing the "dark" class from document.body.
 */
export function switchToLightMode(): void {
  if (currentMediaQuery) {
    currentMediaQuery.onchange = null;
    currentMediaQuery = null;
  }
  document.body.classList.remove("dark");
  notifyThemeChange();
}

/**
 * Switch to auto mode. Immediately applies the system color scheme preference
 * and listens for changes.
 */
export function switchToAutoMode(): void {
  if (currentMediaQuery) {
    currentMediaQuery.onchange = null;
  }
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.onchange = (e: MediaQueryListEvent) => {
    updateTheme(e.matches);
    notifyThemeChange();
  };
  currentMediaQuery = mediaQuery;
  updateTheme(mediaQuery.matches);
  notifyThemeChange();
}

/**
 * Returns the current theme mode setting.
 */
export function getCurrentThemeMode(): ThemeMode {
  if (currentMediaQuery) {
    return "auto";
  }
  return document.body.classList.contains("dark") ? "dark" : "light";
}

/**
 * Returns the effective theme ("light" | "dark") by checking the body class.
 */
export function getResolvedTheme(): "light" | "dark" {
  return document.body.classList.contains("dark") ? "dark" : "light";
}

// Apply auto mode immediately on module load, before any React render.
// This ensures the body class and initial state are correct from the start.
switchToAutoMode();

// -- React Context & Provider --

interface ThemeModeContextValue {
  mode: ThemeMode;
  /** The effective theme — always "light" or "dark", never "auto" */
  resolvedMode: "light" | "dark";
  switchToDarkMode: () => void;
  switchToLightMode: () => void;
  switchToAutoMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeToThemeChange(() => {
      forceUpdate((n) => n + 1);
    });
    return unsubscribe;
  }, []);

  const mode = getCurrentThemeMode();
  const resolvedMode = getResolvedTheme();

  const value = useMemo(
    () => ({
      mode,
      resolvedMode,
      switchToDarkMode,
      switchToLightMode,
      switchToAutoMode,
    }),
    [mode, resolvedMode],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode(): ThemeModeContextValue {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  }
  return context;
}
