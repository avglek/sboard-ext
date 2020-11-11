import { TABLO_TOGGLE_MAIN_MAP } from "./actionTypes";

export function toggleMainMap(payload) {
  const mapRaw = JSON.stringify(payload);
  localStorage.setItem("map", mapRaw);
  return {
    type: TABLO_TOGGLE_MAIN_MAP,
    payload: payload,
  };
}
