// ==========================================
//           ROZIX PREMIUM MAIN.JS
// ==========================================

// ===== Sticky Navbar Shadow =====
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add("shadow-sm");
            navbar.style.padding = "10px 0"; // Scroll par navbar thoda sleek ho jayega
        } else {
            navbar.classList.remove("shadow-sm");
            navbar.style.padding = "15px 0"; // Normal size
        }
    }
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return; // Simple hash links ko skip karein

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// ===== Smooth Back To Top Button =====
const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener("scroll", () => {
        // Jab user 300px niche scroll karega tabhi button dikhega
        if (window.scrollY > 300) {
            backToTop.style.display = "block";
            backToTop.style.opacity = "1";
        } else {
            backToTop.style.opacity = "0";
            // Choti delay taake fade-out animation smooth lage
            setTimeout(() => {
                if (window.scrollY <= 300) {
                    backToTop.style.display = "none";
                }
            }, 300);
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ===== Premium Loading Screen =====
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(function () {
            loader.classList.add("loader-hide");
        }, 800); // 800ms ka smooth delay
    }
});

// ===== Scroll Entrance Animations (Intersection Observer) =====
const observerOptions = {
    root: null,
    threshold: 0.15, // Jab card 15% screen par aayega tabhi animate hoga
    rootMargin: "0px 0px -50px 0px"
};

const entranceObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target); // Ek baar animate hone ke baad check karna band kar de (Performance boost!)
        }
    });
}, observerOptions);

document.querySelectorAll(".category-card, .product-card, .feature-box, .card").forEach((el) => {
    entranceObserver.observe(el);
});