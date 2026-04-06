/**
 * Build-time script to fetch all bookshots from Supabase
 * and write them as a static JSON file.
 *
 * Usage: npx tsx scripts/fetch-bookshots.ts
 */

const SUPABASE_URL = "https://udeemisckydksetopkqn.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkZWVtaXNja3lka3NldG9wa3FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU3NTkwNjksImV4cCI6MjAyMTMzNTA2OX0.TgAOVa2i8-aQ90breoedz4DR4Rt9JZ9i6yqB6s-ngCc";

interface BookShot {
  id: number;
  title: string;
  author: string;
  image: string;
  content: string;
  audio: string;
  url: string;
  category: string;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

async function main() {
  console.log("Fetching bookshots from Supabase...");

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/bookshots?select=*&order=id.asc`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Supabase fetch failed: ${res.status} ${res.statusText}`);
  }

  const rows: BookShot[] = await res.json();
  console.log(`Fetched ${rows.length} bookshots.`);

  const books = rows.map((row) => ({
    id: row.id,
    slug: slugify(row.title),
    title: row.title,
    author: row.author.trim(),
    image: row.image,
    content: row.content,
    audio: row.audio,
    url: row.url,
    category: row.category,
  }));

  // Check for duplicate slugs and disambiguate
  const slugCount = new Map<string, number>();
  for (const book of books) {
    const count = slugCount.get(book.slug) || 0;
    if (count > 0) {
      book.slug = `${book.slug}-${count + 1}`;
    }
    slugCount.set(book.slug, count + 1);
  }

  const fs = await import("fs");
  const path = await import("path");
  const outPath = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    "..",
    "data",
    "bookshots.json"
  );

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(books, null, 2));
  console.log(`Written to ${outPath}`);

  // Print summary
  const categories = new Map<string, number>();
  for (const b of books) {
    categories.set(b.category, (categories.get(b.category) || 0) + 1);
  }
  for (const [cat, count] of categories) {
    console.log(`  ${cat}: ${count} books`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
