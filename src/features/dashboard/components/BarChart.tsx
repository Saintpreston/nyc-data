import React from 'react'
import {Grid, Card} from "@mui/material"
import { Bar, } from 'react-chartjs-2'
import Box from "@mui/material/Box"
import { selectArrests,selectBudget,selectStatus,selectMentalHealth,selectSchools } from '../../cityData/cityDataSlice'
import {Chart, ArcElement, Tooltip, CategoryScale, LinearScale, BarElement} from 'chart.js'
import { useAppSelector } from '../../../app/hooks'
Chart.register( [ CategoryScale, LinearScale, BarElement])

function BarChart() {



  const data = {
    labels: ['1','2','3','4','5','6','7'],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
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