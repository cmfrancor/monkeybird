# MonkeyBird (Mokepon) 🐦

Juego multijugador en red local inspirado en Pokémon. Cada jugador elige una
criatura (un *mokepon*), recorre un mapa compartido y, al chocar con otro
jugador, entra en un combate por turnos de tipo piedra–papel–tijera.

## 🎮 Cómo se juega

1. **Elige tu mokepon.** Al abrir el juego eliges una de las seis criaturas
   disponibles.
2. **Recórrete el mapa.** Te mueves por el mapa con las flechas del teclado o
   con los botones de dirección en pantalla (pensados para el celular).
3. **Encuentra a otro jugador.** El juego comparte en tiempo real la posición de
   todos los jugadores conectados, así que ves a los demás moverse por el mapa.
4. **Combate al colisionar.** Cuando tu mokepon choca con el de otro jugador,
   ambos pasan a la pantalla de combate.
5. **Elige tus 5 ataques.** Cada quien selecciona 5 ataques de su mokepon. Al
   completar los 5, se envían al servidor.
6. **Gana el mejor de 5.** Los ataques de ambos jugadores se comparan uno a uno
   y gana quien acumule más rondas a favor.

## ⚔️ Reglas del combate

Cada ataque es de un tipo, y los tipos se vencen en ciclo (como piedra, papel o
tijera):

| Tipo | Vence a |
| --- | --- |
| 💧 Agua | 🔥 Fuego |
| 🔥 Fuego | 🪨 Tierra |
| 🪨 Tierra | 💧 Agua |

Si ambos ataques son del mismo tipo, la ronda es un **empate**.

### Mokepones disponibles

`Petirrojo` · `Copetón` · `Aguila` · `Titi` · `Gorila` · `Aullador`

Cada mokepon tiene su propia combinación de 5 ataques (más cargado hacia un tipo
u otro), lo que le da su estilo de juego.

## 🛠️ Tecnologías

- **Backend:** [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
  (con [CORS](https://www.npmjs.com/package/cors)).
- **Frontend:** HTML, CSS y JavaScript puro, con la **Canvas API** para dibujar
  el mapa y los personajes.

El servidor cumple dos funciones: sirve el frontend estático desde `public/` y
expone una pequeña API que mantiene el estado de los jugadores **en memoria**
(no hay base de datos; al reiniciar el servidor se pierde la partida).

## 🚀 Instalación y ejecución

Requisitos: tener **Node.js** instalado.

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor
node index.js
```

Verás en la consola `Servidor Funcionando`. Luego abre en el navegador:

```
http://localhost:8080
```

## 📡 Jugar en red local

Para que varios dispositivos jueguen juntos, todos deben estar en la **misma red
WiFi** y entrar usando la **IP del equipo que corre el servidor** (no
`localhost`).

1. En la máquina que corre el servidor, averigua su IP local:

   ```bash
   # macOS (WiFi)
   ipconfig getifaddr en0
   ```

   Por ejemplo: `192.168.1.2`.

2. En cada dispositivo (incluido el propio servidor), abre el juego con esa IP:

   ```
   http://192.168.1.2:8080
   ```

> **Nota:** si otro dispositivo no logra conectarse, revisa que el **firewall**
> del equipo servidor permita conexiones entrantes a Node en el puerto 8080.

Como el cliente usa rutas relativas, cada navegador habla automáticamente con el
servidor del que descargó la página, sin importar la IP usada.

## 📁 Estructura del proyecto

```
.
├── index.js            # Servidor Express (API + sirve el frontend)
├── package.json
└── public/             # Frontend que se sirve estáticamente
    ├── index.html      # Página del juego
    ├── styles.css      # Estilos
    ├── js/
    │   └── mokepon.js  # Lógica del juego (mapa, combate, red)
    └── assets/         # Imágenes de los mokepones y del mapa
```

## 🔌 API del servidor

Todas las respuestas y los cuerpos de petición usan JSON (salvo `/unirse`, que
devuelve texto plano).

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET`  | `/unirse` | Registra un jugador nuevo y devuelve su `id`. |
| `POST` | `/mokepon/:jugadorId` | Asigna el mokepon elegido. Body: `{ "mokepon": "Petirrojo" }`. |
| `POST` | `/mokepon/:jugadorId/posicion` | Actualiza la posición del jugador (`{ "x": …, "y": … }`) y devuelve la lista de `enemigos` con su posición. |
| `POST` | `/mokepon/:jugadorId/ataques` | Guarda los 5 ataques elegidos. Body: `{ "ataques": [...] }`. |
| `GET`  | `/mokepon/:jugadorId/ataques` | Devuelve los ataques que ese jugador ya seleccionó. |

El cliente sondea la posición cada ~50 ms para mantener el mapa actualizado y,
durante el combate, consulta los ataques del rival hasta que estén completos.
