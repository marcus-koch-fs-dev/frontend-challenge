# Frontend Challenge

## Overview

An app that showcases a programmer's skills across various stages of development using modern frontend tools.

## Project Details

- **Author**: Marcus Koch
- **Version**: `0.0.1`

## Scripts

- **`dev`**: Start the development server.
- **`build`**: Lint, transpile, and build the project.
- **`start`**: Start the production server.
- **`preview`**: Preview the production build.
- **`lint`**: Run ESLint.
- **`test`**: Run tests with Vitest.

## Setup

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Start development server**:

   ```bash
   pnpm run dev
   ```

3. **Build the project**:

   ```bash
   pnpm run build
   ```

4. **Start production server**:

   ```bash
   pnpm start
   ```

   This will serve the production build on a local server.

5. **Preview the build**:

   ```bash
   pnpm run preview
   ```

6. **Lint the code**:

   ```bash
   pnpm run lint
   ```

7. **Run tests**:
   ```bash
   pnpm run test
   ```

## Key Features

- **TypeScript** for JS
- **SASS** for CSS
- **Autoprefixer** for vendor prefixes
- **Brotli Compression** for production builds
- **Testing** with Vitest

## Features Implemented

1. **Slider with Indicator Click**:
   The slider allows users to click on the indicators to navigate between slides, showing the current active slide.

2. **Swiping on Mobile**:
   Supports touch gestures for swiping between slides on mobile devices and tablets.

3. **Preloading Images**:
   Images are preloaded to enhance the user experience by loading the previous and next slides asynchronously. However, asynchronous requests were not fully intercepted and handled.

## How to Run the Build Version

To run the production build of the application:

1. **Build the project**:

   ```bash
   pnpm run build
   ```

2. **Start the production server**:

   ```bash
   pnpm start
   ```

   This will serve the optimized production build of the app.
