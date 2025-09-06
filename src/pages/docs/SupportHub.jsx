import { useState, useMemo } from "react";
import { Search, ChevronRight, ChevronDown, FileText } from "lucide-react";
import documentationData from "./doc";

export default function SupportHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [selectedContent, setSelectedContent] = useState(documentationData[0].subItems[0].content);
  const [selectedTitle, setSelectedTitle] = useState(documentationData[0].subItems[0].title);

  const filteredData = useMemo(() => {
    if (!searchQuery) return documentationData;

    return documentationData
      .map((mainItem) => ({
        ...mainItem,
        subItems: mainItem.subItems.filter(
          (subItem) =>
            subItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subItem.content.some((c) =>
              c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              c.description.toLowerCase().includes(searchQuery.toLowerCase())
            ) ||
            mainItem.title.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((mainItem) => mainItem.subItems.length > 0 || mainItem.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const selectContent = (content, title) => {
    setSelectedContent(content);
    setSelectedTitle(title);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-main-bg)" }}>
      {/* Header */}
      <header className="border-b flex items-center justify-center bg-main-bg border-gray-button-bg">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col items-center justify-center">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ backgroundColor: "var(--color-outer-button-bg)" }}
            >
              <FileText className="w-4 h-4" style={{ color: "var(--color-landing-icon)" }} />
            </div>
            <h1 className="text-2xl font-semibold" style={{ color: "var(--color-text-primary)" }}>
              Customer Support Hub
            </h1>
          </div>
          <p className="mb-6" style={{ color: "var(--color-text-notActive)" }}>
            What can we help you find today?
          </p>

          <div className="relative max-w-md w-full md:w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              style={{ color: "var(--color-main-icon)" }}
            />
            <input
              type="text"
              placeholder="Search by topic or keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--color-text-notActive)",
                backgroundColor: "var(--color-gray-button-bg)",
                color: "var(--color-text-primary)",
                "--tw-ring-color": "var(--color-button-outline)",
              }}
            />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-80 border-r h-[calc(100vh-200px)] overflow-y-auto border-gray-button-bg bg-main-bg">
          <div className="p-6">
            {filteredData.map((mainItem) => (
              <div key={mainItem.id} className="mb-4">
                <button
                  onClick={() => toggleExpanded(mainItem.id)}
                  className="w-full flex items-center p-2 text-left font-medium rounded hover:bg-opacity-50"
                  style={{
                    color: "var(--color-text-primary)",
                    backgroundColor: expandedItems.has(mainItem.id)
                      ? "var(--color-shadow-button-outer)"
                      : "transparent",
                  }}
                >
                  {expandedItems.has(mainItem.id) ? (
                    <ChevronDown
                      className="w-4 h-4 mr-2 flex-shrink-0"
                      style={{ color: "var(--color-main-icon)" }}
                    />
                  ) : (
                    <ChevronRight
                      className="w-4 h-4 mr-2 flex-shrink-0"
                      style={{ color: "var(--color-main-icon)" }}
                    />
                  )}
                  <span className="text-sm">{mainItem.title}</span>
                </button>

                {expandedItems.has(mainItem.id) && (
                  <div className="ml-6 mt-2 space-y-1">
                    {mainItem.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => selectContent(subItem.content, subItem.title)}
                        className="w-full text-left p-2 text-sm rounded relative hover:bg-opacity-50"
                        style={{
                          color:
                            selectedTitle === subItem.title
                              ? "var(--color-text-primary)"
                              : "var(--color-text-notActive)",
                          backgroundColor:
                            selectedTitle === subItem.title
                              ? "var(--color-shadow-button-outer)"
                              : "transparent",
                        }}
                      >
                        {selectedTitle === subItem.title && (
                          <span
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-4 rounded"
                            style={{ backgroundColor: "var(--color-outer-button-bg)" }}
                          />
                        )}
                        {subItem.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div
            className="p-8 border rounded-lg shadow-sm space-y-6"
            style={{
              borderColor: "var(--color-text-notActive)",
              backgroundColor: "var(--color-gray-button-bg)",
            }}
          >
            {selectedContent.map((item, index) => (
              <div key={index}>
                <h2 className="text-lg font-semibold" style={{ color: "var(--color-main-text)" }}>
                  {item.title}
                </h2>
                <p style={{ color: "var(--color-text-primary)" }}>{item.description}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
