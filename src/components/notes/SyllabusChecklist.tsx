import { useStudy } from "@/src/hooks/use-study";

export function SyllabusChecklist({ points, topicKey }: { points: string[]; topicKey: string }) {
  const study = useStudy();
  if (!points.length) return null;
  return (
    <section className="note-block syllabus-checklist" id="syllabus" aria-labelledby="syllabus-heading">
      <div className="note-block__heading">
        <p className="section-kicker">Syllabus checklist</p>
        <h2 id="syllabus-heading">You should be able to…</h2>
      </div>
      <ul>
        {points.map((point, index) => {
          const pointKey = String(index);
          const checked = study.isSyllabusPointChecked(topicKey, pointKey);
          return (
            <li key={`${pointKey}:${point}`} className={checked ? "is-checked" : undefined}>
              <label>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => study.toggleSyllabusPoint(topicKey, pointKey)}
                />
                <span>{point}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
