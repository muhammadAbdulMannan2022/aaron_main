import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

export function TeamList({ onClose }) {
    const [teams, setTeams] = useState([
        { id: 1, name: "Team 1", description: "Collaborative task force" },
        { id: 2, name: "Team 2", description: "Collaborative task force" },
        { id: 3, name: "Team 3", description: "Collaborative task force" },
    ]);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newTeamName, setNewTeamName] = useState("");
    const [newTeamDescription, setNewTeamDescription] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const handleAddTeam = () => {
        if (newTeamName.trim()) {
            const newTeam = {
                id: Math.max(...teams.map((t) => t.id)) + 1,
                name: newTeamName.trim(),
                description: newTeamDescription.trim() || "Collaborative task force",
            };
            setTeams([...teams, newTeam]);
            setNewTeamName("");
            setNewTeamDescription("");
            setIsAddingNew(false);
        }
    };

    const handleEditTeam = (id) => {
        const team = teams.find((t) => t.id === id);
        if (team) {
            setEditingId(id);
            setEditName(team.name);
            setEditDescription(team.description);
        }
    };

    const handleSaveEdit = () => {
        if (editingId && editName.trim()) {
            setTeams(
                teams.map((team) =>
                    team.id === editingId
                        ? { ...team, name: editName.trim(), description: editDescription.trim() || "Collaborative task force" }
                        : team
                )
            );
            setEditingId(null);
            setEditName("");
            setEditDescription("");
        }
    };

    const handleDeleteTeam = (id) => {
        setTeams(teams.filter((team) => team.id !== id));
    };

    const handleSubmit = () => {
        console.log("Teams submitted:", teams);
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
                <h2 className="text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>
                    Team list
                </h2>
                <button
                    onClick={() => setIsAddingNew(true)}
                    className="flex items-center gap-1 px-3 py-1 rounded text-sm font-medium transition-colors hover:cursor-pointer"
                    style={{
                        backgroundColor: "var(--color-auth-button-bg)",
                        color: "var(--color-text-primary)",
                    }}
                >
                    Add <Plus size={16} />
                </button>
            </div>

            {/* Team List */}
            <div className="space-y-4 mb-6">
                {teams.map((team) => (
                    <div key={team.id} className="space-y-2">
                        {editingId === team.id ? (
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
                                    placeholder="Team name"
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
                                            backgroundColor: "var(--color-auth-button-bg)",
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
                                    <div className="font-medium" style={{ color: "var(--color-text-primary)" }}>
                                        {team.name}
                                    </div>
                                    <div className="text-sm" style={{ color: "var(--color-text-notActive)" }}>
                                        {team.description}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEditTeam(team.id)}
                                        className="p-1 rounded hover:opacity-80 transition-opacity hover:cursor-pointer"
                                        style={{ color: "var(--color-auth-button-bg)" }}
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTeam(team.id)}
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

                {/* Add New Team Form */}
                {isAddingNew && (
                    <div className="space-y-2 p-3 rounded" style={{ backgroundColor: "var(--color-gray-button-bg)" }}>
                        <input
                            type="text"
                            value={newTeamName}
                            onChange={(e) => setNewTeamName(e.target.value)}
                            className="w-full px-3 py-2 rounded border-0 text-sm"
                            style={{
                                backgroundColor: "var(--color-main-bg)",
                                color: "var(--color-text-primary)",
                            }}
                            placeholder="Team name"
                        />
                        <input
                            type="text"
                            value={newTeamDescription}
                            onChange={(e) => setNewTeamDescription(e.target.value)}
                            className="w-full px-3 py-2 rounded border-0 text-sm"
                            style={{
                                backgroundColor: "var(--color-main-bg)",
                                color: "var(--color-text-primary)",
                            }}
                            placeholder="Description (optional)"
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={handleAddTeam}
                                className="px-3 py-1 rounded text-xs hover:cursor-pointer"
                                style={{
                                    backgroundColor: "var(--color-auth-button-bg)",
                                    color: "var(--color-text-primary)",
                                }}
                            >
                                Add
                            </button>
                            <button
                                onClick={() => {
                                    setIsAddingNew(false);
                                    setNewTeamName("");
                                    setNewTeamDescription("");
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
                    backgroundColor: "var(--color-auth-button-bg)",
                    color: "var(--color-text-primary)",
                }}
            >
                Submit
            </button>
        </div>
    );
}