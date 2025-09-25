import { useContext, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { modalContext } from "../../DashboardLayout";
import {
  useGetDepartmentsQuery,
  useGetTeamsQuery,
  useSubmitProjectDataMutation,
} from "../../../../../redux/api/api";

export function CsvUploadFormVariant({ onClose }) {
  const [processName, setProcessName] = useState("");
  const [team, setTeam] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const { setUploadCsvOpen, setCurrentFileId } = useContext(modalContext);

  // RTK Queries and Mutations
  const {
    data: teamList,
    isLoading: isTeamLoading,
    isError: isTeamError,
  } = useGetTeamsQuery();
  const {
    data: departmentList,
    isLoading: isDepartmentLoading,
    isError: isDepartmentError,
  } = useGetDepartmentsQuery();
  const [
    submitProject,
    { isLoading: isSubmitLoading, isError: isSubmitError },
  ] = useSubmitProjectDataMutation();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(""); // Clear error when a new file is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!processName || !team || !department || !selectedFile) {
      setError("Please fill out all fields and select a CSV file.");
      return;
    }

    const dataToSend = new FormData();
    dataToSend.append("process", processName);
    dataToSend.append("department", department);
    dataToSend.append("team", team);
    dataToSend.append("csv_file", selectedFile);

    try {
      const res = await submitProject(dataToSend).unwrap();
      setCurrentFileId(res.id);
      setUploadCsvOpen(true);
      onClose();
    } catch (error) {
      console.error("Submission error:", error);
      setError(
        error?.data?.message ||
          error?.data?.Massage ||
          error?.Massage ||
          "Failed to submit the form. Please try again."
      );
    }
  };

  return (
    <div
      className="p-6 space-y-6 max-w-md w-full md:w-md"
      style={{ backgroundColor: "var(--color-main-bg)" }}
    >
      <div className="text-center space-y-2">
        <h2
          className="text-2xl font-semibold"
          style={{ color: "var(--color-text-primary)" }}
        >
          Upload CSV file
        </h2>
        <p style={{ color: "var(--color-main-text)" }}>
          Empowering hotels and restaurants with AI
        </p>
      </div>

      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      {(isTeamError || isDepartmentError || isSubmitError) && (
        <p className="text-red-600 text-sm text-center">
          An error occurred while fetching data. Please try again later.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Process Name Input */}
        <div className="space-y-2">
          <label
            className="block text-sm"
            style={{ color: "var(--color-text-primary)" }}
          >
            Process name
          </label>
          <input
            type="text"
            value={processName}
            onChange={(e) => setProcessName(e.target.value)}
            placeholder="Enter here"
            disabled={isSubmitLoading}
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            style={{
              backgroundColor: "var(--color-gray-button-bg)",
              color: "var(--color-text-primary)",
              border: "1px solid var(--color-gray-button-bg)",
            }}
          />
        </div>

        {/* Team Dropdown */}
        <div className="space-y-2">
          <label
            className="block text-sm"
            style={{ color: "var(--color-text-primary)" }}
          >
            Team
          </label>
          <div className="relative">
            <select
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              disabled={isTeamLoading || isSubmitLoading}
              className="w-full px-4 py-3 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              style={{
                backgroundColor: "var(--color-gray-button-bg)",
                color: "var(--color-text-notActive)",
                border: "1px solid var(--color-gray-button-bg)",
              }}
            >
              <option value="">Choose one</option>
              {isTeamLoading ? (
                <option value="" disabled>
                  Loading teams...
                </option>
              ) : teamList?.results?.length > 0 ? (
                teamList.results.map((teamItem) => (
                  <option key={teamItem.id} value={teamItem.id}>
                    {teamItem.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No teams available
                </option>
              )}
            </select>
            <ChevronDownIcon
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
              style={{ color: "var(--color-text-notActive)" }}
            />
          </div>
        </div>

        {/* Department Dropdown */}
        <div className="space-y-2">
          <label
            className="block text-sm"
            style={{ color: "var(--color-text-primary)" }}
          >
            Department
          </label>
          <div className="relative">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              disabled={isDepartmentLoading || isSubmitLoading}
              className="w-full px-4 py-3 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              style={{
                backgroundColor: "var(--color-gray-button-bg)",
                color: "var(--color-text-notActive)",
                border: "1px solid var(--color-gray-button-bg)",
              }}
            >
              <option value="">Choose one</option>
              {isDepartmentLoading ? (
                <option value="" disabled>
                  Loading departments...
                </option>
              ) : departmentList?.results?.length > 0 ? (
                departmentList.results.map((deptItem) => (
                  <option key={deptItem.id} value={deptItem.id}>
                    {deptItem.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No departments available
                </option>
              )}
            </select>
            <ChevronDownIcon
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
              style={{ color: "var(--color-text-notActive)" }}
            />
          </div>
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <label
            className="block text-sm"
            style={{ color: "var(--color-text-primary)" }}
          >
            Upload file
          </label>
          <div className="relative">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              disabled={isSubmitLoading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            <div
              className="w-full px-4 py-3 rounded-lg border-2 border-dashed flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity disabled:opacity-50"
              style={{
                backgroundColor: "var(--color-gray-button-bg)",
                borderColor: "var(--color-text-notActive)",
              }}
            >
              <span style={{ color: "var(--color-text-notActive)" }}>
                {selectedFile ? selectedFile.name : "Choose file"}
              </span>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitLoading || isTeamLoading || isDepartmentLoading}
            className="w-full px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-90 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: "#574bff",
              color: "var(--color-text-primary)",
            }}
          >
            {isSubmitLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
