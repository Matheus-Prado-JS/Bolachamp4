const header = document.querySelector(".header");
const sections = document.querySelectorAll("section, footer");
const navLinks = document.querySelectorAll("nav a");

const menuToggle = document.querySelector(".menu-toggle");
const headerEl = document.querySelector(".header");

// toggle menu
menuToggle.addEventListener("click", () => {
  headerEl.classList.toggle("open");
});
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    headerEl.classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  // header efeito
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  let current = "";

  // HOME
  if (window.scrollY < 100) {
    current = "home";
  }

  // DETECÇÃO NORMAL
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= 150 && rect.bottom >= 150) {
      current = section.getAttribute("id");
    }
  });


  // ativa menu
  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

  // comportamento do header
  if (current === "home") {
    header.classList.remove("compact");
    header.classList.remove("open");
  } else {
    if (!header.classList.contains("open")) {
      header.classList.add("compact");
    }
  }
});

const texts = document.querySelectorAll(".hero-content h1, .hero-content p");

texts.forEach(text => {
  text.addEventListener("mousemove", (e) => {
    const rect = text.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = 100 - (x / rect.width) * 100;

    text.style.setProperty("--clip", percent + "%");
  });

  text.addEventListener("mouseleave", () => {
    text.style.setProperty("--clip", "0%");
  });
});