import { PapersPage } from "@/src/views/PapersPage";

export default async function Page({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  return <PapersPage subjectCode={subject} />;
}
