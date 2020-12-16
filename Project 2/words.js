export function chart3(){

    const width = window.innerWidth * 0.9,
    height = window.innerHeight / 3,
    paddingInner = 0.2,
    margin = { top: 20, bottom: 40, left: 90, right: 40 };
    
    let svg;
    let xScale;
    let yScale;
    let xAxis;
    let yAxis;
    
    
    let state ={
    data:[],
    selectedType: null,
    };
    
    
    d3.csv("../data/All Words.csv",d3.autoType).then(raw_data =>{
        state.data =raw_data;
        console.log(raw_data);
    init();
    })
    
    function init(){
    
    yScale = d3
    .scaleBand()
    .domain(state.data.map(d=>d.words))
    .range([height-margin.bottom,margin.top])
    .paddingInner(paddingInner);
    
    xScale =d3
    .scaleLinear()
    .domain([0,d3.max(state.data,d=>d.count)])
    .range([margin.left, width-margin.right +250])
    console.log(xScale.range());
    
    xAxis = d3.axisBottom(xScale);
    yAxis = d3.axisLeft(yScale);
    
    const selectElement =d3.select("#dropdown2")
    .on("change",function(){
    state.selectedType = this.value;
    console.log("new value is", this.value);
    draw();
    
    });
    
    selectElement
    .selectAll("option")
    .data(["Choose a category",...Array.from(new Set(state.data.map(d => d.type)))])
    .join("option")
    .attr("value", d=> d)
    .text(d => d);
    
    selectElement.property("value", "Choose a category");
    
    svg = d3
    .select("#d3-container2")
    .append("svg")
    .attr("width",width)
    .attr("height", height)
    
    svg
    .append('g')
    .attr('class','y-axis')
    .style('transform','translate(90px,0)')
    .call(yAxis)
    
    
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height - margin.top - 20})`)
      .call(xAxis)
      .append("text")
      .attr("class", "axis-label-x")
      .attr("x", "55%")
      .attr("dy", "4em")
      .style("fill","black")
      .text("Word Count");
    
    draw();
    }
    
    function draw(){
     
    let filteredData =[];
    if (state.selectedType != null) {
        filteredData =state.data.filter(d => d.type === state.selectedType);
    }
    console.log(filteredData)
    
    yScale.domain(filteredData.map(d=>d.words))
    // yScale.domain([filteredData, d=> d.word])
    xScale.domain([0,d3.max(filteredData,d=>d.count)])
    
    d3.select("g.y-axis")
        .transition()
        .duration(1000)
        .call(yAxis.scale(yScale));
    
        d3.select("g.x-axis")
        .transition()
        .duration(1000)
        .call(xAxis.scale(xScale));
    
    
    const rect = svg
    .selectAll("rect")
    .data(filteredData, d => d.words)
    .join(
    enter =>
    enter.append("rect")
    .attr("class","bar")
    .attr("y", d=> yScale (d.words))
    .attr("width", d=> xScale(d.count)),
    // .transition()
    // .duration(1000)
    // .attr("y", d=> yScale (d.word))
    // .attr("width", d=> xScale(d.n)),
    
    update => update
    .transition()
    .duration(1000)
    .attr("y", d=> yScale (d.words))
    .attr("width", d=> xScale(d.count)),
    
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
    
    