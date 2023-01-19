import VerticalNavbar from "../../components/common/verticalNavbar";
import DemoApp from "../../components/calendar/calendar";
import router from "next/router";
import { useEffect } from "react";

export default function Calendar() {
  useEffect(() => {
    const userId = localStorage.getItem("userToken");
    if (!userId) {
        router.push("/auth/login");
      }
  });
  return (
    <>
      <VerticalNavbar content={<DemoApp/>} />
    </>
  );
}
