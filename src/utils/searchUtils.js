import * as d3 from "d3";

export function showFindStantion({ layerFindStantion }) {
  //console.log("code:", layerFindStantion);
  const href = "./svg/sprite/point-sprite.svg#point-fill";

  if (layerFindStantion !== "") {
    const allStn = d3.selectAll("#stations");
    allStn.selectAll("use").remove();

    if (layerFindStantion !== "0") {
      const stnNode = allStn.selectAll(`#st_${layerFindStantion}`);
      const anchorNode = stnNode.select("#st");
      const iconNode = anchorNode.append("use");

      iconNode
        .attr("class", "pointer")
        .attr("href", href)
        .attr("width", "40px")
        .attr("height", "50px")
        .attr("x", "-10px")
        .attr("y", "-50px");
    }
  }
}
