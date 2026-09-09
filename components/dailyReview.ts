/**
 * Content for the Daily Review demo.
 *
 * The real feature picks 15 highlights at random, notifies the reader at their
 * chosen time, and ends the session by turning one of them into a Wisdom Spark.
 * These 15 are a fixed stand-in for that day's draw.
 */

export interface ReviewHighlight {
  quote: string;
  book: string;
  author: string;
}

export const REVIEW_HIGHLIGHTS: ReviewHighlight[] = [
  {
    quote:
      "Well, the first rule is that you can't really know anything if you just remember isolated facts and try and bang 'em back. If the facts don't hang together on a latticework of theory, you don't have them in a usable form. You've got to have models in your head. And you've got to array your experience both vicarious and direct on this latticework of models.",
    book: "The Great Mental Models Volume 1",
    author: "Shane Parrish and Rhiannon Beaubien",
  },
  {
    quote: "Keep your eyes wide open before marriage and half shut thereafter.",
    book: "University of Berkshire Hathaway",
    author: "Daniel Pecaut and Corey Wrenn",
  },
  {
    quote:
      "The second type of failure the philosophers call ineptitude—because in these instances the knowledge exists, yet we fail to apply it correctly.",
    book: "The Checklist Manifesto",
    author: "Atul Gawande",
  },
  {
    quote: "A large cocktail party often functions as a kind of gallery for the exhibition of pastimes.",
    book: "Games People Play",
    author: "Eric Berne",
  },
  {
    quote:
      "Faulty memory and distraction are a particular danger in what engineers call all-or-none processes: whether running to the store to buy ingredients for a cake, preparing an airplane for takeoff, or evaluating a sick person in the hospital, if you miss just one key thing, you might as well not have made the effort at all.",
    book: "The Checklist Manifesto",
    author: "Atul Gawande",
  },
  {
    quote: "The first flaw is perspective. We have a hard time seeing any system that we are in.",
    book: "The Great Mental Models Volume 1",
    author: "Shane Parrish and Rhiannon Beaubien",
  },
  {
    quote:
      "Nice Guys are dishonest. These men hide their mistakes, avoid conflict, say what they think people want to hear, and repress their feelings.",
    book: "No More Mr. Nice Guy",
    author: "Robert A. Glover",
  },
  {
    quote:
      "Goals actually allow you to shirk responsibility. But a mission? Only the person in the mirror can stop you from living that out.",
    book: "Chop Wood Carry Water",
    author: "Joshua Medcalf",
  },
  {
    quote:
      "He had become so completely absorbed in himself, and isolated from his fellows that he dreaded meeting, not only his landlady, but anyone at all.",
    book: "Crime and Punishment",
    author: "Fyodor Dostoyevsky",
  },
  {
    quote:
      "Non-monopolists exaggerate their distinction by defining their market as the intersection of various smaller markets:",
    book: "Zero to One",
    author: "Blake Masters and Peter Thiel",
  },
  {
    quote:
      "It is the purpose of this book to explain the structure of the mechanism which controls the public mind, and to tell how it is manipulated by the special pleader who seeks to create public acceptance for a particular idea or commodity.",
    book: "Propaganda",
    author: "Edward L. Bernays",
  },
  {
    quote:
      "although Brahmins were merely 5 per cent of the population, in the 1880s they constituted 80 per cent of all university students and graduates.",
    book: "Makers of Modern India",
    author: "Ramachandra Guha",
  },
  {
    quote:
      "Beneath this facade of needlessness and wantlessness, all Nice Guys are actually extremely needy. Consequently, when they go about trying to get their needs met, Nice Guys are frequently indirect, unclear, manipulative, and controlling.",
    book: "No More Mr. Nice Guy",
    author: "Robert A. Glover",
  },
  {
    quote:
      "Modern propaganda is a consistent, enduring effort to create or shape events to influence the relations of the public to an enterprise, idea or group.",
    book: "Propaganda",
    author: "Edward L. Bernays",
  },
  {
    quote:
      "impressions are the main sources of the explicit beliefs and deliberate choices of System 2. They're the spring that feeds the river. We react emotionally (System 1) to a suggestion or question. Then that System 1 reaction informs and in effect creates the System 2 answer. Now think about that: under this model, if you know how to affect your counterpart's System 1 thinking, his inarticulate feelings, by how you frame and deliver your questions and statements, then you can guide his System 2 rationality and therefore modify his responses.",
    book: "Never Split the Difference",
    author: "Chris Voss and Tahl Raz",
  },
];

/** The highlight the review ends on, drawn from the fifteen above. */
export const WISDOM_SPARK = {
  quote:
    "Non-monopolists exaggerate their distinction by defining their market as the intersection of various smaller markets:",
  book: "Zero to One",
  author: "Blake Masters and Peter Thiel",
  body: [
    "This sentence quietly describes a sleight of hand that isn't really about markets at all—it's about linguistic framing as power. Google doesn't say it competes in search; it says it's the intersection of information retrieval, advertising, and artificial intelligence. Suddenly it sounds unique and inevitable rather than dominant.",
    "What's fascinating is how this mirrors a technique Edward Bernays documented in propaganda: controlling perception by controlling the categories themselves. If you define the boundaries of the conversation, you control what looks true. A company using intersection-speak isn't lying—it's simply choosing which smaller markets to emphasize, which ones to ignore, and which combination makes them look like the only logical solution.",
    "The buyer hears “intersection” and feels like they're being precise and analytical. They rarely ask: why these particular markets and not others? Which competing combinations were deliberately left out?",
  ],
};

/** Distinct books across the day's fifteen — derived, so it can't fall stale. */
export const REVIEW_BOOK_COUNT = new Set(REVIEW_HIGHLIGHTS.map((h) => h.book)).size;
