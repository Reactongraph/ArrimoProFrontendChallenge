import {
  Form,
  Table,
  Typography,
  Button,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { DeleteUser, EditUser } from "../../redux/users/userActions";
import { useRouter } from "next/dist/client/router";

const UserTable = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const Users = useSelector((state) => state.users.getUsers);

  const [form] = Form.useForm();

  const [data, setData] = useState(Users);
  const [editingKey, setEditingKey] = useState("");

  const cancel = () => {
    setEditingKey("");
  };

  const handleDelete = (key) => {
    dispatch(DeleteUser(key));
    setData(data.filter((item) => item.key !== key));
  };

  const editHandler = (key) => {
    router.push(`/users/update/${key}`);
    dispatch(EditUser(key));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
    },
    {
      title: "Age",
      dataIndex: "age",
      width: "15%",
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "40%",
    },
    {
      title: "Actions",
      dataIndex: "operation",
      width: "20%",
      render: (_, record) => {

        return (
          <>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => editHandler(record.key)}
              style={{ marginRight: 12 }}
            >
              Edit
            </Typography.Link>
            <Typography.Link
              style={{ color: "red" }}
              onClick={() => handleDelete(record.key)}
            >
              Delete
            </Typography.Link>
          </>
        );
      },
    },
  ];

  return (
    <>
    <Form form={form} component={false}>
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
