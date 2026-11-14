# English From Zero Arabic

Build a complete "learn English from zero" web app for Arabic speakers (Egyptian learner). UI language is Arabic (RTL layout, explanations in simple Arabic), learning content is English with Arabic translation. Mobile-first, modern, calm and friendly design (soft indigo/teal palette, rounded cards, large readable fonts, light and dark mode). Use a nice Arabic font (Cairo or Tajawal) for UI and a clean font for English text.

PHASE 1 SCOPE (this message): the full app shell + database + Level A1 with first 3 units fully filled with real content. Later phases will add more units and levels A2, B1, B2, C1, so the architecture must be fully data-driven (all content stored in the database, never hardcoded in components).

DATABASE (Supabase, enable it, with RLS):
- levels (id, code like A1/A2/B1/B2/C1, title_ar, title_en, description_ar, order_index)
- units (id, level_id, order_index, title_en, title_ar, description_ar, icon)
- vocabulary (id, unit_id, word, translation_ar, part_of_speech, example_en, example_ar, phonetic)
- sentences (id, unit_id, text_en, text_ar, note_ar)
- grammar_lessons (id, unit_id, title_ar, explanation_ar (markdown), examples jsonb)
- stories (id, unit_id, title_en, title_ar, body_en, body_ar)
- exercises (id, unit_id, story_id nullable, type: 'multiple_choice' | 'fill_blank' | 'word_order' | 'translate_choice' | 'listening', question, options jsonb, correct_answer, explanation_ar)
- quizzes (id, unit_id nullable, level_id nullable, kind: 'unit_test' | 'placement', title)
- user_progress (user_id, unit_id, section, completed, score, updated_at)
- user_vocab_review (user_id, vocab_id, box 1-5 for spaced repetition, next_review_at, correct_count, wrong_count)
- user_stats (user_id, xp, streak_days, last_active_date, current_level_id)
Content tables are publicly readable; user tables are readable/writable only by their owner. Add simple email+password authentication (Arabic labels) so progress is saved per user.

SCREENS:
1. Welcome/login/signup.
2. Placement test (20 mixed questions across A1-B1) that assigns starting level; user can skip and start from A1.
3. Home dashboard: greeting, current level, XP, daily streak, "continue learning" button, words-to-review count.
4. Levels & units map: path-style list of units per level, locked/unlocked/completed states (a unit unlocks after passing the previous unit test with 60%+).
5. Unit page with tabs/sections in order: الكلمات (Vocabulary) -> الجمل (Sentences) -> القواعد (Grammar) -> القصة (Story) -> التمارين (Exercises) -> الاختبار (Unit test).
6. Vocabulary: flip cards, speaker button that pronounces the English word using the browser Web Speech API (SpeechSynthesis, en-US), mark as known / needs review.
7. Sentences: list with speaker button and Arabic translation toggle.
8. Story: reader with sentence-level audio, toggle Arabic translation, then comprehension questions.
9. Exercises player: supports all exercise types, instant feedback (green/red), Arabic explanation after each answer, progress bar, XP awarded, retry wrong answers at the end. Listening type plays audio via SpeechSynthesis and asks user to choose/type what they heard.
10. Unit test: 10-15 questions mixed, score screen with pass/fail, celebrates success with a small animation.
11. Review center (Flashcards with spaced repetition boxes 1-5 using review dates) for words the user got wrong or marked as needing review.
12. Profile/stats page: XP, streak, completed units, words learned, accuracy chart.
13. Simple dictionary/search page over all learned vocabulary.

CONTENT TO SEED NOW (write real, high-quality content, correct English, accurate Egyptian-friendly Arabic):
Level A1 "المبتدئ" with 3 units:
- Unit 1: Greetings & Introductions (hello, goodbye, name, nice to meet you, how are you, etc.) + grammar: verb "to be" (I am / you are / he is...).
- Unit 2: Numbers, Days & Colors + grammar: a/an and plural nouns.
- Unit 3: Family & People + grammar: possessive adjectives (my, your, his, her) and "has/have".
Per unit seed at least: 15 vocabulary words with examples, 10 sentences, 1 grammar lesson in simple Arabic with examples, 1 short story (6-10 simple sentences) with Arabic translation, 15 exercises (mix of all types, with 3 comprehension questions tied to the story), and a unit test of 12 questions. Also create the 5 level records (A1, A2, B1, B2, C1) with Arabic titles/descriptions, with A2-C1 marked "قريباً" (coming soon) until they have units, and seed 20 placement test questions.

QUALITY: Everything in Arabic UI must be RTL and polished, with empty/loading/error states, smooth transitions, accessible contrast, and fully responsive. Keep the code clean and modular so adding new units later only requires inserting rows into the database.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://english-from-zero-arabic.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9c5a0980-bbb0-44a6-be9a-c0567a68545f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
