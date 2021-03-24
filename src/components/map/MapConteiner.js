import React from "react";
import "./MapConteiner.css";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Board from "./Board";
import sizeMe from "react-sizeme";

const icons = {
  zoomIn: "./svg/icons/button/zoom.svg",
  zoomOut: "./svg/icons/button/out.svg",
  zoomReset: "./svg/icons/button/restore.svg",
};

const MapConteiner = (props) => {
  const styleButtonZoom = {
    width: "20px",
    height: "20px",
  };

  const { width, height } = props.size;

  let w = width - 10;
  let h = height - 10;

  return (
    <TransformWrapper defaultScale={1}>
      {({ zoomIn, zoomOut, resetTransform, ...rect }) => (
        <div>
          <div className="tools">
            <div className="tools-button" onClick={zoomIn}>
              <img src={icons.zoomIn} alt="+" style={styleButtonZoom} />
            </div>
            <div className="tools-button" onClick={zoomOut}>
              <img src={icons.zoomOut} alt="-" style={styleButtonZoom} />
            </div>
            <div className="tools-button" onClick={resetTransform}>
              <img src={icons.zoomReset} alt="x" style={styleButtonZoom} />
            </div>
          </div>
          <TransformComponent>
            <Board Width={w} Height={h} resetZoom={resetTransform} />
          </TransformComponent>
        </div>
      )}
    </TransformWrapper>
  );
};

export default sizeMe({ monitorHeight: true, monitorWidth: true })(
  MapConteiner
);
