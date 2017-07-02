console.log("app.js is connected");

//create an array that will store all the X's O's and nulls

function createBoardArray(width, height){
	console.log(width, height);
	
	//create an empty two dimensional array
	var boardArray = [];
	for (i = 0; i < width; i++){
		boardArray[i] = [];
	}
	//initialize the array so all elements are empty strings
	for (i=0; i < width; i++){
		for (j=0; j < height; j++){
			boardArray[i][j] = '';
		}
	}
	console.log(boardArray);
}

//next write function that sticks clicked elements into the correct array spot

//functionality
//user hits begin
//X's start- we see an X hovering with the mouse in the browser- this is intuitive way to see who's turn it is. 
//make sure at the end of the turn, it switches var turn from X to O or vice versa
//on click in a certain div, a function puts an X or O in the above array in the appropriate spot
//then we run a function checkOutcome which looks at the rows, coloumns and diagonals 
	//check the whole board for a win
		//loop through rows (increment row index)
			//put a row into a check array and see if there's a consecutive 3 for a win
		//loop through colulmns (increment column index)
			//same as rows
		//loop through diagonals 
			//Put each diagonal into a an array and check it
				//to grab a diagonal, look at every spot on the board
					//ask, is there a diagonal here? if so put the contents in an array and check it



// wait for the DOM to finish loading
$(document).ready(function() {
  // all code to manipulate the DOM
  // goes inside this function

//create a board that corresponds to the array above for holding Xs, Os, nulls
	//it should be a grid of divs that have ids correspdons to spots in the array above
	//should likely use the target method where you're listening for clicks anywhere and s.t only happens when you click in a relevant spot





});
