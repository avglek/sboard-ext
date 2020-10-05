import { ITEMS_SHOW_LAYER, ITEMS_IS_REFRESH_LAYER } from "./actionTypes";

export function itemsShowLayer(layers) {
  return {
    type: ITEMS_SHOW_LAYER,
    layers: layers,
  };
}

export function itemsIsRefreshLayer(bool) {
  // console.log("action open modal:", bool);
  return {
    type: ITEMS_IS_REFRESH_LAYER,
    isRefreshLayer: bool,
  };
}
