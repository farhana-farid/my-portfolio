# Farhana Farid — Modern Developer Portfolio

A pixel-perfect, high-performance personal portfolio website built with **Python (Flask)** on the backend and **HTML5, Tailwind CSS, and Vanilla JavaScript** on the frontend.

## ✨ Features & Architecture

- **Color Theme & Design Aesthetic**:
  - Main Background: Soft light lavender (`#FAF9FF`)
  - Card & Section Background: Pure white (`#FFFFFF`) with rounded corners (`rounded-3xl` / 24px) and subtle drop shadows
  - Primary Accent & Buttons: Vibrant Violet (`#7C3AED`)
  - Hero & Highlighted Card Gradient: Deep royal purple to violet gradient (`linear-gradient(135deg, #4C1D95, #6D28D9)`)
  - Borders & Accents: Soft lavender border (`#EDE9FE`)
  - Typography: Clean modern sans-serif (`Plus Jakarta Sans`)
  - Headings: Deep dark slate (`#0F172A`)
  - Paragraphs & Body: Muted slate (`#64748B`)
- **Key Sections**:
  1. **Header / Navbar**: Monogram logo (`Farhana.`), smooth navigation links, gradient *"Let's Talk"* button, mobile drawer menu.
  2. **Hero Section**: Introductions, role badge, clean bio, dual CTA buttons (*Hire Me* & *See Projects*), SVG illustrated profile card with floating badges, and social media links.
  3. **Quick Stats Bar**: Numerical metrics with dynamic count-up animations triggered on scroll.
  4. **"My Quality Services"**: Numbered cards (01, 02, 03, 04) with card 01 styled in the highlighted deep purple gradient and interactive arrow hover interactions.
  5. **Experience & Skills**: Interactive education/career milestone timeline paired with a progress-bar tech stack grid and tag cloud.
  6. **Recent Works / Portfolio Grid**: Filterable project gallery (All, AI Applications, Full-Stack, UI/UX) with thumbnail previews, tags, and interactive detail modals.
  7. **Interactive Contact Section**: Direct email card with one-click copy button, and an asynchronous AJAX contact form handled by the Flask API with custom toast feedback and data persistence (`data/messages.json`).

---

## 🚀 Getting Started

### 1. Prerequisites
- Python 3.9+ installed on your system.

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run the Development Server
```bash
python app.py
```
By default, the application runs at:
```
http://127.0.0.1:5000
```

---

## 📁 Project Structure

```
farhana-portfolio/
│── app.py                   # Flask server, routes, data model & contact API
│── requirements.txt         # Python dependencies
│── README.md                # Project documentation
│── data/
│   └── messages.json        # Contact form messages storage
│── templates/
│   └── index.html           # Semantic, responsive HTML template
└── static/
    ├── css/
    │   └── style.css        # Custom styles, animations, variables
    ├── js/
    │   └── main.js          # Interactive JavaScript (counters, filters, modal, toast)
    └── images/
        ├── favicon.svg      # Branded browser favicon
        ├── profile.svg      # Hero illustration avatar
        ├── project1.svg     # InsightAI preview
        ├── project2.svg     # DevPulse preview
        ├── project3.svg     # ArtisanUI preview
        ├── project4.svg     # SmartExpense preview
        ├── project5.svg     # NexusChat preview
        └── project6.svg     # PortfolioCraft preview
```

---

## 🌐 Deploying to Production

This app is lightweight, production-ready, and can be deployed anywhere Python is supported:

- **Render / Railway**: Add `gunicorn` to `requirements.txt` and set start command to `gunicorn app:app`.
- **Vercel**: Add a `vercel.json` with the Python WSGI build configuration.
- **Docker**: Simple python container running `gunicorn --bind 0.0.0.0:$PORT app:app`.
