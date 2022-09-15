export const LIST_MAX_ROWS = [30, 60, 90]

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 50,
  DEFAULT_CURRENT_PAGE: 1,
  NUMBER_OF_NAVIGATION_SHOW: 5,
  LOWER_BOUND: 2,
  UPPER_BOUND: 2,
  BEGIN_TO_PAGING: 3
}

export enum OverrideServerSideStoreType {
  Full = 'full',
  Partial = 'partial'
}

export interface IPaginationState {
  currentPage?: number
  totalPages?: number
  totalRows?: number
  sizePage?: number
}