// Constants and Globals
const width =window.innerWidth *0.8
    height =window.innerHeight *0.8
    margin = {top: 30, bottom: 60, left: 70, right:50}

// Now we need to create variables we can use throughout the project
let svg
let xScale
let yScale
let lineFun;

// Application State
let state ={
    data:[],
    selectedCategory: "Select Category" // Difference between null and this?
}

// Time to load my data
d3.csv("../..data/")