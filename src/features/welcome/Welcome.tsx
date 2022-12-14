import React, { Dispatch, SetStateAction } from "react";
import { Container, Button, Typography,Box } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
 fetchData,
 selectStatus,
} from "../cityData/cityDataSlice";
import {useTheme} from "@mui/material";




const Welcome = ({setIsOnboarded } : { setIsOnboarded: Dispatch<SetStateAction<boolean>> }) => {

const theme = useTheme();
const dispatch = useAppDispatch()
const status = useAppSelector(selectStatus)

 useEffect(() => {
  if (status === "complete") return;
  dispatch(fetchData());
}, [dispatch, status]);


const handleClick = () =>{
 setIsOnboarded(true)
}


const containerStyles = {
  py: 6,
  border: `solid 1px ${theme.palette.mode === "dark" ? "none" : "gainsboro"}`,
  backgroundColor : `${theme.palette.mode === "dark" ? "#1e1f21" : "none"}`,
  borderRadius: 2,
  boxShadow: '0px 4px 8px 0px rgba(43,43,43,0.1)'
}

  return (
    <Container maxWidth="md" sx={containerStyles}>
      <Box px={4} >
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
        This prototype is rough but I see potential, a small part of me
        wishes to continue working on this and develop it further, another part wants to build new and cooler shit.
        I'm typically busy with school and my internship so hit me up if you have any ideas for a Pull Request... or just wanna talk
      </Typography>
      <br/>
      <Typography>
       Warmly, <br/>
       Preston ???????
      </Typography>
     <br/>
      <Button sx={{float:'right', fontWeight: 700}} onClick={handleClick} variant="contained" fullWidth>Launch Project</Button>
      </Box>
    </Container>
  );
};

export default Welcome;
