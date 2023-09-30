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
 let jumping = 0;
 let counter = 0;


 /*----- state variables -----*/
 let isGameOver = false;
 let gameInterval;

 /*----- cached elements  -----*/
 const player = document.getElementById("player");
 const obstacles = document.getElementById("obstacles");
 const drown = document.getElementById("drown");

 /*----- event listeners -----*/
 drown.addEventListener('animationiteration', () => {
    let random = -((Math.random()*300)+150);
    drown.style.top = random + "px";
    counter++;
    updateScore();
});
gameInterval = setInterval(function(){
    if (!isGameOver) {
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    if(jumping==0){
        player.style.top = (playerTop+3)+"px";
    }
    let obstaclesLeft = parseInt(window.getComputedStyle(obstacles).getPropertyValue("left"));
    let drownTop = parseInt(window.getComputedStyle(drown).getPropertyValue("top"));
    let pTop = -(500-playerTop);
    if((playerTop>480)||((obstaclesLeft<20)&&(obstaclesLeft>-50)&&((pTop<drownTop)||(pTop>drownTop+130)))){
        console.log("Game over :( Score: "+(counter-1));
        player.style.top = 100 + "px";
        updateScore();
        counter=0;
        isGameOver = true; 
        stopGame();
    }}
}, 10);

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
//     drown.style.width = "50px";
//     drown.style.height = "150px";
//     drown.style.left = "400px";
//     drown.style.top = "-500px";
//     counter = 0;

//     // Resume the game
//     resumeGame();
// });


 /*----- functions -----*/
 function jump(){
    jumping = 1;
    let jumpCount = 0;
    let jumpInterval = setInterval(function(){
        let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
        if((playerTop>6) && (jumpCount<15)){
            player.style.top = (playerTop-5)+"px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping=0;
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
    if (isGameOver) {
        // Display "Game Over" in red text below the score
        scoreElement.innerHTML = `Score: ${counter} <br><span style="color: red;">Game Over :( Please try again!</span>`;
    } else {
        // Display the current score
        scoreElement.textContent = `Score: ${counter}`;
    }
}

function stopGame() {
    clearInterval(gameInterval);
}

