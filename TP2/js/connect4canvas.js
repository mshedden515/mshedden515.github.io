
let canvas = document.getElementById('gameboard')
let ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let fichaAzul = new Image();
fichaAzul.src = ('./img/fichaazul.png');
fichaAzul.onload = function(){
  ctx.drawImage(fichaAzul, 50, 50, 50, 50)
  ctx.drawImage(fichaAzul, 60, 60, 50, 50)
  ctx.drawImage(fichaAzul, 50, 70, 50, 50)
}

let fichaRoja = new Image();
fichaRoja.src = ('./img/ficharoja.png');
fichaRoja.onload = function(){
  ctx.drawImage(fichaRoja, 1080, 50, 50, 50)
  ctx.drawImage(fichaRoja, 1090, 60, 50, 50)
  ctx.drawImage(fichaRoja, 1080, 70, 50, 50)
}

let boardImage = new Image();
boardImage.src = ('./img/board.png');
boardImage.onload = function(){
  ctx.drawImage(boardImage, 380, 110, 450, 390)
}
