export interface ProductResult {
    product: [
        {
            Inventory: [
                {
                    total_qty: number
                    product_id: number
                    qty: number
                }
            ]
            category: {
                category_id: number
                category_name: string
                description: string
                created_at: string
                updated_at: string
            }
            category_id: number
            created_at: string
            description: string
            name: string
            price: number
            product_id: number
            store_id: number
            updated_at: string
            ProductImage: [
                {
                    url: string
                    product_id: number
                    image__id: number
                }
            ]
        },
    ]
    currentPage: number
    totalPages: number
    status: string
}