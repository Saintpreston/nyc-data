import React from "react";
import {
  Grid,
  Typography,
  Stack
} from "@mui/material";
import PopulationCard from "./components/PopulationCard";
import TotalPopulationDoughnut from "./components/TotalPopulationDoughnut";
import { formatNumberByPercent } from "../../app/helpers";
import { selectTotalPopulation, selectDemographics } from "../cityData/cityDataSlice";
import { useAppSelector } from "../../app/hooks";




function PopulationCards(){
  const totalPopulation = useAppSelector(selectTotalPopulation);
  const demographics = useAppSelector(selectDemographics);

    

  return (
    <>
      <Grid item md={4} >
      <PopulationCard  >
        <Typography variant="h6">White</Typography>
        <Typography variant="subtitle1">{formatNumberByPercent(totalPopulation!, demographics!.white)}</Typography>
      </PopulationCard>
    </Grid>
      <Grid item md={4}>
      <PopulationCard  >
      <Typography variant="h6">Asian American</Typography>
        <Typography variant="subtitle1">{formatNumberByPercent(totalPopulation!, demographics!.asian)}</Typography>
      </PopulationCard>
    </Grid>
      <Grid item md={4}>
      <PopulationCard  >
      <Typography variant="h6">Black</Typography>
        <Typography variant="subtitle1">{formatNumberByPercent(totalPopulation!, demographics!.black)}</Typography>
      </PopulationCard>
    </Grid>
      <Grid item md={4}>
      <PopulationCard >
      <Typography variant="h6">Native American</Typography>
        <Typography variant="subtitle1">{formatNumberByPercent(totalPopulation!, demographics!.nativeAmerican)}</Typography>
      </PopulationCard>
    </Grid>
      <Grid item md={4}>
      <PopulationCard  >
      <Typography variant="h6">Two or More</Typography>
        <Typography variant="subtitle1">{formatNumberByPercent(totalPopulation!, demographics!.twoOrMore)}</Typography>
      </PopulationCard>
    </Grid>
      <Grid item md={4}>
      <PopulationCard >
      <Typography variant="h6">Other</Typography>
        <Typography variant="subtitle1">{formatNumberByPercent(totalPopulation!, demographics!.other)}</Typography>
      </PopulationCard>
    </Grid>
    </>
  )

}



export default function Population() {

const totalPopulation = useAppSelector(selectTotalPopulation)


  return (
    <>
      <Grid md={9} item container spacing={1} >
      <PopulationCards/>
      </Grid>
      <Grid item md={3}>
        <PopulationCard
          sx={{ minHeight: "100%", display:'flex', alignItems:'center', justifyContent: 'space-between' }}
          elevation={0}
        >
          <Stack>
          <Typography variant="h6" paddingLeft={2}>Total Population</Typography>
          <Typography variant="subtitle1" paddingLeft={2}>{formatNumberByPercent(totalPopulation!,100)}</Typography>
          </Stack>
            <TotalPopulationDoughnut/>
        </PopulationCard>
      </Grid>

    </>
  );
}
