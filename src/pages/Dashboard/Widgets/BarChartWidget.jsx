"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function BarChartWidget({
  title = "Bar Chart",
  orientation = "horizontal",
  rtk_data,
}) {
  const [chartData, setChartData] = useState([]);
  const [bottleneck, setBottleneck] = useState(null);

  useEffect(() => {
    if (!rtk_data) return;
    if (title === "Time Lost to Bottleneck + Bottleneck Severity Index") {
      // prepare bar chart data
      if (rtk_data?.Activity_Average_Processing_Time_Hours) {
        const raw = rtk_data.Activity_Average_Processing_Time_Hours;
        const formatted = Object.entries(raw).map(([key, value]) => ({
          name: key,
          value: value,
        }));
        setChartData(formatted);
      }

      // prepare bottleneck table data
      if (rtk_data?.Largest_Bottleneck_Metrics) {
        setBottleneck(rtk_data.Largest_Bottleneck_Metrics);
      }
    }
  }, [rtk_data]);

  return (
    <div
      className="p-6 rounded-lg border w-full h-full flex flex-col gap-6"
      style={{
        backgroundColor: "var(--color-gray-button-bg)",
        borderColor: "var(--color-button-outline)",
      }}
    >
      {/* Chart Title */}
      {title && (
        <h3
          className="text-sm font-medium"
          style={{ color: "var(--color-main-text)" }}
        >
          {title}
        </h3>
      )}

      {title === "Time Lost to Bottleneck + Bottleneck Severity Index" && (
        <>
          {/* Chart */}
          <div className="flex-1 w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout={
                  orientation === "horizontal" ? "horizontal" : "vertical"
                }
                margin={{ top: 10, right: 20, left: 0, bottom: 60 }}
              >
                {orientation === "horizontal" ? (
                  <>
                    <XAxis
                      type="category"
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      interval={0}
                      angle={-40}
                      textAnchor="end"
                      tick={{ fill: "var(--color-main-text)", fontSize: 11 }}
                    />
                    <YAxis
                      type="number"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--color-main-text)", fontSize: 12 }}
                    />
                  </>
                ) : (
                  <>
                    <XAxis
                      type="number"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--color-main-text)", fontSize: 12 }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      width={120}
                      tick={{ fill: "var(--color-main-text)", fontSize: 11 }}
                    />
                  </>
                )}

                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  formatter={(v) => [`${v.toFixed(2)} h`, "Avg Time"]}
                />
                <Bar
                  dataKey="value"
                  fill="var(--color-chart-main)"
                  radius={4}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Bottleneck Table */}
          {bottleneck && (
            <div className="border-t border-border pt-4">
              <h4
                className="text-sm font-semibold mb-3"
                style={{ color: "var(--color-main-text)" }}
              >
                Largest Bottleneck Metrics
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      {Object.keys(bottleneck).map((key) => (
                        <th
                          key={key}
                          className="text-left px-3 py-2 font-medium border-b border-border text-[13px]"
                          style={{ color: "var(--color-muted-text)" }}
                        >
                          {key.replace(/_/g, " ")}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.entries(bottleneck).map(([key, value]) => (
                        <td
                          key={key}
                          className="px-3 py-2 border-b border-border"
                          style={{ color: "var(--color-main-text)" }}
                        >
                          {typeof value === "number" ? value.toFixed(2) : value}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
      {console.log(title)}
      {title === "Activity Frequency Distribution" &&
        Array.isArray(rtk_data?.Distribution) &&
        rtk_data.Distribution.length > 0 && (
          <ResponsiveContainer width="100%">
            <BarChart
              data={rtk_data.Distribution}
              layout="vertical"
              margin={{ top: 20, right: 40, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis
                type="number"
                tick={{ fill: "var(--color-main-text)" }}
                label={{
                  value: "Count",
                  position: "insideBottom",
                  offset: -5,
                  fill: "var(--color-main-text)",
                }}
              />
              <YAxis
                dataKey="activity"
                type="category"
                tick={{ fill: "var(--color-main-text)" }}
                width={100}
              />
              <Tooltip
                formatter={(val, name) =>
                  name === "percentage" ? `${val}%` : val
                }
                contentStyle={{
                  backgroundColor: "var(--color-gray-button-bg)",
                  border: "1px solid var(--color-button-outline)",
                }}
              />
              <Legend />
              <Bar
                dataKey="count"
                name="Count"
                fill="#8884d8"
                radius={[2, 2, 0, 0]}
                barSize={7}
              />
              <Bar
                dataKey="percentage"
                name="Percentage (%)"
                fill="#82ca9d"
                radius={[2, 2, 0, 0]}
                barSize={7}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
    </div>
  );
}
