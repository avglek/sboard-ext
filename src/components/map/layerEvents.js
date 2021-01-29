import {
  addedEvents,
  resetEvents,
  clearStormEvents,
} from "../../utils/stormUtils";
import { eventSnowHandler } from "../../utils/snowUtils";
import { loadWeatherIcon, cleanIconWeather } from "../../utils/weatherUtils";

export function addEventLayer(layerId, props) {
  switch (layerId) {
    case "trains_distantions":
      addedEvents(props);
      return;
    case "snow_tech":
      const selectLayers = document.querySelectorAll(`#${layerId}`);
      selectLayers.forEach((selectLayer) => {
        eventSnowHandler(selectLayer, true);
      });
      break;
    case "weather_st":
      loadWeatherIcon(props);
      break;
    default:
      return;
  }
}

export function removeEventLayer(layerId, props) {
  switch (layerId) {
    case "trains_distantions":
      resetEvents();
      clearStormEvents();

      return;
    case "snow_tech":
      const selectLayers = document.querySelectorAll(`#${layerId}`);
      selectLayers.forEach((selectLayer) => {
        eventSnowHandler(selectLayer, false);
      });
      break;
    case "weather_st":
      cleanIconWeather();
      break;
    default:
      return;
  }
}
