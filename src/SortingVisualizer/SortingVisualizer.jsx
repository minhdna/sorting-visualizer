import React from 'react';
import {getMergeSortAnimations, getQuickSortAnimations, getBubbleSortAnimations, getHeapSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 5;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#2984F2';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';
const TERTIARY_COLOR = 'yellow';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.state = {
      array: [],
      width:  1600,
      height: 900
    };
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight});
    this.resetArray();
  }

  resetArray() {
    var size = Math.floor((this.state.width - 20)/5);
    var height = Math.floor((this.state.height)*8/10);
    const array = [];
    for (let i = 0; i < size; i++) {
      array.push(randomIntFromInterval(5, height));
    }
    this.setState({array});
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        //changing colors of comparing bars
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          //set new heights for bars
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++){
      const arrayBars = document.getElementsByClassName('array-bar');
      const [type, barOneIdx, barTwoIdx] = animations[i];
      setTimeout(() => {
        if (type === 0){
          //changing pivot colors
          arrayBars[barOneIdx].style.backgroundColor = TERTIARY_COLOR;
        }
        else if (type === 1){
          //Comparing colors
          arrayBars[barOneIdx].style.backgroundColor = SECONDARY_COLOR;
          arrayBars[barTwoIdx].style.backgroundColor = SECONDARY_COLOR;
        }
        else if (type === 2){
          //resetting colors
          arrayBars[barOneIdx].style.backgroundColor = PRIMARY_COLOR;
          arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
        }
        else {
          //swapping heights
          const temp = arrayBars[barOneIdx].style.height;
          arrayBars[barOneIdx].style.height = arrayBars[barTwoIdx].style.height;
          arrayBars[barTwoIdx].style.height = temp;
        }
      }, i * ANIMATION_SPEED_MS);
    }
  }

  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++){
      const arrayBars = document.getElementsByClassName('array-bar');
      const [type, barOneIdx, barTwoIdx] = animations[i];
      setTimeout(() => {
        if (type === 1){
          //Comparing colors
          arrayBars[barOneIdx].style.backgroundColor = SECONDARY_COLOR;
          arrayBars[barTwoIdx].style.backgroundColor = SECONDARY_COLOR;
        }
        else if (type === 2){
          //resetting colors
          arrayBars[barOneIdx].style.backgroundColor = PRIMARY_COLOR;
          arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
        }
        else {
          //swapping heights
          const temp = arrayBars[barOneIdx].style.height;
          arrayBars[barOneIdx].style.height = arrayBars[barTwoIdx].style.height;
          arrayBars[barTwoIdx].style.height = temp;
        }
      }, i * 3);
    }
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++){
      const arrayBars = document.getElementsByClassName('array-bar');
      const [type, barOneIdx, barTwoIdx] = animations[i];
      setTimeout(() => {
        if (type === 1){
          //Comparing colors
          arrayBars[barOneIdx].style.backgroundColor = SECONDARY_COLOR;
          arrayBars[barTwoIdx].style.backgroundColor = SECONDARY_COLOR;
        }
        else if (type === 2){
          //resetting colors
          arrayBars[barOneIdx].style.backgroundColor = PRIMARY_COLOR;
          arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
        }
        else {
          //swapping heights
          const temp = arrayBars[barOneIdx].style.height;
          arrayBars[barOneIdx].style.height = arrayBars[barTwoIdx].style.height;
          arrayBars[barTwoIdx].style.height = temp;
        }
      }, i * 1);
    }
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const sortedArray = getBubbleSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
    }
  }

  render() {
    const {array} = this.state;

    return (
      <div className="card">
        <h5 className="card-title">Sorting Visualizer</h5>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button className="btn btn-primary" onClick={() => this.resetArray()}>Generate New Array</button>
            <button className="btn btn-primary" onClick={() => this.bubbleSort()}>Bubble Sort</button>
            <button className="btn btn-primary" onClick={() => this.mergeSort()}>Merge Sort</button>
            <button className="btn btn-primary" onClick={() => this.quickSort()}>Quick Sort</button>
            <button className="btn btn-primary" onClick={() => this.heapSort()}>Heap Sort</button>
            {
            // <button className="btn btn-primary" onClick={() => this.testSortingAlgorithms()}>
            //   Test Sorting Algorithms (BROKEN)
            // </button>
            }
          </div>
        <div className="card-body">
          <div className="array-container">

            <div className="content">
              {array.map((value, idx) => (
                <div
                  className="array-bar"
                  key={idx}
                  style={{
                    backgroundColor: PRIMARY_COLOR,
                    height: `${value}px`,
                  }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
