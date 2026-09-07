import { ExternalLink } from "lucide-react";
import type { Subject } from "@/src/types/content";

export function AdditionalResources({ subject }: { subject: Subject }) {
  const resources = subject.resources.filter((resource) => resource.category !== "papers");
  if (!resources.length) return null;
  return (
    <section className="note-resources" aria-labelledby="additional-resources-heading">
      <p className="section-kicker">Additional resources</p>
      <h2 id="additional-resources-heading">Check the official source or go deeper</h2>
      <p>These links are optional. The notes above remain the primary revision experience.</p>
      <div>
        {resources.map((resource) => (
          <a href={resource.url} target="_blank" rel="noreferrer" key={`${resource.source}-${resource.url}`}>
            <span><small>{resource.source}</small><strong>{resource.title}</strong></span><ExternalLink aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}
