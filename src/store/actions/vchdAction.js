import DataService from "../../services/DataService";
import {
  VCHD_FETCH_ERROR,
  VCHD_START_LOADING,
  VCHD_FETCH_SUCCESS,
} from "./actionTypes";

const dataService = new DataService();

function vchdFetchError(error) {
  return {
    type: VCHD_FETCH_ERROR,
    error,
  };
}

function vchdStartLoading() {
  return {
    type: VCHD_START_LOADING,
  };
}

function vchdFetchSuccess(items, region) {
  const payload = {
    items,
    region,
  };

  return {
    type: VCHD_FETCH_SUCCESS,
    payload,
  };
}

export function fetchVchdData(region) {
  return async (dispatch) => {
    dispatch(vchdStartLoading());
    try {
      const data = await dataService.getVchd(region);
      dispatch(vchdFetchSuccess(data, region));
    } catch (error) {
      console.log("Error:", error);
      dispatch(vchdFetchError(error));
    }
  };
}
