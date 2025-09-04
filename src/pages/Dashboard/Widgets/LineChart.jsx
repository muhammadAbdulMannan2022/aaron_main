import { useDraggable } from "@dnd-kit/core";
import { ResizableBox } from "react-resizable";

const WidgetCard = ({ widget, onMove, onResize, onBringToFront }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: widget.id,
    });

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            zIndex: widget.zIndex,
            position: 'absolute',
            left: widget.position.x,
            top: widget.position.y,
        }
        : {
            zIndex: widget.zIndex,
            position: 'absolute',
            left: widget.position.x,
            top: widget.position.y,
        };

    const handleResize = (event, { size }) => {
        onResize(widget.id, {
            width: Math.max(200, Math.min(600, size.width)),
            height: Math.max(150, Math.min(400, size.height)),
        });
    };

    const handleMouseDown = () => {
        onBringToFront(widget.id);
    };

    return (
        <ResizableBox
            width={widget.size.width}
            height={widget.size.height}
            minConstraints={[200, 150]}
            maxConstraints={[600, 400]}
            onResizeStop={handleResize}
            style={style}
            className="p-4 rounded-lg shadow-md text-white border border-gray-700"
        >
            <div
                ref={setNodeRef}
                {...listeners}
                {...attributes}
                onMouseDown={handleMouseDown}
                className="cursor-move w-full h-full bg-gray-700"
            >
                <h3 className="text-lg font-semibold mb-2">{widget.title}</h3>
                <p className="text-xl">{widget.content}</p>
            </div>
        </ResizableBox>
    );
};

export default WidgetCard