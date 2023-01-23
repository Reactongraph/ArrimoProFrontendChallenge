import { Modal } from "antd";
import { useState } from "react";
import { DeleteUser } from "../../redux/users/userActions";
import { useDispatch, useSelector } from "react-redux";

const DeleteModal = (props) => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.users.getUsers);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOk = async () => {
    dispatch(DeleteUser(props.deleteUserId));
    props.setData(data.filter((item) => item._id !== props.deleteUserId));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
      style={{marginTop:'10rem'}}
        title="Delete User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to Delete User?</p>
      </Modal>
    </>
  );
};
export default DeleteModal;
