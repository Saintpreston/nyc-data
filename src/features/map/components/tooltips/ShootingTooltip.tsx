import React, { MutableRefObject } from 'react'
import { Shooting } from '../../../cityData/cityDataSlice'
import Tooltip from './Tooltip';
import Typography  from '@mui/material/Typography';


interface IProps {
shooting: Shooting;
toolTipPos: { current: { x: number; y: number } };
isHovered: boolean;
}


const  ShootingTooltip = React.forwardRef<MutableRefObject<HTMLDivElement> , IProps>( (props, ref) => {


 const {shooting, toolTipPos, isHovered} = props;

 const shootingDate = new Date(shooting.occur_date);
  const renderDate = shootingDate.toLocaleDateString("en-US");

 
  return (
   <Tooltip aria-hidden={!isHovered} ref={ref} toolTipPos={toolTipPos} isHovered={isHovered}>
   <Typography>Shooting</Typography>
   <Typography fontWeight={400} lineHeight={1.2}>
     {renderDate}
   </Typography>
   <Typography fontWeight={400} lineHeight={1.2}>
     Victim Age: {shooting.vic_age_group ?? "Unknown"}
   </Typography>
 </Tooltip>
  )
})

export default ShootingTooltip