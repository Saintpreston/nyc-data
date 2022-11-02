import React from "react";
import {
  Card,
  Grid,
  Typography,
  Box
} from "@mui/material";
import BudgetTable from "./components/BudgetTable";
import PopulationCard from "./components/PopulationCard";
import { Doughnut } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

export default function Population() {

const totalPopulation = 8_500_000;


function formatNumber(percentage: number){
  const numFormatter = Intl.NumberFormat('en', {notation: 'compact'});
  return numFormatter.format((totalPopulation / 100 ) * percentage)
}

/* White: 41.33%
Black or African American: 23.82%
Other race: 14.43%
Asian: 14.29%
Two or more races: 5.63%
Native American: 0.44% */

  const popData = [
    {
      name: "White",
      population: formatNumber(41.33),
    },
    {
      name: "African American",
      population: formatNumber(23.82),
    },
    {
      name: "Asian American",
      population: formatNumber(14.29),
    },
    {
      name: "Native American",
      population: formatNumber(0.44),
    },
    {
      name: "Two or more",
      population: formatNumber(7),
    },
    {
      name: "Other",
      population: formatNumber(16),
    },
  ];

  const donutDataProp = () => {
    const labels: string[] = [];
    popData.forEach(el => {
      labels.push(el.name)
    });
 //   const datasets: any = [{data:[]}]
    // popData.forEach(el => {
    //   datasets[0].data.push(el.population)
    // });

  
    return {
      labels,
     datasets: [{
      data:[12,4,51,45,23,3]
     }]
    }
  }

  const renderPopulationCards = popData.map((item) => (
    <Grid item md={4}>
      <PopulationCard elevation={0} sx={{ border: "solid 1px gainsboro" }}>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="subtitle1">{item.population}</Typography>
      </PopulationCard>
    </Grid>
  ));


  return (
    <Grid container spacing={1}>
      <Grid md={9} item container spacing={1}>
        {renderPopulationCards}
      </Grid>
      <Grid item md={3}>
        <Card
          sx={{ height: "100%", border: "solid 1px gainsboro", display:'flex', alignItems:'center', justifyContent: 'space-between' }}
          elevation={0}
        >
          <Typography variant="h6" paddingLeft={2}>Total Population</Typography>
          <Box sx={{width: '40%'}}>
          <Doughnut data={donutDataProp()}/>
          </Box>
        </Card>
      </Grid>
      <Grid item md={8}>
     <Card>Hello</Card>
      </Grid>
      <Grid item md={4}>
      <BudgetTable/>
      </Grid>
    </Grid>
  );
}
