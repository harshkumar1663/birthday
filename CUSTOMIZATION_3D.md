# Customization Guide — 3D Edition

Learn how to personalize your "Letter for You" 3D experience.

## 🎨 Quick Customizations

### Change Letter Content

Edit `src/App.jsx`:

```javascript
const SCENES = [
  {
    text: ['your line 1', '', 'your line 2']
  },
  {
    text: ['next scene line 1', 'line 2']
  }
]
```

Add or remove scenes as needed. Empty strings create dramatic pauses.

### Adjust Typing Speed

In `src/components/SceneText.jsx`:

```javascript
const TYPING_SPEED = 32        // Lower = faster (try 20-50)
const LINE_DELAY = 400         // Pause between lines
const PAUSE_DELAY = 900        // Pause at empty lines
```

### Customize the Final Message

In `src/components/TextOverlay.jsx`:

```javascript
<div className="final-message">come here ❤️</div>
<div className="final-subtitle">happy birthday :)</div>
```

---

## 🌌 3D Scene Customization

### Particle Settings

In `src/components/Canvas3D.jsx`, find the `Particles` function:

```javascript
// Change particle count
const count = 500          // Increase for more, decrease for performance

// Change particle color
color="#aabbff"           // Try: #ffb3ba, #ff80b0, #7dd3fc

// Adjust particle size
size={0.7}                // 0.5 = smaller, 1.0 = larger

// Particle rotation speed (in useFrame)
rotation.x -= 0.0001      // Slower/faster rotation
rotation.y -= 0.00015
```

### Particle Color Ideas

**Romantic:**
- `#ffb3ba` - soft pink
- `#ff80b0` - deeper pink
- `#ffc0cb` - light pink

**Cool & Calm:**
- `#a8d8ff` - sky blue
- `#7dd3fc` - light blue
- `#60a5fa` - medium blue

**Ethereal:**
- `#c4b5fd` - lavender
- `#ddd6fe` - light purple
- `#e9d5ff` - pale purple

### Camera Movement

Adjust the subtle drift in `Canvas3D.jsx`:

```javascript
function CameraFloat() {
  useFrame(({ camera }) => {
    const time = Date.now() * 0.0001
    
    // Increase multipliers for more dramatic movement
    camera.position.x += (Math.sin(time * 0.5) * 0.5 - camera.position.x) * 0.001
    camera.position.y += (Math.cos(time * 0.3) * 0.3 - camera.position.y) * 0.001
    
    // Try these variations:
    // Faster: 0.0002 instead of 0.0001
    // Slower: 0.00005
  })
}
```

### Background & Fog

In `Canvas3D.jsx`:

```javascript
// Change background color (dark gradient)
<color attach="background" args={['#0a0e27']} />

// Try: #0f0f1e, #1a1a2e, #16213e, #0a0e27

// Adjust fog
<fog attach="fog" args={['#0a0e27', 30, 500]} />
//                         color   near far
// Use same color as background for seamless blend
```

### Camera Position

```javascript
camera={{
  position: [0, 0, 50],      // x, y, z (50 = distance, try 30-80)
  fov: 75                    // Field of view (60-90 typical)
}}
```

---

## 🎨 Text & UI Customization

### Text Size

In `src/styles/App.css`:

```css
.scene-text-container {
  font-size: 1.2rem;  /* Try: 0.95rem, 1.4rem, 1.6rem */
}
```

### Text Color

```css
:root {
  --text-color: #e8e8f0;      /* Light gray-blue */
  --text-faint: rgba(232, 232, 240, 0.4);
}

/* Change to bright white */
--text-color: #ffffff;
--text-faint: rgba(255, 255, 255, 0.4);

/* Or soft yellow */
--text-color: #fef3c7;
--text-faint: rgba(254, 243, 199, 0.4);
```

### Line Spacing

```css
.scene-text-container {
  line-height: 1.8;      /* 1.4 = tight, 2.0 = loose */
  letter-spacing: 0.8px; /* 0.5px = tight, 1.2px = wide */
}
```

### Font Family

To add Google Fonts, add to `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400&display=swap" rel="stylesheet">
```

Then update `src/styles/App.css`:

```css
html, body, #root {
  font-family: 'Playfair Display', serif;
}
```

---

## ✨ Animation Timing

### Continue Hint Fade

In `src/styles/App.css`:

```css
@keyframes hintAppear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.continue-hint {
  animation: hintAppear 0.8s var(--ease-smooth) forwards;
  /* Change 0.8s to adjust speed */
}
```

### Scene Entrance

```css
@keyframes sceneAppear {
  from {
    opacity: 0;
    transform: translateY(20px);  /* Change 20px for more/less movement */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scene-text-container {
  animation: sceneAppear 0.8s var(--ease-smooth) forwards;
  /* Change 0.8s for faster/slower entrance */
}
```

---

## 🌌 Complete Theme Examples

### Soft & Romantic
```javascript
// In Canvas3D.jsx
color="#ffb3ba"              // Pink particles
<color attach="background" args={['#2d1b4e']} />  // Deep purple bg

// In App.css
--text-color: #fef3c7;       // Soft yellow text
```

### Deep & Mysterious
```javascript
color="#60a5fa"              // Blue particles
<color attach="background" args={['#0a0e27']} />  // Very dark

// In App.css
--text-color: #e0e7ff;       // Indigo text
```

### Calm & Dreamy
```javascript
color="#a8d8ff"              // Light blue particles
<color attach="background" args={['#4c0519']} />  // Burgundy

// In App.css
--text-color: #ffffff;       // Pure white text
```

---

## 🔧 Performance Tweaks

### Reduce Particle Count (for older devices)

```javascript
const count = 300  // Instead of 500
```

### Lower Resolution

```javascript
dpr={[1, 1.5]}  // Instead of [1, 2]
```

### Disable Vignette

In `src/styles/App.css`:

```css
.vignette {
  display: none;
}
```

---

## 🎯 Mobile-Specific

### Larger Text on Small Screens

```css
@media (max-width: 480px) {
  .scene-text-container {
    font-size: 1.15rem;  /* Increase from 1rem */
  }
}
```

### Adjust Padding

```css
.text-overlay {
  padding: 2.5rem;  /* More breathing room on mobile */
}
```

---

## 🔄 Testing Your Changes

1. **Save file** (Ctrl+S)
2. **Dev server auto-refreshes** (if running `npm run dev`)
3. **Force refresh** if needed (Ctrl+Shift+R or Cmd+Shift+R)

---

## 🎁 Pro Tips

1. **Test before deploying**: Run `npm run build` to check for errors
2. **Mobile first**: Always test on phone size
3. **Particle count affects performance**: Start with 300 on low-end
4. **Colors matter**: Use high contrast for readability
5. **Timing is emotional**: Slower typing = more intimate

---

## 📚 Resources

- [Google Fonts](https://fonts.google.com)
- [Color Picker](https://coolors.co)
- [Easing Functions](https://easings.net)
- [Three.js Color Reference](https://threejs.org/docs/#api/en/math/Color)

---

Ready to make it yours! 🎨
