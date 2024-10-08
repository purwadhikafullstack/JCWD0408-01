export interface NearbyProducts {
    name: string
    price: number
    description: string
    ProductImage: [
        {url: string}
    ]
}

export interface HomePageCategory {
    category_id: number
    category_name: string
    category_url: string
    description: string
}