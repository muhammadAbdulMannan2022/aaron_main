import { useState } from "react";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { Modal } from "../../../../helpers/Modal";
import { CsvUploadFormVariant } from "../../Contents/modalContent/CsvUploadFirst";
import { CsvUploadForm } from "../../Contents/modalContent/UploadCsv";
import { useNavigate } from "react-router";
import { useGetAllProjectsQuery } from "../../../../../redux/api/api";

export default function BenchmarkTable() {
  const { data: projectsData, isLoading } = useGetAllProjectsQuery();
  const [openActionId, setOpenActionId] = useState(null);
  const navigate = useNavigate();

  // modals controle
  const [isUploading, setIsUploading] = useState(false);

  const handleStart = (item) => {
    if (!item.id) return;
    setOpenActionId(item.id);
    setIsUploading(true);

    console.log("Start:", item);
  };

  const handleReport = (item) => {
    console.log("Report:", item);
    navigate("/dashboard/v1/benchmarks/report", { state: { id: item.id } });
  };

  const handleAdd = () => {
    setIsUploading(true);
    console.log("Add new benchmark");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  const onlyOrginalProjects = projectsData?.results.filter(
    (project) => project.copy !== true
  );

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium text-text-primary">
          Comparison benchmarks
        </h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#574bff] hover:bg-[#574bff]/80 hover:cursor-pointer text-white rounded-md transition-colors"
        >
          Add
          <FiPlus className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-black rounded-lg overflow-hidden">
        {/* Table container with horizontal scroll */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">
                  Process
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">
                  Analyzed csv
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">
                  Uploaded CSV
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">
                  Analysis
                </th>
                {/* <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">
                  Action
                </th> */}
              </tr>
            </thead>
            <tbody>
              {onlyOrginalProjects &&
                onlyOrginalProjects.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-notActive">
                        {item.process}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-notActive">
                        {new Date(item.created_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#574bff] underline">
                        <a target="_blank" href={item.csv_file}>
                          File
                        </a>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-notActive">
                        {item.related_project
                          ? `id: ${item.related_project}`
                          : "No file"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {item?.related_project ? (
                        <button
                          onClick={() => handleReport(item)}
                          className="text-[#574bff] hover:text-[#574bff]/80 hover:cursor-pointer text-sm font-medium transition-colors"
                        >
                          Report
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStart(item)}
                          className="text-[#574bff] hover:text-[#574bff]/80 hover:cursor-pointer text-sm font-medium transition-colors"
                        >
                          Start
                        </button>
                      )}
                    </td>
                    {/* <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(item)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-800 transition-colors hover:cursor-pointer"
                    >
                      <FiTrash2 className="w-4 h-4 text-red-700" />
                    </button>
                  </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isUploading} onClose={() => setIsUploading(false)}>
        <CsvUploadFormVariant
          isRelated={true}
          relatedProjectI={openActionId}
          onClose={() => setIsUploading(false)}
        />
      </Modal>
    </div>
  );
}
