function generateBarGraph(data){
      let width = 500;
      let height = 500;
      let margin = { top: 20, right: 0, bottom: 30, left: 40 };

      let x = d3.scaleBand()
        .domain(data.map(d => d.letter))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);
  
      let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.frequency)])
        .range([height - margin.bottom, margin.top]);
  
  
      let yTitle = g => g.append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("y", 10)
        .text("↑ Frequency");
  
      let yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, "%"))
        .call(g => g.select(".domain").remove());
  
      let xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));
  
     
      const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height]);
  
      svg.append("g")
        .attr("fill", "steelblue")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.letter))
        .attr("y", d => y(d.frequency))
        .attr("height", d => y(0) - y(d.frequency))
        .attr("width", x.bandwidth());
  
      svg.append("g")
        .call(xAxis);
  
      svg.append("g")
        .call(yAxis);
  
      svg.call(yTitle);
  
  
      return svg.node();
  
      //////https://scrimba.com/learn/d3js

}


function generateLineGraph(data){
  let width = 500;
  let height = 500;
  let margin = { top: 20, right: 0, bottom: 30, left: 40 };
  
  const X = d3.map(data, d => d.letter); // es pot fer un map normal
  //const X = data.map(d => d.letter);

  console.log(X);

  return null; //svg.node();

  //////https://scrimba.com/learn/d3js
 // https://observablehq.com/@d3/line-chart
}