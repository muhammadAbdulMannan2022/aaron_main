export default function CircularProgress({
    title = "Progress",
    value = "75",
    percentage = 75,
}) {
    return (
        <div
            className="p-4 rounded-lg border flex flex-col items-center w-full h-full"
            style={{
                backgroundColor: "var(--color-gray-button-bg)",
                borderColor: "var(--color-button-outline)",
            }}
        >
            {title && (
                <h3
                    className="text-sm font-medium mb-2 text-center"
                    style={{ color: "var(--color-main-text)" }}
                >
                    {title}
                </h3>
            )}

            {/* chart should grow/shrink with parent */}
            <div className="relative flex-1 flex items-center justify-center w-full">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {/* background circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r="46"
                        stroke="var(--color-main-bg)"
                        strokeWidth="8"
                        fill="transparent"
                    />
                    {/* progress circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r="46"
                        stroke="var(--color-chart-main)"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 46} ${2 * Math.PI * 46}`}
                        strokeDashoffset={(1 - percentage / 100) * 2 * Math.PI * 46}
                        strokeLinecap="round"
                        className="transition-all duration-300"
                    />
                </svg>

                {/* center value */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className="text-lg font-bold"
                        style={{ color: "var(--color-text-primary)" }}
                    >
                        {value}
                    </div>
                </div>
            </div>
        </div>
    )
}
