import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import ReactMarkdown from "react-markdown";
import {
  useGetOrginalPathQuery,
  // useUpdateActivityCostMutation,
} from "../../../../../redux/api/dashboard";
import { Modal } from "../../../../helpers/Modal";

/* --------------------------------------------------------------- */
/*  COST EDITOR PANEL – edit all steps at once                     */
/* --------------------------------------------------------------- */
const CostEditorPanel = ({ nodes, onClose }) => {
  const [costs, setCosts] = useState({});
  // const [updateCost, { isLoading }] = useUpdateActivityCostMutation();
  const projectId = localStorage.getItem("currentProjectId");

  // initialise from node data
  useEffect(() => {
    if (!nodes) return;
    const init = {};
    nodes.forEach((n) => {
      init[n.id] = n.data.costPerHour?.toString() || "";
    });
    setCosts(init);
  }, [nodes]);

  const handleChange = (nodeId, value) => {
    setCosts((prev) => ({ ...prev, [nodeId]: value }));
  };

  const handleSaveAll = async () => {
    const payloads = Object.entries(costs)
      .filter(([_, v]) => v !== "" && !isNaN(v))
      .map(([nodeId, cost]) => ({
        nodeId,
        cost_per_hour: parseFloat(cost),
        projectId,
      }));

    if (!payloads.length) {
      onClose();
      return;
    }

    try {
      // await Promise.all(payloads.map((p) => updateCost(p).unwrap()));
      onClose();
    } catch (e) {
      console.error("Bulk cost update failed", e);
    }
  };

  if (!nodes) return null;

  return (
    <div
      className="p-6 md:min-w-xl"
      style={{
        backgroundColor: "var(--color-main-bg)",
        color: "var(--color-text-primary)",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Set Cost per Hour (All Steps)</h2>
      </div>

      {/* Table */}
      <div className="max-h-96 overflow-y-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b pb-2"
              style={{ borderColor: "var(--color-gray-button-bg)" }}
            >
              <th
                className="text-left py-2"
                style={{ color: "var(--color-dark-text)" }}
              >
                Step
              </th>
              <th
                className="text-center py-2"
                style={{ color: "var(--color-dark-text)" }}
              >
                Avg Time (min)
              </th>
              <th
                className="text-right py-2 pr-4"
                style={{ color: "var(--color-dark-text)" }}
              >
                Cost $/hour
              </th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((n) => (
              <tr
                key={n.id}
                className="border-b"
                style={{ borderColor: "var(--color-gray-button-bg)" }}
              >
                <td
                  className="py-2"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {n.data.label}
                </td>
                <td
                  className="text-center py-2"
                  style={{ color: "var(--color-dark-text)" }}
                >
                  {n.data.value}
                </td>
                <td className="py-2 pr-2 flex items-center justify-end">
                  <>
                    <style>
                      {`
      input[type=number]::-webkit-inner-spin-button,
      input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    `}
                    </style>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={costs[n.id] ?? ""}
                      onChange={(e) => handleChange(n.id, e.target.value)}
                      className="w-24 px-2 py-1 text-center rounded border-0 outline-none"
                      style={{
                        backgroundColor: "var(--color-gray-button-bg)",
                        color: "var(--color-text-primary)",
                        appearance: "textfield",
                        MozAppearance: "textfield",
                      }}
                      placeholder="0.00"
                    />
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-2 px-4 rounded font-medium transition-opacity hover:opacity-70 hover:cursor-pointer"
          style={{
            backgroundColor: "var(--color-gray-button-bg)",
            color: "var(--color-text-primary)",
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSaveAll}
          // disabled={isLoading}
          className="flex-1 py-2 px-4 rounded font-medium transition-opacity hover:cursor-pointer hover:opacity-90 disabled:opacity-50"
          style={{
            backgroundColor: "var(--color-outer-button-bg)",
            color: "var(--color-text-primary)",
          }}
        >
          {/* {isLoading ? "Saving…" : "Set Cost"} */}
          set cost
        </button>
      </div>
    </div>
  );
};

/* --------------------------------------------------------------- */
/*  CUSTOM NODE – original colours + cost badge                     */
/* --------------------------------------------------------------- */
const CustomNode = ({ data }) => {
  const { label, value, isDropout, isBottleneck, hasLoop, costPerHour } = data;

  const statusColor = isDropout
    ? "#aa0000"
    : isBottleneck
    ? "#8a8a00"
    : hasLoop
    ? "#342BAD"
    : "#000000";

  return (
    <div
      className="min-w-64 min-h-5 rounded-md text-gray-200 flex justify-between hover:cursor-pointer z-20 border"
      style={{
        backgroundColor: statusColor,
        borderColor: statusColor === "#000000" ? "#342BAD" : statusColor,
      }}
    >
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
        position={Position.Left}
        id="left"
        style={{ background: "#555" }}
      />

      <div className="flex justify-center w-full">
        <div className="py-2 px-4 flex items-center justify-center">
          <h1 className="text-sm font-bold text-center">{label}</h1>
        </div>
      </div>

      {costPerHour > 0 && (
        <div className="absolute top-1 right-1 bg-green-600 text-xs px-2 py-0.5 rounded-full">
          ${costPerHour}/h
        </div>
      )}
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

/* --------------------------------------------------------------- */
/*  MAIN COMPONENT                                                  */
/* --------------------------------------------------------------- */
export default function AiSupport() {
  const projectId = localStorage.getItem("currentProjectId");
  const { data, isLoading } = useGetOrginalPathQuery(projectId, {
    skip: !projectId,
  });

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [descriptions, setDescriptions] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [showCostEditor, setShowCostEditor] = useState(false);
  const chatRef = useRef(null);

  /* ------------------- scroll chat ------------------- */
  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [chatMessages, descriptions]);

  /* ------------------- VERTICAL LAYOUT ------------------- */
  const { flowNodes, flowEdges } = useMemo(() => {
    if (!data?.process_flow_nodes) return { flowNodes: [], flowEdges: [] };

    const VERTICAL_SPACING = 180;
    const START_Y = 100;

    const nodes = data.process_flow_nodes.map((node, idx) => ({
      id: node.id,
      type: "custom",
      position: { x: 350, y: START_Y + idx * VERTICAL_SPACING },
      data: {
        label: node.label,
        value: node.value,
        isDropout: node.isDropout,
        isBottleneck: node.isBottleneck,
        hasLoop: node.hasLoop,
        costPerHour: node.cost_per_hour || 0,
        descriptions: node.descriptions,
      },
    }));

    const edges = nodes.slice(0, -1).map((n, i) => ({
      id: `e${i}`,
      source: n.id,
      target: nodes[i + 1].id,
      animated: n.data.hasLoop,
      style: { stroke: n.data.hasLoop ? "#ffaa00" : "#666" },
    }));

    return { flowNodes: nodes, flowEdges: edges };
  }, [data]);

  useEffect(() => {
    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [flowNodes, flowEdges, setNodes, setEdges]);

  /* ------------------- node click ------------------- */
  const onNodeClick = useCallback((_, node) => {
    const d = node.data;
    setSelectedNode(d);
    setDescriptions(d.descriptions || []);
  }, []);

  /* ------------------- chat ------------------- */
  const handleChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages((m) => [...m, { text: chatInput, sender: "user" }]);
    setChatMessages((m) => [
      ...m,
      {
        text: `**AI**: You asked about **${chatInput}**.\n\n${
          selectedNode?.label || "Select a node"
        } takes **${selectedNode?.value || "?"} min**.\n\n${
          selectedNode?.costPerHour
            ? `Cost: **$${selectedNode.costPerHour}/hour**`
            : "No cost set yet."
        }`,
        sender: "ai",
      },
    ]);
    setChatInput("");
  };

  /* ------------------- render ------------------- */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-white text-xl">
        Loading process flow...
      </div>
    );
  }

  return (
    <div className="flex w-full h-full relative">
      {/* ---------- Flow (vertical) ---------- */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          maxZoom={2}
          minZoom={0.5}
        >
          <Background color="#333" gap={16} />
          <Controls />
        </ReactFlow>

        {/* ---------- Cost Editor Panel (overlay) ---------- */}
        {/* {showCostEditor && ( */}
        <Modal isOpen={showCostEditor} onClose={() => setShowCostEditor(false)}>
          <CostEditorPanel
            nodes={flowNodes}
            onClose={() => setShowCostEditor(false)}
          />
        </Modal>
        {/* )} */}

        {/* ---------- Open Cost Editor button ---------- */}
        <button
          onClick={() => setShowCostEditor(true)}
          className="absolute top-4 right-4 bg-[#574bff] text-white px-4 py-2 rounded hover:bg-[#675dfa] transition font-medium hover:cursor-pointer"
        >
          Set Costs
        </button>

        {/* ---------- Selected-node panel ---------- */}
        {selectedNode && (
          <div className="absolute top-4 left-4 bg-[#1a1a1a] p-4 rounded-lg shadow-xl max-w-xs text-white">
            <h3 className="font-bold text-lg">{selectedNode.label}</h3>
            <p className="text-sm text-gray-400">
              Avg: <strong>{selectedNode.value} min</strong>
            </p>
            {selectedNode.costPerHour > 0 && (
              <p className="text-green-400 text-sm">
                Cost: <strong>${selectedNode.costPerHour}/hour</strong>
              </p>
            )}
          </div>
        )}
      </div>

      {/* ---------- AI Chat Sidebar ---------- */}
      <div className="w-80 bg-[#0f0f0f] border-l border-gray-700 p-4 flex flex-col">
        <h2 className="text-xl font-bold text-white mb-3">AI Assistant</h2>
        <div ref={chatRef} className="flex-1 overflow-y-auto mb-3 space-y-3">
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-[85%] ${
                msg.sender === "user"
                  ? "bg-[#574bff] text-white ml-auto"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              {msg.sender === "ai" ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                msg.text
              )}
            </div>
          ))}
          {descriptions.length > 0 && (
            <div className="bg-gray-800 p-3 rounded-lg text-sm">
              <strong>Details:</strong>
              <ul className="list-disc pl-5 mt-1 text-gray-300">
                {descriptions.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <form onSubmit={handleChat} className="flex gap-2">
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask about this flow..."
            className="flex-1 bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#574bff]"
          />
          <button className="bg-[#574bff] px-4 py-2 rounded hover:bg-[#675dfa] transition text-white font-medium">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
