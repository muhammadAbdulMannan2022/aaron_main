import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const defaultData = [
    { name: "Series A", value: 35, color: "var(--color-chart-main)" },
    { name: "Series B", value: 25, color: "var(--color-chart-2nd)" },
    { name: "Series C", value: 40, color: "var(--color-chart-thard)" },
]

export default function DonutChart({
    title = "Donut Chart",
    centerValue = "100%",
    data = defaultData,
}) {
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
            <div className="relative flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius="60%"
                            outerRadius="80%"
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className="text-2xl font-bold"
                        style={{ color: "var(--color-text-primary)" }}
                    >
                        {centerValue}
                    </div>
                </div>
            </div>

            {/* legend stays at bottom */}
            <div className="mt-4 space-y-2">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            <span style={{ color: "var(--color-main-text)" }}>
                                {item.name}
                            </span>
                        </div>
                        <span style={{ color: "var(--color-text-primary)" }}>
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
