import {
  FORECAST_FETCH_ERRORED,
  FORECAST_START_LOADING,
  FORECAST_CLOSE,
  FORECAST_FETCH_DATA_SUCCESS,
} from "./actionTypes";

export function forecastClose() {
  // console.log("action open modal:", bool);
  return {
    type: FORECAST_CLOSE,
  };
}

export function forecastFetchError(error) {
  return {
    type: FORECAST_FETCH_ERRORED,
    error: error,
  };
}

export function forecastStartLoading() {
  return {
    type: FORECAST_START_LOADING,
  };
}

export function forecastFetchDataSuccess(items) {
  return {
    type: FORECAST_FETCH_DATA_SUCCESS,
    items,
  };
}

export function forecastFetchData(url) {
  return async (dispatch) => {
    dispatch(forecastStartLoading());

    try {
      const response = await fetch(url);
      //console.log("response server:", response);
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        const body = await response.json();
        dispatch(forecastFetchDataSuccess(body));
      }
    } catch (e) {
      dispatch(forecastFetchError(e));
    }
  };
}
