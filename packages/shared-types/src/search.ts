import { Coordinates, LocationData } from './common';

// Search Types
export interface SearchParams {
  query: string;
  location?: LocationData;
  filters?: SearchFilters;
  sortBy?: SearchSortOption;
  page?: number;
  size?: number;
}

export interface SearchFilters {
  priceRange?: {
    min: number;
    max: number;
  };
  parkingSpotTypes?: string[];
  evChargingAvailable?: boolean;
  availableNow?: boolean;
  rating?: number;
  distance?: number;
}

export type SearchSortOption =
  | 'distance'
  | 'price_low'
  | 'price_high'
  | 'rating'
  | 'relevance';

// Search Result Types
export interface SearchResultItem {
  parkingLotUuid: string;
  name: string;
  address: string;
  distance: number;
  price: number;
  rating: number;
  availableSpots: number;
  thumbnailUrl?: string;
  isEvChargingAvailable: boolean;
  parkingSpotTypes: string[];
}

export interface SearchResultResponse {
  results: SearchResultItem[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  searchTime: number;
}

// Search History Types
export interface SearchHistoryItem {
  id: string;
  query: string;
  location?: LocationData;
  timestamp: string;
  resultCount: number;
}

// Search Suggestion Types
export interface SearchSuggestion {
  type: 'parking_lot' | 'address' | 'landmark';
  text: string;
  value: string;
  coordinates?: Coordinates;
}

// Search Analytics Types
export interface SearchAnalytics {
  popularSearches: Array<{
    query: string;
    count: number;
  }>;
  searchTrends: Array<{
    date: string;
    searchCount: number;
  }>;
}
