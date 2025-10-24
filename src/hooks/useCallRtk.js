import { useLazyGetCycleTimeQuery } from "../../redux/api/dashboard";

export const useCallRtk = () => {
  const [getCycleTime, cycleState] = useLazyGetCycleTimeQuery();

  // ...rest of them

  const endpoints = {
    "cycle time": { fn: getCycleTime, state: cycleState },
  };

  const callRtk = async (name, query) => {
    console.log(name, "hellollllllllllllllllllllllllllllllllllllllllllll");
    const key = name.toLowerCase(); // normalize just in case
    const endpoint = endpoints[key];
    if (!endpoint) throw new Error(`Unknown endpoint: ${name}`);

    const { fn, state } = endpoint;
    const data = await fn(query).unwrap();
    return { data, state };
  };

  return { callRtk };
};

// const demoWidgetData = {
//     "line-chart": {
//       title: "Revenue Over Time",
//       data: [
//         { month: "Jan", value: 120 },
//         { month: "Feb", value: 210 },
//         { month: "Mar", value: 150 },
//         { month: "Apr", value: 300 },
//         { month: "May", value: 250 },
//         { month: "Jun", value: 330 },
//       ],
//       lines: [{ dataKey: "value", color: "var(--color-chart-main)" }],
//     },
//     "bar-chart": {
//       title: "Top Categories",
//       data: [
//         { name: "A", value: 120 },
//         { name: "B", value: 90 },
//         { name: "C", value: 150 },
//         { name: "D", value: 70 },
//       ],
//       orientation: "horizontal",
//     },
//     "pie-chart": {
//       title: "Distribution",
//       data: [
//         { name: "Alpha", value: 40, color: "var(--color-chart-main)" },
//         { name: "Beta", value: 30, color: "var(--color-chart-2nd)" },
//         { name: "Gamma", value: 30, color: "var(--color-chart-thard)" },
//       ],
//       centerValue: "100",
//     },
//     "progress-tracker": {
//       title: "Completion",
//       value: "75%",
//       percentage: 75,
//     },
//     "key-metrics": {
//       title: "Active Users",
//       value: "2,430",
//       chartType: "area",
//       data: [
//         { value: 20 },
//         { value: 35 },
//         { value: 25 },
//         { value: 45 },
//         { value: 30 },
//         { value: 55 },
//       ],
//       percentage: 65,
//     },
//   };
