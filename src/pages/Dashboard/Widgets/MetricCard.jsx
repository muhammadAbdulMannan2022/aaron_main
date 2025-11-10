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
      <div className="relative z-10 items-center justify-center">
        {/* <h3
          className="text-sm font-medium mb-4"
          style={{ color: "var(--color-main-text)" }}
        >
          {title}
        </h3> */}
        {rtk_data && (
          <div className="" style={{ color: "var(--color-text-primary)" }}>
            {(title === "Cycle Time" ||
              title === "Median Cycle Time" ||
              title === "Average Idle Time") && (
              <div className="flex flex-wrap gap-2 justify-center">
                {/* {console.log(rtk_data)} */}
                {Object.entries(rtk_data).map(
                  ([key, value]) =>
                    key !== "Total_Cases" && (
                      <div
                        key={key}
                        className="rounded-2xl w-[200px]  p-4 bg-card shadow-sm bg-white/10 backdrop-blur-sm hover:shadow-md transition-shadow"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#574bff] opacity-80">
                          {key.replace(/_/g, " ")}
                        </p>
                        <p className="font-semibold text-foreground mt-1 text-2xl text-white">
                          {typeof value === "number"
                            ? value.toLocaleString()
                            : value}{" "}
                          <span className="text-sm text-main-icon">h</span>
                        </p>
                      </div>
                    )
                )}
              </div>
            )}

            {(title === "Total Number of Cases" ||
              title === "Total Completed Cases" ||
              title === "total completed cases") && (
              <div className="rounded-2xl w-fit items-center justify-center  p-4 bg-card shadow-sm bg-white/10 backdrop-blur-sm hover:shadow-md transition-shadow">
                {Object.entries(rtk_data).map(([key, value]) => (
                  <div key={key} className="w-fit">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#574bff] opacity-80">
                      {key.replace(/_/g, " ")}
                    </p>
                    <p
                      className={`${
                        title === "Total Completed Cases"
                          ? " text-center"
                          : "text-xl"
                      } `}
                    >
                      {typeof value === "number"
                        ? value.toLocaleString()
                        : value}{" "}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {(title === "Total Idle Time / Idle Time Ratio" ||
              title === "Total Loops / Loops Ratio" ||
              title === "Number of Process Variants" ||
              title === "Top 5 Process Variants (Count & %)" ||
              title === "First Pass Rate" ||
              title === "Longest Waiting Time Step" ||
              title === "Variant Complexity Index" ||
              title === "Cases Following Top Variant" ||
              title === "max steps in a case" ||
              title === "minimum cycle time") && (
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden w-fit">
                {/* Subtle brand glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#574bff]/20 via-transparent to-transparent opacity-40"></div>
                <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-[#574bff]/10 rounded-full blur-3xl animate-pulse"></div>

                <div className="relative z-10 space-y-4">
                  {/* Title */}
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#574bff] opacity-80">
                    {title}
                  </p>
                  {/* {console.log(rtk_data, "kkkkkkkkkkkkkkkkkkkkkkkk")} */}

                  {/* Key-Value Rows */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                    {Object.entries(rtk_data).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <p className="text-xs font-medium text-gray-400">
                          {key.replace(/_/g, " ")}
                        </p>
                        <p className="text-lg font-bold text-white mt-0.5">
                          {typeof value === "number"
                            ? key.includes("Average")
                              ? value.toFixed(2)
                              : value.toLocaleString()
                            : value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {title === "Dropout Rate" && (
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden w-fit">
                {/* Subtle brand glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#574bff]/20 via-transparent to-transparent opacity-40"></div>
                <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-[#574bff]/10 rounded-full blur-3xl animate-pulse"></div>

                <div className="relative z-10 space-y-4">
                  {/* Title */}
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#574bff] opacity-80">
                    {title}
                  </p>
                  {/* {console.log(rtk_data, "kkkkkkkkkkkkkkkkkkkkkkkk")} */}

                  {/* Key-Value Rows */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                    {rtk_data?.Dropout_Activity_Counts &&
                      Object.entries(rtk_data?.Dropout_Activity_Counts).map(
                        ([key, value]) => (
                          <div key={key} className="flex flex-col">
                            <p className="text-xs font-medium text-gray-400">
                              {key.replace(/_/g, " ")}
                            </p>
                            <p className="text-lg font-bold text-white mt-0.5">
                              {typeof value === "number"
                                ? key.includes("Average")
                                  ? value.toFixed(2)
                                  : value.toLocaleString()
                                : value}
                            </p>
                          </div>
                        )
                      )}
                    <div>
                      <p className="text-xs font-medium text-gray-400">
                        {"Dropout_Rate_Percentage".replace(/_/g, " ")}
                      </p>
                      <p className="text-lg font-bold text-white mt-0.5">
                        {rtk_data?.Dropout_Rate_Percentage &&
                          rtk_data?.Dropout_Rate_Percentage}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {title === "Average Deviation from Happy Path" && (
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden w-fit">
                {/* Subtle brand glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#574bff]/20 via-transparent to-transparent opacity-40"></div>
                <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-[#574bff]/10 rounded-full blur-3xl animate-pulse"></div>

                <div className="relative z-10 space-y-4">
                  {/* Title */}
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#574bff] opacity-80">
                    {title}
                  </p>
                  {/* {console.log(rtk_data, "kkkkkkkkkkkkkkkkkkkkkkkk")} */}

                  {/* Key-Value Rows */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                    {rtk_data &&
                      Object.entries(rtk_data).map(
                        ([key, value]) =>
                          key !== "Deviation_Activity_Distribution" && (
                            <div key={key} className="flex flex-col">
                              <p className="text-xs font-medium text-gray-400">
                                {key.replace(/_/g, " ")}
                              </p>
                              <p className="text-lg font-bold text-white mt-0.5">
                                {typeof value === "number"
                                  ? key.includes("Average")
                                    ? value.toFixed(2)
                                    : value.toLocaleString()
                                  : value}
                              </p>
                            </div>
                          )
                      )}
                    <div>
                      <p className="text-xs font-medium text-gray-400">
                        {"Dropout_Rate_Percentage".replace(/_/g, " ")}
                      </p>
                      <p className="text-lg font-bold text-white mt-0.5">
                        {rtk_data?.Dropout_Rate_Percentage &&
                          rtk_data?.Dropout_Rate_Percentage}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {title === "Cost per Case" && rtk_data && (
              <div className="p-4 rounded-xl border border-border bg-white/10 backdrop-blur-sm bg-card shadow-sm">
                {/* Header info */}
                <div className="mb-4 text-center">
                  <h2 className="text-lg font-semibold">
                    {rtk_data.process_name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Total Cost:{" "}
                    <span className="font-medium">
                      {rtk_data.total_cost_all_activities} {rtk_data.currency}
                    </span>
                  </p>
                </div>
                {/* {console.log(rtk_data, "klhdlgfsajldjfgjsalfglsja")} */}

                {/* Conditional Table */}
                {Array.isArray(rtk_data) && rtk_data.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-border rounded-lg overflow-hidden text-sm">
                      <thead className="bg-muted text-muted-foreground">
                        <tr>
                          <th className="border border-border px-3 py-2 text-left">
                            Activity Name
                          </th>

                          <th className="border border-border px-3 py-2 text-right">
                            Total Cost
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rtk_data.map((item, idx) => (
                          <tr
                            key={idx}
                            className="hover:bg-muted/30 transition-colors"
                          >
                            <td className="border border-border px-3 py-2">
                              {item?.activity_name
                                ? item?.activity_name
                                : "N/A"}
                            </td>

                            <td className="border border-border px-3 py-2 text-right font-medium">
                              {item?.cost_per_h ? item?.cost_per_h : "N/A"} $/h
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    No activity cost data available.
                  </p>
                )}
              </div>
            )}
            {title === "Average Time Saved Potential" && rtk_data && (
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
                {/* Subtle brand glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#574bff]/20 via-transparent to-transparent opacity-40"></div>
                <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-[#574bff]/10 rounded-full blur-3xl animate-pulse"></div>

                <div className="relative z-10">
                  {/* KPI Label */}
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#574bff] opacity-80">
                    {rtk_data.KPI_Name}
                  </p>

                  {/* Big Number */}
                  <div className="mt-2 flex items-baseline gap-2">
                    <h2 className="text-4xl font-bold text-white">
                      {Number(
                        rtk_data.Average_Time_Saved_Potential_Per_Case_Hours
                      ).toFixed(1)}
                    </h2>
                    <span className="text-sm text-gray-400">hrs</span>
                  </div>

                  <p className="text-sm text-gray-300 mt-1">
                    saved{" "}
                    <span className="font-medium text-white">per case</span> on
                    average
                  </p>

                  {/* Total Impact */}
                  <div className="mt-5 flex items-center justify-between text-sm">
                    <div>
                      <p className="text-gray-400">
                        Total Time Saved (All Cases)
                      </p>
                      <p className="text-xl font-bold text-[#574bff] mt-1">
                        {Number(
                          rtk_data.Total_Time_Saved_Potential_Hours
                        ).toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}
                        <span className="text-sm font-normal text-gray-300 ml-1">
                          hrs
                        </span>
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-gray-400">
                        Out of {rtk_data.Total_Cases} cases
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {rtk_data.Cases_Outside_HappyPath_Variance} high
                        variance
                      </p>
                    </div>
                  </div>

                  {/* Mini Insight */}
                  <div className="mt-4 flex items-center gap-3 text-xs">
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                      {(
                        Number(
                          rtk_data.Cases_Outside_HappyPath_Variance /
                            rtk_data.Total_Cases
                        ) * 100
                      ).toFixed(0)}
                      % opportunity
                    </span>
                    <span className="text-gray-500">
                      {rtk_data.Cases_Within_HappyPath_Variance} cases on track
                    </span>
                  </div>
                </div>
              </div>
            )}
            {title === "Largest Bottleneck" && rtk_data && (
              <div className="space-y-4">
                {/* Glassmorphic #1 Bottleneck Card */}
                {rtk_data.Top_Bottlenecks?.[0] && (
                  <div className="relative p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#574bff]/20 to-transparent opacity-50"></div>

                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#574bff] opacity-80">
                          Largest Bottleneck
                        </p>
                        <h3 className="text-2xl font-bold text-white mt-1">
                          {rtk_data.Top_Bottlenecks[0].Activity}
                        </h3>
                        <p className="text-sm text-gray-300 mt-2">
                          <span className="text-[#574bff] font-semibold">
                            {rtk_data.Top_Bottlenecks[0].Average_Duration_Hours.toFixed(
                              2
                            )}{" "}
                            hrs
                          </span>{" "}
                          avg —{" "}
                          <span className="text-white/80">
                            {rtk_data.Top_Bottlenecks[0].Total_Occurrences.toLocaleString()}{" "}
                            times
                          </span>
                        </p>
                      </div>

                      {/* 7.2x Badge */}
                      <div className="text-right">
                        <p className="text-xs text-gray-400">vs. Overall Avg</p>
                        <div className="inline-flex items-center px-3 py-1 mt-1 rounded-full bg-[#574bff]/20 border border-[#574bff]/40">
                          <span className="text-lg font-bold text-[#574bff]">
                            {(
                              rtk_data.Top_Bottlenecks[0]
                                .Average_Duration_Hours /
                              rtk_data.Overall_Average_Activity_Duration_Hours
                            ).toFixed(1)}
                            x
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Micro animation pulse (optional) */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#574bff]/10 rounded-full blur-3xl animate-pulse"></div>
                  </div>
                )}

                {/* Expandable Full List (Glass Table) */}
                {rtk_data.Top_Bottlenecks &&
                  rtk_data.Top_Bottlenecks.length > 1 && (
                    <details className="text-sm">
                      <summary className="cursor-pointer text-gray-400 hover:text-white text-xs font-medium mb-3 flex items-center gap-1">
                        <span>View all bottlenecks</span>
                        <span className="text-[#574bff]">
                          ({rtk_data.Top_Bottlenecks.length})
                        </span>
                      </summary>

                      <div className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="border-b border-white/10">
                                <th className="px-4 py-3 text-left font-medium text-gray-300">
                                  Activity
                                </th>
                                <th className="px-4 py-3 text-left font-medium text-gray-300">
                                  Avg (hrs)
                                </th>
                                <th className="px-4 py-3 text-left font-medium text-gray-300">
                                  Count
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {rtk_data.Top_Bottlenecks.map((item, i) => (
                                <tr
                                  key={i}
                                  className={`border-b border-white/5 transition-colors ${
                                    i === 0 ? "bg-[#574bff]/10 font-medium" : ""
                                  }`}
                                >
                                  <td className="px-4 py-3 text-white">
                                    {item.Activity}
                                  </td>
                                  <td className="px-4 py-3 text-gray-200">
                                    {item.Average_Duration_Hours.toFixed(2)}
                                  </td>
                                  <td className="px-4 py-3 text-gray-200">
                                    {item.Total_Occurrences.toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </details>
                  )}

                {/* No Data */}
                {!rtk_data.Top_Bottlenecks ||
                  (rtk_data.Top_Bottlenecks.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                      <p className="text-sm">No bottleneck data available.</p>
                    </div>
                  ))}
              </div>
            )}
            {title === "Median / Average Steps per Case" && rtk_data && (
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden w-fit">
                {/* Subtle brand glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#574bff]/20 via-transparent to-transparent opacity-40"></div>
                <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-[#574bff]/10 rounded-full blur-3xl animate-pulse"></div>

                <div className="relative z-10 space-y-4">
                  {/* Title */}
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#574bff] opacity-80">
                    Process Efficiency Metrics
                  </p>
                  {/* {console.log(rtk_data, "kkkkkkkkkkkkkkkkkkkkkkkkkk")} */}
                  {/* Key-Value Rows */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                    {Object.entries(rtk_data).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <p className="text-xs font-medium text-gray-400">
                          {key.replace(/_/g, " ")}
                        </p>
                        <p className="text-lg font-bold text-white mt-0.5">
                          {typeof value === "number"
                            ? key.includes("Average")
                              ? value.toFixed(2)
                              : value.toLocaleString()
                            : value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
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
