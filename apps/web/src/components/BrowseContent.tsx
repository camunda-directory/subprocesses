import { useState, useMemo } from "react";
import ProcessCard from "./ProcessCard";
import FacetedSidebar from "./FacetedSidebar";

interface Process {
  id: string;
  title: string;
  description: string;
  tags: string[];
  complexity: "low" | "mid" | "high";
  author: string;
  bpmnXml?: string;
}

interface BrowseContentProps {
  processes: Process[];
}

export default function BrowseContent({ processes }: BrowseContentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  // Dynamically generate filter groups from processes
  const filterGroups = useMemo(() => {
    // Collect all unique tags
    const allTags = new Set<string>();
    for (const process of processes) {
      for (const tag of process.tags) {
        // Filter out empty or whitespace-only tags and normalize to lowercase
        if (tag && tag.trim()) {
          allTags.add(tag.toLowerCase());
        }
      }
    }

    // Sort tags alphabetically and capitalize first letter
    const sortedTags = Array.from(allTags).sort();
    const categoryOptions = sortedTags.map((tag) => ({
      label: tag.charAt(0).toUpperCase() + tag.slice(1),
      value: tag,
    }));

    return [
      {
        title: "Category",
        options: categoryOptions,
      },
      {
        title: "Complexity",
        options: [
          { label: "Simple", value: "low" },
          { label: "Moderate", value: "mid" },
          { label: "Complex", value: "high" },
        ],
      },
    ];
  }, [processes]);

  // Filter processes based on selected filters
  const filteredProcesses = useMemo(() => {
    let result = processes;

    // Filter by category (tags)
    if (filters.category && filters.category.length > 0) {
      result = result.filter((process) =>
        process.tags.some((tag) => filters.category.includes(tag))
      );
    }

    // Filter by complexity
    if (filters.complexity && filters.complexity.length > 0) {
      result = result.filter((process) => filters.complexity.includes(process.complexity));
    }

    return result;
  }, [processes, filters]);

  return (
    <div className="flex min-h-screen bg-black">
      <FacetedSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onFilterChange={setFilters}
        filterGroups={filterGroups}
      />

      <div className="flex-1">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden p-4 border-b border-gray-800">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-900 transition-colors text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
            {Object.values(filters).flat().length > 0 && (
              <span className="px-2 py-0.5 bg-orangemunda text-white text-xs rounded-full">
                {Object.values(filters).flat().length}
              </span>
            )}
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 lg:p-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-white">Browse Processes</h1>
            <p className="text-lg text-gray-400">
              Discover and integrate reusable BPMN subprocesses. Press{" "}
              <kbd className="px-2 py-1 bg-gray-900 border border-gray-700 rounded text-sm font-mono text-white">
                ⌘K
              </kbd>{" "}
              to search.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="text-2xl font-bold text-orangemunda">{filteredProcesses.length}</div>
              <div className="text-sm text-gray-400">
                {Object.values(filters).flat().length > 0 ? "Filtered" : "Total"} Processes
              </div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="text-2xl font-bold text-orangemunda">
                {filteredProcesses.filter((p) => p.complexity === "low").length}
              </div>
              <div className="text-sm text-gray-400">Simple</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="text-2xl font-bold text-orangemunda">
                {filteredProcesses.filter((p) => p.complexity === "mid").length}
              </div>
              <div className="text-sm text-gray-400">Moderate</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="text-2xl font-bold text-orangemunda">
                {filteredProcesses.filter((p) => p.complexity === "high").length}
              </div>
              <div className="text-sm text-gray-400">Complex</div>
            </div>
          </div>

          {/* Process Grid */}
          {filteredProcesses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProcesses.map((process) => (
                <ProcessCard key={process.id} {...process} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-white">No processes found</h3>
              <p className="mt-1 text-sm text-gray-400">
                Try adjusting your filters to see more results.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
