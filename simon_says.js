let clickers = document.getElementsByClassName("color");
let pattern = []; // stores the sequence of id's of the color squares
let personTurn = false; // tracks when the user should begin a sequence and when they should not be clicking the squares
let clickCounter = 0; // tracks the user's progress in a given sequence to determine when they reach the end

let text = document.getElementById("text");
let play = document.getElementById("play");
let table = document.getElementById("tb");
let textBox = document.getElementById("text_box");
table.style.display = "none";

// this controls what happens when the user presses their mouse on a color square
function mouseDown() {
	if(personTurn) {
		this.className = "color_clicked";

		// this if statement turns the burder green if correct, red if incorrect
		if(this.id == pattern[clickCounter]) {
			this.style.borderColor = "#00cc00";
		} else {
			this.style.borderColor = "#cc0000";
		}
	}
}
// this controls what happens when the user lifts their mouse off the color square
function mouseUp() {
	if(personTurn) {
		if(this.id != pattern[clickCounter]) {
			personTurn = false;
			gameOver();
		}
		this.className = "color"; // resets the color square
		this.style.borderColor = "#eeeeee"; // gray border
		clickCounter++;
		
		// if the user has finished the suquence, call the function to restart and add to the sequence
		if(clickCounter == pattern.length) {
			setTimeout(function() {compSelect();}, 1000);
		}
	}
}

for(let i = 0; i < clickers.length; i++) {
	clickers[i].addEventListener("mousedown", mouseDown);
	clickers[i].addEventListener("mouseup", mouseUp);
}

function click(clicker) {
	setTimeout(function(){clicker.className = "color_clicked";}, 400);
	setTimeout(function() {clicker.className = "color";}, 800);
}

function showPattern(counter) {
	clicker = document.getElementById(pattern[counter]);
	click(clicker);
	if(counter < pattern.length-1) {
		setTimeout(function(){showPattern(counter + 1);}, 800);
	}
}

// when this is called it repeats the currently stored sequence (pattern) and adds a random next step to it
function compSelect() {
	table.style.display = "table";
	text.innerHTML = "Click on the squares in the sequence indicated.";
	play.style.display = "none";
	personTurn = false;
	switch(Math.floor(Math.random() * 4)) {
		case 0:
			pattern.push("blue");
			break;
		case 1:
			pattern.push("green");
			break;
		case 2:
			pattern.push("red");
			break;
		case 3:
			pattern.push("yellow");
			break;
	}
	showPattern(0);
	setTimeout(function() {personTurn = true;}, (800 * pattern.length));
	clickCounter = 0;
}

function gameOver() {
	table.style.display = "none";
	text.style.display = "inline";
	play.style.display = "block";
	text.innerHTML = "GAME OVER" + "<br>" + "You're score is " + (pattern.length-1) + "<br>" + "Would you like to play again?";
	pattern = [];
}

function showCheat() {
	textBox.style.display = "block";
	if(textBox.value == "cookie") {
		textBox.style.display = "none";
		textBox.value = "";
		clicker = document.getElementById(pattern[clickCounter]);
		click(clicker);
	}
}