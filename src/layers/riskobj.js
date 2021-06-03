import { selectAll } from "d3";
import { showToolTip, hiddenTootTip } from "../utils/tabloUtils";

const sprite = "./svg/sprite/stok-sprite.svg#oneu";

export async function addEvent({
  riskobjData,
  riskobjRegion,
  riskobjLoading,
  stormRegionID,
  fetchRiskobjInfoData,
  openModal,
}) {
  if (stormRegionID === riskobjRegion && !riskobjLoading && riskobjData) {
    const riskobjNodes = selectAll("#oneu_active");

    riskobjNodes
      .selectAll("g[id^='oneu_']")
      .nodes()
      .forEach((element) => {
        const uid = element.getAttribute("id");
        const riskobjItems = riskobjData.filter((i) => i.id === uid);

        const anchorNode = riskobjNodes.selectAll(`#${uid}`);

        riskobjItems.forEach((item, index) => {
          const itemNode = anchorNode.append("use");
          const href = sprite;

          const dX = index * 22;

          itemNode
            .attr("class", "oneu-icon")
            .attr("href", href)
            .attr("width", "20px")
            .attr("height", "20px")
            .attr("x", dX)
            .attr("y", "0");

          itemNode
            .on("mouseenter", () => {
              if (hintText(item)) showToolTip(hintText(item));
              itemNode.style("cursor", "pointer");
            })
            .on("mouseleave", () => {
              hiddenTootTip();
              itemNode.style("cursor", "default");
            })
            .on("click", () =>
              handleClick(item.code, openModal, fetchRiskobjInfoData)
            );
        });
      });
  }
}

export function resetEvent() {
  selectAll("#oneu_active")
    .selectAll("g[id^='oneu_']")
    .selectAll("use")
    .remove();
}

function hintText(item) {
  if (item.name) {
    const txt = item.name.split(" - ");

    return txt[0];
  } else {
    return null;
  }
}

function handleClick(code, openModal, fetchRiskobjInfoData) {
  openModal(true);
  fetchRiskobjInfoData(code);
}
