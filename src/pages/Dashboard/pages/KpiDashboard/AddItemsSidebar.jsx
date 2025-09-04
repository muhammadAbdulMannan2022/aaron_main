import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useState } from "react";

const AddWidgetSidebar = ({ isOpen, onClose, onAdd, onToggle, isopen }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('text');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        onAdd({
            title: title.trim(),
            type,
            content: type === 'number' ? parseFloat(content) : content,
        });

        setTitle('');
        setType('text');
        setContent('');
        onClose();
    };

    return (
        <div className={`w-80 h-full z-[999] bg-gray-800 text-white shadow-md shadow-gray-700 border-l border-gray-600 transform transition-transform duration-200 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} fixed right-0 z-50 h-auto min-h-0 sidebar`}>
            <div className="flex flex-col min-h-0 relative">
                <div onClick={onToggle} className="text-white absolute w-10 bg-amber-200 items-center justify-center -left-10 top-5 px-4 py-2 rounded-s-full">
                    {isopen ? <ArrowRight /> : <ArrowLeft />}
                </div>

                <div className="p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Add New Widget</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4 flex-1">
                        <div>
                            <label className="block text-sm font-medium mb-1">Widget Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                placeholder="Enter widget title..."
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Widget Type</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            >
                                <option value="text">Text</option>
                                <option value="number">Number</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Content</label>
                            <input
                                type={type === 'number' ? 'number' : 'text'}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                placeholder={`Enter ${type === 'number' ? 'number' : 'text'} content...`}
                                required
                            />
                        </div>
                        <div className="flex gap-2 mt-auto">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 border border-gray-600 text-white rounded-lg hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Add Widget
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default AddWidgetSidebar