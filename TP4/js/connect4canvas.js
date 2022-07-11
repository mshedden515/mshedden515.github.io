//setup game
var playerBlue = "A";
var playerRed = "R";
var heightCor;
var currPlayer = playerBlue;
var fichaActual = null;
var inicioX = 0, inicioY = 0;

var gameOver = false;
var board;

var fichasAgarrablesAzules = [];
var fichasAgarrablesRojas = [];
var rows = 6;
var columns = 7;
var currColumns = []; //keeps track of which row each column is at.

let canvas = document.getElementById('gameboard')
let ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//draw
let boardImage = new Image();
  boardImage.src = ('./img/board.png');
  boardImage.onload = function(){
    ctx.drawImage(boardImage, 380, 110, 450, 390)
  }

let fichaAzul = new Image();
fichaAzul.src = ('./img/fichaazul.png');
fichaAzul.onload = function(){
  for(var i = 0; i < 21; i++){
    let ficha = new Ficha(randomIntFromInterval(50, 300), randomIntFromInterval(100, 450), fichaAzul, playerBlue, ctx);
    fichasAgarrablesAzules.push(ficha);
    actualizar();
  }
}

let fichaRoja = new Image();
fichaRoja.src = ('./img/ficharoja.png');
fichaRoja.onload = function(){
  for(var i = 0; i < 21; i++){
    let ficha = new Ficha(randomIntFromInterval(850, 1100), randomIntFromInterval(100, 450), fichaRoja, playerRed, ctx);
    fichasAgarrablesRojas.push(ficha);
    actualizar();
  }
}

let resetButton = new Image();
resetButton.src = ('./img/reset.png');
resetButton.onload = function(){
  ctx.drawImage(resetButton, 0, 0, 50, 50)
}

let flecha = new Image();
flecha.src = ('./img/down-arrow-outline.png');
flecha.onload = function(){
  ctx.drawImage(flecha, 390, 58, 50, 50)
  ctx.drawImage(flecha, 452, 58, 50, 50)
  ctx.drawImage(flecha, 514, 58, 50, 50)
  ctx.drawImage(flecha, 576, 58, 50, 50)
  ctx.drawImage(flecha, 638, 58, 50, 50)
  ctx.drawImage(flecha, 700, 58, 50, 50)
  ctx.drawImage(flecha, 762, 58, 50, 50)
}

setGame();

//update
function actualizar(){
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  actualizarAzules();
  actualizarRojas();
  actualizarBoard();
  actualizarFlechas()
  actualizarBoardFichas()
}

function actualizarAzules(){
  for (var i = 0; i < fichasAgarrablesAzules.length; i++) {
    fichasAgarrablesAzules[i].draw();
  } 
}

function actualizarRojas(){
  for (var i = 0; i < fichasAgarrablesRojas.length; i++) {
    fichasAgarrablesRojas[i].draw();
  }
}

function actualizarBoard(){
  ctx.drawImage(boardImage, 380, 110, 450, 390)
  ctx.drawImage(resetButton, 0, 0, 50, 50)
}

function actualizarFlechas(){
  ctx.drawImage(flecha, 390, 58, 50, 50)
  ctx.drawImage(flecha, 452, 58, 50, 50)
  ctx.drawImage(flecha, 514, 58, 50, 50)
  ctx.drawImage(flecha, 576, 58, 50, 50)
  ctx.drawImage(flecha, 638, 58, 50, 50)
  ctx.drawImage(flecha, 700, 58, 50, 50)
  ctx.drawImage(flecha, 762, 58, 50, 50)
}

function actualizarBoardFichas(){
  for (let r = 0; r < rows; r++) {
      let row = [];
      for (let c = 0; c < columns; c++) {
          if (board[r][c] == playerRed){
            console.log(r + "-" + c);
            ctx.drawImage(fichaRoja, horizontalCor[c], heightCor[r], 50, 50)
          }
          else if (board[r][c] == playerBlue){
            ctx.drawImage(fichaAzul, horizontalCor[c], heightCor[r], 50, 50)
          }
      }
      board.push(row);
  }
}

//detectar mouse
canvas.onmousedown = function(event) {
  
  let mousePosX = Math.round(event.offsetX);
  let mousePosY = Math.round(event.offsetY);

  //console.log(mousePosX + " " + mousePosY)

  if(currPlayer == "A" && gameOver == false){
    for (let i = 0; i < fichasAgarrablesAzules.length; i++) {
      let fichaPosX = fichasAgarrablesAzules[i].getPosX();
      let fichaPosY = fichasAgarrablesAzules[i].getPosY();
      if ((mousePosX >= fichaPosX && mousePosX <= (fichaPosX + 50) &&
      mousePosY >= fichaPosY && mousePosY <= (fichaPosY +50))){
        fichaActual = fichasAgarrablesAzules[i];
        inicioY = event.clientY - fichaPosX;
        inicioX = event.clientX - fichaPosY;
  
        break;
      }
    }
  }
  if(currPlayer == "R" && gameOver == false){
    for (var i = 0; i < fichasAgarrablesRojas.length; i++) {
      let fichaPosX = fichasAgarrablesRojas[i].getPosX();
      let fichaPosY = fichasAgarrablesRojas[i].getPosY();
      if ((mousePosX >= fichaPosX && mousePosX <= (fichaPosX + 50) &&
      mousePosY >= fichaPosY && mousePosY <= (fichaPosY +50))){
        fichaActual = fichasAgarrablesRojas[i];
        inicioY = event.clientY - fichaPosX;
        inicioX = event.clientX - mousePosY;
  
        break;
      }
    }
  }
  if ((mousePosX >= 0 && mousePosX <= (0 + 50) &&
    mousePosY >= 0 && mousePosY <= (0 + 50))){
      reset();
  }
}

canvas.onmousemove = function(event) {
  if (fichaActual != null) {
    fichaActual.setPosX(event.offsetX - 25);
    fichaActual.setPosY(event.offsetY - 25);
    
    actualizar();
  }
}

canvas.onmouseup = function(event) {
  let mousePosX = Math.round(event.offsetX);
  let mousePosY = Math.round(event.offsetY);
  if (fichaActual != null){
    if ((mousePosX >= 390 && mousePosX <= (390 + 50) &&
    mousePosY >= 58 && mousePosY <= (58 + 50))){
      setPiece(0);
    }
    else if ((mousePosX >= 452 && mousePosX <= (452 + 50) &&
    mousePosY >= 58 && mousePosY <= (58 + 50))){
      setPiece(1);
    }
    else if ((mousePosX >= 514 && mousePosX <= (514 + 50) &&
    mousePosY >= 58 && mousePosY <= (58 + 50))){
      setPiece(2);
    }
    else if ((mousePosX >= 576 && mousePosX <= (576 + 50) &&
    mousePosY >= 58 && mousePosY <= (58 + 50))){
      setPiece(3);
    }
    else if ((mousePosX >= 638 && mousePosX <= (638 + 50) &&
    mousePosY >= 58 && mousePosY <= (58 + 50))){
      setPiece(4);
    }
    else if ((mousePosX >= 700 && mousePosX <= (700 + 50) &&
    mousePosY >= 58 && mousePosY <= (58 + 50))){
      setPiece(5);
    }
    else if ((mousePosX >= 762 && mousePosX <= (762 + 50) &&
    mousePosY >= 58 && mousePosY <= (58 + 50))){
      setPiece(6);
    }
    fichaActual.resetPos();
    fichaActual = null;
  }
  actualizar();
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function setGame() {
  board = [];
  //Corresponden a los indices de currColumns
  //0 = 390, 1 = 452, 2 = 515, 3 = 577, 4 = 639, 5 = 702, 6 = 764
  horizontalCor = [390, 452, 515, 577, 639, 702, 764]
  //cordenadas para cada "altura" que puede tener currColumns
  //Corresponden a los indices de currColumns
  //0 = 120, 1 = 183, 2 = 246, 3 = 308, 4 = 371, 5 = 434 
  heightCor = [120, 183, 246, 308, 371, 434];
  //cordenadas para cada ubicacion horizontal
  currColumns = [5, 5, 5, 5, 5, 5, 5];
  
  for (let r = 0; r < rows; r++) {
      let row = [];
      for (let c = 0; c < columns; c++) {
          // JS
          row.push(' ');
      }
      board.push(row);
  }
  
  var fiveMinutes = 60 * 5,
  display = document.querySelector('#time');
  startTimer(fiveMinutes, display);
  actualizar();
}

function setPiece(c) {
  if (gameOver) {
      return;
  }

  //get coords of that tile clicked
  /*let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);*/

  // figure out which row the current column should be on
  r = currColumns[c]; 

  if (r < 0) { // board[r][c] != ' '
      return;
  }

  board[r][c] = currPlayer; //update JS board
  /*let tile = document.getElementById(r.toString() + "-" + c.toString());*/
  if (currPlayer == playerRed) {
      //tile.classList.add("red-piece");
      currPlayer = playerBlue;
  }
  else {
      //tile.classList.add("yellow-piece");
      currPlayer = playerRed;
  }

  r -= 1; //update the row height for that column
  currColumns[c] = r; //update the array

  checkWinner();
}

function checkWinner() {
   // horizontal
   for (let r = 0; r < rows; r++) {
       for (let c = 0; c < columns - 3; c++){
          if (board[r][c] != ' ') {
              if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                  setWinner(r, c);
                  return;
              }
          }
       }
  }

  // vertical
  for (let c = 0; c < columns; c++) {
      for (let r = 0; r < rows - 3; r++) {
          if (board[r][c] != ' ') {
              if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                  setWinner(r, c);
                  return;
              }
          }
      }
  }

  // anti diagonal
  for (let r = 0; r < rows - 3; r++) {
      for (let c = 0; c < columns - 3; c++) {
          if (board[r][c] != ' ') {
              if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                  setWinner(r, c);
                  return;
              }
          }
      }
  }

  // diagonal
  for (let r = 3; r < rows; r++) {
      for (let c = 0; c < columns - 3; c++) {
          if (board[r][c] != ' ') {
              if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                  setWinner(r, c);
                  return;
              }
          }
      }
  }
}

function setWinner(r, c) {
  let winner = document.getElementById("winner");
  if (board[r][c] == playerRed) {
      winner.innerText = "Gano rojo";             
  } else {
      winner.innerText = "Gano azul";
  }
  gameOver = true;
}

function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  var interval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0 || gameOver == true) {
        if (gameOver != true){
          gameOver = true;
        }
        clearInterval(interval);
      }
  }, 1000);
}

function reset(){
  gameOver = false;
  currPlayer = playerBlue;
  let winner = document.getElementById("winner");
  winner.innerText = "";
  setGame();
  actualizar();
}