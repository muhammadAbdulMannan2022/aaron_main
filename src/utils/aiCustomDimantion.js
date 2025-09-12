// Utility to build nodes
// Utility to build nodes
const buildNodes = (steps, prefix = "") => {
  const nodes = [];

  steps.forEach((step, index) => {
    // Main node
    nodes.push({
      id: `${prefix}${step.id}-${step.label}`,
      position: { x: 100, y: index * 200 },
      data: {
        label: step.label,
        value: step.value,
        extra: {
          status: step.status || "active",
          owner: step.owner || "System",
          hasLoop: step.hasLoop || false,
          isBottleneck: step.isBottleneck || false,
          isDropout: step.isDropout || false,
        },
        step,
      },
      type: "custom",
    });

    // 🔹 Extra nodes (if step.extras exists)
    if (step.extras && step.extras.length > 0) {
      step.extras.forEach((extra, i) => {
        const offsetX =
          extra.position === "right"
            ? 300
            : extra.position === "left"
            ? -300
            : 0;

        // Spread vertically if multiple extras
        const offsetY = 80;

        nodes.push({
          id: `${prefix}${extra.id}-${extra.label}`,
          position: {
            x: 100 + offsetX,
            y: index * 200 + offsetY,
          },
          data: {
            label: extra.label,
            value: extra.value || "",
            extra: {
              status: extra.status || "optional",
              owner: extra.owner || "System",
              hasLoop: extra.hasLoop || false,
            },
            step: extra,
          },
          type: "custom",
        });
      });
    }
  });

  return nodes;
};

// Utility to build edges
// Utility to build edges
const buildEdges = (steps, prefix = "") => {
  const edges = [];

  // 🔹 Sequential main flow edges
  for (let i = 0; i < steps.length - 1; i++) {
    const color =
      steps[i].isDropout || steps[i + 1].isDropout
        ? "#dc2626" // red for dropout
        : steps[i].isBottleneck || steps[i + 1].isBottleneck
        ? "#eab308" // yellow for bottleneck
        : "#8b5cf6"; // purple as default (dark theme)

    edges.push({
      id: `${prefix}e${steps[i].id}-${steps[i + 1].id}`,
      source: `${prefix}${steps[i].id}-${steps[i].label}`,
      target: `${prefix}${steps[i + 1].id}-${steps[i + 1].label}`,
      style: { stroke: color, strokeWidth: 2 },
      markerEnd: { type: "arrowclosed", color },
    });
  }

  // 🔹 Loop edges
  steps.forEach((step) => {
    if (step.hasLoop && step.loopConnections) {
      const sourceLabel =
        steps.find((s) => s.id === step.loopConnections.from)?.label ||
        "unknown";
      const targetLabel =
        steps.find((s) => s.id === step.loopConnections.to)?.label || "unknown";

      edges.push({
        id: `${prefix}loop-${step.loopConnections.from}-${step.loopConnections.to}`,
        source: `${prefix}${step.loopConnections.from}-${sourceLabel}`,
        target: `${prefix}${step.loopConnections.to}-${targetLabel}`,
        type: "smoothstep",
        style: {
          stroke: "#06b6d4", // cyan for loops
          strokeWidth: 2,
          strokeDasharray: "6,4",
        },
        markerEnd: { type: "arrowclosed", color: "#06b6d4" },
        sourceHandle: "right",
        targetHandle: "right",
      });
    }

    // 🔹 Extra node edges
    if (step.extras && step.extras.length > 0) {
      step.extras.forEach((extra) => {
        edges.push({
          id: `${prefix}extra-${step.id}-${extra.id}`,
          source: `${prefix}${step.id}-${step.label}`,
          target: `${prefix}${extra.id}-${extra.label}`,
          type: "smoothstep",
          style: { stroke: "#22d3ee", strokeWidth: 2 }, // light cyan for extras
          markerEnd: { type: "arrowclosed", color: "#22d3ee" },
        });

        // If extra itself has loop
        if (extra.hasLoop && extra.loopConnections) {
          edges.push({
            id: `${prefix}loop-extra-${extra.id}-${extra.loopConnections.to}`,
            source: `${prefix}${extra.loopConnections.from}-${extra.label}`,
            target: `${prefix}${extra.loopConnections.to}-${
              steps.find((s) => s.id === extra.loopConnections.to)?.label ||
              "unknown"
            }`,
            type: "smoothstep",
            style: {
              stroke: "#06b6d4",
              strokeWidth: 2,
              strokeDasharray: "6,4",
            },
            markerEnd: { type: "arrowclosed", color: "#06b6d4" },
            sourceHandle: "right",
            targetHandle: "right",
          });
        }
      });
    }
  });

  return edges;
};

export { buildEdges, buildNodes };
