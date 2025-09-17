import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  rating: number
  reviews: number
  inStock: boolean
  featured: boolean
  sizes?: string[]
  colors?: string[]
  specifications?: Record<string, string>
}

interface ProductState {
  products: Product[]
  featuredProducts: Product[]
  categories: string[]
  loading: boolean
  filters: {
    category: string
    priceRange: [number, number]
    rating: number
    inStock: boolean
  }
  sortBy: "name" | "price" | "rating" | "newest"
}

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  categories: [],
  loading: false,
  filters: {
    category: "",
    priceRange: [0, 1000],
    rating: 0,
    inStock: false,
  },
  sortBy: "newest",
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
      state.featuredProducts = action.payload.filter((product) => product.featured)
      state.categories = [...new Set(action.payload.map((product) => product.category))]
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<ProductState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setSortBy: (state, action: PayloadAction<ProductState["sortBy"]>) => {
      state.sortBy = action.payload
    },
  },
})

export const { setProducts, setLoading, setFilters, setSortBy } = productSlice.actions
export default productSlice.reducer
