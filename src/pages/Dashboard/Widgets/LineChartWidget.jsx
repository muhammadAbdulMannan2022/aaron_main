import { BarChart } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

export default function LineChartWidget({
  title = "Line Chart",
  rtk_data = [],
}) {
  const hasData = Array.isArray(rtk_data) && rtk_data.length > 0; // for ave vs med cycle time
  const variantChangedData =
    Array.isArray(rtk_data.Variant_Change_Trend) &&
    rtk_data.Variant_Change_Trend.length > 0 &&
    rtk_data.Variant_Change_Trend.length; // for variant change

  return (
    <div
      className="p-6 rounded-lg border h-full w-full transition-colors duration-300 
        bg-[var(--color-gray-button-bg)] border-[var(--color-button-outline)]"
    >
      {title && (
        <h3
          className="text-sm font-medium mb-4 transition-colors duration-300
            text-[var(--color-main-text)]"
        >
          {title}
        </h3>
      )}

      <div className="h-[calc(100%-2rem)]">
        {title === "Average vs. Median Cycle Time" && hasData && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={rtk_data}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis
                dataKey="month"
                tick={{ fill: "var(--color-main-text)" }}
              />
              <YAxis tick={{ fill: "var(--color-main-text)" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-gray-button-bg)",
                  border: "1px solid var(--color-button-outline)",
                }}
              />
              <Legend />
              {/* 💡 Two lines: Average + Median */}
              <Line
                type="monotone"
                dataKey="average_cycle_time_days"
                name="Average (days)"
                stroke="#8884d8"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="median_cycle_time_days"
                name="Median (days)"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
        {/* {console.log(rtk_data.Variant_Change_Trend, "kdsaldhfglasjdsdlfdjal")} */}
        {title === "Variant Change Over Time" &&
          Array.isArray(rtk_data?.Variant_Change_Trend) &&
          rtk_data.Variant_Change_Trend.length > 0 && (
            <div className="w-full min-h-52 h-full">
              <ResponsiveContainer>
                <LineChart
                  data={rtk_data.Variant_Change_Trend}
                  margin={{ top: 20, right: -10, left: -10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Time_Period_Label" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  {/* <Tooltip /> */}
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="Unique_Variant_Count"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="Total_Cases_Completed"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="Variant_Complexity_Index"
                    stroke="#ff7300"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        {title === "Case Throughput Rate" &&
          Array.isArray(rtk_data?.Throughput_Distribution) &&
          rtk_data.Throughput_Distribution.length > 0 && (
            <ResponsiveContainer width="100%">
              <LineChart
                data={rtk_data.Throughput_Distribution}
                margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                  dataKey="period"
                  tick={{ fill: "var(--color-main-text)" }}
                  angle={-45}
                  textAnchor="end"
                  height={70}
                />
                <YAxis
                  tick={{ fill: "var(--color-main-text)" }}
                  label={{
                    value: "Count",
                    angle: -90,
                    position: "insideLeft",
                    fill: "var(--color-main-text)",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-gray-button-bg)",
                    border: "1px solid var(--color-button-outline)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  name="Throughput Count"
                  stroke="#00bcd4"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
      </div>
    </div>
  );
}
