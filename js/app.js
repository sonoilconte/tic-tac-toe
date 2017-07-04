// Functionality
// user hits begin
// X's start- we see an X hovering with the mouse in the browser- this is intuitive way to see whose turn it is. 
// make sure at the end of the turn, it switches var turn from X to O or vice versa
// on click in a certain div, a function puts an X or O in an array in the appropriate spot
// then we run a function checkOutcome which looks at the rows, coloumns and diagonals 
// check the board for a win- 8 possible wins
// say who wins
// user can click reset button to start over

//Global variables
var clickCount = 0;
var turnMarker = 'X';
var gameOn = true;

//create an array that will store the X's, O's, and empty strings
var boardArray = [];
function createBoardArray(){	
	//create an empty two dimensional array
	for (i = 0; i < 3; i++){
		boardArray[i] = [];
	}
	//initialize the array so all elements are empty strings
	for (i=0; i < 3; i++){
		for (j=0; j < 3; j++){
			boardArray[i][j] = '';
		}
	}
}

//add IDs to the empty HTML/CSS grid provided and put empty strings in the boxes
function addIds(){
	//empty array that is a list of the coordinates for each div
	var boardDivCoordinates = [];
	//put the needed coordinates into boardDivCoordinates
	for(i = 0; i < 3; i++){
		for(j = 0; j < 3; j++){
			boardDivCoordinates.push(i + "-" + j)
		}
	}
	//attach the board coordinates to all the boxs as IDs
	$.each($('.box'), function(i){
		$(this).attr('id', boardDivCoordinates[i]);
		$(this).text(''); //empty string in the div for now to indicate it's empty
	});
}

function reset(){
	clickCount = 0;
	turnMarker = 'X';
	gameOn = true;
	$('#winnerAnnounce').text('');
	console.log("reset gameOn is " + gameOn)
}
	
$(document).ready(function() {
	
	//announce whose turn it is
	$('#winnerAnnounce').text("It's " + turnMarker + "'s turn!");

	function checkOutcome(){
		//create arrays establishing what it means to win the game
		var xWinsArray = [];
		for (i = 0; i < 3; i++){
			xWinsArray.push('X');
		}
		var oWinsArray = [];
		for (i = 0; i < 3; i++){
			oWinsArray.push('O');
		}
		//an array to put rows, columns, and diagonals of the board into in order to check them
		var checkArray = [];

		// look through all the rows of a win
		for(i = 0; i < 3; i++){
			checkArray = [];
	 		for(j = 0; j < 3; j++){
	 			checkArray.push(boardArray[i][j]);
			}
			if(areArraysEqual(checkArray, xWinsArray) || areArraysEqual(checkArray, oWinsArray)){
			winnerAnnounce(turnMarker);
			return false;
			} 	
	 	}	
	 	// look through all the columns for a win
		for(i = 0; i < 3; i++){
			checkArray = [];
	 		for(j = 0; j < 3; j++){
	 			checkArray.push(boardArray[j][i]);
			}
			if(areArraysEqual(checkArray, xWinsArray) || areArraysEqual(checkArray, oWinsArray)){
			winnerAnnounce(turnMarker);
			return false;
			} 	
	 	}

	 	//look at the top-left to bottom-right diagonal for a win
	 	checkArray = [];
		for (j = 0; j < 3; j++){		 		
		 	checkArray.push(boardArray[j][j]);	
	 	}
	 	if(areArraysEqual(checkArray, xWinsArray) || areArraysEqual(checkArray, oWinsArray)){
				winnerAnnounce(turnMarker);
				return false;
		}

		//look at the top-right to bottom left diagonal for a win
	 	checkArray = [];
		for (i = 0, j = 2; i < 3, j >= 0; i++, j--){		 		
		 	checkArray.push(boardArray[i][j]);	
	 	}
	 	if(areArraysEqual(checkArray, xWinsArray) || areArraysEqual(checkArray, oWinsArray)){
				winnerAnnounce(turnMarker);
				return false;
		}

		//lastly check if the board is full and if all the above checks indicate no win, then there is a draw
		var draw = true;
		for(i = 0; i < 3; i++){
	 		for(j = 0; j < 3; j++){
	 			if (boardArray[i][j] === ""){
	 				draw = false;
	 			}
			}
	 	}	
	 	if (draw){
	 		$('#winnerAnnounce').text("It's a draw!");
	 		return false;
	 	}

		return true;
	}


	//function to check if any two arrays are the same
	//used to compare the checkArray with boardArray
	function areArraysEqual(array1, array2){
		if (array1.length !== array2.length){
			return false
		}
		else{
			for(q = 0; q < array1.length; q++){
				if (array1[q] === array2[q]){
					continue;
				}
				else{
					return false;
				}
			}	
		return true;
		}
	}

	function winnerAnnounce(winner){
		$('#winnerAnnounce').text(winner + ' is the winner!');
	}

	createBoardArray();
	addIds();

//function that sticks clicked elements into the correct array spot
//and also puts an X or O in the right div
//use the target method where you're listening for clicks anywhere and event fires when you click in a relevant spot
	$(document).on('click', function(event){
		if(gameOn){
			var spot = $(event.target);
			var spotId = spot.attr('id');
			//if user clicked a spot with an id that is also empty,  
			if(spotId && spot.text() === ''){
				// take id of div clicked, split it into coordinates,
				var spotCoordinates = spotId.split('-');	
				var x = spotCoordinates[0];
				var y = spotCoordinates[1];
				//using those coordinates, put the turnMarker into the right spot in boardArray
				//boardArray is what we use in checkArray later to see if there's a win or draw
				boardArray[x][y] = turnMarker;
				//put the turnMarker into the div so the user sees where they've played X or O
				$('#' + spotId).text(turnMarker);
				// console.log(spotCoordinates[0], spotCoordinates[1]);
				//for testing
				for (i = 0; i < 3; i++){
					console.log(boardArray[i]);
				}

				console.log("turn: " + turnMarker);
				
				gameOn = checkOutcome();

				if(gameOn){
					//increment clickCount-- if it's even it swtiches to X's turn, else it's O's turn,
					clickCount++;
					if (clickCount % 2 === 0){
						turnMarker = 'X';
					}
					else {
						turnMarker = 'O';
					}
					$('#winnerAnnounce').text("It's " + turnMarker + "'s turn!");
				}

				console.log("game is on " + gameOn);
			}
		}
	});
});
