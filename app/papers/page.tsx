import type { Metadata } from "next";
import { PapersPage } from "@/src/views/PapersPage";

export const metadata: Metadata = { title: "Past Papers" };

export default function Page() {
  return <PapersPage />;
}
