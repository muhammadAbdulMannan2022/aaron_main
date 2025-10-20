import { useState, useCallback, useEffect } from "react";

export const useDashboard = () => {
  // Initialize state from localStorage or use default
  const [dashboardState, setDashboardState] = useState(() => {
    const savedState = localStorage.getItem("dashboardState");
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        // Ensure widgets have required properties
        const validatedWidgets = (parsed.widgets || []).map((widget) => ({
          ...widget,
          position: widget.position || { x: 100, y: 100 },
          size: widget.size || { width: 300, height: 400 }, // Default size if none provided
          zIndex: widget.zIndex || 1,
        }));
        // Ensure canvasSize has numeric values
        const canvasSize =
          parsed.canvasSize &&
          typeof parsed.canvasSize.width === "number" &&
          typeof parsed.canvasSize.height === "number"
            ? parsed.canvasSize
            : { width: 1200, height: 800 };
        return {
          widgets: validatedWidgets,
          canvasSize,
        };
      } catch (error) {
        console.error("Failed to parse saved state:", error);
      }
    }
    return { widgets: [], canvasSize: { width: 1200, height: 800 } };
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("dashboardState", JSON.stringify(dashboardState));
  }, [dashboardState]);

  let x = 20;
  let y = 20;
  // Find a non-overlapping position for new widget
  const findNonOverlappingPosition = useCallback(
    (newWidget, existingWidgets) => {
      const gridSize = 20; // Snap to grid size
      let found = false;
      const container = document.querySelector(".canvas-container");
      const containerWidth = container ? container.offsetWidth : 1200;
      const containerHeight =
        typeof dashboardState.canvasSize.height === "number"
          ? dashboardState.canvasSize.height
          : 1200;

      while (!found) {
        let hasOverlap = false;

        // Check overlap with existing widgets
        for (const widget of existingWidgets) {
          const horizontalOverlap =
            x < widget.position.x + widget.size.width &&
            x + newWidget.size.width > widget.position.x;
          const verticalOverlap =
            y < widget.position.y + widget.size.height &&
            y + newWidget.size.height > widget.position.y;

          if (horizontalOverlap && verticalOverlap) {
            hasOverlap = true;
            break;
          }
        }

        if (!hasOverlap) {
          found = true;
        } else {
          // Move to next position
          x += gridSize;
          if (x + newWidget.size.width > containerWidth - 20) {
            x = 20;
            y += gridSize;
          }
          // If we've gone too far down, reset to top with a slight offset
          if (y + newWidget.size.height > containerHeight - 20) {
            x = 40;
            y = 40;
          }
        }
      }

      return { x, y };
    },
    [dashboardState.canvasSize.height]
  );

  // Add a new widget
  const addWidget = useCallback(
    (widget) => {
      const newWidget = {
        ...widget,
        id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        size: widget.size || { width: 300, height: 200 }, // Use widget-provided size or default
        zIndex: dashboardState.widgets.length + 1, // Ensure new widget is on top
      };

      // Find a suitable position for the new widget
      const position = findNonOverlappingPosition(
        newWidget,
        dashboardState.widgets
      );
      newWidget.position = position;

      setDashboardState((prev) => ({
        ...prev,
        widgets: [...prev.widgets, newWidget],
      }));
    },
    [dashboardState.widgets, findNonOverlappingPosition]
  );

  // Check if a widget overlaps with others at a given position
  const checkOverlap = useCallback(
    (widgetId, position, size, existingWidgets) => {
      for (const widget of existingWidgets) {
        if (widget.id === widgetId) continue;

        const horizontalOverlap =
          position.x < widget.position.x + widget.size.width &&
          position.x + size.width > widget.position.x;
        const verticalOverlap =
          position.y < widget.position.y + widget.size.height &&
          position.y + size.height > widget.position.y;

        if (horizontalOverlap && verticalOverlap) {
          return true;
        }
      }
      return false;
    },
    []
  );

  // Update widget position
  const moveWidget = useCallback(
    (id, newPosition) => {
      setDashboardState((prev) => {
        const widget = prev.widgets.find((w) => w.id === id);
        if (!widget) return prev;

        // Use container width for bounds
        const container = document.querySelector(".canvas-container");
        const containerWidth = container ? container.offsetWidth : 1200;
        const containerHeight =
          typeof prev.canvasSize.height === "number"
            ? prev.canvasSize.height
            : 1200;
        const x = Math.max(
          0,
          Math.min(newPosition.x, containerWidth - widget.size.width)
        );
        const y = Math.max(
          0,
          Math.min(newPosition.y, containerHeight - widget.size.height)
        );
        const position = { x, y };

        // Check for overlaps
        if (checkOverlap(id, position, widget.size, prev.widgets)) {
          return prev; // Don't update if there's an overlap
        }

        return {
          ...prev,
          widgets: prev.widgets.map((w) =>
            w.id === id ? { ...w, position } : w
          ),
        };
      });
    },
    [checkOverlap]
  );

  // Update widget size
  const resizeWidget = useCallback(
    (id, size) => {
      setDashboardState((prev) => {
        const widget = prev.widgets.find((w) => w.id === id);
        if (!widget) return prev;

        // Allow any positive size (no minimum or maximum constraints)
        const newSize = {
          width: Math.max(0, size.width), // Ensure non-negative
          height: Math.max(0, size.height), // Ensure non-negative
        };

        // Check for overlaps
        if (checkOverlap(id, widget.position, newSize, prev.widgets)) {
          return prev; // Don't update if there's an overlap
        }

        return {
          ...prev,
          widgets: prev.widgets.map((w) =>
            w.id === id ? { ...w, size: newSize } : w
          ),
        };
      });
    },
    [checkOverlap]
  );

  // Remove a widget
  const removeWidget = useCallback((id) => {
    console.log(id, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    setDashboardState((prev) => {
      const newWidgets = prev.widgets.filter((w) => w.id !== id);

      // Save updated state to localStorage immediately
      localStorage.setItem(
        "dashboardState",
        JSON.stringify({ ...prev, widgets: newWidgets })
      );

      return {
        ...prev,
        widgets: newWidgets,
      };
    });
  }, []);

  // Bring widget to front
  const bringToFront = useCallback((id) => {
    setDashboardState((prev) => {
      const maxZ = Math.max(...prev.widgets.map((w) => w.zIndex || 0), 0);
      return {
        ...prev,
        widgets: prev.widgets.map((w) =>
          w.id === id ? { ...w, zIndex: maxZ + 1 } : w
        ),
      };
    });
  }, []);

  // Export dashboard configuration
  const exportConfig = useCallback(() => {
    const config = JSON.stringify(dashboardState, null, 2);
    const blob = new Blob([config], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dashboard-config.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [dashboardState]);

  // Import dashboard configuration
  const importConfig = useCallback((config) => {
    try {
      // Accept both JSON string or already-parsed object from API
      const parsed =
        typeof config === "string" ? JSON.parse(config) : config || {};
      const validatedWidgets = (parsed.widgets || []).map((widget, index) => {
        const width =
          typeof widget.size?.width === "number" ? widget.size.width : 300;
        const height =
          typeof widget.size?.height === "number" ? widget.size.height : 200;
        return {
          ...widget,
          id:
            widget.id ||
            `widget-${Date.now()}-${index}-${Math.random()
              .toString(36)
              .substr(2, 9)}`,
          position: widget.position || {
            x: 20 + index * 10,
            y: 20 + index * 10,
          },
          size: { width, height }, // ensure numeric sizes
          zIndex: typeof widget.zIndex === "number" ? widget.zIndex : index + 1,
        };
      });

      // Ensure canvasSize has numeric values
      const canvasSize =
        parsed.canvasSize &&
        typeof parsed.canvasSize.width === "number" &&
        typeof parsed.canvasSize.height === "number"
          ? parsed.canvasSize
          : { width: 1200, height: 800 };
      setDashboardState({
        widgets: validatedWidgets,
        canvasSize,
      });
    } catch (error) {
      console.error("Failed to import configuration:", error);
    }
  }, []);

  return {
    ...dashboardState,
    addWidget,
    moveWidget,
    resizeWidget,
    removeWidget,
    bringToFront,
    exportConfig,
    importConfig,
  };
};
