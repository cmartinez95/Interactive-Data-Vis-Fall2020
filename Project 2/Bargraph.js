export function chart2(){

const width = window.innerWidth * 0.9,
height = window.innerHeight / 3,
paddingInner = 0.2,
margin = { top: 20, bottom: 40, left: 91, right: 90 };

let svg;
let xScale;
let yScale;
let xAxis;
let yAxis;


let state ={
data:[],
selectedSector: null,
};


d3.csv("../data/Sector Words.csv",d3.autoType).then(raw_data =>{
    state.data =raw_data;
    console.log(raw_data);
init();
})

function init(){

yScale = d3
.scaleBand()
.domain(state.data.map(d=>d.word))
.range([height-margin.bottom,margin.top])
.paddingInner(paddingInner);

xScale =d3
.scaleLinear()
.domain([0,d3.max(state.data,d=>d.n)])
.range([margin.left, width-margin.right + 150])
console.log(xScale.range());

xAxis = d3.axisBottom(xScale);
yAxis = d3.axisLeft(yScale);

const selectElement =d3.select("#dropdown3")
.on("change",function(){
state.selectedSector = this.value;
console.log("new value is", this.value);
draw();

});

selectElement
.selectAll("option")
.data(["Choose a category",...Array.from(new Set(state.data.map(d => d.sector)))])
.join("option")
.attr("value", d=> d)
.text(d => d);

selectElement.property("value", "Choose a category");

svg = d3
.select("#d3-container3")
.append("svg")
.attr("width",width)
.attr("height", height)

svg
.append('g')
.attr('class','y-axis1')
.style('transform','translate(90px,0)')
.call(yAxis)
.append("text")
.attr("class", "axis-label-y1")
.style("fill","black")
.text("sector");

svg.append('g')
  .attr('class', 'x-axis1')
  .attr('transform', `translate(0, ${height - margin.top - 20})`)
  .call(xAxis)
  .append("text")
  .attr("class", "axis-label-x1")
  .attr("x", "55%")
  .attr("dy", "4em")
  .style("fill","black")
  .text("n");

draw();
}

function draw(){
 
let filteredData =[];
if (state.selectedSector != null) {
    filteredData =state.data.filter(d => d.sector === state.selectedSector);
}
console.log(filteredData)

yScale.domain(filteredData.map(d=>d.word))
// yScale.domain([filteredData, d=> d.word])
xScale.domain([0,d3.max(filteredData,d=>d.n)])

d3.select("g.y-axis1")
    .transition()
    .duration(1000)
    .call(yAxis.scale(yScale));

    d3.select("g.x-axis1")
    .transition()
    .duration(1000)
    .call(xAxis.scale(xScale));


const rect = svg
.selectAll("rect")
.data(filteredData, d => d.word)
.join(
enter =>
enter.append("rect")
.attr("class","bar")
.attr("y", d=> yScale (d.word))
.attr("width", d=> xScale(d.n)),
// .transition()
// .duration(1000)
// .attr("y", d=> yScale (d.word))
// .attr("width", d=> xScale(d.n)),

update => update
.transition()
.duration(1000)
.attr("y", d=> yScale (d.word))
.attr("width", d=> xScale(d.n)),

exit => exit
.transition()
.duration(1000)
.attr("width", 0)
.remove())
.attr("x", d=> xScale(0))
.attr("height", yScale.bandwidth())
.attr("fill","black")


}
}

