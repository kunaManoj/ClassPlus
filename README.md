# Greetify - Personalized Greeting Cards

A modern, responsive web application built with React, Vite, and TypeScript that enables users to create personalized greeting cards and wishes by automatically overlaying their name and profile picture onto beautiful templates.

## Features

- **Authentication:** Simple login flow including Guest access. Captures Name and Profile Picture.
- **Dynamic Templates:** Categorized image templates with live preview overlays showing the user's name and picture seamlessly integrated.
- **Premium Tier:** Built-in monetization flow with "Free" and "Premium" badges. Clicking a premium template triggers a beautiful subscription upsell popup.
- **One-Click Share:** Merges HTML layers into a single high-quality image using `html-to-image` and supports native sharing via the Web Share API.
- **Stunning UI/UX:** Built with a glassmorphic dark theme, CSS gradients, smooth animations, and responsive layouts.

## Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Vanilla CSS with custom design tokens and glassmorphism utilities.
- **State Management:** Zustand
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Image Generation:** html-to-image

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Folder Structure

- `src/components/Layout.tsx` - Main layout wrapper with navigation and user profile.
- `src/pages/Home.tsx` - Template listing, live preview, category filtering, and subscription upsell.
- `src/pages/Login.tsx` - Authentication screen capturing name and profile picture.
- `src/pages/TemplatePreview.tsx` - Handles DOM-to-image conversion and native sharing.
- `src/store/useStore.ts` - Zustand state for user data and premium status.
- `src/lib/templates.ts` - Mock template data configuration with coordinate placements.
