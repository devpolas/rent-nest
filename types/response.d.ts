export interface Meta {
  page?: number;
  limit?: number;
  total?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  status: number;
  data?: T;
  meta?: Meta;
}
