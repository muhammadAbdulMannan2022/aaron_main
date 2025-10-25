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

// ✅ Custom Node with Problem Highlighting
const CustomNode = ({ data, filter, isActualPath = true }) => {
  const { label, step } = data;
  // Determine highlight styles for bottlenecks, dropouts, and loops
  const highlightStyles = useMemo(() => {
    if (!isActualPath || !step)
      return { border: "border-[#342BAD]", bg: "bg-[#0F0F0F]" };
    if (filter === "actual" || filter === "happy_path") {
      // Highlight all problems for actual path in both actual and happy_path filters
      if (step.isBottleneck)
        return { border: "border-red-500", bg: "bg-red-900" }; // Red for bottlenecks
      if (step.isDropout)
        return { border: "border-yellow-500", bg: "bg-yellow-900" }; // Yellow for dropouts
      if (step.hasLoop)
        return { border: "border-purple-500", bg: "bg-purple-900" }; // Purple for loops
    } else {
      // Highlight based on specific filter
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

  return (
    <div className="min-w-64 min-h-5 text-gray-200 flex justify-between hover:cursor-pointer z-20">
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
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right"
        style={{ background: "#555" }}
      />
      <div
        className={`flex justify-center w-full mx-5 rounded-md drop-shadow-2xl shadow-[#5A595921] border-2 ${highlightStyles.border} ${highlightStyles.bg}`}
      >
        <div className="py-2 px-4">
          <h1 className="text-sm font-bold">{label}</h1>
        </div>
      </div>
    </div>
  );
};

// 🔹 Utility to build nodes
const buildNodes = (steps, prefix = "", isActualPath = true) =>
  steps.map((step, index) => ({
    id: `${prefix}${step.id || step.serial_number}`,
    position: { x: 50, y: index * 200 }, // Center nodes within each canvas
    data: {
      label: step.label || step.activity_name,
      value: step.value || step.average_time_minutes,
      extra: {
        status: step.status || "active",
        owner: step.owner || "System",
      },
      step: {
        ...step,
        descriptions: step.descriptions || ["No descriptions available"], // Fallback for missing descriptions
      },
    },
    type: "custom",
  }));

// 🔹 Utility to build edges
const buildEdges = (steps, filter, prefix = "", color = "#6b7280") => {
  const edges = [];
  for (let i = 0; i < steps.length - 1; i++) {
    edges.push({
      id: `${prefix}${filter}-e${steps[i].id || steps[i].serial_number}-${
        steps[i + 1].id || steps[i + 1].serial_number
      }`,
      source: `${prefix}${steps[i].id || steps[i].serial_number}`,
      target: `${prefix}${steps[i + 1].id || steps[i + 1].serial_number}`,
      style: { stroke: color, strokeWidth: 2 },
      markerEnd: { type: "arrowclosed", color },
    });
  }
  if (
    (filter === "loops" || filter === "actual" || filter === "happy_path") &&
    prefix !== "ideal-"
  ) {
    steps.forEach((step) => {
      if (step.hasLoop && step.loopConnections) {
        edges.push({
          id: `${prefix}e${step.loopConnections.from}-${step.loopConnections.to}`,
          source: `${prefix}${step.loopConnections.from}`,
          target: `${prefix}${step.loopConnections.to}`,
          type: "smoothstep",
          style: { stroke: "#342BAD", strokeWidth: 2, strokeDasharray: "5,5" },
          markerEnd: { type: "arrowclosed", color: "#342BAD" },
          sourceHandle: "right",
          targetHandle: "right",
        });
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
  const [showactual, setShowactual] = useState(false); // State for toggling actual path

  // Mock data for testing (remove once API provides data)
  const mockHappyPath = [
    {
      id: "1",
      label: "Invoice Created",
      average_time_minutes: 30,
      status: "active",
      owner: "System",
      descriptions: ["Step 1: Invoice created in system"],
    },
    {
      id: "2",
      label: "Invoice Sent",
      average_time_minutes: 15,
      status: "active",
      owner: "System",
      descriptions: ["Step 2: Invoice sent to client"],
    },
    {
      id: "3",
      label: "Payment Received",
      average_time_minutes: 10,
      status: "active",
      owner: "System",
      descriptions: ["Step 3: Payment received and processed"],
    },
  ];

  // Log data for debugging
  useEffect(() => {
    console.log("orginalPathData:", orginalPathData);
    console.log("idealPathData:", idealPathData);
    console.log("orginalPath:", orginalPath);
    console.log("idealPath:", idealPath);
  }, [orginalPathData, idealPathData, orginalPath, idealPath]);

  // Set ideal and original paths when data is available
  useEffect(() => {
    // if (idealPathData?.ideal_path) {
    if (false) {
      setIdealPath(idealPathData.ideal_path);
    } else {
      setIdealPath(mockHappyPath); // Use mock data as fallback
    }
    if (orginalPathData?.process_flow_nodes) {
      setOrginalPath(orginalPathData.process_flow_nodes);
    }
  }, [idealPathData, orginalPathData]);

  // Build nodes and edges for actual path (always shown in non-happy_path or in right canvas)
  const actualNodes = useMemo(
    () => buildNodes(orginalPath, "", true),
    [orginalPath]
  );
  const actualEdges = useMemo(
    () => buildEdges(orginalPath, filter, "", "#6b7280"),
    [orginalPath, filter]
  );

  // Build nodes and edges for ideal path (shown in left canvas for happy_path)
  const idealNodes = useMemo(
    () => buildNodes(idealPath, "ideal-", false),
    [idealPath]
  );
  const idealEdges = useMemo(
    () => buildEdges(idealPath, "happy_path", "ideal-", "#00ff00"),
    [idealPath]
  );

  // Nodes and edges for main canvas (actual path for non-happy_path, ideal path for happy_path)
  const nodes = useMemo(
    () => (filter === "happy_path" ? idealNodes : actualNodes),
    [filter, idealNodes, actualNodes]
  );
  const edges = useMemo(
    () => (filter === "happy_path" ? idealEdges : actualEdges),
    [filter, idealEdges, actualEdges]
  );

  // ReactFlow state for main canvas
  const [flowNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [flowEdges, setEdges, onEdgesChange] = useEdgesState(edges);

  useEffect(() => {
    setNodes(nodes);
    setEdges(edges);
  }, [nodes, edges, setNodes, setEdges]);

  const [selectedNode, setSelectedNode] = useState(null);

  // Memoize nodeTypes to prevent React Flow warning
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

  const onNodeClick = useCallback(
    (_, node) => {
      console.log("Node clicked:", node.data);
      setSelectedNode(node.data);
      setDescriptionsToShow(
        node.data.step.descriptions || ["No descriptions available"]
      );
    },
    [setDescriptionsToShow]
  );

  const handleFilterChange = useCallback(
    (event) => {
      const newFilter = event.target.value;
      setFilter(newFilter);
      setDescriptionsToShow([]);
      setShowactual(newFilter === "happy_path"); // Show actual path by default in happy_path
    },
    [setDescriptionsToShow]
  );

  // Handle loading and error states
  if (isLoadingIdeal || isLoadingOriginal) {
    return <div className="text-white p-4">Loading process flow...</div>;
  }

  if (isErrorIdeal || isErrorOriginal || (!idealPathData && !orginalPathData)) {
    return (
      <div className="text-red-500 p-4">
        Error loading process flow data. Please try again.
      </div>
    );
  }

  if (!orginalPath.length) {
    return (
      <div className="text-white p-4">No process flow data available.</div>
    );
  }

  return (
    <div className="flex w-full h-full relative">
      {/* Dropdown */}
      <div className="absolute z-50 top-5 left-5 border border-gray-700 p-2 bg-gray-800 rounded flex items-center gap-10">
        <select
          name="flowFilter"
          id="flowFilter"
          onChange={handleFilterChange}
          value={filter}
          className="bg-gray-800 text-white rounded p-1 focus:outline-none hover:cursor-pointer"
        >
          <option value="actual">Actual</option>

          {orginalPathData?.global_metrics?.Happy_Path?.Is_Happy_Path && (
            <option value="happy_path">Happy Path</option>
          )}
          <option value="bottlenecks">Bottlenecks</option>
          <option value="dropouts">Dropouts</option>
          <option value="loops">Loops</option>
        </select>
        {filter === "happy_path" && (
          <div
            onClick={() => setIsHappyPath(true)}
            className="text-auth-button-bg flex items-center gap-2 hover:cursor-pointer border border-gray-600 px-2 py-1 rounded-md"
          >
            <p>Edit</p>
            <FaRegEdit />
          </div>
        )}
      </div>

      {/* Flows */}
      <div className="flex flex-1 flex-col md:flex-row gap-4 p-4">
        {/* Main flow (happy path for happy_path filter, actual path otherwise) */}
        <div className="flex-1 border rounded bg-main-bg relative">
          <ReactFlow
            nodes={flowNodes}
            edges={flowEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.5}
            defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
          >
            <Background color="#414040" />
            <Controls />
          </ReactFlow>
          {filter === "happy_path" && (
            <div
              onClick={() => setShowactual((p) => !p)}
              className="text-auth-button-bg hover:cursor-pointer absolute top-5 -right-5 bg-gray-button-bg p-1.5 rounded-full z-20"
            >
              <FaAngleRight />
            </div>
          )}
        </div>

        {/* Actual path canvas for happy_path filter */}
        {filter === "happy_path" && (
          <div
            className={`flex-1 border rounded transition-all duration-1000 bg-main-bg ${
              showactual ? "block" : "hidden"
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
              <Background color="#414040" />
              <Controls />
            </ReactFlow>
          </div>
        )}
      </div>
    </div>
  );
}
