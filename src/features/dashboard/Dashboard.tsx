import React from "react";
import { Container, Grid, CircularProgress, Stack } from "@mui/material";
import Population from "./Population";
import BudgetTable from "./components/BudgetTable";
import BarChart from "./components/BarChart";
import { useAppSelector } from "../../app/hooks";
import { selectStatus } from "../cityData/cityDataSlice";

export default function Dashboard() {
  const status = useAppSelector(selectStatus);
  return (
    <Container maxWidth="xl">
      {status === "complete" ? (
        <Grid container spacing={1}>
          <Population />
          <BarChart />
          <BudgetTable />
        </Grid>
      ) : (
        <Stack sx={{ width: "100%" }}>
          <CircularProgress
            size="5vw"
            thickness={1.5}
            sx={{ margin: "auto" }}
          />
        </Stack>
      )}
    </Container>
  );
}
