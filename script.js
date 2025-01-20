// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
});

// Theme Toggle
const themeToggle = document.querySelector(".theme-toggle");
const body = document.body;

// Kiểm tra theme đã lưu trong localStorage khi trang web load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute("data-theme", "dark");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Cập nhật xử lý sự kiện click
themeToggle.addEventListener("click", () => {
    if (body.getAttribute("data-theme") === "dark") {
        body.removeAttribute("data-theme");
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute("data-theme", "dark");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
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

// Khởi tạo EmailJS
(function () {
    emailjs.init("QUjUWCuIm9YgGteuV"); // Thay trực tiếp public key vào
})();

// Form Submission with EmailJS
const contactForm = document.querySelector("#contactForm");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector("button");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    const templateParams = {
        from_name: document.querySelector("#name").value,
        from_email: document.querySelector("#email").value,
        message: document.querySelector("#message").value,
    };

    emailjs
        .send("service_vk1kxz1", "template_e1jr7up", templateParams)
        .then(
            function (response) {
                console.log("SUCCESS!", response.status, response.text);
                alert("Message sent successfully!");
                contactForm.reset();
            },
            function (error) {
                console.log("FAILED...", error);
                alert(`Failed to send message: ${error.text}`);
            }
        )
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
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
