import React, { ReactNode } from "react";
import { Suspense } from "react";
export default function GenreLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Suspense>{children}</Suspense>
    </div>
  );
}
