import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

export function CsvUploadForm({ onClose }) {
  const [createHappyPath, setCreateHappyPath] = useState(false);
  const [caseId, setCaseId] = useState("");
  const [activity, setActivity] = useState("");
  const [timestampStart, setTimestampStart] = useState("");
  const [timestampFinish, setTimestampFinish] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("CSV Upload submitted:", {
      createHappyPath,
      caseId,
      activity,
      timestampStart,
      timestampFinish,
    });
    onClose();
  };

  return (
    <div className="p-6 space-y-6 max-w-lg w-full md:w-lg">
      <div className="text-center space-y-2">
        <h2
          className="text-2xl font-semibold"
          style={{ color: "var(--color-text-primary)" }}
        >
          Define Colums
        </h2>
        <p style={{ color: "var(--color-main-text)" }}>
          Empowering hotels and restaurants with AI-
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Happy Path Checkbox */}
        <div className="space-y-3">
          <label
            className="block text-sm"
            style={{ color: "var(--color-text-primary)" }}
          >
            Want to Create happy path?
          </label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={!createHappyPath}
                  onChange={() => setCreateHappyPath(false)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                    !createHappyPath ? " border-gray-500" : "border-gray-400"
                  }`}
                >
                  {!createHappyPath && (
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span style={{ color: "var(--color-text-primary)" }}>No</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={createHappyPath}
                  onChange={() => setCreateHappyPath(true)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                    createHappyPath ? "border-gray-500" : "border-gray-400"
                  }`}
                >
                  {createHappyPath && (
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span style={{ color: "var(--color-text-primary)" }}>Yes</span>
            </label>
          </div>
        </div>

        {/* Dropdown Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              className="block text-sm"
              style={{ color: "var(--color-text-primary)" }}
            >
              Choose case ID
            </label>
            <div className="relative">
              <select
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                className="w-full px-4 py-3 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: "var(--color-gray-button-bg)",
                  color: "var(--color-text-notActive)",
                  border: "1px solid var(--color-gray-button-bg)",
                }}
              >
                <option value="">Choose one</option>
                <option value="case1">Case 1</option>
                <option value="case2">Case 2</option>
                <option value="case3">Case 3</option>
              </select>
              <ChevronDownIcon
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                style={{ color: "var(--color-text-notActive)" }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm"
              style={{ color: "var(--color-text-primary)" }}
            >
              Choose Activity
            </label>
            <div className="relative">
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full px-4 py-3 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: "var(--color-gray-button-bg)",
                  color: "var(--color-text-notActive)",
                  border: "1px solid var(--color-gray-button-bg)",
                }}
              >
                <option value="">Choose one</option>
                <option value="activity1">Activity 1</option>
                <option value="activity2">Activity 2</option>
                <option value="activity3">Activity 3</option>
              </select>
              <ChevronDownIcon
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                style={{ color: "var(--color-text-notActive)" }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm"
            style={{ color: "var(--color-text-primary)" }}
          >
            Choose Timestamp - start
          </label>
          <div className="relative">
            <select
              value={timestampStart}
              onChange={(e) => setTimestampStart(e.target.value)}
              className="w-full px-4 py-3 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: "var(--color-gray-button-bg)",
                color: "var(--color-text-notActive)",
                border: "1px solid var(--color-gray-button-bg)",
              }}
            >
              <option value="">Choose one</option>
              <option value="timestamp1">Timestamp 1</option>
              <option value="timestamp2">Timestamp 2</option>
              <option value="timestamp3">Timestamp 3</option>
            </select>
            <ChevronDownIcon
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
              style={{ color: "var(--color-text-notActive)" }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm"
            style={{ color: "var(--color-text-primary)" }}
          >
            Choose Timestamp - Finish
          </label>
          <div className="relative">
            <select
              value={timestampFinish}
              onChange={(e) => setTimestampFinish(e.target.value)}
              className="w-full px-4 py-3 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: "var(--color-gray-button-bg)",
                color: "var(--color-text-notActive)",
                border: "1px solid var(--color-gray-button-bg)",
              }}
            >
              <option value="">Choose one</option>
              <option value="finish1">Finish 1</option>
              <option value="finish2">Finish 2</option>
              <option value="finish3">Finish 3</option>
            </select>
            <ChevronDownIcon
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
              style={{ color: "var(--color-text-notActive)" }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-80 hover:cursor-pointer"
            style={{
              backgroundColor: "var(--color-gray-button-bg)",
              color: "var(--color-text-primary)",
            }}
          >
            Previous
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-90 hover:cursor-pointer bg-[#574bff]"
            style={{
              color: "var(--color-text-primary)",
            }}
          >
            Confirm and submit
          </button>
        </div>
      </form>
    </div>
  );
}
