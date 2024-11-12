// /app/shop/[slug]/layout.tsx

import { ReactNode } from "react";

export default function ProductPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>; // Simple layout without PageIntro or SearchFilterLayout
}
