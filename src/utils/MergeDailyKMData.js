export const MergeDailyKMData = (data) => {
  const mergedData = data.reduce((acc, row) => {
    let { crewName, designation, totalKm, dutyMins } = row;

    if (typeof totalKm == "string")
      totalKm = parseInt(totalKm.replace(/\D/g, ""), 10);

    if (typeof dutyMins == "string")
      dutyMins = parseInt(dutyMins.replace(/\D/g, ""), 10);

    if (!crewName || crewName === "CREW NAME" || !totalKm) return acc; // Skip header or undefined rows

    if (!acc[crewName]) {
      acc[crewName] = { crewName, designation, totalKm: 0, dutyMins: 0 };
    }

    acc[crewName].totalKm += totalKm || 0;
    acc[crewName].dutyMins += dutyMins || 0;

    return acc;
  }, {});

  return Object.values(mergedData);
};
