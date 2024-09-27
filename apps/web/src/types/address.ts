export interface addressForm {
    address: string
    subdistrict: string
    city: string
    province: string
    postcode: string
    latitude: number
    longitude: number
    address_id?: number; // Add address_id as an optional property
}

export interface addressCard {
    address_id: number,
    address: string;
    subdistrict?: string | null;
    city?: string | null;
    province?: string | null;
    postcode?: string | null;
}
