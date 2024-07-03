import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

export default function HeatMap() {
  const [data, setData] = useState(null);
  const ref = useRef();
  const w = 900;
  const h = 400;
  const padding = 60;

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
      );

      const json = await response.json();
      if (response.ok) {
        setData(json); // Fix setData to json
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (!data) return; // Ensure data is loaded before running D3 code

    const svg = d3.select(ref.current);

    svg
      .attr("width", w)
      .attr("height", h)
      .attr("class", "bg-white cursor-pointer rounded");

    svg
      .append("text")
      .attr("x", w / 2)
      .attr("y", padding / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "24px")
      .attr("font-weight", "bold")
      .text("Heat Map");

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(data.monthlyVariance.map((d) => d.year))
      .range([padding, w - padding]) // Adjust range to account for padding
      .padding(0.1);

    const yScale = d3
      .scaleBand()
      .domain(months)
      .range([padding, h - padding])
      .padding(0.01);

    const colorScale = d3
      .scaleSequential(d3.interpolateViridis)
      .domain([
        d3.min(data.monthlyVariance, (d) => data.baseTemperature + d.variance),
        d3.max(data.monthlyVariance, (d) => data.baseTemperature + d.variance),
      ]);

    // Axes
    const xAxis = d3
      .axisBottom(xScale)
      .tickValues(xScale.domain().filter((d, i) => !(d % 10))); // Show fewer ticks
    const yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(xAxis);

    svg.append("g").attr("transform", `translate(${padding}, 0)`).call(yAxis);

    // Tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background", "#f9f9f9")
      .style("border", "1px solid #d3d3d3")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("pointer-events", "none");

    svg
      .selectAll()
      .data(data.monthlyVariance, (d) => d.year + ":" + d.month)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.year))
      .attr("y", (d) => yScale(months[d.month - 1])) // Use month names
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .style("fill", (d) => colorScale(data.baseTemperature + d.variance))
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(
            `Year: ${d.year}<br>Month: ${
              months[d.month - 1]
            }<br>Temperature: ${(data.baseTemperature + d.variance).toFixed(
              2
            )}°C`
          )
          .style("left", event.pageX + 5 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });
  }, [data]); // Add data dependency

  return (
    <main className="w-fit mx-auto mt-4 mb-4">
      <svg ref={ref} />
    </main>
  );
}
