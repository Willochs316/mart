'use client'
import axios from 'axios'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Product } from '@/app/types'


interface ProductContextType {
  products: Product[]
  categories: string[]
  selectedCategories: string[]
  sortBy: string
  loading: boolean
  error: string | null
  toggleCategory: (category: string) => void
  setSortBy: (sort: string) => void
  filteredProducts: Product[]
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('price-asc')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get('https://fakestoreapi.com/products'),
          axios.get('https://fakestoreapi.com/products/categories'),
        ])
        
        setProducts(productsRes.data)
        setCategories(categoriesRes.data)
      } catch (err) {
        setError('Failed to fetch products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const filteredProducts = useMemo(() => {
    let filtered = [...products]
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      )
    }

    switch (sortBy) {
      case 'price-asc':
        return filtered.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return filtered.sort((a, b) => b.price - a.price)
      case 'title-asc':
        return filtered.sort((a, b) => a.title.localeCompare(b.title))
      case 'title-desc':
        return filtered.sort((a, b) => b.title.localeCompare(a.title))
      default:
        return filtered
    }
  }, [products, selectedCategories, sortBy])

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        selectedCategories,
        sortBy,
        loading,
        error,
        toggleCategory,
        setSortBy,
        filteredProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider')
  }
  return context
}