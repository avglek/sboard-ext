import { TABLO_TOGGLE_MAIN_MAP } from "./actionTypes";

export function toggleMainMap(payload) {
  return {
    type: TABLO_TOGGLE_MAIN_MAP,
    payload: payload,
  };
}
