import React from "react";
import { Doughnut } from "react-chartjs-2";
import Box from "@mui/material/Box";
import { selectDemographics } from "../../cityData/cityDataSlice";
import { Chart, ArcElement, Tooltip } from "chart.js";
import { useAppSelector } from "../../../app/hooks";
Chart.register([Tooltip, ArcElement]);

function TotalPopulationDoughnut() {
  const demographics = useAppSelector(selectDemographics);

  const doughnutData = Object.keys(demographics!).map((race) => `${race}%`);

  //   const datasets: any = [{data:[]}]
  // popData.forEach(el => {
  //   datasets[0].data.push(el.population)
  // });

  const donutData = {
    labels: [
      "Asian %",
      "Black %",
      "Two or More %",
      "Other %",
      "White %",
      "Native American %",
    ],
    datasets: [
      {
        data: [
          demographics!.asian,
          demographics!.black,
          demographics!.twoOrMore,
          demographics!.other,
          demographics!.white,
          demographics!.nativeAmerican,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        hoverOffset: 2,
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 0.5,
      
      },
    ],
  };

  return (
    <Box sx={{ width: "45%", marginRight: 2, overflow: "scroll" }}>
      <Doughnut  aria-label="A Doughnut Chart with New York City's population demographics"  data={donutData} />
    </Box>
  );
}

export default TotalPopulationDoughnut;
