const contatoBtn = document.querySelector(".contato-btn");
const contatoPopup = document.querySelector(".contato-popup");

// abrir/fechar
contatoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  contatoPopup.classList.toggle("active");
});

// fechar clicando fora
document.addEventListener("click", (e) => {
  if (
    !contatoPopup.contains(e.target) &&
    !contatoBtn.contains(e.target)
  ) {
    contatoPopup.classList.remove("active");
  }
});

const heroBtn = document.querySelector(".hero-contato-btn");
const heroContato = document.querySelector(".hero-contato");

// toggle do HERO
heroBtn.addEventListener("click", (e) => {
  e.preventDefault();
  heroContato.classList.toggle("active");
});
document.addEventListener("click", (e) => {
  if (
    !heroContato.contains(e.target) &&
    !heroBtn.contains(e.target)
  ) {
    heroContato.classList.remove("active");
  }
});
const contatos = document.querySelectorAll(".contato-item, .footer-item");

contatos.forEach(item => {
  item.addEventListener("click", () => {
    const texto = item.innerText.trim();

    navigator.clipboard.writeText(texto);

    // feedback visual 🔥
    item.classList.add("copiado");

    const original = item.innerHTML;

    item.innerHTML = "✔ Copiado!";

    setTimeout(() => {
      item.innerHTML = original;
      item.classList.remove("copiado");
    }, 1200);
  });
});