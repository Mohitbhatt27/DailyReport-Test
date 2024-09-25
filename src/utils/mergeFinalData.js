export const mergeSummaries = (dailyData, ndaData) => {
  const mergedData = dailyData.map((daily) => {
    const nda =
      ndaData.find((item) => item.designation === daily.designation) || {};
    return {
      Designation: daily.designation,
      EmployeeCount: daily.employeeCount,
      TotalKm: daily.totalKm,
      NDHemployeeCount: nda.employeeCount || 0,
      TotalHours: nda.totalHours || 0,
    };
  });

  return mergedData;
};
