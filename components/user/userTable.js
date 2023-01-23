import { Form, Table, Typography, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { EditUserId, GetUsers } from "../../redux/users/userActions";
import { useRouter } from "next/dist/client/router";
import DeleteModal from "./DeleteUserModal";

const UserTable = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUsers());
  }, []);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const LoginUserId = useSelector((state) => state.users.loginUserId);

  const Users = useSelector((state) => state.users.getUsers);

  const [form] = Form.useForm();

  const [data, setData] = useState(Users);
  const [editingKey, setEditingKey] = useState("");

  const cancel = () => {
    setEditingKey("");
  };

  const handleDelete = async (deleteId) => {
    setDeleteUserId(deleteId);
    setDeleteModal(!deleteModal);
  };

  const editHandler = (editId) => {
    dispatch(EditUserId(editId));
    router.push(`/users/update/${editId}`);
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "Age",
      dataIndex: "age",
      width: "15%",
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "30%",
    },
    {
      title: "Actions",
      dataIndex: "operation",
      width: "20%",
      render: (_, record) => {
        return (
          <>
            {LoginUserId === record.email ? (
              <Typography.Link
                onClick={() => editHandler(record._id)}
                style={{ marginRight: 12 }}
              >
                Edit
              </Typography.Link>
            ) : (
              <>
                <Typography.Link
                  onClick={() => editHandler(record._id)}
                  style={{ marginRight: 12 }}
                >
                  Edit
                </Typography.Link>
                <Typography.Link
                  style={{ color: "red" }}
                  onClick={() => handleDelete(record._id)}
                >
                  Delete
                </Typography.Link>
              </>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <Form form={form} component={false}>
        {deleteModal ? (
          <DeleteModal deleteUserId={deleteUserId} setData={setData} />
        ) : (
          <></>
        )}
        <Button
          onClick={() => router.push("/users/create")}
          type="primary"
          style={{
            marginBottom: 16,
            backgroundColor: "rgb(50, 72, 93)",
          }}
          shape="default"
          size="large"
        >
          Add user
        </Button>
      </Form>
      <Table
        bordered
        rowKey={data=>data._id}
        loading={!Users}
        dataSource={data}
        columns={columns}
        pagination={{
          onChange: cancel,
        }}
      />
    </>
  );
};
export default UserTable;
