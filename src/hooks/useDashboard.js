// src/hooks/useDashboard.js
import { useState, useCallback, useEffect } from 'react';

export const useDashboard = () => {
    // Initialize state from localStorage or use default
    const [dashboardState, setDashboardState] = useState(() => {
        const savedState = localStorage.getItem('dashboardState');
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                // Ensure widgets have required properties
                const validatedWidgets = (parsed.widgets || []).map((widget) => ({
                    ...widget,
                    position: widget.position || { x: 100, y: 100 },
                    size: widget.size || { width: 300, height: 200 },
                    zIndex: widget.zIndex || 1,
                }));
                // Ensure canvasSize has numeric values
                const canvasSize = parsed.canvasSize && typeof parsed.canvasSize.width === 'number' && typeof parsed.canvasSize.height === 'number'
                    ? parsed.canvasSize
                    : { width: 1200, height: 800 };
                return {
                    widgets: validatedWidgets,
                    canvasSize,
                };
            } catch (error) {
                console.error('Failed to parse saved state:', error);
            }
        }
        return { widgets: [], canvasSize: { width: 1200, height: 800 } };
    });

    // Save state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('dashboardState', JSON.stringify(dashboardState));
    }, [dashboardState]);

    // Add a new widget
    const addWidget = useCallback((widget) => {
        const newWidget = {
            ...widget,
            id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            position: { x: 100, y: 100 }, // Default position
            size: { width: 300, height: 200 }, // Default size
            zIndex: dashboardState.widgets.length + 1, // Ensure new widget is on top
        };
        setDashboardState((prev) => ({
            ...prev,
            widgets: [...prev.widgets, newWidget],
        }));
    }, [dashboardState.widgets]);

    // Update widget position
    const moveWidget = useCallback((id, position) => {
        setDashboardState((prev) => ({
            ...prev,
            widgets: prev.widgets.map((w) =>
                w.id === id ? { ...w, position } : w
            ),
        }));
    }, []);

    // Update widget size
    const resizeWidget = useCallback((id, size) => {
        setDashboardState((prev) => ({
            ...prev,
            widgets: prev.widgets.map((w) =>
                w.id === id ? { ...w, size } : w
            ),
        }));
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
        const blob = new Blob([config], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'dashboard-config.json';
        a.click();
        URL.revokeObjectURL(url);
    }, [dashboardState]);

    // Import dashboard configuration
    const importConfig = useCallback((config) => {
        try {
            const parsed = JSON.parse(config);
            const validatedWidgets = (parsed.widgets || []).map((widget) => ({
                ...widget,
                position: widget.position || { x: 100, y: 100 },
                size: widget.size || { width: 300, height: 200 },
                zIndex: widget.zIndex || 1,
            }));
            // Ensure canvasSize has numeric values
            const canvasSize = parsed.canvasSize && typeof parsed.canvasSize.width === 'number' && typeof parsed.canvasSize.height === 'number'
                ? parsed.canvasSize
                : { width: 1500, height: 800 };
            setDashboardState({
                widgets: validatedWidgets,
                canvasSize,
            });
        } catch (error) {
            console.error('Failed to import configuration:', error);
        }
    }, []);

    return {
        ...dashboardState,
        addWidget,
        moveWidget,
        resizeWidget,
        bringToFront,
        exportConfig,
        importConfig,
    };
};