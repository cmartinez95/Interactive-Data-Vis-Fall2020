// Constants and Globals
const width = window.innerWidth *0.7,
    height = window.innerHeight *0.7,
    margin = { top: 20, bottom: 50, left: 60, right: 50 },
    radius = 5
  

// Time to make some variables
let svg;
let xScale;
let yScale;
let lineFunction;

// Now its time for the application state

let state ={
    data:[],
    selectedVariable1: null,
    selectedVariable2: null,
};

d3.csv("../../data/Long Format Unemployment.csv", d3.autoType)
.then(raw_data => {
    console.log(raw_data)
    const new_data = raw_data.map(row=> ({
        ...row,
        // Number: (row.Number).replace(/,/g, ''),
        date: new Date((+row.YEAR),(+row.MONTH),1)}))
    console.log(new_data);
    state.data= new_data;  

    init();
})

function init(){

// Scales 

xScale = d3
    .scaleTime()
    .domain(d3.extent(state.data, row =>row.date))
    .range([margin.left-(-30), width - margin.right]);


//  yScale =d3
//  .scaleLinear()
//  .domain(d3.extent(state.data, d=>d[1]))
//  .range([height - margin.bottom, margin.top]);
yScale =d3
    .scaleLinear()
    .domain([0,d3.max(state.data, row=> row.Number)])
    .range([height-margin.bottom,margin.top]);

console.log(yScale.domain())

const selectElement1 = d3.select("#dropdown1")
.on("change", function(){
    state.selectedVariable1= this.value
    console.log("new value is", this.value);
    draw();

});

selectElement1
.selectAll("option")
.data(["Select a category",...Array.from(new Set(state.data.map(row => row.Category)))])
// .data([...new Set(state.data.map(d=>d('Category')))])
.join("option")
.attr("value", d =>d)
.text(d=>d);

const selectElement2 = d3.select("#dropdown2")
.on("change", function(){
    state.selectedVariable2= this.value;
    console.log("new value is", this.value);
    draw();

});

selectElement2
.selectAll("option")
.data(["Select a category",...Array.from(new Set(state.data.map(row => row.Category)))])
// .data([...new Set(state.data.map(d=>d('Category')))])
.join("option")
.attr("value", d =>d)
.text(d=>d);

svg= d3
.select("#d3-container")
.append("svg")
.attr("width",width)
.attr("height",height);


 // AXES
 const xAxis = d3.axisBottom(xScale);
 const yAxis = d3.axisLeft(yScale);

//  yAxis
svg
.append('g')
.attr('class','y-axis')
.style('transform','translate(90px,0)')
.call(yAxis)
.append("text")
.attr("class", "axis-label-y")
.attr("x", "-22%")
.attr("transform", 'rotate(-90)')
.attr("dy", "-15%")
.style("fill","black")
.text("Population");

// xAxis
svg.append('g')
  .attr('class', 'axis x-axis')
  .attr('transform', `translate(0, ${height - margin.top - 20})`)
//   .attr('transform', 'translate(0, 60px)')
  .call(xAxis)
//   .tickValues(d3.extent(state.data, row =>row.date))
//   .tickFormat(d3.format("0"))
  .append("text")
  .attr("class", "axis-label-x")
  .attr("x", "55%")
  .attr("dy", "4em")
  .style("fill","black")
  .text("Year");

draw();
}

function draw(){

    // yScale =d3
    // .scaleLinear()
    // .domain(d3.extent(state.data, d=>d[1]))
    // .range([height - margin.bottom, margin.top]);
   
//   you only need one line function for both since they are using the same characteristics
const lineFunction =d3
.line()
.x(row=> xScale(row.date))
.y(row=> yScale(row.Number))

// This is for line/dropdown 1
    let filteredData1=[];
    if(state.selectedVariable1!=null){
        filteredData1 = state.data.filter(row=> row.Category === state.selectedVariable1);
    }


const line1 = svg
  .selectAll("path.trend1")
  .data([filteredData1])
  .join(
    enter =>
    enter.append("path")
    .attr("class","trend1"),
    update => update,
    exit=> exit.remove()
)
.call(selection =>
  selection.transition()
  .duration(10)
  .attr("d",d=>lineFunction(d))
  )

  // This is for line/dropdown 2
  let filteredData2=[];
  if(state.selectedVariable2!=null){
      filteredData2 = state.data.filter(row=> row.Category === state.selectedVariable2);
  }

const line2 = svg
.selectAll("path.trend2")
.data([filteredData2])
.join(
  enter =>
  enter.append("path")
  .attr("class","trend2"),
//   .attr("style", "fill":"none")
//   .attr("style", "stroke":"#000")
  update => update,
  exit=> exit.remove()
)
.call(selection =>
selection.transition()
.duration(100)
.attr("d",d=>lineFunction(d))
)

}


