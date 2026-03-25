# Audio Setup Guide

The app includes an optional background music feature. Here's how to add your own music.

## Current Setup

By default, the app includes a minimal audio data URL. This is a placeholder and can be replaced with actual music.

## How to Add Your Audio

### Option 1: Use a Local File (Recommended for Development)

1. **Place audio file** in the project root directory
   - Supported formats: MP3, WAV, OGG, M4A
   - Keep file size small (< 2MB for web)
   - Recommended: 30-60 second loop, 128kbps bitrate

2. **Update `script.js`**:
   ```javascript
   // In the initAudio() function, find this line:
   const audioDataUrl = 'data:audio/wav;base64,...';
   
   // Replace with:
   bgmusic.src = 'your-audio-file.mp3';
   ```

### Option 2: Use a CDN (Recommended for Production)

1. **Upload audio to CDN**:
   - Services: Cloudinary, AWS S3, Bunny CDN
   - Get the public URL

2. **Update `script.js`**:
   ```javascript
   bgmusic.src = 'https://your-cdn.com/path/to/audio.mp3';
   ```

### Option 3: Use Royalty-Free Music Services

Great sources for free background music:
- **Epidemic Sound**: Premium library (free trial)
- **Bensound**: Free royalty-free music
- **Free Music Archive**: Community-driven
- **YouTube Audio Library**: Great selection
- **Incompetech**: Creative Commons
- **Pixabay Music**: Free and royalty-free

Recommended styles:
- Ambient/Chill
- Classical/Piano
- Soft Electronic
- Lo-fi Hip Hop
- Instrumental

## Audio Settings

In `script.js`, you can adjust:

```javascript
// In the initAudio() function:
bgmusic.volume = 0.3;      // Set volume (0-1)
bgmusic.loop = true;        // Loop the audio
bgmusic.preload = 'metadata'; // Preload for fastest start
```

## Browser Autoplay Policy

**Important**: Most browsers require user interaction before playing audio.

Current behavior:
1. App loads (audio muted)
2. User clicks audio toggle button
3. Audio plays

This respects browser policies and provides better UX.

## Optimization Tips

1. **Compress audio**: Use tools like:
   - FFmpeg
   - Adobe Media Encoder
   - Audacity

   Example FFmpeg command:
   ```bash
   ffmpeg -i input.mp3 -b:a 128k output.mp3
   ```

2. **Choose format**:
   - MP3: Best compatibility
   - OGG: Better compression
   - WebM: Modern alternative

3. **Test on slow connections**: Use Chrome DevTools to throttle

## Troubleshooting

**Audio not playing?**
- Check browser console (F12) for errors
- Ensure audio file exists and URL is correct
- Test on desktop first, then mobile
- Check volume is not muted

**Audio stutters or has delays?**
- File might be too large
- Try compressing further
- Use a CDN for faster delivery
- Preload the audio before playing

**Volume too loud/quiet?**
- Adjust volume in script.js: `bgmusic.volume = 0.5;`
- Test on different devices

## Example: Using Bensound

1. Visit [bensound.com](https://bensound.com)
2. Find a royalty-free track (e.g., "Romantic" mood)
3. Download the MP3
4. Compress with FFmpeg:
   ```bash
   ffmpeg -i track.mp3 -b:a 96k track-compressed.mp3
   ```
5. Upload to CDN or include locally
6. Update `script.js` with URL

## CORS and CDN

If using CDN, ensure CORS headers allow access:
```html
crossorigin="anonymous"
```

This is already set in index.html if needed:
```html
<audio id="bgmusic" crossorigin="anonymous"></audio>
```

---

Questions? The audio setup is completely optional. The app works great without it!
