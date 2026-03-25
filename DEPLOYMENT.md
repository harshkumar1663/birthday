# Deployment Guide — React 3D Edition

Get your "Letter for You" 3D experience live online in minutes.

## ⚡ Quick Deploy to Vercel (Recommended)

Vercel is optimized for Next.js/React apps and provides automatic optimization.

### Prerequisites
- GitHub account (free at github.com)
- Vercel account (free at vercel.com)

### Step-by-Step

1. **Initialize Git & Build**:
   ```bash
   cd /path/to/Birthday
   
   # Build for production (verify no errors)
   npm run build
   
   # Initialize git if not done
   git init
   git add .
   git commit -m "Initial 3D letter experience"
   ```

2. **Create GitHub Repository**:
   - Go to [github.com/new](https://github.com/new)
   - Name it: `her-birthday-3d` or similar
   - Create repository
   - Follow instructions to push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/her-birthday-3d.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy to Vercel**:
   ```bash
   # Install Vercel CLI (if not already)
   npm i -g vercel
   
   # Deploy from project directory
   vercel
   ```
   - Follow prompts
   - Confirm project settings
   - Deployment starts automatically

4. **Get Shareable Link**:
   - Default: `https://her-birthday-3d.vercel.app`
   - Customize domain in Vercel dashboard
   - Share the link! 🎉

### Auto-Deploy on Git Push

Once connected to Vercel:

```bash
# Make changes locally
npm run dev  # Test changes

# Commit and push
git add .
git commit -m "Update letter content"
git push

# Vercel automatically rebuilds and deploys!
```

---

## 🌐 Alternative Hosting Options

### Netlify

1. **Sign up**: [netlify.com](https://netlify.com)
2. **Connect GitHub** repo or drag-and-drop `dist/` folder after building
3. **Deploy**: Automatic
4. **Done**: Get instant live link

**Quick drag-and-drop:**
```bash
npm run build
# Drag the 'dist' folder to Netlify
```

### GitHub Pages

1. **Create repo** named `username.github.io`
2. **Build locally**: `npm run build`
3. **Deploy with gh-pages package**:
   ```bash
   npm install --save-dev gh-pages
   ```
   Add to `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```
   ```bash
   npm run deploy
   ```
4. **Access at**: `https://username.github.io`

### Cloudflare Pages

1. **Connect GitHub** at [pages.cloudflare.com](https://pages.cloudflare.com)
2. **Select repository**
3. **Deploy**: Automatic setup
4. **Live**: Instant deployment

---

## 📋 Pre-Deployment Checklist

Before going live:

- [ ] Letter content finalized
- [ ] No typos or grammar issues
- [ ] Tested on mobile devices
- [ ] 3D particles rendering smoothly
- [ ] Text animations feel right
- [ ] Final message is correct
- [ ] Build succeeds: `npm run build`
- [ ] No errors in browser console
- [ ] Performance acceptable on low-end devices

**Check build for errors:**
```bash
npm run build
# Should produce dist/ folder with no errors
```

---

## 🔧 Environment Setup

### Required Files

Deployment requires:
- `vite.config.js` - Build configuration
- `package.json` - Dependencies
- `index.html` - Entry HTML
- `src/` - React component code

All files are already set up!

### Build Output

After `npm run build`:
- `dist/index.html` - Main file
- `dist/assets/` - JavaScript bundles (~150KB gzipped)
- **Total size**: ~500KB uncompressed, ~150KB gzipped

---

## 🌍 Custom Domain Setup

### Vercel Custom Domain

1. Go to Project Settings → Domains
2. Add your domain (e.g., `letter.example.com`)
3. Follow DNS instructions
4. Wait 5-10 minutes for propagation

### Example Domain Setups

**Using Cloudflare DNS:**
1. Point NS records to Cloudflare
2. Add domain to Vercel
3. Vercel generates DNS records
4. Add to Cloudflare

**Using GoDaddy:**
1. Update nameservers or CNAME records
2. Point to Vercel nameservers
3. Propagates in 24-48 hours

---

## 🚀 Deployment Comparison

| Platform | Build | Deploy | Ease | Auto-Update | Free | 
|----------|-------|--------|------|-------------|------|
| **Vercel** | Fast (5s) | Instant | ⭐⭐⭐ | ✅ | ✅ |
| **Netlify** | Fast (5s) | Instant | ⭐⭐⭐ | ✅ | ✅ |
| **GitHub Pages** | Manual | Manual | ⭐⭐ | ❌ | ✅ |
| **Cloudflare** | Instant | Instant | ⭐⭐ | ✅ | ✅ |

---

## 🎯 Deployment Commands

```bash
# Development
npm run dev          # Start dev server on :3000

# Build for production
npm run build        # Creates optimized dist/ folder

# Preview production build locally
npm run preview      # Test dist/ locally

# Deploy to Vercel
vercel              # Interactive deployment

# Deploy to GitHub Pages
npm run deploy      # Requires gh-pages setup
```

---

## 🔒 Performance After Deploy

After deployment, verify:

- [ ] Page loads in < 3 seconds
- [ ] 3D particles smooth on mobile
- [ ] Text animations fluid
- [ ] No console errors
- [ ] Audio works (if included)

**Check with DevTools:**
- F12 → Network tab → reload
- Check waterfall chart
- Look for slow resources

---

## 📊 Bundle Analysis

Check your bundle size:

```bash
npm run build
# Look for dist/ size in terminal output

# Detailed analysis with vite-plugin-visualizer:
npm install --save-dev vite-plugin-visualizer
# Then run: npm run build
# Opens browser with size breakdown
```

Typical breakdown:
- React: ~40KB (gzipped ~13KB)
- Three.js: ~100KB (gzipped ~35KB)
- App code: ~10KB (gzipped ~3KB)
- Other: ~50KB (gzipped ~15KB)

---

## 🛠️ Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules dist
npm install
npm run build
```

### Deployment Hangs
- Check internet connection
- Try again in few minutes
- Check Vercel status page

### 404 Error on Custom Domain
- DNS not propagated yet (wait 24 hours)
- Custom domain not added to platform
- Check DNS settings

### Slow Performance
- Check bundle size: `npm run build`
- Reduce particle count in `Canvas3D.jsx`
- Disable vignette effect
- Test on throttled connection (Chrome DevTools)

### Build Size Too Large
```bash
# Analyze bundle:
npm run build -- --stats

# Reduce Three.js bundle:
# In Canvas3D.jsx, import only what you need
```

---

## 🎁 Pro Tips

1. **Test production build locally first**:
   ```bash
   npm run build
   npm run preview
   ```

2. **Monitor after deployment**:
   - Check error logs in hosting dashboard
   - Set up email alerts
   - Monitor Core Web Vitals

3. **Quick rollback** (if something breaks):
   - Vercel: Click "Redeploy" on previous deployment
   - GitHub Pages: Push a previous commit

4. **Speed up builds**:
   - Use Vercel (builds in ~10 seconds)
   - Avoid large dependencies
   - Keep animations performant

---

## 📈 Analytics (Optional)

Add Google Analytics to track views:

```javascript
// In index.html <head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXX');
</script>
```

---

## 🎊 You're Live!

Your 3D romantic letter is now live for the world.

**Share:** Send the link to your special someone! 💌

---

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vite Guide**: [vitejs.dev/guide/](https://vitejs.dev/guide/)
- **React Docs**: [react.dev](https://react.dev)
- **Three.js Docs**: [threejs.org/docs/](https://threejs.org/docs/)

