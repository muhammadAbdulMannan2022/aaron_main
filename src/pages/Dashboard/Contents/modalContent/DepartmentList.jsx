import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
export function DepartmentList({ onClose }) {
  const [departments, setDepartments] = useState([
    { id: 1, name: "Department 1", description: "Shark hunter ai" },
    { id: 2, name: "Department 2", description: "Shark hunter ai" },
    { id: 3, name: "Department 3", description: "Shark hunter ai" },
  ]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [newDepartmentDescription, setNewDepartmentDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleAddDepartment = () => {
    if (newDepartmentName.trim()) {
      const newDepartment = {
        id: Math.max(...departments.map((d) => d.id)) + 1,
        name: newDepartmentName.trim(),
        description: newDepartmentDescription.trim() || "Shark hunter ai",
      };
      setDepartments([...departments, newDepartment]);
      setNewDepartmentName("");
      setNewDepartmentDescription("");
      setIsAddingNew(false);
    }
  };

  const handleEditDepartment = (id) => {
    const dept = departments.find((d) => d.id === id);
    if (dept) {
      setEditingId(id);
      setEditName(dept.name);
      setEditDescription(dept.description);
    }
  };

  const handleSaveEdit = () => {
    if (editingId && editName.trim()) {
      setDepartments(
        departments.map((dept) =>
          dept.id === editingId
            ? {
                ...dept,
                name: editName.trim(),
                description: editDescription.trim() || "Shark hunter ai",
              }
            : dept
        )
      );
      setEditingId(null);
      setEditName("");
      setEditDescription("");
    }
  };

  const handleDeleteDepartment = (id) => {
    setDepartments(departments.filter((dept) => dept.id !== id));
  };

  const handleSubmit = () => {
    console.log("Departments submitted:", departments);
    onClose();
  };

  return (
    <div
      className="p-6 w-full max-w-md md:w-md mx-auto"
      style={{
        backgroundColor: "var(--color-main-bg)",
        color: "var(--color-text-primary)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-xl font-semibold"
          style={{ color: "var(--color-text-primary)" }}
        >
          Department list
        </h2>
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center gap-1 px-3 py-1 rounded text-sm font-medium transition-colors hover:cursor-pointer"
          style={{
            backgroundColor: " #574bff",
            color: "var(--color-text-primary)",
          }}
        >
          Add <Plus size={16} />
        </button>
      </div>

      {/* Department List */}
      <div className="space-y-4 mb-6">
        {departments.map((department) => (
          <div key={department.id} className="space-y-2">
            {editingId === department.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 rounded border-0 text-sm"
                  style={{
                    backgroundColor: "var(--color-gray-button-bg)",
                    color: "var(--color-text-primary)",
                  }}
                  placeholder="Department name"
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded border-0 text-sm"
                  style={{
                    backgroundColor: "var(--color-gray-button-bg)",
                    color: "var(--color-text-primary)",
                  }}
                  placeholder="Description"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="px-3 py-1 rounded text-xs hover:cursor-pointer"
                    style={{
                      backgroundColor: " #574bff",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 rounded text-xs hover:cursor-pointer"
                    style={{
                      backgroundColor: "var(--color-gray-button-bg)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <div
                    className="font-medium"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {department.name}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "var(--color-text-notActive)" }}
                  >
                    {department.description}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditDepartment(department.id)}
                    className="p-1 rounded hover:opacity-80 transition-opacity hover:cursor-pointer"
                    style={{ color: " #574bff" }}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteDepartment(department.id)}
                    className="p-1 rounded hover:opacity-80 transition-opacity hover:cursor-pointer"
                    style={{ color: "#ef4444" }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add New Department Form */}
        {isAddingNew && (
          <div
            className="space-y-2 p-3 rounded"
            style={{ backgroundColor: "var(--color-gray-button-bg)" }}
          >
            <input
              type="text"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
              className="w-full px-3 py-2 rounded border-0 text-sm"
              style={{
                backgroundColor: "var(--color-main-bg)",
                color: "var(--color-text-primary)",
              }}
              placeholder="Department name"
            />
            <input
              type="text"
              value={newDepartmentDescription}
              onChange={(e) => setNewDepartmentDescription(e.target.value)}
              className="w-full px-3 py-2 rounded border-0 text-sm"
              style={{
                backgroundColor: "var(--color-main-bg)",
                color: "var(--color-text-primary)",
              }}
              placeholder="Description (optional)"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddDepartment}
                className="px-3 py-1 rounded text-xs hover:cursor-pointer"
                style={{
                  backgroundColor: " #574bff",
                  color: "var(--color-text-primary)",
                }}
              >
                Add
              </button>
              <button
                onClick={() => {
                  setIsAddingNew(false);
                  setNewDepartmentName("");
                  setNewDepartmentDescription("");
                }}
                className="px-3 py-1 rounded text-xs hover:cursor-pointer"
                style={{
                  backgroundColor: "var(--color-gray-button-bg)",
                  color: "var(--color-text-primary)",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full py-3 rounded font-medium transition-colors hover:cursor-pointer"
        style={{
          backgroundColor: "#574bff",
          color: "var(--color-text-primary)",
        }}
      >
        Submit
      </button>
    </div>
  );
}
