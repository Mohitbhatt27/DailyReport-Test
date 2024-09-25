export const removeZeroHoursEmployees = (data) => {
  return data.filter((row) => {
    const [hrs, mins] = row.hours.split(":").map(Number);
    return hrs !== 0 || mins !== 0;
  });
};