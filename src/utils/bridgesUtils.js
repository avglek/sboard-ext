import * as d3 from "d3";

export function eventBridgeHandler(props) {
  const nlist = d3.selectAll("#bridges").selectAll("#icon");

  nlist.on("click", function () {
    handlerClick(this, props);
  });
}

export function resetBridgeHandler() {
  const nlist = d3.selectAll("#bridges").selectAll("#icon");

  nlist.on("click", null);
}

function handlerClick(element, props) {
  const node = element.parentElement;
  const uid = node.getAttribute("id");
  console.log(uid);

  props.openModal(true);
  props.fetchBridgeData(uid);
}
