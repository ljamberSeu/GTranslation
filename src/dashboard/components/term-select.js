import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const Libs = {
  ads: "Ads Term Library",
  crypto: "Crypto Term Library",
  payment: "Payment Term Library"
};

export default function TermSelect () {
  const [lib, setLab] = React.useState(Libs.crypto);

  return (
    <div style={{ marginInlineEnd: "10px", gap: "30px", display: "flex" }}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select-term"
        value={lib}
        label="Age"
        sx={{ background: "white", height: "50px", borderRadius: "10px", paddingInline: "10px" }}
        onChange={(event) => setLab(event.target.value)}
        variant='standard'
        placeholder='Select term Library'
      >
        {
          Object.keys(Libs).map((key) => {
            return <MenuItem value={Libs[key]} key={key}>{Libs[key]}</MenuItem>;
          })
        }
      </Select>
      <Button color="secondary" >
        <AddIcon color='secondary' />
          Add more term in {lib}
      </Button>
    </div>
  );
}
