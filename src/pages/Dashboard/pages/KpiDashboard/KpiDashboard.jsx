import React, { useState } from 'react';
import { Plus, Download, Upload } from 'lucide-react';
import { useDashboard } from '../../../../hooks/useDashboard';
import { DndContext } from '@dnd-kit/core';
import WidgetCard from '../../Widgets/LineChart';
import AddWidgetSidebar from './AddItemsSidebar';
import 'react-resizable/css/styles.css';


export default function KpiDashboard() {
    const [showSidebar, setShowSidebar] = useState(false);
    const { widgets, canvasSize, addWidget, moveWidget, resizeWidget, bringToFront, removeWidget, exportConfig, importConfig } = useDashboard();

    const handleImportConfig = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const content = event.target?.result;
                importConfig(content);
            };
            reader.readAsText(file);
        }
    };

    const handleDragEnd = (event) => {
        const { active, delta } = event;
        const widget = widgets.find((w) => w.id === active.id);
        if (widget) {
            const container = document.querySelector('.canvas-container');
            const containerWidth = container ? container.offsetWidth : 1200;
            const containerHeight = typeof canvasSize.height === 'number' ? canvasSize.height : 800;
            const newX = Math.max(0, Math.min(containerWidth - widget.size.width, widget.position.x + delta.x));
            const newY = Math.max(0, Math.min(containerHeight - widget.size.height, widget.position.y + delta.y));
            moveWidget(widget.id, { x: newX, y: newY });
        }
    };

    const handleToggleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

    const handleOutsideClick = (e) => {
        if (e.target.closest('.sidebar') || e.target.closest('.add-widget-button')) return;
        setShowSidebar(false);
    };

    return (
        <div className="h-full flex min-h-0 text-white relative" onClick={handleOutsideClick}>
            <main className="flex-1 min-h-0">
                <div className="h-auto px-4 sm:px-6 lg:px-8 py-8 mb-20">
                    <div className="flex sticky top-0 items-center gap-3 mb-4">
                        <button
                            onClick={handleToggleSidebar}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 add-widget-button"
                        >
                            <Plus size={18} />
                            <span>{showSidebar ? 'Close Sidebar' : 'Add Widget'}</span>
                        </button>
                        <button
                            onClick={exportConfig}
                            className="p-2 hover:bg-gray-700 rounded-lg"
                            title="Export Configuration"
                        >
                            <Download size={20} />
                        </button>
                        <div className="relative">
                            <input
                                type="file"
                                accept=".json"
                                onChange={handleImportConfig}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                title="Import Configuration"
                            />
                            <button className="p-2 hover:bg-gray-700 rounded-lg">
                                <Upload size={20} />
                            </button>
                        </div>
                    </div>
                    {widgets.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="bg-gray-800 rounded-lg p-8 shadow-lg max-w-md mx-auto">
                                <h3 className="text-xl font-semibold mb-2">Welcome to your Dashboard</h3>
                                <p className="text-gray-400 mb-4">Get started by adding your first widget.</p>
                                <button
                                    onClick={handleToggleSidebar}
                                    className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 add-widget-button"
                                >
                                    Add Your First Widget
                                </button>
                            </div>
                        </div>
                    ) : (
                        <DndContext onDragEnd={handleDragEnd}>
                            <div
                                className="relative bg-gray-800 rounded-lg overflow-hidden w-full canvas-container"
                                style={{ height: canvasSize.height, minHeight: '100%', width: '100%' }}
                            >
                                <div
                                    className="absolute inset-0 opacity-20 border border-green-800"
                                    style={{
                                        backgroundImage: `
                                        linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                                    `,
                                        backgroundSize: '20px 20px',
                                    }}
                                />
                                {widgets.map((widget) => (
                                    <WidgetCard
                                        key={widget.id}
                                        widget={widget}
                                        onMove={moveWidget}
                                        onResize={resizeWidget}
                                        onBringToFront={bringToFront}
                                        onRemove={(id) => removeWidget(id)}
                                    />
                                ))}
                            </div>
                        </DndContext>
                    )}
                </div>
            </main>

            <div className="sidebar">
                <AddWidgetSidebar
                    isOpen={showSidebar}
                    onClose={() => setShowSidebar(false)}
                    onAdd={addWidget}
                    onToggle={handleToggleSidebar}
                    isopen={showSidebar}
                />
            </div>
            {showSidebar && (
                <div
                    className="fixed inset-0 z-[99] bg-black/50"
                    onClick={() => setShowSidebar(false)}
                />
            )}
        </div>
    );
}