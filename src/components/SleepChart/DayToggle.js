import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function DayToggle({ changeFilter }) {
  const [daysBack, setDaysBack] = useState(7);

  const handleFilter = (event, newFilter) => {
    setDaysBack(newFilter);
    changeFilter(newFilter);
  };

  return (
    <ToggleButtonGroup
      value={daysBack}
      exclusive
      onChange={handleFilter}
      aria-label="number of days to show"
    >
      <ToggleButton value={7} aria-label="7">
        7 days
      </ToggleButton>
      <ToggleButton value={30} aria-label="30">
        30 days
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default DayToggle;
