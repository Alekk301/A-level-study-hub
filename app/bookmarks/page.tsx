import type { Metadata } from "next";
import { BookmarksPage } from "@/src/views/BookmarksPage";

export const metadata: Metadata = { title: "Saved" };

export default function Page() {
  return <BookmarksPage />;
}
