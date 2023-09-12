import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TranslationStatus } from "./constants";
import { useUpdateQuerys } from "../../components/api/api-update-query";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { ReactChatIntegration } from "./chat";
import { CopilotProvider } from "@fluentai/react-copilot";
import { webLightTheme, FluentProvider, Button as FluentUIButton } from "@fluentui/react-components";
import {
  Sparkle32Regular
} from "@fluentui/react-icons";

export default function TranslationForm ({ row, setOpen }) {
  const [finalTranslation, setFinalTranslation] = React.useState(row?.finalTranslation || row?.gptTranslation);
  const update = useUpdateQuerys();
  const [chatOpen, setChatOpen] = React.useState(false);

  return (
    <FluentProvider theme={webLightTheme}>
      <CopilotProvider
        mode='sidecar' // or 'canvas'
        copilotTokens={{
          colorBrandFlair1: "red", // replace with your brand colors
          colorBrandFlair2: "orange",
          colorBrandFlair3: "yellow"
        }}
      >
        <Typography variant="h6" gutterBottom>
          Edit Translation
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DemoItem label="Original string">
              <Typography variant="body1" gutterBottom>
                {row?.original}
              </Typography>
            </DemoItem>
          </Grid>
          <Grid item xs={12}>
            <DemoItem label="GPT Translation">
              <Typography variant="body1" gutterBottom>
                {row?.gptTranslation}
              </Typography>
            </DemoItem>
          </Grid>
          <Grid item xs={12}>
            <DemoItem label="Dev comment">
              <Typography variant="body1" gutterBottom>
                {row?.devComment}
              </Typography>
            </DemoItem>
          </Grid>
          <Grid item xs={12} sx={{ margin: "auto" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <TextField
                required
                id="Final translation"
                name="Final translation"
                label="Final translation"
                fullWidth
                value={finalTranslation}
                variant='standard'
                onChange={(e) => setFinalTranslation(e.target.value)}
                autoFocus
              />
              <FluentUIButton
                appearance="primary"
                shape="circular"
                onClick={() => setChatOpen((e) => !e)}
              >
                <Sparkle32Regular />
              </FluentUIButton>
            </div>
            <div style={{
              marginInline: "auto 10px",
              marginBlock: "20px",
              width: "fit-content"
            }}>
              { chatOpen && <ReactChatIntegration /> }
            </div>
          </Grid>

          <div style={{ padding: "20px", float: "left", width: "100%", display: "flex" }}>
            <div style={{ display: "flex", gap: "10px", float: "left" }}>
              <Button
                variant="contained"
                onClick={() => {
                  setOpen(false);
                  update(row.id, {
                    status: finalTranslation ? TranslationStatus.DONE : TranslationStatus.UNKNOEN,
                    finalTranslation
                  });
                }}> Accepcted </Button>
              <Button variant="contained" onClick={() => setOpen(false)} color="primary"> Cancel </Button>
            </div>
            <Button
              variant="contained"
              sx={{ marginInlineStart: "auto" }}
              title="Reject this translation as didn't have enough information to translate it correctly"
              onClick={() => {
                setOpen(false);
                update(row.id, {
                  status: TranslationStatus.REJECTED,
                  finalTranslation
                });
              }}
              color="error"
            >
              Rejected
            </Button>
          </div>
        </Grid>
      </CopilotProvider>
    </FluentProvider>
  );
}
