import { useState, useEffect } from "react";
import { Edit3 } from "lucide-react";
import { Modal } from "../../../../helpers/Modal";
import {
  useHappyPathQuery,
  useUpdateHappyPathMutation,
} from "../../../../../redux/api/dashboard";

export function HappyPathSetup({ isOpen, onClose }) {
  const projectId = localStorage.getItem("currentProjectId");
  const { data: projectsData, isLoading } = useHappyPathQuery(projectId, {
    skip: !projectId,
  });
  const [updateHappyPath, { isLoading: isUpdating }] =
    useUpdateHappyPathMutation();

  const [steps, setSteps] = useState([]);
  const [editingStep, setEditingStep] = useState(null);
  const [tempHours, setTempHours] = useState(0);
  const [tempMinutes, setTempMinutes] = useState(0);

  /* ------------------------------------------------------------------ */
  /*  Formatting helpers                                                */
  /* ------------------------------------------------------------------ */
  const formatDuration = (minutesDecimal) => {
    const total = Math.round(minutesDecimal * 100) / 100;
    const h = Math.floor(total / 60);
    const m = (total % 60).toFixed(2).replace(/\.?0+$/, "");
    return h === 0 ? `${m} min` : `${h}h ${m}min`;
  };

  /* ------------------------------------------------------------------ */
  /*  Load happy_paths (clone frozen RTK data)                          */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!projectsData?.happy_paths) return;

    const orderedSteps = [...projectsData.happy_paths]
      .sort((a, b) => a.serial_number - b.serial_number)
      .map((item, idx) => {
        const avgMinutes = parseFloat(item.average_time_minutes) || 0;

        return {
          id: item.id,
          step: `P${idx + 1}`,
          activity: item.activity_name,
          duration: formatDuration(avgMinutes), // current (read-only)
          targetDuration: formatDuration(avgMinutes), // editable copy
          hours: Math.floor(avgMinutes / 60),
          minutes: Math.round((avgMinutes % 60) * 100) / 100,
        };
      });

    setSteps(orderedSteps);
  }, [projectsData]);

  /* ------------------------------------------------------------------ */
  /*  Edit modal handlers                                               */
  /* ------------------------------------------------------------------ */
  const handleEditDuration = (step) => {
    console.log(step);
    setEditingStep(step);
    setTempHours(step.hours);
    setTempMinutes(Math.round(step.minutes));
  };

  const handleSaveDuration = async () => {
    if (!editingStep) return;

    const totalMinutes = tempHours * 60 + tempMinutes;
    const newDuration =
      totalMinutes > 0
        ? tempHours > 0
          ? `${tempHours}h ${tempMinutes}min`
          : `${tempMinutes} min`
        : "0 min";

    /* ---- 1. update local UI ---- */
    setSteps((prev) => {
      const cloned = [...prev];
      return cloned.map((s) =>
        s.id === editingStep.id
          ? {
              ...s,
              targetDuration: newDuration,
              hours: tempHours,
              minutes: tempMinutes,
            }
          : s
      );
    });

    /* ---- 2. send to backend ---- */
    try {
      await updateHappyPath({
        id: editingStep.id,
        average_time_minutes: totalMinutes, // <-- the number you need
        projectId: Number(projectId),
      }).unwrap();
    } catch (err) {
      console.error("Failed to update happy path step:", err);
      // optionally revert UI or show toast
    }

    setEditingStep(null);
  };

  /* ------------------------------------------------------------------ */
  /*  Bulk submit (optional – sends every step that changed)            */
  /* ------------------------------------------------------------------ */
  const handleSubmit = async () => {
    const changed = steps
      .filter((s) => s.targetDuration !== s.duration)
      .map((s) => {
        const targetMins = s.hours * 60 + s.minutes; // we keep the numeric values in state
        return {
          id: s.id,
          average_time_minutes: targetMins,
          projectId: Number(projectId),
        };
      });

    if (changed.length === 0) {
      onClose();
      return;
    }

    try {
      await Promise.all(
        changed.map((payload) => updateHappyPath(payload).unwrap())
      );
      console.log("All changed steps saved to backend");
    } catch (err) {
      console.error("Bulk save failed:", err);
    }

    onClose();
  };

  /* ------------------------------------------------------------------ */
  /*  Render                                                            */
  /* ------------------------------------------------------------------ */
  if (isLoading) {
    return (
      <div
        className="text-center py-8"
        style={{ color: "var(--color-text-primary)" }}
      >
        Loading process data...
      </div>
    );
  }

  return (
    <>
      <div
        className="w-full md:max-w-lg p-6"
        style={{
          backgroundColor: "var(--color-main-bg)",
          color: "var(--color-text-primary)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Happy Path Setup</h2>
          <p className="text-sm" style={{ color: "var(--color-dark-text)" }}>
            Set target duration for each step
          </p>
        </div>

        {/* Table */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Happy Path Steps</h3>

          <div
            className="grid grid-cols-4 gap-4 mb-4 pb-2 border-b text-sm"
            style={{ borderColor: "var(--color-gray-button-bg)" }}
          >
            <div style={{ color: "var(--color-dark-text)" }}>Step</div>
            <div style={{ color: "var(--color-dark-text)" }}>Activity</div>
            <div style={{ color: "var(--color-dark-text)" }}>
              Current / Target
            </div>
            <div
              className="text-end"
              style={{ color: "var(--color-dark-text)" }}
            >
              Edit
            </div>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto element-with-scrolling">
            {steps.map((step) => (
              <div
                key={step.id}
                className="grid grid-cols-4 gap-4 items-center py-2 text-sm"
              >
                <div className="font-medium">{step.step}</div>
                <div style={{ color: "var(--color-dark-text)" }}>
                  {step.activity}
                </div>
                <div className="font-mono text-xs leading-tight">
                  <div style={{ color: "var(--color-dark-text)" }}>
                    {step.duration}
                  </div>
                  {step.targetDuration &&
                    step.targetDuration !== step.duration && (
                      <div className="text-green-600 font-medium">
                        → {step.targetDuration}
                      </div>
                    )}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleEditDuration(step)}
                    className="p-1 rounded hover:opacity-70 transition-opacity"
                    style={{ color: "var(--color-outer-button-bg)" }}
                  >
                    <Edit3 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isUpdating}
          className="w-full py-3 rounded-lg font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{
            backgroundColor: "var(--color-outer-button-bg)",
            color: "var(--color-text-primary)",
          }}
        >
          {isUpdating ? "Saving…" : "Save Happy Path"}
        </button>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingStep}
        onClose={() => setEditingStep(null)}
        className="max-w-sm"
      >
        <div
          className="p-6"
          style={{
            backgroundColor: "var(--color-main-bg)",
            color: "var(--color-text-primary)",
          }}
        >
          <h3 className="text-lg font-medium mb-2 text-center">
            Set Target Duration
          </h3>
          <p
            className="text-center text-sm mb-6"
            style={{ color: "var(--color-dark-text)" }}
          >
            {editingStep?.activity}
          </p>

          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex flex-col items-center">
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
                value={tempHours.toString().padStart(2, "0")}
                onChange={(e) =>
                  setTempHours(Math.max(0, parseInt(e.target.value) || 0))
                }
                className="w-20 h-14 text-center text-2xl font-medium rounded border-0 outline-none"
                style={{
                  backgroundColor: "var(--color-gray-button-bg)",
                  color: "var(--color-text-primary)",
                  appearance: "textfield",
                  MozAppearance: "textfield",
                }}
              />
              <span
                className="text-sm mt-1"
                style={{ color: "var(--color-dark-text)" }}
              >
                Hours
              </span>
            </div>

            <span className="text-2xl font-bold">:</span>

            <div className="flex flex-col items-center">
              <input
                type="number"
                min="0"
                max="59"
                value={tempMinutes.toString().padStart(2, "0")}
                onChange={(e) =>
                  setTempMinutes(
                    Math.max(0, Math.min(59, parseInt(e.target.value) || 0))
                  )
                }
                className="w-20 h-14 text-center text-2xl font-medium rounded border-0 outline-none"
                style={{
                  backgroundColor: "var(--color-gray-button-bg)",
                  color: "var(--color-text-primary)",
                }}
              />
              <span
                className="text-sm mt-1"
                style={{ color: "var(--color-dark-text)" }}
              >
                Minutes
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setEditingStep(null)}
              className="flex-1 py-2 px-4 rounded font-medium transition-opacity hover:opacity-70 hover:cursor-pointer"
              style={{
                backgroundColor: "var(--color-gray-button-bg)",
                color: "var(--color-text-primary)",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveDuration}
              className="flex-1 py-2 px-4 rounded font-medium transition-opacity hover:opacity-90 hover:cursor-pointer"
              style={{
                backgroundColor: "var(--color-outer-button-bg)",
                color: "var(--color-text-primary)",
              }}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
