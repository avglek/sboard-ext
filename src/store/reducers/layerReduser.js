import { LAYER_SHOW_CHECKED, LAYER_REFRESH } from "../actions/actionTypes";

const initialState = {
  layers: [],
};

export default function layerReduser(state = initialState, action) {
  //console.log("Reduser:", action);
  switch (action.type) {
    case LAYER_SHOW_CHECKED:
      return {
        ...state,
        layers: action.layers,
      };
    case LAYER_REFRESH:
      console.log("Reduser layers", action.layers);
      return {
        ...state,
        layers: action.layers,
      };

    default:
      return state;
  }
}
