import {
  UserOutlined,
  LockOutlined,
  HomeOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Input, Form, Typography } from "antd";
const { Title } = Typography;
import router from "next/router";
import { useDispatch } from "react-redux";
import { LoginUserId, SignupUser } from "../../../redux/users/userActions";

const Signup = () => {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    try {
      dispatch(LoginUserId(values.email));
      const message = "Registration Successful";
      dispatch(SignupUser({ values: values, message: message }));

      setTimeout(() => {
        router.push("/users");
      }, 2000);
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
      style={{ paddingLeft: "36%", paddingTop: "5%" }}
    >
      <Title level={3} style={{ marginBottom: 32 }}>
        Signup
      </Title>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your name !",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Name"
        />
      </Form.Item>
      <Form.Item
        name="age"
        rules={[
          {
            required: true,
            message: "Please input your age !",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Age"
          type="number"
        />
      </Form.Item>
      <Form.Item
        name="address"
        rules={[
          {
            required: true,
            message: "Please input your address !",
          },
        ]}
      >
        <Input
          prefix={<HomeOutlined className="site-form-item-icon" />}
          placeholder="Address"
        />
      </Form.Item>
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
          prefix={<MailOutlined className="site-form-item-icon" />}
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
      already have an account?{" "}
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
