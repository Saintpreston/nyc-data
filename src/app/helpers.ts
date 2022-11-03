

 export const formatNumberByPercent = (total: number, percentage: number) =>{
  const numFormatter = Intl.NumberFormat('en', {notation: 'compact'});
  return numFormatter.format((total / 100 ) * percentage)
};