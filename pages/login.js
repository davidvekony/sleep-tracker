import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import IconButton from "@mui/material/IconButton";
import GoogleIcon from "@mui/icons-material/Google";

import { useAuth } from "../src/context/AuthContext";

function LoginPage() {
  const { login, signInWithGoogle } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    await login(data.get("email"), data.get("password"));
  };

  return (
    <>
      <Box
        sx={{
          pl: 3,
          pt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Login</Typography>
        </Breadcrumbs>
      </Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Grid
              container
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="body2" sx={{ mt: 2 }}>
                Or Sign In using:
              </Typography>
              <IconButton
                color="secondary"
                sx={{ mt: 2 }}
                onClick={() => {
                  signInWithGoogle();
                }}
              >
                <GoogleIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item container justifyContent="flex-end">
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default LoginPage;
