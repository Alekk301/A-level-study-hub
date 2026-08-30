import { TopicPage } from "@/src/views/TopicPage";

export default async function Page({
  params,
}: {
  params: Promise<{ subject: string; topic: string }>;
}) {
  const { subject, topic } = await params;
  return <TopicPage subjectCode={subject} topicId={decodeURIComponent(topic)} />;
}
