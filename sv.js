// Data array
var data = [];
var data_size = 0;
// Swap array

class Swap_Pair {
	constructor(num1, num2) {
		this.num1 = num1;
		this.num2 = num2;
	}
}

var randomizer_array = [];
// How many iterations we should run in each call
var steps = 16;
// How many iterations have been completed in total
var steps_completed = 0;

var is_sorted = false;
// Current sorting algorithm
var current_sorting_function = "shellSort";

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
	
	createRandomizer();
	
	for(var i = 0; i < data_size;i++) {
		data.push(i + 1);
	}
	for(var i = 0; i < randomizer_array.length;i++) {
		var pair = randomizer_array[i];
		var temp = data[pair.num1];
		data[pair.num1] = data[pair.num2];
		data[pair.num2] = temp;
	}
	
	
	renderData();
}

// Creates the randomizer array
function createRandomizer() {
	var canvas = document.getElementById("screen");
	
	var counter = 0;
	var last_size = 0;
	
	var temp_set = new Set();
	
	var num1 = 0;
	var num2 = 0;
	
	while(counter < canvas.width) {
		var number = Math.floor(Math.random() * canvas.width);
		
		last_size = temp_set.size;
		
		temp_set.add(number);
		
		if(last_size !== temp_set.size) {
			counter = counter + 1;
			
			if(counter % 2 === 0) {
				num1 = number;
			}
			else {
				num2 = number;
				randomizer_array.push(new Swap_Pair(num1, num2));
			}
		}
	}
}


// Sort array data, then randomize the data using the randomizer_array
function dataReset() {
	steps_completed = 0;
	data.sort(function(a, b){return b - a});
	for(var i = 0; i < randomizer_array.length;i++) {
		var pair = randomizer_array[i];
		var temp = data[pair.num1];
		data[pair.num1] = data[pair.num2];
		data[pair.num2] = temp;
	}
	renderData();
}
// Changes sorting algorithm
function changeSort(algorithm) {
	current_sorting_function = algorithm;
	dataReset();
}
/* Sorting Algorithms */
function selectionSort() {
	var counter = 0;
	for(var i = (steps_completed === 0 ? 0 : steps_completed - 1); i < data_size - 1;i++) {
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
	steps_completed = steps_completed + steps;
}

function insertionSort() {
    var temp;
    let run_count = 0;
    while (run_count < steps) {
        let i = steps_completed;
        while((i>0) && (data[i]<=data[i-1])) {
            temp = data[i];
            data[i] = data[i-1];
            data[i-1] = temp;
            i = i - 1;
        }
        steps_completed = steps_completed + 1
        run_count = run_count + 1
    }
}

function swap(a, i, j) {
	const temp = a[i];
	a[i] = a[j];
	a[j] = temp;
}

let gap, shellSort_isInitialized = false;
let shellSort_i, shellSort_j;
function shellSort() {
	if (!shellSort_isInitialized) {
		gap = Math.floor(data_size / 2);
		shellSort_i = gap;
		shellSort_isInitialized = true;
	}

	let swapsMade = 0;
    while (gap > 0 && swapsMade < steps) {
        if (shellSort_i < data.length) {
            if (shellSort_j === undefined || shellSort_j < 0) {
                shellSort_j = shellSort_i - gap;
            }

            // Continue comparing and swapping as needed
            if (shellSort_j >= 0 && data[shellSort_j] > data[shellSort_j + gap]) {
                swap(data, shellSort_j, shellSort_j + gap);
                shellSort_j -= gap; // Move to the next element in the sublist
                swapsMade++;
            } else {
                // Move to the next i when no more swaps can be done in this sublist
                shellSort_i++;
                shellSort_j = undefined;
            }
        } else {
            // Move to the next gap size when we have finished the current gap
            shellSort_i = gap = Math.floor(gap / 2);
        }
    }
	steps_completed += swapsMade;
}

function quickSort() {

}

function quickRecurse() {

}

function partition() {
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
		case "insertionSort": {
		    insertionSort();
		    break;
		}
		case "shellSort": {
			shellSort();
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


