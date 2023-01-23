import { Formik } from "formik";
import { Button, Form, Input, Title } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUsers } from "../../redux/users/userActions";
import { useRouter } from "next/router";
import createNotification from "../common/helperFile";
const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "First name is required";
  }
  if (!values.age) {
    errors.age = "Age is required";
  }
  if (!values.address) {
    errors.address = "Address is required";
  }

  return errors;
};

export default function EditUserForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const EditUserId = useSelector((state) => state.users.editUserId);
  const users = useSelector((state) => state.users.getUsers);

  const filteredUser = users?.filter((e) => {
    return e._id === EditUserId;
  });

  const initialValues = {
    name: filteredUser[0]?.name,
    age: filteredUser[0]?.age,
    address: filteredUser[0]?.address,
  };

  const editUser = async (values) => {
    try {
      dispatch(UpdateUsers({ Id: EditUserId, values: values }));
      createNotification(" User updated successfully", "success");
      setTimeout(() => {
        router.push("/users");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={editUser}
        enableReinitialize={true}
      >
        {(formik) => {
          const { values, handleChange, handleSubmit } = formik;
          return (
            <Form
              name="basic"
              style={{
                display: "grid",
              }}
              onFinish={handleSubmit}
            >
              <h1>Edit User</h1>

              <Input
                value={values.name}
                onChange={handleChange}
                type="text"
                placeholder="Name*"
                style={{ height: "3rem", width: "50%", marginBottom: 24 }}
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              />
              <Input
                value={values.age}
                onChange={handleChange}
                type="number"
                placeholder="Age*"
                style={{ height: "3rem", width: "50%", marginBottom: 24 }}
                name="age"
                rules={[
                  {
                    required: true,
                    message: "Please input your age!",
                  },
                ]}
              />

              <Input
                onChange={handleChange}
                value={values.address}
                type="text"
                placeholder="Address*"
                style={{ height: "3rem", width: "50%", marginBottom: 24 }}
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input your address!",
                  },
                ]}
              />

              <Form.Item
                wrapperCol={{
                  offset: 0,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
