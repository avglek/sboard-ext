import { TABLO_TOGGLE_MAIN_MAP } from "../actions/actionTypes";
const applicationInitialState = window.__INITIAL_STATE__;
const mainmap = applicationInitialState.main;

const mapLocal = localStorage.getItem("map");
let initialState = {};

if (mapLocal) {
  initialState = JSON.parse(mapLocal);
} else
  initialState = {
    url: mainmap.map.url,
    legend: mainmap.map.img_leg,
    img: "./svg/icons/button/flat.svg",
    toggle: true,
    name: "Geo map",
  };

export default function tabloReduser(state = initialState, action) {
  switch (action.type) {
    case TABLO_TOGGLE_MAIN_MAP:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
