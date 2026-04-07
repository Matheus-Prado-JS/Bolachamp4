document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".feedback-card");
  const dots = document.querySelectorAll(".dot");

  let current = 0;

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.index);

      if (index === current) return;

      const currentCard = cards[current];
      const nextCard = cards[index];

      // saída
      currentCard.classList.remove("active");
      currentCard.classList.add("exit");

      setTimeout(() => {
        currentCard.classList.remove("exit");
      }, 500);

      // entrada
      nextCard.classList.add("active");

      // dots
      dots[current].classList.remove("active");
      dot.classList.add("active");

      current = index;
    });
  });
});