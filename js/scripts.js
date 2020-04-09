// Business Logic --------------------------------------------
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

// User Interface Logic ------------------------------
var diceDisplay = function(rollResult) {
  $(".dice-hide").hide();
  if (rollResult === 1) {
    $(".dice-hide#pig").show();
  } else if (rollResult === 2) {
    $(".dice-hide#two").show();
  } else if (rollResult === 3) {
    $(".dice-hide#three").show();
  } else if (rollResult === 4) {
    $(".dice-hide#four").show();
  } else if (rollResult === 5) {
    $(".dice-hide#five").show();
  } else if (rollResult === 6) {
    $(".dice-hide#six").show();
  }
}

var roundTotal = function() {
  var rollResult = eachRoll();
  diceDisplay(rollResult);
  if (rollResult === 0){
    diceDisplay(1)
    turnTotal = 0;
    playerResults.updateTotal(turnTotal);
  }
  else {
    turnTotal += rollResult;
    $(".roll-total").html(turnTotal);
  } 
}

var playerResults = new PlayerResults ();
var endOfGame = function() {
  $(".gameover").show();
  $(".game").hide();
  playerResults.round = 0;
  if (playerResults.player1GrandTotal === playerResults.player2GrandTotal) {
    $(".winner").html("Tie!");
  } else if (playerResults.player1GrandTotal > playerResults.player2GrandTotal){
    $(".winner").html("Player 1!");
  } else {
    $(".winner").html("Player 2!");
  }
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
  $("#start").click(function() {
    $(".game").show();
    $(".welcome").hide();
  })
  $("#pig").show();
  $("button#roll").click(function() {
    roundTotal();
    refreshScores();
  })
  $("button#hold").click(function() {  
    playerResults.updateTotal(turnTotal);
    refreshScores();
  })
  $("button#new-game").click(function() {
    window.location.reload();
  })
})