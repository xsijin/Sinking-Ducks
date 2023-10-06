 // Main objective of Sinking Ducks is to keep the duck (player) afloat!
 // The game is lost when the duck collides with an obstacle or sinks to the bottom of the pond.
 // Score is kept track by obstacles passed successfully.
 // Score is doubled when there's 2 players.
 // A single player can challenge themselves by using dual control of 2-Player mode.

 
 /*----- constants -----*/
const gameHeight = 500;
const sunkHeight = 480;     // game height (500px) - player height (20px)
const safeHeight = 130;     // safespot height (150px) - player height (20px)
const playerWidth = 20;
const obstacleWidth = 50;
const maxDuckHeight = 5;    // limit maximum duck flap height to top 5px
const duckGravity = 3;
const flapDistance = 5;     // flap distance > gravity

 /*----- state variables -----*/
 let p1flapping = 0;
 let p2flapping = 0;
 let countScore = 0;
 let isGameOver = false;
 let twoPlayerBonus = false;
 let message = "";
 let lastHighScore = parseFloat(localStorage.getItem("highScore")) || 0;

 // score event listener to check if player pass through the safe spot
let safespotAnimationListener = () => {
    let random = -((Math.random()*300)+150); // random safe spot between height -150~-450
    safespot.style.top = random + "px"; // top position of safe spot
    if (twoPlayerBonus === false) {
        countScore++;
    } else {
        countScore += 2; //double points for 2 players
    }
    updateScore();
};

 /*----- cached elements  -----*/
 const player = document.getElementById("player");
 const player2 = document.getElementById("player2");
 const obstacles = document.getElementById("obstacles");
 const safespot = document.getElementById("safespot");
 const mobilePlayer = document.getElementById("mobile");
 const headerEl = document.getElementById("header");
 const oneTextEl = document.getElementById("one-text");
 const twoTextEl = document.getElementById("two-text");
 const mobileTextEl = document.getElementById("mobile-text");
 const onePlayer = document.getElementById("1P");
 const twoPlayer = document.getElementById("2P");
 const resetButton = document.getElementById("reset");
 const scoreElement = document.getElementById("score");
 const descriptionEl = document.getElementById("description");

 /*----- event listeners -----*/

 // event listener to start mobile-player's game
 mobilePlayer.addEventListener("click", function() {
    initialize();                       // start game
    document.addEventListener('click', handleMouseClick);   // mobile flap event listener
    player.classList.add("player");     // add P1 avatar into game
    enableMobile();                     // enable mobile settings
    twoPlayerBonus = false;             // no bonus points for 1P
    oneTextEl.remove();                 // remove instructions for 1P
    twoTextEl.remove();                 // remove instructions for 2P
});

// event listener to start 1-player's game
onePlayer.addEventListener("click", function() {
    initialize();                       // start game
    document.addEventListener('keydown', handleP1KeyPress); // P1 flap event listener
    player.classList.add("player");     // add P1 avatar into game
    twoPlayerBonus = false;             // no bonus points for 1P
    mobileTextEl.remove();              // remove instructions for mobile
    twoTextEl.remove();                 // remove instructions for 2P
});

// event listener to start 2-player's game
twoPlayer.addEventListener("click", function() {
    initialize();                       // start game
    document.addEventListener('keydown', handleP1KeyPress); // P1 flap event listener
    document.addEventListener('keydown', handleP2KeyPress); // P2 flap event listener
    player.classList.add("player");     // add P1 avatar into game
    player2.classList.add("player2");   // add P2 avatar into game
    twoPlayerBonus = true;              // 2x bonus points for 2P
    mobileTextEl.remove();              // remove instructions for mobile
});

// reset game by refreshing the page
resetButton.addEventListener("click", function() {
    window.location.reload();
});

 /*----- functions -----*/

// function to start game; gravity & collision
 function gameStart() {
    if (!isGameOver) {
        let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
        let player2Top = parseInt(window.getComputedStyle(player2).getPropertyValue("top"));

        if (p1flapping === 0) {         // gravity only occurs when player is NOT flapping; P1flapping = 1 when flapping, 0 when not flapping
            player.style.top = (playerTop + duckGravity) + "px";
        }

        if (p2flapping === 0) {         // gravity only occurs when player2 is NOT flapping; P2flapping = 1 when flapping, 0 when not flapping
            player2.style.top = (player2Top + duckGravity) + "px";
        }

        let obstaclesLeft = parseInt(window.getComputedStyle(obstacles).getPropertyValue("left"));
        let safespotTop = parseInt(window.getComputedStyle(safespot).getPropertyValue("top"));
        let pTop = -(gameHeight - playerTop);
        let p2Top = -(gameHeight - player2Top);
        
        // collision
        if ((playerTop > sunkHeight) || (player2Top > sunkHeight) || ((obstaclesLeft < playerWidth) && (obstaclesLeft > -obstacleWidth) && ((pTop < safespotTop) || (pTop > safespotTop + safeHeight))) || ((obstaclesLeft < playerWidth) && (obstaclesLeft > -obstacleWidth) && ((p2Top < safespotTop) || (p2Top > safespotTop + safeHeight)))) {
            console.log("Game over :( Score: " + (countScore));
            isGameOver = true;
            updateScore();
            endGame();
        }
    }

    // Request the next frame
    requestAnimationFrame(gameStart);
}

// function for P1 flapping style, P1flapping = 1 when flapping, 0 when not flapping
function p1flap(){
    p1flapping = 1;
    let flapCount = 0;
    let flapInterval = setInterval(function(){
        let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
        if((playerTop>maxDuckHeight) && (flapCount<15)){
            player.style.top = (playerTop-flapDistance)+"px";
        }
        if(flapCount>20){
            clearInterval(flapInterval);
            p1flapping = 0;         // restart for gravity pull
            flapCount = 0;
        }
        flapCount++;
    }, 10);
}

// function for P2 flapping style,  P2flapping = 1 when flapping, 0 when not flapping
function p2flap(){
    p2flapping = 1;
    let flapCount = 0;
    let flapInterval = setInterval(function(){
        let player2Top = parseInt(window.getComputedStyle(player2).getPropertyValue("top"));
        if((player2Top>maxDuckHeight) && (flapCount<15)){
            player2.style.top = (player2Top-flapDistance)+"px";
        }
        if(flapCount>20){
            clearInterval(flapInterval);
            p2flapping=0;         // restart for gravity pull
            flapCount=0;
        }
        flapCount++;
    },10);
}

function endGame() {
    safespot.removeEventListener('animationiteration', safespotAnimationListener);  // remove scoring
    document.removeEventListener('keydown', handleP1KeyPress);      // remove event listener for P1
    document.removeEventListener('keydown', handleP2KeyPress);      // remove event listener for P2
    document.removeEventListener('click', handleMouseClick);        // remove event listener for mobileplayer
    safespot.classList.remove("begin");     // stop animating safe frames via CSS
    obstacles.classList.remove("begin");    // stop animating obstacle frames via CSS
    resetButton.classList.add("highlight"); // Reset button lights up
}

function initialize() {
    countScore = 0;                         // reset score
    safespot.classList.add("begin");        // begin animating safe frames via CSS
    obstacles.classList.add("begin");       // begin animating obstacle frames via CSS
    isGameOver = false;                     // disable isGameOver to remove Game Over message
    removeButtons();                        // remove start buttons once game starts
    gameStart();                            // Start the game animation
    safespot.addEventListener('animationiteration', safespotAnimationListener); // begin score
}

// prevent double-tap zoom on mobile
function enableMobile() {
    document.addEventListener('dblclick', function(evt) {           // prevent mobile users from double tapping to zoom
        evt.preventDefault();
      });
}

// for P1 - press "W" to flap
function handleP1KeyPress(event) {
    if (event.key === 'w' || event.key === 'W') {
        p1flap();
    }
}

// for P2 - press "Up Arrow" to flap
function handleP2KeyPress(event) {
    if (event.key === 'ArrowUp') {
        p2flap();
    }
}

// for P1 on mobile - left-click mouse to flap
function handleMouseClick() {
    p1flap();
}

// remove buttons once game start
function removeButtons() {
    onePlayer.remove();
    twoPlayer.remove();
    mobile.remove();
}

// score messages
function updateScore() {
    if (isGameOver) {
        // Display "Game Over" in red text below the score
        scoreElement.innerHTML = `Score: ${countScore}`;
        headerEl.innerHTML = '<span style="color: #e03616;">Game Over :(<br>Please try again!</span>';
        descriptionEl.innerText = message; // high score message
    } else {
        // Display the current score
        scoreElement.innerText = `Score: ${countScore}`;
        descriptionEl.innerText = "Let's keep going! Your high score to beat: " + lastHighScore; // high score message
    }

    // Dynamically update currentScore
    let currentScore = countScore;

    // Check and update high score
    if (currentScore > lastHighScore) {
        // New high score
        message = "Congratulations! You've set a new high score: " + currentScore;
        // Store the new score in local storage
        localStorage.setItem("highScore", currentScore);
    } else {
        // Not a new high score
        message = "Your high score: " + lastHighScore;
    }
}