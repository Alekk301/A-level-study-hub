import { Progress } from "@/components/ui/progress";

export function ProgressLine({
  completed,
  total,
  label,
  compact = false,
}: {
  completed: number;
  total: number;
  label: string;
  compact?: boolean;
}) {
  const percentage = total ? Math.round((completed / total) * 100) : 0;
  return (
    <div className={compact ? "progress-line progress-line--compact" : "progress-line"}>
      <div className="progress-line__meta">
        <span>{label}</span>
        <span>
          {completed} / {total} · {percentage}%
        </span>
      </div>
      <Progress value={percentage} aria-label={`${label}: ${percentage}% complete`} />
    </div>
  );
}
