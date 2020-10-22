/**
 * CONSTANTS AND GLOBALS
 * */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 },
  radius = 5;

/** these variables allow us to access anything we manipulate in
 * init() but need access to in draw().
 * All these variables are empty before we assign something to them.*/
let svg;
let xScale;
let yScale;

/**
 * APPLICATION STATE
 * */
let state = {
  data: [],
  selectedGenre: "All",
};

/**
 * LOAD DATA
 * */
d3.csv("../../data/albumsales.csv", d3.autoType).then(raw_data => {
  console.log("raw_data", raw_data);
  state.data = raw_data;
  init();
});

/**
 * INITIALIZING FUNCTION
 * this will be run *one time* when the data finishes loading in
 * */
function init() {
  // SCALES
  xScale = d3
    .scaleLinear()
    // .domain([0,10])
    .domain([0,d3.max(state.data, d => d.Sales)])
    .range([margin.left, width - margin.right]);

  yScale = d3
    .scaleLinear()
    .domain([0,d3.max(state.data, d => d.Rating)])
    .range([height - margin.bottom, margin.top]);

  // AXES
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  // UI ELEMENT SETUP
  // add dropdown (HTML selection) for interaction
  // HTML select reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
  const selectElement = d3.select("#dropdown").on("change", function() {
    console.log("new selected genre is", this.value);
    // `this` === the selectElement
    // this.value holds the dropdown value a user just selected
    state.selectedGenre = this.value;
    draw(); // re-draw the graph based on this new selection
  });

  // add in dropdown options from the unique values in the data
  selectElement
    .selectAll("option")
    .data(["All", "Rap", "Pop"]) // unique data values-- (hint: to do this programmatically take a look `Sets`)
    .join("option")
    .attr("value", d => d)
    .text(d => d);

  // create an svg element in our main `d3-container` element
  svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // add the xAxis
  svg
    .append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("x", "50%")
    .attr("dy", "3em")
    .text("Number of Records Sold");

  // add the yAxis
  svg
    .append("g")
    .attr("class", "axis y-axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("y", "50%")
    .attr("dx", "-3em")
    .attr("writing-mode", "vertical-rl")
    .text("Christian's Professional Rating of the Album");

  draw(); // calls the draw function
}

/**
 * DRAW FUNCTION
 * we call this everytime there is an update to the data/state
 * */
function draw() {
  // filter the data for the selectedParty
  let filteredData = state.data;
  // if there is a selectedParty, filter the data before mapping it to our elements
  if (state.selectedGenre !== "All") {
    filteredData = state.data.filter(d => d.Genre === state.selectedGenre);
  }
console.log(filteredData)
  const dot = svg
    .selectAll(".dotgroup")
    .data(filteredData, d => d.Albums) // use `d.name` as the `key` to match between HTML and data elements
    .join(
      enter =>
        // enter selections -- all data elements that don't have a `.dot` element attached to them yet
        enter
          .append("g")
          .attr("class", "dotgroup") // Note: this is important so we can identify it in future updates
          .call(enter=>
            enter
            .append("circle")
            .on("mouseover",function(){
              d3.select(this.parentNode).classed("hover",true)     //"this" is talking about the circle 
            })
            .on("mouseout",function(){
              d3.select(this.parentNode).classed("hover",false)
            })
            .attr("stroke", "lightgrey")
            .attr("opacity", 0.5)
            .attr("fill", d => {
              if (d.Genre === "Rap") return "purple";
              else if (d.Genre === "Pop") return "orange";
              // else return "red";
            })
            .attr("r", 0)
            .attr("cy", d => yScale(d.Rating))
          .attr("cx", d => xScale(d.Sales))
            .call(enter =>
              enter
                .transition() // initialize transition
                // .delay(d => 500 * d.Sales) // delay on each element
                .duration(500) // duration 500ms
                .attr("r",10)
          ))
          .call(enter=>
            enter
            .append("rect")
            .attr("stroke", "lightgrey")
            .attr("opacity", 0)
            .attr("height",10)
            .attr("width",10)
            .attr("y", d => yScale(d.Rating))
            .attr("x", d => xScale(d.Sales))
            ),
      update =>
        update.call(update =>
          // update selections -- all data elements that match with a `.dot` element
          update
            .transition()
            .duration(250)
            .attr("stroke", "black")
            .transition()
            .duration(250)
            .attr("stroke", "lightgrey")
        ),
      exit =>
        exit.call(exit =>
          // exit selections -- all the `.dot` element that no longer match to HTML elements
          exit
            .transition()
            .attr("r",0)
            .delay(d => d.Sales/100000)
            .duration(500)
            .attr("r", 0)
            .remove()
        )
    );
}


// /**
//  * CONSTANTS AND GLOBALS
//  * */
// const width = window.innerWidth * 0.7,
//   height = window.innerHeight * 0.7,
//   margin = { top: 20, bottom: 50, left: 60, right: 40 },
//   radius = 5;

// /** these variables allow us to access anything we manipulate in
//  * init() but need access to in draw().
//  * All these variables are empty before we assign something to them.*/
// let svg;
// let xScale;
// let yScale;

// /**
//  * APPLICATION STATE
//  * */
// let state = {
//   data: [],
//   selectedParty: "All",
// };

// /**
//  * LOAD DATA
//  * */
// d3.json("../../data/environmentRatings.json", d3.autoType).then(raw_data => {
//   console.log("raw_data", raw_data);
//   state.data = raw_data;
//   init();
// });

// /**
//  * INITIALIZING FUNCTION
//  * this will be run *one time* when the data finishes loading in
//  * */
// function init() {
//   // SCALES
//   xScale = d3
//     .scaleLinear()
//     .domain(d3.extent(state.data, d => d.ideology_rating))
//     .range([margin.left, width - margin.right]);

//   yScale = d3
//     .scaleLinear()
//     .domain(d3.extent(state.data, d => d.environmental_rating))
//     .range([height - margin.bottom, margin.top]);

//   // AXES
//   const xAxis = d3.axisBottom(xScale);
//   const yAxis = d3.axisLeft(yScale);

//   // UI ELEMENT SETUP
//   // add dropdown (HTML selection) for interaction
//   // HTML select reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
//   const selectElement = d3.select("#dropdown").on("change", function() {
//     console.log("new selected party is", this.value);
//     // `this` === the selectElement
//     // this.value holds the dropdown value a user just selected
//     state.selectedParty = this.value;
//     draw(); // re-draw the graph based on this new selection
//   });

//   // add in dropdown options from the unique values in the data
//   selectElement
//     .selectAll("option")
//     .data(["All", "D", "R", "I"]) // unique data values-- (hint: to do this programmatically take a look `Sets`)
//     .join("option")
//     .attr("value", d => d)
//     .text(d => d);

//   // create an svg element in our main `d3-container` element
//   svg = d3
//     .select("#d3-container")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height);

//   // add the xAxis
//   svg
//     .append("g")
//     .attr("class", "axis x-axis")
//     .attr("transform", `translate(0,${height - margin.bottom})`)
//     .call(xAxis)
//     .append("text")
//     .attr("class", "axis-label")
//     .attr("x", "50%")
//     .attr("dy", "3em")
//     .text("Ideology Rating");

//   // add the yAxis
//   svg
//     .append("g")
//     .attr("class", "axis y-axis")
//     .attr("transform", `translate(${margin.left},0)`)
//     .call(yAxis)
//     .append("text")
//     .attr("class", "axis-label")
//     .attr("y", "50%")
//     .attr("dx", "-3em")
//     .attr("writing-mode", "vertical-rl")
//     .text("Environmental Rating");

//   draw(); // calls the draw function
// }

// /**
//  * DRAW FUNCTION
//  * we call this everytime there is an update to the data/state
//  * */
// function draw() {
//   // filter the data for the selectedParty
//   let filteredData = state.data;
//   // if there is a selectedParty, filter the data before mapping it to our elements
//   if (state.selectedParty !== "All") {
//     filteredData = state.data.filter(d => d.party === state.selectedParty);
//   }

//   const dot = svg
//     .selectAll(".dot")
//     .data(filteredData, d => d.name) // use `d.name` as the `key` to match between HTML and data elements
//     .join(
//       enter =>
//         // enter selections -- all data elements that don't have a `.dot` element attached to them yet
//         enter
//           .append("circle")
//           .attr("class", "dot") // Note: this is important so we can identify it in future updates
//           .attr("stroke", "lightgrey")
//           .attr("opacity", 0.5)
//           .attr("fill", d => {
//             if (d.party === "D") return "blue";
//             else if (d.party === "R") return "red";
//             else return "purple";
//           })
//           .attr("r", radius)
//           .attr("cy", d => yScale(d.environmental_rating))
//           .attr("cx", d => margin.left) // initial value - to be transitioned
//           .call(enter =>
//             enter
//               .transition() // initialize transition
//               .delay(d => 500 * d.ideology_rating) // delay on each element
//               .duration(500) // duration 500ms
//               .attr("cx", d => xScale(d.ideology_rating))
//           ),
//       update =>
//         update.call(update =>
//           // update selections -- all data elements that match with a `.dot` element
//           update
//             .transition()
//             .duration(250)
//             .attr("stroke", "black")
//             .transition()
//             .duration(250)
//             .attr("stroke", "lightgrey")
//         ),
//       exit =>
//         exit.call(exit =>
//           // exit selections -- all the `.dot` element that no longer match to HTML elements
//           exit
//             .transition()
//             .delay(d => 50 * d.ideology_rating)
//             .duration(500)
//             .attr("cx", width)
//             .remove()
//         )
//     );
// }