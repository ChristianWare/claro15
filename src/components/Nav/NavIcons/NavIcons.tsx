import styles from './NavIcons.module.css'
import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client.server";
import ShoppingCartButton from '@/components/ShoppingCartButton/ShoppingCartButton';
import UserButton from '@/components/UserButton/UserButton';
import { getLoggedInMember } from "@/wix-api/members";

export default async function NavIcons() {
     const wixClient = await getWixServerClient();

     const [cart, loggedInMember] = await Promise.all([
       getCart(wixClient),
       getLoggedInMember(wixClient),
     ]);
  return (
    <div className={styles.container}>
      <UserButton loggedInMember={loggedInMember} />
      <ShoppingCartButton initialData={cart} />
    </div>
  );
}