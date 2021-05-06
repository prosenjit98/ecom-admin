import axiosInstance from "../helpers/axios";
import { pageConstants } from "./constants"

export const createPage = (form) => {
  return async dispatch => {
    dispatch({ type: pageConstants.CREATE_PAGE_REQUEST });
    try {
      const res = await axiosInstance.post('/page/create', form);
      if (res.status === 201) {
        dispatch({ type: pageConstants.CREATE_PAGE_SUCCESS, payload: { page: res.data } })
      } else {
        dispatch({ type: pageConstants.CREATE_PAGE_FAILURE })
      }
    } catch {
      dispatch({ type: pageConstants.CREATE_PAGE_FAILURE })
    }
  }
}