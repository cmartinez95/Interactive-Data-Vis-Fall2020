const width = window.innerWidth * 0.9,
height = window.innerHeight / 3,
paddingInner = 0.2,
margin = { top: 20, bottom: 40, left: 70, right: 40 };

let svg;
let xScale;
let yScale;


let state ={
data:[],
selectedSector: null,
};


d3.csv("../data/Sector Words.csv",d3.autoType).then(raw_data =>{
state.data =raw_data
console.log(raw_data);
init();
})

function init(){
yScale = d3
.scaleBand()
.domain(data.map(d=>d.word))
.range([height-margin.bottom,margin.top])
.paddingInner(paddingInner);

xScale =d3
.scaleLinear()
.domain([0,d3.max(data,d=>d.n)])
.range([margin.left, width-margin.right])
console.log(xScale.range());

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

const selectElement =d3. select("#dropdown1")
.on("change",function(){
state.selectedSector = this.value;
console.log("new value is", this.value);
draw();

});

selectedElement
.selectAll("option")
.data(["Choose a category",...Array.from(new Set(state.data.map(d => d.sector)))])
.join("option")
.attr("value", d=> d)
.text(d => d);

selectElement.property("value", "Choose a category");

svg = d3
.select("#d3-container2")
.append("svg")
.attr("width",width)
.attr("height", height)

draw();
}

function draw(){
let filteredData =[];
if (state.selectedSector != null) {
    filteredData =state.data.filter(d => d.sector === state.selectedSector);
}

const rect = svg
.selectAll("rect")
.data(filteredData)
.join(
enter =>
enter.append("rect")
.attr("class","bar")
.attr("x", d=> xScale(0))
.attr("y", d=> yScale (d.word))
.attr("width", d=> xScale(d.n))
.attr("height", yScale.bandwidth())
.attr("fill","black"),
update => update,
exit => exit.remove())
}