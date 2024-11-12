// components/ProductResults/ProductFilters.tsx
"use client"; // Makes this a client component

import React, { useState } from "react";

interface FilterProps {
  onFilterChange: (filters: {
    collection?: string[];
    priceMin?: number;
    priceMax?: number;
    sort?: string;
  }) => void;
}

export default function ProductFilters({ onFilterChange }: FilterProps) {
  const [collection, setCollection] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState<number | undefined>();
  const [priceMax, setPriceMax] = useState<number | undefined>();
  const [sort, setSort] = useState<string | undefined>();

  const handleCollectionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;
    setCollection((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleApplyFilters = () => {
    onFilterChange({ collection, priceMin, priceMax, sort });
  };

  return (
    <div>
      <h3>Filter Products</h3>
      {/* Example filter inputs */}
      <div>
        <label>
          <input
            type='checkbox'
            value='collection1'
            onChange={handleCollectionChange}
          />
          Collection 1
        </label>
        <label>
          <input
            type='checkbox'
            value='collection2'
            onChange={handleCollectionChange}
          />
          Collection 2
        </label>
      </div>
      <div>
        <label>
          Min Price:
          <input
            type='number'
            onChange={(e) => setPriceMin(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Max Price:
          <input
            type='number'
            onChange={(e) => setPriceMax(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Sort By:
          <select onChange={(e) => setSort(e.target.value)}>
            <option value=''>Default</option>
            <option value='price_asc'>Price: Low to High</option>
            <option value='price_desc'>Price: High to Low</option>
          </select>
        </label>
      </div>
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
}
