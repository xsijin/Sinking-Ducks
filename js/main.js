 // Main objective of Sinking Ducks is to keep the duck (player) afloat!
 // The game is lost when the duck collides with an obstacle or sinks to the bottom of the pond.
 // Score is kept track by time; i.e. 1ms = 1 point

 //--wireframe--
 //need platform to jump
 //need reset
 //show win state
 //able to choose number of players (WASD,directional key)
 //check if game is lost
 //show score
 
 /*----- constants -----*/



 /*----- state variables -----*/

 //collision variable
let collision = setInterval(function(){
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    let obstaclesLeft = parseInt(window.getComputedStyle(obstacles).getPropertyValue("left"));
    if (obstaclesLeft<20 && obstaclesLeft>0 && playerTop>=130){
        obstacles.style.animation = "none";
        obstacles.style.display = "none";
        alert("Duck sank!");
    }
}, 10);

//sink to bottom variable

 /*----- cached elements  -----*/
 const player = document.getElementById("player");
 const obstacles = document.getElementById("obstacles");

 /*----- event listeners -----*/


 /*----- functions -----*/
 function jump(){
    if(player.classList != "animate"){
        player.classList.add("animate");
    }
    setTimeout(function(){
        player.classList.remove("animate");
    }, 500);
 }