if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => console.log("Service Worker Registered"))
    .catch((error) =>
      console.error("Service Worker Registration Failed:", error)
    );
}

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll("nav ul li a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: "smooth" });
      document.getElementById("check").checked = false;
    });
  });

  // Handle Hire Me and Portfolio button clicks
  document.querySelectorAll(".hire__me").forEach((button) => {
    button.addEventListener("click", () => {
      alert("Thank you for your interest! Please use the contact links below.");
    });
  });

  document.querySelectorAll(".portfolio").forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById("resume").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Debounced parallax effect
  let debounceTimeout;
  window.addEventListener("scroll", () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      document.querySelectorAll(".section").forEach((section) => {
        const depth = section.getBoundingClientRect().top / window.innerHeight;
        section.style.transform = `translateZ(${depth * -50}px)`;
      });
    }, 100);
  });

  // Trigger animations on section visibility
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section);
  });
});
