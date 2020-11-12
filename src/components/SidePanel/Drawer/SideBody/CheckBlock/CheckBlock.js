import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  postShowLayer,
  postRefreshLayer,
} from "../../../../../store/actions/layerAction";
import Checkbox from "rc-checkbox";
import classes from "./CheckBlock.module.css";
import { layersInit } from "./layersInit";

const mapStateToProps = (state) => {
  return {
    ShowLayers: state.layer.layers,
    SpecKey: state.inform.spec,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postShowLayer: (layers) => dispatch(postShowLayer(layers)),
    postRefreshLayer: (layers) => dispatch(postRefreshLayer(layers)),
  };
};

const CheckBlock = ({
  postShowLayer,
  ShowLayers,
  SpecKey,
  postRefreshLayer,
}) => {
  useEffect(() => {
    postShowLayer(layersInit);

    return undefined;
  }, [postShowLayer]);

  const onChange = (e) => {
    let id = Number(e.target.index);

    const layers = ShowLayers.map((item, index) => {
      if (index === id) {
        return {
          ...item,
          show: e.target.checked,
        };
      } else {
        return item;
      }
    });
    postShowLayer(layers);
  };

  ShowLayers.sort((a, b) => {
    return a.id - b.id;
  });

  return (
    <div className={classes.CheckBlock}>
      <ul className="ulapp">
        {ShowLayers.map((item, index) => {
          return (
            <li key={index} style={{ visibility: item.visible }}>
              <label>
                <Checkbox
                  checked={item.show}
                  onChange={onChange}
                  name={item.layer}
                  index={index}
                  disabled={item.disabled} //{!props.SpecKey}
                />

                <span style={{ paddingLeft: "0.5rem" }}></span>
                {item.name}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckBlock);
