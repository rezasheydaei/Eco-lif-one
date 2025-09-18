// Initialize EmailJS - Replace with your keys
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Slider Functionality
    const slides = document.querySelectorAll(".slide");
    const prevSlide = document.querySelector(".prev-slide");
    const nextSlide = document.querySelector(".next-slide");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });
    }

    if (nextSlide && prevSlide && slides.length > 0) {
        nextSlide.addEventListener("click", () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        prevSlide.addEventListener("click", () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });

        // Auto-slide every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // Navbar Mobile Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // Smooth scroll for nav links
    const navA = document.querySelectorAll('.nav-links a[href^="#"]');
    navA.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            if (navLinks) navLinks.classList.remove("active");
        });
    });

    // Blog Data
    const blogPosts = [
        {
            title: "5 Ways to Reduce Your Carbon Footprint",
            description: "Simple steps to make a big impact on the environment.",
            category: "sustainability",
            link: "./blog-post-1.html",
            image: "https://images.unsplash.com/photo-1508514177221-188b645fd5af?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        },
        {
            title: "The Power of Renewable Energy",
            description: "Why solar and wind energy are the future.",
            category: "energy",
            link: "./blog-post-2.html",
            image: "https://images.unsplash.com/photo-1497436072909-60f69c88b26b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        },
        {
            title: "How to Start a Zero-Waste Lifestyle",
            description: "Tips to eliminate waste from your daily routine.",
            category: "sustainability",
            link: "./blog-post-3.html",
            image: "https://images.unsplash.com/photo-1562077772-3bd48b3773df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        },
        {
            title: "Solar Panels: A Beginner’s Guide",
            description: "Everything you need to know about solar energy.",
            category: "energy",
            link: "./blog-post-4.html",
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        },
        {
            title: "Why Green Living is the Best Choice for Our Future?",
            description: "Discover how small changes can lead to a sustainable tomorrow.",
            category: "sustainability",
            link: "./blog-post-5.html",
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        },
        {
            title: "Renewable Energy: Path to a Cleaner Future",
            description: "Explore the world of solar, wind, and hydro energy.",
            category: "energy",
            link: "./blog-post-6.html",
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        },
        {
            title: "How to Start a Zero-Waste Life with Small Challenges?",
            description: "Simple challenges to reduce waste and live greener.",
            category: "sustainability",
            link: "./blog-post-7.html",
            image: "https://images.unsplash.com/photo-1562077772-3bd48b3773df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        }
    ];

    // Blog Pagination
    let currentPage = 1;
    const postsPerPage = 3;

    function loadBlogPosts(filter = "all", page = 1) {
        const blogContainer = document.getElementById("blog-posts");
        if (!blogContainer) return;
        blogContainer.innerHTML = "";
        const filteredPosts = filter === "all" ? blogPosts : blogPosts.filter(post => post.category === filter);
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;
        const paginatedPosts = filteredPosts.slice(start, end);

        paginatedPosts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("blog-post");
            postElement.innerHTML = `
                <img src="${post.image}" alt="${post.title}" style="max-width: 100%; border-radius: 10px; margin-bottom: 1rem;">
                <h3>${post.title}</h3>
                <p>${post.description}</p>
                <a href="${post.link}" class="read-more">Read More</a>
            `;
            blogContainer.appendChild(postElement);
        });

        // Update Pagination
        const prevBtn = document.getElementById("prev-page");
        const nextBtn = document.getElementById("next-page");
        if (prevBtn) prevBtn.disabled = page === 1;
        if (nextBtn) nextBtn.disabled = end >= filteredPosts.length;
    }

    // Blog Filter
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(button => {
        button.addEventListener("click", () => {
            filterBtns.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            currentPage = 1;
            loadBlogPosts(button.dataset.filter, currentPage);
        });
    });

    // Pagination Controls
    const prevPage = document.getElementById("prev-page");
    const nextPage = document.getElementById("next-page");
    if (prevPage) {
        prevPage.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                loadBlogPosts(document.querySelector(".filter-btn.active").dataset.filter, currentPage);
            }
        });
    }
    if (nextPage) {
        nextPage.addEventListener("click", () => {
            currentPage++;
            loadBlogPosts(document.querySelector(".filter-btn.active").dataset.filter, currentPage);
        });
    }

    // Initial Blog Load
    loadBlogPosts();

    // Carbon Footprint Calculator
    const carbonForm = document.getElementById("carbon-form");
    if (carbonForm) {
        carbonForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const electricity = parseFloat(document.getElementById("electricity").value);
            const carTravel = parseFloat(document.getElementById("car-travel").value);
            const carbonFootprint = (electricity * 0.4) + (carTravel * 0.2); // Example coefficients
            document.getElementById("carbon-result").innerText = `Your estimated carbon footprint is ${carbonFootprint.toFixed(2)} kg CO2 per month. Try our green tips to reduce it!`;
        });
    }

    // Green Quiz
    const quizQuestions = [
        {
            question: "How often do you use reusable bags?",
            options: ["Always", "Sometimes", "Never"],
            scores: [10, 5, 0]
        },
        {
            question: "Do you turn off lights when not in use?",
            options: ["Always", "Sometimes", "Never"],
            scores: [10, 5, 0]
        },
        {
            question: "How often do you recycle?",
            options: ["Always", "Sometimes", "Never"],
            scores: [10, 5, 0]
        }
    ];

    let currentQuestion = 0;
    let quizScore = 0;

    const startQuizBtn = document.getElementById("start-quiz");
    const quizContainer = document.getElementById("quiz-container");
    if (startQuizBtn && quizContainer) {
        startQuizBtn.addEventListener("click", () => {
            startQuizBtn.style.display = "none";
            quizContainer.style.display = "block";
            currentQuestion = 0;
            quizScore = 0;
            loadQuizQuestion();
        });
    }

    function loadQuizQuestion() {
        const questionElement = document.getElementById("quiz-question");
        const optionsElement = document.getElementById("quiz-options");
        const quizResult = document.getElementById("quiz-result");
        if (!questionElement || !optionsElement || !quizResult) return;

        if (currentQuestion < quizQuestions.length) {
            const question = quizQuestions[currentQuestion];
            questionElement.innerText = question.question;
            optionsElement.innerHTML = "";
            question.options.forEach((option, index) => {
                const button = document.createElement("button");
                button.classList.add("cta-button");
                button.innerText = option;
                button.style.margin = "0.5rem";
                button.addEventListener("click", () => {
                    quizScore += question.scores[index];
                    currentQuestion++;
                    if (currentQuestion < quizQuestions.length) {
                        loadQuizQuestion();
                    } else {
                        showQuizResult();
                    }
                });
                optionsElement.appendChild(button);
            });
            quizResult.innerHTML = "";
        } else {
            showQuizResult();
        }
    }

    function showQuizResult() {
        const quizResult = document.getElementById("quiz-result");
        if (quizResult) {
            quizResult.innerHTML = `<p>Your Green Score: ${quizScore}/${quizQuestions.length * 10}. ${quizScore >= 20 ? "Great job! You're a green champion!" : "Try our tips to live greener!"}</p>`;
        }
    }

    // Contact Form Submission
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const templateParams = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
            };
            emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams) // Replace with your EmailJS IDs
                .then(() => {
                    alert("Thank you! Your message has been sent successfully.");
                    this.reset();
                }, (error) => {
                    alert("Failed to send message. Please try again later.");
                    console.error("EmailJS Error:", error);
                });
        });
    }
});
