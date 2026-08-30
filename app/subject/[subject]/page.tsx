import { SubjectPage } from "@/src/views/SubjectPage";

export default async function Page({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  return <SubjectPage subjectCode={subject} />;
}
