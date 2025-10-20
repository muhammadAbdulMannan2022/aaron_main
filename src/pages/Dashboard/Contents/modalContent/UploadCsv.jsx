import { useContext, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { modalContext } from "../../DashboardLayout";
import {
  useGetCollQuery,
  useSteColNameMutation,
} from "../../../../../redux/api/api";

export function CsvUploadForm({ onClose }) {
  const [createHappyPath, setCreateHappyPath] = useState(false);
  const [caseId, setCaseId] = useState("");
  const [activity, setActivity] = useState("");
  const [timestampStart, setTimestampStart] = useState("");
  const [timestampFinish, setTimestampFinish] = useState("");

  const { currentFileId } = useContext(modalContext);

  // rtk query
  const {
    data: collListData,
    isLoading,
    isError,
    refetch,
  } = useGetCollQuery(currentFileId, {
    skip: !currentFileId,
  });
  const [submitColl, { isLoading: isSetColLoading }] = useSteColNameMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      project: currentFileId,
      happy_path: createHappyPath,
      case_id: caseId,
      activity,
      timestamp_start: timestampStart,
      timestamp_end: timestampFinish,
    };

    try {
      const res = await submitColl(payload).unwrap();
      console.log("✅ Columns submitted:", res);

      // close modal if success
      onClose?.();
    } catch (error) {
      console.error("❌ Failed to submit columns:", error);
    }
  };

  // dropdown options
  const columns = collListData?.columns ?? [];

  return (
    <div className="p-6 space-y-6 max-w-lg w-full md:w-lg">
      <div className="text-center space-y-2">
        <h2
          className="text-2xl font-semibold"
          style={{ color: "var(--color-text-primary)" }}
        >
          Define Columns
        </h2>
        {/* <p style={{ color: "var(--color-main-text)" }}>
          Empowering hotels and restaurants with AI-
        </p> */}
      </div>

      {isLoading ? (
        <p
          className="text-center text-sm"
          style={{ color: "var(--color-text-notActive)" }}
        >
          Loading columns...
        </p>
      ) : isError ? (
        <p className="text-center text-red-500 text-sm">
          Failed to load columns.{" "}
          <button onClick={refetch} className="underline hover:opacity-80">
            Retry
          </button>
        </p>
      ) : (
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
              {/* No */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={!createHappyPath}
                  onChange={() => setCreateHappyPath(false)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                    !createHappyPath ? "border-gray-500" : "border-gray-400"
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
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 
                        1 0 01-1.414 0l-4-4a1 1 0 
                        011.414-1.414L8 12.586l7.293-7.293a1 
                        1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span style={{ color: "var(--color-text-primary)" }}>No</span>
              </label>
              {/* Yes */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
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
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 
                        1 0 01-1.414 0l-4-4a1 1 0 
                        011.414-1.414L8 12.586l7.293-7.293a1 
                        1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span style={{ color: "var(--color-text-primary)" }}>Yes</span>
              </label>
            </div>
          </div>

          {/* Dropdowns */}
          {[
            { label: "Choose Case ID", value: caseId, setter: setCaseId },
            { label: "Choose Activity", value: activity, setter: setActivity },
            {
              label: "Choose Timestamp - Start",
              value: timestampStart,
              setter: setTimestampStart,
            },
            {
              label: "Choose Timestamp - Finish",
              value: timestampFinish,
              setter: setTimestampFinish,
            },
          ].map((field, idx) => (
            <div key={idx} className="space-y-2">
              <label
                className="block text-sm"
                style={{ color: "var(--color-text-primary)" }}
              >
                {field.label}
              </label>
              <div className="relative">
                <select
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: "var(--color-gray-button-bg)",
                    color: "var(--color-text-notActive)",
                    border: "1px solid var(--color-gray-button-bg)",
                  }}
                >
                  <option value="">Choose one</option>
                  {columns.map((col, i) => (
                    <option key={i} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                  style={{ color: "var(--color-text-notActive)" }}
                />
              </div>
            </div>
          ))}

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
              disabled={isSetColLoading}
              className="flex-1 px-6 py-3 disabled:cursor-not-allowed rounded-lg font-medium transition-colors hover:opacity-90 hover:cursor-pointer bg-[#574bff]"
              style={{
                color: "var(--color-text-primary)",
              }}
            >
              Confirm and submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
