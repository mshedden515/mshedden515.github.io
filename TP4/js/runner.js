/*Se obtiene el div conteniendo el juego y se agrega el listener al boton start*/
let runner = document.getElementById('runner');
document.getElementById('startButton').addEventListener("click", setGame);

//se encarga de preparar el juego una vez que se presiona start
function setGame(){
  //cada capa del parallax se vuelve activa y empieza a moverse
  document.getElementById("layer-1").classList.add("active");
  document.getElementById("layer-2").classList.add("active");
  document.getElementById("layer-3").classList.add("active");
  document.getElementById("layer-4").classList.add("active");
  document.getElementById("layer-5").classList.add("active");
  
  //el protagonista tambien empieza a moverse
  let player = document.getElementById("character");

  /*se remueve la clase asociada a la animacion de idle y se pone
  su animacion de caminar en su lugar*/
  player.classList.remove("idle");
  player.classList.add("walk");

  //Se oculta el boton de start
  document.getElementById('startButton').classList.add("d-none");

  /*Keydown, como dice su nombre, es un boolean que revisa si cualquier tecla
  esta siendo presionada o no.
  canJump es otro boolean que revisa si el jugador puede saltar ahora mismo.*/
  let keydown = false;
  let isJumping = false;

  document.addEventListener("keydown", function(){
    keydown = true;
  })

  document.addEventListener("keyup", function(){
    keydown = false;
  })

  //el loop principal
  let intervalId = setInterval(function(){

    /*Si el jugador presiona una tecla y puede saltar, salta.
    El jugador no puede saltar si ya esta saltando.*/
    if (keydown && !isJumping){
      isJumping = true;
      player.classList.add("jump");
      setTimeout(function(){
        player.classList.remove("jump");
        isJumping = false;
      }, 1000)
    }


  }, 50);
}

