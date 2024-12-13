const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const girarBtn = document.getElementById("girar");
const resultado = document.getElementById("resultado");

// Configuración de la ruleta: puedes modificar los valores del array
const opciones = [
  "Premio 1",
  "Premio 2",
  "Premio 3",
  "Premio 4",
  "Premio 5",
  "Premio 6",
  "Premio 7",
  "Premio 8",
];

// Colores alternativos para cada sección
const colores = ["#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#FFD700", "#8A2BE2", "#00CED1", "#FF4500"];

// Configuración de la ruleta
const tamañoRuleta = canvas.width / 2;
const anguloPorOpcion = (2 * Math.PI) / opciones.length;
let anguloActual = 0;
let velocidad = 0;
let giroActivo = false;

// Dibujar la ruleta
function dibujarRuleta() {
  for (let i = 0; i < opciones.length; i++) {
    const anguloInicial = anguloPorOpcion * i;
    const anguloFinal = anguloPorOpcion * (i + 1);

    // Dibujar sección
    ctx.beginPath();
    ctx.moveTo(tamañoRuleta, tamañoRuleta);
    ctx.arc(tamañoRuleta, tamañoRuleta, tamañoRuleta, anguloInicial, anguloFinal);
    ctx.fillStyle = colores[i % colores.length];
    ctx.fill();
    ctx.closePath();

    // Dibujar texto
    ctx.save();
    ctx.translate(tamañoRuleta, tamañoRuleta);
    ctx.rotate(anguloInicial + anguloPorOpcion / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "16px Arial";
    ctx.fillText(opciones[i], tamañoRuleta - 20, 10);
    ctx.restore();
  }
}

// Girar la ruleta
function girarRuleta() {
  if (giroActivo) return; // Prevenir múltiples giros simultáneos

  velocidad = Math.random() * 10 + 15; // Velocidad inicial aleatoria
  giroActivo = true;
  resultado.textContent = ""; // Limpiar el resultado previo

  const giroIntervalo = setInterval(() => {
    anguloActual += velocidad;
    velocidad *= 0.98; // Frenar gradualmente

    if (velocidad < 0.3) {
      clearInterval(giroIntervalo);
      giroActivo = false;
      mostrarResultado();
    }

    anguloActual %= 2 * Math.PI; // Mantener el ángulo entre 0 y 2π
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(tamañoRuleta, tamañoRuleta);
    ctx.rotate(anguloActual);
    ctx.translate(-tamañoRuleta, -tamañoRuleta);
    dibujarRuleta();
    ctx.restore();
  }, 16); // Aproximadamente 60 fps
}

// Mostrar el resultado
function mostrarResultado() {
  const indiceGanador = Math.floor(
    (opciones.length - (anguloActual / anguloPorOpcion)) % opciones.length
  );
  resultado.textContent = `Resultado: ${opciones[indiceGanador]}`;
}

// Event Listener para el botón
girarBtn.addEventListener("click", girarRuleta);

// Dibujar la ruleta inicialmente
dibujarRuleta();