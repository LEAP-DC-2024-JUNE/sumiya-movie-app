import React, { ReactNode } from "react";
import { Suspense } from "react";
export default function MoreLikeLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Suspense>{children}</Suspense>
    </div>
  );
}
