import { create } from "zustand";

export type SortBy =
  | "newest"
  | "oldest"
  | "price-upp"
  | "price-down"
  | "name-first"
  | "name-down";

type AdsListStore = {
  currentPage: number;
  sortBy: SortBy;
  searchState: string;
  isAutoChecked: boolean;
  isElectronicsChecked: boolean;
  isRealEstateChecked: boolean;
  onlyNeedsRevision: boolean;

  setCurrentPage: (page: number) => void;
  setSortBy: (sortBy: SortBy) => void;
  setSearchState: (value: string) => void;
  setIsAutoChecked: (value: boolean) => void;
  setIsElectronicsChecked: (value: boolean) => void;
  setIsRealEstateChecked: (value: boolean) => void;
  setOnlyNeedsRevision: (value: boolean) => void;

  resetFilters: () => void;
};

export const useAdsListStore = create<AdsListStore>((set) => ({
  currentPage: 1,
  sortBy: "newest",
  searchState: "",
  isAutoChecked: false,
  isElectronicsChecked: false,
  isRealEstateChecked: false,
  onlyNeedsRevision: false,

  setCurrentPage: (currentPage) => set({ currentPage }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSearchState: (searchState) => set({ searchState }),
  setIsAutoChecked: (isAutoChecked) => set({ isAutoChecked }),
  setIsElectronicsChecked: (isElectronicsChecked) =>
    set({ isElectronicsChecked }),
  setIsRealEstateChecked: (isRealEstateChecked) => set({ isRealEstateChecked }),
  setOnlyNeedsRevision: (onlyNeedsRevision) => set({ onlyNeedsRevision }),

  resetFilters: () =>
    set({
      currentPage: 1,
      sortBy: "newest",
      searchState: "",
      isAutoChecked: false,
      isElectronicsChecked: false,
      isRealEstateChecked: false,
      onlyNeedsRevision: false,
    }),
}));