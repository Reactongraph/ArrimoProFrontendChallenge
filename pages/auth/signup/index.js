import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Input, Form, Typography, Link } from "antd";
const { Title } = Typography;
import router from "next/router";
import axios from "axios";
const baseUri = process.env.NEXT_PUBLIC_BASE_URL;
import createNotification from "../../../components/common/helperFile";

const Signup = () => {
  const onFinish = (values) => {
    try {
      axios
        .post(`${baseUri}/signup`, {
          email: values.email,
          password: values.password,
          cpassword: values.cpassword,
        })
        .then((res) => {
          createNotification("Registration Successfull", "success");
          localStorage.setItem("userToken", res.data.token);
          router.push("/users");
        })
        .catch((err) => {
          createNotification(err.response.data.message, "error");
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
      <Title level={3} style={{ marginBottom: 32 }}>
        Signup
      </Title>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email !",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="cpassword"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Sign up
        </Button>{" "}
      </Form.Item>
      already have an account? {" "}
      <Typography.Link
        onClick={(e) => {
          e.preventDefault;
          router.push("/auth/login");
        }}
      >
        Login
      </Typography.Link>
    </Form>
  );
};
export default Signup;
