// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
});

// Theme Toggle
const themeToggle = document.querySelector(".theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
    if (body.getAttribute("data-theme") === "dark") {
        body.removeAttribute("data-theme");
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        body.setAttribute("data-theme", "dark");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        });
    });
});

// Form Submission
const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert("Message sent successfully!");
    contactForm.reset();
});

// Scroll Animation for Skill Bars
const skillBars = document.querySelectorAll(".progress");

const showProgress = () => {
    skillBars.forEach((bar) => {
        const value = bar.style.width;
        bar.style.width = "0";
        setTimeout(() => {
            bar.style.width = value;
        }, 500);
    });
};

// Trigger skill bars animation when about section is in view
const aboutSection = document.querySelector(".about");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                showProgress();
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

observer.observe(aboutSection);

// Navbar Scroll Effect
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove("scroll-up");
        return;
    }

    if (
        currentScroll > lastScroll &&
        !navbar.classList.contains("scroll-down")
    ) {
        navbar.classList.remove("scroll-up");
        navbar.classList.add("scroll-down");
    } else if (
        currentScroll < lastScroll &&
        navbar.classList.contains("scroll-down")
    ) {
        navbar.classList.remove("scroll-down");
        navbar.classList.add("scroll-up");
    }
    lastScroll = currentScroll;
});
