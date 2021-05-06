import axiosInstance from "../helpers/axios"
import { categoryConstants } from "./constants"

const getAllCategory = () => {
  return async dispatch => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST })
    const res = await axiosInstance.get('/category/getcategories')
    if (res.status === 200) {
      dispatch({ type: categoryConstants.GET_ALL_CATEGORY_SUCCESS, payload: res.data })
    }
    else {
      dispatch({ type: categoryConstants.GET_ALL_CATEGORY_FAILURE, payload: res.data.error })
    }
  }
}

export const addCategory = (formData) => {
  return async dispatch => {
    dispatch({ type: categoryConstants.CREATE_CATEGORY_REQUEST })
    const res = await axiosInstance.post(`/category/create`, formData)
    if (res.status === 201) {
      dispatch({ type: categoryConstants.CREATE_CATEGORY_SUCCESS, payload: res.data })
      console.log("creatation complete and fetching all catagory")
      dispatch(getAllCategory())
    }
  }
}

export const updateCategoryData = (formData) => {
  return async dispatch => {
    dispatch({ type: categoryConstants.UPDATE_CATEGORY_REQUEST })
    const res = await axiosInstance.post(`/category/update`, formData)
    if (res.status === 201) {
      dispatch({ type: categoryConstants.UPDATE_CATEGORY_SUCCESS, payload: res.data })
      console.log("creatation complete and fetching all catagory", res)
      dispatch(getAllCategory())
    } else {
      dispatch({
        type: categoryConstants.UPDATE_CATEGORY_FAILURE
      })
    }
  }
}

export const deleteCategoryData = (ids) => {
  return async dispatch => {
    dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST })
    const res = await axiosInstance.post(`/category/delete`, { payload: ids })
    if (res.status === 200) {
      dispatch({ type: categoryConstants.DELETE_CATEGORY_FAILURE, payload: res.data })
      console.log("creatation complete and fetching all catagory", res)
      dispatch(getAllCategory())
    } else {
      console.log(res);
    }
  }
}

export {
  getAllCategory
}

