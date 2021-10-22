import {
  ABANDONED_FETCH_ERROR,
  ABANDONED_FETCH_SUCCESS,
  ABANDONED_START_LOADING,
} from '../actions/actionTypes'

const initialState = {
  items: null,
  loading: false,
  error: null,
  region: 0,
}

const abandonedReducer = (state = initialState, action) => {
  switch (action.type) {
    case ABANDONED_START_LOADING:
      return {
        ...state,
        loading: true,
        items: null,
        region: 0,
      }
    case ABANDONED_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        region: 0,
      }
    case ABANDONED_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: action.payload.items,
        region: action.payload.region,
      }
    default:
      return state
  }
}

export default abandonedReducer
