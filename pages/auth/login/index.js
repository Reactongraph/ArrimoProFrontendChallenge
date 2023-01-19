import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, Form, Typography } from "antd";
const { Title } = Typography;
import { useRouter } from "next/dist/client/router";
import axios from "axios";
const baseUri = process.env.NEXT_PUBLIC_BASE_URL;
import createNotification from "../../../components/common/helperFile";

const Login = () => {
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      axios
        .post(`${baseUri}/login`, {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          createNotification(" Login successfull", "success");
          localStorage.setItem("userToken", res.data.token);
          router.push("/users");
        })
        .catch((err) => {
          createNotification("Invalid details", "error");
          console.log("error in request", err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      labelCol={{
        span: 3,
      }}
      wrapperCol={{
        span: 12,
      }}
      style={{ paddingLeft: "36%", paddingTop: "10%" }}
    >
      <Title level={3} style={{marginBottom: 32 }}>
        Login
      </Title>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
          type="email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>{" "}
        Or{" "}
        <Typography.Link
          onClick={(e) => {
            e.preventDefault;
            router.push("/auth/signup");
          }}
        >
          Register
        </Typography.Link>
      </Form.Item>
    </Form>
  );
};

export default Login;
