import {
  VCHD_FETCH_ERROR,
  VCHD_FETCH_SUCCESS,
  VCHD_START_LOADING,
} from "../actions/actionTypes";

const initialState = {
  loading: true,
  error: null,
  items: [],
  region: 0,
};

export default function vchdReducer(state = initialState, action) {
  switch (action.type) {
    case VCHD_START_LOADING:
      return {
        ...state,
        error: null,
        items: [],
        loading: true,
        region: 0,
      };

    case VCHD_FETCH_SUCCESS:
      return {
        ...state,
        error: null,
        items: action.payload.items,
        loading: false,
        region: action.payload.region,
      };

    case VCHD_FETCH_ERROR:
      return {
        ...state,
        items: [],
        error: action.error,
        loading: false,
        region: 0,
      };

    default:
      return state;
  }
}
