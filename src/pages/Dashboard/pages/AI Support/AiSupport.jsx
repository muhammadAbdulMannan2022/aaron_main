import { useState, useCallback, useMemo, useEffect, useRef } from "react";
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
import { buildEdges, buildNodes } from "../../../../utils/aiCustomDimantion";

// Invoice flow data
const rawInvoiceFlowData = [
  {
    id: "1",
    label: "Invoice created",
    value: "3000",
    status: "completed",
    owner: "Finance Team",
    descriptions: [
      "The invoice is generated in the system.",
      "Finance team ensures all details are correct.",
    ],
    hasLoop: true,
    extras: [
      { id: "2a", label: "Extra Review", position: "right" },
      {
        id: "2b",
        label: "Optional Check",
        position: "left",
        hasLoop: true,
        loopConnections: { from: "2b", to: "4" },
      },
    ],
  },
  {
    id: "2",
    label: "Invoice sent",
    value: "1500",
    status: "in-progress",
    owner: "Sales Team",
    descriptions: [
      "The invoice is forwarded to the client.",
      "Sales team is responsible for sharing and tracking.",
    ],
  },
  {
    id: "3",
    label: "Payment Monitoring",
    value: "1200",
    status: "active",
    owner: "Finance Team",
    descriptions: [
      "Finance team monitors incoming payments.",
      "System checks overdue or pending payments.",
    ],
  },
  {
    id: "4",
    label: "Payment Received",
    value: "1500",
    status: "pending",
    owner: "Finance Team",
    isDropout: true,
    descriptions: [
      "The client payment is received.",
      "Pending confirmation in the financial system.",
    ],
  },
  {
    id: "5",
    label: "Receipt reconciled",
    value: "3000",
    status: "final",
    owner: "Finance Team",
    descriptions: [
      "The receipt is reconciled with the payment records.",
      "Marks the completion of the invoice cycle.",
    ],
  },
  {
    id: "6",
    label: "Invoice created",
    value: "2000",
    status: "completed",
    owner: "Finance Team",
    descriptions: ["Invoice drafted and validated by Finance."],
  },
  {
    id: "7",
    label: "Invoice sent",
    value: "1000",
    status: "completed",
    owner: "Sales Team",
    descriptions: ["Invoice successfully delivered to client."],
  },
  {
    id: "8",
    label: "Payment Received",
    value: "1000",
    status: "completed",
    owner: "Finance Team",
    descriptions: ["Client payment confirmed by Finance."],
  },
  {
    id: "9",
    label: "Receipt reconciled",
    value: "2000",
    status: "final",
    owner: "Finance Team",
    hasLoop: true,
    loopConnections: { from: "16", to: "9" },
    descriptions: ["Final step — records reconciled with receipt."],
  },
  {
    id: "10",
    label: "Invoice created",
    value: "3000",
    status: "completed",
    owner: "Finance Team",
    descriptions: ["Standard invoice creation without issues."],
  },
  {
    id: "11",
    label: "Invoice approval",
    value: "2500",
    status: "in-progress",
    owner: "Management Team",
    isBottleneck: true,
    descriptions: [
      "Management approval required before sending invoice.",
      "Often a bottleneck due to long review times.",
    ],
  },
  {
    id: "12",
    label: "Receipt reconciled",
    value: "3200",
    status: "final",
    owner: "Finance Team",
    isBottleneck: true,
    descriptions: ["Delayed reconciliation due to approval backlog."],
  },
  {
    id: "13",
    label: "Invoice created",
    value: "2000",
    status: "completed",
    owner: "Finance Team",
    descriptions: ["Invoice created as the starting point."],
  },
  {
    id: "14",
    label: "Invoice sent",
    value: "1500",
    status: "in-progress",
    owner: "Sales Team",
    hasLoop: true,
    loopConnections: { from: "14", to: "15" },
    descriptions: [
      "Invoice sent to client.",
      "May loop back if payment not received on time.",
    ],
  },
  {
    id: "15",
    label: "Payment Monitoring",
    value: "1200",
    status: "active",
    owner: "Finance Team",
    hasLoop: true,
    loopConnections: { from: "15", to: "14" },
    descriptions: [
      "Finance monitors client’s payment status.",
      "If overdue, loops back to Sales for follow-up.",
    ],
  },
  {
    id: "16",
    label: "Payment Received",
    value: "1500",
    status: "pending",
    owner: "Finance Team",
    isDropout: true,
    hasLoop: true,
    loopConnections: { from: "16", to: "9" },
    descriptions: ["Payment received successfully."],
  },
];

// Deduplicate data
const invoiceFlowData = rawInvoiceFlowData
  .reduce((acc, step) => {
    const existing = acc.find(
      (s) => s.id === step.id && s.label === step.label
    );
    if (!existing) {
      acc.push({ ...step });
    } else {
      existing.descriptions = [
        ...new Set([...existing.descriptions, ...step.descriptions]),
      ];
      existing.hasLoop = existing.hasLoop || step.hasLoop || false;
      existing.loopConnections =
        existing.loopConnections || step.loopConnections;
      existing.isBottleneck =
        existing.isBottleneck || step.isBottleneck || false;
      existing.isDropout = existing.isDropout || step.isDropout || false;
      existing.value = step.value; // Use the latest value
      existing.status = step.status; // Use the latest status
      existing.owner = step.owner || existing.owner;
    }
    return acc;
  }, [])
  .sort((a, b) => {
    if (a.id === b.id) return a.label.localeCompare(b.label);
    return parseInt(a.id) - parseInt(b.id);
  });

// Custom Node
const CustomNode = ({ data }) => {
  const { label, extra } = data;
  const statusColor = extra.isDropout
    ? "#aa0000"
    : extra.isBottleneck
    ? "#8a8a00"
    : extra.hasLoop
    ? "#342BAD"
    : "#000000";
  return (
    <div
      className={`min-w-64 min-h-5 rounded-md text-gray-200 flex justify-between hover:cursor-pointer z-20 border border-[${statusColor}] `}
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
        position={Position.Right}
        id="right"
        style={{ background: "#555" }}
      />
      <div className="flex justify-center w-full">
        <div className="py-2 px-4 flex items-center justify-center">
          <h1 className="text-sm font-bold text-center">{label}</h1>
        </div>
      </div>
    </div>
  );
};
const nodeTypes = { custom: CustomNode };

export default function AiSupport() {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [descriptionsToShow, setDescriptionsToShow] = useState([]);
  const chatContainerRef = useRef(null);

  // Scroll to bottom when messages or descriptions change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, descriptionsToShow]);

  // Build nodes and edges
  const mainNodes = useMemo(() => buildNodes(invoiceFlowData), []);
  const mainEdges = useMemo(() => buildEdges(invoiceFlowData), []);

  // ReactFlow state
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

  const handleChatSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (chatInput.trim()) {
        setChatMessages([...chatMessages, { text: chatInput, sender: "user" }]);
        // Simulate AI response in Markdown format
        setChatMessages((prev) => [
          ...prev,
          {
            text: `**AI Response**: Your query was "${chatInput}". Here's some information:\n\n- This is a **sample** response.\n- Feel free to ask more about the invoice flow!`,
            sender: "ai",
          },
        ]);
        setChatInput("");
        setDescriptionsToShow([]); // Hide descriptions when sending a message
      }
    },
    [chatMessages, chatInput]
  );

  return (
    <div className="flex w-full h-full relative">
      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row gap-4 p-4">
        {/* Main Flow */}
        <div className="flex-1 border rounded bg-main-bg relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            maxZoom={1.5}
            minZoom={1.0}
            defaultViewport={{ x: 0, y: 0 }}
            fitView
          >
            <Background color="#414040" />
            <Controls />
          </ReactFlow>
        </div>

        {/* AI Chat Sidebar */}
        <div className="w-80 rounded bg-main-bg border-l border-gray-button-bg px-4 flex flex-col">
          <h2 className="text-white text-lg font-bold mb-4">AI Assistant</h2>
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto mb-4 scroll-smooth"
          >
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded max-w-[80%] w-fit ${
                  msg.sender === "user"
                    ? "bg-[#0B0B0B] text-[#8D8C8C] ml-auto pe-3"
                    : "bg-gray-700 text-[#8D8C8C] mr-auto"
                }`}
              >
                {msg.sender === "ai" ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  <span>{msg.text}</span>
                )}
              </div>
            ))}
            {descriptionsToShow.length > 0 && (
              <div className="mt-4">
                <h3 className="text-white font-bold">Node Descriptions:</h3>
                <ul className="text-[#8D8C8C] list-disc pl-5">
                  {descriptionsToShow.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <form onSubmit={handleChatSubmit} className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 bg-gray-700 text-white rounded p-2 focus:outline-none"
              placeholder="Ask AI..."
            />
            <button
              type="submit"
              className="bg-[#574bff] text-white px-4 py-2 rounded hover:bg-[#675dfa]"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
