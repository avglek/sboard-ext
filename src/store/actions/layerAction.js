import { LAYER_SHOW_CHECKED, LAYER_REFRESH } from "./actionTypes";
import * as d3 from "d3";

export function postShowLayer(layers) {
  return {
    type: LAYER_SHOW_CHECKED,
    layers: layers,
  };
}

export function postRefreshLayer(layers) {
  // console.log("action open modal:", bool);
  //const newLayers = scanLayer(layers);

  return {
    type: LAYER_REFRESH,
    layers: scanLayer(layers),
  };
}

function scanLayer(layers) {
  console.log("old:", layers);
  const newLayers = layers.map((item) => {
    let dis = item.disabled;
    item.layer.split(" ").forEach((text) => {
      const selectLayer = d3.selectAll("#" + text.trim());
      if (selectLayer.node()) {
        dis = false;
      } else {
        dis = true;
      }
    });
    return { ...item, disabled: dis };
  });

  console.log("new:", newLayers);

  return newLayers;
}
