declare interface IParams {
  limit?: number | string;
  page?: number | string;
  search?: string;
  date?: string;
  status?: "DRAFT" | "DONE" | "PENDING";
  category?: string;
}

declare interface IPagination {
  total_item: number;
  total_page: number;
  current_page: number;
  limit: number;
}
declare interface IResponse<T> {
  data: T;
  success: boolean;
  message: string;
}
declare interface IPaginationOpt<T> extends IPagination {
  items: T[];
  pagination: IPagination;
}

declare type ISession = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  email?: string;
  token?: string;
  username?: string;
  name?: string;
  phone?: string | number;
  role?: string;
  credentials?: string;
};
