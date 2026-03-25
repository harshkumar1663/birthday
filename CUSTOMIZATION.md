# Customization Guide

Learn how to personalize your "Letter for You" experience.

## 🎨 Quick Color Changes

### Change All Scene Colors

Edit the `body.scene-X` classes in `style.css`:

```css
/* Current warm pastel on scene 0 */
body.scene-0 {
    background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 50%, #ff7675 100%);
}

/* Change to cool blue tones */
body.scene-0 {
    background: linear-gradient(135deg, #a8d8ff 0%, #7cb9f5 50%, #5a8fc9 100%);
}
```

### Color Inspiration

**Warm & Romantic:**
- `#ffeaa7` → `#fab1a0` → `#ff7675` (coral)
- `#ffe0ec` → `#ffb3d9` → `#ff80b0` (pink)

**Cool & Calm:**
- `#a29bfe` → `#6c5ce7` → `#5f27cd` (purple)
- `#e0f2f7` → `#f0f8ff` → `#ffffff` (blue)

**Autumn & Earthy:**
- `#d4a574` → `#c68642` → `#a0522d` (brown)
- `#f7b731` → `#e59c63` → `#d08844` (gold)

## ✍️ Edit Letter Content

### Add/Remove Scenes

In `script.js`, the `scenes` array defines all content:

```javascript
const scenes = [
    {
        id: 0,
        text: [
            "line 1",
            "line 2",
            "line 3"
        ]
    },
    {
        id: 1,
        text: [
            "new scene line 1",
            "new scene line 2"
        ]
    }
];
```

**To add a scene:**
1. Add a new object to the array
2. Set appropriate `id`
3. Add corresponding `body.scene-X` style in CSS

**To remove a scene:**
1. Delete the object from array
2. No CSS cleanup needed

### Edit Final Message

In `script.js`, find the `renderFinalScene()` function:

```javascript
finalMsg.textContent = 'come here ❤️';
finalSub.textContent = 'happy birthday :)';
```

Change these text values to customize the final moment.

## ⏱️ Adjust Timing

### Typing Speed

In `script.js`:
```javascript
const state = {
    typingSpeed: 40,  // milliseconds per character
    // Lower = faster, Higher = slower
    // Try: 20 (fast), 40 (normal), 80 (slow)
};
```

### Delay Between Lines

In `script.js`:
```javascript
const state = {
    lineDelay: 500,  // milliseconds between lines
    // Try: 300 (quick), 500 (normal), 1000 (dramatic)
};
```

## 📝 Typography

### Font Family

Edit in `style.css`:
```css
html, body {
    font-family: 'Poppins', 'Inter', sans-serif;
    /* Other options:
       'Playfair Display' - elegant
       'Cormorant Garamond' - luxury
       'Quicksand' - friendly
       'Open Sans' - clean
       'Lora' - classic
    */
}
```

### Font Size

Edit in `style.css`:
```css
.scene-content {
    font-size: 1.2rem;  /* Base font size */
}

/* Mobile override */
@media (max-width: 480px) {
    .scene-content {
        font-size: 1rem;
    }
}
```

### Line Height & Spacing

```css
.scene-content {
    line-height: 1.8;      /* Space between lines */
    letter-spacing: 0.8px; /* Space between letters */
}
```

## 🎯 Layout Adjustments

### Max Content Width

Edit in `style.css`:
```css
.scene-wrapper {
    max-width: 500px;  /* Try: 400px, 600px, 700px */
}
```

### Padding/Margins

```css
.container {
    padding: 2rem;  /* Space around edges */
}

.scene-line {
    margin: 0.8rem 0;  /* Space between lines */
}
```

## 🎬 Animation Fine-Tuning

### Fade Speed

Edit keyframes in `style.css`:
```css
@keyframes fadeInUp {
    /* from/to... */
}

.scene-content {
    animation: fadeInUp 0.8s var(--ease-smooth) forwards;
    /* Change 0.8s to: 0.5s (fast), 1.2s (slow) */
}
```

### Easing Function

```css
:root {
    --ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    /* Other options:
       ease (natural)
       ease-in-out (smooth)
       cubic-bezier(0.2, 0.88, 0.1, 0.64) (elastic)
       cubic-bezier(0.68, -0.55, 0.265, 1.55) (bounce)
    */
}
```

## 🎵 Audio Customization

See [AUDIO_SETUP.md](AUDIO_SETUP.md) for detailed audio configuration.

## 🎨 Complete Theme Examples

### Sunset Romance
```css
body.scene-0 { background: linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #48dbfb 100%); }
body.scene-1 { background: linear-gradient(135deg, #ff9ff3 0%, #feca57 50%, #48dbfb 100%); }
body.scene-3 { background: linear-gradient(135deg, #2d3436 0%, #636e72 50%, #b2bec3 100%); }
```

### Ocean Breeze
```css
body.scene-0 { background: linear-gradient(135deg, #0984e3 0%, #6c5ce7 50%, #00b894 100%); }
body.scene-1 { background: linear-gradient(135deg, #b2e1fd 0%, #d4f1f9 50%, #e3f8ff 100%); }
body.scene-3 { background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7aa3da 100%); }
```

### Moody Night
```css
body.scene-0 { background: linear-gradient(135deg, #16213e 0%, #0f3460 50%, #533483 100%); }
body.scene-1 { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); }
body.scene-3 { background: linear-gradient(135deg, #0f0f1e 0%, #1a1a3f 50%, #16213e 100%); }
```

## 🔄 Responsive Breakpoints

Customize mobile experience:

```css
/* Tablets */
@media (max-width: 768px) {
    .scene-content {
        font-size: 1.1rem;
    }
}

/* Mobile phones */
@media (max-width: 480px) {
    .scene-content {
        font-size: 1rem;
    }
}
```

## 💾 Testing Changes

1. **Save file** (Ctrl+S)
2. **Refresh browser** (F5 or Ctrl+R)
3. **Clear cache** if changes don't appear (Ctrl+Shift+Delete)

## 🎁 Tips

- **Test on mobile**: Most customizations matter on phone
- **Print preview**: Check how it looks if printed
- **Dark mode**: Test appearance in dark mode (system settings)
- **Share feedback**: See how it feels to others

## Useful Resources

- **Color Picker**: [coolors.co](https://coolors.co)
- **Gradient Generator**: [cssgradient.io](https://cssgradient.io)
- **Font Library**: [fonts.google.com](https://fonts.google.com)
- **Easing Functions**: [easings.net](https://easings.net)

---

Ready to make it yours! 🎨
