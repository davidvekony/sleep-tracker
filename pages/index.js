import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Addchart, Bed, Search } from "@mui/icons-material";
import Link from "@mui/material/Link";

export default function HomePage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          pt: 8,
          pb: 6,
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Sleep Tracker
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Something short and leading about the importance of sleep, healthy
          habits, etc. Make it short and sweet, but not too short so folks
          don&apos;t simply skip over it entirely.
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained">
            <Link href="/signup" color="inherit" underline="none">
              Sign up
            </Link>
          </Button>
          <Button variant="outlined">
            {" "}
            <Link href="/login" color="inherit" underline="none">
              {" "}
              Log in{" "}
            </Link>{" "}
          </Button>
        </Stack>
      </Box>
      <Box sx={{ pt: 4, pb: 4 }}>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          justifyContent="center"
          spacing={3}
        >
          <Card
            sx={{
              minWidth: 275,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Addchart fontSize="large" />
              <Typography variant="h5" component="div" align="center">
                Track your sleep
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              minWidth: 275,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Bed fontSize="large" />
              <Typography variant="h5" component="div" align="center">
                Optimise your routine
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              minWidth: 275,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Search fontSize="large" />
              <Typography variant="h5" component="div" align="center">
                Identify issues
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Container>
  );
}
