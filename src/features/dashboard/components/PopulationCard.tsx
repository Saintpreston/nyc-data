import Card, {CardProps} from '@mui/material/Card';
import { styled } from '@mui/material/styles';


const StyledPopulationCard = styled(Card)<CardProps>(({ theme }) => ({
 padding: 12,
 boxShadow: '0px 4px 8px 0px rgba(43,43,43,0.2)',
 border: theme.palette.mode === "dark" ? "" : "solid 1px gainsboro"
}))  as typeof Card; ;



const PopulationCard = ({ ...props}) => {

 return <StyledPopulationCard elevation={0} {...props}></StyledPopulationCard>
} 

export default PopulationCard 