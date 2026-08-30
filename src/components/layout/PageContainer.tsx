import type { ReactNode } from "react";

export function PageContainer({
  children,
  size = "wide",
  className = "",
}: {
  children: ReactNode;
  size?: "wide" | "reading";
  className?: string;
}) {
  return (
    <div className={`page-container page-container--${size} ${className}`.trim()}>
      {children}
    </div>
  );
}
