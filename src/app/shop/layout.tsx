// Layout.tsx

import { getWixServerClient } from "@/lib/wix-client.server";
import { getCollections } from "@/wix-api/collections";
import SearchFilterLayout from "./SearchFilterLayout";
// import Nav from "@/components/Nav/Nav";
import Navbar from "@/components/Navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
  pathname?: string; // Make pathname optional
}) {
  const collections = await getCollections(await getWixServerClient());

  return (
    <>
      <div>
        {/* <Nav color='black' /> */}
        <Navbar />
      </div>
      <SearchFilterLayout collections={collections}>
        {children}
      </SearchFilterLayout>
    </>
  );
}
