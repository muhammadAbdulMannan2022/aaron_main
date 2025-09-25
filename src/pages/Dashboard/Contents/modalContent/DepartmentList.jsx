import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  useGetDepartmentsQuery,
  useAddDepertmentMutation,
  useUpdateDepertmentMutation,
  useDeleteDepertmentMutation,
} from "../../../../../redux/api/api";

export function DepartmentList({ onClose }) {
  const { data: departmentsData, isLoading, error } = useGetDepartmentsQuery();
  const [addDepartment] = useAddDepertmentMutation();
  const [updateDepartment] = useUpdateDepertmentMutation();
  const [deleteDepartment] = useDeleteDepertmentMutation();

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [newDepartmentDescription, setNewDepartmentDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const departments = departmentsData?.results || [];

  const handleAddDepartment = async () => {
    if (newDepartmentName.trim()) {
      try {
        await addDepartment({
          name: newDepartmentName.trim(),
          description: newDepartmentDescription.trim() || "Shark hunter ai",
        }).unwrap();
        setNewDepartmentName("");
        setNewDepartmentDescription("");
        setIsAddingNew(false);
      } catch (err) {
        console.error("Failed to add department:", err);
      }
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

  const handleSaveEdit = async () => {
    if (editingId && editName.trim()) {
      try {
        await updateDepartment({
          id: editingId,
          name: editName.trim(),
          description: editDescription.trim() || "Shark hunter ai",
        }).unwrap();
        setEditingId(null);
        setEditName("");
        setEditDescription("");
      } catch (err) {
        console.error("Failed to update department:", err);
      }
    }
  };

  const handleDeleteDepartment = async (id) => {
    try {
      await deleteDepartment({ id }).unwrap();
    } catch (err) {
      console.error("Failed to delete department:", err);
    }
  };

  const handleSubmit = () => {
    console.log("Departments submitted:", departments);
    onClose();
  };

  if (isLoading) {
    return <div>Loading departments...</div>;
  }

  if (error) {
    return <div>Error loading departments: {error.message}</div>;
  }

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
        {departments.length > 0 ? (
          departments.map((department) => (
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
          ))
        ) : (
          <h1 className="text-center text-gray-500 font-bold">No Departmnet</h1>
        )}

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
