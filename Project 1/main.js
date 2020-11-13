// Constants and Globals
const width = window.innerWidth *0.7,
    height = window.innerHeight *0.7,
    margin = { top: 20, bottom: 50, left: 60, right: 50 },
    radius = 5
    default_selection ='Select a Category'

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
    .range([margin.left, width - margin.right]);


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

svg
.append('g')
.attr('class','y-axis')
.style('transform','translate(60px,0)')
.call(d3.axisLeft(yScale))

svg.append('g')
  .attr('class', 'x-axis')
  .attr('transform', `translate(0, ${height - margin.top - 20})`)
  .call(d3.axisBottom(xScale))
  .tickValues(d3.extent(state.data, row =>row.date))
  .tickFormat(d3.format("0"));

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



// // Constants and Globals
// const width = window.innerWidth *0.7,
//     height = window.innerHeight *0.7,
//     margin = { top: 20, bottom: 50, left: 60, right: 40 },
//     radius = 5
//     default_selection ="Select";

// // Lets make some variables
// let svg;
// let xScale;
// let yScale;
// let lineFunc;

// // Application state
// let state ={
//     data:[],
//     selectedVariable: null
// }
// //... is a spread operator
// // for every row, take ... and then do other stuff (d=row)
// // I am telling d3 what to do with every row, d can be replaced with row
// //d3 cvs is a method
// //(d3.csv(link,action))
// // d3.csv("../../data/NYS Unemployment data.csv", row =>({
// //     ...row,
// //     date: new Date((+row.YEAR),(+row.MONTH),1),
// //     MONTH: +row.MONTH,
// //     YEAR: +row.YEAR
// // })).then(
// //     data=> console.log(data)
// // )

// d3.csv("../../data/Long Format Unemployment.csv", d3.autoType)
// .then(data => {
//     console.log(data)
//     const woah = data.map(row=> ({
//         ...row,
//         date: new Date((+row.YEAR),(+row.MONTH),1)  
//     }))
//     console.log(woah);
//     init();
// })

// function init(){
 
//     // // Scales
//     xScale = d3
//     .scaleTime()
//     .domain(d3.extent(state.data, row =>row.date))
//     .range([margin.left, width - margin.right]);


//     yScale =d3
//     .scaleLinear()
//     .domain([0,d3.max(state.data, d=> row.Number)])
//     .range([height-margin.bottom,margin.top]);

//     yScale2 = d3
//     .scaleLinear()
//     .domain([0,12])
//     .range([height-margin.bottom,margin.top]);

//     Axes
//     const xAxis= d3.axisBottom(xScale);
//     const yAxis = d3.axisLeft(yScale);
//     const yAxis2 = d3.axisRight(yScale2);
    
//     // dropdown box 1
//     const selectElement1 = d3.select("#dropdown1")
//     .on("change", function(){
//         state.selectedVariable = this.value;
//         console.log("new value is", this.value);
//         draw();
//     });

// selectElement1
// .selectAll("option")
// .data(["Select a category","NYS Labor Force","NYS Employed","NYS Unemployed","NYS Unemployment Rate","NYC Labor Force","NYC Employed","NYC Unemployed","NYC Unemployment Rate"])
// // .data(["Select a category",...Array.from(new Set(state.woah.map(row => row.Category)))])
// .join("option")
// .attr("value", row => row)
// .text(d => d);

// // dropdown box 2
//     const selectElement2 = d3.select("#dropdown2")
//     .on("change", function(){
//         state.selectedVariable = this.value;
//         console.log("new value is", this.value);
//         draw();
//     });

// selectElement2
// .selectAll("option")
// .data(["Select a category","NYS Labor Force","NYS Employed","NYS Unemployed","NYS Unemployment Rate","NYC Labor Force","NYC Employed","NYC Unemployed","NYC Unemployment Rate"])
// .join("option")
// .attr("value", row => row)
// .text(d => d);

// selectElement1.property("value", "Select a category");
// selectElement2.property("value", "Select a category");



// svg= d3
// .select("#d3-container")
// .append("svg")
// .attr("width",width)
// .attr("height",height);

// draw()
//     };

// function draw(){
//     let filteredData =[];
//     if (state.selectedVariable !==null){
//         filteredData = state.woah.filter(row => row.Category === state.selectedVariable)
//     }
//    const lineFunction =d3 //now that I have two yScales what do I do?
//    .line()
//    .x(row => xScale(row.date)) 
//    .y(row=> yScale(row.Number));

// const dot =svg
// .selectAll(".dot")
// .data(filteredData, d=>d.date)
// .join(
//     enter =>
//     enter
//     .append("circle")
//     .attr("class","dot")
//     .attr("cy", d=> yScale(row.Number))
//     .attr("cx", d=> yScale(row.date))
//     .attr("r",radius),

//     update =>
//     update.attr("cy", row= yScale(row.Number)),
    
//     exit =>
//     exit.call(exit=>
//         exit.remove())
// );

// const line= svg
// .selectAll("path.trend")
// .data([filteredData])
// .join(
//     enter =>
//     enter.append("path")
//     .attr("class","trend"),
    
//     update => update,

//     exit => exit.remove()
// )



// }