import axiosInstance from "../helpers/axios";
import { orderConstants } from "./constants"

export const updateOrder = (payload) => {
  return async dispatch => {
    dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_REQUEST });
    console.log(payload)
    try {
      const res = await axiosInstance.post('/order/update', payload);
      if (res.status === 201) {
        console.log(res)
        dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS, payload: { page: res.data } })
      } else {
        console.log(res)
        dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE })
      }
    } catch (error) {
      console.log(error)
      dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE })
    }
  }
}

export const getCustomerOrder = () => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.GET_CUSTOMER_ORDER_REQUEST })
    try {
      const res = await axiosInstance.post("/order/getCustomerOrders");
      if (res.status === 200) {
        const { orders } = res.data;
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
          payload: { orders }
        })
      } else {
        const { error } = res.error
        dispatch({ type: orderConstants.GET_CUSTOMER_ORDER_FAILURE, payload: error })
      }
    } catch (error) {
      dispatch({ type: orderConstants.GET_CUSTOMER_ORDER_FAILURE, payload: error })
    }
  }
}