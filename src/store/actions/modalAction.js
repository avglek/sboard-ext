import DataService from "../../services/DataService";
import {
  MODAL_IS_OPEN,
  MODAL_FETCH_ERRORED,
  MODAL_START_LOADING,
  MODAL_FETCH_DATA_SUCCESS,
} from "./actionTypes";

const dataService = new DataService();

export function ModalIsOpen(bool) {
  return {
    type: MODAL_IS_OPEN,
    isModalOpen: bool,
  };
}

export function modalFetchError(e) {
  return {
    type: MODAL_FETCH_ERRORED,
    error: e,
  };
}

export function modalStartLoading() {
  return {
    type: MODAL_START_LOADING,
  };
}

export function modalFetchDataSuccess(items) {
  return {
    type: MODAL_FETCH_DATA_SUCCESS,
    items,
  };
}

export function modalFetchData(id) {
  return async (dispatch) => {
    dispatch(modalStartLoading());
    try {
      const data = await dataService.getPokaz(id);
      dispatch(modalFetchDataSuccess(data));
    } catch (error) {
      console.log("Error:", error);
      dispatch(modalFetchError(error));
    }
  };
}

export function modalStormFetchData(id) {
  return async (dispatch) => {
    dispatch(modalStartLoading());
    try {
      const data = await dataService.getStormPokaz(id);
      dispatch(modalFetchDataSuccess(data));
    } catch (error) {
      console.log("Error:", error);
      dispatch(modalFetchError(error));
    }
  };
}
