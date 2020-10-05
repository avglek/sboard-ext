import {
  NAVBAR_FETCH_ERRORED,
  NAVBAR_FETCH_DATA_SUCCESS,
  NAVBAR_START_LOADING,
} from "./actionTypes";

const KEY = "left_box";

export function navbarFetchError(error) {
  return {
    type: NAVBAR_FETCH_ERRORED,
    error,
  };
}

export function navbarStartLoading() {
  return {
    type: NAVBAR_START_LOADING,
  };
}

export function navbarFetchDataSuccess(items) {
  return {
    type: NAVBAR_FETCH_DATA_SUCCESS,
    items,
  };
}

export function navbarFetchDataSlow(url) {
  const slowPromise = () => new Promise((resolve) => setTimeout(resolve, 3000));

  return async () => {
    await slowPromise();
    navbarFetchData(url);
  };
}

export function navbarFetchData(url) {
  return async (dispatch) => {
    dispatch(navbarStartLoading());

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        const body = await response.json();
        dispatch(navbarFetchDataSuccess(body[KEY]));
      }
    } catch (err) {
      dispatch(navbarFetchError(err));
    }
  };
}
