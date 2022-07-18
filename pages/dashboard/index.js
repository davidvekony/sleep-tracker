import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

import { useAuth } from "../../src/context/AuthContext";
import {
  fetchSleepData,
  filterSleepData,
  deleteSleepData,
} from "../../src/utils/useSleepData";
import SleepChart from "../../src/components/SleepChart/SleepChart";
import SleepStats from "../../src/components/SleepStats";

function DashboardPage() {
  const [sleepData, setSleepData] = useState(null);
  const [filteredSleepData, setFilteredSleepData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    fetchSleepData(user)
      .then((data) => {
        setSleepData(data);
        setFilteredSleepData(filterSleepData(data, 7));
        setLoading(false);
        console.log(sleepData);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error);
      });
  }, [user]);

  const changeFilter = (daysBack) => {
    setFilteredSleepData(filterSleepData(sleepData, daysBack));
  };

  const deleteSleep = async (sleepId) => {
    setLoading(true);
    await deleteSleepData(sleepId);
    const newSleepData = sleepData.filter((sleep) => sleep.id !== sleepId);
    setSleepData(newSleepData);
    setFilteredSleepData(filterSleepData(newSleepData, 7));
    setLoading(false);
    toast.success("Sleep log deleted");
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
              <SleepChart
                filteredSleepData={filteredSleepData}
                changeFilter={changeFilter}
              />
              <SleepStats sleepData={sleepData} deleteSleep={deleteSleep} />
              <Link href="/dashboard/new">
                <Button variant="contained">Log sleep</Button>
              </Link>
            </Stack>
          )}
        </Box>
      </Container>
    </>
  );
}

export default DashboardPage;
