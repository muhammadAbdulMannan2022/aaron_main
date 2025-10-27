import { useState, useMemo, useRef, useEffect } from "react";
import { Search, ChevronRight, ChevronDown, FileText } from "lucide-react";
import documentationData from "./doc";

// Helper function to remove duplicates and structure data
const prepareData = (data) => {
  // Remove duplicates based on question and answer
  const seen = new Set();
  const uniqueData = data.filter((item) => {
    const key = `${item.question}|${item.answer}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Group by category and create hierarchical structure
  const grouped = uniqueData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = {
        id: item.category,
        title: item.category,
        subItems: [],
      };
    }
    acc[item.category].subItems.push({
      id: item.question,
      title: item.question,
      content: [{ title: item.question, description: item.answer }],
    });
    return acc;
  }, {});

  return Object.values(grouped);
};

export default function SupportHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [selectedContent, setSelectedContent] = useState(
    prepareData(documentationData)[0].subItems[0].content
  );
  const [selectedTitle, setSelectedTitle] = useState(
    prepareData(documentationData)[0].subItems[0].title
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Prepare structured data
  const structuredData = useMemo(() => prepareData(documentationData), []);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery) return structuredData;

    return structuredData
      .map((mainItem) => ({
        ...mainItem,
        subItems: mainItem.subItems.filter(
          (subItem) =>
            subItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subItem.content.some((c) =>
              c.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
        ),
      }))
      .filter((mainItem) => mainItem.subItems.length > 0);
  }, [searchQuery, structuredData]);

  // Generate search suggestions (limit to 5)
  const suggestions = useMemo(() => {
    if (!searchQuery) return [];
    return documentationData
      .filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5)
      .map((item) => item.question);
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
    setSearchQuery(""); // Clear search after selection
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    const item = structuredData
      .flatMap((main) => main.subItems)
      .find((subItem) => subItem.title === suggestion);
    if (item) {
      setSelectedContent(item.content);
      setSelectedTitle(item.title);
      setSearchQuery("");
      setShowSuggestions(false);
      // Expand the relevant category
      const category = structuredData.find((main) =>
        main.subItems.some((sub) => sub.title === suggestion)
      );
      if (category) {
        const newExpanded = new Set(expandedItems);
        newExpanded.add(category.id);
        setExpandedItems(newExpanded);
      }
    }
  };

  // Hide suggestions when clicking outside
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  // Add event listener for clicks outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-main-bg)" }}
    >
      {/* Header */}
      <header className="border-b flex items-center justify-center bg-main-bg border-gray-button-bg">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col items-center justify-center">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ backgroundColor: "var(--color-outer-button-bg)" }}
            >
              <FileText
                className="w-4 h-4"
                style={{ color: "var(--color-landing-icon)" }}
              />
            </div>
            <h1
              className="text-2xl font-semibold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Customer Support Hub
            </h1>
          </div>
          <p className="mb-6" style={{ color: "var(--color-text-notActive)" }}>
            What can we help you find today?
          </p>

          <div className="relative max-w-md w-full md:w-md" ref={searchRef}>
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              style={{ color: "var(--color-main-icon)" }}
            />
            <input
              type="text"
              placeholder="Search by topic or keyword"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(!!e.target.value);
              }}
              onFocus={() => setShowSuggestions(!!searchQuery)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--color-text-notActive)",
                backgroundColor: "var(--color-gray-button-bg)",
                color: "var(--color-text-primary)",
                "--tw-ring-color": "var(--color-button-outline)",
              }}
            />
            {showSuggestions && suggestions.length > 0 && (
              <div
                className="absolute w-full mt-1 border rounded-md shadow-lg z-10"
                style={{
                  backgroundColor: "var(--color-gray-button-bg)",
                  borderColor: "var(--color-text-notActive)",
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-opacity-50"
                    style={{
                      color: "var(--color-text-primary)",
                      backgroundColor: "transparent",
                    }}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className="w-80 border-r h-[calc(100vh-200px)] overflow-y-auto border-gray-button-bg bg-main-bg"
          style={{
            scrollbarWidth: "thin", // for Firefox
            scrollbarColor: "#888 #ffffff20", // for Firefox
          }}
        >
          <style>
            {`
      aside::-webkit-scrollbar {
        width: 8px;
      }
      aside::-webkit-scrollbar-track {
        background: #ffffff20;
      }
      aside::-webkit-scrollbar-thumb {
        background: #ffffff20;
        border-radius: 6px;
      }
      aside::-webkit-scrollbar-thumb:hover {
        background: #ffffff20;
      }
    `}
          </style>
          <div className="p-6">
            {filteredData.length === 0 ? (
              <p
                className="text-center"
                style={{ color: "var(--color-text-notActive)" }}
              >
                No results found.
              </p>
            ) : (
              filteredData.map((mainItem) => (
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
                          onClick={() =>
                            selectContent(subItem.content, subItem.title)
                          }
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
                              style={{
                                backgroundColor: "var(--color-outer-button-bg)",
                              }}
                            />
                          )}
                          {subItem.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
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
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "var(--color-main-text)" }}
                >
                  {item.title}
                </h2>
                <p style={{ color: "var(--color-text-primary)" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
