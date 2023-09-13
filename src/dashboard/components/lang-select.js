import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { LocaleStrings } from "../grid/components/constants";
import { GridContext } from "../../data";

export default function LocalSelect () {
  const { locale, setLocale } = React.useContext(GridContext);

  const handleChange = (event) => {
    setLocale(event.target.value);
  };

  return (
    <div style={{ marginInlineEnd: "10px" }}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={locale}
        label="Age"
        sx={{ background: "white", height: "50px", borderRadius: "10px", paddingInline: "10px" }}
        onChange={handleChange}
        variant='standard'
        placeholder='Select target language'
      >
        {
          Object.keys(LocaleStrings).map((key) => {
            return <MenuItem value={key} key={key}>{LocaleStrings[key]}</MenuItem>;
          })
        }
      </Select>
    </div>
  );
}
