/* eslint-disable @typescript-eslint/no-explicit-any */
export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
};

type Column = {
  title: string;
  dataIndex: string;
  render?: (value: any, record: any, index: number) => React.ReactNode;
};
export type Props = {
  columns: Column[];
  data: any[];
  pagination?: Pagination;
};
