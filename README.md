# ShoreSquad 🌊

**Rally your crew, track weather, and hit the next beach cleanup with our dope map app!**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://rr-achh.github.io/ShoreSquad/)
[![License](https://img.shields.io/badge/license-Educational-blue)](LICENSE)

## 📋 Project Overview

ShoreSquad is a modern web application designed to mobilize young people to clean beaches by combining real-time weather tracking from Singapore's NEA, interactive Google Maps, and social features to make eco-action fun and connected.

## ✨ Key Features

- 🗺️ **Interactive Google Maps** - Embedded map showing next cleanup at Pasir Ris Beach
- 🌤️ **Real-Time Weather** - 4-day forecast from NEA Singapore's official API
- 📊 **Impact Tracking** - Live statistics showing collective environmental impact
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- ♿ **Accessible** - WCAG 2.1 AA compliant with semantic HTML and ARIA labels
- 🎨 **Modern Design** - Beautiful gradients, smooth animations, and micro-interactions
- 🚀 **Fast Performance** - Optimized loading with lazy loading and efficient animations

## 🚀 Quick Start

### Option 1: View Live Site
Visit the deployed site: **[https://rr-achh.github.io/ShoreSquad/](https://rr-achh.github.io/ShoreSquad/)**

### Option 2: Run Locally with Live Server (Recommended)

1. **Install VS Code** (if you haven't already)
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)

2. **Install Live Server Extension**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
   - Search for "Live Server" by Ritwick Dey
   - Click Install

3. **Clone and Open Project**
   ```bash
   git clone https://github.com/rr-achh/ShoreSquad.git
   cd ShoreSquad
   code .
   ```

4. **Launch Live Server**
   - Right-click on `index.html` in VS Code
   - Select "Open with Live Server"
   - Site will open at `http://localhost:5500`
   - Changes auto-reload on save! 🔄

### Option 3: Simple HTTP Server

Using Python:
```bash
cd ShoreSquad
python -m http.server 8000
```
Then open `http://localhost:8000`

Using Node.js:
```bash
npx http-server -p 8000
```

### Option 4: Open Directly
Simply double-click `index.html` (some features may be limited without a server)

## 📁 Project Structure

```
ShoreSquad/
├── index.html              # Main HTML5 page with semantic markup
├── css/
│   └── styles.css          # Complete responsive styles with CSS variables
├── js/
│   └── app.js              # Interactive features and API integration
├── .vscode/
│   └── settings.json       # Live Server configuration
├── .gitignore              # Git ignore rules
├── README.md               # This documentation
└── PROJECT_SUMMARY.md      # Detailed technical summary
```

## 🛠️ Technologies & APIs

### Frontend Stack
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern Grid/Flexbox, Custom Properties, Animations
- **Vanilla JavaScript** - ES6+, no dependencies for fast loading

### APIs Integrated
- **NEA Singapore Weather API**
  - Endpoint: `https://api-open.data.gov.sg/v2/real-time/api/four-day-outlook`
  - Real-time 4-day weather forecast
  - Temperature readings in Celsius
  - No API key required (free and open)
  
- **Google Maps Embed API**
  - Location: Pasir Ris Beach (1.381497, 103.955574)
  - Interactive embedded map with pin marker

### Key JavaScript Features
- ✅ **Error Handling** - Try/catch blocks with user-friendly error messages
- ✅ **Loading States** - Spinner animations while fetching data
- ✅ **Intersection Observer** - Efficient scroll-triggered animations
- ✅ **LocalStorage** - Persistent user preferences
- ✅ **Debouncing/Throttling** - Performance optimization
- ✅ **Async/Await** - Modern asynchronous code patterns

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--color-primary: #0EA5E9;        /* Ocean Blue */
--color-secondary: #06B6D4;      /* Wave Teal */
--color-sandy: #F4E4C1;          /* Sandy Beige */

/* Accent Colors */
--color-accent-coral: #FF6B6B;   /* CTAs & Energy */
--color-accent-green: #10B981;   /* Success States */
--color-accent-orange: #F97316;  /* Warmth & Community */

/* Neutrals */
--color-navy: #1E293B;           /* Text & Headers */
--color-slate: #64748B;          /* Secondary Text */
```

### Typography
- **Headings:** Poppins (Bold, Modern, Youthful)
- **Body:** Inter (Clean, Highly Readable)
- **Google Fonts** loaded with `preconnect` for performance

## 🎯 UX Design Principles Applied

1. ✅ **Mobile-First Responsive Design** - Optimized for young, mobile-native users
2. ✅ **Accessibility (WCAG 2.1 AA)** - Screen reader support, keyboard navigation
3. ✅ **Progressive Enhancement** - Works without JavaScript, enhanced with it
4. ✅ **Performance First** - Fast load times, optimized assets
5. ✅ **Visual Feedback** - Loading spinners, error messages, success notifications
6. ✅ **Social Proof** - Impact statistics, testimonials, crew counts

## 📱 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Latest ✅ |
| Firefox | Latest ✅ |
| Safari | Latest ✅ |
| Edge | Latest ✅ |
| Mobile Safari | iOS 12+ ✅ |
| Chrome Android | Latest ✅ |

## 🧪 Testing the Features

1. **Weather Forecast** - Scroll to "Upcoming Cleanups" to see live NEA data
2. **Interactive Map** - View Pasir Ris cleanup location with Google Maps
3. **Animations** - Scroll through page to see smooth fade-in effects
4. **Mobile Menu** - Resize browser or use mobile device to test hamburger menu
5. **Form Submission** - Try the email signup form with notifications
6. **Error Handling** - Disconnect internet to see graceful error messages
7. **Loading States** - Refresh page to see loading spinners

## 🚀 Deployment to GitHub Pages

This site is deployed using GitHub Pages. To deploy your own:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to "Pages" section
   - Source: Deploy from branch
   - Branch: `main` → folder: `/ (root)`
   - Click Save

3. **Access Your Site**
   - URL: `https://[username].github.io/[repository-name]/`
   - Example: `https://rr-achh.github.io/ShoreSquad/`

4. **Custom Domain (Optional)**
   - Add CNAME file with your domain
   - Update DNS settings with your registrar

## 🛡️ Robustness Features

- **Try/Catch Blocks** - All async operations wrapped in error handling
- **Loading Spinners** - Visual feedback during API calls
- **Error Messages** - User-friendly notifications when things go wrong
- **Fallback Data** - Mock data used if API fails
- **Network Resilience** - Works offline with cached content
- **Graceful Degradation** - Core features work even without JavaScript

## 📊 Performance Optimizations

- ⚡ Preconnect to external domains (Google Fonts)
- ⚡ Debounced scroll and input handlers
- ⚡ Lazy loading for images
- ⚡ Intersection Observer for efficient animations
- ⚡ Minimal JavaScript bundle (no frameworks)
- ⚡ CSS custom properties for efficient styling
- ⚡ Async script loading

## 🔮 Future Enhancements

- [ ] User authentication system
- [ ] Backend API for cleanup management
- [ ] Real-time chat for squads
- [ ] Social media sharing integration
- [ ] Push notifications for cleanup reminders
- [ ] Progressive Web App (PWA) functionality
- [ ] Dark mode toggle
- [ ] Multi-language support (i18n)
- [ ] Analytics dashboard
- [ ] Mobile app version

## 🤝 Contributing

This is an educational project. Contributions welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes. Feel free to use and modify for learning.

## 👥 Credits

**ShoreSquad Development Team**
- Environmental Tech Innovation Course
- December 2025

**APIs & Services**
- NEA Singapore - Weather Data
- Google Maps - Location Services
- data.gov.sg - Open Data Platform

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Check PROJECT_SUMMARY.md for technical details

---

**Made with 💙 for our oceans**

*Rally your crew. Save our shores. Make waves of change.* 🌊
