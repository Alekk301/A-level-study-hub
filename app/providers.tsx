"use client";

import type { ReactNode } from "react";
import { StudyProvider } from "@/src/hooks/use-study";

export function Providers({ children }: { children: ReactNode }) {
  return <StudyProvider>{children}</StudyProvider>;
}
