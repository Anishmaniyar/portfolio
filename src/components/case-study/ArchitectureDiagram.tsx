import type { DiagramNode } from "../../data/case-studies";

/*
 * Minimal vertical architecture diagram: stacked component boxes with
 * arrows between them. Reads well on desktop and narrow screens,
 * no diagram library needed.
 */

function FlowArrow() {
  return (
    <div className="cs-arrow" aria-hidden="true">
      <svg
        width="14"
        height="20"
        viewBox="0 0 14 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="7" y1="1" x2="7" y2="16" />
        <polyline points="3 12 7 16 11 12" />
      </svg>
    </div>
  );
}

export default function ArchitectureDiagram({
  nodes,
  name,
}: {
  nodes: DiagramNode[];
  name: string;
}) {
  return (
    <div
      className="cs-diagram"
      role="img"
      aria-label={`${name} system architecture diagram`}
    >
      {nodes.map((node, i) => (
        <div key={node.title}>
          {i > 0 ? <FlowArrow /> : null}
          <div className="cs-node">
            <div className="cs-node-title">{node.title}</div>
            <div className="cs-node-sub">{node.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
