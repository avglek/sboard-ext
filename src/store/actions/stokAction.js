// Стоки
import DataService from '../../services/DataService';
import {
  STOK_FETCH_ERROR,
  STOK_START_LOADING,
  STOK_FETCH_SUCCESS,
} from './actionTypes';

const dataService = new DataService();

function stokFetchError(error) {
  return {
    type: STOK_FETCH_ERROR,
    error,
  };
}

function stokStartLoading() {
  return {
    type: STOK_START_LOADING,
  };
}

function stokFetchSuccess(items, region) {
  const payload = {
    items,
    region,
  };

  return {
    type: STOK_FETCH_SUCCESS,
    payload,
  };
}

export function fetchStokData(region) {
  return async (dispatch) => {
    dispatch(stokStartLoading());
    try {
      const data = await dataService.getStokRegion(region);
      dispatch(stokFetchSuccess(data, region));
    } catch (error) {
      console.log('Error:', error);
      dispatch(stokFetchError(error));
    }
  };
}
