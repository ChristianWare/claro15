"use client";

import styles from "./SearchFilterLayout.module.css";
import { collections } from "@wix/stores";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import LayoutWrapper from "@/components/LayoutWrapper";
import { useEffect, useState, useTransition, useMemo } from "react";

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

  const isProductPage =
    pathname?.startsWith("/shop/") && pathname.split("/").length === 3;

  const initialFilters = useMemo(
    () => ({
      collection: searchParams.getAll("collection") || [],
      price_min: searchParams.get("price_min") || "",
      price_max: searchParams.get("price_max") || "",
      sort: searchParams.get("sort") || "last_updated",
    }),
    [searchParams]
  );

  const [filters, setFilters] = useState(initialFilters);
  const [isPending, startTransition] = useTransition();
  const [isFilterVisible, setFilterVisible] = useState(false);

  useEffect(() => {
    setFilters({
      collection: searchParams.getAll("collection") || [],
      price_min: searchParams.get("price_min") || "",
      price_max: searchParams.get("price_max") || "",
      sort: searchParams.get("sort") || "last_updated",
    });
  }, [searchParams]);

  function updateFilters(updatedValues: Partial<typeof filters>) {
    const newFilters = { ...filters, ...updatedValues };
    setFilters(newFilters);

    const newSearchParams = new URLSearchParams();
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
    // <LayoutWrapper>
      <main className={styles.main}>
        <div className={styles.content}>
          {!isProductPage && (
            <>
              <div
                className={styles.filterButton}
                onClick={() => setFilterVisible(!isFilterVisible)}
              >
                Filter
              </div>
              <aside
                className={`${styles.aside} ${
                  isFilterVisible ? styles.asideVisible : ""
                }`}
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
        </div>
      </main>
    // </LayoutWrapper>
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
  const isAllSelected =
    selectedCollectionIds.length === 0 || selectedCollectionIds.includes("all");

  // function handleAllSelection() {
  //   updateCollectionIds(["all"]);
  // }

  function handleCollectionSelection(collectionId: string, checked: boolean) {
    if (checked) {
      updateCollectionIds([
        ...selectedCollectionIds.filter((id) => id !== "all"),
        collectionId,
      ]);
    } else {
      updateCollectionIds(
        selectedCollectionIds.filter((id) => id !== collectionId)
      );
    }
  }

  return (
    <div>
      <ul className={styles.collectionsList}>
        {/* All option */}
        {/* <li key='all'>
          <label className={styles.collectionNameBox}>
            <input
              type='checkbox'
              id='all'
              checked={isAllSelected}
              onChange={(e) => {
                const checked = e.target.checked;
                if (checked) {
                  handleAllSelection();
                } else {
                  updateCollectionIds([]); // Clear all selections if "All" is unchecked
                }
              }}
              className={styles.checkbox}
            />
            <span className={styles.customCheckbox}></span>
            <span className={styles.collectionName}>All</span>
          </label>
        </li> */}

        {/* Individual collections */}
        {collections.map((collection) => {
          const collectionId = collection._id;
          if (!collectionId) return null;
          const isChecked = isAllSelected
            ? false
            : selectedCollectionIds.includes(collectionId);

          return (
            <li key={collectionId}>
              <label className={styles.collectionNameBox}>
                <input
                  type='checkbox'
                  id={collectionId}
                  checked={isChecked}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    handleCollectionSelection(collectionId, checked);
                  }}
                  className={styles.checkbox}
                />
                <span className={styles.customCheckbox}></span>
                <span className={styles.collectionName}>{collection.name}</span>
              </label>
            </li>
          );
        })}
      </ul>
      {selectedCollectionIds.length > 0 && !isAllSelected && (
        <button onClick={() => updateCollectionIds(["all"])}>Clear</button>
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
    <div className={styles.priceRangeBox}>
      <h3 className={styles.priceRangeTitle}>Price Range :</h3>
      <form onSubmit={onSubmit} className={styles.priceRange}>
        <input
          type='number'
          name='min'
          placeholder='Min Price'
          value={minInput}
          onChange={(e) => setMinInput(e.target.value || "")}
          className={styles.priceInput}
        />
        <input
          type='number'
          name='max'
          placeholder='Max Price'
          value={maxInput}
          onChange={(e) => setMaxInput(e.target.value || "")}
          className={styles.priceInput}
        />
        <button type='submit' className={styles.goBtn}>
          Go
        </button>
      </form>
      {(!!minDefaultInput || !!maxDefaultInput) && (
        <button
          onClick={() => updatePriceRange(undefined, undefined)}
          className={styles.clearBtn}
        >
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
      <h3 className={styles.sortTitle}>Sort by :</h3>
      <select
        value={sort || "last_updated"}
        onChange={(e) => updateSort(e.target.value)}
        className={styles.selectOption}
      >
        <option value='last_updated' className={styles.option}>
          Newest
        </option>
        <option value='price_asc' className={styles.option}>
          Price (Low to high)
        </option>
        <option value='price_desc' className={styles.option}>
          Price (High to low)
        </option>
      </select>
    </div>
  );
}
