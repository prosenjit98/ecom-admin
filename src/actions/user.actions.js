import axiosInstance from "../helpers/axios"
import { isUserLoggedIn } from "./auth.actions"
import { authConstants, userConstants } from "./constants"
export const signup = (user) => {

  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST })
    const res = await axiosInstance.post(`/admin/signup`, {
      ...user
    })

    if (res.status === 201) {
      const { token, user } = res.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: { token, user } })
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE, payload: { error: res.message }
        })
      }
    }
  }
}
