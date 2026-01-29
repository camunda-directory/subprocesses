interface ProcessCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  complexity: "low" | "mid" | "high";
  author: string;
  bpmnXml?: string;
}

const complexityLabels = {
  low: "Simple",
  mid: "Moderate",
  high: "Complex",
};

const complexityColors = {
  low: "bg-orangemunda/20 text-orangemunda",
  mid: "bg-orangemunda/20 text-orangemunda",
  high: "bg-orangemunda/20 text-orangemunda",
};

import BPMNPreview from "./BPMNPreview";

export default function ProcessCard({
  id,
  title,
  description,
  tags,
  complexity,
  author,
  bpmnXml,
}: ProcessCardProps) {
  return (
    <a
      href={`/process/${id}`}
      className="block bg-gray-900 border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:border-orangemunda hover:shadow-2xl hover:shadow-orangemunda/20 group"
    >
      {/* BPMN Preview - Client-side only */}
      <div className="h-48 bg-black border-b border-gray-800 relative overflow-hidden group-hover:border-orangemunda transition-colors">
        {bpmnXml ? (
          <div className="w-full h-full" data-bpmn-preview={id}>
            <BPMNPreview xml={bpmnXml} className="pointer-events-none" />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-950">
            <svg
              className="w-16 h-16 text-gray-700 group-hover:text-orangemunda transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        )}
        {/* Netflix-style overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-orangemunda transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{description}</p>

        {/* Tags and Complexity */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 transition-colors"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full">
              +{tags.length - 3}
            </span>
          )}
          <span
            className={`px-2 py-1 text-xs rounded-full font-medium ${complexityColors[complexity]}`}
          >
            {complexityLabels[complexity]}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 font-medium">
              {author.charAt(0).toUpperCase()}
            </div>
            <span className="group-hover:text-white transition-colors">{author}</span>
          </div>
          <div className="flex items-center gap-1 group-hover:text-orangemunda transition-colors">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <span>0</span>
          </div>
        </div>
      </div>
    </a>
  );
}
