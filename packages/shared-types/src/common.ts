// Common Response Types
export interface CommonResponseType<T> {
  code: number;
  message: string;
  data: T;
}

// Common Form Types
export interface BaseFormData {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Common Pagination Types
export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// Common File Types
export interface FileUploadResponse {
  imageUrl: string;
  fileName: string;
}

// Common Location Types
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationData {
  lat: number;
  lng: number;
  locationName?: string;
}

// Common Time Types
export interface TimeRange {
  startTime: string;
  endTime: string;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

// Common Status Types
export type StatusType = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'DELETED';

// Common Option Types
export interface OptionData {
  id: number;
  name: string;
  label: string;
}

// Common Image Types
export interface ImageData {
  imageUrl: string;
  alt?: string;
  caption?: string;
}
