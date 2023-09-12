import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import { headCells } from "../grid-config";
import MenuItem from "@mui/material/MenuItem";
import { StringCondition } from "../../components/api/api-list";

const StringConditionNameMap = {
  [StringCondition.EQUALS]: "Equals",
  [StringCondition.STARTS_WITH]: "Starts with",
  [StringCondition.ENDS_WITH]: "Ends with",
  [StringCondition.CONTAINS]: "Contains",
  [StringCondition.NOT_CONTAINS]: "Not contains"
};

export const FilterRow = ({ filter, onChange, onDelete }) => {
  const [column, setColumn] = React.useState(filter.getColumn());
  const [condition, setCondition] = React.useState(filter.getCondition());
  const [value, setValue] = React.useState(filter.getValue());

  const handleColumnChange = (event) => {
    const column = event.target.value;
    setColumn(column);
    filter.setColumn(column);
    onChange(filter);
  };

  const handleConditionChange = (event) => {
    const condition = event.target.value;
    setCondition(condition);
    filter.setCondition(condition);
    onChange(filter);
  };

  const handleValueChange = (event) => {
    const value = event.target.value;
    setValue(value);
    filter.setValue(value);
    onChange(filter);
  };

  return (
    <Grid container spacing={2} alignItems="center" sx={{ paddingInline: "20px" }}>
      <Grid item xs={12} sm={3}>
        <Select
          value={column}
          onChange={handleColumnChange}
          fullWidth
          variant="standard"
        >
          {headCells.map((headCell) => (
            <MenuItem key={headCell.id} value={headCell.id}>
              {headCell.label}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Select
          value={condition}
          onChange={handleConditionChange}
          fullWidth
          variant="standard"
        >
          {Object.keys(StringCondition).map((key) => (
            <MenuItem key={key} value={StringCondition[key]}>
              {StringConditionNameMap[StringCondition[key]]}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12} sm={5}>
        <TextField
          value={value}
          onChange={handleValueChange}
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} sm={1}>
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};
