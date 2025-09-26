# 🧩 Frontend Challenge

An app that showcases a programmer's skills across various stages of development using modern frontend tools.

---

## 📦 Installation and Execution

Use **pnpm** as in the original project.

```bash
git clone https://github.com/marcus-koch-fs-dev/frontend-challenge.git
cd frontend-challenge
pnpm install
pnpm run dev
```

To build and run the production server

```bash
pnpm run build
pnpm start
```

To preview the optimized build locally

```bash
pnpm run preview
```

---

## ▶️ Available Scripts

* `dev` start the development server
* `build` lint transpile and build the project
* `start` start the production server
* `preview` preview the production build
* `lint` run ESLint
* `test` run tests with Vitest

---

## ✨ Key Features

* TypeScript for JavaScript ergonomics and safety
* SASS for CSS authoring
* Autoprefixer for vendor prefixes
* Brotli compression for production builds
* Testing with Vitest

---

## ✅ Features Implemented

1. **Slider with indicator click** users can click indicators to navigate and see the active slide
2. **Mobile swiping** touch gestures for swiping between slides on phones and tablets
3. **Image preloading** preloads previous and next slides to improve UX note async requests not fully intercepted and handled yet

---

## 🧭 Project Structure  simplified

```text
.
├── public/            # Static assets
├── src/               # Source code
│   ├── components/    # UI components
│   ├── styles/        # SCSS styles
│   ├── lib/           # Utilities helpers
│   └── main.ts        # App entry
├── index.html
├── package.json
├── vite.config.ts
└── readme.md
```

> structure may vary slightly keep folders consistent with your current repo

---

## 🧪 Testing

Run unit tests

```bash
pnpm run test
```

Consider adding coverage and CI later if needed

---

## 🛠 Tech Stack

* Vite
* TypeScript
* SASS  Autoprefixer
* Vitest

---

## 📄 License

No explicit license specified yet add one if you plan to share or open‑source
