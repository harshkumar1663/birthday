# Quick Start — 3D Letter Experience

Get your immersive 3D letter up and running in 2 minutes.

## 📦 Installation

```bash
# Navigate to project
cd /path/to/Birthday

# Install dependencies
npm install

# Start development server
npm run dev
```

Your browser should automatically open at `http://localhost:3000` with the experience running.

## 🎮 How to Use

1. **Open the app**: Experience loads with 3D particles and first scene
2. **Read the scene**: Tap/click anywhere or press Space to advance
3. **Continue**: Each scene has typed-out text with dramatic pauses
4. **Reach the end**: Final message appears after all scenes
5. **Share**: Deploy and send the link!

## 📝 Edit Your letter

Your personalized letter is in `src/App.jsx`:

```javascript
const SCENES = [
  {
    text: ['hey…', '', 'your text here']
  },
  // More scenes...
]
```

Each `text` array is one scene. Empty strings create pauses.

**Changes auto-reload** when you save! 🔄

## 🎨 Customize 3D

Want different colors/effects? See [CUSTOMIZATION_3D.md](CUSTOMIZATION_3D.md) for:
- Particle colors
- Camera movement
- Text size/color
- Animation timing
- Performance tweaks

## 🚀 Deploy When Ready

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed steps.

## ❓ Common Changes

### Make typing faster
In `src/components/SceneText.jsx`:
```javascript
const TYPING_SPEED = 20  // Lower number = faster
```

### Change final message
In `src/components/TextOverlay.jsx`:
```javascript
<div className="final-message">your message here</div>
```

### Different particle color
In `src/components/Canvas3D.jsx`:
```javascript
color="#ffb3ba"  // Pink, try #60a5fa for blue
```

### Bigger text on mobile
In `src/styles/App.css`:
```css
@media (max-width: 480px) {
  .scene-text-container {
    font-size: 1.3rem;  /* Increase from 1rem */
  }
}
```

## 📚 More Info

- **Full customization**: [CUSTOMIZATION_3D.md](CUSTOMIZATION_3D.md)
- **Deployment**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Technical details**: [README.md](README.md)

## ✨ What You Have

- ✅ 3D canvas with floating particles
- ✅ 7 personal scenes (customizable)
- ✅ Smooth typing animations
- ✅ Mobile-responsive
- ✅ Ready to deploy
- ✅ No backend needed

## 🎁 Next Steps

1. Edit `src/App.jsx` with your own message
2. Run `npm run dev` and test
3. Customize colors/timing (see CUSTOMIZATION_3D.md)
4. Deploy with `npm run build` + vercel
5. Share the link! 💌

---

**Questions?** Start with [CUSTOMIZATION_3D.md](CUSTOMIZATION_3D.md) or [README.md](README.md)

Made with ❤️
