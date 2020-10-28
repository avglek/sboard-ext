import * as d3 from "d3";

export function showToolTip(text = "") {
  if (text === "") {
    return;
  }
  d3.select(".stooltip").html(text);
  const x = parseInt(d3.event.pageX);
  const y = parseInt(d3.event.pageY);
  const h = d3.select(".stooltip").style("height");
  const dy = Number.parseInt(h.substr(0, h.length - 2)) + 15;

  if (y - (dy + 5) < 0) {
    d3.select(".stooltip").style("top", y + 15 + "px");
    d3.select(".stooltip").style("left", x + "px");
    d3.select(".stooltip").style("visibility", "visible");
  } else {
    d3.select(".stooltip").style("top", y - dy + "px");
    d3.select(".stooltip").style("left", x + "px");
    d3.select(".stooltip").style("visibility", "visible");
  }
}

export function hiddenTootTip() {
  d3.select(".stooltip").style("visibility", "hidden");
  d3.select(".stooltip").html("");
  d3.select(".stooltip").style("heigth", "");
}

export function getCodeStn(element) {
  let el1 = d3.select(element.parentElement);

  let stn = el1.attr("id");
  return stn.substr(3, stn.length);
}

export function getCodePiket(element) {
  let el1 = d3.select(element);
  let piket = el1.attr("id");
  return piket;
}

export function getStormIconArray(items, id) {
  // console.log("Data:", items);
  //console.log("id:", id);
}
