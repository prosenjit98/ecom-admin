import { userConstants } from "../actions/constants";


const initState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: ""
  },
  authenticate: false,
  authenticating: false,
  error: null,
  loading: false,
  message: ''
}

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loding: true
      }
      break;
    case userConstants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
        loading: false,
        message: action.payload.message
      }
      break;
    case userConstants.USER_REGISTER_FAILURE:
      state = {
        ...initState,
        error: action.payload.error
      }
      break
  }

  return state;
}