import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

export default function ScatterPlot() {
  const ref = useRef();
  const w = 400;
  const h = 400;
  const padding = 60;

  useEffect(() => {
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
  });
  return (
    <main>
      <svg ref={ref} />
    </main>
  );
}
