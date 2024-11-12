// LayoutWrapper.tsx

import { usePathname } from "next/navigation";
import Layout from "../layout";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return <Layout pathname={pathname}>{children}</Layout>;
}
