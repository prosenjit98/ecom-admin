import { pageConstants } from "../actions/constants"

const initStage = {
  error: null,
  loading: false,
  message: "",
  page: {}
}

export default (state = initStage, action) => {
  switch (action.type) {
    case pageConstants.CREATE_PAGE_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case pageConstants.CREATE_PAGE_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: "Succssfully created"
      }
      break;
    case pageConstants.CREATE_PAGE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: "failed! cannot be created"
      }
  }
  return state
}