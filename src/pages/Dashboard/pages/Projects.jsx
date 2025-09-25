import React, { useContext, useEffect, useRef, useState } from "react";
import { FiCalendar, FiSearch } from "react-icons/fi";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css";
import DataTable from "../Contents/ProjectTable";
import { modalContext, profileContext } from "../DashboardLayout";
import { useGetAllProjectsQuery } from "../../../../redux/api/api";
import { FaX } from "react-icons/fa6";

export default function Projects() {
  const [date, setDate] = useState("");
  const datePickerRef = useRef(null);
  const flatpickrInstance = useRef(null);
  const { setUploadCsvFirst, setDepartmentListOpen, setTeamListOpen } =
    useContext(modalContext);
  const { profile } = useContext(profileContext);

  const { data: projectsData, isLoading } = useGetAllProjectsQuery();

  useEffect(() => {
    // Initialize flatpickr
    flatpickrInstance.current = flatpickr(datePickerRef.current, {
      dateFormat: "F j, Y", // Format: September 2, 2025
      onChange: (selectedDates, dateStr) => {
        setDate(dateStr);
      },
      enableTime: false,
      appendTo: document.body,
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

  // Function to format ISO date to match flatpickr format (September 2, 2025)
  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Filter and transform projectsData based on selected date
  const tableData =
    projectsData?.results
      ?.filter((project) => {
        if (!date) return true; // If no date selected, show all projects
        const projectDate = formatDate(project.created_at); // Convert ISO date to September 2, 2025 format
        return projectDate === date; // Compare with selected date
      })
      ?.map((project) => ({
        id: project.id,
        process: project.process,
        date: formatDate(project.created_at), // Use formatted date
        department: project.department,
        team: project.team,
        uploadFiles: "View",
        analysis: project.status ? "Start" : "Fix",
        status: project.status,
      })) || [];

  return (
    <div className="px-5 md:px-12">
      <div className="text-main-text flex md:items-end flex-col md:flex-row md:gap-5 py-5">
        <h1 className="text-3xl">
          Welcome, {profile && profile.first_name + " " + profile.last_name}.
        </h1>
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
              readOnly
              className="w-full pl-10 pr-10 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[#171717] text-main-text placeholder-gray-400 cursor-pointer"
              placeholder="Select a date"
            />

            {date ? (
              <div
                onClick={() => setDate("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <FaX className="text-white hover:text-red-500" />
              </div>
            ) : (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <FiSearch className="h-5 w-5 text-[#574bff]" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {isLoading ? <p>Loading...</p> : <DataTable data={tableData} />}
      </div>
    </div>
  );
}
