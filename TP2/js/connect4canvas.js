var playerBlue = "A";
var playerRed = "R";
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


function actualizar(){
  for (var i = 0; i < fichasAgarrablesAzules.length; i++) {
    fichasAgarrablesAzules[i].draw();
  }
  for (var i = 0; i < fichasAgarrablesRojas.length; i++) {
    fichasAgarrablesRojas[i].draw();
  }
}


let fichaAzul = new Image();
fichaAzul.src = ('./img/fichaazul.png');
fichaAzul.onload = function(){
  for(var i = 0; i < 21; i++){
    let ficha = new Ficha(randomIntFromInterval(50, 300), randomIntFromInterval(100, 450), fichaAzul, playerBlue, ctx, 50);
    fichasAgarrablesAzules.push(ficha);
  }
}

let fichaRoja = new Image();
fichaRoja.src = ('./img/ficharoja.png');
fichaRoja.onload = function(){
  for(var i = 0; i < 21; i++){
    let ficha = new Ficha(randomIntFromInterval(850, 1100), randomIntFromInterval(100, 450), fichaRoja, playerRed, ctx, 50);
    fichasAgarrablesRojas.push(ficha);
  }
}

actualizar();



let boardImage = new Image();
boardImage.src = ('./img/board.png');
boardImage.onload = function(){
  ctx.drawImage(boardImage, 380, 110, 450, 390)
}

canvas.onmousedown = function(event) {
  for (var i = 0; i < fichasAgarrablesAzules.length; i++) {
    if (fichasAgarrablesAzules[i].getPosX() < event.clientX
      && (fichasAgarrablesAzules[i].getWidth() + fichasAgarrablesAzules[i].getPosX() > event.clientX)
      && fichasAgarrablesAzules[i].getPosY() < event.clientY
      && (fichasAgarrablesAzules[i].getWidth() + fichasAgarrablesAzules[i].getPosY() > event.clientY)
      && currPlayer == fichasAgarrablesAzules[i].getJugador()
    ) {
      fichaActual = fichasAgarrablesAzules[i];
      inicioY = event.clientY - fichasAgarrablesAzules[i].getPosX();
      inicioX = event.clientX - fichasAgarrablesAzules[i].getPosY();

      break;
    }
  }
  for (var i = 0; i < fichasAgarrablesRojas.length; i++) {
    if (fichasAgarrablesRojas[i].getPosX() < event.clientX
      && (fichasAgarrablesRojas[i].getWidth() + fichasAgarrablesRojas[i].getPosX() > event.clientX)
      && fichasAgarrablesRojas[i].getPosY() < event.clientY
      && (fichasAgarrablesRojas[i].getWidth() + fichasAgarrablesRojas[i].getPosY() > event.clientY)
      && currPlayer == fichasAgarrablesRojas[i].getJugador()
    ) {
      fichaActual = fichasAgarrablesRojas[i];
      inicioY = event.clientY - fichasAgarrablesRojas[i].getPosX();
      inicioX = event.clientX - fichasAgarrablesRojas[i].getPosY();

      break;
    }
  }
}

canvas.onmousemove = function(event) {
  if (fichaActual != null) {
    fichaActual.setPosX(event.clientX - inicioX);
    fichaActual.setPosY(event.clientY - inicioY);
  }
  actualizar();
}

canvas.onmouseup = function(evet) {
  fichaActual = null;
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
