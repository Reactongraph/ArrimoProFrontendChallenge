import VerticalNavbar from "../../../components/common/verticalNavbar";
import AddUserForm from "../../../components/user/addUserForm";
import router from "next/router";
import { useEffect } from "react";

export default function Users() {
  useEffect(() => {
    const userId = localStorage.getItem("userToken");
    if (!userId) {
      router.push("/auth/login");
    }
  });

  return (
    <>
      <VerticalNavbar content={<AddUserForm />} />
    </>
  );
}
