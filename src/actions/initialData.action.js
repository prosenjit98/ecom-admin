import axiosInstance from "../helpers/axios"
import { categoryConstants, initialDataConstants, orderConstants, productConstants } from "./constants"

export const getInitialData = (req, res) => {
  return async dispatch => {
    const res = await axiosInstance.post('/initialData')
    const { categories, products, orders } = res.data;
    console.log(orders)
    if (res.status === 200) {
      dispatch({ type: categoryConstants.GET_ALL_CATEGORY_SUCCESS, payload: categories })
      dispatch({ type: productConstants.GET_ALL_PRODUCT_SUCCESS, payload: products })
      dispatch({ type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS, payload: orders })
    }
    else {
      dispatch({ type: categoryConstants.GET_ALL_CATEGORY_FAILURE })
    }
  }
}