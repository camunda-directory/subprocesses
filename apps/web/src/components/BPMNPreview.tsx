import { useEffect, useRef, useState } from "react";

interface BPMNPreviewProps {
  xml: string;
  className?: string;
}

export default function BPMNPreview({ xml, className = "" }: BPMNPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let viewerInstance: any = null;

    // Dynamically import bpmn-js to avoid SSR issues
    import("bpmn-js/lib/Viewer")
      .then((module) => {
        const BpmnViewer = module.default;

        viewerInstance = new BpmnViewer({
          container: containerRef.current!,
        });

        viewerInstance
          .importXML(xml)
          .then(() => {
            const canvas = viewerInstance.get("canvas") as { zoom: (level: string) => void };
            canvas.zoom("fit-viewport");
          })
          .catch((err: Error) => {
            console.error("Error rendering BPMN preview:", err);
            setError("Failed to render diagram");
          });
      })
      .catch((err) => {
        console.error("Error loading BPMN viewer:", err);
        setError("Failed to load viewer");
      });

    return () => {
      if (viewerInstance) {
        viewerInstance.destroy();
      }
    };
  }, [xml]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 ${className}`}>
        <p className="text-sm text-gray-500">Preview unavailable</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`bpmn-preview bg-white ${className}`}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
