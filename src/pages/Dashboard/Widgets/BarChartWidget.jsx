"use client"

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"

const defaultData = [
    { name: "Category A", value: 30 },
    { name: "Category B", value: 45 },
    { name: "Category C", value: 28 },
    { name: "Category D", value: 52 },
    { name: "Category E", value: 38 },
]

export default function BarChartWidget({
    title = "Bar Chart",
    data = defaultData,
    orientation = "horizontal",
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

            {/* chart expands with parent */}
            <div className="flex-1 w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout={orientation === "horizontal" ? "horizontal" : "vertical"}
                    >
                        {orientation === "horizontal" ? (
                            <>
                                {/* Horizontal = category on X, number on Y */}
                                <XAxis
                                    type="category"
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "var(--color-main-text)", fontSize: 12 }}
                                />
                                <YAxis
                                    type="number"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "var(--color-main-text)", fontSize: 12 }}
                                />
                            </>
                        ) : (
                            <>
                                {/* Vertical = number on X, category on Y */}
                                <XAxis
                                    type="number"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "var(--color-main-text)", fontSize: 12 }}
                                />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "var(--color-main-text)", fontSize: 12 }}
                                />
                            </>
                        )}
                        <Bar dataKey="value" fill="var(--color-chart-main)" radius={2} />
                    </BarChart>

                </ResponsiveContainer>
            </div>
        </div>
    )
}
