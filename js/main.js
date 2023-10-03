 //stop here. something wrong with the update score
// make the colours nicer

 // Main objective of Sinking Ducks is to keep the duck (player) afloat!
 // The game is lost when the duck collides with an obstacle or sinks to the bottom of the pond.
 // Score is kept track by obstacles passed.
 // Score is doubled when there's 2 players.
 // A single player can challenge themselves by using both hands to play.

 
 /*----- constants -----*/



 /*----- state variables -----*/
 let P1flapping = 0;
 let P2flapping = 0;
 let countScore = 0;
 let score = 0;
 let isGameOver = false;
 let twoPlayerBonus = false;

 /*----- cached elements  -----*/
 const player = document.getElementById("player");
 const obstacles = document.getElementById("obstacles");
 const safespot = document.getElementById("safespot");
 const mobilePlayer = document.getElementById("mobile");
 const keyboardEl = document.getElementById("keyboard");
 const onePlayer = document.getElementById("1P");
 const twoPlayer = document.getElementById("2P");
 const resetButton = document.getElementById("reset");
 const scoreElement = document.getElementById("score");
 const descriptionEl = document.getElementById("description");

 /*----- event listeners -----*/
let safespotAnimationListener = () => {
    let random = -((Math.random()*300)+150);
    safespot.style.top = random + "px";
    if (twoPlayerBonus === false) {
        countScore++;
    } else {
        countScore += 2; //double points for 2 players
    }
    updateScore();
};

safespot.addEventListener('animationiteration', safespotAnimationListener);

function gameStart() {
    if (!isGameOver) {
        let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
        let player2Top = parseInt(window.getComputedStyle(player2).getPropertyValue("top"));

        if (P1flapping == 0) {
            player.style.top = (playerTop + 3) + "px";
        }

        if (P2flapping == 0) {
            player2.style.top = (player2Top + 3) + "px";
        }

        let obstaclesLeft = parseInt(window.getComputedStyle(obstacles).getPropertyValue("left"));
        let safespotTop = parseInt(window.getComputedStyle(safespot).getPropertyValue("top"));
        let pTop = -(500 - playerTop);
        let p2Top = -(500 - player2Top);

        if ((playerTop > 480) || (player2Top > 480) || ((obstaclesLeft < 20) && (obstaclesLeft > -50) && ((pTop < safespotTop) || (pTop > safespotTop + 130))) || ((obstaclesLeft < 20) && (obstaclesLeft > -50) && ((p2Top < safespotTop) || (p2Top > safespotTop + 130)))) {
            console.log("Game over :( Score: " + (countScore));
            player.style.top = 100 + "px";
            isGameOver = true;
            updateScore();
            endGame();
        }
    }

    // Request the next frame
    requestAnimationFrame(gameStart);
}

// Start the game loop



mobilePlayer.addEventListener("click", function() {
    initialize();
    document.addEventListener('click', handleMouseClick);
    player.classList.add("player");
    enableMobile();
    twoPlayerBonus = false;
    keyboardEl.remove();
});



onePlayer.addEventListener("click", function() {
    initialize();
    document.addEventListener('keydown', handleP1KeyPress);
    player.classList.add("player");
    twoPlayerBonus = false;
});



twoPlayer.addEventListener("click", function() {
    initialize();
    document.addEventListener('keydown', handleP1KeyPress);
    document.addEventListener('keydown', handleP2KeyPress);
    player.classList.add("player");
    player2.classList.add("player2");
    twoPlayerBonus = true;
});



resetButton.addEventListener("click", function() {
    // Stop the game interval
    endGame();
    // Refresh the page to reset the game
    window.location.reload();
});


 /*----- functions -----*/
 function p1flap(){
    P1flapping = 1;
    let flapCount = 0;
    let flapInterval = setInterval(function(){
        let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
        if((playerTop>6) && (flapCount<15)){
            player.style.top = (playerTop-5)+"px";
        }
        if(flapCount>20){
            clearInterval(flapInterval);
            P1flapping=0;
            flapCount=0;
        }
        flapCount++;
    },10);
}

function p2flap(){
    P2flapping = 1;
    let flapCount = 0;
    let flapInterval = setInterval(function(){
        let player2Top = parseInt(window.getComputedStyle(player2).getPropertyValue("top"));
        if((player2Top>6) && (flapCount<15)){
            player2.style.top = (player2Top-5)+"px";
        }
        if(flapCount>20){
            clearInterval(flapInterval);
            P2flapping=0;
            flapCount=0;
        }
        flapCount++;
    },10);
}


function endGame() {
    safespot.removeEventListener('animationiteration', safespotAnimationListener);
    document.removeEventListener('keydown', handleP1KeyPress);
    document.removeEventListener('keydown', handleP2KeyPress);
    document.removeEventListener('click', handleMouseClick);
    safespot.classList.remove("begin");
    obstacles.classList.remove("begin");
}

function initialize() {
    gameStart();
    countScore = 0;
    safespot.classList.add("begin");
    obstacles.classList.add("begin");
    isGameOver = false;
    P1flapping = 0;
    P2flapping = 0;
}

function enableMobile() {
    document.removeEventListener('keydown', handleP1KeyPress);
    document.removeEventListener('keydown', handleP2KeyPress);
    document.addEventListener('click', handleMouseClick);
    document.addEventListener('dblclick', function(evt) {
        evt.preventDefault();
      });
}

function handleP1KeyPress(event) {
    if (event.key === 'w' || event.key === 'W') {
        p1flap();
    }
}

function handleP2KeyPress(event) {
    if (event.key === 'ArrowUp') {
        p2flap();
    }
}

function handleMouseClick() {
    p1flap();
}


function updateScore() {
    if (isGameOver) {
        // Display "Game Over" in red text below the score
        scoreElement.innerHTML = `Score: ${countScore} <br><span style="color: red;">Game Over :(<br>Please reset to try again!</span>`;
        descriptionEl.innerText = message; // Update the best_score element with the appropriate message
    } else {
        // Display the current score
        scoreElement.innerText = `Score: ${countScore}`;
        descriptionEl.innerText = "Let's keep going! Your high score to beat: " + currentScore;; // Update the best_score element with the appropriate message
    }
}

// Get the previous high score if any, or `NaN` if none
// `localStorage.score` will be `undefined` if you've never stored a high score
// at all (or a string otherwise). `parseFloat` will return `NaN` if you pass it
// `undefined`, so we check that later.
// Load the last high score from local storage or default to 0 if it doesn't exist
let lastHighScore = parseFloat(localStorage.getItem("score")) || 0;

// Calculate the current score (for example, countScore is your current score)
const currentScore = countScore;

let message;
if (isNaN(lastHighScore) || currentScore > lastHighScore) {
    // New high score
    message = "Congratulations! You've set a new high score: " + currentScore;
    // Store the new score in local storage
    localStorage.setItem("score", currentScore);
} else {
    // Not a new high score
    message = "Your high score: " + currentScore;
}
