// Data array
var data = [];
var data_size = 0;
// Swap array
var randomizer_array = [];
// How many iterations we should run in each call
var steps = 16;
// How many iterations have been completed in total
var steps_completed = 0;

var is_sorted = false;
// Current sorting algorithm
var current_sorting_function = "selectionSort";

// Screen Variables
var backaround_color = "white";


initalize();

// Initalizes all data
function initalize() {
	var canvas = document.getElementById("screen");
	canvas.style.background = backaround_color;
	var draw_context = canvas.getContext("2d");
	
	data_size = canvas.width;
	
	var temp1 = document.getElementById('stepbutton');

	temp1.addEventListener('click', function() {
		step();
	}, false);

	temp1 = document.getElementById('resetbutton');

	temp1.addEventListener('click', function() {
		dataReset();
	}, false);
	
	
	for(var i = 0; i < data_size;i++) {
		data.push(data_size - i + 1);
	}
	
	renderData();
}
// Creates the randomizer array
function createRandomizer(size) {
	
}


// Sort array data, then randomize the data using the randomizer_array
function dataReset() {
	
}
// Changes sorting algorithm
function changeSort(algorithm) {
	current_sorting_function = algorithm;
	dataReset();
}
/* Sorting Algorithms */
function selectionSort() {
	var counter = 0;
	if(steps_completed === 0) {
		for(var i = 0; i < data_size - 1;i++) {
			counter = counter + 1;
			var min = i;
			for(var j = i + 1; j < data_size;j++) {
				if(data[j] < data[min]) {
					min = j;
				}
			}	
			if(min != i) {
				var temp = data[i];
				data[i] = data[min];
				data[min] = temp;
			}
			if(counter === steps) {
				break;
			}
		}
	}
	else {
		for(var i = steps_completed - 1; i < data_size - 1;i++) {
			counter = counter + 1;
			var min = i;
			for(var j = i + 1; j < data_size;j++) {
				if(data[j] < data[min]) {
					min = j;
				}
			}	
			if(min != i) {
				var temp = data[i];
				data[i] = data[min];
				data[min] = temp;
			}
			if(counter === steps) {
				break;
			}
		}
	}
	steps_completed = steps_completed + steps;
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
	
	for(var i = 0; i < data_size;i++) {
		var data_height = (data[i] / data_size) * canvas.height;
		draw_context.fillRect(i, canvas.height - data_height, data_size / canvas.width, data_height);
	}
}

function step() {
	switch(current_sorting_function) {
		case "selectionSort": {
			selectionSort();
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


