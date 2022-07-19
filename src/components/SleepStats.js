import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useRouter } from "next/router";

import SleepRating from "./SleepRating";

function SleepStats({ sleepData, deleteSleep }) {
  const router = useRouter();

  if (!sleepData || sleepData.length <= 0) {
    return <></>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Sleep date</TableCell>
            <TableCell align="right">Sleep time</TableCell>
            <TableCell align="right">Wake-up time</TableCell>
            <TableCell align="right">Sleep duration</TableCell>
            <TableCell align="right">Sleep Quality</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {sleepData.map((sleep) => (
            <TableRow
              key={sleep.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {sleep.sleepTime.toString().slice(0, 10)}
              </TableCell>
              <TableCell align="right">
                {sleep.sleepTime.toString().slice(16, 21)}
              </TableCell>
              <TableCell align="right">
                {sleep.wakeUpTime.toString().slice(16, 21)}
              </TableCell>
              <TableCell align="right">{sleep.sleepDuration}</TableCell>
              <TableCell align="right">
                <SleepRating value={sleep.rating} readOnly={true} />
              </TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => router.push(`/dashboard/${sleep.id}`)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteSleep(sleep.id)}>
                  <DeleteForeverIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SleepStats;
