import React from "react";
import { connect } from "react-redux";
import classes from "./ToggleMapButton.module.css";
import { toggleMainMap } from "../../../store/actions/tabloAction";
import { hiddenTootTip, showToolTip } from "../../../utils/tabloUtils";

const applicationInitialState = window.__INITIAL_STATE__;
const mainmap = applicationInitialState.main;

const ToggleMapButton = ({ toggleMainMap, name, img, toggle }) => {
  const handleToggleButton = () => {
    if (toggle) {
      toggleMainMap({
        url: mainmap.big_map,
        img: "./svg/icons/button/map.svg",
        toggle: false,
        name: "Symbol map",
      });
    } else {
      toggleMainMap({
        url: mainmap.map,
        img: "./svg/icons/button/flat.svg",
        toggle: true,
        name: "Geo map",
      });
    }
  };

  const handleMouseEnter = (e) => {
    const x = e.pageX;
    const y = e.pageY;

    const text = "Переключение<br/>вида карты";

    showToolTip(text, x, y, "down");
  };

  const handleMouseLeave = () => {
    hiddenTootTip();
  };

  return (
    <div className={classes.ToggleMapButton}>
      <img
        src={img}
        alt={name}
        onClick={handleToggleButton}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

const mapDispathToProps = {
  toggleMainMap,
};

const mapStateToProps = (state) => {
  return {
    name: state.tablo.name,
    img: state.tablo.img,
    toggle: state.tablo.toggle,
  };
};

export default connect(mapStateToProps, mapDispathToProps)(ToggleMapButton);
