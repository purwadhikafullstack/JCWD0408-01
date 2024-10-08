export interface addressForm {
    address: string
    subdistrict?: string
    city: string
    city_id: string
    province: string
    province_id: string
    postcode?: string
    latitude: number
    longitude: number
    address_id?: number; 
}

export interface addressCard {
    address_id: number,
    address: string;
    subdistrict?: string | null;
    city?: string | null;
    province?: string | null;
    postcode?: string | null;
    is_primary: boolean
}

export interface RajaOngkir {
    city_id: string
    city_name: string
    province_id: string
    province: string
    type: string
}

export interface ProvinceDetail {
    province: string
    province_id: string
}
