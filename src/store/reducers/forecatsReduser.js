import {
  FORECAST_FETCH_ERRORED,
  FORECAST_START_LOADING,
  FORECAST_CLOSE,
  FORECAST_FETCH_DATA_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  isOpen: false,
  loading: false,
  error: null,
  items: [],
};

export default function forecastReduser(state = initialState, action) {
  switch (action.type) {
    case FORECAST_CLOSE:
      return {
        ...state,
        isOpen: false,
      };
    case FORECAST_START_LOADING:
      return {
        ...state,
        loading: true,
        isOpen: false,
      };
    case FORECAST_FETCH_DATA_SUCCESS:
      return {
        ...state,
        items: action.items,
        loading: false,
        isOpen: true,
      };
    case FORECAST_FETCH_ERRORED:
      return {
        ...state,
        error: action.error,
        loading: false,
        isOpen: false,
      };

    default:
      return state;
  }
}
