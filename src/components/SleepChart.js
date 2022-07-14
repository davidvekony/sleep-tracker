import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Typography from "@mui/material/Typography";
import DayToggle from "./DayToggle";
import Box from "@mui/material/Box";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: false,
    },
  },

  scales: {
    x: {
      grid: {
        display: true,
      },
      ticks: {
        color: "#fff",
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#fff",
      },
    },
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ sleepData }) => {
  if (!sleepData || sleepData.length <= 0) {
    return (
      <Typography variant="h6" gutterBottom component="div">
        There is no data to display.
      </Typography>
    );
  }

  const labels = [
    ...sleepData.map((sleep) => {
      const date = sleep.sleepTime;
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${day}/${month}`;
    }),
  ];

  const sleepDurationData = [
    ...sleepData.map((sleep) => {
      return sleep.sleepDuration;
    }),
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: sleepDurationData,
        borderColor: "#FFA500",
        backgroundColor: "#FFE5B4",
      },
    ],
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <DayToggle />
      </Box>
      <Line options={options} data={data} />
    </>
  );
};

export default Chart;
