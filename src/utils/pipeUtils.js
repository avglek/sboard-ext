import * as d3 from "d3";

export function eventPipeHandler(props) {
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
  openModal(true);
  fetchPipeData(uid);
}
