type SortBy =
  | "newest"
  | "oldest"
  | "price-upp"
  | "price-down"
  | "name-first"
  | "name-down";

type BuildItemsUrlParams = {
  currentPage: number;
  itemsPerPage: number;
  sortBy: SortBy;
  searchState: string;
  isAutoChecked: boolean;
  isElectronicsChecked: boolean;
  isRealEstateChecked: boolean;
  onlyNeedsRevision: boolean;
};

const SORT_CONFIG: Record<
  SortBy,
  { sortColumn: string; sortDirection: "asc" | "desc" } | null
> = {
  newest: { sortColumn: "createdAt", sortDirection: "desc" },
  oldest: { sortColumn: "createdAt", sortDirection: "asc" },
  "price-upp": { sortColumn: "price", sortDirection: "desc" },
  "price-down": { sortColumn: "price", sortDirection: "asc" },
  "name-first": { sortColumn: "title", sortDirection: "asc" },
  "name-down": { sortColumn: "title", sortDirection: "desc" },
};

export function buildItemsUrl({
  currentPage,
  itemsPerPage,
  sortBy,
  searchState,
  isAutoChecked,
  isElectronicsChecked,
  isRealEstateChecked,
  onlyNeedsRevision,
}: BuildItemsUrlParams) {
  const params = new URLSearchParams();

  params.append("limit", String(itemsPerPage));
  params.append("skip", String((currentPage - 1) * itemsPerPage));

  const sortConfig = SORT_CONFIG[sortBy];
  if (sortConfig) {
    params.append("sortColumn", sortConfig.sortColumn);
    params.append("sortDirection", sortConfig.sortDirection);
  }

  if (searchState.trim()) {
    params.append("q", searchState.trim());
  }

  const categories = [
    isAutoChecked ? "auto" : null,
    isElectronicsChecked ? "electronics" : null,
    isRealEstateChecked ? "real_estate" : null,
  ].filter(Boolean);

  if (categories.length > 0) {
    params.append("categories", categories.join(","));
  }

  if (onlyNeedsRevision) {
    params.append("needsRevision", "true");
  }

  return params.toString();
}