import { Target } from "lucide-react";

export function ExamTips({ tips }: { tips: string[] }) {
  if (!tips.length) return null;
  return (
    <section className="callout-block callout-block--tips" id="exam-tips" aria-labelledby="exam-tips-heading">
      <header><Target aria-hidden="true" /><div><p>Exam tip</p><h2 id="exam-tips-heading">What earns the marks</h2></div></header>
      <ul>{tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
    </section>
  );
}
