import { LAYER_SHOW_CHECKED, LAYER_REFRESH } from "./actionTypes";
import * as d3 from "d3";

export function postShowLayer(layers) {
  console.log("a:", layers);
  return {
    type: LAYER_SHOW_CHECKED,
    layers: layers,
  };
}

export function postRefreshLayer(layers) {
  return {
    type: LAYER_REFRESH,
    layers: scanLayer(layers),
  };
}

function scanLayer(layers) {
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

  return newLayers;
}
