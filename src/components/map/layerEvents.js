import { addedEvents, resetEvents } from "../../utils/stormUtils";
import { eventSnowHandler } from "../../utils/snowUtils";

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
    default:
      return;
  }
}

export function removeEventLayer(layerId, props) {
  switch (layerId) {
    case "trains_distantions":
      resetEvents();

      return;
    case "snow_tech":
      const selectLayers = document.querySelectorAll(`#${layerId}`);
      selectLayers.forEach((selectLayer) => {
        eventSnowHandler(selectLayer, false);
      });
      break;
    default:
      return;
  }
}
