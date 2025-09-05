"use client";

import { FiDownload } from "react-icons/fi";

export default function BeanchmarkReportPage() {
    const processName = "Loops, Bottlenecks, Dropouts";

    const handleExportPDF = () => {
        console.log("Export PDF");
    };

    const teams = [
        { name: "John Smith", department: "Finance", operations: "Financial analysis" },
        { name: "Sarah Johnson", department: "Human Resources", operations: "Recruitment" },
        { name: "Mike Davis", department: "Operations", operations: "Process optimization" },
    ];

    const kpis = [
        { metric: "Process Efficiency", current: "72%", target: "85%", status: "Below Target" },
        { metric: "Cycle Time", current: "4.2 days", target: "2.1 days", status: "Needs Improvement" },
        { metric: "Error Rate", current: "3.2%", target: "1.5%", status: "Above Target" },
        { metric: "Customer Satisfaction", current: "8.1/10", target: "9.0/10", status: "Good" },
        { metric: "Cost per Transaction", current: "$12.50", target: "$8.00", status: "High" },
    ];

    return (
        <div style={{ backgroundColor: "var(--color-main-bg)" }} className="text-white min-h-screen p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-xl font-medium mb-1" style={{ color: "var(--color-text-primary)" }}>
                        Process Benchmark Report ({processName})
                    </h1>
                    <p className="text-sm" style={{ color: "var(--color-dark-text)" }}>
                        Generated on 14 Aug 2024
                    </p>
                </div>
                <button
                    onClick={handleExportPDF}
                    className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors font-medium text-sm hover:cursor-pointer"
                    style={{
                        backgroundColor: "var(--color-user-main-color)",
                        color: "var(--color-text-primary)",
                    }}
                >
                    <FiDownload className="w-4 h-4" />
                    Export PDF
                </button>
            </div>

            <div className="space-y-8">
                <section>
                    <h2 className="text-lg font-medium mb-4" style={{ color: "var(--color-text-primary)" }}>
                        Teams and Departments
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b" style={{ borderColor: "var(--color-gray-button-bg)" }}>
                                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: "var(--color-text-notActive)" }}>Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: "var(--color-text-notActive)" }}>Department</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: "var(--color-text-notActive)" }}>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teams.map((item, index) => (
                                    <tr key={index} className="border-b" style={{ borderColor: "var(--color-gray-button-bg)" }}>
                                        <td className="px-4 py-3 text-sm" style={{ color: "var(--color-dark-text)" }}>{item.name}</td>
                                        <td className="px-4 py-3 text-sm" style={{ color: "var(--color-dark-text)" }}>{item.department}</td>
                                        <td className="px-4 py-3 text-sm" style={{ color: "var(--color-dark-text)" }}>{item.operations}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h2 className="text-lg font-medium mb-4" style={{ color: "var(--color-text-primary)" }}>Executive Summary</h2>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-dark-text)" }}>
                        This comprehensive analysis reveals significant opportunities for process optimization across multiple departments. Key findings indicate bottlenecks in approval workflows, with an average processing time of 4.2 days that could be reduced to 2.1 days through automation. The analysis identifies three critical improvement areas that would yield immediate ROI and enhance operational efficiency.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-medium mb-4" style={{ color: "var(--color-text-primary)" }}>KPI Benchmark Table</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b" style={{ borderColor: "var(--color-gray-button-bg)" }}>
                                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: "var(--color-text-notActive)" }}>Metric</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: "var(--color-text-notActive)" }}>Current Value</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: "var(--color-text-notActive)" }}>Target Value</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: "var(--color-text-notActive)" }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kpis.map((item, index) => (
                                    <tr key={index} className="border-b" style={{ borderColor: "var(--color-gray-button-bg)" }}>
                                        <td className="px-4 py-3 text-sm" style={{ color: "var(--color-dark-text)" }}>{item.metric}</td>
                                        <td className="px-4 py-3 text-sm" style={{ color: "var(--color-dark-text)" }}>{item.current}</td>
                                        <td className="px-4 py-3 text-sm" style={{ color: "var(--color-dark-text)" }}>{item.target}</td>
                                        <td className="px-4 py-3 text-sm" style={{ color: "var(--color-dark-text)" }}>{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Additional sections with dummy text */}
                {[
                    "Loops Analysis",
                    "Bottlenecks Analysis",
                    "Top 5 Process Variants",
                    "Happy Path (Benchmark Reference)",
                    "Recommendation to Action + Simulation",
                    "Method Notes",
                    "Appendix",
                ].map((title, i) => (
                    <section key={i}>
                        <h2 className="text-lg font-medium mb-4" style={{ color: "var(--color-text-primary)" }}>{title}</h2>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--color-dark-text)" }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod, nisl sit amet consectetur sagittis, nisl nunc.
                        </p>
                    </section>
                ))}
            </div>
        </div>
    );
}
