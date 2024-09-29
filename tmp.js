/*
// Normal heap sort (tested, works)
function heapSort(data) {
	let heapSortStart = Math.floor(data_size / 2);
	let heapSortEnd = data_size;
	while (heapSortEnd > 1) {
		if (heapSortStart > 0) {
			--heapSortStart;
		} else {
			swap(data, --heapSortEnd, 0);
		}
		let root = heapSortStart;
		let maxchild;
		while ((maxchild = 2 * root + 1) < heapSortEnd) {
			{
				const rightchild = maxchild + 1;
				if (rightchild < heapSortEnd && data[maxchild] < data[rightchild]) {
					maxchild = rightchild;
				}
			}
			if (data[root] >= data[maxchild]) break;
			swap(data, root, maxchild);
			root = maxchild;
		}
	}
}
*/

/*
// Normal shell sort (tested, works)
function shellSort() {
	let gap = data_size;
	while ((gap = Math.floor(gap / 2)) > 0) {
		for (let i = gap; i !== data_size; ++i) {
			for (let j = i - gap; j >= 0 && data[j] > data[j + gap]; j -= gap) {
				swap(data, j, j + gap);
			}
		}
	}
}
*/

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
                swap(data, shellSort_j, shellSort_j + gap); // Swap the elements
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
