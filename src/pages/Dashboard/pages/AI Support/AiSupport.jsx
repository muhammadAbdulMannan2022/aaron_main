/*  AiSupport – same styling as InvoiceFlow  */
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
  useDefineCostMutation,
  useGetOrginalPathQuery,
} from "../../../../../redux/api/dashboard";
import { Modal } from "../../../../helpers/Modal";

/* --------------------------------------------------------------- */
/*  COST EDITOR PANEL – unchanged (kept for completeness)         */
/* --------------------------------------------------------------- */
const CostEditorPanel = ({ nodes, onClose }) => {
  const [costs, setCosts] = useState({});
  const [defineCost, { isLoading }] = useDefineCostMutation();
  const projectId = localStorage.getItem("currentProjectId");

  useEffect(() => {
    if (!nodes) return;
    const init = {};
    nodes.forEach((n) => {
      const cost = n.data.cost_per_h;
      init[n.id] =
        cost != null && cost !== "" ? parseFloat(cost).toFixed(2) : "";
    });
    setCosts(init);
  }, [nodes]);

  const handleChange = (nodeId, value) => {
    setCosts((prev) => ({ ...prev, [nodeId]: value }));
  };

  const handleBlur = (nodeId, value) => {
    if (value === "" || isNaN(value)) {
      handleChange(nodeId, "");
    } else {
      handleChange(nodeId, parseFloat(value).toFixed(2));
    }
  };

  const handleSaveAll = async () => {
    const payloads = nodes
      .filter((n) => {
        const val = costs[n.id];
        return val !== "" && val != null && !isNaN(val) && parseFloat(val) > 0;
      })
      .map((n) => ({
        project: parseInt(projectId, 10),
        activity_name: n.data.label,
        cost_per_h: parseFloat(costs[n.id]).toFixed(2),
      }));

    if (!payloads.length) {
      onClose();
      return;
    }

    try {
      await defineCost(payloads).unwrap();
      onClose();
    } catch (e) {
      console.error("Bulk cost update failed", e);
    }
  };

  if (!nodes || nodes.length === 0) return null;

  return (
    <div
      className="p-6 md:min-w-xl"
      style={{
        backgroundColor: "var(--color-main-bg)",
        color: "var(--color-text-primary)",
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Set Cost per Hour (All Steps)</h2>
      </div>

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
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={costs[n.id] ?? ""}
                    onChange={(e) => handleChange(n.id, e.target.value)}
                    onBlur={(e) => handleBlur(n.id, e.target.value)}
                    className="w-24 px-2 py-1 text-center rounded border-0 outline-none"
                    style={{
                      backgroundColor: "var(--color-gray-button-bg)",
                      color: "var(--color-text-primary)",
                      MozAppearance: "textfield",
                    }}
                    placeholder="0.00"
                  />
                  <style jsx>{`
                    input[type="number"]::-webkit-inner-spin-button,
                    input[type="number"]::-webkit-outer-spin-button {
                      -webkit-appearance: none;
                      margin: 0;
                    }
                  `}</style>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
          disabled={isLoading}
          className="flex-1 py-2 px-4 rounded font-medium transition-opacity hover:cursor-pointer hover:opacity-90 disabled:opacity-50"
          style={{
            backgroundColor: "var(--color-outer-button-bg)",
            color: "var(--color-text-primary)",
          }}
        >
          {isLoading ? "Saving…" : "Set Cost"}
        </button>
      </div>
    </div>
  );
};

/* --------------------------------------------------------------- */
/*  CURVED LOOP EDGE – same side → same side                     */
/* --------------------------------------------------------------- */
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
  const side = data?.side || "right"; // left | right
  const baseOffset = data?.offset || 60;

  const direction = side === "left" ? -1 : 1;
  const offset = baseOffset * direction;

  const controlX = sourceX + offset * 2.5;
  const midY1 = sourceY - Math.abs(offset);
  const midY2 = targetY - Math.abs(offset);

  const path = `
    M ${sourceX} ${sourceY}
    C ${controlX} ${midY1}, ${controlX} ${midY2}, ${targetX} ${targetY}
  `;

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

/* --------------------------------------------------------------- */
/*  CUSTOM NODE – same look as InvoiceFlow                         */
/* --------------------------------------------------------------- */
const CustomNode = ({ data }) => {
  const {
    label,
    value,
    isDropout,
    isBottleneck,
    hasLoop,
    costPerHour,
    bottleneck_count,
    loop_count,
    dropout_count,
  } = data;

  const highlightStyles = useMemo(() => {
    if (isBottleneck) return { border: "border-red-500", bg: "bg-red-900" };
    if (isDropout) return { border: "border-yellow-500", bg: "bg-yellow-900" };
    if (hasLoop) return { border: "border-purple-500", bg: "bg-purple-900" };
    return { border: "border-[#342BAD]", bg: "bg-[#0F0F0F]" };
  }, [isBottleneck, isDropout, hasLoop]);

  const tooltip = useMemo(() => {
    const p = [];
    if (bottleneck_count) p.push(`Bottlenecks: ${bottleneck_count}`);
    if (loop_count) p.push(`Loops: ${loop_count}`);
    if (dropout_count) p.push(`Dropouts: ${dropout_count}`);
    return p.join(" | ");
  }, [bottleneck_count, loop_count, dropout_count]);

  return (
    <div
      className={`min-w-64 text-gray-200 flex justify-between hover:cursor-pointer z-20 group relative rounded-md drop-shadow-2xl shadow-[#5A595921] border-2 ${highlightStyles.border} ${highlightStyles.bg}`}
    >
      {/* Handles – top / bottom */}
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

      {/* Left handles – exactly on edge */}
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        style={{
          background: "#555",
          left: -8,
          top: "50%",
          transform: "translateY(-50%)",
          opacity: 0,
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
          opacity: 0,
        }}
      />

      {/* Right handles – exactly on edge */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{
          background: "#555",
          right: -8,
          top: "50%",
          transform: "translateY(-50%)",
          opacity: 0,
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
          opacity: 0,
        }}
      />

      {/* Body */}
      <div className="flex justify-center w-full mx-5">
        <div className="py-2 px-4">
          <h1 className="text-sm font-bold">{label}</h1>
          {/* Cost badge */}
          {costPerHour > 0 && (
            <div className="mt-1 text-xs text-green-400">${costPerHour}/h</div>
          )}
        </div>
      </div>

      {/* Hover tooltip */}
      {tooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
          {tooltip}
        </div>
      )}
    </div>
  );
};

/* --------------------------------------------------------------- */
/*  EDGE BUILDER – normal flow + same-side loops                  */
/* --------------------------------------------------------------- */
const buildEdges = (steps) => {
  const edges = [];
  const seen = new Set();

  /* ---- Normal flow (top → bottom) ---- */
  for (let i = 0; i < steps.length - 1; i++) {
    const src = steps[i].id;
    const tgt = steps[i + 1].id;
    const id = `flow-${src}-${tgt}`;
    if (seen.has(id)) continue;
    seen.add(id);

    edges.push({
      id,
      source: src,
      target: tgt,
      sourceHandle: "bottom",
      targetHandle: "top",
      style: { stroke: "#6b7280", strokeWidth: 2 },
      markerEnd: { type: "arrowclosed", color: "#6b7280" },
    });
  }

  /* ---- Loop edges (same side → same side) ---- */
  let loopIdx = 0;
  steps.forEach((step) => {
    if (
      !step.hasLoop ||
      !step.loopConnections?.from ||
      !step.loopConnections?.to
    )
      return;

    const from = step.loopConnections.from;
    const to = step.loopConnections.to;
    const id = `loop-${from}-${to}-${loopIdx}`;
    if (seen.has(id)) return;
    seen.add(id);

    const side = loopIdx % 2 === 0 ? "left" : "right";

    edges.push({
      id,
      source: from,
      target: to,
      sourceHandle: side,
      targetHandle: `${side}-target`,
      type: "curvedLoop",
      data: {
        loopCount: step.loop_count || 0,
        offset: 50 + loopIdx * 4,
        side,
      },
      style: { stroke: "#342BAD", strokeWidth: 2, strokeDasharray: "5,5" },
      markerEnd: { type: "arrowclosed", color: "#342BAD" },
    });
    loopIdx++;
  });

  return edges;
};

/* --------------------------------------------------------------- */
/*  MEMOIZED TYPES - defined outside component to prevent re-renders */
/* --------------------------------------------------------------- */
const nodeTypes = { custom: CustomNode };
const edgeTypes = { curvedLoop: CurvedLoopEdge };

/* --------------------------------------------------------------- */
/*  MAIN COMPONENT                                                 */
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

  /* ---- Scroll chat to bottom ---- */
  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [chatMessages, descriptions]);

  /* ---- Build nodes & edges from API ---- */
  const { flowNodes, flowEdges } = useMemo(() => {
    if (!data?.process_flow_nodes) return { flowNodes: [], flowEdges: [] };

    const VERTICAL_SPACING = 180;
    const START_Y = 100;

    const nodes = data.process_flow_nodes.map((n, i) => ({
      id: n.id,
      type: "custom",
      position: { x: 350, y: START_Y + i * VERTICAL_SPACING },
      data: {
        label: n.label,
        value: n.value,
        isDropout: n.isDropout,
        isBottleneck: n.isBottleneck,
        hasLoop: n.hasLoop,
        costPerHour: n.cost_per_h ? parseFloat(n.cost_per_h) : 0,
        descriptions: n.descriptions,
        cost_per_h: n.cost_per_h,
        bottleneck_count: n.bottleneck_count || 0,
        loop_count: n.loop_count || 0,
        dropout_count: n.dropout_count || 0,
        loopConnections: n.loopConnections,
      },
    }));

    const edges = buildEdges(nodes.map((n) => ({ ...n.data, id: n.id })));

    return { flowNodes: nodes, flowEdges: edges };
  }, [data]);

  useEffect(() => {
    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [flowNodes, flowEdges, setNodes, setEdges]);

  const onNodeClick = useCallback((_, node) => {
    setSelectedNode(node.data);
    console.log(node, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    setDescriptions(node.data.descriptions || []);
  }, []);

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
          selectedNode?.costPerHour > 0
            ? `Cost: **$${selectedNode.costPerHour}/hour**`
            : "No cost set yet."
        }`,
        sender: "ai",
      },
    ]);
    setChatInput("");
  };

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
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          maxZoom={2}
          minZoom={0.5}
        >
          <Background color="#414040" gap={16} />
          <Controls />
        </ReactFlow>

        {/* ---------- Cost Editor Modal ---------- */}
        <Modal isOpen={showCostEditor} onClose={() => setShowCostEditor(false)}>
          <CostEditorPanel
            nodes={flowNodes}
            onClose={() => setShowCostEditor(false)}
          />
        </Modal>

        {/* ---------- Open Cost Editor button ---------- */}
        <button
          onClick={() => setShowCostEditor(true)}
          className="absolute top-4 right-4 bg-[#574bff] text-white px-4 py-2 rounded hover:bg-[#675dfa] transition font-medium hover:cursor-pointer"
        >
          Set Costs
        </button>

        {/* ---------- Selected-node panel (NOW WITH FULL DESCRIPTION) ---------- */}
        {selectedNode && (
          <div className="absolute top-4 left-4 bg-[#1a1a1a] p-5 rounded-lg shadow-xl max-w-md text-white z-50">
            <h3 className="font-bold text-lg mb-2">{selectedNode.label}</h3>

            <p className="text-sm text-gray-400 mb-1">
              Avg: <strong>{selectedNode.value} min</strong>
            </p>

            {selectedNode.costPerHour > 0 && (
              <p className="text-green-400 text-sm mb-3">
                Cost: <strong>${selectedNode.costPerHour}/hour</strong>
              </p>
            )}

            {selectedNode.descriptions?.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-700">
                <p className="text-xs font-semibold text-gray-300 mb-1">
                  Details:
                </p>
                <ul className="list-disc list-inside text-xs text-gray-300 space-y-0.5">
                  {selectedNode.descriptions.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
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
          {/* {descriptions.length > 0 && (
            <div className="bg-gray-800 p-3 rounded-lg text-sm">
              <strong className="text-gray-400">Details:</strong>
              <ul className="list-disc pl-5 mt-1 text-gray-300">
                {descriptions.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          )} */}
        </div>
        <div className="flex gap-2">
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleChat(e);
            }}
            placeholder="Ask about this flow..."
            className="flex-1 bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#574bff]"
          />
          <button
            onClick={handleChat}
            className="bg-[#574bff] px-4 py-2 rounded hover:bg-[#675dfa] transition text-white font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
