// Business Logic --------------------------------------------
// var round = 1;
 var turnTotal = 0;


function PlayerResults() {
  this.player1GrandTotal = 0,
  this.player2GrandTotal = 0,
  this.player1Turn = true,
  this.round = 1
}

PlayerResults.prototype.updateTotal = function(turnTotal) {
  if (this.player1Turn) {
    this.player1GrandTotal += turnTotal;
    this.switchPlayer();
  } else {
    this.player2GrandTotal += turnTotal;
    this.round += 1;
    if (this.round === 4) {
      endOfGame();
    } else {
    this.switchPlayer();
    }
  }
}

PlayerResults.prototype.switchPlayer = function() {
  this.player1Turn = !this.player1Turn;
  turnTotal = 0;
}

var eachRoll = function() {
  var randomGenerator = Math.ceil(Math.random() * 6);
  if (randomGenerator === 1) {
    return 0;
  } else {
    return randomGenerator;
  }
}

var roundTotal = function() {
 var rollResult = eachRoll();
 $(".roll").html(rollResult);
 if (rollResult === 0){
  turnTotal = 0;
  playerResults.updateTotal(turnTotal);
  $(".roll").html(1);
  }
  else {
    turnTotal += rollResult;
    $(".roll-total").html(turnTotal);
  } 
}



// User Interface Logic ------------------------------
var playerResults = new PlayerResults ();
var endOfGame = function() {
  $(".gameover").show();
  $("button#roll").hide();
  $("button#hold").hide();
  playerResults.round = 0;
}

var refreshScores = function() {
  $(".playerOneScore").html(playerResults.player1GrandTotal);
  $(".playerTwoScore").html(playerResults.player2GrandTotal);
  $(".round").html(playerResults.round);
  if (playerResults.player1Turn) {
    $(".playerId").html(1);
  } else {
    $(".playerId").html(2);
  } 
}

$(document).ready(function() {
  $("button#roll").click(function() {
    roundTotal();
    refreshScores();
  })
  //Update hold in the future so two places are not updating the same variable-best practice
  $("button#hold").click(function() {  
    playerResults.updateTotal(turnTotal);
    refreshScores();
  })
  $("button#new-game").click(function() {
    window.location.reload();
  })  
})