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