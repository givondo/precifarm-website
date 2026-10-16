import DiagramFrame from "@/components/research/diagrams/DiagramFrame";

type TreeNode = {
  label: string;
  detail?: string;
  tone?: "charge" | "forest";
  children?: readonly TreeNode[];
};

const tree: TreeNode = {
  label: "Engineer or operator",
  detail: "asks a sizing or cost question",
  children: [
    {
      label: "Web workspace",
      detail: "precifarm.com/agent/chat",
      children: [
        {
          label: "Language model",
          detail: "DeepSeek V4 Flash",
          tone: "charge",
          children: [
            {
              label: "Calculators",
              detail: "5 deterministic tools",
              tone: "forest",
              children: [
                { label: "EV energy", detail: "km × kWh/100 km → kWh/day" },
                { label: "Charge time", detail: "kWh ÷ charger kW → hours" },
                { label: "Peak load", detail: "Σ kW × diversity → kW" },
                { label: "Energy cost", detail: "kWh × KES/kWh → KES/day" },
                { label: "Battery size", detail: "kW × hours, rounded up → kWh" },
              ],
            },
            { label: "Labelled output", detail: "calculated · estimated · assumed → engineer review" },
          ],
        },
      ],
    },
  ],
};

const dotTone = {
  charge: "bg-charge-600",
  forest: "bg-emerald-600",
  default: "bg-forest-400",
} as const;

function NodeLabel({ node }: { node: TreeNode }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 py-1">
      <span aria-hidden className={`h-2 w-2 shrink-0 translate-y-[-1px] rounded-full ${dotTone[node.tone ?? "default"]}`} />
      <span className="text-sm font-semibold text-forest-900">{node.label}</span>
      {node.detail ? <span className="font-mono text-[11px] text-forest-500">{node.detail}</span> : null}
    </div>
  );
}

function Branch({ nodes }: { nodes: readonly TreeNode[] }) {
  return (
    <ul className="ml-1">
      {nodes.map((node, i) => {
        const last = i === nodes.length - 1;
        return (
          <li key={node.label} className="relative pl-5">
            <span aria-hidden className={`absolute left-0 top-0 w-px bg-forest-200 ${last ? "h-[15px]" : "h-full"}`} />
            <span aria-hidden className="absolute left-0 top-[15px] h-px w-3.5 bg-forest-200" />
            <NodeLabel node={node} />
            {node.children ? <Branch nodes={node.children} /> : null}
          </li>
        );
      })}
    </ul>
  );
}

export default function AgentStackDiagram() {
  return (
    <DiagramFrame
      title="Current software stack"
      badge="Early access"
      caption="Numbers are computed by the calculators. The model explains them; an engineer signs off."
    >
      <div className="rounded-lg border border-border bg-white px-3 py-3 sm:px-4">
        <NodeLabel node={tree} />
        {tree.children ? <Branch nodes={tree.children} /> : null}
      </div>
    </DiagramFrame>
  );
}
