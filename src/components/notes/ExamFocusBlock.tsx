import { AlertTriangle, Check, ClipboardCheck } from "lucide-react";
import type { ExamFocus } from "@/src/types/content";

export function ExamFocusBlock({ focus }: { focus: ExamFocus | null }) {
  if (!focus) return null;

  return (
    <div className="note-block exam-focus">
      <div className="note-block__heading">
        <span>MARK-SCHEME FOCUS</span>
        <h2>How this knowledge earns marks</h2>
        <p>{focus.component}</p>
      </div>

      <div className="exam-focus__evidence" role="note">
        <ClipboardCheck aria-hidden="true" />
        <div>
          <strong>What the papers show</strong>
          <p>{focus.evidence}</p>
        </div>
      </div>

      <div className="exam-focus__method">
        <h3>Answer method</h3>
        <ol>
          {focus.answerMethod.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="exam-focus__tasks">
        {focus.tasks.map((task) => (
          <article key={task.title}>
            <header>
              <div>
                <span>RECURRING QUESTION</span>
                <h3>{task.title}</h3>
              </div>
              <small>{task.marks}</small>
            </header>
            <p className="exam-focus__prompt">{task.prompt}</p>
            <ul>
              {task.markPoints.map((point) => (
                <li key={point}><Check aria-hidden="true" /><span>{point}</span></li>
              ))}
            </ul>
            <p className="exam-focus__trap"><AlertTriangle aria-hidden="true" /><span><strong>Examiner trap:</strong> {task.examinerTrap}</span></p>
          </article>
        ))}
      </div>
    </div>
  );
}
