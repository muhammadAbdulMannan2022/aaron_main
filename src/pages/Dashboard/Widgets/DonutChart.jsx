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
      console.log(idleValue, "sdlkjlajlfdfjlksajfgasjdljdljsadaflkasj");
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
  }, [rtk_data]); // <-- run whenever rtk_data changes
  const COLORS = ["#4841A8", "#4CAF50"];

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

      {/* 👇 chart area should flex to fill */}
      <div className="relative flex-1 flex flex-row items-center justify-center">
        {title === "Total Idle Time / Idle Time Ratio" && rtk_data && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
            <div className="flex items-center gap-6">
              {/* CHART CONTAINER WITH FIXED HEIGHT */}
              <div className="relative w-44 h-44">
                {" "}
                {/* ← THIS IS KEY */}
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
                      <Cell fill="#574bff" /> {/* BRAND: Idle */}
                      <Cell fill="#10b981" /> {/* Active */}
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
                      itemStyle={{ color: "#fff", fontWeight: "500" }} // ← Value text
                      labelStyle={{ color: "#ccc", fontSize: "11px" }} // ← Label (name)
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Label */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {rtk_data.Average_Idle_Time_Ratio_Percentage.toFixed(0)}%
                    </div>
                    <div className="text-[10px] text-gray-400">Idle</div>
                  </div>
                </div>
              </div>

              {/* Text */}
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
        {title === "Total Loops / Loops Ratio" && (
          <div className="flex items-center gap-4 w-full h-full">
            {/* responsive container fills available parent space */}
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

        {/* {console.log(title)} */}
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
                    <Cell
                      key={`cell-${index}`}
                      fill={getColor(index)} // custom color per slice
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
      </div>
    </div>
  );
}
