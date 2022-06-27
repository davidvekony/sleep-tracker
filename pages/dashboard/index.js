import { withProtected } from "../../src/hooks/route";
import Button from "@mui/material/Button";

function DashboardPage({ auth }) {
  const { logout } = auth;

  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}

export default withProtected(DashboardPage);
