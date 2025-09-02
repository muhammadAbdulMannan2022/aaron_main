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

// ✅ Custom Node
const CustomNode = ({ data }) => {
    const { label } = data;
    return (
        <div className="min-w-64 min-h-5 text-gray-200 flex justify-between hover:cursor-pointer z-20">
            <Handle type="target" position={Position.Top} id="top" style={{ background: "#555" }} />
            <Handle type="source" position={Position.Bottom} id="bottom" style={{ background: "#555" }} />
            <Handle type="source" position={Position.Right} id="right" style={{ background: "#555" }} />
            <Handle type="target" position={Position.Left} id="left" style={{ background: "#555" }} />

            <div className="flex justify-between w-full">
                <div></div>
                <div className="-rotate-90">
                    <h1 className="text-sm font-bold">{label}</h1>
                </div>
            </div>
        </div>
    );
};
const nodeTypes = { custom: CustomNode };

// 🔹 Utility to build nodes
const buildNodes = (steps, prefix = "") =>
    steps.map((step, index) => ({
        id: `${prefix}${step.id}`,
        position: { x: 100, y: index * 200 },
        data: {
            label: step.label,
            value: step.value,
            extra: {
                status: step.status || "active",
                owner: step.owner || "System",
            },
            step,
        },
        type: "custom",
    }));

// 🔹 Utility to build edges
const buildEdges = (steps, filter, prefix = "", color = "#6b7280") => {
    const edges = [];
    for (let i = 0; i < steps.length - 1; i++) {
        edges.push({
            id: `${prefix}${filter}-e${steps[i].id}-${steps[i + 1].id}`,
            source: `${prefix}${steps[i].id}`,
            target: `${prefix}${steps[i + 1].id}`,
            style: { stroke: color, strokeWidth: 2 },
            markerEnd: { type: "arrowclosed", color },
        });
    }
    if (filter === "loops") {
        steps.forEach((step) => {
            if (step.hasLoop && step.loopConnections) {
                edges.push({
                    id: `${prefix}e${step.loopConnections.from}-${step.loopConnections.to}`,
                    source: `${prefix}${step.loopConnections.from}`,
                    target: `${prefix}${step.loopConnections.to}`,
                    type: "smoothstep",
                    style: { stroke: "#ff5555", strokeWidth: 2, strokeDasharray: "5,5" },
                    markerEnd: { type: "arrowclosed", color: "#ff5555" },
                    sourceHandle: "right",
                    targetHandle: "left",
                });
            }
        });
    }
    return edges;
};

export default function InvoiceFlow() {
    const { steps, setDescriptionsToShow, setIsHappyPath } = useContext(FlowContext);
    const [filter, setFilter] = useState("loops");
    const [showactual, setShowactual] = useState(false)

    const filteredSteps = useMemo(() => {
        switch (filter) {
            case "happy_path":
                return steps.happy_path;
            case "bottlenecks":
                return steps.bottlenecks;
            case "dropouts":
                return steps.actual.filter((step) => step.status === "pending");
            case "loops":
                return steps.loops;
            case "actual":
            default:
                return steps.actual;
        }
    }, [filter, steps]);

    // ✅ Build data for main flow
    const mainNodes = useMemo(() => buildNodes(filteredSteps), [filteredSteps]);
    const mainEdges = useMemo(
        () => buildEdges(filteredSteps, filter),
        [filteredSteps, filter]
    );

    // ✅ Build data for actual path (only when happy_path filter is on)
    const actualNodes = useMemo(
        () => (filter === "happy_path" ? buildNodes(steps.actual, "a-") : []),
        [filter, steps]
    );
    const actualEdges = useMemo(
        () => (filter === "happy_path" ? buildEdges(steps.actual, "actual", "a-") : []),
        [filter, steps]
    );

    // ✅ ReactFlow state
    const [nodes, setNodes, onNodesChange] = useNodesState(mainNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(mainEdges);

    useEffect(() => {
        setNodes(mainNodes);
        setEdges(mainEdges);
    }, [mainNodes, mainEdges, setNodes, setEdges]);

    const [selectedNode, setSelectedNode] = useState(null);

    const onNodeClick = useCallback((_, node) => {
        setSelectedNode(node.data);
        setDescriptionsToShow(node.data.step.descriptions);
    }, []);

    const handleFilterChange = useCallback((event) => {
        setFilter(event.target.value);
        setDescriptionsToShow([]);
        setShowactual(true)
    }, []);

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
                    <option value="happy_path">Happy Path</option>
                    <option value="bottlenecks">Bottlenecks</option>
                    <option value="dropouts">Dropouts</option>
                    <option value="loops">Loops</option>
                </select>
                {
                    filter === "happy_path" && <div onClick={() => setIsHappyPath(true)} className="text-auth-button-bg flex items-center gap-2 hover:cursor-pointer border border-gray-600 px-2 py-1 rounded-md">
                        <p>Edit</p>
                        <FaRegEdit />
                    </div>
                }
            </div>

            {/* Flows */}
            <div className="flex flex-1 flex-col md:flex-row gap-4 p-4">
                {/* Main flow */}
                <div className="flex-1 border rounded bg-gray-900 relative">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onNodeClick={onNodeClick}
                        nodeTypes={nodeTypes}
                        fitView
                    >
                        <Background color="#414040" />
                        <Controls />
                    </ReactFlow>
                    {
                        filter === "happy_path" && <div onClick={() => setShowactual(p => !p)} className="text-auth-button-bg hover:cursor-pointer absolute top-5 -right-5 bg-gray-button-bg p-1.5 rounded-full z-20">
                            <FaAngleRight />
                        </div>
                    }

                </div>

                {/* Show actual path side-by-side only for happy_path */}
                {filter === "happy_path" && (
                    <div className={`flex-1 border rounded transition-all delay-1000 bg-gray-900 ${showactual ? "block" : "hidden"}`} >
                        <ReactFlow onNodeClick={onNodeClick} nodes={actualNodes} edges={actualEdges} fitView nodeTypes={nodeTypes}>
                            <Background color="#414040" />
                            <Controls />
                        </ReactFlow>
                    </div>
                )}
            </div>
        </div>
    );
}
