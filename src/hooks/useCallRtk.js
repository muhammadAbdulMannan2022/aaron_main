import {
  useLazyGetCycleTimeQuery,
  useLazyAverageVmedianCycleTimeQuery,
  useLazyTotalCaseCountQuery,
  useLazyLoopsAndRatioQuery,
  useLazyBottlenecksAndRatioQuery,
  useLazyCalculateStepAndCasesQuery,
  useLazyDropoutAndRatioQuery,
  useLazyAvarageActivityTimeQuery,
  useLazyFirstPassRateQuery,
  useLazyLongestWaitingTimeQuery,
  useLazyVariantComplexityQuery,
  useLazyVariantChangeOverTimeQuery,
  useLazyCasesFollowingTopVariantQuery,
  useLazyMaxStepInACaseQuery,
  useLazyTimeSavedPotentialQuery,
  useLazyActivityFrequencyDistributionQuery,
  useLazyHappyPathComplianceQuery,
  useLazyTotalCompletedCaseQuery,
  useLazyHappyPathDeviationQuery,
  useLazySkippedStepsRateQuery,
  useLazyCaseThroughPutRateQuery,
  useLazyIdleTimeAndRatioQuery,
  useLazyCostPerCaseQuery,
} from "../../redux/api/dashboard";

export const useCallRtk = () => {
  // Lazy queries
  const [getCycleTime, cycleState] = useLazyGetCycleTimeQuery();
  const [averageCycle, averageCycleState] =
    useLazyAverageVmedianCycleTimeQuery();
  const [totalCases, totalCasesState] = useLazyTotalCaseCountQuery();
  const [loopsRatio, loopsRatioState] = useLazyLoopsAndRatioQuery();
  const [bottlenecksRatio, bottlenecksRatioState] =
    useLazyBottlenecksAndRatioQuery();
  const [calculateStepCases, calculateStepCasesState] =
    useLazyCalculateStepAndCasesQuery();
  const [dropoutRatio, dropoutRatioState] = useLazyDropoutAndRatioQuery();
  const [averageActivityTime, averageActivityTimeState] =
    useLazyAvarageActivityTimeQuery();
  const [firstPassRate, firstPassRateState] = useLazyFirstPassRateQuery();
  const [longestWaitingTime, longestWaitingTimeState] =
    useLazyLongestWaitingTimeQuery();
  const [variantComplexity, variantComplexityState] =
    useLazyVariantComplexityQuery();
  const [variantChangeOverTime, variantChangeOverTimeState] =
    useLazyVariantChangeOverTimeQuery();
  const [casesTopVariant, casesTopVariantState] =
    useLazyCasesFollowingTopVariantQuery();
  const [maxStepInCase, maxStepInCaseState] = useLazyMaxStepInACaseQuery();
  const [timeSavedPotential, timeSavedPotentialState] =
    useLazyTimeSavedPotentialQuery();
  const [activityFrequency, activityFrequencyState] =
    useLazyActivityFrequencyDistributionQuery();
  const [happyPathCompliance, happyPathComplianceState] =
    useLazyHappyPathComplianceQuery();
  const [totalCompletedCases, totalCompletedCasesState] =
    useLazyTotalCompletedCaseQuery();
  const [happyPathDeviation, happyPathDeviationState] =
    useLazyHappyPathDeviationQuery();
  const [skippedStepsRate, skippedStepsRateState] =
    useLazySkippedStepsRateQuery();
  const [caseThroughputRate, caseThroughputRateState] =
    useLazyCaseThroughPutRateQuery();
  const [idleTimeRatio, idleTimeRatioState] = useLazyIdleTimeAndRatioQuery();
  const [costPerCase, costPerCaseState] = useLazyCostPerCaseQuery();

  // Map endpoint names to functions + state
  // Example: mapping KPI names dynamically to your hooks
  const endpoints = {
    "cycle time": { fn: getCycleTime, state: cycleState },
    "average vs. median cycle time": {
      fn: averageCycle,
      state: averageCycleState,
    },
    "total number of cases": { fn: totalCases, state: totalCasesState },
    "total idle time / idle time ratio": {
      fn: idleTimeRatio,
      state: idleTimeRatioState,
    },
    "total loops / loops ratio": { fn: loopsRatio, state: loopsRatioState },
    "happy-path compliance rate": {
      fn: happyPathCompliance,
      state: happyPathComplianceState,
    },
    "time lost to bottleneck + bottleneck severity index": {
      fn: bottlenecksRatio,
      state: bottlenecksRatioState,
    },
    "median / average steps per case": {
      fn: calculateStepCases,
      state: calculateStepCasesState,
    },
    "cost per case": { fn: costPerCase, state: costPerCaseState },
    "dropout rate": { fn: dropoutRatio, state: dropoutRatioState },
    "average activity duration": {
      fn: averageActivityTime,
      state: averageActivityTimeState,
    },
    "total completed cases": {
      fn: totalCompletedCases,
      state: totalCompletedCasesState,
    },
    "number of process variants": {
      fn: variantComplexity,
      state: variantComplexityState,
    },
    "top 5 process variants (count & %)": {
      fn: casesTopVariant,
      state: casesTopVariantState,
    },
    "largest bottleneck": { fn: maxStepInCase, state: maxStepInCaseState },
    "average deviation from happy path": {
      fn: happyPathDeviation,
      state: happyPathDeviationState,
    },
    "first pass rate": { fn: firstPassRate, state: firstPassRateState },
    "longest waiting time step": {
      fn: longestWaitingTime,
      state: longestWaitingTimeState,
    },
    "variant complexity index": {
      fn: variantComplexity,
      state: variantComplexityState,
    },
    "variant change over time": {
      fn: variantChangeOverTime,
      state: variantChangeOverTimeState,
    },
    "case throughput rate": {
      fn: caseThroughputRate,
      state: caseThroughputRateState,
    },
    "cases following top variant": {
      fn: casesTopVariant,
      state: casesTopVariantState,
    },
    "max steps in a case": { fn: maxStepInCase, state: maxStepInCaseState },
    "skipped steps rate": {
      fn: skippedStepsRate,
      state: skippedStepsRateState,
    },
    "average time saved potential": {
      fn: timeSavedPotential,
      state: timeSavedPotentialState,
    },
    "activity frequency distribution": {
      fn: activityFrequency,
      state: activityFrequencyState,
    },
  };

  const callRtk = async (name, query) => {
    const key = name.toLowerCase();
    const endpoint = endpoints[key];
    if (!endpoint) throw new Error(`Unknown endpoint: ${name}`);

    const { fn, state } = endpoint;
    const data = await fn(query).unwrap();
    return { data, state };
  };

  return { callRtk };
};
