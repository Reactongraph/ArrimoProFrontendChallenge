import { GET_EVENTS, DELETE_EVENT, EDIT_EVENT } from "./eventActions";
import { loadState } from "../localStorage";

const initialstate = {
  getEvents: [],
};

const persistedState = loadState();

const eventReducer = (
  state = persistedState?.event || initialstate,  
  actions
) => {
  switch (actions.type) {
    case GET_EVENTS:
      return {
        ...state,
        getEvents: actions.payload,
      };
    case DELETE_EVENT:
      return {
        ...state,
        getEvents: state.getEvents.filter(
          (item) => item.id !== actions.payload
          ),
        };
      case EDIT_EVENT:
      console.log("getEvents",state.getEvents, actions.payload)
      return {
        ...state,
        getEvents: actions.payload
      };

    default:
      return state;
  }
};

export default eventReducer;
