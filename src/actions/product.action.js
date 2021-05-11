import axiosInstance from "../helpers/axios"
import { productConstants } from "./constants"
import { getInitialData } from "./initialData.action"

export const addProduct = (formdata) => {
  return async dispatch => {
    dispatch({ type: productConstants.CREATE_PRODUCT_REQUEST })
    const res = await axiosInstance.post('/product/create', formdata).then(
      dispatch(getInitialData())
    )
  }
}

export const deleteProductById = (payload) => {
  return async (dispatch) => {
    console.log(payload);
    try {
      const res = await axiosInstance.post('product/deleteProductById', { data: payload })
      dispatch({ type: productConstants.DELETE_PRODUCT_REQUEST })
      if (res.status === 202) {
        dispatch({ type: productConstants.DELETE_PRODUCT_SUCCESS })
        dispatch(getInitialData())
      }
      else {
        dispatch({ type: productConstants.DELETE_PRODUCT_FAILURE })
      }
    } catch (error) {
      dispatch({ type: productConstants.DELETE_PRODUCT_FAILURE })
    }
  }
}