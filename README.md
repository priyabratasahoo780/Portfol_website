<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:06b6d4,100:7c3aed&height=200&section=header&text=Priyabrata%20Sahoo&fontSize=50&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Full-Stack%20Developer%20%7C%20Software%20Engineer%20%7C%20Creator&descAlignY=60&descColor=94a3b8" width="100%"/>

<br/>

[![Portfolio](https://img.shields.io/badge/🌐_Live_Portfolio-portfol--website--xn8a.vercel.app-06b6d4?style=for-the-badge&logoColor=white)](https://portfol-website-xn8a.vercel.app/)
[![Resume](https://img.shields.io/badge/📄_Resume-View_PDF-7c3aed?style=for-the-badge&logoColor=white)](https://portfol-website-xn8a.vercel.app/Priyabrata_Sahoo.pdf)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/priyabratasahoo780)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/priyabratasahoo780)

<br/>

![GitHub last commit](https://img.shields.io/github/last-commit/priyabratasahoo780/Portfol_website?color=06b6d4&style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/priyabratasahoo780/Portfol_website?color=7c3aed&style=flat-square)
![License](https://img.shields.io/github/license/priyabratasahoo780/Portfol_website?color=10b981&style=flat-square)

</div>

---

## ✨ Overview

> A **premium, performance-first personal portfolio** built with React 18 + Vite, featuring buttery-smooth animations, a cyberpunk-inspired dark design system, and a laser-focused developer experience. Every section is crafted to showcase real skills, real projects, and real personality.

<div align="center">

| 🎯 Performance | 🎨 Design | ⚡ Tech |
|:-:|:-:|:-:|
| Lazy-loaded sections | Cyberpunk dark UI | React 18 + Vite 5 |
| Intersection Observer | GSAP + Framer Motion | Three.js 3D elements |
| Lenis smooth scroll | Dynamic scroll spy | EmailJS contact form |
| `memo` + `Suspense` | Custom animated cursor | Scroll progress bar |

</div>

---

## 🗂️ Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | **🏠 Hero** | Animated typing headline, profile photo with triple border frame, CTA buttons |
| 2 | **👤 About** | Personal intro, background & passion story |
| 3 | **🛠️ Skills** | Interactive tech-cloud with icon badges |
| 4 | **🛣️ Journey** | Academic & professional timeline |
| 5 | **🚀 Projects** | Full-stack project cards with live demo & GitHub links |
| 6 | **⚡ LeetCode** | Real-time coding stats dashboard |
| 7 | **🏆 Hackathons** | Hackathon participations & achievements |
| 8 | **🎬 YouTube** | Embedded tech video showcase |
| 9 | **📜 Certificates** | Certifications gallery |
| 10 | **📬 Contact** | EmailJS-powered contact form with validation |

---

## 🛠️ Tech Stack

<div align="center">

### Core
![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Animations & 3D
![GSAP](https://img.shields.io/badge/GSAP_3-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)

### Styling & UI
![CSS3](https://img.shields.io/badge/Vanilla_CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide_Icons-F56565?style=for-the-badge&logoColor=white)

### Services & Integrations
![EmailJS](https://img.shields.io/badge/EmailJS-FF6B35?style=for-the-badge&logoColor=white)
![Lenis](https://img.shields.io/badge/Lenis_Scroll-06b6d4?style=for-the-badge&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 📁 Project Structure

```
Portfol/
├── public/                    # Static assets
│   ├── assets/                # Images & media
│   ├── certificates/          # Certificate images
│   ├── Priyabrata_Sahoo.pdf   # Resume (downloadable)
│   └── sitemap.xml
│
├── src/
│   ├── components/
│   │   ├── Hero.jsx           # Landing section with typing animation
│   │   ├── About.jsx          # Personal bio
│   │   ├── Skills.jsx         # Tech stack cloud
│   │   ├── Journey.jsx        # Timeline
│   │   ├── Projects.jsx       # Project showcase cards
│   │   ├── LeetCode.jsx       # Live coding stats
│   │   ├── Hackathons.jsx     # Competition history
│   │   ├── YouTube.jsx        # Video content
│   │   ├── Certificates.jsx   # Achievements gallery
│   │   ├── Contact.jsx        # EmailJS contact form
│   │   ├── Navbar.jsx         # Scroll-spy navigation
│   │   ├── Cursor.jsx         # Custom animated cursor
│   │   ├── Loader.jsx         # Intro loading screen
│   │   ├── ScrollReveal.jsx   # Reveal-on-scroll utility
│   │   └── ScrollProgress.jsx # Progress indicator bar
│   │
│   ├── services/
│   │   └── emailService.js    # EmailJS integration
│   │
│   ├── App.jsx                # Root component with Lenis, SEO, lazy loading
│   └── index.css              # Global design system & CSS variables
│
├── backend/                   # Express.js contact form backend
├── vite.config.js
└── package.json
```

---

## ⚡ Performance Architecture

```
┌─────────────────────────────────────────────────────┐
│                  LOADING PRIORITY                    │
├─────────────────────────────────────────────────────┤
│  Priority 1 (Instant)  →  Hero + Navbar + Cursor    │
│  Priority 2 (Crucial)  →  About + Skills            │
│  Priority 3 (Heavy)    →  Journey, Projects,        │
│                            LeetCode, Hackathons     │
│  Priority 4 (External) →  YouTube, Certificates,   │
│                            Contact, Footer          │
└─────────────────────────────────────────────────────┘
```

- **`React.memo`** on all critical UI components to prevent unnecessary re-renders
- **`React.lazy` + `Suspense`** for code-split section loading
- **`IntersectionObserver`** for scroll-spy active section detection
- **`Lenis`** for hardware-accelerated smooth scroll with exponential easing
- **Dynamic `<title>` + meta tags** update per section for maximum SEO coverage

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+`
- npm `v9+`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/priyabratasahoo780/Portfol_website.git

# 2. Navigate to project directory
cd Portfol_website

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env
# Fill in your EmailJS credentials in .env

# 5. Start the development server
npm run dev
```

The app will be live at **`http://localhost:5173`**

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> See `EMAILJS_SETUP.md` for detailed EmailJS configuration instructions.

---

## 🌐 Deployment

This project is deployed on **Vercel** with automatic CI/CD from the `main` branch.

| Platform | Status | URL |
|----------|--------|-----|
| Vercel | ✅ Live | [portfol-website-xn8a.vercel.app](https://portfol-website-xn8a.vercel.app/) |

---

## 📬 Contact

<div align="center">

| Platform | Link |
|----------|------|
| 🌐 Portfolio | [portfol-website-xn8a.vercel.app](https://portfol-website-xn8a.vercel.app/) |
| 💼 LinkedIn | [linkedin.com/in/priyabratasahoo780](https://linkedin.com/in/priyabratasahoo780) |
| 🐙 GitHub | [github.com/priyabratasahoo780](https://github.com/priyabratasahoo780) |
| 🎯 LeetCode | [leetcode.com/u/Priyabrata_Sahoo780](https://leetcode.com/u/Priyabrata_Sahoo780/) |
| 🎬 YouTube | [@priyabratasahoo780](https://www.youtube.com/@priyabratasahoo780) |

</div>

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use it as inspiration for your own portfolio!

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:7c3aed,100:06b6d4&height=120&section=footer" width="100%"/>

**⭐ If you found this project useful, please consider giving it a star!**

*Designed & developed with 💙 by [Priyabrata Sahoo](https://portfol-website-xn8a.vercel.app/)*

</div>