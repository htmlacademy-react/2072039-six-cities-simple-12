export const getPersentsFromNumber = (number: number | null) => {
  if(!number) {
    return '';
  } else {
    return `${String(Math.round(number) / 0.05)}%`;
  }};
