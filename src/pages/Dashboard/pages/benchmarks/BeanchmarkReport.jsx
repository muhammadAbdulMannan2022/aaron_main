"use client";

import { FiDownload } from "react-icons/fi";
import { useLocation } from "react-router";
import {
  useGetBanchmarkQuery,
  useGetBanchmarkPdfMutation,
} from "../../../../../redux/api/api";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BeanchmarkReportPage() {
  const processName = "Loops, Bottlenecks, Dropouts";
  const location = useLocation();
  const { id } = location.state || {};

  const { data, isLoading } = useGetBanchmarkQuery(id, { skip: !id });
  const [getPdf, { isLoading: isPdfLoading }] = useGetBanchmarkPdfMutation();
  const [loadingFile, setIsLoading] = useState(false);

  /* --------------------------------------------------- */
  /* PDF export (unchanged – works with the new shape)   */
  /* --------------------------------------------------- */
  const handleExportPDF = async () => {
    if (!data) {
      toast.error("No data available to export.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await getPdf(data).unwrap(); // returns raw PDF text
      const blob = new Blob([res], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `Benchmark_Report_${id}.pdf`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("PDF downloaded successfully!");
    } catch (err) {
      console.error("PDF download failed:", err);
      toast.error("Failed to download PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* --------------------------------------------------- */
  /* Loading UI                                          */
  /* --------------------------------------------------- */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading benchmark report...
      </div>
    );
  }

  /* --------------------------------------------------- */
  /* Data extraction (safe)                              */
  /* --------------------------------------------------- */
  const report = data || {};
  const kpis = report.KPI_Benchmark ?? [];
  const summary = report.Executive_Summary ?? "No summary available.";
  const analysis = report.Analysis_Report ?? {};

  /* --------------------------------------------------- */
  /* Render                                              */
  /* --------------------------------------------------- */
  return (
    <div
      style={{ backgroundColor: "var(--color-main-bg)" }}
      className="text-white min-h-screen p-6"
    >
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-xl font-medium mb-1"
            style={{ color: "var(--color-text-primary)" }}
          >
            Process Benchmark Report ({processName})
          </h1>
          <p className="text-sm" style={{ color: "var(--color-dark-text)" }}>
            Generated on{" "}
            {new Date().toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <button
          onClick={handleExportPDF}
          disabled={isPdfLoading || loadingFile || !data}
          className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors font-medium text-sm hover:cursor-pointer disabled:opacity-50"
          style={{
            backgroundColor: "var(--color-user-main-color)",
            color: "var(--color-text-primary)",
          }}
        >
          <FiDownload className="w-4 h-4" />
          {isPdfLoading || loadingFile ? "Exporting..." : "Export PDF"}
        </button>
      </div>

      <div className="space-y-10">
        {/* Executive Summary */}
        <section>
          <h2
            className="text-lg font-medium mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            Executive Summary
          </h2>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-dark-text)" }}
          >
            {summary}
          </p>
        </section>

        {/* KPI Table – now matches the real JSON fields */}
        <section>
          <h2
            className="text-lg font-medium mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            KPI Benchmark Table
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr
                  className="border-b"
                  style={{ borderColor: "var(--color-gray-button-bg)" }}
                >
                  {[
                    "Metric",
                    "Team 1 (team json)",
                    "Team 2 (team json)",
                    "Status (Team 1 vs Team 2)",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-4 py-3 text-left text-sm font-medium"
                      style={{ color: "var(--color-text-notActive)" }}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {kpis.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b"
                    style={{ borderColor: "var(--color-gray-button-bg)" }}
                  >
                    <td
                      className="px-4 py-3 text-sm"
                      style={{ color: "var(--color-dark-text)" }}
                    >
                      {item.Metric}
                    </td>
                    <td
                      className="px-4 py-3 text-sm"
                      style={{ color: "var(--color-dark-text)" }}
                    >
                      {typeof item["Team 1 (team json)"] === "number"
                        ? item["Team 1 (team json)"].toLocaleString()
                        : item["Team 1 (team json)"]}
                    </td>
                    <td
                      className="px-4 py-3 text-sm"
                      style={{ color: "var(--color-dark-text)" }}
                    >
                      {typeof item["Team 2 (team json)"] === "number"
                        ? item["Team 2 (team json)"].toLocaleString()
                        : item["Team 2 (team json)"]}
                    </td>
                    <td
                      className="px-4 py-3 text-sm"
                      style={{ color: "var(--color-dark-text)" }}
                    >
                      {item["Status (Team 1 vs Team 2)"]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Analysis Sections – nested object handling */}
        {[
          ["loop_analysis", "Loops Analysis"],
          ["bottleneck_analysis", "Bottlenecks Analysis"],
          ["dropout_analysis", "Dropout Analysis"],
          ["happy_path", "Happy Path (Benchmark Reference)"],
          ["recommendation_to_action", "Recommendation to Action + Simulation"],
          ["method_notes", "Method Notes"],
          ["appendix", "Appendix"],
        ].map(([key, title]) => (
          <section key={key}>
            <h2
              className="text-lg font-medium mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              {title}
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-dark-text)" }}
            >
              {analysis[key]?.[key] ?? "No data available for this section."}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
