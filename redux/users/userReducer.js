import { GET_USERS, EDIT_USER, DELETE_USER,UPDATE_USERS } from "./userActions";
import { loadState } from "../localStorage";

const persistedState = loadState();

const initialstate = {
  getUsers: [],
  editUserId: "",
  getUserEmail: "",
};

const userReducer = (state = persistedState?.user || initialstate, actions) => {
  switch (actions.type) {
    case GET_USERS:
      console.log(actions.payload, "actions.payload");
      return {
        ...state,
        getUsers: actions.payload,
      };

    case EDIT_USER:
      return {
        ...state,
        editUserId: actions.payload,
      };

    case UPDATE_USERS:
      return {
        ...state,
        getUsers: actions.payload,

      };

    case DELETE_USER:
      return {
        ...state,

        getUsers: state.getUsers.filter((item) => item.key !== actions.payload),
      };

    default:
      return state;
  }
};

export default userReducer;
