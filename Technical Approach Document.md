## ● Problem-Solving Approach: Image Overlay Logic
The image overlay system was designed to be interactive and dynamic. Here is how it works:
- **DOM-to-Image Capture**: Instead of using complex server-side image processing, I used the `html-to-image` library to capture a specific section of the webpage (a "Card" component) and convert it into a high-quality PNG.
- **Dynamic State Mapping**: User inputs (Name, Message, Photo) are synced with React state. Any change in state immediately updates the visual preview in the browser.
- **Background Pre-generation**: To ensure a smooth user experience, a "pre-loading" logic captures the image in the background every time a change is made. This ensures that when the user clicks "Download" or "Share," the file is already ready for use.

## ● Tech Stack
- **Frontend**: React (Vite) + TypeScript
- **State Management**: Zustand
- **Image Processing**: html-to-image
- **Icons**: Lucide-React
- **Authentication**: Google OAuth (@react-oauth/google)
- **Routing**: React Router DOM
- **Styling**: Vanilla CSS with CSS Variables

## ● Challenges & Solutions
- **CORS & External Images**: Capturing images from external sources (like Google profile photos) often triggers security errors in the browser.
  - *Solution*: I used `referrerPolicy="no-referrer"` and `cacheBust` settings to bypass common cross-origin restrictions.


## ● Future Improvements: Scalability
- **Cloud-Based Rendering**: Transitioning to server-side rendering (using tools like Puppeteer) would ensure 100% consistency across all devices and allow for higher-resolution exports.
- **Asset Optimization**: Implementing an image optimization pipeline (e.g., Cloudinary or Sharp) to handle custom user uploads more efficiently.
