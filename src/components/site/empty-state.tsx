import { FileText } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed bg-secondary/70 px-6 py-12 text-center">
      <div className="mx-auto grid size-12 place-items-center rounded-full bg-white text-primary shadow-sm">
        <FileText className="size-5" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-navy">{title}</h3>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}
