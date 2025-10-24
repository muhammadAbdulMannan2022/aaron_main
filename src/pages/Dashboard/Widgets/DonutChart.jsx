import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

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
      {title && (
        <h3
          className="text-sm font-medium mb-4"
          style={{ color: "var(--color-main-text)" }}
        >
          {title}
        </h3>
      )}

      {/* 👇 chart area should flex to fill */}
      <div className="relative flex-1 flex flex-row items-center justify-center">
        {title === "Total Idle Time / Idle Time Ratio" && (
          <div className="flex items-center gap-4">
            <PieChart width={120} height={120}>
              <Pie
                data={idealChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={50}
                innerRadius={25}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            {rtk_data?.["Idle_Time_Ratio_Percentage"] && (
              <div className="flex flex-col justify-center">
                <span className="font-bold text-lg">
                  {rtk_data?.["Idle_Time_Ratio_Percentage"]}%
                </span>
                <span className="text-sm text-muted-foreground">Idle Time</span>
              </div>
            )}
          </div>
        )}
        {title === "Total Loops / Loops Ratio" && (
          <div className="flex items-center gap-4">
            <PieChart width={120} height={120}>
              <Pie
                data={loopsData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={50}
                innerRadius={25}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            {rtk_data?.["Loops_Ratio_Percentage"] && (
              <div className="flex flex-col justify-center">
                <span className="font-bold text-lg">
                  {rtk_data?.["Loops_Ratio_Percentage"]}%
                </span>
                <span className="text-sm text-muted-foreground">Loops</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
