import { layerEvent } from "../../layers";

export function addEventLayer(layerId, props) {
  switch (layerId) {
    case "trains_distantions":
      layerEvent.storm.addedEvents(props);
      return;
    case "snow_tech":
      layerEvent.snow.loadSnowStatus(props);
      layerEvent.snow.addSnowTechEvent(props);
      break;
    case "weather_st":
      layerEvent.weather.loadWeatherIcon(props);
      break;
    case "bridges":
      layerEvent.bridges.eventBridgeHandler(props);
      break;
    case "tubes":
      layerEvent.pipe.loadPipeCount(props);
      layerEvent.pipe.eventPipeHandler(props);
      break;
    case "health_org":
      layerEvent.health.eventHealthHandler(props);
      break;
    case "spec_trains":
      layerEvent.spec.eventSpecTrains(props);
      break;
    case "mil_rails":
      layerEvent.milRails.addEvent(props);
      break;
    case "dnc":
      layerEvent.dnc.addEvent(props);
      break;
    case "vchd":
      layerEvent.vchd.addEvent(props);
      break;
    case "cleaners_active":
      layerEvent.stok.addEvent(props);
      break;
    case "oneu_active":
      layerEvent.riskobj.addEvent(props);
      break;
    default:
      return;
  }
}

export function removeEventLayer(layerId, props) {
  switch (layerId) {
    case "trains_distantions":
      layerEvent.storm.resetEvents();
      layerEvent.storm.clearStormEvents();

      return;
    case "snow_tech":
      layerEvent.snow.resetSnowTechEvent();
      break;
    case "weather_st":
      layerEvent.weather.cleanIconWeather();
      break;
    case "bridges":
      layerEvent.bridges.resetBridgeHandler();
      break;
    case "tubes":
      layerEvent.pipe.resetPipeHandler();
      break;
    case "health_org":
      layerEvent.health.resetHealthHandler();
      break;
    case "spec_trains":
      layerEvent.spec.resetSpecTrains();
      break;
    case "mil_rails":
      layerEvent.milRails.resetEvent();
      break;
    case "dnc":
      layerEvent.dnc.resetEvent();
      break;
    case "vchd":
      layerEvent.vchd.resetEvent();
      break;
    case "cleaners_active":
      layerEvent.stok.resetEvent();
      break;
    case "oneu_active":
      layerEvent.riskobj.resetEvent();
      break;
    default:
      return;
  }
}
