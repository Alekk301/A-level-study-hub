import { NotesPage } from "@/src/views/NotesPage";

export default async function Page({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  return <NotesPage subjectCode={subject} />;
}
