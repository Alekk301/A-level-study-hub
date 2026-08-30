import { Check } from "lucide-react";

export function SyllabusChecklist({ points }: { points: string[] }) {
  if (!points.length) return null;
  return (
    <section className="note-block syllabus-checklist" id="syllabus" aria-labelledby="syllabus-heading">
      <div className="note-block__heading">
        <p className="section-kicker">Syllabus checklist</p>
        <h2 id="syllabus-heading">You should be able to…</h2>
      </div>
      <ul>
        {points.map((point) => (
          <li key={point}><Check aria-hidden="true" /><span>{point}</span></li>
        ))}
      </ul>
    </section>
  );
}
