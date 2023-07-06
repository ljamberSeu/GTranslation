import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import Chip from '@mui/material/Chip';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { isSelected } from '../utils';
import CreateIcon from '@mui/icons-material/Create';
import Box from '@mui/material/Box';
import TranslationForm from './translation-edit-form';
import Modal from '@mui/material/Modal';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { TranslationContext } from '../../../data'
import { TranslationStatus } from './constants';
import { updateSingleTranslation } from '../../../api/list'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const RowStatus = ({ row }) => {
  switch (row.status) {
    case TranslationStatus.DONE:
      return <Chip icon={<CheckSharpIcon />} label="Done" variant="outlined" color='success'/>;
    case TranslationStatus.REJECTED:
      return <Chip icon={<WarningAmberIcon />} label="Rejected" variant="outlined" color='warning'/>;
    default:
      return '-';
  }
};

export default function TranslationRow(props) {
  const { row, index, selected, setSelected } = props;
  const { setRows }= React.useContext(TranslationContext);
  const isItemSelected = isSelected(row.id, selected);
  const labelId = `enhanced-table-checkbox-${index}`;
  const [open, setOpen] = React.useState(false);
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  return (
    <>
    <TableRow
      hover
      onClick={(event) => handleClick(event, row.id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
      sx={{ cursor: 'pointer'}}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': labelId,
          }}
        />
      </TableCell>
      <TableCell
        component="th"
        id={labelId}
        scope="row"
        padding="none"
      >
        {row.original}
      </TableCell>
      <TableCell align="left">{row.gptTranslation}</TableCell>
      <TableCell align="left">{row.devComment}</TableCell>
      <TableCell align="left">{row.stringOwner}</TableCell>
      <TableCell align="left">{row.reviewer}</TableCell>
      <TableCell align="left">{<div>{row.finalTranslation}</div>}</TableCell>
      <TableCell align="left"><RowStatus row={row}/></TableCell>
      <TableCell align="left" sx={{margin: '20px'}}>
        <div style={{display: 'flex', gap: '10px'}}>
          <Tooltip title="Edit GPT translation">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={(e) => {
                setOpen(o => !o);
                e.stopPropagation();
              }}
            >
              <CreateIcon color="secondary" />
            </IconButton>
          </Tooltip>
          {row.status  ? 
            <Tooltip title="Revert string status">
              <IconButton onClick={(e) => {
                setRows((allRows) => allRows?.map(r => {
                  if (r.id === row.id) {
                    const newRow = {
                      ...r,
                      status: TranslationStatus.UNKNOEN,
                    };
                    updateSingleTranslation(newRow);
                    return newRow;
                  }
                  return r;
                }));
                e.stopPropagation();
              }}>
                <SettingsBackupRestoreIcon color="primary" />
              </IconButton>
              </Tooltip> :
              <Tooltip title="Accept current translation">
                <IconButton onClick={(e) => {
                  setRows((allRows) => allRows?.map(r => {
                    if (r.id === row.id) {
                      const newRow = {
                        ...r,
                        status: TranslationStatus.DONE,
                        finalTranslation: r.finalTranslation || r.gptTranslation,
                      };
                      updateSingleTranslation(newRow);
                      return newRow;
                    }
                    return r;
                  }));
                  e.stopPropagation();
                }}>
                  <CheckSharpIcon color="primary" />
                </IconButton>
              </Tooltip>
          }
        </div>
      </TableCell>
    </TableRow>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TranslationForm row={row} setOpen={setOpen} setRows={setRows}/>
        </Box>
      </Modal>
    </>
  );
};
