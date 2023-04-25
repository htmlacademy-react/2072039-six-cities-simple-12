export const getHumanizedDate = (date: string): string => {
  const reviewDate = new Date(date);
  const monthName = reviewDate.toLocaleString('en-EN', { month: 'long' });
  return `${monthName} ${reviewDate.getFullYear()}`;
};
