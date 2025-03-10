import "./button-group.scss";

export default function ButtonGroup({ children }: { children: React.ReactNode }) {
  return <div className="button-group">{children}</div>;
}
