import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useGetFaqQuery } from "../../../../../redux/auth/auth";

// const faqData = [
//   {
//     id: 1,
//     question: "What is Process Mining?",
//     answer:
//       "Process Mining is a technology that analyzes real process data from IT systems to reveal how processes actually run. It uncovers deviations, bottlenecks, and optimization opportunities.",
//   },
//   {
//     id: 2,
//     question: "What value does Process Mining provide?",
//     answer:
//       "Process Mining gives organizations transparency into their processes, identifies inefficiencies, and enables data-driven improvement decisions. This leads to cost savings, shorter lead times, and higher quality.",
//   },
//   {
//     id: 3,
//     question: "What is the 'Happy Path'?",
//     answer:
//       "The Happy Path is the ideal, smooth process flow without deviations, loops, or dropouts. It serves as a benchmark for efficiency comparisons.",
//   },
//   {
//     id: 4,
//     question: "What are Loops?",
//     answer:
//       "Loops occur when process steps are repeated (e.g., rework or multiple approvals). They increase throughput time and may cause unnecessary costs.",
//   },
//   {
//     id: 5,
//     question: "What are Bottlenecks?",
//     answer:
//       "Bottlenecks are process steps that slow down the workflow — for example, long approval waiting times or overloaded departments.",
//   },
//   {
//     id: 6,
//     question: "What are Dropouts?",
//     answer:
//       "Dropouts occur when processes end prematurely and are not completed successfully. For example, when orders are canceled or requests remain unprocessed.",
//   },
//   {
//     id: 7,
//     question: "How can I identify process inefficiencies?",
//     answer:
//       "By analyzing loops, bottlenecks, and dropouts in comparison to the Happy Path, inefficiencies can be quickly identified.",
//   },
//   {
//     id: 8,
//     question: "What is Process Simulation?",
//     answer:
//       "Simulation allows you to create 'what-if' scenarios and test how processes behave under changes — such as reduced waiting times, fewer loops, or automation.",
//   },
//   {
//     id: 9,
//     question: "How can I use simulation for improvements?",
//     answer:
//       "You can directly test adjustments in the system, simulate potential deviations, and immediately see how much time or cost savings could be achieved.",
//   },
//   {
//     id: 10,
//     question: "What does Benchmarking mean in Process Mining?",
//     answer:
//       "Benchmarking compares processes between teams, departments, or locations. It helps identify best practices and highlight improvement opportunities.",
//   },
//   {
//     id: 11,
//     question: "Can I compare multiple locations?",
//     answer:
//       "Yes. Benchmarking lets you analyze and compare processes across different sites or departments that follow the same workflows.",
//   },
//   {
//     id: 12,
//     question: "How does Process Mining help in daily operations?",
//     answer:
//       "It enables faster detection of problems, reduces process costs, and increases customer satisfaction in day-to-day business.",
//   },
//   {
//     id: 13,
//     question: "What data do I need for Process Mining?",
//     answer:
//       "The foundation is event logs (digital footprints) from IT systems such as ERP, CRM, or ticketing systems, which record actual process steps.",
//   },
//   {
//     id: 14,
//     question: "Can I analyze minor deviations too?",
//     answer:
//       "Yes, even small deviations can be visualized and analyzed, allowing you to spot hidden improvement opportunities.",
//   },
//   {
//     id: 15,
//     question: "Who can benefit from Process Mining?",
//     answer:
//       "Process Mining is suitable for organizations of any size that want to work data-driven and continuously improve their processes.",
//   },
// ];

export function FAQ() {
  const [openItem, setOpenItem] = useState(null); // Only one item open at a time
  const { data, isLoading } = useGetFaqQuery();

  const toggleItem = (id) => {
    setOpenItem((prev) => (prev === id ? null : id)); // Toggle between open and closed
  };
  const faqData = !isLoading
    ? data.map((item, index) => ({ id: index + 1, ...item }))
    : [];

  const leftColumnItems = !isLoading && faqData.slice(0, 4);
  const rightColumnItems = !isLoading && faqData.slice(4, 8);

  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto border-x px-5 pb-12 flex flex-col gap-10 md:gap-20">
        {/* Header */}
        <div className="text-center my-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to know all in one place
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-6">
            {leftColumnItems.length > 0 &&
              leftColumnItems.map((item, i) => (
                <div key={item.id} className="border-b border-gray-700 pb-6">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-start justify-between text-left group hover:cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-4 flex-1">
                      <div className="flex items-center gap-4">
                        <div className="border border-gray-button-bg bg-gradient-to-bl from-gray-800 p-3 rounded-xl to-black">
                          <span className="text-button-outline font-semibold text-lg flex-shrink-0">
                            {item.id.toString().padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="text-white text-lg font-medium group-hover:text-button-outline transition-colors duration-200">
                          {item.question}
                        </h3>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {openItem === item.id ? (
                          <FiMinus className="w-6 h-6 text-button-outline" />
                        ) : (
                          <FiPlus className="w-6 h-6 text-gray-400 group-hover:text-button-outline transition-colors duration-200" />
                        )}
                      </div>
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openItem === item.id
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pt-4 pl-12">
                      <p className="text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {rightColumnItems.length > 0 &&
              rightColumnItems.map((item, i) => (
                <div key={item.id} className="border-b border-gray-700 pb-6">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center justify-between text-left group hover:cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-4 flex-1">
                      <div className="flex items-center gap-4">
                        <div className="border border-gray-button-bg bg-gradient-to-bl from-gray-800 p-3 rounded-xl to-black">
                          <span className="text-button-outline font-semibold text-lg flex-shrink-0">
                            {item.id.toString().padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="text-white text-lg font-medium group-hover:text-button-outline transition-colors duration-200">
                          {item.question}
                        </h3>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {openItem === item.id ? (
                          <FiMinus className="w-6 h-6 text-button-outline" />
                        ) : (
                          <FiPlus className="w-6 h-6 text-gray-400 group-hover:text-button-outline transition-colors duration-200" />
                        )}
                      </div>
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openItem === item.id
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pt-4 pl-12">
                      <p className="text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
