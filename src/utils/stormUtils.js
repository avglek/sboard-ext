import * as d3 from "d3";
import { dateToStr, parsePeriodToDate } from "./common";
import { showToolTip, hiddenTootTip } from "./tabloUtils";

const icon_storm = "./svg/sprite/storm-sprite.svg#storm_2";
const icon_critical = "./svg/sprite/storm-sprite.svg#storm_0";

export function showStorm(handleClick, data = []) {
  clearLayer();
  showLayer(handleClick, data);
}

const showLayer = (handleClick, data) => {
  data.forEach((item) => {
    const res = {
      train: item.id,
      info: getHitsText(item.hits),
      icon: item.isCritical ? icon_critical : icon_storm,
      eventClick: handleClick,
      critical: getCriticalEvent(item.hits),
    };

    showStormIcon(res);
  });
};

function clearLayer() {
  d3.selectAll("#icon").selectAll("use").remove();
  d3.selectAll("#trains_distantions > *").attr("opacity", "0");
}

const getHitsText = (data) => {
  let result = "";
  data.forEach((value) => {
    const dt = parsePeriodToDate(value.period);
    result =
      result +
      `${dateToStr(dt[0])}<br/>${dateToStr(dt[1])}<br/><b>
      ${value.data.split(";").join("<br/>")}</b><hr/>`;
  });

  return result.substr(0, result.length - 5);
};

function showStormIcon(iconsMap) {
  const { train, icon, eventClick, info, critical } = iconsMap;
  const trainNode = d3.select(`#dist_${train}`);
  trainNode.attr("opacity", "1");

  const anchorNode = trainNode.select("#icon");
  anchorNode.selectAll("use").remove();
  const iconNode = anchorNode.append("use");

  iconNode
    .attr("class", "storm-icon")
    .attr("href", icon)
    .attr("width", "30px")
    .attr("height", "20px")
    .attr("x", "0")
    .attr("y", "0");

  iconNode
    .on("click", () => eventClick(train))
    .on("mouseenter", () => showToolTip(info))
    .on("mouseleave", () => hiddenTootTip());

  critical.forEach((item, index) => {
    const itemNode = anchorNode.append("use");
    const href = `./svg/sprite/storm-sprite.svg#storm_${item.id}`;

    const dX = 34 + index * 22;

    itemNode
      .attr("class", "storm-icon")
      .attr("href", href)
      .attr("width", "20px")
      .attr("height", "20px")
      .attr("x", dX)
      .attr("y", "0");

    itemNode
      .on("mouseenter", () => showToolTip(item.info))
      .on("mouseleave", () => hiddenTootTip());
  });
}

const getCriticalEvent = (data) => {
  const buff = [];
  data.forEach((item) => {
    item.critical.forEach((item) => {
      const obj = {
        id: item.code,
        info: item.name_event,
      };
      buff.push(obj);
    });
  });
  return buff;
};
