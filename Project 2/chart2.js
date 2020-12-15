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

// let svg1;
// let xScale1;
// let yScale1;
// let rect1

// let state ={
//     data: []
//     selectedType:"All"
// };

// d3.csv("../data/All Words.csv",d3.autoType).then(word_data =>{
//     console.log(word_data);
//     init();
// });

// function init(){

//    yScale1 =d3
//    .scaleBand()
//    .domain(data.map(row => row.word))
//    .range([height-margin.bottom,margin.top])
//    .paddingInner(paddingInner)

//    xScale1 = d3
//    .scaleLinear()
//    .domain([0,d3.max(data, row=> row.n)])
//    .range([margin.left, width-margin.right])

//    const yAxis =d3.axisLeft(yScale1)

//    const selectElement = d3.select("#dropdown2").on("change", function(){
//        console.log("new selected type is", this.value);
//        state.selectedType =this.value;
//        draw();
//    });

//    selectElement
//    .selectAll("option")
//    .data(["All","Stop Word", "Regular Word"])
//    .join("option")
//    .attr("value", row=>row)
//    .text(d = row);

//    svg1 =d3
//    .select("#d3-container2")
//    .append("svg")
//    .attr("width",width)
//    .attr("height",height)

//    rect1 =svg1
//    .selectAll("rect")
//    .data(word_data)
//    .join("rect")
//    .attr("x", row=> xScale1(0))
//    .attr("y", row => yScale1(row.word))
//    .attr("width",d=> xScale(d.n))
//    .attr("height",yScale.bandwidth())
//    .attr("fill","black")
   


//    svg1
//    .append("g")
//     .attr("class", "axis")
//     .attr("transform",`translate(${margin.left})`)
//     .call(yAxis)
   

// }




