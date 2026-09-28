import "server-only";

import { db } from "@/lib/db";
import { bookmark, checkIn, journalEntry, practiceSession } from "@/lib/db/schema";
import type { Emotion } from "@/lib/somatic/emotions";
import type { Sensation } from "@/lib/somatic/types";

type SeedCheckIn = {
  daysAgo: number;
  hour: number;
  feeling: string;
  emotions: Emotion[];
  before: Sensation;
  after: Sensation | null;
  journal?: { title: string; body: string; prompt?: string };
};

/**
 * Two weeks in the life of a guest: a stressful launch at work, a hard phone
 * call, and a slow return to steadier days. Enough texture for insights to mean something.
 */
const story: SeedCheckIn[] = [
  {
    daysAgo: 15,
    hour: 21,
    feeling: "Wired after a long day. Can't switch off.",
    emotions: ["restless", "tired"],
    before: { region: "chest", color: "#e11d48", shape: "knot", texture: "tingly", intensity: 7 },
    after: { region: "chest", color: "#db2777", shape: "ball", texture: "soft", intensity: 5 },
  },
  {
    daysAgo: 14,
    hour: 8,
    feeling: "Launch week. Stomach in knots before standup.",
    emotions: ["anxious", "overwhelmed"],
    before: { region: "stomach", color: "#f59e0b", shape: "knot", texture: "prickly", intensity: 8 },
    after: { region: "stomach", color: "#f59e0b", shape: "cloud", texture: "grainy", intensity: 6 },
    journal: {
      title: "Before the launch",
      prompt: "What is the feeling trying to protect?",
      body: "The knot is doing its best to keep me alert. It thinks if I stay tense I won't miss anything. I noticed it loosened when I let my exhale be longer than my inhale.\n\nThings I can actually control today: the checklist, my lunch break, closing the laptop at seven.",
    },
  },
  {
    daysAgo: 12,
    hour: 13,
    feeling: "Tight jaw all morning. Snapped at someone in a meeting.",
    emotions: ["frustrated", "ashamed"],
    before: { region: "face", color: "#c2410c", shape: "band", texture: "rough", intensity: 7 },
    after: { region: "shoulders", color: "#c2410c", shape: "band", texture: "smooth", intensity: 5 },
  },
  {
    daysAgo: 11,
    hour: 22,
    feeling: "Heavy. Hard phone call with Mum.",
    emotions: ["sad", "lonely"],
    before: { region: "throat", color: "#1d4ed8", shape: "stone", texture: "heavy", intensity: 8 },
    after: { region: "chest", color: "#38bdf8", shape: "cloud", texture: "fluid", intensity: 6 },
    journal: {
      title: "The lump in my throat",
      prompt: "If this feeling could speak, what would it say?",
      body: "It would say: I wanted her to ask how I was. That's all.\n\nWhen I stayed with it, the stone in my throat moved down into my chest and got softer, more like water. I cried a bit. It passed faster than I expected.",
    },
  },
  {
    daysAgo: 10,
    hour: 7,
    feeling: "Slept badly. Numb.",
    emotions: ["numb", "tired"],
    before: { region: "whole-body", color: "#78716c", shape: "cloud", texture: "heavy", intensity: 5 },
    after: null,
  },
  {
    daysAgo: 9,
    hour: 18,
    feeling: "Launch went out. Relief, but my shoulders are up by my ears.",
    emotions: ["excited", "tired"],
    before: { region: "shoulders", color: "#facc15", shape: "band", texture: "prickly", intensity: 6 },
    after: { region: "shoulders", color: "#facc15", shape: "wave", texture: "soft", intensity: 3 },
  },
  {
    daysAgo: 8,
    hour: 9,
    feeling: "Better. A bit flat.",
    emotions: ["calm", "tired"],
    before: { region: "chest", color: "#0f766e", shape: "ball", texture: "smooth", intensity: 3 },
    after: { region: "chest", color: "#0f766e", shape: "ball", texture: "soft", intensity: 2 },
  },
  {
    daysAgo: 6,
    hour: 20,
    feeling: "Irritated for no clear reason.",
    emotions: ["frustrated", "restless"],
    before: { region: "left-hand", color: "#e11d48", shape: "shard", texture: "tingly", intensity: 5 },
    after: { region: "left-hand", color: "#f59e0b", shape: "flutter", texture: "tingly", intensity: 3 },
    journal: {
      title: "Fizzing hands",
      body: "Hands buzzing like I'd had three coffees (I'd had one). Box breathing helped more than I wanted to admit. Went for a walk instead of scrolling.",
    },
  },
  {
    daysAgo: 5,
    hour: 12,
    feeling: "Lunch outside. Feeling okay.",
    emotions: ["content", "grateful"],
    before: { region: "chest", color: "#84cc16", shape: "cloud", texture: "soft", intensity: 2 },
    after: { region: "chest", color: "#84cc16", shape: "cloud", texture: "soft", intensity: 2 },
  },
  {
    daysAgo: 4,
    hour: 22,
    feeling: "Sunday scaries.",
    emotions: ["anxious"],
    before: { region: "stomach", color: "#7c3aed", shape: "flutter", texture: "fluid", intensity: 6 },
    after: { region: "stomach", color: "#7c3aed", shape: "wave", texture: "fluid", intensity: 4 },
  },
  {
    daysAgo: 3,
    hour: 8,
    feeling: "Nervous about the retro, but steadier than last week.",
    emotions: ["anxious", "hopeful"],
    before: { region: "stomach", color: "#f59e0b", shape: "flutter", texture: "grainy", intensity: 5 },
    after: { region: "stomach", color: "#facc15", shape: "ball", texture: "soft", intensity: 3 },
  },
  {
    daysAgo: 2,
    hour: 19,
    feeling: "Tired in a good way. Went climbing.",
    emotions: ["content", "tired"],
    before: { region: "right-arm", color: "#0f766e", shape: "wave", texture: "heavy", intensity: 3 },
    after: { region: "right-arm", color: "#38bdf8", shape: "wave", texture: "soft", intensity: 2 },
  },
  {
    daysAgo: 1,
    hour: 21,
    feeling: "Grateful. Long dinner with friends.",
    emotions: ["connected", "grateful"],
    before: { region: "chest", color: "#db2777", shape: "ball", texture: "soft", intensity: 2 },
    after: { region: "chest", color: "#f59e0b", shape: "ball", texture: "soft", intensity: 1 },
    journal: {
      title: "A warm chest",
      prompt: "What helped today, even a little?",
      body: "Warmth in my chest, like a mug of tea. Laughing until my stomach hurt. Two weeks ago I would not have believed this was the same body.",
    },
  },
];

const standaloneJournal = {
  daysAgo: 7,
  title: "What I want to remember",
  body: "Feelings are weather. The knot in my stomach before a big day is not a verdict on whether I can handle it.\n\nThree things that help: longer exhales, a walk without my phone, telling one person the truth about how I'm doing.",
};

function at(daysAgo: number, hour: number, minute = 12) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - daysAgo);
  date.setUTCHours(hour, minute, 0, 0);
  return date;
}

export async function seedDemoData(userId: string) {
  await db.transaction(async (tx) => {
    for (const [index, item] of story.entries()) {
      const createdAt = at(item.daysAgo, item.hour, (index * 7) % 60);
      const [row] = await tx
        .insert(checkIn)
        .values({
          userId,
          feeling: item.feeling,
          emotions: item.emotions,
          before: item.before,
          after: item.after,
          intensityBefore: item.before.intensity,
          intensityAfter: item.after?.intensity ?? null,
          breathingRounds: index % 3 === 0 ? 2 : 3,
          completedBodyScan: index % 4 !== 1,
          durationSeconds: 180 + index * 17,
          createdAt,
        })
        .returning({ id: checkIn.id });

      if (item.journal && row) {
        const written = new Date(createdAt.getTime() + 6 * 60 * 1000);
        await tx.insert(journalEntry).values({
          userId,
          checkInId: row.id,
          title: item.journal.title,
          body: item.journal.body,
          prompt: item.journal.prompt ?? null,
          createdAt: written,
          updatedAt: written,
        });
      }
    }

    const written = at(standaloneJournal.daysAgo, 10);
    await tx.insert(journalEntry).values({
      userId,
      title: standaloneJournal.title,
      body: standaloneJournal.body,
      createdAt: written,
      updatedAt: written,
    });

    // A little practice between check-ins: breathing most days, grounding when anxious.
    await tx.insert(practiceSession).values(
      [
        { daysAgo: 14, hour: 8, kind: "breathing", pattern: "box", minutes: 3, feltAfter: "calmer" },
        { daysAgo: 12, hour: 13, kind: "grounding", pattern: null, minutes: 2, feltAfter: "calmer" },
        { daysAgo: 11, hour: 22, kind: "breathing", pattern: "relax", minutes: 5, feltAfter: "calmer" },
        { daysAgo: 9, hour: 18, kind: "body-scan", pattern: null, minutes: 2, feltAfter: "same" },
        { daysAgo: 6, hour: 20, kind: "breathing", pattern: "sigh", minutes: 1, feltAfter: "calmer" },
        { daysAgo: 4, hour: 22, kind: "breathing", pattern: "relax", minutes: 5, feltAfter: "calmer" },
        { daysAgo: 3, hour: 8, kind: "calm", pattern: "exhale", minutes: 2, feltAfter: "calmer" },
        { daysAgo: 1, hour: 7, kind: "breathing", pattern: "coherent", minutes: 5, feltAfter: "unsure" },
      ].map((item) => ({
        userId,
        kind: item.kind,
        pattern: item.pattern,
        durationSeconds: item.minutes * 60,
        feltAfter: item.feltAfter,
        createdAt: at(item.daysAgo, item.hour, 30),
      })),
    );

    await tx
      .insert(bookmark)
      .values(
        ["felt-sense", "box-breathing", "window-of-tolerance"].map((slug, index) => ({
          userId,
          slug,
          createdAt: at(10 - index * 3, 12),
        })),
      )
      .onConflictDoNothing();
  });
}
