import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { GlobalContextProviders } from "./components/_globalContextProviders";
import Page_0 from "./pages/about.tsx";
import PageLayout_0 from "./pages/about.pageLayout.tsx";
import Page_1 from "./pages/_index.tsx";
import PageLayout_1 from "./pages/_index.pageLayout.tsx";
import Page_2 from "./pages/for-you.tsx";
import PageLayout_2 from "./pages/for-you.pageLayout.tsx";
import Page_3 from "./pages/pricing.tsx";
import PageLayout_3 from "./pages/pricing.pageLayout.tsx";
import Page_4 from "./pages/terms.tsx";
import PageLayout_4 from "./pages/terms.pageLayout.tsx";
import Page_5 from "./pages/privacy.tsx";
import PageLayout_5 from "./pages/privacy.pageLayout.tsx";
import Page_6 from "./pages/bookshots.tsx";
import PageLayout_6 from "./pages/bookshots.pageLayout.tsx";
import BookShotPage from "./pages/bookshot.tsx";
import Page_7 from "./pages/faq.tsx";
import PageLayout_7 from "./pages/faq.pageLayout.tsx";

if (!window.requestIdleCallback) {
  (window as any).requestIdleCallback = (cb: IdleRequestCallback) => {
    setTimeout(cb, 1);
  };
}

import "./base.css";

const fileNameToRoute = new Map([["./pages/about.tsx","/about"],["./pages/_index.tsx","/"],["./pages/for-you.tsx","/for-you"],["./pages/pricing.tsx","/pricing"],["./pages/terms.tsx","/terms"],["./pages/privacy.tsx","/privacy"],["./pages/bookshots.tsx","/bookshots"],["./pages/faq.tsx","/faq"]]);
const fileNameToComponent = new Map([
    ["./pages/about.tsx", Page_0],
["./pages/_index.tsx", Page_1],
["./pages/for-you.tsx", Page_2],
["./pages/pricing.tsx", Page_3],
["./pages/terms.tsx", Page_4],
["./pages/privacy.tsx", Page_5],
["./pages/bookshots.tsx", Page_6],
["./pages/faq.tsx", Page_7],
  ]);

function makePageRoute(filename: string) {
  const Component = fileNameToComponent.get(filename);
  return <Component />;
}

function toElement({
  trie,
  fileNameToRoute,
  makePageRoute,
}: {
  trie: LayoutTrie;
  fileNameToRoute: Map<string, string>;
  makePageRoute: (filename: string) => React.ReactNode;
}) {
  return [
    ...trie.topLevel.map((filename) => (
      <Route
        key={fileNameToRoute.get(filename)}
        path={fileNameToRoute.get(filename)}
        element={makePageRoute(filename)}
      />
    )),
    ...Array.from(trie.trie.entries()).map(([Component, child], index) => (
      <Route
        key={index}
        element={
          <Component>
            <Outlet />
          </Component>
        }
      >
        {toElement({ trie: child, fileNameToRoute, makePageRoute })}
      </Route>
    )),
  ];
}

type LayoutTrieNode = Map<
  React.ComponentType<{ children: React.ReactNode }>,
  LayoutTrie
>;
type LayoutTrie = { topLevel: string[]; trie: LayoutTrieNode };
function buildLayoutTrie(layouts: {
  [fileName: string]: React.ComponentType<{ children: React.ReactNode }>[];
}): LayoutTrie {
  const result: LayoutTrie = { topLevel: [], trie: new Map() };
  Object.entries(layouts).forEach(([fileName, components]) => {
    let cur: LayoutTrie = result;
    for (const component of components) {
      if (!cur.trie.has(component)) {
        cur.trie.set(component, {
          topLevel: [],
          trie: new Map(),
        });
      }
      cur = cur.trie.get(component)!;
    }
    cur.topLevel.push(fileName);
  });
  return result;
}

function NotFound() {
  return (
    <div>
      <h1>Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>Go back to the <a href="/" style={{ color: 'blue' }}>home page</a>.</p>
    </div>
  );
}

import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollManager() {
  const { pathname, search, hash } = useLocation();
  const navType = useNavigationType(); // "PUSH" | "REPLACE" | "POP"

  useEffect(() => {
    // Back/forward: keep browser-like behavior
    if (navType === "POP") return;

    // Hash links: let the browser scroll to the anchor
    if (hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, search, hash, navType]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <GlobalContextProviders>
        <Routes>
          {toElement({ trie: buildLayoutTrie({
"./pages/about.tsx": PageLayout_0,
"./pages/_index.tsx": PageLayout_1,
"./pages/for-you.tsx": PageLayout_2,
"./pages/pricing.tsx": PageLayout_3,
"./pages/terms.tsx": PageLayout_4,
"./pages/privacy.tsx": PageLayout_5,
"./pages/bookshots.tsx": PageLayout_6,
"./pages/faq.tsx": PageLayout_7,
}), fileNameToRoute, makePageRoute })} 
          <Route path="/bookshots/:slug" element={<BookShotPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </GlobalContextProviders>
    </BrowserRouter>
  );
}
