export interface StoreAddress {
    address: string
    city: string
    city_id: string
    province: string
    province_id: string
    postcode?: string
    longitude: number
    latitude: number
}

export interface StoreData {
    store_name: string
    address: string
    city: string
    city_id: string
    province: string
    province_id: string
    postcode?: string
    longitude: number
    latitude: number
}

export interface StoreFullData{
    store_id: number
    store_name: string
    address: string
    city: string
    city_id: string
    province: string
    province_id: string
    postcode?: string
    longitude: number
    latitude: number
    user_id?: string
}

export interface StoreFetch {
    store_id: number;
    store_name: string;
    address: string;
    city: string;
    city_id: string; // Added
    province: string;
    province_id: string; // Added
    postcode?: string; // Made optional if it might not be present
    longitude: number; // Added
    latitude: number; // Added
    User: {
      user_id: number;
      first_name: string;
      last_name: string;
    };
  }