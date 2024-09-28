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
var steps = 1;
// How many iterations have been completed in total
var steps_completed = 0;

var is_sorted = false;
// Current sorting algorithm
var current_sorting_function = "selectionSort";


// Screen Variables
var backaround_color = "white";

var color_1 = "#000000";
var color_2 = "#000000";

var use_gradiant = false;
var single_color = true;

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

	temp1 = document.getElementById('playbutton');
	temp1.addEventListener('click', function() {
		step_interval = setInterval(step,7)
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
	
	setColor1();
	setColor2();
	
	renderData();
}

function checkPairs(pow2) {
	if(data_size % pow2 === 0) {
		var temp1 = 2;
		var temp2 = 1;
		while(temp1 < pow2) {
			if(data[(temp2 * data_size) / temp1] < data[((temp2 * data_size) / temp1) - 1]) {
				return false;
			}
			for(var i = 0; i < (temp1 / 2) - 1;i++) {
				temp2 = temp2 + 2;
				if(data[(temp2 * data_size) / temp1] < data[((temp2 * data_size) / temp1) - 1]) {
					return false;
				}
			}
			temp1 = temp1 * 2;
		}
		return true;
	}
	return true;
}

function isSorted() {
	if(checkPairs(2) === false) {
		return false;
	}
	if(checkPairs(4) === false) {
		return false;
	}
	if(checkPairs(8) === false) {
		return false;
	}
	if(checkPairs(16) === false) {
		return false;
	}
	
	for(var i = 1; i < data_size;i++) {
		if(data[i - 1] > data[i]) {
			return false;
		}
	}
	return true;
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
	//Will trigger quicksort reset
	size = -1;
	renderData();
	clearInterval(step_interval)
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

//Quicksort based on this link: //https://stackoverflow.com/questions/68524038/is-there-a-python-implementation-of-quicksort-without-recursion
var size = -1;
var stack;
var quick_top;

function quickSort() {
    var canvas = document.getElementById("screen");
    if (size == -1) {
        initializeQuickSort(0,canvas.width)
    }
    let i = 0;
    while (i<=steps) {
        quickSortIterative(data,0,canvas.width)
        i++;
    }
    steps_completed = steps_completed + steps
}

function initializeQuickSort(l,h) {
    // Create an auxiliary stack
    size = h - l + 1;
    stack = new Array(size).fill(0);
    quick_top = -1
    // initialize quick_top of stack
    //quick_top = -1;
    // push initial values of l and h to stack
    quick_top = quick_top + 1;
    stack[quick_top] = l;
    quick_top = quick_top + 1;
    stack[quick_top] = h;
}

function partition(arr,l,h) {
    var i = ( l - 1 );
    var x = arr[h];
    var temp;

    for (let j = l; j < h; j ++) {
        if (arr[j] <= x) {

            // increment index of smaller element
            i++;
            temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
            }
    }
    temp = arr[i+1];
    arr[i+1] = arr[h];
    arr[h] = temp;
    return (i+1);
}

// Function to do Quick sort
// arr[] --> Array to be sorted,
// l  --> Starting index,
// h  --> Ending index
function quickSortIterative(arr,l,h) {
    // Keep popping from stack while is not empty
    if (quick_top >= 0) {
        // Pop h and l
        h = stack[quick_top];
        quick_top = quick_top - 1;
        l = stack[quick_top];
        quick_top = quick_top - 1;

        // Set pivot element at its correct position in
        // sorted array
        p = partition( arr, l, h );

        // If there are elements on left side of pivot,
        // then push left side to stack
        if (p-1 > l) {
            quick_top = quick_top + 1;
            stack[quick_top] = l;
            quick_top = quick_top + 1;
            stack[quick_top] = p - 1;
        }

        // If there are elements on right side of pivot,
        // then push right side to stack
        if (p+1 < h) {
            quick_top = quick_top + 1;
            stack[quick_top] = p + 1;
            quick_top = quick_top + 1;
            stack[quick_top] = h;
        }
    }
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
	
	if(use_gradiant === false && single_color === false) {
		draw_context.fillStyle = "green";
		
		for(var i = 0; i < data_size;i++) {
			var data_height = (data[i] / data_size) * canvas.height;
			draw_context.fillRect(i, canvas.height - data_height, data_size / canvas.width, data_height);
		}
	}
	else {
		if(use_gradiant === true) {
			var fcolor1 = [Number("0x" + color_1.charAt(1) +  color_1.charAt(2)), Number("0x" + color_1.charAt(3) +  color_1.charAt(4)), Number("0x" + color_1.charAt(5) +  color_1.charAt(6))];
			var fcolor2 = [Number("0x" + color_2.charAt(1) +  color_2.charAt(2)), Number("0x" + color_2.charAt(3) +  color_2.charAt(4)), Number("0x" + color_2.charAt(5) +  color_2.charAt(6))];
			
			var diff1 = ((fcolor2[0] - fcolor1[0]) / data_size);
			var diff2 = ((fcolor2[1] - fcolor1[1]) / data_size);
			var diff3 = ((fcolor2[2] - fcolor1[2]) / data_size);
			for(var i = 0; i < data_size;i++) {
				var r = Math.floor((fcolor1[0] + (diff1 * i))).toString(16);
				var g = Math.floor((fcolor1[1] + (diff2 * i))).toString(16);
				var b = Math.floor((fcolor1[2] + (diff3 * i))).toString(16);
				
				if(r.length === 1) {
					r = "0" + r;
				}
				if(g.length === 1) {
					g = "0" + g;
				}
				if(b.length === 1) {
					b = "0" + b;
				}
				var hex = "#" + r + g + b;
				
				draw_context.fillStyle = hex;
				
				var data_height = (data[i] / data_size) * canvas.height;
				draw_context.fillRect(i, canvas.height - data_height, data_size / canvas.width, data_height);
			}
		}
		else {
			// single_color === true
			draw_context.fillStyle = color_1;
			
			for(var i = 0; i < data_size;i++) {
				var data_height = (data[i] / data_size) * canvas.height;
				draw_context.fillRect(i, canvas.height - data_height, data_size / canvas.width, data_height);
			}
		}
	}	
}


//clear_interval = clearInterval(step)
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
		case "quickSort": {
		    quickSort();
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
function toggleSingleColor() {
	single_color = !single_color;
	
	document.getElementById("singlecolorbutton").checked = single_color;
	
	if(use_gradiant === true) {
		document.getElementById("gradientbutton").checked = false;
		use_gradiant = false;
	}
	
	renderData();
}
function toggleGradientColor() {
	use_gradiant = !use_gradiant;
	
	document.getElementById("gradientbutton").checked = use_gradiant;
	
	if(single_color === true) {
		document.getElementById("singlecolorbutton").checked = false;
		single_color = false;
	}
	
	renderData();
}
function setColor1() {
	color_1 = document.getElementById("color1input").value;
	renderData();
}
function setColor2() {
	color_2 = document.getElementById("color2input").value;
	renderData();
}
// value must be between 0 and 1
function clamp(min, max, value) {
	if(value > 1) {
		value = 1;
	}
	if(value < 0) {
		value = 0;
	}
	return min + ((max - min) * value);
}

