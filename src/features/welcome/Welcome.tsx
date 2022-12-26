import React, { Dispatch, SetStateAction } from "react";
import { Container, Button, Typography, } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
 fetchData,
 selectStatus,
} from "../cityData/cityDataSlice";


interface IProps {
 setIsOnboarded: Dispatch<SetStateAction<boolean>>;
 isOnboarded: boolean
}

const Welcome = ({setIsOnboarded, isOnboarded} : IProps) => {


const dispatch = useAppDispatch()
const status = useAppSelector(selectStatus)

 useEffect(() => {
  if (status === "complete") return;
  dispatch(fetchData());
}, [dispatch, status]);


const handleClick = () =>{
 setIsOnboarded(true)
}

  return (
    <Container maxWidth="md">
      <Typography gutterBottom variant="h4" >
        Hello Visitor,
      </Typography>
      <Typography>
        Before you view my work, I want to acknowledge that data is important,
        it's how we drive unopiniated decisions, but it isn't the full picture nor the human truth.
      </Typography>{" "}
    
      <Typography>
        {" "}
        Its a neat summary of truth that leaves out details that were deemed
        uneccessary for the context/purpose.
      </Typography>
     
      <Typography>
        Data abstracts
        humanity out of the equation.
      </Typography>
   
      <Typography>
        That being said, this project is living and breathing so whilst the
        topic will remain as New York, expect alot of things to change. The APIs
        I used were helpful yet didn't meet all my needs.
      </Typography>
 
      <Typography>There are things worth further analysis such as:</Typography>
      <Typography component="ul">
        <Typography component="li">
         The unhoused Population & the city's investments on homeless shelters
        </Typography>
        <Typography component="li">
          Whether or not the city invests more money into schools based on need
          or the affluency of the neighborhood
        </Typography>
        <Typography component="li">
          Violent to Non-violent crimes and the arrests data for them, as a
          means of answering the question "Is it overpolicing or is this amount
          of NYPD presence actually necessary for the safety of Black and Brown
          communities?
        </Typography>
        <Typography component="li">
          Ethnic Populations and population by Borough as a means to comparison
          to see if we can find discrimination in the city budget
        </Typography>
        <Typography component="li">...and much more worth exploring</Typography>
      </Typography>
      <Typography>
        This prototype is rough but I see potential, a large part of me
        wishes to continue working on this and develop the research and UI until it's strong 
        enough to exist in conjuction with my Senior thesis.
      </Typography>
     <br/>
      <Button sx={{float:'right'}} onClick={handleClick} variant="contained" >Launch Project</Button>
    </Container>
  );
};

export default Welcome;
