# Larder

Cook dinner from the ingredients you already have.

Mark what’s in the kitchen, choose how much time you have, and Larder ranks real dinners by what you can make tonight. It also lists only the things you still need to buy. Your kitchen and saved meals stay in this browser — nothing is sent to a server.

## Run it

```bash
npm install
npm run dev
```

Open the address the dev server prints.

## Project

- `src/routes/index.tsx` — home page
- `src/components/kitchen.tsx` — the interface
- `src/lib/larder.ts` — recipes, matching, and saved kitchen
