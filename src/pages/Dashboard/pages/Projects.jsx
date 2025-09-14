import React, { useContext, useEffect, useRef, useState } from "react";
import { FiCalendar, FiSearch } from "react-icons/fi";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css"; // Import a base theme
import DataTable from "../Contents/ProjectTable";
import { modalContext } from "../DashboardLayout";

const sampleData = [
  {
    id: 1,
    process: "2 January, 2025",
    date: "2 January, 2025",
    department: "Customer Support",
    team: "Carolina Panthers",
    uploadFiles: "View",
    analysis: "Start",
  },
  {
    id: 2,
    process: "2 January, 2025",
    date: "2 January, 2025",
    department: "User Interface",
    team: "New Orleans Saints",
    uploadFiles: "View",
    analysis: "Start",
  },
  {
    id: 3,
    process: "3 January, 2025",
    date: "3 January, 2025",
    department: "Development",
    team: "San Francisco 49ers",
    uploadFiles: "View",
    analysis: "Start",
  },
  {
    id: 4,
    process: "4 January, 2025",
    date: "4 January, 2025",
    department: "Production",
    team: "Los Angeles Rams",
    uploadFiles: "View",
    analysis: "Start",
  },
  {
    id: 5,
    process: "5 January, 2025",
    date: "5 January, 2025",
    department: "Project Management",
    team: "Dallas Cowboys",
    uploadFiles: "View",
    analysis: "Start",
  },
  {
    id: 6,
    process: "6 January, 2025",
    date: "6 January, 2025",
    department: "Automation Testing",
    team: "Green Bay Packers",
    uploadFiles: "View",
    analysis: "Start",
  },
  {
    id: 7,
    process: "7 January, 2025",
    date: "7 January, 2025",
    department: "Automation Testing",
    team: "Minnesota Vikings",
    uploadFiles: "View",
    analysis: "Start",
  },
  {
    id: 8,
    process: "8 January, 2025",
    date: "8 January, 2025",
    department: "User Interface",
    team: "Atlanta Falcons",
    uploadFiles: "View",
    analysis: "Start",
  },
];

export default function Projects() {
  const [date, setDate] = useState("");
  const datePickerRef = useRef(null);
  const flatpickrInstance = useRef(null);
  const { setUploadCsvFirst, setDepartmentListOpen, setTeamListOpen } =
    useContext(modalContext);

  useEffect(() => {
    // Initialize flatpickr
    flatpickrInstance.current = flatpickr(datePickerRef.current, {
      dateFormat: "F j, Y", // User-friendly format
      onChange: (selectedDates, dateStr) => {
        setDate(dateStr);
      },
      enableTime: false,
      appendTo: document.body, // Ensure calendar appears above other elements
    });

    return () => {
      // Cleanup flatpickr instance
      if (flatpickrInstance.current) {
        flatpickrInstance.current.destroy();
      }
    };
  }, []);

  const handleInputClick = () => {
    // Open calendar on input click
    if (flatpickrInstance.current) {
      flatpickrInstance.current.open();
    }
  };

  return (
    <div className="px-5 md:px-12">
      <div className="text-main-text flex md:items-end flex-col md:flex-row md:gap-5 py-5">
        <h1 className="text-3xl">Welcome, Aaron.</h1>
        <p>
          {new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="flex flex-col md:flex-row space-x-6 py-4 rounded-xl shadow-md">
        <div className="grow flex flex-col md:flex-row gap-3 mb-4 md:mb-0 justify-between items-center">
          <button
            onClick={() => setUploadCsvFirst(true)}
            className="bg-[#171717] w-full md:w-fit text-[#574bff] px-6 py-2 rounded-lg hover:bg-[#333333] hover:cursor-pointer transition duration-200 font-medium"
          >
            Project +
          </button>
          <div className="flex h-fit gap-4">
            <button
              onClick={() => setDepartmentListOpen(true)}
              className="text-[#574bff] w-full px-6 py-2 rounded-lg hover:bg-[#333333] bg-[#171717] hover:cursor-pointer transition duration-200 font-medium whitespace-nowrap"
            >
              Departments List
            </button>
            <button
              onClick={() => setTeamListOpen(true)}
              className="text-[#574bff] w-full px-6 py-2 rounded-lg hover:bg-[#333333] bg-[#171717] hover:cursor-pointer transition duration-200 font-medium whitespace-nowrap"
            >
              Teams List
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-md bg-[#171717] border border-gray-button-bg rounded-lg">
            <div
              className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
              onClick={handleInputClick}
            >
              <FiCalendar className="h-5 w-5 text-gray-500" />
            </div>
            <input
              ref={datePickerRef}
              type="text"
              value={date}
              onClick={handleInputClick}
              className="w-full pl-10 pr-10 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[#171717] text-main-text older-gray-400 cursor-pointer"
              placeholder="Select a date"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <FiSearch className="h-5 w-5 text-[#574bff]" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <DataTable data={sampleData} />
      </div>
    </div>
  );
}
