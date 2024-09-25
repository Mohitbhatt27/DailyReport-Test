export const calculateNDASummary = (data) => {
  // console.log(data);
  const designations = ["ALP", "SALP", "SSHT", "SHT", "LPM", "LPP", "LPG"];
  const summary = designations.map((designation) => {
    const filteredData = data.filter((row) => row.designation === designation);
    const employeeCount = filteredData.length;
    const totalHours = Math.round(
      filteredData.reduce((sum, row) => sum + row.totalMinutes, 0) / 60
    );
    return {
      designation,
      employeeCount,
      totalHours,
    };
  });

  return summary;
};
