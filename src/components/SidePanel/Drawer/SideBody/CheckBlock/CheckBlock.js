import React from "react";
import Checkbox from "rc-checkbox";
import classes from "./CheckBlock.module.css";

const CheckBlock = ({ postShowLayer, ShowLayers }) => {
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

export default CheckBlock;
