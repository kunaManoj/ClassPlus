# Greetify - Personalized Greeting Cards 🎁

Greetify is a premium, high-performance web application that allows users to generate and share personalized greeting cards in seconds. By combining modern web technologies with a sleek glassmorphic design, Greetify enables users to overlay their names, profile photos, and custom messages onto categorized high-quality templates.

## ✨ Key Features

### 🔐 Advanced Authentication
- **Multi-Login Flow:** Supports Google OAuth 2.0, Email-based login, and Guest access.
- **Session Persistence:** State is managed via Zustand with middleware persistence, ensuring users stay logged in across page reloads.
- **Dynamic Profile Setup:** Captures user names and profile pictures automatically from Google or allows manual URL setup.

### 🎨 Powerful Personalization
- **Interactive Editing Toolbar:** Users can customize individual cards without affecting their global profile.
- **Edit Name:** Change the display name specifically for a single card.
- **Change Background:** Bring your own template! Users can paste any image URL to replace the default background while keeping the Greetify overlays.
- **Custom Messages:** Optional glassmorphic text box that can be added, edited, or removed from the card on demand.

### 🏠 Home & Discovery
- **Categorized Templates:** Browse cards by Birthday, Anniversary, Festival, or Love.
- **Live Grid Preview:** Every template in the grid shows a live, real-time preview of the user's name and photo.
- **Premium Tier:** Clearly distinguished Free and Premium content with a beautiful subscription upsell flow for locked assets.

### 📤 Seamless Export & Sharing
- **Pre-generated Assets:** Background processing ensures sharing and downloads are instant, bypassing browser security timeouts.
- **Native Share API:** Integrated with mobile/desktop share sheets for one-click sharing to WhatsApp, Instagram, and more.
- **High-Quality Export:** Merges multiple HTML layers into a single high-fidelity PNG using `html-to-image`.

## 🛠️ Tech Stack

- **Core:** React 19 + TypeScript + Vite
- **Styling:** Vanilla CSS (Custom Design System + Glassmorphism)
- **State:** Zustand (with Persist Middleware)
- **Authentication:** @react-oauth/google
- **Icons:** Lucide React
- **Export Logic:** html-to-image
- **Navigation:** React Router DOM

## 🚀 Getting Started

1. **Clone & Install:**
   ```bash
   git clone <your-repo-url>
   cd ClassPlus
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root and add your Google Client ID:
   ```env
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   ```

3. **Run Dev:**
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `src/pages/Home.tsx` - Main dashboard with categorized templates and upsell logic.
- `src/pages/Login.tsx` - Reorganized unified login (Email/Google) and Guest entry.
- `src/pages/TemplatePreview.tsx` - Advanced editor with pre-generation logic and sharing tools.
- `src/store/useStore.ts` - Persistent state management for user sessions.
- `src/lib/templates.ts` - Template configuration and categorization.
- `src/index.css` - Central design system with custom CSS variables.

---
Built with ❤️ for stunning personalized wishes.
