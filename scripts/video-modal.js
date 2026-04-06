const cards = document.querySelectorAll(".video-card");

// cria modal UMA VEZ
const modal = document.createElement("div");
modal.classList.add("video-modal");

modal.innerHTML = `
  <div class="video-modal-content">
    <span class="close">&times;</span>
    <div class="video-wrapper"></div>
    <div class="video-info">
      <h3></h3>
      <p></p>
    </div>
  </div>
`;

document.body.appendChild(modal);

const videoWrapper = modal.querySelector(".video-wrapper");
const title = modal.querySelector("h3");
const desc = modal.querySelector("p");
const closeBtn = modal.querySelector(".close");

// abrir modal
cards.forEach(card => {
  card.addEventListener("click", () => {

    const type = card.dataset.type;
    const videoId = card.dataset.video;
    const videoTitle = card.dataset.title;
    const videoDesc = card.dataset.desc;

    modal.classList.remove("vertical", "horizontal");
    modal.classList.add(type === "vertical" ? "vertical" : "horizontal");

    videoWrapper.innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/${videoId}?autoplay=1"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen>
      </iframe>
    `;

    title.textContent = videoTitle;
    desc.textContent = videoDesc;

    modal.classList.add("active");
  });
});

// fechar modal
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

function closeModal() {
  modal.classList.remove("active");
  videoWrapper.innerHTML = ""; // para o vídeo
}

const hoverTimers = new Map();

cards.forEach(card => {
  card.previewIframe = null;

  card.addEventListener("mouseenter", () => {
    const videoId = card.dataset.video;

    const timer = setTimeout(() => {
      card.previewIframe = document.createElement("iframe");

      card.previewIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`;
      card.previewIframe.classList.add("preview-video");

        if (card.classList.contains("vertical")) {
        card.previewIframe.classList.add("vertical");
        } else {
        card.previewIframe.classList.add("horizontal");
        }

      card.appendChild(card.previewIframe); // 🔥 FALTAVA ISSO
    }, 4000);

    hoverTimers.set(card, timer);
  });

  card.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimers.get(card));

    if (card.previewIframe) {
      card.previewIframe.remove();
      card.previewIframe = null;
    }
  });
});