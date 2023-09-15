import * as d3 from "d3";  //wp

export { generateBarGraph, generateLineGraph };



function generateBarGraph(data) {
  let width = 500;
  let height = 500;
  let margin = { top: 20, right: 0, bottom: 30, left: 40 };

  let x = d3
    .scaleBand()
    .domain(data.map((d) => d.letter))
    .rangeRound([margin.left, width - margin.right])
    .padding(0.1);

  let y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.frequency)])
    .range([height - margin.bottom, margin.top]);

  let yTitle = (g) =>
    g
      .append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("y", 10)
      .text("↑ Frequency");

  let yAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, "%"))
      .call((g) => g.select(".domain").remove());

  let xAxis = (g) =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

  svg
    .append("g")
    .attr("fill", "steelblue")
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", (d) => x(d.letter))
    .attr("y", (d) => y(d.frequency))
    .attr("height", (d) => y(0) - y(d.frequency))
    .attr("width", x.bandwidth());

  svg.append("g").call(xAxis);

  svg.append("g").call(yAxis);

  svg.call(yTitle);

  return svg.node();

  //////https://scrimba.com/learn/d3js
}

function generateLineGraph(data) {
  let width = 500;
  let height = 500;
  let margin = { top: 20, right: 0, bottom: 30, left: 40 };

  const X = d3.map(data, (d) => d.letter); // es pot fer un map normal
  const Y = d3.map(data, (d) => d.frequency);
  const I = d3.range(X.length);
  const defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
  const D = d3.map(data, defined);

  // Compute default domains.
  let xDomain = d3.extent(X);
  let yDomain = [0, d3.max(Y)];
  let xRange = [margin.left, width - margin.right];
  let yRange = [height - margin.bottom, margin.top];

  // Construct scales and axes.
  const xScale = d3.scaleBand(xDomain, xRange);
  const yScale = d3.scaleLinear(yDomain, yRange);

  const curve = d3.curveLinear;

  let strokeLinecap = "round"; // stroke line cap of the line
  let strokeLinejoin = "round"; // stroke line join of the line
  let strokeWidth = 4; // stroke width of line, in pixels
  let strokeOpacity = 1; // stroke opacity of line

  const xAxis = d3
    .axisBottom(xScale)
    .ticks(width / 80)
    .tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 40,'+f');

  // Construct a line generator.
  const line = d3
    .line()
    .defined((i) => D[i])
    .curve(curve)
    .x((i) => xScale(X[i]))
    .y((i) => yScale(Y[i]));

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis);

  svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis)
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .clone()
        .attr("x2", width - margin.left - margin.right)
        .attr("stroke-opacity", 0.1)
    )
    .call((g) =>
      g
        .append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("yLabel")
    );

  svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", strokeWidth)
    .attr("stroke-linecap", strokeLinecap)
    .attr("stroke-linejoin", strokeLinejoin)
    .attr("stroke-opacity", strokeOpacity)
    .attr("d", line(I));

  return svg.node();

  // return null; //svg.node();

  //////https://scrimba.com/learn/d3js
  // https://observablehq.com/@d3/line-chart
}
