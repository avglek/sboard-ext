import React from "react";

import MapConteiner from "./MapConteiner";
import sizeMe from "react-sizeme";

const MapBox = (props) => {
  const { width, height } = props.size;
  return (
    <div className={props.className}>
      <MapConteiner realWidth={width} realHeight={height} />
    </div>
  );
};

export default sizeMe({ monitorHeight: true, monitorWidth: true })(MapBox);
