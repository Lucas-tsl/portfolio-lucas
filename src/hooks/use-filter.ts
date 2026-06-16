"use client";

import { useMemo, useState } from "react";

export interface FilterConfig<T> {
  items: T[];
  searchKeys?: (keyof T)[];
  filters?: Partial<Record<keyof T, (item: T, value: string) => boolean>>;
}

export function useFilter<T>({ items, searchKeys = [], filters = {} }: FilterConfig<T>) {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<Partial<Record<keyof T, string>>>({});

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (search) {
        const query = search.toLowerCase();
        const matchesSearch = searchKeys.some((key) => {
          const val = item[key];
          if (typeof val === "string") return val.toLowerCase().includes(query);
          if (Array.isArray(val)) return val.some((v) => String(v).toLowerCase().includes(query));
          return false;
        });
        if (!matchesSearch) return false;
      }

      return Object.entries(activeFilters).every(([key, value]) => {
        if (!value || value === "all") return true;
        const filterFn = filters[key as keyof T];
        return filterFn ? filterFn(item, value as string) : true;
      });
    });
  }, [items, search, activeFilters, searchKeys, filters]);

  function setFilter(key: keyof T, value: string) {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  }

  function resetFilters() {
    setSearch("");
    setActiveFilters({});
  }

  return { filtered, search, setSearch, activeFilters, setFilter, resetFilters };
}
