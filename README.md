# A Letter for You 💌 — 3D Edition

A premium, cinematic 3D web experience for a romantic interactive letter. Built with React, Vite, and React Three Fiber.

## ✨ Features

- **3D Immersive Canvas**: Floating particles and atmospheric effects using Three.js
- **Smooth Camera Drift**: Subtle, continuous camera movement for a dreamy feel
- **Typing Animation**: Smooth character-by-character text reveal with emotional pacing
- **Scene Transitions**: Seamless scene changes with overlay text
- **Mobile-First**: Fully responsive design optimized for all screen sizes
- **Cinematic Design**: Dark atmospheric aesthetic with glow effects
- **Vignette Effect**: Subtle edge darkening for focus
- **No Dependencies**: Pure React + Three.js (minimal, performant)
- **Accessibility**: Respects `prefers-reduced-motion` for users who prefer minimal animations

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server (opens at http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
/src
  ├── main.jsx              # React entry point
  ├── App.jsx               # Main app component & scene management
  ├── components/
  │   ├── Canvas3D.jsx      # 3D scene with particles
  │   ├── TextOverlay.jsx   # Text display & interaction
  │   └── SceneText.jsx     # Individual scene typing animation
  └── styles/
      └── App.css           # All styling & animations
/vite.config.js             # Vite configuration
/index.html                 # HTML entry point
/package.json               # Dependencies & scripts
```

## 📝 How It Works

1. **3D Scene**: Floating particles in a dark, atmospheric space
2. **Camera**: Subtle drift effect (no user controls)
3. **Text Overlay**: Scenes appear with typing animation
4. **Interaction**: Click/tap or press Space/Enter to advance scenes
5. **Final Moment**: After all scenes, special ending appears

## 🎨 Customization

### Edit Letter Content

Open `src/App.jsx` and modify the `SCENES` array:

```javascript
const SCENES = [
  {
    text: ['line 1', '', 'line 3']
  },
  // Add more scenes...
]
```

### Adjust Timing

In `src/components/SceneText.jsx`:

```javascript
const TYPING_SPEED = 32        // milliseconds per character
const LINE_DELAY = 400         // milliseconds between lines
const PAUSE_DELAY = 900        // milliseconds for empty lines
```

### Customize 3D Scene

In `src/components/Canvas3D.jsx`:

```javascript
// Change particle count
const count = 500

// Adjust particle color
color="#aabbff"

// Modify camera position
position={[0, 0, 50]}

// Change background color
<color attach="background" args={['#0a0e27']} />

// Adjust fog
<fog attach="fog" args={['#0a0e27', 30, 500]} />
```

### Styling

Edit `src/styles/App.css`:

```css
.scene-text-container {
  font-size: 1.2rem;      /* Text size */
  letter-spacing: 0.8px;  /* Letter spacing */
  line-height: 1.8;       /* Line height */
}

.vignette {
  /* Adjust vignette darkness */
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(10, 14, 39, 0.4) 100%
  );
}
```

## 🔧 Tech Stack

- **React 18**: UI framework
- **Vite**: Fast build tool
- **Three.js**: 3D graphics
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Utilities for React Three Fiber

## 📋 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
vercel
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

### Other Platforms

- **Netlify**: Connect GitHub repository for auto-deploy
- **GitHub Pages**: Build and push to `gh-pages` branch
- **AWS S3**: Upload `dist/` folder after `npm run build`

## ♿ Accessibility

- Keyboard navigation (Space/Enter to continue)
- Respects motion preferences
- Semantic HTML structure
- WCAG compliant color contrast

## 🎯 Performance

- Optimized Three.js scene (500 particles)
- Lazy loaded components
- Minimal JavaScript bundle
- GPU-accelerated animations
- Works on low-end devices

## 💡 Tips for Best Experience

- View on mobile device for intended experience
- Use fullscreen mode for maximum immersion
- Take your time reading through scenes
- Share the deployed link for best results

## 🔄 Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run deploy   # Deploy to Vercel
```

## 🆘 Troubleshooting

**Port 3000 already in use?**
```bash
# Use different port
vite --port 3001
```

**Build failing?**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run build
```

**Performance issues?**
- Reduce particle count in `Canvas3D.jsx`
- Lower `dpr` in canvas settings
- Disable vignette effect temporarily

**Not responsive on mobile?**
- Ensure viewport meta tag in `index.html`
- Test in Chrome DevTools mobile mode

## 📊 File Size

- Bundle: ~150KB (gzipped ~50KB)
- Three.js: ~100KB (gzipped ~35KB)
- React: ~40KB (gzipped ~13KB)
- App code: ~10KB (gzipped ~3KB)

## 🎭 Visual Design

- **Dark theme**: Reduces eye strain
- **Floating particles**: Creates depth and movement
- **Vignette effect**: Draws focus to text
- **Smooth animations**: Respects eye comfort
- **High contrast**: Ensures readability

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber/)
- [Three.js Documentation](https://threejs.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)

## 🎁 Special Touches

The experience includes:
- Continuous subtle camera drift
- Soft glowing particles
- Smooth fade transitions
- Cinematic text rendering
- Mobile-optimized layout
- Atmospheric lighting

## 📄 License

Free to use and customize for personal purposes.

---

Made with ❤️ for those special moments.

**Need help?** Check [CUSTOMIZATION.md](CUSTOMIZATION.md) or [DEPLOYMENT.md](DEPLOYMENT.md)
