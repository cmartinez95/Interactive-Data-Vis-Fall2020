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
    data:[],
    selectedVariable: null
}
//... is a spread operator
// for every row, take ... and then do other stuff (d=row)
// I am telling d3 what to do with every row, d can be replaced with row
//d3 cvs is a method
//(d3.csv(link,action))
// d3.csv("../../data/NYS Unemployment data.csv", row =>({
//     ...row,
//     date: new Date((+row.YEAR),(+row.MONTH),1),
//     MONTH: +row.MONTH,
//     YEAR: +row.YEAR
// })).then(
//     data=> console.log(data)
// )

d3.csv("../../data/NYS Unemployment data.csv", d3.autoType)
.then(data => {
    console.log(data)
    const date = data.map(row=> ({
        ...row,
        date: new Date((+row.YEAR),(+row.MONTH),1)  
    }))
    console.log(date);
    init();
})

function init(){
    // dropdown box 1
    const selectElement1 = d3.select("#dropdown1")
    .on("change", function(){
        state.selectedVariable = this.value;
        console.log("new value is", this.value);
        draw();
    });

selectElement1
.selectAll("option")
.data(["Choose a  category"...])


    // dropdown box 2
    const selectElement2 = d3.select("#dropdown2")
    .on("change", function(){
        state.selectedVariable = this.value;
        console.log("new value is", this.value);
        draw();
    });
}