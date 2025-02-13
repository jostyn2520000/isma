// Cambiar la fecha de inicio al 1 de enero de 2025
const startDate = new Date("2023-12-22");
let heartsInterval;
let isPlaying = false;
let audioPlayer = document.getElementById('audioPlayer');

// Reproducir la música automáticamente al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  audioPlayer.play().catch(error => console.log("Autoplay bloqueado:", error));
  isPlaying = true;
  updateMusicButton();
  startHeartsAnimation(); // Iniciar la animación de corazones automáticamente
});

// Función para actualizar los contadores
function updateCounters() {
  const now = new Date();
  const diff = now - startDate;

  // Calcular los años, meses y días correctamente
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (days < 0) {
    months--;
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0); // Último día del mes anterior
    days += lastMonth.getDate();
  }

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const counters = {
    años: years,
    meses: months,
    días: days,
    horas: hours,
    minutos: minutes,
    segundos: seconds,
  };

  const countersHTML = Object.entries(counters)
    .map(
      ([label, value]) => `
        <div class="counter">
          <div class="counter-value">${value}</div>
          <div class="counter-label">${label}</div>
        </div>
      `
    )
    .join("");

  document.getElementById("counters").innerHTML = countersHTML;
}

// Función para crear corazones animados
function createHeart() {
  const heart = document.createElement("div");
  heart.innerHTML = "❤️";
  heart.className = "heart";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";
  document.body.appendChild(heart);

  heart.addEventListener("animationend", () => {
    heart.remove();
  });
}

// Función para iniciar la animación de corazones automáticamente
function startHeartsAnimation() {
  heartsInterval = setInterval(createHeart, 900);
}

// Función para actualizar el botón de música
function updateMusicButton() {
  const musicButton = document.querySelector(".action-button");
  musicButton.style.color = isPlaying ? "#ff1493" : "#666";
}

// Función para alternar la reproducción de música
function toggleMusic() {
  if (isPlaying) {
    audioPlayer.pause();
  } else {
    audioPlayer.play().catch(error => console.log("Error al reproducir:", error));
  }
  isPlaying = !isPlaying;
  updateMusicButton();
}

// Mostrar u ocultar el mensaje
function toggleMessage() {
  const message = document.querySelector(".message");
  message.style.display =
    message.style.display === "none" ? "block" : "none";
}

let currentImage = 1; // Variable para llevar el control de la imagen actual

// Función para cambiar la imagen con efecto de desvanecimiento
function changeImage() {
  const image = document.getElementById('couple-image'); // Obtener la imagen

  // Primero, hacer que la imagen actual se desvanezca (opacidad 0)
  image.style.opacity = 0;

  // Esperar a que termine la transición antes de cambiar la imagen
  setTimeout(() => {
    currentImage++;
    if (currentImage > 2) {
      currentImage = 1; // Volver a la primera imagen después de la séptima
    }

    // Cambiar la fuente de la imagen
    image.src = `assets/pareja${currentImage}.jpeg`;

    // Asegurarse de que la nueva imagen cargue antes de aplicarle la opacidad
    image.onload = () => {
      image.style.opacity = 1; // Volver a mostrar la imagen con opacidad 1
    };
  }, 1000); // Tiempo igual a la duración de la transición (1 segundo)
}

// Cambiar la imagen automáticamente cada 3 segundos (3000 milisegundos)
setInterval(changeImage, 3000); // 3000ms = 3 segundos

// Iniciar contadores
setInterval(updateCounters, 1000);
updateCounters();
