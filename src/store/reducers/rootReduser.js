import { combineReducers } from "redux";
import modalReduser from "./modalReduser";
import informReduser from "./informReduser";
import layerReduser from "./layerReduser";
import navbarReduser from "./navbarReduser";
import forecastReduser from "./forecatsReduser";

export default combineReducers({
  modal: modalReduser,
  inform: informReduser,
  layer: layerReduser,
  navbar: navbarReduser,
  forecast: forecastReduser,
});
