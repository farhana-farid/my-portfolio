import os
import json
import re
from datetime import datetime
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Base directory configuration
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_FILE = os.path.join(BASE_DIR, "data", "messages.json")

# Ensure data directory and messages store exist
os.makedirs(os.path.join(BASE_DIR, "data"), exist_ok=True)
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump([], f)

# Portfolio Data Model
PORTFOLIO_DATA = {
    "personal": {
        "name": "Farhana Farid",
        "title": "AI Enthusiast & Web Developer",
        "email": "farhanafarid41@gmail.com",
        "location": "Available Worldwide / Remote",
        "availability": "Open for New Opportunities & Collaborations",
        "short_bio": (
            "I design and build high-performance web applications infused with intelligent AI capabilities. "
            "From robust Flask backends to responsive, elegant user interfaces, I turn ambitious ideas into "
            "pixel-perfect digital experiences."
        ),
        "socials": {
            "github": "https://github.com",
            "linkedin": "https://linkedin.com",
            "twitter": "https://twitter.com",
            "email": "mailto:farhanafarid41@gmail.com"
        }
    },
    "stats": [
        {"value": 15, "suffix": "+", "label": "Completed Projects", "desc": "AI & Full-stack apps delivered"},
        {"value": 1200, "suffix": "+", "label": "Hours of Coding", "desc": "Deep focus & deliberate practice"},
        {"value": 10, "suffix": "+", "label": "Tech Mastered", "desc": "Modern tools & frameworks"},
        {"value": 100, "suffix": "%", "label": "Dedication", "desc": "Pixel-perfection & clean code"}
    ],
    "services": [
        {
            "num": "01",
            "title": "AI Integration & Workflows",
            "description": "Connecting LLMs, conversational agents, and automated AI pipelines into production web applications for enhanced user engagement.",
            "skills": ["OpenAI / Gemini APIs", "LangChain / RAG", "Prompt Architecture", "AI Automation"],
            "is_highlighted": True
        },
        {
            "num": "02",
            "title": "Full-Stack Web Development",
            "description": "Building reliable, scalable backend systems with Python & Flask paired with modern, reactive client-side interfaces.",
            "skills": ["Python & Flask", "RESTful APIs", "Relational Databases", "Modern JavaScript"],
            "is_highlighted": False
        },
        {
            "num": "03",
            "title": "UI/UX & Responsive Design",
            "description": "Crafting clean, accessible, and aesthetically pleasing interfaces with Tailwind CSS and fluid micro-interactions.",
            "skills": ["Tailwind CSS", "Mobile-First Design", "Component Design", "Micro-Interactions"],
            "is_highlighted": False
        },
        {
            "num": "04",
            "title": "API Design & Optimization",
            "description": "Designing clean REST endpoints, database schemas, and performance tuning for lightning-fast page loading and security.",
            "skills": ["API Architecture", "Performance Tuning", "SEO Best Practices", "Data Validation"],
            "is_highlighted": False
        }
    ],
    "skills": {
        "core": [
            {"name": "Python", "category": "Backend", "level": "92%", "icon": "python"},
            {"name": "Flask", "category": "Backend", "level": "90%", "icon": "server"},
            {"name": "JavaScript (ES6+)", "category": "Frontend", "level": "88%", "icon": "code"},
            {"name": "Tailwind CSS", "category": "Frontend", "level": "95%", "icon": "palette"},
            {"name": "HTML5 / CSS3", "category": "Frontend", "level": "95%", "icon": "layout"},
            {"name": "AI APIs & Prompt Eng.", "category": "AI / ML", "level": "85%", "icon": "cpu"},
            {"name": "SQLite / PostgreSQL", "category": "Database", "level": "82%", "icon": "database"},
            {"name": "Git & GitHub", "category": "DevOps", "level": "88%", "icon": "git-branch"}
        ],
        "tags": [
            "Python", "Flask", "JavaScript", "Tailwind CSS", "AI Integration",
            "REST APIs", "Prompt Engineering", "Git", "Responsive Design",
            "Jinja2", "SQLite", "JSON APIs", "Full-Stack Web"
        ]
    },
    "experience": [
        {
            "period": "2023 - Present",
            "role": "AI & Full-Stack Web Projects",
            "org": "Independent Developer & Innovator",
            "description": "Architected end-to-end intelligent web platforms, combining Python Flask backends with Tailwind CSS frontends and LLM integrations."
        },
        {
            "period": "2022 - 2023",
            "role": "Web Development Specialization",
            "org": "Tech Learning & Practical Labs",
            "description": "Built foundational expertise in modern web standards, component-driven layouts, API integration, and asynchronous JavaScript."
        },
        {
            "period": "2021 - 2024",
            "role": "Computer Science & Engineering Studies",
            "org": "Academic Journey",
            "description": "Focused on algorithms, software architecture, data structures, and emerging Artificial Intelligence systems."
        }
    ],
    "projects": [
        {
            "id": "insight-ai",
            "title": "InsightAI - Intelligent Document Assistant",
            "category": "ai",
            "category_label": "AI Application",
            "description": "A smart document summarizer and conversational Q&A system powered by Python Flask and AI API integration.",
            "long_description": "InsightAI enables users to upload lengthy research articles, PDF documents, or notes, generating instant executive summaries, key takeaway bullet points, and an interactive chat interface to interrogate the document content directly.",
            "tech": ["Python", "Flask", "AI API", "Tailwind CSS"],
            "image": "project1.svg",
            "demo_url": "#",
            "code_url": "https://github.com",
            "featured": True
        },
        {
            "id": "devpulse-hub",
            "title": "DevPulse - Developer Productivity Hub",
            "category": "fullstack",
            "category_label": "Full-Stack Web",
            "description": "An all-in-one developer workspace for tracking project milestones, API snippets, and daily coding focus metrics.",
            "long_description": "DevPulse features interactive task boards, markdown notes, code snippet bookmarking with syntax highlighting, and daily coding velocity analytics stored in a lightweight SQLite database via Flask.",
            "tech": ["Flask", "Vanilla JS", "SQLite", "Tailwind CSS"],
            "image": "project2.svg",
            "demo_url": "#",
            "code_url": "https://github.com",
            "featured": True
        },
        {
            "id": "artisan-ui",
            "title": "ArtisanUI - Clean Modern UI Components",
            "category": "ui",
            "category_label": "UI/UX & Design",
            "description": "A curated collection of accessible, pixel-perfect Tailwind CSS components with micro-interactions.",
            "long_description": "A reusable design system built for high conversions and delightful UX. Includes accessible cards, animated badges, glassmorphic navigations, modal systems, and responsive charts.",
            "tech": ["HTML5", "Tailwind CSS", "Vanilla JS", "SVG"],
            "image": "project3.svg",
            "demo_url": "#",
            "code_url": "https://github.com",
            "featured": True
        },
        {
            "id": "smartexpense-ai",
            "title": "SmartExpense - AI Financial Categorizer",
            "category": "ai",
            "category_label": "AI Application",
            "description": "Automated expense tracker that predicts budget anomalies and auto-tags receipts using natural language processing.",
            "long_description": "Combines a Flask backend with intelligent text parsing to extract merchants, totals, and category tags from raw receipt descriptions. Visualized with interactive SVG and CSS charts.",
            "tech": ["Python", "Flask", "AI Prompting", "Tailwind CSS"],
            "image": "project4.svg",
            "demo_url": "#",
            "code_url": "https://github.com",
            "featured": False
        },
        {
            "id": "nexus-chat",
            "title": "NexusChat - Multi-Agent AI Interface",
            "category": "fullstack",
            "category_label": "Full-Stack Web",
            "description": "A clean conversational platform allowing users to toggle between coding assistants, creative writers, and research bots.",
            "long_description": "Engineered with asynchronous Flask endpoints, markdown streaming renderers, and custom session history. Built with a sleek dark/light lavender accent aesthetic.",
            "tech": ["Python", "Flask", "Vanilla JS", "REST API"],
            "image": "project5.svg",
            "demo_url": "#",
            "code_url": "https://github.com",
            "featured": False
        },
        {
            "id": "portfolio-craft",
            "title": "PortfolioCraft - High-Speed Portfolio Template",
            "category": "ui",
            "category_label": "UI/UX & Design",
            "description": "An ultra-fast, 100/100 Lighthouse score personal website architecture featuring zero heavy framework overhead.",
            "long_description": "Demonstrates pure HTML5, Tailwind CSS, and Vanilla JS craftsmanship with seamless client-side filtering, form validation, and accessible keyboard navigation.",
            "tech": ["HTML5", "Tailwind CSS", "Vanilla JS", "SEO"],
            "image": "project6.svg",
            "demo_url": "#",
            "code_url": "https://github.com",
            "featured": False
        }
    ]
}


@app.route("/")
def index():
    """Renders the main portfolio page with all dynamic data."""
    return render_template("index.html", portfolio=PORTFOLIO_DATA)


@app.route("/api/contact", methods=["POST"])
def contact():
    """
    Handles interactive contact form submissions.
    Supports both JSON payloads and traditional form submissions.
    """
    try:
        if request.is_json:
            data = request.get_json() or {}
        else:
            data = request.form.to_dict()

        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        subject = data.get("subject", "").strip() or "General Inquiry"
        message = data.get("message", "").strip()

        # Input Validation
        if not name:
            return jsonify({"success": False, "error": "Please provide your full name."}), 400
        if len(name) < 2:
            return jsonify({"success": False, "error": "Name must be at least 2 characters long."}), 400

        email_pattern = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"
        if not email or not re.match(email_pattern, email):
            return jsonify({"success": False, "error": "Please provide a valid email address."}), 400

        if not message:
            return jsonify({"success": False, "error": "Please write a message before sending."}), 400
        if len(message) < 10:
            return jsonify({"success": False, "error": "Message is too short. Please provide at least 10 characters."}), 400

        # Construct message record
        record = {
            "id": datetime.utcnow().strftime("%Y%m%d%H%M%S%f"),
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "name": name,
            "email": email,
            "subject": subject,
            "message": message,
            "ip": request.remote_addr
        }

        # Persist safely to JSON store
        messages = []
        if os.path.exists(DATA_FILE):
            try:
                with open(DATA_FILE, "r", encoding="utf-8") as f:
                    messages = json.load(f)
            except (json.JSONDecodeError, OSError):
                messages = []

        messages.append(record)

        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(messages, f, indent=2, ensure_ascii=False)

        return jsonify({
            "success": True,
            "message": f"Thank you, {name}! Your message has been sent successfully. Farhana will get back to you shortly at {email}."
        }), 200

    except Exception as e:
        app.logger.error(f"Contact submission error: {e}")
        return jsonify({
            "success": False,
            "error": "An unexpected error occurred while sending your message. Please try again or email farhanafarid41@gmail.com directly."
        }), 500


@app.route("/api/projects", methods=["GET"])
def get_projects():
    """Optional REST endpoint returning the project list."""
    return jsonify(PORTFOLIO_DATA["projects"])


@app.route("/health", methods=["GET"])
def health():
    """Service health check endpoint."""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "app": "Farhana Farid Portfolio"
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"✨ Farhana Farid Portfolio starting at http://127.0.0.1:{port}")
    app.run(host="0.0.0.0", port=port, debug=True)
