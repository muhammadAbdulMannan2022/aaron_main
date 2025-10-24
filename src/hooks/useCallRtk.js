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
