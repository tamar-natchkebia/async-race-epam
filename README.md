# Async Race 🏎️

This is my solution to the **Async Race** technical assignment for **EPAM** —
a single-page application for managing a virtual garage of cars, running
drag races against a mock REST API, and tracking race winners on a
leaderboard. Built with React 19, TypeScript (strict mode), Redux Toolkit,
and Vite, following the Airbnb ESLint style guide.

🔗 **Deployed app:** https://your-app.vercel.app
🔗 **Repo:** https://github.com/your-username/async-race-epam

## Score: ___ / 400


---

## Checklist

### 🚀 UI Deployment
- [ ] Deployment Platform: Successfully deployed on GitHub Pages, Netlify, Vercel, Cloudflare Pages, or similar.

### ✅ Requirements to Commits and Repository
- [ ] Commit guidelines compliance (Conventional Commits, lowercase types, present tense, imperative mood)
- [ ] Checklist included in README.md
- [ ] Score calculated and placed at top of README.md
- [ ] UI Deployment link placed at top of README.md

### Basic Structure (80 pts)
- [ ] Two Views — "Garage" and "Winners" (10)
- [ ] Garage View Content — name of view, creation/editing panel, race control panel, garage section (30)
- [ ] Winners View Content — name of view, winners table, pagination (10)
- [ ] Persistent State — page numbers and input states preserved when switching views (30)

### Garage View (90 pts)
- [ ] Car Creation and Editing Panel / CRUD Operations — empty and too-long names handled; deleting a car removes it from Winners too (20)
- [ ] Color Selection — RGB palette picker, shown on car icon and name (10)
- [ ] Random Car Creation — 100 cars per click, ≥10 name parts each, random colors (20)
- [ ] Car Management Buttons — update/delete near each car (10)
- [ ] Pagination — 7 cars per page (10)
- [ ] Extra: Empty Garage message ("No Cars" or similar) (10)
- [ ] Extra: Empty Garage Page — deleting the last car on a page moves you to the previous page (10)

### 🏆 Winners View (50 pts)
- [ ] Display Winners — car appears in Winners after a win (15)
- [ ] Pagination for Winners — 10 per page (10)
- [ ] Winners Table — №, image, name, wins, best time; wins increment, best time only updates if faster (15)
- [ ] Sorting Functionality — by wins and by best time, ascending/descending (10)

### 🚗 Race (170 pts)
- [ ] Start Engine Animation — animate on velocity response, stop animation on 500 error (20)
- [ ] Stop Engine Animation — car returns to start position (20)
- [ ] Responsive Animation — fluid down to 500px screens (30)
- [ ] Start Race Button — starts all cars on current page (10)
- [ ] Reset Race Button — returns all cars to starting position (15)
- [ ] Winner Announcement — message shows winning car's name (5)
- [ ] Button States — start disabled while driving, stop disabled at initial position (20)
- [ ] Actions during the race — predictable behavior for delete/edit/page/view changes and adding cars mid-race (50)

### 🎨 Prettier and ESLint Configuration (10 pts)
- [ ] Prettier Setup — `format` and `ci:format` scripts in package.json (5)
- [ ] ESLint Configuration — Airbnb style guide, `lint` script, strict TypeScript settings (5)

### 🌟 Overall Code Quality (up to 100 pts)
*(Skipped during self-check — discretionary, reviewer-assigned)*
- Modular design (API / UI / state separated)
- Functions kept small and purposeful (≤40 lines each)
- Minimal duplication, no magic numbers/strings
- Clear, readable naming throughout
- Extra: custom hooks, React Router, etc.

---

## Tech Stack

- **React 19** + **TypeScript** (strict mode, `noImplicitAny`)
- **Redux Toolkit** for state management
- **Vite** for build tooling
- **ESLint** (Airbnb config) + **Prettier**

## Project Structure

```
src/
├── api/            # Server communication layer
├── components/     # UI components (Garage, Winners, CarItem, etc.)
├── store/          # Redux Toolkit slices
└── types.ts        # Shared TypeScript types
```

## Running Locally

```bash
git clone https://github.com/tamar-natchkebia/async-race-epam.git
cd async-race-epam
npm install
npm run dev
```



```bash
git clone https://github.com/mikhama/async-race-api.git
cd async-race-api
npm install
npm start
```

