import { selectAll } from "d3";
import { showToolTip, hiddenTootTip } from "../utils/tabloUtils";

const sprite = "./svg/sprite/vchd-sprite.svg";

export async function addEvent({
  vchdData,
  vchdRegion,
  vchdLoading,
  stormRegionID,
}) {
  if (stormRegionID === vchdRegion && !vchdLoading && vchdData) {
    const vchdNodes = selectAll("#vchd_active");

    vchdNodes
      .selectAll("g[id^='vchd_st_']")
      .nodes()
      .forEach((element) => {
        const uid = element.getAttribute("id");
        const vchdItems = vchdData.filter((i) => i.group_vchd_org === uid);

        const anchorNode = vchdNodes.selectAll(`#${uid}`);

        vchdItems.forEach((item, index) => {
          const itemNode = anchorNode.append("use");
          const href = `${sprite}#${item.tip_znaka}`;

          const dX = index * 22;

          itemNode
            .attr("class", "vchd-icon")
            .attr("href", href)
            .attr("width", "20px")
            .attr("height", "20px")
            .attr("x", dX)
            .attr("y", "0");

          itemNode
            .on("mouseenter", () =>
              hintText(item) ? showToolTip(hintText(item)) : null
            )
            .on("mouseleave", () => hiddenTootTip());
        });
      });
  }
}

export function resetEvent() {
  selectAll("#vchd_active")
    .selectAll("g[id^='vchd_st_']")
    .selectAll("use")
    .remove();
}

function hintText(item) {
  if (item.uch_pto) {
    const txt = `<b>${item.uch_pto}</b></br>
  Технологическая численность</br>
  день ${item.techkol_day} чел.</br>
  ночь ${item.techkol_night} чел.`;

    return txt;
  } else {
    return null;
  }
}
