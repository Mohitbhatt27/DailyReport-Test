

const FileUploads = () => {
  return (
  <div className=" border border-black rounded-lg fllex items-center justify-center">
    <div className="p-4 m-4 border border-gray-500 text-center font-bold h-32 flex justify-between flex-col">
      <p>Daily Kilometers File</p>
      <div>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">upload</button>
      </div>
    </div>
    <div className="p-4 m-4 border border-gray-500 text-center font-bold h-32 flex justify-between flex-col">
      <p>Night Duty File</p>
      <div>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">upload</button>
      </div>
    </div>
    <div className="p-4 m-4 border border-gray-500 text-center font-bold h-32 flex items-center justify-between flex-col">
      <p>Select Date</p>
      <input className="text-white w-40 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="date" name="date" id="date" />
      </div>
  </div>
);
};

export default FileUploads;
