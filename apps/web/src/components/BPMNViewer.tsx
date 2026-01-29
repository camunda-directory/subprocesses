import { useEffect, useRef } from "react";
import BpmnViewer from "bpmn-js/lib/NavigatedViewer";

interface BPMNViewerProps {
  xml: string;
  className?: string;
}

export default function BPMNViewer({ xml, className = "" }: BPMNViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<BpmnViewer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new BpmnViewer({
      container: containerRef.current,
      keyboard: {
        bindTo: document,
      },
    });

    viewerRef.current = viewer;

    viewer
      .importXML(xml)
      .then(() => {
        const canvas = viewer.get("canvas") as {
          zoom: (level: string | number, position?: string | { x: number; y: number }) => void;
        };
        canvas.zoom("fit-viewport", "auto");
      })
      .catch((err: Error) => {
        console.error("Error rendering BPMN diagram:", err);
      });

    return () => {
      viewer.destroy();
    };
  }, [xml]);

  return (
    <div
      ref={containerRef}
      className={`bpmn-container bg-white ${className}`}
      style={{ width: "100%", height: "600px" }}
    />
  );
}
