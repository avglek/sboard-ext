import React, { useEffect } from "react";
import "./MapConteiner.css";
import { loadMapORW, ShowLayer } from "./tablo";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { connect } from "react-redux";
import {
  itemsShowLayer,
  itemsIsRefreshLayer,
} from "../../store/actions/layerAction";
import {
  informLegendKey,
  informSpecKey,
} from "../../store/actions/informActions";
import { modalFetchData, ModalIsOpen } from "../../store/actions/modalAction";
import { forecastFetchData, forecastClose } from "../../store/actions/forecastAction";

const mapStateToProps = (state) => {
  return {
    items: state.items,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading,
    isModalOpen: state.modal.IsModalOpen,
    showLayer: state.layer.layers,
    refreshLayer: state.layer.refresh,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(modalFetchData(url)),
    forecastFetchData: (url) => dispatch(forecastFetchData(url)),
    forecastClose: () => dispatch(forecastClose()),
    postLegend: (imgName) => dispatch(informLegendKey(imgName)),
    postSpec: (imgName) => dispatch(informSpecKey(imgName)),
    openModal: (isOpen) => dispatch(ModalIsOpen(isOpen)),
    postShowLayer: (layers) => dispatch(itemsShowLayer(layers)),
    postRefreshLayer: (isRefresh) => dispatch(itemsIsRefreshLayer(isRefresh)),
  };
};

const MapConteiner = (props) => {
  // eslint-disable-next-line
  useEffect(() => loadMapORW(props), []);

  const styleButtonZoom = {
    width: "20px",
    height: "20px",
  };

  let w = props.realWidth - 10;
  let h = props.realHeight - 10;

  // console.log(`w-${w} h-${h}`);
  ShowLayer(props.showLayer);

  return (
    <TransformWrapper defaultScale={1}>
      {({ zoomIn, zoomOut, resetTransform, ...rect }) => (
        <div>
          <div className="tools">
            <div className="tools-button" onClick={zoomIn}>
              <img src="./svg/zoom.svg" alt="+" style={styleButtonZoom} />
            </div>
            <div className="tools-button" onClick={zoomOut}>
              <img src="./svg/out.svg" alt="-" style={styleButtonZoom} />
            </div>
            <div className="tools-button" onClick={resetTransform}>
              <img src="./svg/restore.svg" alt="x" style={styleButtonZoom} />
            </div>
          </div>
          <TransformComponent>
            <div
              id="map"
              style={{
                width: w,
                height: h,
              }}
              layer={props.refreshLayer.toString()}
            ></div>
          </TransformComponent>
        </div>
      )}
    </TransformWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MapConteiner);
