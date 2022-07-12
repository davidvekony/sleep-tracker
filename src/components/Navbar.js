import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sleep Tracker
          </Typography>
          {user ? (
            <Button
              color="inherit"
              onClick={() => {
                logout();
                router.push("/login");
              }}
            >
              Log out
            </Button>
          ) : (
            <>
              <Link href="/login">
                <Button color="inherit">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button color="inherit">Sign up</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
