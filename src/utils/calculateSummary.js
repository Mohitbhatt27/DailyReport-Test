export const calculateSummary = (data) => {
  const designations = ["ALP", "SALP", "SSHT", "SHT", "LPM", "LPP", "LPG"];
  const summary = designations.map((designation) => {
    const filteredData = data.filter((row) => row.designation === designation);
    const employeeCount = filteredData.length;
    const totalKm = Math.round(
      filteredData.reduce((sum, row) => sum + (row.totalKm || 0), 0)
    );
    return {
      designation,
      employeeCount,
      totalKm,
    };
  });

  return summary;
};
