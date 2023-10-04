// To do: make the colours nicer, refactor the code, do ReadMe

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
 let message = "";

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



mobilePlayer.addEventListener("click", function() {
    initialize();
    document.addEventListener('click', handleMouseClick);
    player.classList.add("player");
    enableMobile();
    twoPlayerBonus = false;
    oneTextEl.remove();
    twoTextEl.remove();
});



onePlayer.addEventListener("click", function() {
    initialize();
    document.addEventListener('keydown', handleP1KeyPress);
    player.classList.add("player");
    twoPlayerBonus = false;
    mobileTextEl.remove();
    twoTextEl.remove();
});



twoPlayer.addEventListener("click", function() {
    initialize();
    document.addEventListener('keydown', handleP1KeyPress);
    document.addEventListener('keydown', handleP2KeyPress);
    player.classList.add("player");
    player2.classList.add("player2");
    twoPlayerBonus = true;
    mobileTextEl.remove();
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
    safespot.removeEventListener('animationiteration', safespotAnimationListener);  // remove scoring
    document.removeEventListener('keydown', handleP1KeyPress);      // remove event listeners
    document.removeEventListener('keydown', handleP2KeyPress);      // remove event listeners
    document.removeEventListener('click', handleMouseClick);        // remove event listeners
    safespot.classList.remove("begin");     // stop animating frames via CSS
    obstacles.classList.remove("begin");    // stop animating frames via CSS
}

function initialize() {
    countScore = 0;                         // reset score
    safespot.classList.add("begin");        // begin animating frames via CSS
    obstacles.classList.add("begin");       // begin animating frames via CSS
    isGameOver = false;                     // disable isGameOver to display correct score messages upon reset
    P1flapping = 0;                         // reset flap count
    P2flapping = 0;                         // reset flap count
    removeButtons();                        // remove start buttons once game starts
    gameStart();                            // Start the game 
}

function enableMobile() {
    document.addEventListener('click', handleMouseClick);
    document.addEventListener('dblclick', function(evt) {           // prevent mobile users from double tapping to zoom
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

function removeButtons() {
    onePlayer.remove();
    twoPlayer.remove();
    mobile.remove();
}

let lastHighScore = parseFloat(localStorage.getItem("highScore")) || 0;

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

//use this code to delete highscore in console: localStorage.removeItem("highScore");