import { useState } from "react";

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterGroup {
  title: string;
  options: FilterOption[];
}

interface FacetedSidebarProps {
  onFilterChange: (filters: Record<string, string[]>) => void;
  isOpen: boolean;
  onToggle: () => void;
  filterGroups: FilterGroup[];
}

export default function FacetedSidebar({
  onFilterChange,
  isOpen,
  onToggle,
  filterGroups,
}: FacetedSidebarProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const handleFilterToggle = (groupTitle: string, value: string) => {
    const groupKey = groupTitle.toLowerCase();
    const currentFilters = selectedFilters[groupKey] || [];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter((v) => v !== value)
      : [...currentFilters, value];

    const updatedFilters = {
      ...selectedFilters,
      [groupKey]: newFilters,
    };

    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    setSelectedFilters({});
    onFilterChange({});
  };

  const totalFiltersCount = Object.values(selectedFilters).reduce(
    (acc, filters) => acc + filters.length,
    0
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onToggle} />}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky lg:top-16 left-0 top-0 h-screen lg:h-[calc(100vh-4rem)] w-64 
          bg-black border-r border-gray-800 z-40
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          overflow-y-auto
        `}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Filters</h2>
            {totalFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-orangemunda hover:text-white transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Filter Groups */}
          <div className="space-y-6">
            {filterGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-medium mb-3 text-spacecraft">{group.title}</h3>
                <div className="space-y-2">
                  {group.options.map((option) => {
                    const groupKey = group.title.toLowerCase();
                    const isSelected = (selectedFilters[groupKey] || []).includes(option.value);

                    return (
                      <label
                        key={option.value}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleFilterToggle(group.title, option.value)}
                          className="w-4 h-4 rounded border-gray-600 text-orangemunda focus:ring-orangemunda cursor-pointer bg-gray-900"
                        />
                        <span className="text-sm text-gray-300 group-hover:text-white flex-1 transition-colors">
                          {option.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
