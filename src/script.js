let background = document.querySelector('.background');
let sonicCharacter = document.querySelector('.sonic');

const hitSonic = {
  sonic: "./file/hit-sonic.mp3",
  ring: "./file/hit-rings.mp3",
  explodes: "./file/hit-explosao.mp3"
}

let audio = new Audio();
audio.src = hitSonic.sonic;
let audioRings = new Audio();
audioRings.src = hitSonic.ring;

let isJumping = false;
let position = 0;
let score = 0;
let scoreRings = 0
let level = 0;
let speed = 30;
let gameOver = false;

document.addEventListener('keyup', handleKeyUp);

function handleKeyUp(event) {
  if(event.keyCode === 32) {
    audio.play();
    if(!isJumping) {
      jumper();
    };
  };
};

function jumper() {
  isJumping = true; //Boolean to fix bug jump over the jump

  let upPosition = setInterval(() => {
    if(position >= 460){
      document.querySelector('.sonic').style.backgroundImage = "url('./images/spinner.gif')";
      clearInterval(upPosition); 

      let downPosition = setInterval(() => {
        if(position <= 180 && gameOver === false){
          document.querySelector('.sonic').style.backgroundImage = "url('./images/sonic.gif')";
          clearInterval(downPosition);
          isJumping = false; //Boolean to fix bug jump over the jump 
        } else {
          if(position >= 0){
          position -= 8;
          sonicCharacter.style.bottom = position + 'px';
          }
        }
      }, 10);
    } else {  
      position += 170;
      sonicCharacter.style.bottom = position + 'px';
    };
  });
};

function createRings(){
  let rings = document.createElement('div');
  rings.classList.add('rings');
  rings.style.left= 1500 + 'px';
  background.appendChild(rings);

  let ringsPosition = 1400;
  let newRings = Math.random() * 2000;

  let leftRingsPosition = setInterval(() => {
    if(ringsPosition < -120){
      clearInterval(leftRingsPosition);
      background.removeChild(rings);
    } else if(ringsPosition > 0 && ringsPosition < 120 && position >= 400 
      && gameOver === false){
        let totalScoreRings = document.querySelector('.valueRings');
          scoreRings += 1;
          audioRings.play();
          totalScoreRings.innerHTML = `${scoreRings}`;
          clearInterval(leftRingsPosition);
          background.removeChild(rings);
      
    } else{
      if(!gameOver){
        ringsPosition -= 10;
        rings.style.left = ringsPosition + 'px';
      }
    }
  }, 20)
  setTimeout(createRings, newRings);
}
createRings();

function createEggmanScore() {
  let eggman = document.createElement('div');
  eggman.classList.add('eggman');
  eggman.style.left = 1400 + 'px';
  background.appendChild(eggman);

  let eggmanPosition = 1400;
  let newEggman = Math.random() * 6000;
  let leftEggmanPosition = setInterval(() => {
    //Remove eggman when exit the scree
    if(eggmanPosition < -10 && gameOver === false){
      let myScore = document.querySelector('.valueScore');
      score += 10;
      level += 1;
      
      myScore.innerHTML = `${score}`;
      clearInterval(leftEggmanPosition);
      background.removeChild(eggman);
    }   //Game Over
    else if(eggmanPosition > 0 && eggmanPosition < 120 && position < 180){
      clearInterval(leftEggmanPosition);
      gameOver = true;
      document.body.innerHTML = `
      <header class='game-over'>
        <h1>Game over</h1>
        <p>Pontuação = ${score} Pts</p>
        <p>Rings = ${scoreRings}</p>
        <input class="btnStart" type="button" value= "Jogar" onclick = playGame()></input>
      </header>
      `;
    } else {
      if(level % 2 !== 0 && eggmanPosition === 1400 && gameOver === false){
        document.querySelector('.eggman').style.backgroundImage = "url('./images/eggman-furadeira.gif')";
      }; 
      if(level % 2 !== 0 && speed > 20){
        speed -= 1
      };
      if(!gameOver){
        eggmanPosition -= 10;
        eggman.style.left = eggmanPosition + 'px';
      };
    } 
  }, speed)
  setTimeout(createEggmanScore, newEggman);
};
createEggmanScore();

function playGame(){
  location.reload();
};
