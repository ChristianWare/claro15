import Layout from "../layout";

export default function ShopLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
