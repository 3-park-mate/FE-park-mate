// Re-export shared types for backward compatibility
export type {
  SearchParams,
  SearchFilters,
  SearchSortOption,
  SearchResultItem,
  SearchResultResponse,
  SearchHistoryItem,
  SearchSuggestion,
  SearchAnalytics,
} from '@repo/shared-types';

export interface TabMenuWithIconType {
  id: string;
  title: string;
  href?: string;
  icon?: React.FC<{ className?: string; onClick?: () => void }>;
}

export interface SearchLocationResultType {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
  road_address_name: string;
}
