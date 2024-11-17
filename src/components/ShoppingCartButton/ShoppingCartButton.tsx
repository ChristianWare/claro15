/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import styles from "./ShoppingCartButton.module.css";
import {
  useCart,
  useRemoveCartItem,
  useUpdateCartItemQuantity,
} from "@/hooks/cart";
import { useCartCheckout } from "@/hooks/checkout";
import { currentCart } from "@wix/ecom";
import { useState } from "react";
import Modal from "../Modal/Modal";
import Link from "next/link";
import WixImage from "../WixImage";
import Cart from "../../../public/icons/cart.svg";
import Trash from "../../../public/icons/trash.svg";

interface ShoppingCartButtonProps {
  initialData: currentCart.Cart | null;
  color?: string;
}

export default function ShoppingCartButton({
  initialData,
  color = "",
}: ShoppingCartButtonProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const cartQuery = useCart(initialData);
  const { startCheckoutFlow, pending } = useCartCheckout();

  const totalQuantity =
    cartQuery.data?.lineItems?.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0
    ) || 0;

  const handleCheckout = async () => {
    try {
      await startCheckoutFlow();
    } catch (error) {
      console.error("Error during checkout flow:", error);
    }
  };

  return (
    <>
      <div className='relative'>
        <button onClick={() => setSheetOpen(true)} className={styles.button}>
          <div className={styles.cartParent}>
            <Cart className={`${styles.icon} ${styles[color]}`} />
            <span className={styles.counter}>
              {totalQuantity < 10 ? totalQuantity : "9+"}
            </span>
          </div>
        </button>
        <Modal isOpen={sheetOpen} onClose={() => setSheetOpen(false)}>
          <div className={styles.modalContent}>
            <div className={styles.topContent}>
              <div className={styles.quantityContainer}>
                <p>My cart</p>
                <div className={styles.quantityBox}>
                  <span className={styles.quantity}>{totalQuantity}</span>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className='flex grow flex-col space-y-5 overflow-y-auto'>
              <ul className={styles.cartList}>
                {cartQuery.data?.lineItems?.map((item) => (
                  <ShoppingCartItem
                    key={item._id}
                    item={item}
                    onProductLinkClicked={() => setSheetOpen(false)}
                  />
                ))}
              </ul>
              {cartQuery.isPending && <p>Loading...</p>}
              {cartQuery.error && (
                <p className='text-destructive'>{cartQuery.error.message}</p>
              )}
              {!cartQuery.isPending && !cartQuery.data?.lineItems?.length && (
                <div className='flex grow items-center justify-center text-center'>
                  <div className='space-y-1.5'>
                    <p className='text-lg font-semibold'>Your cart is empty</p>
                    <Link
                      href='/shop'
                      className='text-primary hover:underline'
                      onClick={() => setSheetOpen(false)}
                    >
                      Start shopping now
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.modalBottom}>
              <div className='space-y-0.5'>
                <div className={styles.subtotalBox}>
                  <p>Subtotal</p>
                  <p>
                    {/* @ts-expect-error */}
                    {cartQuery.data?.subtotal?.formattedConvertedAmount}
                  </p>
                </div>
                <p>
                  *** Shipping and taxes calculated at checkout
                </p>
                <button
                  onClick={handleCheckout}
                  disabled={true}
                  // disabled={!totalQuantity || cartQuery.isFetching || pending}
                  className={styles.checkoutBox}
                >
                  {pending ? "Processing..." : "Checkout"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

interface ShoppingCartItemProps {
  item: currentCart.LineItem;
  onProductLinkClicked: () => void;
}

function ShoppingCartItem({
  item,
  onProductLinkClicked,
}: ShoppingCartItemProps) {
  const updateQuantityMutation = useUpdateCartItemQuantity();
  const removeItemMutation = useRemoveCartItem();

  const productId = item._id;

  if (!productId) return null;

  const slug = item.url?.split("/").pop();

  const quantityLimitReached =
    !!item.quantity &&
    !!item.availability?.quantityAvailable &&
    item.quantity >= item.availability.quantityAvailable;

  return (
    <li className={styles.cartListItem}>
      <div className={styles.left}>
        <div className={styles.l1}>
          <Link href={`/shop/${slug}`} onClick={onProductLinkClicked}>
            <WixImage
              mediaIdentifier={item.image}
              width={100}
              height={100}
              alt={item.productName?.translated || "Product image"}
              className={styles.cartImage}
            />
          </Link>
        </div>
        <div className={styles.l2}>
          <Link href={`/products/${slug}`}>
            <p className={styles.productName}>
              {item.productName?.translated || "Item"}
            </p>
          </Link>
          <div className={styles.qtyBtnBox}>
            <button
              disabled={item.quantity === 1}
              onClick={() =>
                updateQuantityMutation.mutate({
                  productId,
                  newQuantity: !item.quantity ? 0 : item.quantity - 1,
                })
              }
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              disabled={quantityLimitReached}
              onClick={() =>
                updateQuantityMutation.mutate({
                  productId,
                  newQuantity: !item.quantity ? 1 : item.quantity + 1,
                })
              }
            >
              +
            </button>
          </div>
            {quantityLimitReached && (
              <span className={styles.quantityWarning}>
                Quantity limit reached
              </span>
            )}
        </div>
      </div>
      <div className={styles.right}>
        <div>
          {item.fullPrice && item.fullPrice.amount !== item.price?.amount && (
            <span className={styles.originalPrice}>
              {item.fullPrice.formattedConvertedAmount}
            </span>
          )}
          {item.price?.formattedConvertedAmount}
        </div>
        <button onClick={() => removeItemMutation.mutate(productId)}>
          <Trash className={styles.trashIcon} />
        </button>
      </div>
    </li>
  );
}
