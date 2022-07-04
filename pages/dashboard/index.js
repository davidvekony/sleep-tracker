import { useAuth } from "../../src/context/AuthContext";
import Button from "@mui/material/Button";

function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}

export default DashboardPage;
