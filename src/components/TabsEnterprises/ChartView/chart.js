import * as d3 from "d3";
import classes from "./ChartView.module.css";
import { showToolTip, hiddenTootTip } from "../../../utils/tabloUtils";

export function startChart(idNode, data, plan) {
  clearNode(idNode);
  const canvas = d3.select("#" + idNode);

  const width = Number.parseInt(canvas.style("width").slice(0, -2));
  const height = Number.parseInt(canvas.style("height").slice(0, -2));

  if (data.length > 0) {
    const svg = canvas.append("svg");

    svg.attr("width", width).attr("height", height);
    createAxes(svg, width, height, data, plan);
  } else console.log("no data");
}

function clearNode(id) {
  d3.select(`#${id}`).select("svg").remove();
}

function createAxes(svg, width, height, data, plan) {
  const margin = 40;
  const padding = 5;

  const xAxisLength = width - 2 * margin;
  const yAxisLength = height - 2 * margin;

  const rawData = data.map((v) => ({
    date: new Date(v.date),
    speed: v.speed,
  }));

  svg.attr("class", classes.axis);

  const scaleX = d3
    .scaleTime()
    .domain([d3.min(rawData, (d) => d.date), d3.max(rawData, (d) => d.date)])
    .range([0, xAxisLength]);

  const scaleY = d3
    .scaleLinear()
    .domain([
      d3.max([d3.max(rawData, (d) => d.speed), plan]) + padding,
      d3.min([d3.min(rawData, (d) => d.speed), plan]) - padding,
    ])
    .range([0, yAxisLength]);

  const xAxis = d3
    .axisBottom(scaleX)
    .ticks(8)
    .tickFormat(d3.timeFormat("%d.%m %H:%M"));

  const yAxis = d3.axisLeft(scaleY).ticks(10);

  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(" + margin + "," + (height - margin) + ")")
    .call(xAxis);

  svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(" + margin + "," + margin + ")")
    .call(yAxis);

  d3.selectAll("g.x-axis g.tick")
    .append("line")
    .classed(classes.gridLine, true)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", -yAxisLength);

  d3.selectAll("g.y-axis g.tick")
    .append("line")
    .classed(classes.gridLine, true)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", xAxisLength)
    .attr("y2", 0);

  const g = svg.append("g");

  g.append("text")
    .attr("x", width / 2)
    .attr("y", margin - 10)
    .attr("text-anchor", "middle")
    .style("font-size", "22px")
    .text("График фактической скорости на участке");

  g.append("text")
    .attr("x", width - margin)
    .attr("y", height - margin - 11)
    .attr("text-anchor", "end")
    .style("font-size", "11px")
    .text("Время запроса");

  g.append("text")
    .attr("x", margin)
    .attr("y", margin - 11)
    .attr("text-anchor", "start")
    .style("font-size", "11px")
    .text("Скорость (км/ч)");

  const dataNorm = rawData.filter((v) => v.speed != null);

  createChart(svg, dataNorm, scaleX, scaleY, margin, plan, xAxisLength);
}

function createChart(svg, data, scaleX, scaleY, margin, plan, xAxisLength) {
  const colorStroke = "red";
  const planStroke = "blue";

  svg
    .append("g")
    .append("line")
    .style("stroke", planStroke)
    .style("stroke-width", 2)
    .attr("x1", margin)
    .attr("y1", scaleY(plan) + margin)
    .attr("x2", xAxisLength + margin)
    .attr("y2", scaleY(plan) + margin)
    .on("mouseenter", () => showToolTip(`V.план = ${plan} км/ч`))
    .on("mouseleave", () => hiddenTootTip());

  const line = d3
    .line()
    .x((d) => scaleX(d.date) + margin)
    .y((d) => scaleY(d.speed) + margin);

  const g = svg.append("g");
  g.append("path")
    .attr("d", line(data))
    .style("stroke", colorStroke)
    .style("stroke-width", 2);

  svg
    .selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .style("stroke", colorStroke)
    .style("fill", "white")
    .attr("class", "dot")
    .attr("r", 3.5)
    .attr("cx", (d) => scaleX(d.date) + margin)
    .attr("cy", (d) => scaleY(d.speed) + margin)
    .on("mouseenter", (d) => showToolTip(`V.факт = ${d.speed} км/ч`))
    .on("mouseleave", () => hiddenTootTip());
}
