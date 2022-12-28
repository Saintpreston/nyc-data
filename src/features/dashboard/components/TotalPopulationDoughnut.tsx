import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import {
  selectDemographics,
  selectTotalPopulation,
} from "../../../features/cityData/cityDataSlice";
import { Chart, ArcElement, Tooltip } from "chart.js";

import { useAppSelector } from "../../../app/hooks";
Chart.register([Tooltip, ArcElement]);

function TotalPopulationDoughnut() {
  const demographics = useAppSelector(selectDemographics);
  const totalPopulation = useAppSelector(selectTotalPopulation);

  //   const datasets: any = [{data:[]}]
  // popData.forEach(el => {
  //   datasets[0].data.push(el.population)
  // });
  const genarateDoughnutUtils = useMemo(() => {
   
   const labels = [
      `Asian: ${demographics!.asian}%`,
      `Black: ${demographics!.black}%`,
      `White: ${demographics!.white}%`,
      `Mixed: ${demographics!.twoOrMore}%`,
      `Other: ${demographics!.other}%`,
      `Native: ${demographics!.nativeAmerican}%`,
    ];

  const data =  [
      totalPopulation! * (demographics!.asian / 100),
      totalPopulation! * (demographics!.black / 100),
      totalPopulation! * (demographics!.white / 100),
      totalPopulation! * (demographics!.twoOrMore / 100),
      totalPopulation! * (demographics!.other / 100),
      totalPopulation! * (demographics!.nativeAmerican / 100),
    ];

    return { labels , data }
  }, [demographics, totalPopulation]);

  const { labels , data} = genarateDoughnutUtils

  if (
    typeof demographics === "undefined" ||
    typeof totalPopulation === "undefined"
  ) {
    return <Typography color="red">Error</Typography>;
  }


  const labelArr = labels;

  const doughnutData = {
    labels: labelArr,
    datasets: [
      {
        data: data,
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
      <Doughnut
        aria-label={`A Chart with New York City's population demographics showing: ${labels.join(', ')}`}
        data={doughnutData}
      />
    </Box>
  );
}

export default TotalPopulationDoughnut;
