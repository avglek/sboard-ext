import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadMapORW, ShowLayer } from "./tablo";
import { showStorm } from "../../utils/stormUtils";
//import { showWeather } from "../../utils/weatherUtils";
import {
  postShowLayer,
  //postRefreshLayer,
} from "../../store/actions/layerAction";
import {
  informLegendKey,
  informSpecKey,
} from "../../store/actions/informActions";
import {
  modalFetchData,
  ModalIsOpen,
  modalStormFetchData,
  modalBridgeFetchData,
  modalSnowFetchData,
  modalPipeFetchData,
} from "../../store/actions/modalAction";
import {
  forecastFetchData,
  forecastClose,
  forecastOpen,
} from "../../store/actions/forecastAction";

import {
  stormFetchData,
  stormUpdateData,
} from "../../store/actions/stormAction";

import {
  weatherFetchData,
  weatherWinOpen,
  weatherWinClose,
} from "../../store/actions/weatherAction";

import {snowTechFetchData} from "../../store/actions/snowTechAction"

import SocketService from "../../services/SocketService";

const socket = new SocketService();

const Board = (props) => {
  const { stormRegionID, updateStormData, postWeather } = props;
  useEffect(() => {
    socket.switchListner("storm", () => {
      console.log("storm update:", stormRegionID);
      updateStormData(stormRegionID);
    });
    socket.switchListner("weather.update", () => {
      console.log("weather update:", stormRegionID);
      postWeather(stormRegionID);
    });
  }, [stormRegionID, updateStormData, postWeather]);

  useEffect(() => {
    loadMapORW(props);

    // eslint-disable-next-line
  }, [props.tabloUrl]);

  useEffect(() => {
    ShowLayer(props);
  });

  useEffect(() => {
    showStorm(props.stormClick, props.stormItems, 2);
  }, [props.stormItems, props.stormClick]);

  // useEffect(() => {
  //   showWeather(props.weatherItems);
  // }, [props.weatherItems]);

  return (
    <div
      id="map"
      style={{
        width: props.Width,
        height: props.Height,
      }}
      //layer={this.props.refreshLayer.toString()}
    ></div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading,
    isModalOpen: state.modal.IsModalOpen,
    showLayer: state.layer.layers,
    //  refreshLayer: state.layer.refresh,
    stormItems: state.storm.items,
    stormClick: state.storm.clickFunction,
    stormLoading: state.storm.loading,
    stormRegionID: state.storm.id,
    tabloUrl: state.tablo.url,
    tabloLegend: state.tablo.legend,
    weatherItems: state.weather.items,
    weatherLoad: state.weather.loading,
    weatherRegion: state.weather.region,
    snowTechData: state.snowTech.items,
    snowTechLoad: state.snowTech.loading,
    snowTechRegion: state.snowTech.region,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(modalFetchData(url)),
    forecastFetchData: (url) => dispatch(forecastFetchData(url)),
    forecastClose: () => dispatch(forecastClose()),
    forecastOpen: () => dispatch(forecastOpen()),
    postSpec: (imgName) => dispatch(informSpecKey(imgName)),
    openModal: (isOpen) => dispatch(ModalIsOpen(isOpen)),
    postShowLayer: (layers) => dispatch(postShowLayer(layers)),
    //postRefreshLayer: (isRefresh) => dispatch(postRefreshLayer(isRefresh)),
    postStorm: (id, clickFunction) =>
      dispatch(stormFetchData(id, clickFunction)),
    postWeather: (id) => dispatch(weatherFetchData(id)),
    fetchStormData: (id) => dispatch(modalStormFetchData(id)),
    fetchBridgeData: (id) => dispatch(modalBridgeFetchData(id)),
    fetchPipeData: (id) => dispatch(modalPipeFetchData(id)),
    fetchSnowData: (id) => dispatch(modalSnowFetchData(id)),
    updateStormData: (id) => dispatch(stormUpdateData(id)),
    postLegend: (imgName) => dispatch(informLegendKey(imgName)),
    weatherWinOpen: (x, y, selectItem) =>
      dispatch(weatherWinOpen(x, y, selectItem)),
    weatherWinClose: () => dispatch(weatherWinClose()),
    postSnowTech: (id) => dispatch(snowTechFetchData(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
