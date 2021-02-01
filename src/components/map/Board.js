import React, { useEffect } from "react";
import { connect } from "react-redux";
//import socketIOClient from "socket.io-client";
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
} from "../../store/actions/weatherAction";

//const applicationInitialState = window.__INITIAL_STATE__;
//const wsocket = applicationInitialState.wsocket;

const Board = (props) => {
  // useEffect(() => {
  //   const socket = socketIOClient(wsocket.endpoint);
  //   socket.on("storm", () => {
  //console.log(props);
  //this.updateStorm();
  //    });
  //  }, []);

  useEffect(() => {
    loadMapORW(props);

    // eslint-disable-next-line
  }, [props.tabloUrl]);

  useEffect(() => {
    ShowLayer(props);
    //  initLayer(this.props.showLayer);
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
    updateStormData: (id) => dispatch(stormUpdateData(id)),
    postLegend: (imgName) => dispatch(informLegendKey(imgName)),
    weatherWinOpen: (x, y, selectItem) =>
      dispatch(weatherWinOpen(x, y, selectItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
