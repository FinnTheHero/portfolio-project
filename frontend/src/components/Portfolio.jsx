import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import "./Portfolio.css";

const Portfolio = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [messages, setMessages] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState("");

    const projectsData = [
        {
            id: 1,
            title: "Novel Reading Platform",
            description:
                "Full-stack novel reading platform with authentication and tracking",
            tags: ["React", "Node.js", "Tailwind", "Go", "Gin", "PostgreSQL"],
            link: "https://github.com/FinnTheHero/Codex",
            color: "#004E89",
        },
        {
            id: 2,
            title: "Deployment Pipeline",
            description: "Gitlab CI/CD pipeline for automated deployment",
            tags: ["Gitlab CI/CD", "Yaml", "Docker"],
            link: "#",
            color: "#FF7F00",
        },
        {
            id: 3,
            title: "Home Lab",
            description: "Proxmox Server with Docker, LXC and VMs",
            tags: ["Proxmox", "Docker", "Kubernetes", "VM"],
            link: "#",
            color: "#EE5A24",
        },
    ];

    const skills = [
        {
            category: "Backend",
            items: [
                "Go",
                "Gin",
                "Elixir",
                "Node.js",
                "Express",
                "PostgreSQL",
                "REST API",
            ],
        },
        {
            category: "Automation",
            items: [
                "Gitlab CI/CD",
                "Docker",
                "Kubernetes",
                "AWS",
                "Bash",
                "Linux",
                "Ansible",
                "Proxmox",
            ],
        },
    ];

    useEffect(() => {
        setProjects(projectsData);
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/messages");
            if (response.ok) {
                const data = await response.json();
                setMessages(data.data || []);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.name.trim()) {
            setError("Name is required");
            return;
        }
        if (!formData.email.trim() || !validateEmail(formData.email)) {
            setError("Valid email is required");
            return;
        }
        if (!formData.message.trim()) {
            setError("Message is required");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setShowSuccess(true);
                setFormData({ name: "", email: "", message: "" });
                fetchMessages();
                setTimeout(() => setShowSuccess(false), 3000);
            } else {
                const data = await response.json();
                setError(data.message || "Error sending message");
            }
        } catch (error) {
            setError("Error sending message");
        } finally {
            setLoading(false);
        }
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setNavOpen(false);
        }
    };

    return (
        <div className="portfolio">
            <nav className="navbar">
                <div className="nav-container">
                    <div className="nav-brand">
                        <span className="brand-dot"></span>
                        <h1>Aleksandre</h1>
                    </div>

                    <button
                        className="nav-toggle"
                        onClick={() => setNavOpen(!navOpen)}
                    >
                        {navOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <ul className={`nav-links ${navOpen ? "active" : ""}`}>
                        <li>
                            <div
                                className="pointer"
                                onClick={() => scrollToSection("hero")}
                            >
                                Home
                            </div>
                        </li>
                        <li>
                            <div
                                className="pointer"
                                onClick={() => scrollToSection("work")}
                            >
                                Work
                            </div>
                        </li>
                        <li>
                            <div
                                className="pointer"
                                onClick={() => scrollToSection("about")}
                            >
                                About
                            </div>
                        </li>
                        <li>
                            <div
                                className="pointer"
                                onClick={() => scrollToSection("contact")}
                            >
                                Contact
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>

            <section id="hero" className="hero">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Skilled Developer <span>&</span> Engineer
                        </h1>
                        <p className="hero-subtitle">
                            I build robust, functional digital products that
                            make an impact
                        </p>
                        <button
                            className="cta-btn"
                            onClick={() => scrollToSection("work")}
                        >
                            View My Work <ArrowRight size={20} />
                        </button>
                    </div>
                    <div className="hero-visual">
                        <div className="gradient-blur"></div>
                    </div>
                </div>
            </section>

            <section id="work" className="work">
                <div className="section-header">
                    <h2>Recent Work</h2>
                    <p>Selected projects showcasing my skills</p>
                </div>

                <div className="projects-grid">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="project-card"
                            style={{ borderTopColor: project.color }}
                        >
                            <div className="project-header">
                                <h3>{project.title}</h3>
                            </div>
                            <p className="project-desc">
                                {project.description}
                            </p>
                            <div className="project-tags">
                                {project.tags.map((tag, idx) => (
                                    <span key={idx} className="tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <a href={project.link} className="project-link">
                                Learn More <ArrowRight size={16} />
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            <section id="about" className="about">
                <div className="section-header">
                    <h2>About Me</h2>
                    <p>Skills & Experience</p>
                </div>

                <div className="skills-container">
                    {skills.map((skillGroup, idx) => (
                        <div key={idx} className="skill-group">
                            <h4>{skillGroup.category}</h4>
                            <div className="skill-items">
                                {skillGroup.items.map((skill, i) => (
                                    <span key={i} className="skill-item">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {messages.length > 0 && (
                    <div className="messages-section">
                        <h3>Messages ({messages.length})</h3>
                        <div className="messages-list">
                            {messages.slice(0, 5).map((msg, idx) => (
                                <div key={idx} className="message">
                                    <div className="msg-header">
                                        <strong>{msg.name}</strong>
                                        <span className="msg-email">
                                            {msg.email}
                                        </span>
                                    </div>
                                    <p>{msg.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <section id="contact" className="contact">
                <div className="section-header">
                    <h2>Let's Talk</h2>
                    <p>
                        Get in touch for opportunities or just a friendly hello
                    </p>
                </div>

                <div className="contact-wrapper">
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                                placeholder="Your name"
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleFormChange}
                                placeholder="your@email.com"
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleFormChange}
                                placeholder="Your message..."
                                rows="5"
                                disabled={loading}
                            ></textarea>
                        </div>

                        {error && <div className="error">{error}</div>}
                        {showSuccess && (
                            <div className="success">
                                Message sent successfully!
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="submit-btn"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>

                    <div className="contact-info">
                        <h3>Contact Info</h3>
                        <div className="info-links">
                            <a
                                href="mailto:sandronozadze2004@gmail.com"
                                className="info-link"
                            >
                                <Mail size={20} />
                                <span>sandronozadze2004@gmail.com</span>
                            </a>
                            <a
                                href="https://github.com/FinnTheHero"
                                className="info-link"
                            >
                                <Github size={20} />
                                <span>github.com/FinnTheHero</span>
                            </a>
                            <a
                                href="https://linkedin.com/in/a-nozadze"
                                className="info-link"
                            >
                                <Linkedin size={20} />
                                <span>linkedin.com/in/a-nozadze</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>
                    &copy; {new Date().getFullYear()} Aleksandre Nozadze. All
                    rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default Portfolio;
