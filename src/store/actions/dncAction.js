import DataService from "../../services/DataService";
import {
  DNC_FETCH_ERROR,
  DNC_FETCH_SUCCESS,
  DNC_START_LOADING,
} from "../actions/actionTypes";

const dataService = new DataService();

function dncFetchError(payload) {
  return {
    type: DNC_FETCH_ERROR,
    payload,
  };
}

function dncStartLoading() {
  return {
    type: DNC_START_LOADING,
  };
}

function dncFetchSuccess(items, region) {
  return {
    type: DNC_FETCH_SUCCESS,
    payload: {
      items,
      region,
    },
  };
}

export function fetchDncData(id) {
  return async (dispatch) => {
    dispatch(dncStartLoading());
    try {
      const data = await dataService.getDncData(id);

      dispatch(dncFetchSuccess(data, id));
    } catch (error) {
      console.log("Error:", error);
      dispatch(dncFetchError(error));
    }
  };
}
