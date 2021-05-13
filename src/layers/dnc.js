import { select, selectAll, xml } from "d3";

const icon2 = "./svg/icons/dnc/dnc_sp.svg";
const fillUp = "#22E329";
const fillDown = "#FC5656";

export async function addEvent({
  dncData,
  dncLoading,
  dncRegion,
  stormRegionID,
  openModal,
  fetchDncUchData,
}) {
  if (stormRegionID === dncRegion && !dncLoading && dncData) {
    if (selectAll("#dnc_spa").empty()) {
      const lastLoad = select("#speed_load_time").node().children[0];
      const txtTime = lastLoad.textContent;
      lastLoad.textContent = `${txtTime.slice(0, -5)}${dncData[0].last}`;

      const doc = await xml(icon2);
      const iconElement = doc.documentElement.querySelector("#dnc_sp");

      dncData.forEach((item) => {
        const dncNode = select("#dnc_active").selectAll(`#dnc_${item.id}`);
        if (!dncNode.empty()) {
          const elClone = iconElement.cloneNode(true);
          setSpeedText("speed1", elClone, item.fact);
          setSpeedText("speed2", elClone, item.plan);
          setSpeedFill(elClone, item.fact, item.plan);

          dncNode.node().appendChild(elClone);

          dncNode
            .on("click", () => {
              handlerClick(item.id, openModal, fetchDncUchData);
            })
            .on("mouseenter", () => {
              dncNode.style("cursor", "pointer");
            })
            .on("mouseleave", () => {
              dncNode.style("cursor", "default");
            });
        }
      });
    }
  }
}

export function resetEvent() {
  const dncNode = select("#dnc_active").select("g[id^='dnc_']");
  dncNode.on("click", null).on("mouseenter", null).on("mouseleave", null);
  selectAll("#dnc_spa").remove();
}

function setSpeedText(id, element, txt) {
  const node = element.querySelector(`#${id}`);
  node.children[0].textContent = txt;
}

function handlerClick(uid, openModal, fetchDncUchData) {
  // const node = element.parentElement;
  // const uid = node.getAttribute("id");
  openModal(true);
  fetchDncUchData(uid);
}

function setSpeedFill(element, fact, plan) {
  const node = element.querySelector("#big_rect");

  if (fact < plan) node.setAttribute("fill", fillDown);
  else node.setAttribute("fill", fillUp);
}
