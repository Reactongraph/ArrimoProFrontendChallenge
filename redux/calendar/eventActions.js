export const GET_EVENTS = "GET_EVENTS";
export const DELETE_EVENT= "DELETE_EVENT"
export const EDIT_EVENT= "EDIT_EVENT"

export const GetEvents = (payload) => {
  return {
    type: GET_EVENTS,
    payload,
  };
};

export const DeleteEvent = (payload) => {
  return {
    type: DELETE_EVENT,
    payload,
  };
};

export const EditEvent = (payload) => {
  return {
    type: EDIT_EVENT,
    payload,
  };
}
