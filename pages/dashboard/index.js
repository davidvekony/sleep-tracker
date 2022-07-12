import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase.config";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import SleepChart from "../../src/components/SleepChart";
import SleepStats from "../../src/components/SleepStats";
import { useAuth } from "../../src/context/AuthContext";

function DashboardPage() {
  const { user } = useAuth();
  const [sleepData, setSleepData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSleepData = async () => {
      const sleepDataCopy = [];
      const q = query(
        collection(db, "sleep"),
        where("user", "==", user.uid),
        orderBy("sleepTime")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        sleepDataCopy.push(doc.data());
        // console.log(doc.id, " => ", doc.data());
      });
      sleepDataCopy.forEach((sleep) => {
        sleep.sleepTime = sleep.sleepTime.toDate();
        sleep.wakeUpTime = sleep.wakeUpTime.toDate();
      });
      setSleepData(sleepDataCopy);
      setLoading(false);
      console.log(sleepDataCopy);
    };
    try {
      fetchSleepData();
    } catch (error) {
      toast.error(error);
    }
  }, []);

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
