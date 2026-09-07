import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ComparisonTable } from "@/src/types/content";

export function ComparisonTableBlock({ table }: { table: ComparisonTable | null }) {
  if (!table) return null;
  return (
    <section className="note-block comparison" id="comparison" aria-labelledby="comparison-heading">
      <div className="note-block__heading">
        <p className="section-kicker">Comparison</p>
        <h2 id="comparison-heading">{table.title}</h2>
      </div>
      <div className="table-scroll" tabIndex={0} aria-label={`${table.title} table; scroll horizontally if needed`}>
        <Table>
          <TableHeader>
            <TableRow>{table.columns.map((column) => <TableHead key={column}>{column}</TableHead>)}</TableRow>
          </TableHeader>
          <TableBody>
            {table.rows.map((row, index) => (
              <TableRow key={`${row[0]}-${index}`}>
                {row.map((cell, cellIndex) => <TableCell key={`${cell}-${cellIndex}`}>{cell}</TableCell>)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
