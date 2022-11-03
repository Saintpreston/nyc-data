import React from "react";
import { Container, Grid } from "@mui/material";
import Population from "./Population";
import BudgetTable from "./components/BudgetTable";
import BarChart from "./components/BarChart";

export default function Dashboard() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={1}>
        <Population />
        <BarChart />
        <BudgetTable />
      </Grid>
    </Container>
  );
}
