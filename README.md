# Greetify - Personalized Greeting Cards

Greetify is a React-based application for generating and sharing personalized greeting cards. It allows users to overlay their profile data onto categorized templates and share them via the native web share API.

## Core Features

*   **Auth Flow:** Supports Google OAuth, Email/Name form, and Guest login. Session persistence is handled via Zustand.
*   **Template Grid:** Categorized listing (Birthday, Anniversary, Festival, Love) with real-time card previews.
*   **Card Editor:** Interactive toolbar to customize card name, background image (via URL), and optional personal messages.
*   **Export & Sharing:** Uses `html-to-image` for high-quality PNG generation. Supports native device sharing and direct download.
*   **Premium Logic:** Integrated upsell modals for premium-tier assets.

## Technical Implementation

*   **Framework:** React 19 / Vite / TypeScript
*   **State:** Zustand with `persist` middleware for session management.
*   **Exports:** High-fidelity DOM-to-PNG conversion.
*   **Styling:** Vanilla CSS with a centralized design system and glassmorphism components.

## Development

1.  **Install:**
    ```bash
    npm install
    ```

2.  **Config:**
    Add `VITE_GOOGLE_CLIENT_ID` to your `.env` file.

3.  **Run:**
    ```bash
    npm run dev
    ```

## Structure

*   `/pages`: Home dashboard, Login entry, and Template Editor.
*   `/store`: User session and app state.
*   `/lib`: Template configuration and category mappings.
*   `/components`: Layout and common UI wrappers.
