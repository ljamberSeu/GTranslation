import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { TranslationStatus } from './constants';
import { updateSingleTranslation } from '../../../api/list'

export default function TranslationForm({ row, setOpen, setRows }) {
  const [finalTranslation, setFinalTranslation] = React.useState(row?.finalTranslation || row?.gptTranslation);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Edit Translation
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="original"
            name="original string"
            label="original string"
            fullWidth
            value={row?.original}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="gptTranslation"
            name="gptTranslation"
            label="GPT Translation"
            fullWidth
            value={row?.gptTranslation}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Dev comment"
            name="devComment"
            label="Dev comment"
            fullWidth
            value={row?.devComment}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Final translation"
            name="Final translation"
            label="Final translation"
            fullWidth
            value={finalTranslation}
            variant='standard'
            onChange={(e) => setFinalTranslation(e.target.value)}
          />
        </Grid>
        <div style={{display: 'flex', gap: '10px', padding: '20px', float:'left'}}>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
              setRows((allRows) => allRows?.map(r => {
                if (r.id === row.id) {
                  const newRow = {
                    ...r,
                    status: finalTranslation ? TranslationStatus.DONE : TranslationStatus.UNKNOEN,
                    finalTranslation: finalTranslation,
                  };
                  updateSingleTranslation(newRow);
                  return newRow;
                }
                return r;
              }));
            }}> Accepcted </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
              setRows((allRows) => allRows?.map(r => {
                if (r.id === row.id) {
                  const newRow = {
                    ...r,
                    status: TranslationStatus.REJECTED,
                    finalTranslation: finalTranslation,
                  };
                  updateSingleTranslation(newRow);
                  return newRow;
                }
                return r;
              }));
            }}
            color="error"
          >
              Rejected
          </Button>
          <Button variant="contained" onClick={() => setOpen(false)} color="primary"> Cancel </Button>
        </div>
      </Grid>
    </React.Fragment>
  );
}