/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/


let canvas;
let ctx;
let brocolli = 0;
let username = document.getElementById("username").value
let history = []
//lives = 3;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 770;
canvas.height = 770;
canvas.style.left = "850px";
canvas.style.top = "20px";
canvas.style.position = "absolute";
document.body.appendChild(canvas);

let bgReady, heroReady, monsterReady, monster1Ready, monster2Ready, foodReady, addTimeReady;
let bgImage, heroImage, monsterImage, monster1Image, monster2Image, foodImage, addTimeImage;
let timer = false;
let gameOver = false;
let timeIsUp = false;
let backgroundMusic
let monsterMusic;
let endGameMusic; 




let startTime = Date.now();
const SECONDS_PER_ROUND = 30;
let elapsedTime = 0;

function loadImages() {

  brocolli = 0;

  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/skydark.jpg";
  heroImage = new Image();
  heroImage.onload = function () {
    // show the hero image
    heroReady = true;
  };
  heroImage.src = "images/eyes.png";

  monsterImage = new Image();
  monsterImage.onload = function () {
    // show the monster image
    monsterReady = true;
  };
  monsterImage.src = "images/monster.png";


  monster1Image = new Image();
  monster1Image.onload = function () {
    // show the monster image
    monster1Ready = true;
  };
  monster1Image.src = "images/dvd.png";


  monster2Image = new Image();
  monster2Image.onload = function () {
    // show the monster image
    monster2Ready = true;
  };
  monster2Image.src = "images/middlefinger.png";


  foodImage = new Image();
  foodImage.onload = function () {
    foodReady = true;
  };
  foodImage.src = "images/broccoli.png";

  addTimeImage = new Image();
  addTimeImage.onload = function () {
    addTimeReady = true;
  };
  addTimeImage.src = "images/butterfly.png";

  backgroundMusic = new Audio("sound/bg.mp3");
  endGameMusic = new Audio ("sound/windowxp.mp3");
  pointMusic = new Audio ("sound/yoshi.mp3")

}
ctx.font = "30px arial narrow";


/** 
 * Setting up our characters.
 * 
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 * 
 * The same applies to the monster.
 */

let heroX = canvas.width / 2;
let heroY = canvas.height / 2;


// set random 
let monsterX = Math.round(Math.random() * (canvas.width - 80));
let monsterY = Math.round(Math.random() * (canvas.height - 80));

let monster1X = Math.round(Math.random() * (canvas.width - 80));
let monster1Y = Math.round(Math.random() * (canvas.height - 80));

let monster2X = Math.round(Math.random() * (canvas.width - 160));
let monster2Y = Math.round(Math.random() * (canvas.width - 160));

let foodX= Math.round(Math.random() * (canvas.width - 80));
let foodY = Math.round(Math.random() * (canvas.width - 80));

let addTimeX = Math.round(Math.random() * (canvas.width - 80));
let addTimeY = Math.round(Math.random() * (canvas.width - 80));

//speed and direction of monster
let monsterSpeed = 1
let monsterDirection = 2
let monsterDirectionY = -1.25


let monster1Speed = 2
let monster1Direction = 1
let monster1DirectionY = -1.5


let monster2Speed = 6
let monster2Direction = 1
let monster2DirectionY = 2

/** 
 * Keyboard Listeners
 * You can safely ignore this part, for now. 
 * 
 * This is just to let JavaScript know when the user has pressed a key.
*/
let keysDown = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here. 
  addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
  }, false);

  addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];
  }, false);
}


// }
/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *  
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function () {
  // Update the time.
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);

//Direction 

  if (38 in keysDown) { // Player is holding up key
    heroY -= 7;
  }
  if (40 in keysDown) { // Player is holding down key
    heroY += 7;
  }
  if (37 in keysDown) { // Player is holding left key
    heroX -= 7;
  }
  if (39 in keysDown) { // Player is holding right key
    heroX += 7;
  }
 
 // Setting border for Eyes
  if (heroX < 0){
    heroX = 0 
  } else if (heroX > canvas.width-80){
    heroX = canvas.width-80
  }

  if (heroY<0){
    heroY = 0
  } else if (heroY > canvas.height-80){
    heroY = canvas.height-80
  }

  // Check if player and monster collided. Our images
  // are about 32 pixels big.


//   // make monster bouncing

  if (monsterX + 80 > canvas.width || monsterX <= 0) {
    monsterDirection = monsterDirection * -1;
  }
  monsterX += (monsterSpeed * monsterDirection);

  if (monsterY + 80 > canvas.width || monsterY <= 0) {
    monsterDirectionY = monsterDirectionY * -1;
  }

  monsterY += (monsterSpeed * monsterDirectionY);

// // make monster 1 bouncing

  if (monster1X + 60 > canvas.width || monster1X <= 0) {
    monster1Direction = monster1Direction * -1;
  }
  monster1X += (monster1Speed * monster1Direction);

  if (monster1Y + 60 > canvas.width || monster1Y <= 0) {
    monster1DirectionY = monster1DirectionY * -1;
  }

  monster1Y += (monster1Speed * monster1DirectionY);

 // make monster 2 bouncing

  if (monster2X + 60 > canvas.width || monster2X <= 0) {
    monster2Direction = monster2Direction * -1;
  }
  monster2X += (monster2Speed * monster2Direction);

  if (monster2Y + 60 > canvas.width || monster2Y <= 0) {
    monster2DirectionY = monster2DirectionY * -1;
  }

  monster2Y += (monster2Speed * monster2DirectionY);

  // if Eyes eat Brocolli --> score
  backgroundMusic.play();

  if (
    heroX <= (foodX + 80)
    && foodX <= (heroX + 80)
    && heroY <= (foodY + 80)
    && foodY <= (heroY + 80)
  ) {
    foodX = Math.floor(Math.random()*(canvas.width-80)) 
    foodY =  foodY = Math.floor(Math.random()*(canvas.height-80))
    brocolli++;
    pointMusic.play();
    // document.getElementById("score").innerHTML = `${heroX}`
  }
  // if Eyes touch Monster -->  die
  if (
    heroX  <= (monsterX + 40)
    && monsterX <= (heroX + 40)
    && heroY  <= (monsterY + 40)
    && monsterY <= (heroY + 40)
  ) {
    backgroundMusic.pause();
    endGameMusic.play();
    gameOver = true;
    // lives--;
  }

  if (
    heroX <= (monster1X)
    && monster1X <= (heroX + 36)
    && heroY <= (monster1Y)
    && monster1Y <= (heroY + 36)
    && brocolli >=3
  ) {
    backgroundMusic.pause();
    endGameMusic.play();
    gameOver = true;
    //lives--;
  }

  if (
    heroX <= (monster2X + 1 )
    && monster2X <= (heroX + 1)
    && heroY <= (monster2Y + 1)
    && monster2Y <= (heroY + 1)
    && brocolli >=10
  ) {
    backgroundMusic.pause();
    endGameMusic.play();
    gameOver = true;
  }

  if (
    elapsedTime === 30
  ){
    backgroundMusic.pause();
    endGameMusic.play();
    timeIsUp = true;
   }



   
};

// colorful texts 

function randomColor(){
  let r = Math.floor(Math.random()*256);
  let g = Math.floor(Math.random()*256);
  let b = Math.floor(Math.random()*256);
  return "rgb("+ r + "," + g + "," + b +")";
}

function texter(str, x, y){
  for(let i = 0; i <= str.length; ++i){
      var ch = str.charAt(i);
      ctx.fillStyle = randomColor();
      ctx.fillText(str.charAt(i), x, y);
      x += ctx.measureText(ch).width;
  }
}



/**
 * This function, render, runs as often as possible.
 */
var render = function () {
  
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, heroX, heroY);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImage, monsterX, monsterY);  
  }
  if (monster1Ready && brocolli >=3) {
    ctx.drawImage(monster1Image, monster1X, monster1Y);
  }
  if (monster2Ready && brocolli >=10) {
    ctx.drawImage(monster2Image, monster2X, monster2Y);
    ctx.drawImage(addTimeImage, addTimeX, addTimeY);
  }
  if (foodReady){
    ctx.drawImage(foodImage, foodX, foodY);
  }
  texter(`Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`, 20, 50);
  texter(`Brocolli: ${brocolli}`, 20, 80);

  if (gameOver) {
    texter(`EYES HAVE LEFT THE CHAT`, 250,385);
    ctx.fillStyle = randomColor();
    event.stopPropagation();
    
  }

  if (timeIsUp) {
    texter(`TIME IS UP `, 350,385);
    ctx.fillStyle = randomColor();
    event.stopPropagation(); 
    
  }
};
/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */
var main = function () {
  update(); 
  render();
  // Request to do this again ASAP. This is a special method
  // for web browsers. 
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


function startGame(){
  loadImages();
  setupKeyboardListeners();
  main();
  document.getElementById("click")
}
  

function resetGame(){
  location.reload();
}


function enterName(){
  username = document.getElementById("username").value
  history.push(username)
  document.getElementById("nameArea").innerHTML = `${history}`
  
}  
