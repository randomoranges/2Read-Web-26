import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styles from "./bookshots.module.css";
import allBooks from "../data/bookshots.json";
import type { BookShot } from "../data/bookshots.d.ts";

const books: BookShot[] = allBooks as BookShot[];

const CATEGORIES = [
  "All",
  "Business and Finance",
  "Personal Development and Success",
  "Health and Wellness",
  "Philosophy and Wisdom",
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "BookShots — In-Depth Book Summaries | 2Read",
  description:
    "Explore in-depth summaries of the world's best non-fiction books. Read or listen — each BookShot distills a book into its most powerful ideas.",
  url: "https://2read.app/bookshots",
  publisher: { "@type": "Organization", name: "2Read" },
};

export default function BookShotsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? books
        : books.filter((b) => b.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>BookShots — In-Depth Book Summaries | 2Read</title>
        <meta
          name="description"
          content="Explore in-depth summaries of the world's best non-fiction books. Read or listen — each BookShot distills a book into its most powerful ideas."
        />
        <link rel="canonical" href="https://2read.app/bookshots" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          ← Back to Home
        </Link>

        {/* Hero */}
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Book<span className={styles.heroAccent}>Shots</span>
          </h1>
          <p className={styles.heroDescription}>
            In-depth summaries of the world's best non-fiction books. Each
            BookShot distills a book into its most powerful ideas — read or
            listen, in minutes.
          </p>
        </div>

        {/* Category Tabs */}
        <div className={styles.categoryTabs}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.categoryTab} ${
                activeCategory === cat ? styles.categoryTabActive : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === "All" ? `All (${books.length})` : cat}
            </button>
          ))}
        </div>

        {/* Book Grid */}
        {filtered.length === 0 ? (
          <div className={styles.emptyState}>No books found.</div>
        ) : (
          <div className={styles.bookGrid}>
            {filtered.map((book) => (
              <Link
                key={book.id}
                to={`/bookshots/${book.slug}`}
                className={styles.bookCard}
              >
                <div className={styles.bookImageWrapper}>
                  <img
                    src={book.image}
                    alt={book.title}
                    className={styles.bookImage}
                    loading="lazy"
                  />
                </div>
                <div className={styles.bookInfo}>
                  <span className={styles.bookCategoryBadge}>
                    {book.category}
                  </span>
                  <h3 className={styles.bookTitle}>{book.title}</h3>
                  <p className={styles.bookAuthor}>{book.author}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
