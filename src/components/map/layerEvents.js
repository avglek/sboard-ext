import {
  addedEvents,
  resetEvents,
  clearStormEvents,
} from "../../utils/stormUtils";
import {
  loadSnowStatus,
  addSnowTechEvent,
  resetSnowTechEvent,
} from "../../utils/snowUtils";
import { loadWeatherIcon, cleanIconWeather } from "../../utils/weatherUtils";
import {
  eventBridgeHandler,
  resetBridgeHandler,
} from "../../utils/bridgesUtils";
import { eventPipeHandler, resetPipeHandler } from "../../utils/pipeUtils";

export function addEventLayer(layerId, props) {
  switch (layerId) {
    case "trains_distantions":
      addedEvents(props);
      return;
    case "snow_tech":
      loadSnowStatus(props);
      addSnowTechEvent(props);
      break;
    case "weather_st":
      loadWeatherIcon(props);
      break;
    case "bridges":
      eventBridgeHandler(props);
      break;
    case "tubes":
      eventPipeHandler(props);
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
      resetSnowTechEvent();
      break;
    case "weather_st":
      cleanIconWeather();
      break;
    case "bridges":
      resetBridgeHandler();
      break;
    case "tubes":
      resetPipeHandler();
      break;
    default:
      return;
  }
}
