 //stop here. something wrong with the update score
 // i just need a second player to test my 2 player logic
// and also i need to stop my render
// stop my score when game ends
// ^-- maybe need use a different code for these 2
// reset game to reinitialize game
// double the score for 2player
// make the colours nicer
// mobile responsive -- change to mouse click (1 player)

 // Main objective of Sinking Ducks is to keep the duck (player) afloat!
 // The game is lost when the duck collides with an obstacle or sinks to the bottom of the pond.
 // Score is kept track by obstacles passed

 //--wireframe--
 //need platform to jump
 //need reset
 //show win state
 //able to choose number of players (WASD,directional key)
 //check if game is lost
 //show score
 
 /*----- constants -----*/
 let P1jumping = 0;
 let P2jumping = 0;
 let counter = 0;


 /*----- state variables -----*/
 let isGameOver = false;
 let gameInterval;
 let scoreInterval;

 /*----- cached elements  -----*/
 const player = document.getElementById("player");
 const obstacles = document.getElementById("obstacles");
 const safespot = document.getElementById("safespot");

 /*----- event listeners -----*/
 document.addEventListener('keydown', handleP1KeyPress);
 document.addEventListener('keydown', handleP2KeyPress);

const safespotAnimationListener = () => {
    let random = -((Math.random()*300)+150);
    safespot.style.top = random + "px";
    counter++;
    updateScore();
};

// Add the event listener
safespot.addEventListener('animationiteration', safespotAnimationListener);

scoreInterval = setInterval(function(){
    if (!isGameOver) {
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    let player2Top = parseInt(window.getComputedStyle(player2).getPropertyValue("top"));
    if(P1jumping==0){
        player.style.top = (playerTop+3)+"px";
    }
    if(P2jumping==0){
        player2.style.top = (player2Top+3)+"px";
    }
    let obstaclesLeft = parseInt(window.getComputedStyle(obstacles).getPropertyValue("left"));
    let safespotTop = parseInt(window.getComputedStyle(safespot).getPropertyValue("top"));
    let pTop = -(500-playerTop);
    let p2Top = -(500-player2Top);
    if((playerTop>480)||(player2Top>480)||((obstaclesLeft<20)&&(obstaclesLeft>-50)&&((pTop<safespotTop)||(pTop>safespotTop+130)))||
    ((obstaclesLeft<20)&&(obstaclesLeft>-50)&&((p2Top<safespotTop)||(p2Top>safespotTop+130)))){
        console.log("Game over :( Score: "+(counter));
        player.style.top = 100 + "px";
        updateScore();
        counter=0;
        isGameOver = true; 
        stopGame();
        safespot.classList.remove("begin");
        obstacles.classList.remove("begin");
    }}
}, 10);


const mobilePlayer = document.getElementById("mobile");

mobilePlayer.addEventListener("click", function() {
    startGame();
    player.classList.add("player");
    enableMobile();
});

const onePlayer = document.getElementById("1P");

onePlayer.addEventListener("click", function() {
    startGame();
    player.classList.add("player");
});

const twoPlayer = document.getElementById("2P");

twoPlayer.addEventListener("click", function() {
    startGame();
    player.classList.add("player");
    player2.classList.add("player2");
});

const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", function() {
    // Stop the game interval
    stopGame();
    // Refresh the page to reset the game
    window.location.reload();
});

// // Add an event listener to the "Reset Game" button
// const resetButton = document.getElementById("reset");

// resetButton.addEventListener("click", function() {
//     // Reset game variables and player position
//     player.style.top = "170px";
//     obstacles.style.width = "50px";
//     obstacles.style.height = "500px";
//     obstacles.style.left = "400px";
//     safespot.style.width = "50px";
//     safespot.style.height = "150px";
//     safespot.style.left = "400px";
//     safespot.style.top = "-500px";
//     counter = 0;

//     // Resume the game
//     resumeGame();
// });


 /*----- functions -----*/
 function p1jump(){
    P1jumping = 1;
    let jumpCount = 0;
    let jumpInterval = setInterval(function(){
        let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
        if((playerTop>6) && (jumpCount<15)){
            player.style.top = (playerTop-5)+"px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            P1jumping=0;
            jumpCount=0;
        }
        jumpCount++;
    },10);
}

function p2jump(){
    P2jumping = 1;
    let jumpCount = 0;
    let jumpInterval = setInterval(function(){
        let player2Top = parseInt(window.getComputedStyle(player2).getPropertyValue("top"));
        if((player2Top>6) && (jumpCount<15)){
            player2.style.top = (player2Top-5)+"px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            P2jumping=0;
            jumpCount=0;
        }
        jumpCount++;
    },10);
}

// function resumeGame() {
//     isGameOver = false;
// }

function updateScore() {
    const scoreElement = document.getElementById("score");
    const descriptionEl = document.getElementById("description");
    if (isGameOver) {
        // Display "Game Over" in red text below the score
        scoreElement.innerHTML = `Score: ${counter} <br><span style="color: red;">Game Over :( Please try again!</span>`;
    } else {
        // Display the current score
        scoreElement.innerText = `Score: ${counter}`;
        descriptionEl.innerText = `Let's keep going! Your high score to beat:`;
    }
}

function stopGame() {
    clearInterval(gameInterval);
    safespot.removeEventListener('animationiteration', safespotAnimationListener);
}

function startGame() {
    safespot.classList.add("begin");
    obstacles.classList.add("begin");
}

function enableMobile() {
    document.removeEventListener('keydown', handleP1KeyPress);
    document.removeEventListener('keydown', handleP2KeyPress);
    document.addEventListener('click', handleMouseClick);
}

function handleP1KeyPress(event) {
    if (event.key === 'w' || event.key === 'W') {
        p1jump();
    }
}

function handleP2KeyPress(event) {
    if (event.key === 'ArrowUp') {
        p2jump();
    }
}

function handleMouseClick() {
    p1jump();
}


// Get the previous high score if any, or `NaN` if none
// `localStorage.score` will be `undefined` if you've never stored a high score
// at all (or a string otherwise). `parseFloat` will return `NaN` if you pass it
// `undefined`, so we check that later.
const lastHighScore = parseFloat(localStorage.score);
// Get the string version of this score
const scoreString = timeDiff.toFixed(3);
let message;
if (isNaN(lastHighScore) || timeDiff > lastHighScore) { // ** Perhaps < ? Hard to tell from the question
    // New high score
    message = "Your new best time is " + scoreString;
    // Store the new score
    localStorage.score = scoreString;
} else {
    // Not a new high score
    message = "Your time was " + scoreString + "; your best time was " + localStorage.score;
}
document.getElementById("best_score").textContent = message;