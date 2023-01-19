import { GET_EVENTS, DELETE_EVENT, EDIT_EVENT } from "./eventActions";
import { loadState } from "../localStorage";

const persistedState = loadState();

const initialstate = {
  getEvents: [],
};

const editEvent = (data) => {
  const allEvents = persistedState?.event.getEvents;
  try {
    for (let i = 0; i < allEvents.length; i++) {
      if (allEvents[i].id === data.id) {
        allEvents[i].start = data.start;  
        allEvents[i].end = data.end;   

        return allEvents;
      }
    }
  } catch (error) {
    console.log(error, "error");
  }
};

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
      return {
        ...state,
        getEvents: editEvent(actions.payload),
      };

    default:
      return state;
  }
};

export default eventReducer;
