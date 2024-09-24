interface PaginationLinks {
  first: null | string;
  last: null | string;
  next: null | string;
  prev: null | string;
}

interface PaginationLink {
  active: boolean;
  label: string;
  url: null | string;
}
interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: Array<PaginationLink>;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface PaginationList<T> {
  data: Array<T>;
  links: PaginationLinks;
  meta: PaginationMeta;
}
