import { notification } from "antd";

const createNotification = (message, type) => {
  notification[type]({
    message: message,
  });
};
export default createNotification;