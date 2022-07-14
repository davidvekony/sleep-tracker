import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  return <>{user ? children : null}</>;
};

export default ProtectedRoutes;
