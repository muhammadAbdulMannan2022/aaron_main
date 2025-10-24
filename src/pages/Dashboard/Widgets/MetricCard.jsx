import { AreaChart, Area, ResponsiveContainer, BarChart, Bar } from "recharts";

const defaultData = [
  { value: 20 },
  { value: 35 },
  { value: 25 },
  { value: 45 },
  { value: 30 },
  { value: 55 },
  { value: 40 },
];

export default function MetricCard({
  title = "Metric",
  value = "2,543",
  chartType = "area",
  data = defaultData,
  percentage = 75,
  rtk_data = null,
}) {
  return (
    <div
      className="p-4 rounded-lg  border relative flex flex-col h-full w-full overflow-hidden"
      style={{
        backgroundColor: "var(--color-gray-button-bg)",
        borderColor: "var(--color-button-outline)",
      }}
    >
      <div className="relative z-10">
        <h3
          className="text-sm font-medium mb-1"
          style={{ color: "var(--color-main-text)" }}
        >
          {title}
        </h3>
        {rtk_data && (
          <div className="" style={{ color: "var(--color-text-primary)" }}>
            {title === "Cycle Time" && (
              <div className="space-y-2">
                {Object.entries(rtk_data).map(([key, value]) => (
                  <div
                    key={key}
                    className="text-md font-bold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {key} : {value}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {(chartType === "area" || chartType === "bar") && (
        <div className="flex-1  opacity-30 absolute w-full h-full bottom-0 right-0">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" ? (
              <AreaChart data={data}>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-chart-main)"
                  fill="var(--color-chart-main)"
                  strokeWidth={2}
                />
              </AreaChart>
            ) : (
              <BarChart data={data.slice(-4)}>
                <Bar dataKey="value" fill="var(--color-chart-main)" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      )}

      {chartType === "progress" && percentage && (
        <div className="mt-2">
          <div
            className="w-full h-1 rounded-full"
            style={{ backgroundColor: "var(--color-main-bg)" }}
          >
            <div
              className="h-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor: "var(--color-chart-main)",
                width: `${percentage}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
