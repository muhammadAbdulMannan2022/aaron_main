import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

const defaultData = [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 40 },
    { month: "Mar", value: 45 },
    { month: "Apr", value: 50 },
    { month: "May", value: 35 },
    { month: "Jun", value: 55 },
]

const defaultLines = [{ dataKey: "value", color: "var(--color-chart-main)" }]

export default function LineChartWidget({
    title = "Line Chart",
    data = defaultData,
    lines = defaultLines,
}) {
    return (
        <div
            className="p-6 rounded-lg border h-full w-full transition-colors duration-300 
                 bg-[var(--color-gray-button-bg)] border-[var(--color-button-outline)] 
                 "
        >
            {title && (
                <h3
                    className="text-sm font-medium mb-4 transition-colors duration-300
                     text-[var(--color-main-text)] group-hover:text-blue-400"
                >
                    {title}
                </h3>
            )}

            {/* 👇 let container fill parent */}
            <div className="h-[calc(100%-2rem)]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "var(--color-main-text)", fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "var(--color-main-text)", fontSize: 12 }}
                        />
                        {lines.map((line, index) => (
                            <Line
                                key={index}
                                type="monotone"
                                dataKey={line.dataKey}
                                stroke={line.color}
                                strokeWidth={2}
                                dot={{ fill: line.color, strokeWidth: 2, r: 4 }}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
