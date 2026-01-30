import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [messages, setMessages] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [submitStatus, setSubmitStatus] = useState("");

    const projects = [
        { id: 1, title: "UI Design System", category: "UI", image: "🎨" },
        {
            id: 2,
            title: "Web Application",
            category: "Web Design",
            image: "🌐",
        },
        { id: 3, title: "Mobile App Design", category: "UX", image: "📱" },
        { id: 4, title: "Dashboard UI", category: "UI", image: "📊" },
        {
            id: 5,
            title: "E-commerce Site",
            category: "Web Design",
            image: "🛒",
        },
        { id: 6, title: "User Experience Flow", category: "UX", image: "🔄" },
    ];

    const categories = ["All", "UI", "UX", "Web Design"];
    const filtered =
        activeCategory === "All"
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/messages");
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setSubmitStatus("All fields are required");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setSubmitStatus("Invalid email format");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setSubmitStatus("Message sent successfully!");
                setFormData({ name: "", email: "", message: "" });
                fetchMessages();
                setTimeout(() => setSubmitStatus(""), 3000);
            } else {
                setSubmitStatus("Error sending message");
            }
        } catch (error) {
            setSubmitStatus("Error sending message");
        }
    };

    return (
        <div className="app">
            <nav className="navbar">
                <div className="nav-container">
                    <div className="logo">Aleksandre Nozadze</div>
                    <ul className="nav-links">
                        <li>
                            <a href="#home">Home</a>
                        </li>
                        <li>
                            <a href="#about">About Me</a>
                        </li>
                        <li>
                            <a href="#contact">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <section id="home" className="hero">
                <div className="hero-content">
                    <h1>
                        CREATIVE UI
                        <br />
                        <span className="cyan-text">DESIGNER</span>
                    </h1>
                    <div className="hero-buttons">
                        <button className="btn-primary">Hire now</button>
                        <button className="btn-secondary">Download CV ↓</button>
                    </div>
                </div>
                <div className="hero-scroll">
                    <div className="scroll-indicator">↓</div>
                </div>
            </section>

            <section id="about" className="about">
                <div className="about-container">
                    <div className="about-content">
                        <h2>
                            About <span className="cyan-text">me</span>
                        </h2>
                        <p>
                            Computer Science student specializing in Linux
                            system administration and infrastructure automation.
                            Hands-on experience with virtualization, CI/CD
                            pipelines, and self-hosted infrastructure management
                            gained through academic projects and professional
                            internships.{" "}
                            <span className="read-more">Read more</span>
                        </p>
                    </div>
                </div>
            </section>

            <section id="works" className="works">
                <div className="works-container">
                    <h2>
                        My recent <span className="cyan-text">works</span>
                    </h2>

                    <div className="category-tabs">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`category-btn ${activeCategory === cat ? "active" : ""}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="projects-grid">
                        {filtered.map((project) => (
                            <div key={project.id} className="project-card">
                                <div className="project-image">
                                    {project.image}
                                </div>
                                <h3>{project.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="contact" className="contact">
                <div className="contact-container">
                    <div className="contact-left">
                        <h2>
                            Got a project in{" "}
                            <span className="cyan-text">mind?</span>
                        </h2>
                    </div>
                    <div className="contact-right">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleInputChange}
                            />
                            <button type="submit" className="btn-send">
                                Send Message →
                            </button>
                        </form>
                        {submitStatus && (
                            <p className="status-message">{submitStatus}</p>
                        )}
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-links">
                        <a href="#home">Home</a>
                        <a href="#about">About me</a>
                        <a href="#contact">Contact</a>
                    </div>
                    <div className="footer-socials">
                        <a href="#">f</a>
                        <a href="#">in</a>
                        <a href="#">tw</a>
                        <a href="#">ig</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>Terms of Service • Privacy Policy</p>
                </div>
            </footer>
        </div>
    );
}
