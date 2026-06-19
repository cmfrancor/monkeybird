const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciar = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonReiniciar = document.getElementById("boton-reiniciar");
const secionSeleccionarMascota = document.getElementById("seleccionar-mascota");
const spanMascotaJugador = document.getElementById("mascota-jugador");
const tarjetaCombateJugador = document.getElementById("nombre-foto-jugador");
const spanMascotaEnemigo = document.getElementById("mascota-enemigo");
const tarjetaCombateEnemigo = document.getElementById("nombre-foto-enemigo");
const spanVictoriasJugador = document.getElementById("vidas-jugador");
const spanVictoriasEnemigo = document.getElementById("vidas-enemigo");
const sectionMensajes = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
const contenedorAtaques = document.getElementById("ataques");
const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");

let jugadorId = null;
let mokepones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let desenlaceCombate;
let opcionDeMokepones;
let inputPetirrojo;
let inputCopeton;
let inputAguila;
let inputTiti;
let inputGorila;
let inputAullador;
let mascotaJugador;
let mascotaJugadorObjeto;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonFuego
let botonAgua
let botonTierra
let botones = [];
let indexAtaqueJugador;
let IndexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let lienzo = mapa.getContext("2d");
lienzo.imageSmoothingEnabled = true;
lienzo.imageSmoothingQuality = "high";
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = './assets/monkeybird.png';
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 640;
if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa;
}
let alturaQueBuscamos = anchoDelMapa*480/640;
mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;
class Mokepon {
  constructor(nombre, foto, vida, fotoMapa, id = null) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.tamanoMaximo = 90;
    this.ancho = 80;
    this.alto = 80;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.fotoMapa = new Image();
    this.fotoMapa.src = fotoMapa;
    this.fotoMapa.onload = () => {
      const proporcion = this.fotoMapa.naturalWidth / this.fotoMapa.naturalHeight;
      if (proporcion >= 1) {
        this.ancho = this.tamanoMaximo;
        this.alto = this.tamanoMaximo / proporcion;
      } else {
        this.alto = this.tamanoMaximo;
        this.ancho = this.tamanoMaximo * proporcion;
      }
    };
    this.velocidadX = 0;
    this.velocidadY = 0;
  }
  pintarMonkeyBird() {
    lienzo.drawImage(
    this.fotoMapa,
    this.x,
    this.y,
    this.ancho,
    this.alto
  );
  }
}

let petirrojo = new Mokepon('Petirrojo', './assets/petirrojo.png', 5, './assets/petirrojo_mapa.png');
let copeton = new Mokepon('Copetón', './assets/copeton.png', 5, './assets/copeton_mapa.png');
let aguila = new Mokepon('Aguila', './assets/aguila.png', 5, './assets/aguila_mapa.png');
let titi = new Mokepon('Titi', './assets/titi.png', 5, './assets/titi_mapa.png');
let gorila = new Mokepon('Gorila', './assets/gorila.png', 5, './assets/gorila_mapa.png');
let aullador = new Mokepon('Aullador', './assets/aullador.png', 5, './assets/aullador_mapa.png');

const ataquesPetirrojo = [
  { nombre: '🔥', id: 'boton-fuego'},
  { nombre: '🔥', id: 'boton-fuego'},
  { nombre: '🔥', id: 'boton-fuego'},
  { nombre: '🪨', id: 'boton-tierra'},
  { nombre: '💧', id: 'boton-agua'},
]

petirrojo.ataques.push(... ataquesPetirrojo);

const ataquesCopeton = [
  { nombre: '💧', id: 'boton-agua'},
  { nombre: '💧', id: 'boton-agua'},
  { nombre: '💧', id: 'boton-agua'},
  { nombre: '🪨', id: 'boton-tierra'},
  { nombre: '🔥', id: 'boton-fuego'},
]

copeton.ataques.push(... ataquesCopeton);


const ataquesAguila = [
  { nombre: '💧', id: 'boton-agua'},
  { nombre: '💧', id: 'boton-agua'},
  { nombre: '🪨', id: 'boton-tierra'},
  { nombre: '🔥', id: 'boton-fuego'},
  { nombre: '🔥', id: 'boton-fuego'},
]

aguila.ataques.push(... ataquesAguila);


const ataquesTiti = [
  { nombre: '🪨', id: 'boton-tierra'},
  { nombre: '🪨', id: 'boton-tierra'},
  { nombre: '🪨', id: 'boton-tierra'},
  { nombre: '💧', id: 'boton-agua'},
  { nombre: '🔥', id: 'boton-fuego'},
]

titi.ataques.push(... ataquesTiti);

const ataquesGorila = [
  { nombre: '🪨', id: 'boton-tierra'},
  { nombre: '🪨', id: 'boton-tierra'},
  { nombre: '🪨', id: 'boton-tierra'},
  { nombre: '💧', id: 'boton-agua'},
  { nombre: '🔥', id: 'boton-fuego'},
]

gorila.ataques.push(... ataquesGorila);

const ataquesAullador = [
  { nombre: '🪨', id: 'boton-tierra'},
  { nombre: '🪨', id: 'boton-tierra'},
  { nombre: '💧', id: 'boton-agua'},
  { nombre: '💧', id: 'boton-agua'},
  { nombre: '🔥', id: 'boton-fuego'},
]

aullador.ataques.push(... ataquesAullador);


mokepones.push(petirrojo, copeton, aguila, titi, gorila, aullador);

function iniciarJuego() {
  
  sectionSeleccionarAtaque.style.display = "none";
  sectionVerMapa.style.display = "none";

  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `<input type="radio" name="mascotas" id=${mokepon.nombre} />
        <label class = "tarjeta-de-mokepon" for=${mokepon.nombre}>
          <p>${mokepon.nombre}</p>
          <img src = "${mokepon.foto}">
        </label>`
  contenedorTarjetas.innerHTML += opcionDeMokepones;
  inputPetirrojo = document.getElementById("Petirrojo");
  inputCopeton = document.getElementById("Copetón");
  inputAguila = document.getElementById("Aguila");
  inputTiti = document.getElementById("Titi");
  inputGorila = document.getElementById("Gorila");
  inputAullador = document.getElementById("Aullador");
  })
  sectionReiniciar.style.display = "none";
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  botonReiniciar.addEventListener("click", reiniciarJuego);

  unirseAlJuego()
}

function unirseAlJuego() {
  fetch("http://localhost:8080/unirse").then(function (res) {
    console.log(res);
    if (res.ok) {
      res.text().then(function (respuesta) {
        console.log(respuesta)
        jugadorId = respuesta;
      })
    }
  })

}

function seleccionarMascotaJugador(){

  let imagen = document.createElement("img");
  let mascotaSeleccionada = false;

  mokepones.forEach((mokepon) => {
      let input = document.getElementById(mokepon.nombre);
      if (input.checked) {
          spanMascotaJugador.innerHTML = mokepon.nombre;
          mascotaJugador = mokepon.nombre;
          imagen.src = mokepon.foto;  // ← usa la foto que ya está en el objeto
          mascotaSeleccionada = true;
      }
  });

  if (!mascotaSeleccionada) {
      alert("Se requiere una selección!");
      return;
  }
  
  secionSeleccionarMascota.style.display = "none";
  sectionVerMapa.style.display = "flex";

  iniciarMapa();

  seleccionarMokepon(mascotaJugador);

  extraerAtaques(mascotaJugador);
  imagen.className = "imagen-adaptable";
  tarjetaCombateJugador.appendChild(imagen);

}

function seleccionarMokepon(mascotaJugador) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mokepon: mascotaJugador
    })
  })
}

function extraerAtaques(mascotaJugador) {
  let ataques;
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }

  }
  mostrarAtaques(ataques);

}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `<button id = ${ataque.id} class="boton-de-ataque BAtaque"> ${ataque.nombre} </button>`
    contenedorAtaques.innerHTML += ataquesMokepon
  })
  botonFuego = document.getElementById("boton-fuego");
  botonAgua = document.getElementById("boton-agua");
  botonTierra = document.getElementById("boton-tierra");

  botones = document.querySelectorAll('.BAtaque')
  
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener('click', (e) => {
      if (e.target.textContent === ' 🔥 ') {
        ataqueJugador.push('Fuego');
        console.log(ataqueJugador);
        boton.style.background = '#112f58';
        boton.disabled = true;
      } else if (e.target.textContent === ' 💧 ') {
        ataqueJugador.push('Agua');
        console.log(ataqueJugador);
        boton.style.background = '#112f58';
        boton.disabled = true;
      } else {
        ataqueJugador.push('Tierra');
        console.log(ataqueJugador);
        boton.style.background = '#112f58';
        boton.disabled = true;
      }
      ataqueAleatorioEnemigo();
    })
    
  })
  
}

function aleatorio(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function seleccionarMascotaEnemigo(enemigo) {
  let imagen = document.createElement("img");
  spanMascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;
  imagen.src = enemigo.foto
  imagen.className = "imagen-adaptable";
  tarjetaCombateEnemigo.appendChild(imagen);
  secuenciaAtaque();
}


function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = ataquesMokeponEnemigo[aleatorio(0, ataquesMokeponEnemigo.length - 1)].nombre;
  if (ataqueAleatorio === '🔥') {
        ataqueEnemigo.push('Fuego');
        console.log(ataqueEnemigo);
      } else if (ataqueAleatorio === '💧') {
        ataqueEnemigo.push('Agua');
        console.log(ataqueEnemigo);
      } else {
        ataqueEnemigo.push('Tierra');
        console.log(ataqueEnemigo);
      }
  iniciarPelea();
}

function iniciarPelea() {
  if (ataqueJugador.length === 5 && ataqueEnemigo.length === 5) {
    combate();
  }
}

function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];
  IndexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {

  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]){
      indexAmbosOponentes(index, index);
      desenlaceCombate = "EMPATE";
    } else if ((ataqueJugador[index] == "Agua" && ataqueEnemigo[index] == "Fuego") || (ataqueJugador[index] == "Fuego" && ataqueEnemigo[index] == "Tierra") || (ataqueJugador[index] == "Tierra" && ataqueEnemigo[index] == "Agua")) {
      indexAmbosOponentes(index, index);
      desenlaceCombate = "GANASTE";
      victoriasJugador++
      spanVictoriasJugador.innerHTML = victoriasJugador;
    } else {
      indexAmbosOponentes(index, index);
      desenlaceCombate = "PERDISTE";
      victoriasEnemigo++
      spanVictoriasEnemigo.innerHTML = victoriasEnemigo;
    }
    crearMensaje();
  }
  revisarVictorias();
}

function revisarVictorias() {
  if (victoriasJugador == victoriasEnemigo) {
    crearMensajeFinal("Esto fue un empate! 👾");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("Ganaste! 🎯");
  } else {
    crearMensajeFinal("Perdiste!");
  }

}

function crearMensaje() {
  let nuevoAtaqueDelJugador = document.createElement('p');
  let nuevoAtaqueDelEnemigo = document.createElement('p');

  sectionMensajes.innerHTML = desenlaceCombate;

  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = IndexAtaqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal
  sectionReiniciar.style.display = "flex";
}

function reiniciarJuego() {
  location.reload();
}

function pintarCanvas() {
  mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
  mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
  lienzo.clearRect(0,0,mapa.width,mapa.height)
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);

  mascotaJugadorObjeto.pintarMonkeyBird();

  enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);

  // petirrojoEnemigo.pintarMonkeyBird();
  // titiEnemigo.pintarMonkeyBird();
  // gorilaEnemigo.pintarMonkeyBird();
  // aulladorEnemigo.pintarMonkeyBird();
  // aguilaEnemigo.pintarMonkeyBird();
  // copetonEnemigo.pintarMonkeyBird();

  if (mascotaJugadorObjeto.velocidadX != 0 || mascotaJugadorObjeto.velocidadY != 0) {
    revisarColision(petirrojoEnemigo);
    revisarColision(aguilaEnemigo);
    revisarColision(aulladorEnemigo);
    revisarColision(copetonEnemigo);
    revisarColision(gorilaEnemigo);
    revisarColision(titiEnemigo);
  }

}

function enviarPosicion(x, y) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      x,
      y
    })
  }).then(function (res) {
    if (res.ok) {
      res.json().then(function({enemigos}) {
        enemigos.forEach(function(enemigo) {
          let monkeyBirdEnemigo = null;
          const monkeyBirdNombre = enemigo.mokepon.nombre || "";
          if (monkeyBirdNombre === "Petirrojo") {
            monkeyBirdEnemigo = new Mokepon('Petirrojo', './assets/petirrojo.png', 5, './assets/petirrojo_mapa.png');
          } else if (monkeyBirdNombre === "Copetón") {
            monkeyBirdEnemigo = new Mokepon('Copetón', './assets/copeton.png', 5, './assets/copeton_mapa.png');
          } else if (monkeyBirdNombre === "Aguila") {
            monkeyBirdEnemigo = new Mokepon('Aguila', './assets/aguila.png', 5, './assets/aguila_mapa.png');
          } else if (monkeyBirdNombre === "Titi") {
            monkeyBirdEnemigo = new Mokepon('Titi', './assets/titi.png', 5, './assets/titi_mapa.png');
          } else if (monkeyBirdNombre === "Gorila") {
            monkeyBirdEnemigo = new Mokepon('Gorila', './assets/gorila.png', 5, './assets/gorila_mapa.png');
          } else if (monkeyBirdNombre === "Aullador") {
            monkeyBirdEnemigo = new Mokepon('Aullador', './assets/aullador.png', 5, './assets/aullador_mapa.png');
          }

          monkeyBirdEnemigo.x = enemigo.x;
          monkeyBirdEnemigo.y = enemigo.y;
          monkeyBirdEnemigo.pintarMonkeyBird()
        })
      })
    }
  })
}

function moverDerecha() {
  mascotaJugadorObjeto.velocidadX = 3;
}

function moverIzquierda() {
  mascotaJugadorObjeto.velocidadX = -3;
}

function moverAbajo() {
  mascotaJugadorObjeto.velocidadY = 3;
}

function moverArriba() {
  mascotaJugadorObjeto.velocidadY = -3;
}

function detenerMovimiento () {
  mascotaJugadorObjeto.velocidadX = 0;
  mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionoUnaTecla (event) {
  switch (event.key) {
    case 'ArrowDown':
      moverAbajo();
      break;
    case 'ArrowUp':
      moverArriba();
      break;
    case 'ArrowRight':
      moverDerecha();
      break;
    case 'ArrowLeft':
      moverIzquierda();
      break;
  }
  
  console.log(event.key);

}

function iniciarMapa() {
  mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);
  intervalo = setInterval(pintarCanvas, 50);
  window.addEventListener('keydown', sePresionoUnaTecla);
  window.addEventListener('keyup', detenerMovimiento);
}

function obtenerObjetoMascota() {
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      return mokepones[i];
    }

  }
}

function revisarColision(enemigo) {
  const margen = 0.2;
  const margenXEnemigo = enemigo.ancho * margen;
  const margenYEnemigo = enemigo.alto * margen;
  const arribaEnemigo = enemigo.y + margenYEnemigo;
  const abajoEnemigo = enemigo.y + enemigo.alto - margenYEnemigo;
  const derechaEnemigo = enemigo.x + enemigo.ancho - margenXEnemigo;
  const izquierdaEnemigo = enemigo.x + margenXEnemigo;

  const margenXMascota = mascotaJugadorObjeto.ancho * margen;
  const margenYMascota = mascotaJugadorObjeto.alto * margen;
  const arribaMascota = mascotaJugadorObjeto.y + margenYMascota;
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto - margenYMascota;
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho - margenXMascota;
  const izquierdaMascota = mascotaJugadorObjeto.x + margenXMascota;

  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ){
    return;

  } 
  alert("Hay Colisión con: " + enemigo.nombre);
  detenerMovimiento();
  clearInterval(intervalo);
  seleccionarMascotaEnemigo(enemigo)
  sectionSeleccionarAtaque.style.display = "flex";
  sectionVerMapa.style.display = "none";
}


window.addEventListener("load", iniciarJuego);

