// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    }
});

// Form Submission handled by Netlify (see portfolio.html)
/* 
const contactForm = document.querySelector('.contact-form-3d');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Thank you for your message! I'll get back to you soon.");
        contactForm.reset();
    });
}
*/

// Global Detail Overlay Logic
document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card-modern');
    const educationCards = document.querySelectorAll('.education-card-3d');
    const projectCards = document.querySelectorAll('.project-card');
    const overlay = document.getElementById('skill-detail-overlay');
    const closeBtn = document.querySelector('.overlay-close');
    const detailTitle = document.getElementById('detail-skill-title');
    const detailDesc = document.getElementById('detail-skill-desc');
    const detailIcon = document.querySelector('.skill-main-icon i');
    const detailJson = document.getElementById('detail-json');
    const toolList = document.getElementById('detail-tool-list');
    const githubBtn = document.getElementById('detail-github-btn'); // New Button

    const showOverlay = (title, desc, iconClass, records, type = 'skill', githubLink = null) => {
        // Set basic info
        detailTitle.textContent = title;
        detailDesc.textContent = desc;
        detailIcon.className = iconClass;

        // Handle GitHub Button
        if (githubBtn) {
            if (githubLink) {
                githubBtn.href = githubLink;
                githubBtn.style.display = 'inline-flex';
            } else {
                githubBtn.style.display = 'none';
                githubBtn.href = '#';
            }
        }

        if (type === 'education') {
            // Education JSON Console
            let jsonContent = `<pre>{\n  <span class="json-key">"institution"</span>: <span class="json-str">"${title}"</span>,\n`;
            Object.keys(records).forEach(key => {
                jsonContent += `  <span class="json-key">"${key}"</span>: <span class="json-val">"${records[key]}"</span>,\n`;
            });
            jsonContent += `  <span class="json-key">"status"</span>: <span class="json-val">"verified"</span>\n}</pre>`;
            detailJson.innerHTML = jsonContent;
            toolList.innerHTML = '';
        } else if (type === 'project') {
            // Project JSON Console
            let jsonContent = `<pre>{\n  <span class="json-key">"project"</span>: <span class="json-str">"${title}"</span>,\n`;
            Object.keys(records).forEach(key => {
                jsonContent += `  <span class="json-key">"${key}"</span>: <span class="json-str">"${records[key]}"</span>,\n`;
            });
            jsonContent += `  <span class="json-key">"deployment"</span>: <span class="json-val">"active"</span>\n}</pre>`;
            detailJson.innerHTML = jsonContent;

            // Render tech tags for projects too
            const commonTools = ['Flutter', 'Node.js', 'Express', 'MongoDB', 'Firebase', 'OpenAI', 'FastAPI', 'Python', 'React', 'n8n', 'Make.com', 'Supabase', 'LangChain', 'RAG', 'VectorDB', 'PostgreSQL', 'MySQL', 'PHP', 'HTML5', 'CSS3', 'JavaScript'];
            toolList.innerHTML = '';
            commonTools.forEach(tool => {
                const combinedText = (title + " " + desc + " " + JSON.stringify(records)).toLowerCase();
                if (combinedText.includes(tool.toLowerCase())) {
                    const tag = document.createElement('span');
                    tag.className = 'tool-tag';
                    tag.textContent = tool;
                    toolList.appendChild(tag);
                }
            });
        } else {
            // Skill JSON Console
            const commonTools = ['n8n', 'Make', 'OpenAI', 'Google', 'LangChain', 'RAG', 'Flutter', 'React', 'Node.js', 'Express.js', 'FastAPI', 'MongoDB', 'Supabase', 'PostgreSQL', 'SQLite', 'Git', 'GitHub'];
            const detectedTools = [];

            toolList.innerHTML = '';
            commonTools.forEach(tool => {
                if (desc.toLowerCase().includes(tool.toLowerCase())) {
                    const tag = document.createElement('span');
                    tag.className = 'tool-tag';
                    tag.textContent = tool;
                    toolList.appendChild(tag);
                    detectedTools.push(tool);
                }
            });

            detailJson.innerHTML = `<pre>{\n  <span class="json-key">"skill"</span>: <span class="json-str">"${title}"</span>,\n  <span class="json-key">"status"</span>: <span class="json-str">"active"</span>,\n  <span class="json-key">"tools"</span>: [<span class="json-val">"${detectedTools.join('", "')}"</span>],\n  <span class="json-key">"authorized"</span>: <span class="json-val">true</span>\n}</pre>`;
        }

        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    };

    // Handle Skill Card Clicks
    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const desc = card.querySelector('p').textContent;
            const iconClass = card.querySelector('.skill-icon i').className;
            showOverlay(title, desc, iconClass, {}, 'skill');
        });
    });

    // Handle Education Card Clicks
    educationCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const desc = card.querySelector('p').textContent;
            const iconClass = 'fas fa-graduation-cap';
            const records = JSON.parse(card.getAttribute('data-record') || '{}');
            showOverlay(title, desc, iconClass, records, 'education');
        });
    });

    // Handle Project Card Clicks
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const desc = card.querySelector('p').textContent;
            const iconClass = 'fas fa-project-diagram';
            const records = JSON.parse(card.getAttribute('data-record') || '{}');
            const githubLink = card.getAttribute('data-github'); // Read GitHub Link
            showOverlay(title, desc, iconClass, records, 'project', githubLink);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('visible');
            document.body.style.overflow = 'auto';
        });
    }

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('visible');
            document.body.style.overflow = 'auto';
        }
    });
});

// Formspree Form Submission (AJAX)
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const action = contactForm.getAttribute('action');

        fetch(action, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'flex';
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert(data["errors"].map(error => error["message"]).join(", "));
                        } else {
                            alert("Oops! There was a problem submitting your form");
                        }
                    })
                }
            })
            .catch((error) => alert("Submission failed: " + error));
    });
}

function resetForm() {
    contactForm.reset();
    contactForm.style.display = 'block';
    successMessage.style.display = 'none';
}
