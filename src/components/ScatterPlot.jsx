import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

export default function ScatterPlot() {
  const [data, setData] = useState();
  const ref = useRef();
  const w = 400;
  const h = 400;
  const padding = 60;

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
      );

      const json = await response.json();

      setData(json);
    };

    getData();
  }, []);

  useEffect(() => {
    if (!data) return;

    const svg = d3.select(ref.current);

    svg
      .attr("width", w)
      .attr("height", h)
      .attr("class", "bg-white cursor-pointer rounded");

    // Parse the time and create scales
    const parseTime = d3.timeParse("%M:%S");
    const times = data.map((d) => parseTime(d.Time));
    const years = data.map((d) => d.Year);

    const xScale = d3
      .scaleLinear()
      .domain([d3.min(years) - 1, d3.max(years) + 1])
      .range([padding, w - padding]);

    const yScale = d3
      .scaleTime()
      .domain(d3.extent(times))
      .range([padding, h - padding]);

    // Create axes
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));

    const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

    // Append axes
    svg
      .append("g")
      .attr("transform", `translate(0, ${h - padding})`)
      .call(xAxis);

    svg.append("g").attr("transform", `translate(${padding}, 0)`).call(yAxis);

    // Append axis labels
    svg
      .append("text")
      .attr("x", w / 2)
      .attr("y", h - padding / 3)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .text("Year");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -h / 2)
      .attr("y", padding / 3)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .text("Time (Minutes)");

    // Plot data points
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.Year))
      .attr("cy", (d) => yScale(parseTime(d.Time)))
      .attr("r", 5)
      .attr("fill", "steelblue")
      .attr("stroke", "black")
      .attr("stroke-width", 1);

    // Add plot title
    svg
      .append("text")
      .attr("x", w / 2)
      .attr("y", padding / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "24px")
      .attr("font-weight", "bold")
      .text("Scatter Plot");
  }, [data]);
  return (
    <main>
      <svg ref={ref} />
    </main>
  );
}
