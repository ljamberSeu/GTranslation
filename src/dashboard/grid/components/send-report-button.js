import * as React from 'react';

import Button from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Deposits from '../../Deposits';

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

export default function SendReportButton(props) {
  const { rows, displaytext } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Tooltip title="Send review report to Xpay">
        <Button sx={{gap: '10px'}} onClick={() => setOpen(true)}>
          <SendSharpIcon color='primary'/>
           {displaytext ? "Send report!" : ""}
        </Button>
      </Tooltip>
      <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Deposits />
            </Paper>
        </Box>
      </Modal>
    </>
  );
}