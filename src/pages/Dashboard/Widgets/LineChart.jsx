import { useDraggable } from "@dnd-kit/core"
import { X } from "lucide-react"
import { ResizableBox } from "react-resizable"
import LineChartWidget from "./LineChartWidget"
import DonutChart from "./DonutChart"
import CircularProgress from "./CircularProgress"
import BarChartWidget from "./BarChartWidget"
import MetricCard from "./MetricCard"


const WidgetCard = ({ widget, onMove, onResize, onBringToFront, onRemove }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: widget.id,
    })

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            zIndex: widget.zIndex,
            position: "absolute",
            left: widget.position.x,
            top: widget.position.y,
        }
        : {
            zIndex: widget.zIndex,
            position: "absolute",
            left: widget.position.x,
            top: widget.position.y,
        }

    const handleResize = (event, { size }) => {
        onResize(widget.id, {
            width: Math.max(200, Math.min(600, size.width)),
            height: Math.max(150, Math.min(800, size.height)),
        })
    }

    const handleMouseDown = () => {
        onBringToFront(widget.id)
    }

    const renderKPIContent = () => {
        console.log(widget.type);

        switch (widget.type) {
            case 'line-chart':
                return <LineChartWidget title={widget.type} />;
            case 'bar-chart':
                return <BarChartWidget title={widget.type} />;
            case 'pie-chart':
                return <DonutChart title={widget.type} />;
            case 'progress-tracker':
                return <CircularProgress title={widget.type} />;
            case 'key-metrics':
                return <MetricCard title={widget.type} />;
            default:
                return (
                    <div className="text-center p-4 text-gray-400">
                        Select a widget type {widget.type}
                    </div>
                );
        }
    };
    return (
        <ResizableBox
            width={widget.size.width}
            height={widget.size.height}
            minConstraints={[200, 150]}
            maxConstraints={[800, 800]}
            onResizeStop={handleResize}
            style={style}
            className="rounded-lg shadow-md border"
            css={{
                backgroundColor: "var(--color-main-bg)",
                borderColor: "var(--color-gray-button-bg)",
                color: "var(--color-text-primary)",
            }}
        >
            <div
                ref={setNodeRef}
                {...listeners}
                {...attributes}
                onMouseDown={handleMouseDown}
                className="cursor-move w-full h-full rounded-lg"
                style={{
                    backgroundColor: "var(--color-main-bg)",
                    border: "1px solid var(--color-gray-button-bg)",
                }}
            >

                <div className="h-full relative group ">
                    <button
                        onClick={() => {
                            console.log("removeing ")
                            onRemove(widget.id)
                        }}
                        className="p-1 rounded z-[999] hover:opacity-80 transition-opacity absolute top-0 right-4 opacity-0 group-hover:opacity-100 hover:cursor-pointer"
                        style={{
                            backgroundColor: "var(--color-gray-button-bg)",
                            color: "var(--color-text-notActive)",
                        }}
                        title="Remove Widget"
                    >
                        <X size={14} />
                    </button>
                    {renderKPIContent()}
                </div>
            </div>
        </ResizableBox>
    )
}

export default WidgetCard
