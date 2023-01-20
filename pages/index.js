import { useEffect } from "react";
import router from "next/router";
import Login from "./auth/login";

export default function Home() {
  useEffect(() => {
    router.push("/auth/login");
  });
  return <Login />;
}
