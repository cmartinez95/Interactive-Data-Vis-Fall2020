// Constants and Globals
const width = window.innerWidth *0.7,
    height = window.innerHeight *0.7,
    margin = { top: 20, bottom: 50, left: 60, right: 40 },
    radius = 5;

// Lets make some variables
let svg;
let xScale;
let yScale;
let lineFunc;

// Application state
let state ={
    data:[]
    selectedVariable: null
}

d3.