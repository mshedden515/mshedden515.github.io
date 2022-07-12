//Se agarra el avatar del jugador
var player = document.getElementById("character");

/*Se obtiene el div conteniendo el juego y se agrega el listener al boton start*/
let runner = document.getElementById('runner');
let start = document.getElementById('startButton');
start.addEventListener("click", setGame);

/*Añade un buton que permite ver las hurtboxes, por temas de debug*/
let collisionBox = document.getElementById("chara-collision");
let hurtboxButton = document.getElementById('hurtboxButton')
hurtboxButton.addEventListener("click", function(){
  if (collisionBox.classList.contains("show")){
    collisionBox.classList.remove("show");
  }
  else{
    collisionBox.classList.add("show");
  }
})

/*Añade un buton que cambia el aspecto del avatar */
let skinBuntton = document.getElementById('skinButton');
skinBuntton.addEventListener("click", function(){
  if (player.classList.contains("alt")){
    player.classList.remove("alt");
  }
  else{
    player.classList.add("alt");
  }
})

//se encarga de preparar el juego una vez que se presiona start
function setGame(){
  //cada capa del parallax se vuelve activa y empieza a moverse
  document.getElementById("layer-1").classList.add("active");
  document.getElementById("layer-2").classList.add("active");
  document.getElementById("layer-3").classList.add("active");
  document.getElementById("layer-4").classList.add("active");
  document.getElementById("layer-5").classList.add("active");
  
  /*se remueve la clase asociada a la animacion de idle y se pone
  su animacion de caminar en su lugar
  Tambien se remueve la animacion de morir, en caso de que el jugador
  haya reiniciado el juego.*/
  player.classList.remove("idle");
  player.classList.remove("die");
  player.classList.add("walk");

  //Se oculta el boton de start y de ver hurtbox
  start.classList.add("d-none");
  hurtboxButton.classList.add("d-none");
  skinBuntton.classList.add("d-none");

  /*Keydown, como dice su nombre, es un boolean que revisa si cualquier tecla
  esta siendo presionada o no.
  canJump es otro boolean que revisa si el jugador puede saltar ahora mismo.*/
  let keydown = false;
  let isJumping = false;
  var entities = [];

  //se inicializa la puntuacion en 0
  var score = 0;
  document.getElementById('score').innerHTML = "Puntuacion: " + score;

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
      collisionBox.classList.add("jump");
      setTimeout(function(){
        player.classList.remove("jump");
        collisionBox.classList.remove("jump");
        isJumping = false;
      }, 1000)
    }

    for (var i = entities.length - 1; i >= 0; --i) {
      //Revisa si hay una entidad en colision con el jugador
      if (isCollidingWithPlayer(collisionBox, entities[i].getElement())) {
          //declara la entidad que colisiono, y empieza a revisar que es
          let collidingElement = entities[i].getElement()

          //si es una moneda y el jugador todavia no la agarro ("picked"), la agarra y
          //suma a la puntuacion
          if(!collidingElement.classList.contains("picked") && collidingElement.classList.contains("flyingCoin")){
            console.log("colision!")
            collidingElement.classList.remove("float");
            collidingElement.classList.add("picked");
            score++;
            document.getElementById('score').innerHTML = "Puntuacion: " + score;
          }
          if(collidingElement.classList.contains("enemy")){
            clearInterval(intervalId);
            player.classList.remove("jump");
            player.classList.remove("walk");
            player.classList.add("die");
            document.getElementById("layer-1").classList.remove("active");
            document.getElementById("layer-2").classList.remove("active");
            document.getElementById("layer-3").classList.remove("active");
            document.getElementById("layer-4").classList.remove("active");
            document.getElementById("layer-5").classList.remove("active");
            start.classList.remove("d-none");
            hurtboxButton.classList.remove("d-none");
            skinBuntton.classList.remove("d-none");
          }
      }
    }

    //cada intervalo hay una probabilidad de 1 entre 25 de que spawnee una entidad
    let randomInt = getRandomInt(25);
    if (randomInt == 0){

      let newElement = document.createElement("div");  

      //50% de probabilidades de que sea una moneda o un enemigo
      randomTypeInt = getRandomInt(2);
      console.log(randomTypeInt);
      if (randomTypeInt == 0){
        type = "coin";
        newElement.classList.add("flyingCoin", "float");
        runner.appendChild(newElement);
      }
      /*si es un enemigo, tiene un 50% de probabilidades de que 
      sea un murcielago o un fantasma*/
      else {
        let randomEnemyInt = getRandomInt(2);
        if(randomEnemyInt == 0){
          type = "bat";
          newElement.classList.add("bat", "enemy");
          runner.appendChild(newElement);
        }
        else{
          type = "ghost";
          newElement.classList.add("ghost", "enemy");
          runner.appendChild(newElement);
        }
      }
      
      //declara la nueva entidad
      let newEntity = new Entity(type, newElement);
      
      //la entidad tiene un listener que hace que se borre cuando llega al fin de la pantalla
      newElement.addEventListener("animationend", function(){
        if (newEntity != null){
          removeEntity(newEntity, entities);
        }
      });

      //se añade la entidad a la lista de entidades
      entities.push(newEntity);
    }

  }, 50);
}

//chequea si una entidad colide con el jugador
function isCollidingWithPlayer(collisionBox, element){
  let aRect = collisionBox.getBoundingClientRect();
  let bRect = element.getBoundingClientRect();

  return !(
    ((aRect.top + aRect.height) < (bRect.top)) ||
    (aRect.top > (bRect.top + bRect.height)) ||
    ((aRect.left + aRect.width) < bRect.left) ||
    (aRect.left > (bRect.left + bRect.width))
  );
}

//genera un int entre 0 y un parametro
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//remueve una entidade de al lista de entidades
function removeEntity(entity, entities){
  runner.removeChild(entity.getElement());
  for (var i = entities.length - 1; i >= 0; --i) {
    if (entities[i] == entity) {
        entities.splice(i,1);
        break;
    }
  }
}
