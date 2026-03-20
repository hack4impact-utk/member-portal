"use client";

import { ReactNode, useState } from "react";

import FilterMenu from "@/components/filer-and-search/filter";
import Search from "@/components/filer-and-search/search";

export default function members(): ReactNode {
  const [filters, setFilters] = useState({ year: "", major: "" });
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      {/* Temporary Placement of Search and Filter Components */}
      <Search onSearch={setSearchTerm} />
      <FilterMenu onFilter={setFilters} />

      {/* Display current filters and search term for demonstration */}
      <div>
        <p>Search Term: {searchTerm}</p>
        <p>Year Filter: {filters.year}</p>
        <p>Major Filter: {filters.major}</p>
      </div>
    </div>
  );
}
