// actions Брошеные поезда
import DataService from '../../services/DataService';
import {
  ABANDONED_FETCH_ERROR,
  ABANDONED_FETCH_SUCCESS,
  ABANDONED_START_LOADING,
} from '../actions/actionTypes';

const dataService = new DataService();

function abandonedFetchError(payload) {
  return {
    type: ABANDONED_FETCH_ERROR,
    payload,
  };
}

function abandonedStartLoading() {
  return {
    type: ABANDONED_START_LOADING,
  };
}

function abandonedFetchSuccess(items, region) {
  return {
    type: ABANDONED_FETCH_SUCCESS,
    payload: {
      items,
      region,
    },
  };
}

export function fetchAbandonedData(id) {
  return async (dispatch) => {
    dispatch(abandonedStartLoading());
    try {
      let data;
      if (id === 0) {
        data = await dataService.getAbandonedAll();
      } else {
        data = await dataService.getAbandonedByRegion(id);
      }
      dispatch(abandonedFetchSuccess(data, id));
    } catch (error) {
      console.log('Error:', error);
      dispatch(abandonedFetchError(error));
    }
  };
}
