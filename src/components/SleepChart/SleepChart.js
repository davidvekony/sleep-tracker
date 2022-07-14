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
import Box from "@mui/material/Box";

import DayToggle from "./DayToggle";

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

const Chart = ({ filteredSleepData, changeFilter }) => {
  if (!filteredSleepData || filteredSleepData.length <= 0) {
    return (
      <Typography variant="h6" gutterBottom component="div">
        There is no data to display.
      </Typography>
    );
  }

  const labels = [
    ...filteredSleepData.map((sleep) => {
      const date = sleep.sleepTime;
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${day}/${month}`;
    }),
  ];

  const sleepDurationData = [
    ...filteredSleepData.map((sleep) => {
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
        <DayToggle changeFilter={changeFilter} />
      </Box>
      <Line options={options} data={data} />
    </>
  );
};

export default Chart;
