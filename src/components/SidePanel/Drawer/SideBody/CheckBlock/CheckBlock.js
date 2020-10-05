import React, { useEffect } from "react";
import { connect } from "react-redux";
import { itemsShowLayer } from "../../../../../store/actions/layerAction";
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
    postShowLayer: (layers) => dispatch(itemsShowLayer(layers)),
  };
};

const CheckBlock = (props) => {
  useEffect(() => {
    props.postShowLayer(layersInit);
    return undefined;
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    let id = Number(e.target.index);

    const layers = props.ShowLayers.map((item, index) => {
      if (index === id) {
        return {
          layer: item.layer,
          show: e.target.checked,
          name: layersInit[index].name,
        };
      } else {
        return item;
      }
    });
    props.postShowLayer(layers);
  };

  return (
    <div className={classes.CheckBlock}>
      <ul className="ulapp">
        {props.ShowLayers.map((item, index) => {
          return (
            <li key={index} style={{ visibility: item.visible }}>
              <label>
                <Checkbox
                  checked={item.show}
                  onChange={onChange}
                  name={item.layer}
                  index={index}
                  disabled={!props.SpecKey}
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
