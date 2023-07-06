import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import FilterListIcon from '@mui/icons-material/FilterList';
import DoneAllSharpIcon from '@mui/icons-material/DoneAllSharp';
import { isSelected } from '../utils';
import PropTypes from 'prop-types';
import SendReportButton from './send-report-button';
export default function EnhancedTableToolbar(props) {
  const { numSelected, selected, setRows, rows } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Pending review translations
        </Typography>
      )}

      {numSelected > 0 ? (
        <div style={{gap: '10px', display:'flex'}}>
          <Tooltip title="Accept all selected translations">
            <IconButton onClick={() => {
                setRows((allRows) => allRows?.map(r => {
                  const isItemSelected = isSelected(r.name, selected);
                  if (isItemSelected) {
                    return {
                      ...r,
                      status: 'finished',
                      finalTranslation: r.gptTranslation,
                    }
                  }
                  return r;
                }));
              }}>
              <DoneAllSharpIcon color='primary'/>
            </IconButton>
          </Tooltip>
          <SendReportButton rows={rows?.filter(r => isSelected(r.name, selected))}/>
        </div>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};