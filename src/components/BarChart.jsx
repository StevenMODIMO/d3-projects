import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

export default function BarChart() {
  const [data, setData] = useState([]);
  const ref = useRef();
  const w = 400;
  const h = 400;
  const padding = 60;

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
      );
      const json = await response.json();
      setData(json.data);
    };

    getData();
  }, []);

  useEffect(() => {
    const dataset = data;

    const svg = d3.select(ref.current);

    svg
      .attr("class", "bg-white cursor-pointer rounded")
      .attr("width", w)
      .attr("height", h);

    svg
      .append("text")
      .attr("x", w / 2)
      .attr("y", padding / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "24px")
      .attr("font-weight", "bold")
      .text("United States GDP 1947-2015");

    // Scales
    const xScale = d3
      .scaleTime()
      .domain([
        new Date(d3.min(dataset, (d) => d[0])),
        new Date(d3.max(dataset, (d) => d[0])),
      ])
      .range([padding, w - padding]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, (d) => d[1])])
      .range([h - padding, padding]);

    const yAxis = d3.axisLeft(yScale);
    const xAxis = d3.axisBottom(xScale);

    svg
      .append("g")
      .attr("transform", "translate(" + padding + ",0)")
      .call(yAxis);

    svg
      .append("g")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(xAxis);

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "absolute bg-blue-500 px-1 rounded text-white")

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(new Date(d[0])))
      .attr("y", (d) => yScale(d[1]))
      .attr("width", (w - 2 * padding) / data.length)
      .attr("height", (d) => h - padding - yScale(d[1]))
      .attr("class", "bar")
      .style("fill", "navy")
      .on("mouseover", function (event, d) {
        tooltip.style("display", "block");
        tooltip.html(
          `Date: ${d[0]}<br>GDP: $${d[1].toFixed(2)} Billion`
        );
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        tooltip.style("display", "none");
      });

    svg
      .append("text")
      .attr("x", w / 2)
      .attr("y", h - padding / 4)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Year");

    svg
      .append("text")
      .attr("x", -h / 2)
      .attr("y", padding / 4)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text("GDP in Billions");
  });

  return (
    <main>
      <svg ref={ref} />
    </main>
  );
}
