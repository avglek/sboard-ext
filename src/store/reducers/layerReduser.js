import {
  ITEMS_SHOW_LAYER,
  ITEMS_IS_REFRESH_LAYER,
} from "../actions/actionTypes";

const initialState = {
  layers: [],
  refresh: false,
};

export default function layerReduser(state = initialState, action) {
  //  console.log("Reduser:", action)
  switch (action.type) {
    case ITEMS_SHOW_LAYER:
      return {
        ...state,
        layers: action.layers,
      };
    case ITEMS_IS_REFRESH_LAYER:
      //console.log("Reduser get ITEMS_IS_MODAL_OPEN", action.isModalOpen);
      return {
        ...state,
        refresh: action.isRefreshLayer,
      };

    default:
      return state;
  }
}
