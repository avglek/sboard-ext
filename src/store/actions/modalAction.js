import {
  MODAL_IS_OPEN,
  MODAL_FETCH_ERRORED,
  MODAL_START_LOADING,
  MODAL_FETCH_DATA_SUCCESS,
} from "./actionTypes";

export function ModalIsOpen(bool) {
  // console.log("action open modal:", bool);
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

export function modalFetchData(url) {
  return async (dispatch) => {
    dispatch(modalStartLoading());

    try {
      const response = await fetch(url);
      //console.log("response server:", response);
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        const body = await response.json();
        dispatch(modalFetchDataSuccess(body));
      }
    } catch (e) {
      dispatch(modalFetchError(e));
    }
  };
}
