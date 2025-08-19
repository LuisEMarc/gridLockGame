// ======================
//  Tablero 8x8
// ======================
const board = document.getElementById("board");

// Crear las 64 celdas con atributos fila/columna
for (let row = 1; row <= 8; row++) {
  for (let col = 1; col <= 8; col++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.row = row;
    cell.dataset.col = col;
    board.appendChild(cell);
  }
}

// ======================
//  Definición de piezas
// ======================
const coloredPieces = [
  { id: "red",      w: 2, h: 2, color: "crimson" },
  { id: "yellow",   w: 4, h: 3, color: "gold" },
  { id: "orange",   w: 3, h: 3, color: "orange" },
  { id: "greenS",   w: 1, h: 4, color: "limegreen" },
  { id: "greenL",   w: 1, h: 5, color: "seagreen" },
  { id: "blueL",    w: 2, h: 5, color: "dodgerblue" },
  { id: "blueM",    w: 2, h: 4, color: "deepskyblue"},
  { id: "blueS",    w: 2, h: 3, color: "skyblue" }
];

const whitePieces = [
  { id: "whiteL", w: 1, h: 3, color: "white" },
  { id: "whiteM", w: 1, h: 2, color: "white" },
  { id: "whiteS", w: 1, h: 1, color: "white" }
];

// ======================
//  Render de piezas
// ======================
function renderPieces(container, pieces) {
  pieces.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("piece");
    div.style.width = `${p.w * 2}cm`;
    div.style.height = `${p.h * 2}cm`;
    div.style.background = p.color;
    div.textContent = p.id.toUpperCase();
    div.dataset.id = p.id;
    div.dataset.w = p.w;
    div.dataset.h = p.h;
    div.setAttribute("draggable", "true");
    container.appendChild(div);

    // Eventos drag
    div.addEventListener("dragstart", e => {
      e.dataTransfer.setData("piece-id", p.id);
    });
  });
}

const piecesArea = document.getElementById("pieces-area");
const levelArea = document.getElementById("level-area");
renderPieces(piecesArea, coloredPieces);
renderPieces(levelArea, whitePieces);

// ======================
//  Drag & Drop en tablero
// ======================
board.addEventListener("dragover", e => {
  e.preventDefault();
  if (e.target.classList.contains("cell")) {
    e.target.classList.add("drop-target");
  }
});

board.addEventListener("dragleave", e => {
  if (e.target.classList.contains("cell")) {
    e.target.classList.remove("drop-target");
  }
});

board.addEventListener("drop", e => {
  e.preventDefault();
  if (!e.target.classList.contains("cell")) return;

  const id = e.dataTransfer.getData("piece-id");
  const piece = document.querySelector(`[data-id="${id}"]`);

  if (piece) {
    e.target.appendChild(piece);
    piece.style.margin = "0"; // ajusta mejor visualmente
    piece.style.cursor = "grab";
  }

  e.target.classList.remove("drop-target");
});