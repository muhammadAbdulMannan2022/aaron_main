import { useState, useCallback, useMemo, useEffect, useContext } from "react";
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { FlowContext } from "../ProcessEfficiencyLayout";
import { FaAngleRight } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { useHappyPathQuery } from "../../../../../../redux/api/dashboard";

// 🌀 Custom Curved Loop Edge (Side-to-Side)
const CurvedLoopEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
  data,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const loopCount = data?.loopCount || 0;
  const side = data?.side || "right"; // 'left' or 'right'
  const baseOffset = data?.offset || 60;

  const direction = side === "left" ? -1 : 1;
  const offset = baseOffset * direction;

  // Wider curve for side-to-side clarity
  const controlX = sourceX + offset * 2.5;

  // Vertical control points above nodes
  const midY1 = sourceY - Math.abs(offset);
  const midY2 = targetY - Math.abs(offset);

  const path = `
    M ${sourceX} ${sourceY}
    C ${controlX} ${midY1}, ${controlX} ${midY2}, ${targetX} ${targetY}
  `;

  // Tooltip positioned in the middle of the curve
  const tooltipX = (sourceX + targetX) / 2 + offset * 0.8;
  const tooltipY = Math.min(midY1, midY2) - 30;

  return (
    <>
      <path
        id={id}
        d={path}
        stroke="#342BAD"
        strokeWidth={2}
        strokeDasharray="5,5"
        fill="none"
        markerEnd={markerEnd}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        style={{ cursor: "pointer" }}
      />
      {showTooltip && loopCount > 0 && (
        <foreignObject
          x={tooltipX - 50}
          y={tooltipY}
          width={100}
          height={40}
          style={{ overflow: "visible", pointerEvents: "none" }}
        >
          <div
            style={{
              background: "#1f2937",
              color: "white",
              padding: "6px 10px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              textAlign: "center",
            }}
          >
            Loops: {loopCount}
          </div>
        </foreignObject>
      )}
    </>
  );
};

// Custom Node with Side Handles
const CustomNode = ({ data, filter, isActualPath = true }) => {
  const { label, step } = data;

  const highlightStyles = useMemo(() => {
    if (!isActualPath || !step) {
      return { border: "border-[#342BAD]", bg: "bg-[#0F0F0F]" };
    }

    if (filter === "actual" || filter === "happy_path") {
      if (step.isBottleneck)
        return { border: "border-red-500", bg: "bg-red-900" };
      if (step.isDropout)
        return { border: "border-yellow-500", bg: "bg-yellow-900" };
      if (step.hasLoop)
        return { border: "border-purple-500", bg: "bg-purple-900" };
    } else {
      const isHighlighted =
        (filter === "bottlenecks" && step.isBottleneck) ||
        (filter === "dropouts" && step.isDropout) ||
        (filter === "loops" && step.hasLoop);

      if (isHighlighted) {
        if (filter === "bottlenecks")
          return { border: "border-red-500", bg: "bg-red-900" };
        if (filter === "dropouts")
          return { border: "border-yellow-500", bg: "bg-yellow-900" };
        if (filter === "loops")
          return { border: "border-purple-500", bg: "bg-purple-900" };
      }
    }

    return { border: "border-[#342BAD]", bg: "bg-[#0F0F0F]" };
  }, [filter, step, isActualPath]);

  const tooltipContent = useMemo(() => {
    if (!step) return "";
    const parts = [];
    if (step.bottleneck_count > 0)
      parts.push(`Bottlenecks: ${step.bottleneck_count}`);
    if (step.loop_count > 0) parts.push(`Loops: ${step.loop_count}`);
    if (step.dropout_count > 0) parts.push(`Dropouts: ${step.dropout_count}`);
    return parts.join(" | ");
  }, [step]);

  return (
    <div className="min-w-64 text-gray-200 flex justify-between hover:cursor-pointer z-20 group relative">
      {/* Top/Bottom Handles */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ background: "#555" }}
      />

      {/* Left Handles - Positioned on Edge */}
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        style={{
          background: "#555",
          left: -8,
          top: "50%",
          transform: "translateY(-50%)",
          width: 5,
          height: 5,
          // opacity: 0, // Invisible but active
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        style={{
          background: "#555",
          left: -8,
          top: "50%",
          transform: "translateY(-50%)",
          width: 5,
          height: 5,
          // opacity: 0,
        }}
      />

      {/* Right Handles - Positioned on Edge */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{
          background: "#555",
          right: -8,
          top: "50%",
          transform: "translateY(-50%)",
          width: 5,
          height: 5,
          // opacity: 0,
        }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        style={{
          background: "#555",
          right: -8,
          top: "50%",
          transform: "translateY(-50%)",
          width: 5,
          height: 5,
          // opacity: 0,
        }}
      />

      {/* Node Body */}
      <div
        className={`flex justify-center w-full mx-5 rounded-md drop-shadow-2xl shadow-[#5A595921] border-2 ${highlightStyles.border} ${highlightStyles.bg}`}
      >
        <div className="py-2 px-4">
          <h1 className="text-sm font-bold">{label}</h1>
        </div>
      </div>

      {/* Hover Tooltip */}
      {tooltipContent && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

// Build Nodes
const buildNodes = (steps, prefix = "", isActualPath = true) =>
  steps.map((step, index) => ({
    id: `${prefix}${step.id || step.serial_number}`,
    position: { x: 100, y: index * 180 },
    data: {
      label: step.label || step.activity_name,
      step: {
        ...step,
        descriptions: step.descriptions || [
          `${step.activity_name} — Avg: ${step.average_time_minutes} mins`,
        ],
      },
    },
    type: "custom",
  }));

// Build Edges - WITH sourceHandle & targetHandle
const buildEdges = (steps, filter, prefix = "", color = "#6b7280") => {
  const edges = [];
  const seen = new Set();

  // Normal flow edges (top → bottom)
  for (let i = 0; i < steps.length - 1; i++) {
    const source = `${prefix}${steps[i].id || steps[i].serial_number}`;
    const target = `${prefix}${steps[i + 1].id || steps[i + 1].serial_number}`;
    const id = `${prefix}flow-${source}-${target}`;
    if (seen.has(id)) continue;
    seen.add(id);

    edges.push({
      id,
      source,
      target,
      sourceHandle: "bottom",
      targetHandle: "top",
      style: { stroke: color, strokeWidth: 2 },
      markerEnd: { type: "arrowclosed", color },
    });
  }

  // Loop edges (side to side)
  if (
    (filter === "loops" || filter === "actual" || filter === "happy_path") &&
    prefix !== "ideal-"
  ) {
    let loopIndex = 0;

    steps.forEach((step) => {
      if (
        step.hasLoop &&
        step.loopConnections?.from &&
        step.loopConnections?.to
      ) {
        const fromId = `${prefix}${step.loopConnections.from}`;
        const toId = `${prefix}${step.loopConnections.to}`;
        const id = `${prefix}loop-${fromId}-${toId}`;

        if (seen.has(id)) return;
        seen.add(id);

        const isLeft = loopIndex % 2 === 0;
        edges.push({
          id,
          source: fromId,
          target: toId,
          sourceHandle: isLeft ? "left" : "right",
          targetHandle: isLeft ? "left-target" : "right-target",
          type: "curvedLoop",
          data: {
            loopCount: step.loop_count || 0,
            offset: 50 + loopIndex * 5,
            side: isLeft ? "left" : "right",
          },
          style: {
            stroke: "#342BAD",
            strokeWidth: 2,
            strokeDasharray: "5,5",
          },
          markerEnd: { type: "arrowclosed", color: "#342BAD" },
        });
        loopIndex++;
      }
    });
  }

  return edges;
};

export default function InvoiceFlow() {
  const {
    idealPathData,
    orginalPathData,
    isLoadingIdeal,
    isErrorIdeal,
    isLoadingOriginal,
    isErrorOriginal,
    setDescriptionsToShow,
    setIsHappyPath,
  } = useContext(FlowContext);

  const [idealPath, setIdealPath] = useState([]);
  const [orginalPath, setOrginalPath] = useState([]);
  const [filter, setFilter] = useState("actual");
  const [showActual, setShowActual] = useState(false);
  const projectid = localStorage.getItem("currentProjectId");

  const { data: happyPath, isLoading: isHappyPathLoading } = useHappyPathQuery(
    projectid,
    { skip: !projectid }
  );

  const edgeTypes = useMemo(() => ({ curvedLoop: CurvedLoopEdge }), []);
  const nodeTypes = useMemo(
    () => ({
      custom: (props) => (
        <CustomNode
          {...props}
          filter={filter}
          isActualPath={!props.id.startsWith("ideal-")}
        />
      ),
    }),
    [filter]
  );

  // Load Data
  useEffect(() => {
    if (happyPath?.happy_paths?.length) {
      const formatted = happyPath.happy_paths.map((step) => {
        let des = [];
        if (step.description) {
          des = [...step.description];
        }
        return {
          id: step.id.toString(),
          serial_number: step.serial_number,
          label: step.activity_name,
          activity_name: step.activity_name,
          average_time_minutes: parseFloat(step.average_time_minutes),
          status: "active",
          owner: "System",
          descriptions: [
            ...des,
            `${step.activity_name} — ${step.average_time_minutes} mins`,
          ],
        };
      });
      setIdealPath(formatted);
    }

    if (orginalPathData?.process_flow_nodes) {
      setOrginalPath(orginalPathData.process_flow_nodes);
    }
  }, [happyPath, orginalPathData]);

  // Build Nodes & Edges
  const actualNodes = useMemo(
    () => buildNodes(orginalPath, "", true),
    [orginalPath]
  );
  const actualEdges = useMemo(
    () => buildEdges(orginalPath, filter, "", "#6b7280"),
    [orginalPath, filter]
  );

  const idealNodes = useMemo(
    () => buildNodes(idealPath, "ideal-", false),
    [idealPath]
  );
  const idealEdges = useMemo(
    () => buildEdges(idealPath, "happy_path", "ideal-", "#00ff00"),
    [idealPath]
  );

  const mainNodes = filter === "happy_path" ? idealNodes : actualNodes;
  const mainEdges = filter === "happy_path" ? idealEdges : actualEdges;

  const [flowNodes, setNodes, onNodesChange] = useNodesState(mainNodes);
  const [flowEdges, setEdges, onEdgesChange] = useEdgesState(mainEdges);

  useEffect(() => {
    setNodes(mainNodes);
    setEdges(mainEdges);
  }, [mainNodes, mainEdges, setNodes, setEdges]);

  const onNodeClick = useCallback(
    (_, node) => {
      const result = [];
      // console.log(node.data.step);
      if ("avg_duration_h" in node.data.step)
        result.push(
          `Average Duration (h): ${Number(
            node.data.step.avg_duration_h
          ).toFixed(5)}`
        );

      if ("bottleneck_count" in node.data.step)
        result.push(
          `Bottleneck Count: ${Number(node.data.step.bottleneck_count).toFixed(
            5
          )}`
        );

      if ("cost_per_h" in node.data.step)
        result.push(
          `Cost per Hour: ${Number(node.data.step.cost_per_h).toFixed(5)}`
        );

      setDescriptionsToShow(
        [...result, ...node.data.step.descriptions] || ["No description"]
      );
    },
    [setDescriptionsToShow]
  );

  const handleFilterChange = useCallback(
    (e) => {
      const val = e.target.value;
      setFilter(val);
      setDescriptionsToShow([]);
      setShowActual(val === "happy_path");
    },
    [setDescriptionsToShow]
  );

  // Loading & Error States
  if (isLoadingIdeal || isLoadingOriginal || isHappyPathLoading) {
    return <div className="text-white p-4">Loading process flow...</div>;
  }

  if (isErrorIdeal || isErrorOriginal) {
    return <div className="text-red-500 p-4">Error loading data.</div>;
  }

  if (!orginalPath.length && !idealPath.length) {
    return <div className="text-white p-4">No data available.</div>;
  }

  return (
    <div className="flex w-full h-full relative">
      {/* Filter Dropdown */}
      <div className="absolute z-50 top-5 left-5 border border-gray-700 p-2 bg-gray-800 rounded flex items-center gap-6">
        <select
          value={filter}
          onChange={handleFilterChange}
          className="bg-gray-800 text-white rounded p-1 focus:outline-none hover:cursor-pointer text-sm"
        >
          <option value="actual">Actual Path</option>
          {orginalPathData?.global_metrics?.happy_path && (
            <option value="happy_path">Happy Path</option>
          )}
          <option value="bottlenecks">Bottlenecks</option>
          <option value="dropouts">Dropouts</option>
          <option value="loops">Loops</option>
        </select>

        {filter === "happy_path" && (
          <button
            onClick={() => setIsHappyPath(true)}
            className="text-auth-button-bg flex items-center gap-1.5 hover:cursor-pointer border border-gray-600 px-3 py-1 rounded-md text-sm"
          >
            <FaRegEdit /> Edit
          </button>
        )}
      </div>

      {/* Flow Canvases */}
      <div className="flex flex-1 flex-col md:flex-row gap-4 p-4 h-full">
        {/* Main Canvas */}
        <div className="flex-1 border rounded bg-main-bg relative overflow-hidden">
          <ReactFlow
            nodes={flowNodes}
            edges={flowEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            minZoom={0.5}
            defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
          >
            <Background color="#414040" gap={16} />
            <Controls />
          </ReactFlow>

          {/* Toggle Button */}
          {filter === "happy_path" && (
            <button
              onClick={() => setShowActual((p) => !p)}
              className={`absolute top-5 transition-all duration-300 z-20 bg-gray-700 p-1.5 rounded-full text-auth-button-bg hover:bg-gray-600 ${
                showActual ? "left-5 rotate-180" : "-right-5"
              }`}
            >
              <FaAngleRight />
            </button>
          )}
        </div>

        {/* Actual Path Side Panel */}
        {filter === "happy_path" && (
          <div
            className={`border rounded bg-main-bg overflow-hidden transition-all duration-700 ease-in-out ${
              showActual
                ? "w-full md:w-1/2 opacity-100"
                : "w-0 opacity-0 md:w-0"
            }`}
          >
            <ReactFlow
              nodes={actualNodes}
              edges={actualEdges}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              fitView
              minZoom={0.5}
              defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
            >
              <Background color="#414040" gap={16} />
              <Controls />
            </ReactFlow>
          </div>
        )}
      </div>
    </div>
  );
}
