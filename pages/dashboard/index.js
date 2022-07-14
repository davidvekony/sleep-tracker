import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useAuth } from "../../src/context/AuthContext";
import { fetchSleepData } from "../../src/utils/useSleepData";
import { toast } from "react-toastify";

import SleepChart from "../../src/components/SleepChart";
import SleepStats from "../../src/components/SleepStats";

function DashboardPage() {
  const [sleepData, setSleepData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    fetchSleepData(user)
      .then((data) => {
        setSleepData(data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [user]);

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
          <Typography color="text.primary">Dashboard</Typography>
        </Breadcrumbs>
      </Box>
      <Container>
        <Box
          sx={{
            pt: 8,
            pb: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Stack spacing={3} sx={{ width: "100%", alignItems: "center" }}>
              <Link href="/dashboard/new">
                <Button variant="contained">Log sleep</Button>
              </Link>
              <SleepChart sleepData={sleepData} />
              <SleepStats sleepData={sleepData} />
            </Stack>
          )}
        </Box>
      </Container>
    </>
  );
}

export default DashboardPage;
