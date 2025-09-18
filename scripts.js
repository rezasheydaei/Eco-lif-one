// Toggle Menu for Mobile View
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Toggle active class to show/hide menu
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth' // Smooth scrolling effect
        });
        navLinks.classList.remove('active'); // Close menu on mobile after click
    });
});

// Header Slider Functionality
let slideIndex = 0;
const slides = document.querySelectorAll('.header-slide');

function showSlides() {
    slides.forEach(slide => slide.style.display = 'none'); // Hide all slides
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; } // Loop back to first slide
    slides[slideIndex - 1].style.display = 'block'; // Show current slide
    setTimeout(showSlides, 5000); // Change slide every 5 seconds
}

showSlides(); // Start the slider

// Quiz Functionality
const quizButton = document.querySelector('#quiz-button');
const quizContainer = document.querySelector('#quiz-container');

quizButton.addEventListener('click', () => {
    quizContainer.innerHTML = `
        <h2>Take the Eco Quiz!</h2>
        <p>Question 1: What reduces carbon footprint the most?</p>
        <input type="radio" name="q1" value="a"> a) Using plastic bags<br>
        <input type="radio" name="q1" value="b"> b) Planting trees<br>
        <input type="radio" name="q1" value="c"> c) Driving more<br>
        <button onclick="checkQuiz()">Submit</button>
    `;
});

function checkQuiz() {
    const answer = document.querySelector('input[name="q1"]:checked');
    if (answer && answer.value === 'b') {
        quizContainer.innerHTML = '<p>Correct! Planting trees helps the most. Great job! 🌱</p>';
    } else {
        quizContainer.innerHTML = '<p>Try again! The best answer is planting trees. 🌳</p>';
    }
}

// Contact Form with EmailJS
(function() {
    emailjs.init('YOUR_PUBLIC_KEY'); // Initialize EmailJS with your Public Key (get from EmailJS dashboard)
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(function() {
            alert('Message sent successfully! Thank you! 🌱'); // Success message
            document.getElementById('contact-form').reset(); // Reset form
        }, function(error) {
            alert('Failed to send message. Please try again later. Error: ' + error); // Error message
        });
});

// Blog Data
const blogPosts = [
    {
        title: "5 Ways to Reduce Your Carbon Footprint",
        description: "Simple steps to make a big impact on the environment.",
        category: "sustainability",
        link: "./blog-post-1.html"
    },
    {
        title: "The Power of Renewable Energy",
        description: "Why solar and wind energy are the future.",
        category: "energy",
        link: "./blog-post-2.html"
    },
    {
        title: "How to Start a Zero-Waste Lifestyle",
        description: "Tips to eliminate waste from your daily routine.",
        category: "sustainability",
        link: "./blog-post-3.html"
    },
    {
        title: "Solar Panels: A Beginner’s Guide",
        description: "Everything you need to know about solar energy.",
        category: "energy",
        link: "./blog-post-4.html"
    },
    {
        title: "How to Help Nature with Home Gardening",
        description: "Discover the power of home gardening for a greener planet.",
        category: "sustainability",
        link: "./blog-post-5.html"
    },
    {
        title: "Revolution of Clean Energy: Solar Homes Guide",
        description: "A comprehensive guide to solar energy for homes.",
        category: "energy",
        link: "./blog-post-6.html"
    },
    {
        title: "How Urban Cycling Helps the Planet",
        description: "Learn how cycling can reduce pollution and improve health.",
        category: "sustainability",
        link: "./blog-post-7.html"
    }
];

// Dynamically Populate Blog Section
const blogSection = document.querySelector('#blog .blog-posts');
blogPosts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('blog-post');
    postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        <a href="${post.link}" class="read-more">Read More</a>
    `;
    blogSection.appendChild(postElement);
});
