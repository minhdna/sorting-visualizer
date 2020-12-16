//Merge Sort
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

//Quick Sort
function partition(array, low, high, animations){
  let i = low-1;
  let pivot = array[high];
  animations.push([0, high, high]);
  for (let j = low; j < high; j++){
    if (array[j] < pivot){
      i++;
      animations.push([1, i, j]);
      animations.push([3, i, j]);
      animations.push([2, i, j]);
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  animations.push([1, i+1, high]);
  animations.push([3, i+1, high]);
  animations.push([2, i+1, high]);
  let temp = array[i+1];
  array[i+1] = array[high];
  array[high] = temp
  animations.push([2, high, high]);
  return i+1;
}

function quickSortHelper(array, low, high, animations){
  if (low < high){
    let pi = partition(array, low, high, animations);
    quickSortHelper(array, low, pi-1, animations);
    quickSortHelper(array, pi+1, high, animations);
  }
}

export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array,0,array.length-1,animations);
  return animations;
}


//Bubble Sort
function bubbleSortHelper(array, high, animations){
  for (let i = 0; i < high; i++){
    for (let j = 0; j < high-i; j++)
    {
      animations.push([1, j, j+1]);
      if (array[j] > array[j+1]){
        animations.push([3, j, j+1]);
        let temp = array[j]
        array[j] = array[j+1]
        array[j+1] = temp
      }
      animations.push([2, j, j+1]);
    }
  }
}
export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSortHelper(array,array.length-1,animations);
  return animations;
}

//heap Sort
function heapify(array, n, i, animations){
  var largest = i; // Initialize largest as root
  var l = 2 * i + 1; // left = 2*i + 1
  var r = 2 * i + 2; // right = 2*i + 2

  // If left child is larger than root
  if (l < n && array[l] > array[largest])
      largest = l;

  // If right child is larger than largest so far
  if (r < n && array[r] > array[largest])
      largest = r;

  // If largest is not root
  if (largest !== i) {
      let swap = array[i];
      array[i] = array[largest];
      array[largest] = swap;
      animations.push([1, i, largest]);
      animations.push([3, i, largest]);
      animations.push([2, i, largest]);

      // Recursively heapify the affected sub-tree
      heapify(array, n, largest, animations);
  }
}

function heapSortHelper(array, animations){
  var n = array.length;
  // Build heap (rearrange array)
  for (let i = n / 2 - 1; i >= 0; i--)
      heapify(array, n, i, animations);

  // One by one extract an element from heap
  for (let i = n - 1; i > 0; i--) {
      // Move current root to end
      let temp = array[0];
      array[0] = array[i];
      array[i] = temp;
      animations.push([1, i, 0]);
      animations.push([3, i, 0]);
      animations.push([2, i, 0]);

      // call max heapify on the reduced heap
      heapify(array, i, 0, animations);
  }
}
export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  heapSortHelper(array,animations);
  return animations;
}
