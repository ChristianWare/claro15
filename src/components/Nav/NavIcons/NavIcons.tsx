import styles from "./NavIcons.module.css";
import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client.server";
import ShoppingCartButton from "@/components/ShoppingCartButton/ShoppingCartButton";
import UserButton from "@/components/UserButton/UserButton";
import { getLoggedInMember } from "@/wix-api/members";

interface NavProps {
  color?: string;
}

export default async function NavIcons({ color = "" }: NavProps) {
  const wixClient = await getWixServerClient();
  const [cart, loggedInMember] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
  ]);

  return (
    <div className={`${styles.container} ${styles[color]}`}>
      <UserButton loggedInMember={loggedInMember} color={color} />
      <ShoppingCartButton initialData={cart} color={color} />
    </div>
  );
}
