import { TABLO_TOGGLE_MAIN_MAP } from "../actions/actionTypes";

const initialState = {
  url: "",
  legend: "",
  img: "",
  toggle: true,
  name: "",
};

export default function tabloReduser(state = initialState, action) {
  switch (action.type) {
    case TABLO_TOGGLE_MAIN_MAP:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
