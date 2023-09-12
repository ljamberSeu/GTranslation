import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { alpha } from "@mui/material/styles";
import FilterListIcon from "@mui/icons-material/FilterList";
import DoneAllSharpIcon from "@mui/icons-material/DoneAllSharp";
import PropTypes from "prop-types";
import FilterMenu from "./filter-menu";
import TablePagination from "@mui/material/TablePagination";

export default function EnhancedTableToolbar (props) {
  const { numSelected } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = !!anchorEl;

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
          })
        }}
      >
        {numSelected > 0
          ? (
            <Typography
              sx={{ flex: "1 1 100%" }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>
          )
          : (
            <Typography
              sx={{ flex: "1 1 100%", margin: "auto", display: "flex", justifyContent: "center" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
            Translations
            </Typography>
          )}
        <TablePagination {...props} style={{ width: "800px" }}/>
        {numSelected > 0
          ? (
            <div style={{ gap: "10px", display: "flex" }}>
              <Tooltip title="Accept all selected translations">
                <IconButton onClick={() => {}}>
                  <DoneAllSharpIcon color='primary'/>
                </IconButton>
              </Tooltip>
            </div>
          )
          : (
            <Tooltip title="Filter list">
              <IconButton
                onClick={(event) => setAnchorEl(event.currentTarget)}
                aria-haspopup="true"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
              >
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        <FilterMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
      </Toolbar>
    </>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};
