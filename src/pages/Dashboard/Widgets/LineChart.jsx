import { useDraggable } from "@dnd-kit/core";
import { X } from "lucide-react";
import { ResizableBox } from "react-resizable";
import LineChartWidget from "./LineChartWidget";
import DonutChart from "./DonutChart";
import CircularProgress from "./CircularProgress";
import BarChartWidget from "./BarChartWidget";
import MetricCard from "./MetricCard";

const WidgetCard = ({ widget, onResize, onBringToFront, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: widget.id,
  });

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
      };

  const handleResize = (event, { size }) => {
    onResize(widget.id, {
      width: Math.max(200, Math.min(1000, size.width)),
      height: Math.max(150, Math.min(1000, size.height)),
    });
  };

  const handleMouseDown = (e) => {
    e.stopPropagation(); // Prevent propagation to avoid interference with drag
    onBringToFront(widget.id);
  };

  const renderKPIContent = () => {
    console.log(widget.type);

    // prefer explicit widget.props or widget.data for dynamic content
    const widgetProps = widget.props || widget.data || {};

    switch (widget.type) {
      case "line-chart":
        return (
          <LineChartWidget
            title={widget.title || widgetProps.title || "Line Chart"}
            data={widgetProps.data}
            lines={widgetProps.lines}
            rtk_data={widgetProps.rtk_data}
          />
        );
      case "bar-chart":
        return (
          <BarChartWidget
            title={widget.title || widgetProps.title || "Bar Chart"}
            data={widgetProps.data}
            orientation={widgetProps.orientation}
            rtk_data={widgetProps.rtk_data}
          />
        );
      case "pie-chart":
        return (
          <DonutChart
            title={widget.title || widgetProps.title || "Donut Chart"}
            data={widgetProps.data}
            centerValue={widgetProps.centerValue}
            rtk_data={widgetProps.rtk_data}
          />
        );
      case "progress-tracker":
        return (
          <CircularProgress
            title={widget.title || widgetProps.title || "Progress"}
            value={widgetProps.value}
            percentage={widgetProps.percentage}
            rtk_data={widgetProps.rtk_data}
          />
        );
      case "key-metrics":
        // console.log(widgetProps, "what to go ");
        return (
          <MetricCard
            title={widget.title || widgetProps.title || "Metric"}
            value={widgetProps.value}
            chartType={widgetProps.chartType}
            data={widgetProps.data}
            percentage={widgetProps.percentage}
            rtk_data={widgetProps.rtk_data}
          />
        );
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
      className="rounded-lg shadow-md border group"
      css={{
        backgroundColor: "var(--color-main-bg)",
        borderColor: "var(--color-gray-button-bg)",
        color: "var(--color-text-primary)",
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation(); // Stop propagation to ensure the click is handled by the button
          console.log("Removing...");
          onRemove(widget.id);
        }}
        className="p-1 bg-gray-700 z-[20001] rounded hover:opacity-80 transition-opacity absolute top-0 right-0 opacity-0 group-hover:opacity-100 hover:cursor-pointer"
        style={{
          color: "var(--color-text-notActive)",
          zIndex: 20001, // Ensure button stays on top
        }}
        title="Remove Widget"
      >
        <X size={14} />
      </button>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        onMouseDown={handleMouseDown}
        className="cursor-move w-full h-full rounded-lg relative"
        style={{
          backgroundColor: "var(--color-main-bg)",
          border: "1px solid var(--color-gray-button-bg)",
        }}
      >
        <div className="h-full relative group">{renderKPIContent()}</div>
      </div>
    </ResizableBox>
  );
};

export default WidgetCard;
