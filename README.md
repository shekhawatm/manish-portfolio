# manish-portfolio

Personal portfolio of Manish Shekhawat: hiring, people ops and AI-built HR systems. Built with Next.js, Tailwind and Claude Code.

**Live site: [manish-portfolio-sepia.vercel.app](https://manish-portfolio-sepia.vercel.app)**

## What's new

- Section headings rise in word by word, with an ember → gold → teal underline that draws itself
- The pill above the headline cycles through roles; hero and contact buttons lean toward your cursor
- "What I've built" cards tilt in 3D with a spotlight that follows the mouse
- Confetti when you copy the email or click Scout the mascot
- A slowly rotating glow ring around the latest award
- A friendly "Hi, I'm Manish 👋" with a waving hand, and little logo chips for Fireflies.ai, OYO, Pesto Tech and Claude inside the intro
- An at-a-glance work list with monospace years and a hover arrow, inspired by modern designer portfolios
- A scroll hint at the bottom of the first screen
- An illustrated avatar: a floating badge with a spinning gradient ring in the hero (hover for "That's me!", click for confetti), a small one in the nav, and a "come on in" picture in Contact that opens like a pair of doors
- Live local time in Gurugram in the footer
- A warmer cream palette, and the welcome illustration now sits in a polaroid frame with washi tape and floating stickers
- Six more things I've built in "What I've built", each with a made-up preview
- An intro that leads with 10+ years in talent and people operations
- Every animation switches off for visitors who turn on "reduce motion"

## What this is

A one-page personal site. Next.js + Tailwind + Framer Motion, exported as static files and hosted free on Vercel.

## Change the words

Every piece of text is in **`src/content.ts`**. Open it, change a sentence, save. You never need to touch the design files.

- Hide a section: empty its list (e.g. `certifications: []`). Recommendations stay hidden until you add some.
- Change the colours: edit `--accent` (ember), `--accent-2` (lagoon teal) and `--gold` in `src/app/globals.css`, for light and dark mode.

## Edit safely in the browser (no install needed)

1. Open `src/content.ts` on GitHub and click the **pencil** icon.
2. Change only the words **inside the quotes**. Keep every `"`, `,`, `{`, `}`, `[` and `]` exactly where it is.
   If your text needs a double quote, use curly quotes “like this”, or an apostrophe ' instead.
3. Click **Commit changes…** → choose **Create a new branch** → **Propose changes** → **Create pull request**.
4. Wait about a minute. Vercel comments on the pull request with a **Preview** link and a ✅ or ❌.
   - ✅ Open the preview, check it, then click **Merge pull request**. The live site updates in a minute or two.
   - ❌ Click **Details** next to the Vercel check to read the error (usually a missing quote or comma near the line you edited), fix it on the same branch, and the check reruns.
5. Never upload `node_modules`, `.next`, `out`, `.env` files or `.privacy-terms.txt`.

## Run it on your computer

```bash
npm install      # once
npm run dev      # then open http://localhost:3000
```

## Ship a change (the vibe-coding loop)

```bash
git checkout -b my-change
# edit src/content.ts (or ask Claude to)
npm run build    # runs the privacy check first, then builds
git add -A && git commit -m "Update intro"
git push -u origin my-change
```

Open a pull request on GitHub. Vercel posts a preview link on it within a minute. Merge it and the live site updates.

## Privacy check

`npm run privacy` (also runs inside `npm run build`) fails if any file contains:

- internal links (Slack, Google Docs, the recruiting CRM, the wiki tool), a work email address, or token-looking strings
- pay, hiring-decision or performance-process words (full list in `scripts/privacy-check.mjs`), except the two approved tool descriptions
- any name in your private **`.privacy-terms.txt`** file

`.privacy-terms.txt` is git-ignored, so the names themselves never reach GitHub. On a new computer, copy `.privacy-terms.example.txt` to `.privacy-terms.txt` and add names, one per line.

**House rules:** aggregate numbers only, no names but mine, previews use fake data only, no screenshots of real tools.
