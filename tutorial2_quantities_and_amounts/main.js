
d3.csv("../data/textsent.csv",d3.autoType).then(data =>{
  console.log(data);


const width = window.innerWidth * 0.9,
height = window.innerHeight / 3,
paddingInner = 0.2,
margin = { top: 20, bottom: 40, left: 70, right: 40 };

const yScale = d3
.scaleBand()
.domain(data.map(d=>d.Day))
.range([height-margin.bottom,margin.top])
.paddingInner(paddingInner)

const xScale =d3
.scaleLinear()
.domain([0,d3.max(data,d=>d.TextSent)])
.range([margin.left, width-margin.right])
console.log(xScale.range())
console.log(xScale(0))

const svg =d3
.select("#d3-container")
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
.attr("y", d=>yScale(d.Day))
// .attr("width",100)
.attr("width",d=> xScale(d.TextSent))
.attr("height",yScale.bandwidth())
// .attr("width",yScale.bandwidth())
// .attr("height", d=>height-margin.bottom-yScale(d.Day))
.attr("fill","purple")

const yAxis= d3.axisLeft(yScale)

svg
.append("g")
.attr("class", "axis")
// .attr("transform",'rotate(90deg)')
// .attr("transform", `translate(0, ${height - margin.bottom})`)
.attr("transform",`translate(${margin.left})`)
.call(yAxis)

})




// d3.csv("../data/textsent.csv", d3.autoType).then(data => {
    
//     const width = window.innerWidth * 0.9,
//     height = window.innerHeight / 3,
//     paddingInner = 0.2,
//     margin = { top: 20, bottom: 40, left: 40, right: 40 };

// const yScale =d3.scaleBand()
// .domain(data.map(d=> d.Day))
// .range([0,height])

// const xScale =d3.scaleLinear()
// .domain([0,d3.max(data.map(d=>d.TextSent))])
// .range([0,width])

//     const svg = d3
//       .select("#d3-container")
//       .append("svg")
//       .attr("width", width)
//       .attr("height", height)
//       .attr('transform','rotate(90deg)');

    
//     const rect = svg
//       .selectAll("rect")
//       .data(data)
//       .join("rect")
//       .attr("y", d => yScale(d.TextSent))
//       .attr("x", d => xScale(d.Day))
//       .attr("width", xScale.bandwidth())
//       .attr("height", d => height - margin.bottom - yScale(d.TextSent))
//       .attr("fill", "red")
// });
