const deltaColor = 111;

export function eventSnowHandler(layer, added, props) {
  clearSnowRoute(!added);
  //const childrens = layer.querySelectorAll('g[id ^= "sdpm_"]');
  const childrens = layer.querySelectorAll("#snow_tech > *");

  childrens.forEach((el) => {
    if (added) {
      el.addEventListener("click", function () {
        clickHandlerSnowRoute(this, props);
      });
      el.addEventListener("focusin", focusInHandler);
      el.addEventListener("focusout", focusOutHandler);
    } else {
      el.removeEventListener("click", function () {
        clickHandlerSnowRoute(this, props);
      });
      el.removeEventListener("focusin", focusInHandler);
      el.removeEventListener("focusout", focusOutHandler);
    }
  });
}

function clearSnowRoute(bool) {
  if (bool) {
    const nlist = document.querySelectorAll('g[id^="snow_route_"]');
    nlist.forEach((node) => node.setAttribute("opacity", "0"));
  }
}

function clickHandlerSnowRoute(element, props) {
  const id = element.id;

  const numId = id.slice(5);

  console.log(id, numId);

  props.openModal(true);
  props.fetchSnowData(id);

  const nodeList = document.querySelectorAll('g[id^="snow_route_"]');

  nodeList.forEach((node) => {
    const nodeId = node.getAttribute("id");

    const idRoute = nodeId.slice(11);

    if (idRoute === numId) {
      const opacity = node.getAttribute("opacity");
      if (opacity === "1") {
        node.setAttribute("opacity", "0");
        element.blur();
      } else {
        node.setAttribute("opacity", "1");
      }
    } else {
      node.setAttribute("opacity", "0");
    }
  });
}

function focusInHandler() {
  const rect = this.querySelector("rect");
  const fill = rect.getAttribute("fill");
  const colorNumber = Number.parseInt(`0x${fill.slice(-6)}`);
  const newColor = colorNumber - deltaColor;
  rect.setAttribute("fill", `#${newColor.toString(16)}`);
}

function focusOutHandler() {
  const rect = this.querySelector("rect");
  const fill = rect.getAttribute("fill");
  const colorNumber = Number.parseInt(`0x${fill.slice(-6)}`);
  const newColor = colorNumber + deltaColor;
  rect.setAttribute("fill", `#${newColor.toString(16)}`);
}
