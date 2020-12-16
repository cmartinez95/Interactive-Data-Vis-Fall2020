export function chart1(){

    Promise.all([
        d3.csv("../../data/GFMedium.csv", d3.autoType),
    ]).then(([raw_data])=> {
        console.log(raw_data)
    

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
        .style("fill", "#black");
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
    })}
    
  


