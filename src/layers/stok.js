import { selectAll } from "d3";
import { showToolTip, hiddenTootTip } from "../utils/tabloUtils";

const sprite = "./svg/sprite/stok-sprite.svg";

export async function addEvent({
  stokData,
  stokRegion,
  stokLoading,
  stormRegionID,
  fetchStokInfoData,
  openModal,
}) {
  if (stormRegionID === stokRegion && !stokLoading && stokData) {
    const stokNodes = selectAll("#cleaners_active");

    stokNodes
      .selectAll("g[id^='clbld_']")
      .nodes()
      .forEach((element) => {
        const uid = element.getAttribute("id");
        const stokItems = stokData.filter((i) => i.id === uid);

        const anchorNode = stokNodes.selectAll(`#${uid}`);

        stokItems.forEach((item, index) => {
          const itemNode = anchorNode.append("use");
          const href = `${sprite}#${item.icon}`;

          const dX = index * 22;

          itemNode
            .attr("class", "stok-icon")
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
              handleClick(item.code, openModal, fetchStokInfoData)
            );
        });
      });
  }
}

export function resetEvent() {
  selectAll("#cleaners_active")
    .selectAll("g[id^='clbld_']")
    .selectAll("use")
    .remove();
}

function hintText(item) {
  if (item.location) {
    const txt = `<b>${item.location}</b>
    </br>${item.category}`;

    return txt;
  } else {
    return null;
  }
}

function handleClick(code, openModal, fetchStokInfoData) {
  console.log(code);
  openModal(true);
  fetchStokInfoData(code);
}
