import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./chart";
import { Project, TranslationRules } from "./deposits";
import Orders from "./grid";

export default function Dashboard () {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto"
      }}
    >
      <Toolbar />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Orders />
          </Grid>

          <div style={{
            maxHeight: "1000px",
            display: "flex",
            gap: "10px"
          }}>
            <Grid item xs={12} md={3} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%"
                }}
              >
                <Chart />
              </Paper>
            </Grid>

            <Grid item xs={12} md={5} lg={5}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%"
                }}
              >
                <Project />
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={4}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%"
                }}
              >
                <TranslationRules />
              </Paper>
            </Grid>
          </div>
        </Grid>
      </Container>
    </Box>
  );
}
