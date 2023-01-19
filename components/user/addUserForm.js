import { Button, Form, Input, Typography } from "antd";
const { Title } = Typography;
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { GetUsers } from "../../redux/users/userActions";

const AddUserForm = () => {
  const users = useSelector((state) => state.users.getUsers);

  const router = useRouter();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    const newUser = values;
    newUser.key = (Math.random() + 1).toString(36).substring(1);

    console.log("Success:", newUser);

    dispatch(GetUsers([...users, newUser]));
    router.push("/users");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 3,
      }}
      wrapperCol={{
        span: 14,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{
        display: "block",
      }}
    >
      <Title level={3} style={{ marginBottom: 32 }}>
        Create User
      </Title>

      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input type="text" placeholder="Name*" style={{ height: "3rem" }} />
      </Form.Item>

      <Form.Item
        name="age"
        rules={[
          {
            required: true,
            message: "Please input your age!",
          },
        ]}
      >
        <Input type="number" placeholder="Age*" style={{ height: "3rem" }} />
      </Form.Item>

      <Form.Item
        name="address"
        rules={[
          {
            required: true,
            message: "Please input your address!",
          },
        ]}
      >
        <Input type="text" placeholder="Address*" style={{ height: "3rem" }} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 0,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddUserForm;
