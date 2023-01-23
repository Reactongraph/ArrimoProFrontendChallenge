import {
  GET_USERS,
  EDIT_USER_ID,
  DELETE_USER,
  UPDATE_USERS,
  LOGIN_USER_ID,
  LOGIN_USER,
  SIGNUP_USER,
} from "./userActions";

const initialstate = {
  getUsers: [],
  loginUserId: "",
  editUserId: "",
};

const userReducer = (state = initialstate, actions) => {
  switch (actions.type) {
    case GET_USERS:
      return {
        ...state,
        getUsers: actions.users,
      };

    case LOGIN_USER:
      return {
        ...state,
        getUsers: actions.users,
      };

    case SIGNUP_USER:
      return {
        ...state,
        getUsers: actions.users,
      };

    case LOGIN_USER_ID:
      return {
        ...state,
        loginUserId: actions.payload,
      };

    case EDIT_USER_ID:
      return {
        ...state,
        editUserId: actions.payload,
      };

    case UPDATE_USERS:
      return {
        ...state,
        getUsers: actions.users,
      };

    case DELETE_USER:
      return {
        ...state,

        getUsers: state.getUsers.filter((item) => item._id !== actions.payload),
      };

    default:
      return state;
  }
};

export default userReducer;
