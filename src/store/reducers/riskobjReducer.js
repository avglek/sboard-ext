import {
  RISKOBJ_FETCH_ERROR,
  RISKOBJ_FETCH_SUCCESS,
  RISKOBJ_START_LOADING,
} from "../actions/actionTypes";

const initialState = {
  loading: true,
  error: null,
  items: [],
  region: 0,
};

export default function riskobjReducer(state = initialState, action) {
  switch (action.type) {
    case RISKOBJ_START_LOADING:
      return {
        ...state,
        error: null,
        items: [],
        loading: true,
        region: 0,
      };

    case RISKOBJ_FETCH_SUCCESS:
      return {
        ...state,
        error: null,
        items: action.payload.items,
        loading: false,
        region: action.payload.region,
      };

    case RISKOBJ_FETCH_ERROR:
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
