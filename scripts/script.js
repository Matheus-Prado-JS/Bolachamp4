const header = document.querySelector(".header");
const sections = document.querySelectorAll("section, footer");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  // header efeito
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // seção ativa
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
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