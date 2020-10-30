/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 },
  radius = 5;

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let areaFunc;

/* APPLICATION STATE */
let state = {
  data: [],
  selectedCategory: null, // + YOUR FILTER SELECTION ??? why is this null on class code?
};

/* LOAD DATA */
// + SET YOUR DATA PATH
d3.csv("../../data/Linegraphdata.csv", d3.autotype) //d =>({
  // month: new Date(1995,array.indexOf(d.Month),1           this is to make my own columns 
  // category: d.Category,
  // amount: +d.Amount
//}))
.then(raw_data => {
  state.data = raw_data;
  // console.log(state.data[0])
  // console.log(Object.keys(state.data[0]))
  // console.log(...Object.keys(state.data[0]))
  // console.log(state.data.map(d => d.Category)) //source= state.data and then you map from category
  // console.log(new Set(state.data.map(d => d.Category)))
  // console.log(Array.from(new Set(state.data.map(d => d.Category))))
  console.log("raw_data", raw_data);
  init();
});



/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  // + SCALES
  xScale= d3
  .scaleBand()
  .domain(state.data.map(d=>d.Month))
  .range([margin.left, width - margin.right])
console.log(([0,d3.max(state.data, d=> +d.Amount)]))

  yScale =d3
  .scaleLinear()
  .domain([0,d3.max(state.data, d=> +d.Amount)])
  .range([height-margin.bottom,margin.top]);

  // + AXES
  const xAxis = d3.axisBottom(xScale);
  const yAxis =d3.axisLeft(yScale);
  // yAxis = d3.axisLeft(yScale).tickFormat(formatBillions); //??? I do not have billions
  // + UI ELEMENT SETUP

  const selectElement = d3.select("#dropdown")
  .on("change", function() {
    // `this` === the selectElement
    // 'this.value' holds the dropdown value a user just selected
    state.selectedCategory = this.value; // + UPDATE STATE WITH YOUR SELECTED VALUE
    console.log("new value is", this.value);
    draw(); // re-draw the graph based on this new selection
  });

  // add in dropdown options from the unique values in the data
  selectElement
    .selectAll("option")
    .data(["Choose a category",...Array.from(new Set(state.data.map(d => d.Category)))])
    // .data(["All",...Array.from(new Set(state.data.map(d => d.Category)))])
    // .data(["All", ...Object.keys(state.data[0])]) //the ... is a spread operator
    // .data(["All","Food","Rage","Entertainment","Gas","Dates","Bills","Clothes","Vacations","Other"]) // + ADD DATA VALUES FOR DROPDOWN  ???CAN I DO A MAP FUNCTION TO CREATE AN ARRAY INSTEAD OF ADDING THESE MANUALLY??
    .join("option")
    .attr("value", d => d)
    .text(d => d);

    selectElement.property("value", "Choose a category");

  // + SET SELECT ELEMENT'S DEFAULT VALUE (optional)

  // + CREATE SVG ELEMENT
  svg =d3
  .select("#d3-container")
  .append("svg")
  .attr("width",width)
  .attr("height",height)
  

  // + CALL AXES

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this everytime there is an update to the data/state
function draw() {
  let filteredData = [];
  if (state.selectedCategory !== null) {
    filteredData = state.data.filter(d => d.Category === state.selectedCategory);
  }
  // yScale.domain([0, d3.max(filteredData, d => d.population)]);

  const areaFunc = d3
  .area() // ??? I changed this to area but it was line
  .x(d=> xScale(d.Month))
  .y0(d=> yScale(d.Amount))
  .y1(yScale(0)); // we need two y values in order to show the direction of the area, 0 being the bottom


  const dot =svg
  .selectAll(".dot")
  .data(filteredData, d=>d.Month)
  .join(
    enter =>
    enter
    .append("circle")
    .attr("class","dot")
    .attr("cy",d=> yScale(d.Amount))
    .attr("cx", d=> xScale(d.Month))
    .attr("r",radius),
    
    update=> 
    update
    .attr("cy",d=>yScale(d.Amount)),
    exit => 
    exit.call(exit=>
      exit.remove())

  );

  const line = svg
  .selectAll("path.trend")
  .data([filteredData])
  .join(
    enter =>
    enter.append("path")
    .attr("class","trend"),
    update => update,
    exit=> exit.remove()
)
.call(selection =>
  selection.transition()
  .duration(100)
  .attr("d",d=>areaFunc(d))
  )

   
  // + FILTER DATA BASED ON STATE
  //
  // + UPDATE SCALE(S), if needed
  //
  // + UPDATE AXIS/AXES, if needed
  //
  // + DRAW CIRCLES, if you decide to
  // const dot = svg
  //   .selectAll("circle")
  //   .data(filteredData, d => d.name)
  //   .join(
  //     enter => enter, // + HANDLE ENTER SELECTION
  //     update => update, // + HANDLE UPDATE SELECTION
  //     exit => exit // + HANDLE EXIT SELECTION
  //   );
  //
  // + DRAW LINE AND AREA
}
