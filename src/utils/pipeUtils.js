import * as d3 from "d3";

export function eventPipeHandler(props) {
  console.log("add pipe event");
  const nlist = d3.selectAll("#tubes").selectAll("g[id^='isso_']");

  nlist
    .on("click", function () {
      handlerClick(this, props);
    })
    .on("mouseenter", () => nlist.style("cursor", "pointer"))
    .on("mouseleave", () => nlist.style("cursor", "default"));
}

export function resetPipeHandler() {
  const nlist = d3.selectAll("#tubes").selectAll("g[id^='isso_']");

  nlist.on("click", null).on("mouseenter", null).on("mouseleave", null);
}

function handlerClick(element, { fetchPipeData, openModal }) {
  const uid = element.getAttribute("id");
  console.log("click:", uid);
  openModal(true);
  fetchPipeData(uid);
}
