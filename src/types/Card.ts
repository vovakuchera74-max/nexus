export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  old_price: number | null
  brand: string
  category_id: string
  image_url: string
  rating: number
  reviews_count: number
  stock: number
  is_new: boolean
  discount_percent: number | null
  categories: { name: string } | null
}
