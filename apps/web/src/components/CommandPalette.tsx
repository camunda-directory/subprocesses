import { useEffect, useState } from "react";
import { Command } from "cmdk";
import "./CommandPalette.css";

interface CommandPaletteProps {
  processes: Array<{
    id: string;
    title: string;
    tags: string[];
    complexity: string;
  }>;
}

export default function CommandPalette({ processes }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const filteredProcesses = processes.filter(
    (process) =>
      process.title.toLowerCase().includes(search.toLowerCase()) ||
      process.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  if (!open) return null;

  return (
    <div className="command-palette-overlay" onClick={() => setOpen(false)}>
      <Command
        className="command-palette"
        onClick={(e) => e.stopPropagation()}
        label="Command Menu"
      >
        <div className="command-header">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M7 13A6 6 0 1 0 7 1a6 6 0 0 0 0 12ZM15 15l-3.35-3.35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Command.Input
            value={search}
            onValueChange={setSearch}
            placeholder="Search processes... ⌘K"
            className="command-input"
          />
        </div>
        <Command.List className="command-list">
          <Command.Empty className="command-empty">No processes found.</Command.Empty>
          {filteredProcesses.map((process) => (
            <Command.Item
              key={process.id}
              value={process.title}
              onSelect={() => {
                window.location.href = `/process/${process.id}`;
              }}
              className="command-item"
            >
              <div className="command-item-content">
                <span className="command-item-title">{process.title}</span>
                <div className="command-item-tags">
                  {process.tags.map((tag) => (
                    <span key={tag} className="command-item-tag">
                      {tag}
                    </span>
                  ))}
                  <span
                    className={`command-item-complexity complexity-${process.complexity.toLowerCase()}`}
                  >
                    {process.complexity}
                  </span>
                </div>
              </div>
            </Command.Item>
          ))}
        </Command.List>
      </Command>
    </div>
  );
}
