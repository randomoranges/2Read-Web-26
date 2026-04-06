import { useRef, useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import styles from "./bookshot.module.css";
import allBooks from "../data/bookshots.json";
import type { BookShot } from "../data/bookshots.d.ts";

const books: BookShot[] = allBooks as BookShot[];
const booksBySlug = new Map(books.map((b) => [b.slug, b]));

const SPEEDS = [1, 1.25, 1.5, 1.75, 2] as const;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function AudioPlayer({ book }: { book: BookShot }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speedIdx, setSpeedIdx] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  }, [playing]);

  const seek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      if (!audio || !duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      audio.currentTime = pct * duration;
    },
    [duration]
  );

  const cycleSpeed = useCallback(() => {
    const next = (speedIdx + 1) % SPEEDS.length;
    setSpeedIdx(next);
    if (audioRef.current) {
      audioRef.current.playbackRate = SPEEDS[next];
    }
  }, [speedIdx]);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className={styles.audioPlayer}>
      <audio ref={audioRef} src={book.audio} preload="metadata" />
      <div className={styles.playerInner}>
        <div className={styles.playerBookInfo}>
          <img
            src={book.image}
            alt={book.title}
            className={styles.playerCover}
          />
          <span className={styles.playerTitle}>{book.title}</span>
        </div>

        <div className={styles.playerControls}>
          <button
            className={styles.playButton}
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        <div className={styles.progressWrapper}>
          <span className={styles.timeDisplay}>{formatTime(currentTime)}</span>
          <div className={styles.progressBar} onClick={seek}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.timeDisplay}>
            {duration ? formatTime(duration) : "--:--"}
          </span>
        </div>

        <button className={styles.speedButton} onClick={cycleSpeed}>
          {SPEEDS[speedIdx]}x
        </button>
      </div>
    </div>
  );
}

export default function BookShotPage() {
  const { slug } = useParams<{ slug: string }>();
  const book = slug ? booksBySlug.get(slug) : undefined;

  if (!book) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <Link to="/bookshots" className={styles.backLink}>
            ← Back to BookShots
          </Link>
          <h1>Book not found</h1>
          <p>The summary you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${book.title} — Summary | 2Read BookShots`,
    description: `In-depth summary of "${book.title}" by ${book.author}. Read or listen to the key ideas from this book.`,
    url: `https://2read.app/bookshots/${book.slug}`,
    author: { "@type": "Person", name: book.author },
    publisher: { "@type": "Organization", name: "2Read" },
    image: book.image,
  };

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>{book.title} — Summary | 2Read BookShots</title>
        <meta
          name="description"
          content={`In-depth summary of "${book.title}" by ${book.author}. Read or listen to the key ideas from this book.`}
        />
        <link
          rel="canonical"
          href={`https://2read.app/bookshots/${book.slug}`}
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className={styles.container}>
        <Link to="/bookshots" className={styles.backLink}>
          ← Back to BookShots
        </Link>

        {/* Book Header */}
        <div className={styles.bookHeader}>
          <img
            src={book.image}
            alt={book.title}
            className={styles.bookCover}
          />
          <div className={styles.bookMeta}>
            <span className={styles.bookCategory}>{book.category}</span>
            <h1 className={styles.bookTitle}>{book.title}</h1>
            <p className={styles.bookAuthor}>by {book.author}</p>
            {book.url && (
              <a
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.buyLink}
              >
                Buy on Amazon →
              </a>
            )}
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Markdown Content */}
        <div className={styles.markdownContent}>
          <ReactMarkdown>{book.content}</ReactMarkdown>
        </div>
      </div>

      {/* Sticky Audio Player */}
      {book.audio && <AudioPlayer book={book} />}
    </div>
  );
}
