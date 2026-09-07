import type { Metadata } from "next";
import { NotesPage } from "@/src/views/NotesPage";

export const metadata: Metadata = { title: "Revision Notes" };

export default function Page() {
  return <NotesPage />;
}
