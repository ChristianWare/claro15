// SearchFilterLayout.tsx

"use client";

import styles from "./SearchFilterLayout.module.css";
import { collections } from "@wix/stores";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LayoutWrapper from "@/components/LayoutWrapper";
import { useEffect, useState, useTransition } from "react";

interface SearchFilterLayoutProps {
  collections: collections.Collection[];
  children: React.ReactNode;
}

export default function SearchFilterLayout({
  collections,
  children,
}: SearchFilterLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Log the pathname to verify it
  console.log("Current pathname:", pathname);

  // Check if we're on a specific product page (e.g., /shop/[slug])
  const isProductPage =
    pathname?.startsWith("/shop/") && pathname.split("/").length === 3;

  // Optimistic filter state
  const [filters, setFilters] = useState({
    collection: searchParams.getAll("collection"),
    price_min: searchParams.get("price_min") || "",
    price_max: searchParams.get("price_max") || "",
    sort: searchParams.get("sort") || "last_updated",
  });

  const [isPending, startTransition] = useTransition();

  function updateFilters(updatedValues: Partial<typeof filters>) {
    const newFilters = { ...filters, ...updatedValues };
    setFilters(newFilters);

    // Update URL search params
    const newSearchParams = new URLSearchParams(searchParams);
    Object.entries(newFilters).forEach(([key, value]) => {
      newSearchParams.delete(key);
      if (Array.isArray(value)) {
        value.forEach((val) => newSearchParams.append(key, val));
      } else if (value) {
        newSearchParams.set(key, value);
      }
    });

    startTransition(() => {
      router.push(`${pathname}?${newSearchParams.toString()}`);
    });
  }

  return (
    <LayoutWrapper>
      <main className={styles.main}>
        {!isProductPage && (
          <>
           
            <aside
              className={styles.aside}
              data-pending={isPending ? "" : undefined}
            >
              <CollectionsFilter
                collections={collections}
                selectedCollectionIds={filters.collection}
                updateCollectionIds={(collectionIds) =>
                  updateFilters({ collection: collectionIds })
                }
              />
              <PriceFilter
                minDefaultInput={filters.price_min}
                maxDefaultInput={filters.price_max}
                updatePriceRange={(min, max) =>
                  updateFilters({ price_min: min, price_max: max })
                }
              />
              <SortFilter
                sort={filters.sort}
                updateSort={(sort) => updateFilters({ sort })}
              />
            </aside>
          </>
        )}
        <div>{children}</div>
      </main>
    </LayoutWrapper>
  );
}

interface CollectionsFilterProps {
  collections: collections.Collection[];
  selectedCollectionIds: string[];
  updateCollectionIds: (collectionIds: string[]) => void;
}

function CollectionsFilter({
  collections,
  selectedCollectionIds,
  updateCollectionIds,
}: CollectionsFilterProps) {
  return (
    <div>
      <div>Collections</div>
      <ul>
        {collections.map((collection) => {
          const collectionId = collection._id;
          if (!collectionId) return null;
          return (
            <li key={collectionId}>
              <label className='flex cursor-pointer items-center gap-2 font-medium'>
                <input
                  type='checkbox'
                  id={collectionId}
                  checked={selectedCollectionIds.includes(collectionId)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    updateCollectionIds(
                      checked
                        ? [...selectedCollectionIds, collectionId]
                        : selectedCollectionIds.filter(
                            (id) => id !== collectionId
                          )
                    );
                  }}
                  className='form-checkbox'
                />
                <span>{collection.name}</span>
              </label>
            </li>
          );
        })}
      </ul>
      {selectedCollectionIds.length > 0 && (
        <button onClick={() => updateCollectionIds([])}>Clear</button>
      )}
    </div>
  );
}

interface PriceFilterProps {
  minDefaultInput: string | undefined;
  maxDefaultInput: string | undefined;
  updatePriceRange: (min: string | undefined, max: string | undefined) => void;
}

function PriceFilter({
  minDefaultInput,
  maxDefaultInput,
  updatePriceRange,
}: PriceFilterProps) {
  const [minInput, setMinInput] = useState(minDefaultInput || "");
  const [maxInput, setMaxInput] = useState(maxDefaultInput || "");

  useEffect(() => {
    setMinInput(minDefaultInput || "");
    setMaxInput(maxDefaultInput || "");
  }, [minDefaultInput, maxDefaultInput]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    updatePriceRange(minInput || undefined, maxInput || undefined);
  }

  return (
    <div className='space-y-3'>
      <div className='font-bold'>Price range</div>
      <form onSubmit={onSubmit}>
        <input
          type='number'
          name='min'
          placeholder='Min'
          value={minInput}
          onChange={(e) => setMinInput(e.target.value || "")}
        />
        <span>-</span>
        <input
          type='number'
          name='max'
          placeholder='Max'
          value={maxInput}
          onChange={(e) => setMaxInput(e.target.value || "")}
        />
        <button type='submit'>Go</button>
      </form>
      {(!!minDefaultInput || !!maxDefaultInput) && (
        <button onClick={() => updatePriceRange(undefined, undefined)}>
          Clear
        </button>
      )}
    </div>
  );
}

interface SortFilterProps {
  sort: string | undefined;
  updateSort: (value: string) => void;
}

function SortFilter({ sort, updateSort }: SortFilterProps) {
  return (
    <div className={styles.filterContainer}>
      <label>Sort by: </label>
      <select
        value={sort || "last_updated"}
        onChange={(e) => updateSort(e.target.value)}
      >
        <option value='last_updated'>Newest</option>
        <option value='price_asc'>Price (Low to high)</option>
        <option value='price_desc'>Price (High to low)</option>
      </select>
    </div>
  );
}
