import * as d3 from "d3";
import { dateToStr, parsePeriodToDate } from "./common";
import { showToolTip, hiddenTootTip } from "./tabloUtils";

export function showStorm(handleClick, data = []) {
  clearAllIcons();
  addStormIcons(handleClick, data);
}

export function clearAllIcons() {
  const distList = d3.selectAll("#trains_distantions > *");
  distList.attr("opacity", 0);
  const nodes = distList
    .selectAll("#icon > *")
    .nodes()
    .filter((element) => element.id !== "Oval");

  nodes.forEach((item) =>
    distList.selectAll("#icon").selectAll(`#${item.id}`).remove()
  );
}

export function addStormIcons(handleClick, trans = [], iconID = 1) {
  d3.xml(`./svg/icons/storm/storm_${iconID}.svg`).then((xml) => {
    trans.forEach((items) => {
      const el = xml.documentElement.getElementsByTagName("g")[0];
      const element = el.cloneNode(true);

      const attr = element.getAttribute("id");

      const node = d3.select(`#dist_${items.id}`);

      const old = node.select(`#${attr}`);

      node.attr("opacity", "1");

      const elIcon = node.select("#icon").node();

      if (elIcon) {
        if (old.node()) {
          const aname = old.attr("id");
          if (aname !== attr) {
            elIcon.appendChild(element);
          }
        } else {
          elIcon.appendChild(element);
        }

        node
          .selectAll(`#${attr}`)
          .on("mouseenter", () => showToolTip(getHitsText(items.hits)))
          .on("mouseleave", () => hiddenTootTip())
          .on("click", () => {
            hiddenTootTip();
            handleClick(items.id);
          });
      }
    });
  });
}

const getHitsText = (data) => {
  let result = "";
  data.forEach((value) => {
    const dt = parsePeriodToDate(value.period);
    result =
      result +
      dateToStr(dt[0]) +
      "<br/>" +
      dateToStr(dt[1]) +
      "<br/>" +
      "<b>" +
      value.data.split(";").join("<br/>") +
      "</b>" +
      "<hr/>";
  });

  return result.substr(0, result.length - 5);
};
