import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function DayToggle() {
  const [daysBack, setDaysBack] = useState(7);

  const handleAlignment = (event, newAlignment) => {
    setDaysBack(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={daysBack}
      exclusive
      onChange={handleAlignment}
      aria-label="number of days to show"
    >
      <ToggleButton value={7} aria-label="7" selected>
        7
      </ToggleButton>
      <ToggleButton value={30} aria-label="30">
        30
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default DayToggle;
