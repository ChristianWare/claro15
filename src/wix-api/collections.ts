import { WixClient } from "@/lib/wix-client.base";
import { collections } from "@wix/stores";
import { cache } from "react";

export const getCollectionBySlug = cache(
  async (wixClient: WixClient, slug: string) => {
    if (!slug) {
      throw new Error("Slug is undefined");
    }

    const { collection } = await wixClient.collections.getCollectionBySlug(
      slug
    );

    return collection || null;
  }
);

export const getCollections = cache(
  async (wixClient: WixClient): Promise<collections.Collection[]> => {
    const collections = await wixClient.collections
      .queryCollections()
      .ne("_id", "00000000-000000-000000-000000000001") // exclude all products
      .ne("_id", "acf5a5ba-05db-d122-5499-3f295f5e8cab") // exclude featured products
      .ne("_id", "df9eaf0d-85dd-d40c-4153-fab9626b9890") // exclude featured products
      .find();

    return collections.items;
  }
);
