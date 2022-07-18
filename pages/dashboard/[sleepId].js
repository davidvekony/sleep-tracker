import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import SleepRating from "../../src/components/SleepRating";
import { fetchSingleLog, updateSleepData } from "../../src/utils/useSleepData";

function UpdateSleepPage() {
  const [loading, setLoading] = useState(true);
  const [sleepTime, setSleepTime] = useState(null);
  const [wakeUpTime, setWakeUpTime] = useState(null);
  const [rating, setRating] = useState(null);

  const router = useRouter();
  const { sleepId } = router.query;

  useEffect(() => {
    fetchSingleLog(sleepId)
      .then((data) => {
        setSleepTime(data.sleepTime);
        setWakeUpTime(data.wakeUpTime);
        setRating(data.rating);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error);
      });
  }, []);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    updateSleepData(sleepId, sleepTime, wakeUpTime, rating)
      .then((docRef) => {
        setLoading(false);
        router.push("/dashboard");
      })
      .catch((error) => {
        toast.error(error);
        setLoading(false);
      });
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
          <Link underline="hover" color="inherit" href="/dashboard">
            Dashboard
          </Link>
          <Typography color="text.primary">New Log</Typography>
        </Breadcrumbs>
      </Box>
      <Container maxWidth="sm">
        <Box
          sx={{
            pt: 8,
            pb: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h2">Log Your Sleep</Typography>
            <DateTimePicker
              label="Sleep time"
              name="sleepTime"
              value={sleepTime}
              ampm={false}
              disableFuture={true}
              onChange={(newSleepTime) => {
                setSleepTime(newSleepTime);
              }}
              renderInput={(props) => <TextField {...props} />}
            />
            <DateTimePicker
              label="Wake-up time"
              name="wakeUpTime"
              value={wakeUpTime}
              ampm={false}
              disableFuture={true}
              onChange={(newWakeUpTime) => setWakeUpTime(newWakeUpTime)}
              renderInput={(props) => <TextField {...props} />}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6">Rate your sleep:</Typography>
              <SleepRating
                value={rating}
                handleRatingChange={handleRatingChange}
                disabled={false}
              />
            </Box>
            {loading ? (
              <LoadingButton loading variant="outlined">
                Submitting...
              </LoadingButton>
            ) : (
              <Button
                variant="contained"
                disabled={(!sleepTime || !wakeUpTime) && true}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            )}
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export default UpdateSleepPage;
