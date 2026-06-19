export interface ApiResponse<T> {
  status: number;
  result: T;
}

export interface Order {
  _id: string;
  status: number;
  order_number: string;
  type: string;
  destinations: Destination[];
  start_date: number;
  end_date: number;
  is_today: boolean;
  status_string: string;
  status_class: string;
  driver_thumbnail: string | null;
}

export interface Destination {
  address: string;
  start_date: number;
  end_date: number;
  nickname: string;
  show_navigation: boolean;
}

export interface TrackingStep {
  active: boolean;
  status: string;
}

export interface StatusList {
  pickup: TrackingStep[];
  dropoff: TrackingStep[];
}

export interface Driver {
  email: string;
  telephone: string;
}

export interface OrderDetail extends Order {
  reference_number: string;
  status_list: StatusList;
  driver: Driver;
}
