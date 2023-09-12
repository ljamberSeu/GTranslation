import * as React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { GridContext } from "../../data";

export default function DatePickerComponent () {
  const { startDate, setStartDate } = React.useContext(GridContext);

  return (
    <div style={{ marginInlineEnd: "10px" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={startDate}
          sx={{ background: "white", height: "50px", borderRadius: "10px" }}
          onChange={(newValue) => setStartDate(newValue)}
        />
      </LocalizationProvider>
    </div>
  );
}
