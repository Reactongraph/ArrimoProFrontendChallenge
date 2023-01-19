export const GET_USERS = "GET_USERS";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USERS= "UPDATE_USERS"

export const GetUsers = (payload) => {
  return {
    type: GET_USERS,
    payload,
  };
};

export const EditUser = (payload) => {
  return {
    type: EDIT_USER,
    payload,
  };
};
export const UpdateUsers = (payload) => {
  return {
    type: UPDATE_USERS,
    payload,
  };
};

export const DeleteUser = (payload) => {
  return {
    type: DELETE_USER,
    payload,
  };
};
