'use strict';

class Ficha{

  constructor(posX, posY, image, jugador, ctx, width){
    this.posX = posX;
    this.posY = posY;
    this.posOriginalX = posX;
    this.posOriginalY = posY;
    this.image = image;
    this.jugador = jugador;
    this.ctx = ctx;
    this.width = width;
  }

  getPosX(){
    return this.posX;
  }

  setPosX(posX){
      this.posX = posX;
  }

  getPosY(){
      return this.posY;
  }

  setPosY(posY){
      this.posY = posY;
  }

  getImage(){
      return this.image;
  }

  setImage(image){
      this.image = image;
  }

  getJugador(){
    return this.jugador;
  }

  getWidth(){
    return this.width;
  }

  setWidth(width){
    this.width = width;
  }

  draw (){
    this.ctx.drawImage(this.image, this.posX, this.posY, 50, 50);
  }

  resetPos(){
    this.posX = this.posOriginalX;
    this.posY = this.posOriginalY;
  }
}