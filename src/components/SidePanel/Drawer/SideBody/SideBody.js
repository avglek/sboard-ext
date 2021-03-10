import React, { useEffect } from "react";
import classes from "./SideBody.module.css";
import CheckBlock from "./CheckBlock/CheckBlock";
import { layersInit } from "../../../../config/layersInit";
import { connect } from "react-redux";
import { postShowLayer } from "../../../../store/actions/layerAction";

const SideBody = ({ ShowLayers, postShowLayer }) => {
  useEffect(() => {
    postShowLayer(layersInit);

    return undefined;
  }, [postShowLayer]);

  const handlerClear = () => {
    const layers = ShowLayers.map((item) => {
      return {
        ...item,
        show: false,
      };
    });
    postShowLayer(layers);
  };

  return (
    <div className={classes.SideBody}>
      <CheckBlock postShowLayer={postShowLayer} ShowLayers={ShowLayers} />
      <div className={classes.clearBox}>
        <div className={classes.clearButton} onClick={handlerClear}>
          Очистить
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ShowLayers: state.layer.layers,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postShowLayer: (layers) => dispatch(postShowLayer(layers)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBody);
