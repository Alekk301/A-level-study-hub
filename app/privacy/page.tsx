import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/src/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How CAIE Study Hub stores study progress and uses optional analytics.",
};

export default function PrivacyPage() {
  return (
    <PageContainer>
      <article className="privacy-page">
        <p className="eyebrow">Privacy</p>
        <h1>Your study activity stays on this device</h1>
        <p>
          Bookmarks, completed topics, checklist progress, saved highlights, recent topics and
          theme preference are stored in your browser. CAIE Study Hub has no user accounts and
          does not send this study state to a project database.
        </p>

        <h2>Optional analytics</h2>
        <p>
          Google Analytics loads only after you select <strong>Accept analytics</strong>. It is
          used to understand aggregate visits and useful pages, not to identify classmates. If
          you decline, the analytics script is not loaded.
        </p>

        <h2>External paper links</h2>
        <p>
          Past-paper previews are requested from an approved external document host. That host
          may receive standard web request information such as your IP address and browser type.
        </p>

        <h2>Change your choice</h2>
        <p>
          You can reset both analytics consent and local study progress by clearing this site&apos;s
          browser data. See the repository&apos;s{" "}
          <Link href="https://github.com/Alekk301/A-level-study-hub/blob/main/PRIVACY.md">
            full privacy note
          </Link>{" "}
          for technical details.
        </p>
      </article>
    </PageContainer>
  );
}
