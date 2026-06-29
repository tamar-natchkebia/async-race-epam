# Async Race 🏎️

This is my solution to the **Async Race** technical assignment for **EPAM** —
a single-page application for managing a virtual garage of cars, running
drag races against a mock REST API, and tracking race winners on a
leaderboard. Built with React 19, TypeScript (strict mode), Redux Toolkit,
and Vite, following the Airbnb ESLint style guide.

🔗 **Deployed app:** https://race-epam.netlify.app/
🔗 **Repo:** https://github.com/tamar-natchkebia/async-race-epam

## Score: 350 / 400

---

## Checklist

### 🚀 UI Deployment
- [x] Deployment Platform: Successfully deployed on GitHub Pages, Netlify, Vercel, Cloudflare Pages, or similar.

### ✅ Requirements to Commits and Repository
- [x] Commit guidelines compliance (Conventional Commits, lowercase types, present tense, imperative mood)
- [x] Checklist included in README.md
- [x] Score calculated and placed at top of README.md
- [x] UI Deployment link placed at top of README.md

### Basic Structure (50 / 80 pts)
- [x] Two Views — "Garage" and "Winners" (10)
- [x] Garage View Content — name of view, creation/editing panel, race control panel, garage section (30)
- [x] Winners View Content — name of view, winners table, pagination (10)
- [ ] Persistent State — page numbers and input states preserved when switching views (30) *Note: Winners view page state is currently non-persistent.*

### Garage View (90 / 90 pts)
- [x] Car Creation and Editing Panel / CRUD Operations — empty and too-long names handled; deleting a car removes it from Winners too (20)
- [x] Color Selection — RGB palette picker, shown on car icon and name (10)
- [x] Random Car Creation — 100 cars per click, ≥10 name parts each, random colors (20)
- [x] Car Management Buttons — update/delete near each car (10)
- [x] Pagination — 7 cars per page (10)
- [x] Extra: Empty Garage message ("No Cars" or similar) (10)
- [x] Extra: Empty Garage Page — deleting the last car on a page moves you to the previous page (10)

### 🏆 Winners View (50 / 50 pts)
- [x] Display Winners — car appears in Winners after a win (15)
- [x] Pagination for Winners — 10 per page (10)
- [x] Winners Table — №, image, name, wins, best time; wins increment, best time only updates if faster (15)
- [x] Sorting Functionality — by wins and by best time, ascending/descending (10)

### 🚗 Race (170 / 170 pts)
- [x] Start Engine Animation — animate on velocity response, stop animation on 500 error (20)
- [x] Stop Engine Animation — car returns to start position (20)
- [x] Responsive Animation — fluid down to 500px screens (30)
- [x] Start Race Button — starts all cars on current page (10)
- [x] Reset Race Button — returns all cars to starting position (15)
- [x] Winner Announcement — message shows winning car's name (5)
- [x] Button States — start disabled while driving, stop disabled at initial position (20)
- [x] Actions during the race — predictable behavior for delete/edit/page/view changes and adding cars mid-race (50)

### 🎨 Prettier and ESLint Configuration (10 / 10 pts)
- [x] Prettier Setup — `format` and `ci:format` scripts in package.json (5)
- [x] ESLint Configuration — Airbnb style guide, `lint` script, strict TypeScript settings (5)

### 🌟 Overall Code Quality (up to 100 pts)
*(Skipped during self-check — discretionary, reviewer-assigned)*
- Modular design (API / UI / state separated)
- Functions kept small and purposeful (≤40 lines each) *Note: Minor function length exceptions exist in CarItem and Winners.*
- Minimal duplication, no magic numbers/strings
- Clear, readable naming throughout
- Extra: custom hooks, React Router, etc.

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

To run the application locally, you need to spin up both the frontend application and the backend mock server simultaneously.

### 1. Start the Frontend Application
```bash
git clone [https://github.com/tamar-natchkebia/async-race-epam.git](https://github.com/tamar-natchkebia/async-race-epam.git)
cd async-race-epam
npm install
npm run dev


git clone [https://github.com/mikhama/async-race-api.git](https://github.com/mikhama/async-race-api.git)
cd async-race-api
npm install
npm start
