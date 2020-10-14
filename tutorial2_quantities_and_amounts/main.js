// d3.csv("../data/textsent.csv",d3.autoType).then(data => {
//     const svgWidth =100
//     const svgHeight =100

//     console.log(data)
//     console.log(data.map(d=>d.Day))

//     const xScale =d3.scaleBand()
//     // .domain(["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"])
//     .domain(data.map(d=>d.Day))
//     // I just want to say that this mapping functionw which calls an array is dope
//     .range([0,svgWidth])
//     .paddingInner(.3)
//     console.log(xScale("Saturday"),xScale.bandwidth()) 
//     // remember padding is a decimal

//     const yScale = d3.scaleLinear()
//     .domain([0,d3.max(data.map( d=> d.TextSent))])
//     .range([svgHeight,0])
//   console.log(yScale(6900))

//   const svg=d3.select('#my-svg')

//   const bars = svg.selectAll('rect.bar')
//   .data(data)
//   .join('rect')
//   .attr('class','bar')
//   .attr('height',d=> svgHeight- yScale(d.TextSent))
//   .attr('width',xScale.bandwidth())
//   .attr("x",d=> xScale(d.Day))
//   .attr("y", d=> yScale(d.TextSent))
//   .style('fill',"red")

//   svg
//   .append("g")
//   .attr("class", "axis")
//   .attr("transform", 'translate(0,${height-xScale})')
//   .call(xAxis);

// })








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
