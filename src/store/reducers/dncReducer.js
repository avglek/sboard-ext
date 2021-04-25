import {
  DNC_FETCH_ERROR,
  DNC_FETCH_SUCCESS,
  DNC_START_LOADING,
} from "../actions/actionTypes";

const initialState = {
  items: null,
  loading: false,
  error: null,
  region: 0,
};

const dncReducer = (state = initialState, action) => {
  switch (action.type) {
    case DNC_START_LOADING:
      return {
        ...state,
        loading: true,
        items: null,
        region: 0,
      };
    case DNC_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        region: 0,
      };
    case DNC_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: action.payload.items,
        region: action.payload.region,
      };
    default:
      return state;
  }
};

export default dncReducer;
