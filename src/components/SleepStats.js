import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { v4 as uuidv4 } from "uuid";

function SleepStats({ sleepData }) {
  if (!sleepData || sleepData.length <= 0) {
    return <></>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Sleep date</TableCell>
            <TableCell align="right">Sleep time</TableCell>
            <TableCell align="right">Wake-up time</TableCell>
            <TableCell align="right">Sleep duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sleepData.map((sleep) => (
            <TableRow
              key={uuidv4()}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SleepStats;
