import type { FeatureDemoConfig } from "./FeatureDemo";

/**
 * Content for the ladder's interactive demos. Keyed by the `demo` field on the
 * matching rung in pages/_index.tsx.
 *
 * Each feature carries several highlights so a reader can hit "Try another"
 * and see the same feature working across very different kinds of book —
 * literature, history, medicine — which is the point the ladder is making.
 */
export type FeatureDemoId = "smart-dictionary" | "unpack" | "synthesis";

export const FEATURE_DEMOS: Record<FeatureDemoId, FeatureDemoConfig> = {
  "smart-dictionary": {
    label: "Smart Dictionary",
    sheetTitle: "Smart Dictionary",
    triggerLabel: "Try interactive demo",
    switchLabel: "Try another highlight",
    layout: "highlight",
    targetKind: "word",
    examples: [
      {
        book: "On the Genealogy of Morals",
        byline: "Book by Friedrich Nietzsche",
        counter: "37 of 89",
        location: "Location. 112",
        quote: "This rabid mendaciousness and rage of 'noble' Pharisees.",
        word: "mendaciousness",
        body: `Mendaciousness — the habit of being untruthful and deceitful.

Nietzsche uses it to strip the pious mask off those he critiques: their “moral superiority” is really a calculated deception, weakness and resentment disguised as righteousness.`,
      },
      {
        book: "1984",
        byline: "Book by George Orwell",
        counter: "22 of 76",
        location: "Location. 341",
        quote:
          "Who controls the past controls the future. Who controls the present controls the past.",
        word: "controls the past",
        body: `To control the past is to possess the authority or power to manipulate, alter, or suppress historical records, collective memory, and the established narrative of prior events to suit current objectives. This concept suggests that truth is not an objective reality but a malleable construct defined by those currently in command of information and archival history. By reframing history to align with their ideology, those in power ensure that the foundations of society serve their specific vision.

In this passage, the phrase highlights how a totalitarian regime maintains absolute dominance. The Party understands that if it can erase or rewrite historical events, it effectively eliminates any standard of comparison or independent thought. By convincing the populace that the Party was always right and that previous conditions were always worse, the leadership traps people in a perpetual state of subservience. If you lose your grip on what actually happened, you lose the ability to imagine a different future.`,
      },
      {
        book: "India's Struggle for Independence",
        byline: "Book by Bipan Chandra",
        counter: "58 of 143",
        location: "Location. 907",
        quote:
          "The Rowlatt Act gave the government enormous powers to repress political activities, and allowed detention of political prisoners without trial for two years.",
        word: "Rowlatt Act",
        body: `The Rowlatt Act, officially known as the Anarchical and Revolutionary Crimes Act of 1919, was a legislative measure passed by the Imperial Legislative Council of British India. This law empowered the colonial government to curtail civil liberties by allowing the arrest and detention of individuals suspected of sedition without a warrant. It also authorized the trial of political cases by special benches without juries, effectively suspending the right of habeas corpus and legal representation for those accused of revolutionary activities.

In the context of this passage, the act represents the harsh tools the British used to crush the growing Indian freedom movement. By allowing the government to lock up political activists for two years without a fair trial or a judge's oversight, the colonial authorities essentially stripped Indians of their legal rights to protest or organize. This legislation was a turning point that fueled widespread public anger and deepened the divide between the Indian people and the British administration.`,
      },
      {
        book: "Essentials of Medical Pharmacology",
        byline: "Book by K.D. Tripathi",
        counter: "104 of 210",
        location: "Location. 2,418",
        quote:
          "Metformin acts primarily by reducing hepatic glucose output and enhancing insulin sensitivity in peripheral tissues, particularly skeletal muscle, without stimulating insulin secretion.",
        word: "hepatic glucose output",
        body: `Hepatic glucose output refers to the amount of glucose released into the bloodstream by the liver. Under normal physiological conditions, the liver maintains blood sugar levels by producing glucose through two primary metabolic pathways: glycogenolysis, which is the breakdown of stored glycogen, and gluconeogenesis, which is the synthesis of new glucose from non-carbohydrate sources like amino acids and glycerol.

In the context of this passage, the term describes how the liver contributes to high blood sugar levels in patients with diabetes. Usually, the liver keeps pumping out sugar into the blood even when it is not needed. Metformin works by telling the liver to slow down this production process. By reducing this output, the drug helps keep blood sugar levels from rising too high after a meal or during periods of fasting, effectively lowering the overall glucose load in the body without forcing the pancreas to work harder to produce more insulin.`,
      },
    ],
  },

  unpack: {
    label: "Unpack",
    sheetTitle: "Unpack",
    triggerLabel: "Try interactive demo",
    switchLabel: "Try another highlight",
    layout: "highlight",
    // Unpack works on the whole highlight, so the target is the ✦ key rather
    // than a word — matching the app, where ✦ sits under the card.
    targetKind: "actionKey",
    examples: [
      {
        book: "Sapiens",
        byline: "Book by Yuval Noah Harari",
        counter: "19 of 97",
        location: "Location. 604",
        quote:
          "The Agricultural Revolution was history's biggest fraud. Who was responsible? Neither kings, nor priests, nor merchants. The culprits were a handful of plant species, including wheat, rice and potatoes. These plants domesticated Homo sapiens, rather than vice versa.",
        body: `The idea here is that we usually think of humans as the active agents who deliberately chose to farm—smart decision-makers improving our lives. But Harari flips this: wheat and rice essentially “tricked” us into serving them. These plants thrived by making themselves useful to us, so we spread them everywhere and reorganized our entire lives around growing them. We didn't domesticate the plants; they domesticated us.

This matters because it challenges how we see human progress and agency. We celebrate agriculture as humanity's great achievement, but Harari suggests we may have traded genuine freedom for illusion. Farming meant more people, but also more disease, harder labor, and less leisure than hunter-gatherers had. The plants benefited enormously while we got caught in a trap we couldn't see.

Think of it like a company's app that promises to make your life easier, so you use it constantly—until you realize you're addicted and it controls your schedule. The app “won” by making itself indispensable, even though you thought you were choosing it.`,
      },
      {
        book: "Essentials of Medical Pharmacology",
        byline: "Book by K.D. Tripathi",
        counter: "104 of 210",
        location: "Location. 2,418",
        quote:
          "Metformin acts primarily by reducing hepatic glucose output and enhancing insulin sensitivity in peripheral tissues, particularly skeletal muscle, without stimulating insulin secretion.",
        body: `Metformin works through two main mechanisms: it tells your liver to produce less glucose (the primary effect), and it makes your body's cells—especially muscles—more responsive to the insulin already circulating in your blood. The key distinction is that it doesn't push your pancreas to make more insulin, unlike some other diabetes drugs.

This matters because it reduces the risk of low blood sugar episodes and weight gain, which are common side effects of insulin-stimulating medications. It's also why metformin is often the first-line treatment for type 2 diabetes—gentler on your system while still controlling glucose effectively.

Think of it like improving a locked door's mechanism rather than shouting louder at it: instead of forcing your pancreas to produce more insulin (shouting), metformin makes the lock on your cells' doors easier to open so existing insulin works better. This gentler approach is why patients tolerate it well long-term.`,
      },
      {
        book: "Guns, Germs, and Steel",
        byline: "Book by Jared Diamond",
        counter: "8 of 118",
        location: "Location. 193",
        quote:
          "History followed different courses for different peoples because of differences among peoples' environments, not because of biological differences among peoples themselves.",
        body: `The core argument here is that geography—climate, terrain, available plants and animals—shaped which societies developed technology, agriculture, and organized civilizations, not inherent traits of different human groups. Diamond is directly challenging the idea that some populations were naturally more intelligent or capable than others.

This matters because it overturns a dangerous myth that justified colonialism and racism for centuries. If success comes from environment rather than biology, then differences in power and development between societies are accidents of location, not proof of superiority. It's a foundational rebuttal to biological determinism.

Think of it this way: domesticable crops like wheat thrived in the Fertile Crescent, allowing people there to settle, specialize, and build cities—while societies in regions without such crops developed differently, not worse. The same human brain existed everywhere; what differed was what the land offered.`,
      },
      {
        book: "Meditations",
        byline: "Book by Marcus Aurelius",
        counter: "12 of 64",
        location: "Location. 288",
        quote:
          "The impediment to action advances action. What stands in the way becomes the way.",
        body: `Marcus Aurelius is pointing to something counterintuitive: obstacles aren't detours around your goal—they're often the direct path to it. When you face resistance, you're forced to develop new skills, creativity, or resilience you wouldn't have needed otherwise.

The practical twist is that this only works if you stop seeing the obstacle as a problem to avoid and start treating it as material to work with. A writer facing rejection learns to revise. An athlete dealing with an injury discovers different training methods. The barrier itself teaches you something the smooth road never would.

This reframes how you approach difficulty. Instead of asking “How do I get around this?” you ask “What does this obstacle demand of me?” That shift in perspective transforms frustration into a resource. The constraint becomes the thing that shapes and strengthens you—sometimes in ways that matter more than the original goal itself.`,
      },
    ],
  },

  synthesis: {
    label: "Synthesis",
    sheetTitle: "Synthesis",
    triggerLabel: "Read the summaries",
    // Synthesis is book-level, so it gets its own screen rather than a panel
    // over a highlight card: title and author at the top, then the summary.
    layout: "summary",
    caption: "One summary · 3 of 6 lenses",
    /** How many lenses the app actually offers; the demo carries three. */
    lensTotal: 6,
    examples: [
      {
        book: "Chop Wood Carry Water",
        byline: "Book by Joshua Medcalf",
        counter: "1 of 47",
        location: "Location. 96",
        quote:
          "The only thing that is truly significant about today, or any other day, is who you become in the process.",
        tabLabel: "General",
        title: "Your Map of Becoming Great",
        body: `Your highlights reveal a reader fixated on one essential paradox: greatness lies entirely in the process, yet we're culturally wired to obsess over outcomes. You've marked passages that show how to rewire that obsession—and what happens when you do.

#### Who you become matters infinitely more than what you achieve

The foundational idea threading through your highlights is that the destination is almost irrelevant. “The only thing that is truly significant about today, or any other day, is who you become in the process.” You're building your own house regardless of whether you're selling matchsticks or launching companies. This reframes success entirely—it's not about the goal, it's about the character forged along the way. The seductive part is that this isn't resignation. By focusing on character over outcomes, you actually perform better, but that's secondary. The real win is internal.

#### Faithfulness to small, boring work is the actual gateway

You highlighted a central tension: everyone wants to be great, but “few are willing to faithfully chop wood, carry water.” The problem isn't ambition—it's that “the problem with small is that it isn't sexy, and it's often repetitively boring.” You've marked the reality that “everyone wants to become a samurai warrior, but few are willing to faithfully do what greatness requires.” There's no shortcut. The formula you emphasized is simple but brutal: “Dream BIG. Start small. Be ridiculously faithful.” The book argues that surrender to small, unglamorous work is where actual power lives.

#### Surrender the outcome; that's when you become unstoppable

You've isolated what might be the book's most counterintuitive claim: the person most likely to succeed is the one who has already accepted failure. “It is the one who has surrendered the outcome who has the greatest chance of success.” When you stop gripping the result, you're freed to be fully present, to trust your training, to actually think clearly. “Until you surrender the outcome, you will always be the greatest enemy to your own success.” This isn't passivity—it's the difference between trying so hard you choke and being so committed to the process that the outcome takes care of itself.

#### Stop treating life like a test; start treating it like growth

You marked a subtle but transformative shift in perspective: “The secret is to understand that nothing is a test, but only an opportunity to learn and grow.” When you see a situation as a test, you optimize for passing. When you see it as growth, you optimize for learning—a different nervous system entirely. This connects to your highlight about discouragement being the tool that defeats people. If you're treating everything as pass/fail, discouragement becomes your enemy. If you're treating it as data for growth, discouragement is just information.

#### Your scorecard needs to measure character, not achievement

You've marked the practical tool: grade yourself twice daily on your most important characteristics—not on wins and losses. “I want you to grade yourself around the middle of the day on the things that you have said are the most important characteristics for living a truly successful life.” Your highlights show that what you watch, read, listen to, who you surround yourself with, and how you talk to yourself directly fuel your heart. These are the controllables. Outcomes aren't. So measure the inputs, not the outputs.

#### Principles protect you; feelings will betray you

The book argues that living by feelings is “like riding an emotional rollercoaster,” and you've clearly absorbed this. “At the end of your feelings is nothing. But at the end of every principle is a promise.” When you commit to a set of principles—regardless of how you feel on any given day—you create a container that holds you steady. “When you make the choice to live by a certain set of principles, it will not only protect you from your feelings, it will allow you to step into your greatest potential.” This is freedom disguised as constraint.

#### A mission is more powerful than a goal because only you can stop you

You highlighted a distinction that changes everything: “Goals actually allow you to shirk responsibility. But a mission? Only the person in the mirror can stop you from living that out.” A goal can be abandoned. A mission is structural—it's who you are, not what you're trying to do. And crucially, “a mission will make you think beyond the moment, which is greatly important because the only thing that is significant about the moment is who you become in the process.” This connects back to your opening highlights. Everything in this book circles back to character formation.

#### Your environment either elevates or drowns you

You've marked the image of crabs in a bucket pulling each other down as we live “in a society of crabs.” Society teaches conformity from early on—“sit down, shut up, get in line”—and it actively punishes those trying to escape. “Comparison is the thief of all joy, and the grass isn't greener on the other side. The grass is greener where you water it.” The implication is stark: you have to protect your own development from a culture designed to keep you small. Who you surround yourself with directly fuels your heart, so this isn't optional.`,
      },
      {
        book: "Chop Wood Carry Water",
        byline: "Book by Joshua Medcalf",
        counter: "1 of 47",
        location: "Location. 96",
        quote:
          "The only thing that is truly significant about today, or any other day, is who you become in the process.",
        tabLabel: "First and Last",
        title: "First and Last",
        body: `**First highlight**

“The only thing that is truly significant about today, or any other day, is who you become in the process. Each of us are building our own house.”

**Last highlight**

“The difference between a pest and a guest is an invitation.”

---

The reader arrived seeking understanding of personal transformation—how character builds through daily action—and closed on a question of belonging and boundary. The journey between them traces a shift from *internal* architecture (who you become) to *relational* awareness (who gets to stay).

The first highlight asks: what am I building? The last asks: what space am I creating, and for whom? One is solitary construction. One is about permission and presence. They're not the same question. The reader didn't return to the starting point. They moved deeper into what transformation requires—not just the building itself, but the responsibility of inviting others into it.`,
      },
      {
        book: "Chop Wood Carry Water",
        byline: "Book by Joshua Medcalf",
        counter: "1 of 47",
        location: "Location. 96",
        quote:
          "The only thing that is truly significant about today, or any other day, is who you become in the process.",
        tabLabel: "The Outlier",
        title: "The Outlier",
        body: `Most of your highlights trace a unified thread: process over outcome, principles over feelings, building character through unglamorous work, surrendering control. They're cohesive. They belong to the same book you came to read.

Then there's this: *“You can go chase a dream, but then sometimes you look back and there's a trail of tears behind you. And the tears are usually your wife and kids.”*

It stands apart—more cautionary than inspirational, more personal than philosophical. While everything else teaches you how to become great, this one whispers what you might lose in the becoming. It's the only highlight that seems to ask: *at what cost?*

Why did it survive your page?`,
      },
      {
        book: "Chop Wood Carry Water",
        byline: "Book by Joshua Medcalf",
        counter: "1 of 47",
        location: "Location. 96",
        quote:
          "The only thing that is truly significant about today, or any other day, is who you become in the process.",
        tabLabel: "What You Were Tracking",
        title: "What You Were Tracking",
        body: `You kept stopping for one thing: the gap between who you want to become and what you're actually willing to do about it. Not the inspirational version of that gap—the painful one. “Everyone wants to be great, until it's time to do what greatness requires.” You highlighted it. You also highlighted the matchstick door-to-door selling, the chopping wood, the “ridiculously faithful” small work that bores people. These weren't separate ideas to you; they were the same idea hitting you from different angles, and it was landing. You were watching yourself in these passages.

But there's a second current running through what you saved: you were hunting for a different scorecard. Your own scorecard. The book kept offering you one—grade yourself twice daily on boldness, courage, loving, resourcefulness, persistence—and you kept it. Yet you also pulled out “Your value comes from who you are, not from what you do” and “Nothing is a test, it's only an opportunity to learn and grow.” You were reaching for permission to stop measuring yourself against outcomes entirely. To stop being tested. To surrender the outcome, as the book keeps saying, which you highlighted more than once. What you were really tracking wasn't a process for becoming great—it was a way to want something without being destroyed by wanting it. A way to care and not care simultaneously.

The passage about crabs pulling each other down, about schools teaching you to color inside the lines—that one mattered to you too. Freedom and constraint, both called out. And then this: “the difference between a pest and a guest is an invitation.” You were asking: Who gets to invite me into this chase? Who gave me permission to want what I want? Because somewhere in your highlights, you're also the person asking whether the trail of tears behind you belongs to people you love.

## Where It Lands

There's a real collision between **Chop Wood Carry Water** and **Atomic Habits**. Both books talk about small, repeated actions building toward something larger, but you highlighted something in Medcalf that directly sharpens what James Clear was arguing: the scoreboard matters. Clear talks about measuring the right things. Medcalf goes harder—he's saying you can measure yourself twice a day on your values, not your results. That's the completion. Habits are small and unsexy. Medcalf confirms it and gives you a tool to stop hating yourself for doing them. He gives the daily grading system that turns the boredom into feedback.

## The Verdict

You stopped partway through because you already got what you came for. The core insight—that greatness is process, not destination, and that you must surrender outcomes while staying relentlessly faithful to principles—that landed. You saved it multiple times because it was working on you. You don't need to finish this book. You need to start living what you highlighted. The book's job was to convince you that small, boring work matters and that your character matters more than your results. It did that. The pages after where you stopped are likely deeper applications of ideas you already understand. You have enough. Close it, and start grading yourself on what you actually decided matters.`,
      },
    ],
  },
};
