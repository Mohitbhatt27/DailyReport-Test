export const mergeNightDutyData = (data) => {
  const mergedData = data.reduce((acc, row) => {
    let { crewName, designation, hours } = row;

    if (!hours || typeof hours !== "string") return acc; 

    const [hrs, mins] = hours.split(":").map(Number);
    const totalMinutes = hrs * 60 + mins;

    if (!crewName || crewName === "NAME" || totalMinutes === 0) return acc; 

    if (!acc[crewName]) {
      acc[crewName] = { crewName, designation, totalMinutes: 0 };
    }

    acc[crewName].totalMinutes += totalMinutes;

    return acc;
  }, {});

  return Object.values(mergedData).map((row) => ({
    ...row,
    hours: `${Math.floor(row.totalMinutes / 60)}:${row.totalMinutes % 60}`,
  }));
};