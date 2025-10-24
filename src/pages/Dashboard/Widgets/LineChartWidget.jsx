import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function LineChartWidget({
  title = "Line Chart",
  rtk_data = [],
}) {
  const hasData = Array.isArray(rtk_data) && rtk_data.length > 0;

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
        {title === "Average vs. Median Cycle Time" && hasData ? (
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
        ) : (
          <div className="flex items-center justify-center h-full text-[var(--color-main-text)] text-sm">
            No data available
          </div>
        )}
      </div>
    </div>
  );
}
