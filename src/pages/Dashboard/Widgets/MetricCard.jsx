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
          className="text-sm font-medium mb-4"
          style={{ color: "var(--color-main-text)" }}
        >
          {title}
          {/* {alert(title)} */}
        </h3>
        {rtk_data && (
          <div className="" style={{ color: "var(--color-text-primary)" }}>
            {title === "Cycle Time" && (
              <div className="flex flex-wrap gap-2 justify-center">
                {Object.entries(rtk_data).map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-2xl w-[200px] border border-border p-4 bg-card shadow-sm bg-white/10 backdrop-blur-sm hover:shadow-md transition-shadow"
                  >
                    <p className="text-xs font-medium text-muted-foreground">
                      {key.replace(/_/g, " ")}
                    </p>
                    <p className="text-xl font-semibold text-foreground mt-1 text-[var(--color-main-text)]">
                      {typeof value === "number"
                        ? value.toLocaleString()
                        : value}{" "}
                      h
                    </p>
                  </div>
                ))}
              </div>
            )}
            {title === "Total Number of Cases" && (
              <div className="rounded-2xl w-fit items-center justify-center border border-border p-4 bg-card shadow-sm bg-white/10 backdrop-blur-sm hover:shadow-md transition-shadow">
                {Object.entries(rtk_data).map(([key, value]) => (
                  <div key={key} className="w-fit">
                    <p className="text-3xl font-semibold text-foreground mt-1 text-[var(--color-main-text)]">
                      {typeof value === "number"
                        ? value.toLocaleString()
                        : value}{" "}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {title === "Total Idle Time / Idle Time Ratio" && (
              <div className="flex flex-wrap gap-2 justify-center">
                {Object.entries(rtk_data).map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-2xl w-[200px] border border-border p-4 bg-card shadow-sm bg-white/10 backdrop-blur-sm hover:shadow-md transition-shadow"
                  >
                    <p className="text-xs font-medium text-muted-foreground">
                      {key.replace(/_/g, " ")}
                    </p>
                    <p className="text-xl font-semibold text-foreground mt-1 text-[var(--color-main-text)]">
                      {(() => {
                        if (typeof value !== "number") return value;

                        if (key.includes("Percentage")) {
                          return `${value.toFixed(2)}%`;
                        } else if (key.toLowerCase().includes("s")) {
                          // seconds to hours
                          const hours = value / 3600;
                          return `${hours.toFixed(2)} h`;
                        } else if (key.toLowerCase().includes("h")) {
                          return `${value.toFixed(2)} h`;
                        } else {
                          return value.toLocaleString();
                        }
                      })()}
                    </p>
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
