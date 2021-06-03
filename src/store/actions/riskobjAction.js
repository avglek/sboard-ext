import DataService from "../../services/DataService";
import {
  RISKOBJ_FETCH_ERROR,
  RISKOBJ_START_LOADING,
  RISKOBJ_FETCH_SUCCESS,
} from "./actionTypes";

const dataService = new DataService();

function riskobjFetchError(error) {
  return {
    type: RISKOBJ_FETCH_ERROR,
    error,
  };
}

function riskobjStartLoading() {
  return {
    type: RISKOBJ_START_LOADING,
  };
}

function riskobjFetchSuccess(items, region) {
  const payload = {
    items,
    region,
  };

  return {
    type: RISKOBJ_FETCH_SUCCESS,
    payload,
  };
}

export function fetchRiskobjData(region) {
  return async (dispatch) => {
    dispatch(riskobjStartLoading());
    try {
      const data = await dataService.getRiskobjRegion(region);
      dispatch(riskobjFetchSuccess(data, region));
    } catch (error) {
      console.log("Error:", error);
      dispatch(riskobjFetchError(error));
    }
  };
}
