# Minute2WinIt

A searchable database of team-building activities, icebreakers, energisers
and Minute-to-Win-It style challenges — inspired by resources like
[playmeo](https://www.playmeo.com/) and corporate team-building providers
such as FunEmpire.

Browse, filter (by category, group size, duration, energy level, prep
effort) and sort activities, then open any activity for full step-by-step
instructions, rules, materials and debrief questions.

## Backend: Google Sheets

The activity database lives in a Google Sheet:

https://docs.google.com/spreadsheets/d/1UkN4n1v6IHoGkidwiCRqTFo6d-ISwpKBu5XfKB1k7TI/edit?gid=0

The app fetches the sheet's published CSV (`src/lib/sheet.ts`) at request
time with a 5-minute revalidation window, so **editing the sheet updates the
live site** without a redeploy. If the sheet is empty or unreachable, the
app falls back to the bundled seed dataset in `src/data/activities.ts`.

### Sheet columns

`id, name, category, tags, summary, objective, groupSizeMin, groupSizeMax, durationMinutes, energyLevel, prepEffort, materials, howToPlay, rules, variation, debriefQuestions`

List-type columns (`tags`, `materials`, `howToPlay`, `rules`,
`debriefQuestions`) use `|` to separate multiple items within one cell.

### Seeding the sheet

Run `npx tsx scripts/generate-sheet-csv.ts` to regenerate
`minute2winit-seed.csv` from the seed dataset, then in Google Sheets:
**File → Import → Upload → select the CSV → Replace current sheet**.

## Development

```bash
npm install
npm run dev
```

## Deploy

Deployed on Vercel. Push to `main` to trigger a new deployment.
