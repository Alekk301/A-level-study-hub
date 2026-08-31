import { ChevronDown } from "lucide-react";
import type { QuickRecallItem } from "@/src/types/content";

function normaliseItem(item: string | QuickRecallItem, index: number): QuickRecallItem {
  if (typeof item !== "string") return item;
  const separator = item.match(/^([^:=]+)[:=](.+)$/);
  if (separator) {
    const subject = separator[1].trim();
    return {
      question: `What does ${subject} mean?`,
      answer: separator[2].trim(),
    };
  }
  const subject = item.trim().split(/\s+/).slice(0, 2).join(" ");
  return {
    question: subject ? `How would you explain ${subject}?` : `Recall check ${index + 1}`,
    answer: item,
  };
}

export function QuickRecall({ items }: { items: Array<string | QuickRecallItem> }) {
  if (!items.length) return null;
  return (
    <section className="note-block quick-recall" id="quick-recall" aria-labelledby="recall-heading">
      <div className="note-block__heading">
        <p className="section-kicker">Quick recall</p>
        <h2 id="recall-heading">Tap a question to check your answer</h2>
      </div>
      <ul>
        {items.map((rawItem, index) => {
          const item = normaliseItem(rawItem, index);
          return (
            <li key={`${item.question}:${index}`}>
              <details>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.question}</strong>
                  <ChevronDown aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
