import type { PaperSession } from "@/src/types/content";
import { sessionLabels, sessionOrder } from "@/src/data/papers";

type FilterValue = string | number | "all";

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: FilterValue; label: string }[];
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}) {
  return (
    <div className="filter-row">
      <span>{label}</span>
      <div role="group" aria-label={label}>
        {options.map((option) => (
          <button
            type="button"
            key={String(option.value)}
            className={value === option.value ? "active" : ""}
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PaperFilters({
  years,
  year,
  session,
  paper,
  onYearChange,
  onSessionChange,
  onPaperChange,
}: {
  years: number[];
  year: number | "all";
  session: PaperSession | "all";
  paper: string | "all";
  onYearChange: (value: number | "all") => void;
  onSessionChange: (value: PaperSession | "all") => void;
  onPaperChange: (value: string | "all") => void;
}) {
  return (
    <section className="paper-filters" aria-label="Past paper filters">
      <FilterRow
        label="Year"
        value={year}
        onChange={(value) => onYearChange(value as number | "all")}
        options={[{ value: "all", label: "All" }, ...years.map((item) => ({ value: item, label: String(item) }))]}
      />
      <FilterRow
        label="Session"
        value={session}
        onChange={(value) => onSessionChange(value as PaperSession | "all")}
        options={[{ value: "all", label: "All" }, ...sessionOrder.map((item) => ({ value: item, label: sessionLabels[item] }))]}
      />
      <FilterRow
        label="Paper"
        value={paper}
        onChange={(value) => onPaperChange(value as string | "all")}
        options={["all", "1", "2", "3", "4", "5", "6"].map((item) => ({ value: item, label: item === "all" ? "All" : item }))}
      />
    </section>
  );
}
