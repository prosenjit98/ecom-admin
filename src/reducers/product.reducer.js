import { productConstants } from "../actions/constants"

const initState = {
  loading: false,
  products: [],
  error: null,
  message: ''
}

export default (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break
    case productConstants.GET_ALL_PRODUCT_SUCCESS: {
      state = {
        ...state,
        products: action.payload,
        loading: false
      }
    }
  }
  return state;
}