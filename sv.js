// Data array
var data;
// Swap array
var randomizer_array;
// How many iterations we should run in each call
var steps;
// How many iterations have been completed in total
var steps_completed;

var is_sorted = false;
// Current sorting algorithm
var current_sorting_function;

// Screen Variables
var backaround_color = "white";


initalize();

// Initalizes all data
function initalize() {
	
	
	
	renderData();
}
// Creates the randomizer array
//function createRandomizer(var size) {
	
//}


// Sort array data, then randomize the data using the randomizer_array
function dataReset() {
	
}
// Changes sorting algorithm
function changeSort(var algorithm) {
	current_sorting_function = algorithm;
	dataReset();
}
/* Sorting Algorithms */
function insertionSort() {
	
}
// Clears the sorting screen
function clearScreen() {
	var canvas = document.getElementById("screen");
	canvas.style.background = backaround_color;
	var draw_context = canvas.getContext("2d");
	
	draw_context.clearRect(0, 0, canvas.width, canvas.height);
}
// Renders the current array
function renderData() {
	// Clear the screen
	// Render the data array at its current state
	clearScreen();
	
	var canvas = document.getElementById("screen");
	canvas.style.background = backaround_color;
	var draw_context = canvas.getContext("2d");
	
	draw_context.fillStyle = "green";
	
	draw_context.fillRect(0, 0, canvas.width, canvas.height);
}

function step() {
	switch(current_sorting_function) {
		case "insertion_sort": {
			Insertion_Sort();
			break;
		}
		default: {
			break;
		}
	}
	renderData();
}
function fullSpeedSort() {
	steps = 1;
	while(is_sorted !== true) {
		step();
	}
	renderData();
}


