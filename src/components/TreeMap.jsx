import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

export default function TreeMap() {
  const ref = useRef();
  const w = 900;
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
      .text("Tree Map");
  });

  return (
    <main className="w-fit mx-auto mt-4 mb-4">
      <svg ref={ref} />
    </main>
  );
}
