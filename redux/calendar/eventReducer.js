import { GET_EVENTS, DELETE_EVENT, EDIT_EVENT } from "./eventActions";

const initialstate = {
  getEvents: [],
};

const eventReducer = (state = initialstate, actions) => {
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
      return {
        ...state,
        getEvents: actions.payload,
      };

    default:
      return state;
  }
};

export default eventReducer;
