import Link from "next/link";
import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client.server";
import ShoppingCartButton from "./ShoppingCartButton/ShoppingCartButton";
import UserButton from "./UserButton/UserButton";
import { getLoggedInMember } from "@/wix-api/members";
import { getCollections } from "@/wix-api/collections";

export default async function Navbar() {
  const wixClient = await getWixServerClient(); // Await the async function here

  const [cart, loggedInMember, collections] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
    getCollections(wixClient),
  ]);

  return (
    <header className='bg-background shadow-sm'>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-5 p-5'>
        <Link href='/' className='flex items-center gap-4'>
          Logo Here <span className='text-xl font-bold'>Flow Shop</span>
        </Link>
        <div className='flex items-center justify-center gap-2'>
          <Link href='/shop'>Shop</Link>
          <Link href='/collections'>Collections</Link>
          <ul className='p-4'>
            {collections.map((collection) => (
              <li key={collection._id}>
                <Link
                  href={`/collections/${collection.slug}`}
                  legacyBehavior
                  passHref
                >
                  {collection.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex items-center justify-center gap-5'>
          <UserButton loggedInMember={loggedInMember} />
          <ShoppingCartButton initialData={cart} />
        </div>
      </div>
    </header>
  );
}