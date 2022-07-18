import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Hotel } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton href="/">
            <Hotel sx={{ mr: 2 }} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sleep Tracker
          </Typography>
          {user ? (
            <Button
              variant="outlined"
              onClick={() => {
                logout();
              }}
            >
              Log out
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  router.push("/signup");
                }}
                sx={{ ml: 2 }}
              >
                Sign up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
