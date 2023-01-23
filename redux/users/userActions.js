import axios from "axios";
const baseUri = process.env.NEXT_PUBLIC_BASE_URL;
import createNotification from "../../components/common/helperFile";

export const LOGIN_USER = "LOGIN_USER";
export const SIGNUP_USER = "SIGNUP_USER";
export const GET_USERS = "GET_USERS";
export const LOGIN_USER_ID = "LOGIN_USER_ID";
export const EDIT_USER_ID = "EDIT_USER_ID";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USERS = "UPDATE_USERS";

export const SignupUser = (payload) => {
  return (dispatch) => {
    axios
      .post(`${baseUri}/api/signup`, payload.values)
      .then((res) => {
        localStorage.setItem("userToken", res.data);

        axios.get(`${baseUri}/api/users`).then((res) => {
          const allUsers = res.data;
          createNotification(payload.message, "success");
          dispatch({
            type: SIGNUP_USER,
            users: allUsers,
          });
        });
      })
      .catch((err) => {
        createNotification(err.response.data.message, "error");
        console.log("error in request", err);
      });
  };
};

export const LoginUser = (payload) => {
  return (dispatch) => {
    axios
      .post(`${baseUri}/api/login`, payload)
      .then((res) => {
        localStorage.setItem("userToken", res.data);

        axios.get(`${baseUri}/api/users`).then((res) => {
          const allUsers = res.data;
      
          createNotification(" Login successful", "success");
          dispatch({
            type: LOGIN_USER,
            users: allUsers,
          });
        });
      })
      .catch((err) => {
        createNotification("Invalid details", "error");
        console.log("error in request", err);
      });
  };
};

export const GetUsers = () => {
  return (dispatch) => {
    axios
      .get(`${baseUri}/api/users`)
      .then((res) => {
        const allUsers = res.data;
        dispatch({
          type: GET_USERS,
          users: allUsers,
        });
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };
};

export const LoginUserId = (payload) => {
  return {
    type: LOGIN_USER_ID,
    payload,
  };
};

export const EditUserId = (payload) => {
  return {
    type: EDIT_USER_ID,
    payload,
  };
};

export const UpdateUsers = (payload) => {

  return (dispatch) => {
    
    axios
      .get(`${baseUri}/api/users`)
      .then((response) => {
        const allUsers = response.data;
        axios
          .patch(`${baseUri}/api/updateUser/${payload.Id}`, payload.values)
          .then((res) => {
            const updatedValue = res.data;
            for (let i = 0; i < allUsers.length; i++) {
              if (allUsers[i]._id === payload.Id) {
                allUsers[i] = updatedValue;
                dispatch({
                  type: UPDATE_USERS,
                  users: allUsers,
                });
                break;
              }
            }
          });
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };
};

export const DeleteUser = (payload) => {
  return (dispatch) => {
    axios.delete(`${baseUri}/api/deleteUser/${payload}`);

    dispatch({
      type: DELETE_USER,
      payload,
    });
  };
};
