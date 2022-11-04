import React from 'react'
import {Grid, Card} from "@mui/material"
import { Bar, } from 'react-chartjs-2'
import Box from "@mui/material/Box"
import { selectArrests,selectMentalHealth,selectSchools, selectShootings } from '../../cityData/cityDataSlice'
import {Chart, CategoryScale, LinearScale, BarElement} from 'chart.js'
import { useAppSelector } from '../../../app/hooks'
Chart.register( [ CategoryScale, LinearScale, BarElement])

function BarChart() {

const arrests = useAppSelector(selectArrests).length;
const mentalHealthFacils = useAppSelector(selectMentalHealth).length;
const schools = useAppSelector(selectSchools).length;
const shootings = useAppSelector(selectShootings).length;


  const data = {
    labels: ['Arrests','Mental Health Facilities','Schools','Shootings'],
    datasets: [{
      label: '',
      data: [arrests, mentalHealthFacils, schools, shootings,],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
      ],
      borderWidth: 1
    }]
  };


  return (
   <Grid item md={8}>
       <Card
          sx={{ minHeight: "100%", border: "solid 1px gainsboro", display:'flex', alignItems:'center', justifyContent: 'space-between' }}
          elevation={0}
        >
  <Bar data={data}/>
  </Card>
    </Grid>
  )
}

export default BarChart