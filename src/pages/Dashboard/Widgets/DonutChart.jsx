import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const defaultData = [
  { name: "Series A", value: 35, color: "var(--color-chart-main)" },
  { name: "Series B", value: 25, color: "var(--color-chart-2nd)" },
  { name: "Series C", value: 40, color: "var(--color-chart-thard)" },
];

export default function DonutChart({
  title = "Donut Chart",
  centerValue = "100%",
  data = defaultData,
  rtk_data = {},
}) {
  const [idealChartData, setIdealChartData] = useState([]);
  const [loopsData, setLoopsData] = useState([]);
  const COLORSforPy = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
  ];

  const getColor = (index) => COLORSforPy[index % COLORSforPy.length];

  /* --------------------------------------------------------------- */
  /*  Idle / Loops data (unchanged)                                   */
  /* --------------------------------------------------------------- */
  useEffect(() => {
    if (rtk_data?.["Idle_Time_Ratio_Percentage"] !== undefined) {
      const idleValue = rtk_data["Idle_Time_Ratio_Percentage"];
      setIdealChartData([
        {
          name: "Idle",
          value: idleValue,
          color: "var(--color-chart-main)",
        },
        {
          name: "Rest of",
          value: Number((100 - idleValue).toFixed(2)),
          color: "var(--color-chart-secondary)",
        },
      ]);
    }
    if (rtk_data?.["Loops_Ratio_Percentage"] !== undefined) {
      const idleValue = rtk_data["Loops_Ratio_Percentage"];
      setLoopsData([
        {
          name: "Loop",
          value: idleValue,
          color: "var(--color-chart-main)",
        },
        {
          name: "Clean",
          value: Number((100 - idleValue).toFixed(2)),
          color: "var(--color-chart-secondary)",
        },
      ]);
    }
  }, [rtk_data]);

  const COLORS = ["#4841A8", "#4CAF50"];

  /* --------------------------------------------------------------- */
  /*  Helper – log the data that will be drawn                        */
  /* --------------------------------------------------------------- */
  if (title === "Happy-Path Compliance Rate") {
    console.log(
      "Happy-Path Compliance Rate – rendering data:",
      rtk_data?.Pie_Chart_Data
    );
  }

  return (
    <div
      className="p-6 rounded-lg border w-full h-full flex flex-col"
      style={{
        backgroundColor: "var(--color-gray-button-bg)",
        borderColor: "var(--color-button-outline)",
      }}
    >
      {title && title !== "Total Idle Time / Idle Time Ratio" && (
        <h3
          className="text-sm font-medium mb-4"
          style={{ color: "var(--color-main-text)" }}
        >
          {title}
        </h3>
      )}

      {/* ----------------------------------------------------------- */}
      {/*  CHART AREA – flex to fill remaining height                 */}
      {/* ----------------------------------------------------------- */}
      <div className="relative flex-1 flex flex-row items-center justify-center">
        {/* ---------- 1. Total Idle Time / Idle Time Ratio ---------- */}
        {title === "Total Idle Time / Idle Time Ratio" && rtk_data && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
            <div className="flex items-center gap-6">
              <div className="relative w-44 h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Idle",
                          value: rtk_data.Average_Idle_Time_Ratio_Percentage,
                        },
                        {
                          name: "Active",
                          value:
                            100 - rtk_data.Average_Idle_Time_Ratio_Percentage,
                        },
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius="60%"
                      outerRadius="85%"
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={2}
                    >
                      <Cell fill="#574bff" />
                      <Cell fill="#10b981" />
                    </Pie>

                    <Tooltip
                      formatter={(v) => `${v.toFixed(1)}%`}
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.85)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "8px",
                        fontSize: "12px",
                        padding: "6px 10px",
                        backdropFilter: "blur(8px)",
                      }}
                      itemStyle={{ color: "#fff", fontWeight: "500" }}
                      labelStyle={{ color: "#ccc", fontSize: "11px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {rtk_data.Average_Idle_Time_Ratio_Percentage.toFixed(0)}%
                    </div>
                    <div className="text-[10px] text-gray-400">Idle</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="text-sm text-gray-400 font-medium">
                  Idle Time Ratio
                </div>
                <div className="text-3xl font-bold text-white mt-1">
                  {rtk_data.Average_Idle_Time_Ratio_Percentage.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  <span className="font-medium text-[#574bff]">
                    {rtk_data.Average_Idle_Time_Hours_Per_Case.toFixed(1)} hrs
                  </span>{" "}
                  per case
                </div>
                <div className="text-xs text-gray-500">
                  across{" "}
                  <strong>{rtk_data.Total_Cases.toLocaleString()}</strong> cases
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------- 2. Total Loops / Loops Ratio ---------- */}
        {title === "Total Loops / Loops Ratio" && (
          <div className="flex items-center gap-4 w-full h-full">
            <div className="flex-1 min-h-[5rem] h-[12rem]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={loopsData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    innerRadius="45%"
                    paddingAngle={2}
                  >
                    {loopsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {rtk_data?.["Loops_Ratio_Percentage"] && (
              <div className="flex flex-col justify-center shrink-0">
                <span className="font-bold text-lg">
                  {rtk_data?.["Loops_Ratio_Percentage"]}%
                </span>
                <span className="text-sm text-muted-foreground">Loops</span>
              </div>
            )}
          </div>
        )}

        {/* ---------- 3. Activity Frequency Distribution ---------- */}
        {title === "Activity Frequency Distribution" &&
          Array.isArray(rtk_data?.Distribution) &&
          rtk_data.Distribution.length > 0 && (
            <ResponsiveContainer width="100%">
              <PieChart>
                <Legend />
                <Pie
                  data={rtk_data.Distribution}
                  dataKey="percentage"
                  nameKey="activity"
                  outerRadius={100}
                  label
                >
                  {rtk_data.Distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(index)} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}

        {/* ----------------------------------------------------------- */}
        {/*  NEW BLOCK – Happy-Path Compliance Rate (responsive)        */}
        {/* ----------------------------------------------------------- */}
        {title === "Happy-Path Compliance Rate" && (
          <div className="flex items-center w-full h-full gap-4 md:gap-6">
            {/* ---- DONUT (always visible) ---- */}
            <div className="relative flex-1 min-h-[10rem] md:min-h-[12rem] h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={rtk_data?.Pie_Chart_Data || []}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    innerRadius="55%" // donut
                    outerRadius="80%"
                    paddingAngle={2}
                    // label={({ value }) => `${value}%`}
                  >
                    {(rtk_data?.Pie_Chart_Data || []).map((_, i) => (
                      <Cell
                        key={`cell-${i}`}
                        fill={i === 0 ? "#10b981" : "#ef4444"} // green / red
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value, name, props) => [
                      `${props.payload.count} cases`,
                      props.payload.label,
                    ]}
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.85)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      fontSize: "12px",
                      padding: "6px 10px",
                    }}
                    itemStyle={{ color: "#fff", fontWeight: "500" }}
                    labelStyle={{ color: "#ccc", fontSize: "11px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* ---- STATS – hidden on xs, shown on md+ ---- */}
            <div className="hidden md:flex flex-col justify-center shrink-0 text-right">
              <div className="text-sm text-gray-400">Compliance Rate</div>
              <div className="text-2xl font-bold text-white">
                {rtk_data?.Compliance_Rate_Percentage?.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500 mt-1">
                <span className="font-medium text-[#10b981]">
                  {rtk_data?.Compliant_Cases_Count ?? 0}
                </span>{" "}
                compliant
              </div>
              <div className="text-xs text-gray-500">
                <span className="font-medium text-[#ef4444]">
                  {rtk_data?.Non_Compliant_Cases_Count ?? 0}
                </span>{" "}
                non-compliant
              </div>
              <div className="text-xs text-gray-500">
                of {rtk_data?.Total_Cases_Analyzed ?? 0} cases
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
