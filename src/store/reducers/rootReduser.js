import { combineReducers } from "redux";
import modalReduser from "./modalReduser";
import informReduser from "./informReduser";
import layerReduser from "./layerReduser";
import navbarReduser from "./navbarReduser";
import forecastReduser from "./forecatsReduser";
import stormReduser from "./stormReduser";
import tabloReduser from "./tabloReduser";
import weatherReduser from "./weatherReduser";
import snowTechReduser from "./snowTechReduser";
import pipeCountReduser from "./pipeReduser";

export default combineReducers({
  modal: modalReduser,
  inform: informReduser,
  layer: layerReduser,
  navbar: navbarReduser,
  forecast: forecastReduser,
  storm: stormReduser,
  tablo: tabloReduser,
  weather: weatherReduser,
  snowTech: snowTechReduser,
  pipe: pipeCountReduser,
});
