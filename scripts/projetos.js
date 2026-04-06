const carousels = document.querySelectorAll(".carousel");

carousels.forEach(carousel => {
  const track = carousel.querySelector(".track");

  // duplica uma vez
  track.innerHTML += track.innerHTML;

  let baseSpeed = 0.5;
  let speed = baseSpeed;
  let position = 0;

  let pauseTime = 0;
  let isPaused = false; // 🔥 CONTROLE REAL

const images = track.querySelectorAll("img");

let loaded = 0;

images.forEach(img => {
  if (img.complete) {
    loaded++;
  } else {
    img.onload = () => {
      loaded++;
      if (loaded === images.length) start();
    };
  }
});

// se já estiver tudo carregado
if (loaded === images.length) start();

function start() {
  function animate() {
    const items = track.children;

    const carouselRect = carousel.getBoundingClientRect();
    const centerX = carouselRect.left + carouselRect.width / 2;

    let closestDistance = Infinity;

    Array.from(items).forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;

      const distance = Math.abs(centerX - itemCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
      }
    });

    if (closestDistance < 10 && !isPaused) {
      pauseTime = 35;
      isPaused = true;
    }

    if (closestDistance > 30) {
      isPaused = false;
    }

    if (pauseTime > 0) {
      speed = 0;
      pauseTime--;
    } else {
      speed = baseSpeed;
    }

    position -= speed;

    const halfWidth = track.scrollWidth / 2;

    if (Math.abs(position) >= halfWidth) {
      position = 0;
    }

    track.style.transform = `translateX(${position}px)`;

    requestAnimationFrame(animate);
  }

  animate();

  
  carousel.addEventListener("mouseenter", () => speed = 0);
  carousel.addEventListener("mouseleave", () => speed = baseSpeed);
}
});