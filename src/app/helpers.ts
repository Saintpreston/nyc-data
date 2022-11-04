

 export const formatNumberByPercent = (total: number, percentage?: number) =>{
  if(typeof percentage === 'undefined'){
    percentage = 100
  }
  const numFormatter = Intl.NumberFormat('en', {notation: 'compact'});
  const result = numFormatter.format((total / 100 ) * percentage!);
  if(result === '0'){
    return "N/A"
  }
  return result;
}

// export function capitalizeFirstLetter(str : string) {
//   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
// }

export function capitalizeFirstLetter(str: any) 
{
  str = str.split(" ");

  for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1).toLowerCase();
  }

  return str.join(" ");
}