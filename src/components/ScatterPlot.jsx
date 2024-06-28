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
      console.log(json[0]);
    };

    getData();
  });

  useEffect(() => {
    const dataset = data;
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
      .text("Scatter Plot");

    //svg.selectAll("circle").data(dataset).enter().append("circle");

    // const xScale = d3.scaleLinear().domain().range()
    // const yScale = d3.scaleLnear().domain().range()

    // const xAxis = d3.axisBottom(xScale)
    // const yAxis = d3.axisLeft(yScale)
  });
  return (
    <main>
      <svg ref={ref} />
    </main>
  );
}
