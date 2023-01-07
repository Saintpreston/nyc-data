import React from 'react'
import {Grid, Card} from "@mui/material"
import { Bar } from 'react-chartjs-2'
import { selectArrests, selectShootings } from '../../cityData/cityDataSlice'
import {Chart, CategoryScale, LinearScale, BarElement} from 'chart.js'
import { useAppSelector } from '../../../app/hooks'
import {useTheme} from '@mui/material'
Chart.register( [ CategoryScale, LinearScale, BarElement])

function BarChart() {

const mode = useTheme().palette.mode;

const arrests = useAppSelector(selectArrests).length;
const shootings = useAppSelector(selectShootings).length;


  const data = {
    labels: ['Arrests','Mental Health Facilities','Schools','Shootings'],
    datasets: [{
      label: '',
      data: [arrests, shootings,],
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

    
    {/* TODO: change this to a breakdown of what people were arrested for */}
       {/* <Card
          sx={{ minHeight: "100%", border: mode === "dark" ? "" : "solid 1px gainsboro", display:'flex', alignItems:'center', justifyContent: 'space-between', boxShadow: '0px 4px 8px 0px rgba(43,43,43,0.2)', }}
          elevation={0}
        >
  <Bar data={data}/>
  </Card> */}
    </Grid>
  )
}

export default BarChart