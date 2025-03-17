import React, { ReactNode } from "react";
import { Suspense } from "react";
export default function SearchMoviesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <Suspense>{children}</Suspense>
    </div>
  );
}
