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
  /* PDF export */
  /* --------------------------------------------------- */
  const handleExportPDF = async () => {
    if (!data) {
      toast.error("No data available to export.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await getPdf(data).unwrap();
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
  /* Loading UI */
  /* --------------------------------------------------- */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading benchmark report...
      </div>
    );
  }

  /* --------------------------------------------------- */
  /* Safe Data Extraction */
  /* --------------------------------------------------- */
  const report = data || {};
  const kpis = report.KPI_Benchmark ?? [];
  const summary = report.Executive_Summary ?? "No summary available.";
  const analysis = report.Analysis_Report ?? {};

  /* --------------------------------------------------- */
  /* Render */
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
            backgroundColor: "#574bff",
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
                  <th
                    className="px-4 py-3 text-left text-sm font-medium"
                    style={{ color: "var(--color-text-notActive)" }}
                  >
                    Metric
                  </th>
                  {/* Dynamic Team 1 Header */}
                  <th
                    className="px-4 py-3 text-left text-sm font-medium"
                    style={{ color: "var(--color-text-notActive)" }}
                  >
                    {kpis[0]?.Team_1_Label || "Team 1"}
                  </th>
                  {/* Dynamic Team 2 Header */}
                  <th
                    className="px-4 py-3 text-left text-sm font-medium"
                    style={{ color: "var(--color-text-notActive)" }}
                  >
                    {kpis[0]?.Team_2_Label || "Team 2"}
                  </th>
                  <th
                    className="px-4 py-3 text-center text-sm font-medium w-1/4"
                    style={{ color: "var(--color-text-notActive)" }}
                  >
                    Evaluation
                  </th>
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
                    {/* Team 1 Value Only */}
                    <td
                      className="px-4 py-3 text-sm"
                      style={{ color: "var(--color-dark-text)" }}
                    >
                      {typeof item.Team_1_Value === "number"
                        ? item.Team_1_Value.toLocaleString(undefined, {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 2,
                          })
                        : item.Team_1_Value}
                    </td>
                    {/* Team 2 Value Only */}
                    <td
                      className="px-4 py-3 text-sm"
                      style={{ color: "var(--color-dark-text)" }}
                    >
                      {typeof item.Team_2_Value === "number"
                        ? item.Team_2_Value.toLocaleString(undefined, {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 2,
                          })
                        : item.Team_2_Value}
                    </td>
                    {/* Status */}
                    <td
                      className="px-4 py-3 text-sm font-medium text-center"
                      style={{
                        color:
                          item.Status === "Equal"
                            ? "var(--color-info)"
                            : item.Status.includes("higher")
                            ? "var(--color-success)"
                            : "var(--color-warning)",
                      }}
                    >
                      {item.Status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Analysis Sections – Improved */}
        {[
          { key: "loop_analysis", title: "Loops Analysis" },
          { key: "bottleneck_analysis", title: "Bottlenecks Analysis" },
          { key: "dropout_analysis", title: "Dropout Analysis" },
          { key: "happy_path", title: "Happy Path (Benchmark Reference)" },
          {
            key: "recommendation_to_action",
            title: "Recommendation to Action + Simulation",
          },
          { key: "method_notes", title: "Method Notes" },
          { key: "appendix", title: "Appendix" },
        ].map(({ key, title }) => (
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
