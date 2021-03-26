import * as d3 from "d3";

export function eventSpecTrains(props) {
  const nlist = d3.selectAll("#spec_trains").selectAll("#Group-4");
  console.log("add event health", nlist);
  nlist.on("click", function () {
    // const current = e.currentTarget;
    // const id = current.id;
    console.log("click:", this);
    //current);
    //console.log("id", id);
  });
  //.on("mouseenter", () => nlist.style("cursor", "pointer"))
  //.on("mouseleave", () => nlist.style("cursor", "default"));
}

export function resetSpecTrains() {
  const nlist = d3.selectAll("#spec_trains");

  nlist.on("click", null).on("mouseenter", null).on("mouseleave", null);
}

// function handlerClick(element, { fetchHealthData, openModal }) {
//   const uid = element.getAttribute("id");
//   openModal(true);
//   fetchHealthData(uid);
// }
