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
import {
  eventPipeHandler,
  resetPipeHandler,
  loadPipeCount,
} from "../../utils/pipeUtils";
import {
  eventHealthHandler,
  resetHealthHandler,
} from "../../utils/healthUtils";
import { eventSpecTrains, resetSpecTrains } from "../../utils/specTrains";

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
      loadPipeCount(props);
      eventPipeHandler(props);
      break;
    case "health_org":
      eventHealthHandler(props);
      break;
    case "spec_trains":
      eventSpecTrains(props);
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
    case "health_org":
      resetHealthHandler();
      break;
    case "spec_trains":
      resetSpecTrains();
      break;
    default:
      return;
  }
}
