

// d3.csv("../../data/fakedata.csv",function(data) {
//     console.log(data)
//     var child = data.columns[0]; 
//     var parent = data.columns[1]; 
//     stratify = d3.stratify() 
//                 .id(d => d[child]) 
//                 .parentId(d => d[parent]); 
//     var root=stratify(data) 
//     console.log(root)
//     console.log(data);

d3.csv("../../data/GFMedium.csv", d3.autoType)
.then(raw_data => {
    console.log(raw_data);
    console.log(typeof raw_data)


 

    const width = window.innerWidth *0.7,
    height = window.innerHeight *0.7,
    margin = { top: 20, bottom: 50, left: 60, right: 50 },
    radius = 5
  

// Time to make some variables
    
var svg = d3.select("#d3-container1")
.append("svg")
.attr("width", width)
.attr("height", height)


var root =d3.stratify()
.id(function(d) { return d.name; })
.parentId(function(d) { return d.parent; })
(raw_data);

root.sum(function(d) { return +d.value })

d3.treemap()
.size([width, height])
.padding(4)
(root)

console.log(root.leaves())

svg
.selectAll("rect")
.data(root.leaves())
.enter()
.append("rect")
    .attr('x', function (d) { return d.x0; })
    .attr('y', function (d) { return d.y0; })
    .attr('width', function (d) { return d.x1 - d.x0; })
    .attr('height', function (d) { return d.y1 - d.y0; })
    .style("stroke", "black")
    .style("fill", "#69b3a2");
svg
.selectAll("text")
.data(root.leaves())
.enter()
.append("text")
    .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
    .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
    .text(function(d){ return d.data.name})
    .attr("font-size", "15px")
    .attr("fill", "white")
})


d3.csv("../data/All Words.csv",d3.autoType).then(data =>{
    console.log(data);
  
  
  const width = window.innerWidth * 0.9,
  height = window.innerHeight / 3,
  paddingInner = 0.2,
  margin = { top: 20, bottom: 40, left: 70, right: 40 };
  
  const yScale = d3
  .scaleBand()
  .domain(data.map(d=>d.word))
  .range([height-margin.bottom,margin.top])
  .paddingInner(paddingInner)
  
  const xScale =d3
  .scaleLinear()
  .domain([0,d3.max(data,d=>d.n)])
  .range([margin.left, width-margin.right])
  console.log(xScale.range())
  console.log(xScale(0))
  
  const svg =d3
  .select("#d3-container2")
  .append("svg")
  .attr("width",width)
  .attr("height",height)
  
  const rect =svg
  .selectAll("rect")
  .data(data)
  .join("rect")
  .attr("x", d=> xScale(0))
  // .attr("x",d=>xScale(d.TextSent))
  // .attr("x",0)
  .attr("y", d=>yScale(d.word))
  // .attr("width",100)
  .attr("width",d=> xScale(d.n))
  .attr("height",yScale.bandwidth())
  // .attr("width",yScale.bandwidth())
  // .attr("height", d=>height-margin.bottom-yScale(d.Day))
  .attr("fill","black")
  
  const yAxis= d3.axisLeft(yScale)
  
  svg
  .append("g")
  .attr("class", "axis")
  // .attr("transform",'rotate(90deg)')
  // .attr("transform", `translate(0, ${height - margin.bottom})`)
  .attr("transform",`translate(${margin.left})`)
  .call(yAxis)
  
  })

let svg1;
let xScale1;
let yScale1;
let rect1

let state ={
    data: [],
    selectedType: null,
};

d3.csv("../data/Sector Words.csv",d3.autoType).then(word_data =>{
    state.data = word_data
    console.log(word_data);
    init();
});

function init(){

   yScale1 =d3
   .scaleBand()
   .domain(state.data.map(row => row.word))
   .range([height-margin.bottom,margin.top])
   .paddingInner(paddingInner)

   xScale1 = d3
   .scaleLinear()
   .domain([0,d3.max(state.data, row=> row.n)])
   .range([margin.left, width-margin.right])

   const yAxis1 =d3.axisLeft(yScale1)
   const xAxis1 =d3.axisBottom(xScale1)

   const selectElement = d3.select("#dropdown2").on("change", function(){
       console.log("new selected type is", this.value);
       state.selectedType =this.value;
       draw();
   });

   selectElement
   .selectAll("option")
   .data(["Choose a category",...Array.from(new Set(state.data.map(d => d.Sector)))])
   .join("option")
   .attr("value", row=>row)
   .text(d = row);

   selectElement.property("value","Choose a Sector")

   svg1 =d3
   .select("#d3-container2")
   .append("svg")
   .attr("width",width)
   .attr("height",height)

   draw();
}

function draw(){
    let filteredData =[];
    if(state.selectedType != null){
filteredData = state.data.filter(row => d.Sector === state.selectedType);
    }

   rect1 =svg1
   .selectAll("rect")
   .data(word_data)
   .join("rect")
   .attr("x", row=> xScale1(0))
   .attr("y", row => yScale1(row.word))
   .attr("width",d=> xScale(d.n))
   .attr("height",yScale.bandwidth())
   .attr("fill","black")
   


   svg1
   .append("g")
    .attr("class", "axis")
    .attr("transform",`translate(${margin.left})`)
    .call(yAxis)
   

}




