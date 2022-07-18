import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import NightlightIcon from "@mui/icons-material/Nightlight";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#FFA500",
  },
  "& .MuiRating-iconHover": {
    color: "#FFE5B4",
  },
});

function SleepRating({ value, handleRatingChange, readOnly }) {
  return (
    <StyledRating
      name="customised-rating"
      value={value}
      readOnly={readOnly}
      getLabelText={(value) => `${value} Moon${value !== 1 ? "s" : ""}`}
      precision={1}
      icon={<NightlightIcon fontSize="inherit" />}
      emptyIcon={<NightlightOutlinedIcon fontSize="inherit" />}
      onChange={(event, newValue) => {
        handleRatingChange(newValue);
      }}
    />
  );
}

export default SleepRating;
