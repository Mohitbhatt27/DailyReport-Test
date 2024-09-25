import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { MergeDailyKMData } from "../utils/MergeDailyKmData";
import { calculateSummary } from "../utils/calculateSummary";
import { calculateNDASummary } from "../utils/calculateNDASummary";
import { removeZeroHoursEmployees } from "../utils/removeZeroHoursEmployees";
import { mergeNightDutyData } from "../utils/mergeNightDutyData";
import { mergeSummaries } from "../utils/mergeFinalData";

const FileUploads = () => {
  const [dailyKilometersData, setDailyKilometersData] = useState([]);
  const [nightDutyData, setNightDutyData] = useState([]);

  const dailyKilometersFileInput = useRef(null);
  const nightDutyFileInput = useRef(null);

  const handleFileUpload = (event, setData) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const binaryStr = new Uint8Array(arrayBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      );
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      // console.log(jsonData);
      setData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleDownload = () => {
    const processedDailyKmData = dailyKilometersData.map((row) => ({
      designation: row.__EMPTY_2,
      crewName: row.__EMPTY_1,
      totalKm: row.__EMPTY_4,
      dutyMins: row.__EMPTY_5,
    }));
    const mergedDailyKmData = MergeDailyKMData(processedDailyKmData);
    const summarizedDailyKMData = calculateSummary(mergedDailyKmData);

    const processedNDH = nightDutyData.map((row) => ({
      designation: row.__EMPTY_2,
      crewName: row.__EMPTY,
      hours: row.__EMPTY_4,
    }));
    const mergedNDHData = mergeNightDutyData(processedNDH);
    const filteredNDHData = removeZeroHoursEmployees(mergedNDHData);
    const summarizedNDAData = calculateNDASummary(filteredNDHData);

    const finalData = mergeSummaries(summarizedDailyKMData, summarizedNDAData);

    //console.log(finalData);

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(finalData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "final_file.xlsx"
    );
  };

  return (
    <>
      <div className="border border-black rounded-lg flex items-center justify-center">
        <div className="p-4 m-4 border border-gray-500 text-center font-bold h-32 flex justify-between flex-col">
          <p>Daily Kilometers File</p>
          <div>
            <input
              type="file"
              ref={dailyKilometersFileInput}
              onChange={(e) => handleFileUpload(e, setDailyKilometersData)}
              style={{ display: "none" }}
            />
            <button
              onClick={() => dailyKilometersFileInput.current.click()}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Upload
            </button>
          </div>
        </div>
        <div className="p-4 m-4 border border-gray-500 text-center font-bold h-32 flex justify-between flex-col">
          <p>Night Duty File</p>
          <div>
            <input
              type="file"
              ref={nightDutyFileInput}
              onChange={(e) => handleFileUpload(e, setNightDutyData)}
              style={{ display: "none" }}
            />
            <button
              onClick={() => nightDutyFileInput.current.click()}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Upload
            </button>
          </div>
        </div>

        <div className="p-4 m-4 border border-gray-500 text-center font-bold h-32 flex items-center justify-between flex-col">
          <button
            onClick={handleDownload}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-auto mx-auto"
          >
            Download
          </button>
        </div>
      </div>
      <div className="mt-6 text-gray-500">
        <ol>
          <li>* Please upload only Excel files</li>
          <li>
            * Please upload daily night duty file and not monthly night duty
            file
          </li>
        </ol>
      </div>
    </>
  );
};

export default FileUploads;
