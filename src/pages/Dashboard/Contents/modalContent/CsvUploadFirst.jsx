import { useContext, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { modalContext } from "../../DashboardLayout";

export function CsvUploadFormVariant({ onClose }) {
  const [processName, setProcessName] = useState("");
  const [team, setTeam] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const { setUploadCsvOpen } = useContext(modalContext);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("CSV Upload variant submitted:", {
      processName,
      team,
      department,
      selectedFile: selectedFile?.name,
    });
    setUploadCsvOpen(true);
    onClose();
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
          Empowering hotels and restaurants with AI-
        </p>
      </div>

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
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-3 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: "var(--color-gray-button-bg)",
                color: "var(--color-text-notActive)",
                border: "1px solid var(--color-gray-button-bg)",
              }}
            >
              <option value="">Choose one</option>
              <option value="team1">Development Team</option>
              <option value="team2">Marketing Team</option>
              <option value="team3">Sales Team</option>
              <option value="team4">Support Team</option>
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
              className="w-full px-4 py-3 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: "var(--color-gray-button-bg)",
                color: "var(--color-text-notActive)",
                border: "1px solid var(--color-gray-button-bg)",
              }}
            >
              <option value="">Choose one</option>
              <option value="dept1">Engineering</option>
              <option value="dept2">Operations</option>
              <option value="dept3">Human Resources</option>
              <option value="dept4">Finance</option>
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
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div
              className="w-full px-4 py-3 rounded-lg border-2 border-dashed flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
              style={{
                backgroundColor: "var(--color-gray-button-bg)",
                borderColor: "var(--color-text-notActive)",
              }}
            >
              <span style={{ color: "var(--color-text-notActive)" }}>
                {selectedFile ? selectedFile.name : "Choose file"}
              </span>
              {selectedFile && (
                <span
                  className="text-sm"
                  style={{ color: "var(--color-main-text)" }}
                >
                  {selectedFile.name}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-90 hover:cursor-pointer"
            style={{
              backgroundColor: "#574bff",
              color: "var(--color-text-primary)",
            }}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
