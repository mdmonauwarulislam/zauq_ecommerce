"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Filter, Star, Tag, Users, ChevronDown, ChevronUp } from "lucide-react"

export default function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState<number>(0)
  
  // Expandable sections state
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    categories: true,
    brands: true,
    rating: true
  })

  const categories = [
    { name: "Fashion", count: 156 },
    { name: "Electronics", count: 89 },
    { name: "Home & Living", count: 234 },
    { name: "Beauty", count: 67 },
    { name: "Sports", count: 45 },
    { name: "Books", count: 123 }
  ]

  const brands = [
    { name: "Luxe Brand", count: 23 },
    { name: "Premium Co.", count: 45 },
    { name: "Elite Style", count: 34 },
    { name: "Modern Living", count: 56 },
    { name: "Tech Pro", count: 78 }
  ]

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const clearFilters = () => {
    setPriceRange([0, 1000])
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedRating(0)
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const activeFiltersCount = selectedCategories.length + selectedBrands.length + (selectedRating > 0 ? 1 : 0)

  return (
    <div className="space-y-4">
      {/* Active Filters with smooth animations */}
      {activeFiltersCount > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 border border-red-100 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#a31621] animate-pulse" />
              <span className="text-sm font-semibold text-gray-900">Active Filters</span>
              <Badge className="bg-[#a31621] text-white text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </Badge>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="text-[#a31621] hover:bg-[#a31621]/10 transition-all duration-200 hover:scale-105"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category, index) => (
              <Badge 
                key={category} 
                className="bg-[#a31621] text-white hover:bg-[#a31621]/90 flex items-center gap-1 animate-in slide-in-from-left-2 duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {category}
                <X 
                  className="w-3 h-3 cursor-pointer hover:scale-110 transition-transform duration-200" 
                  onClick={() => toggleCategory(category)} 
                />
              </Badge>
            ))}
            {selectedBrands.map((brand, index) => (
              <Badge 
                key={brand} 
                className="bg-[#a31621] text-white hover:bg-[#a31621]/90 flex items-center gap-1 animate-in slide-in-from-left-2 duration-300"
                style={{ animationDelay: `${(selectedCategories.length + index) * 100}ms` }}
              >
                {brand}
                <X 
                  className="w-3 h-3 cursor-pointer hover:scale-110 transition-transform duration-200" 
                  onClick={() => toggleBrand(brand)} 
                />
              </Badge>
            ))}
            {selectedRating > 0 && (
              <Badge className="bg-[#a31621] text-white hover:bg-[#a31621]/90 flex items-center gap-1 animate-in slide-in-from-left-2 duration-300">
                {selectedRating}+ Stars
                <X 
                  className="w-3 h-3 cursor-pointer hover:scale-110 transition-transform duration-200" 
                  onClick={() => setSelectedRating(0)} 
                />
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Price Range with enhanced UX */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-500 group">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between p-5 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-[#a31621]/10 to-[#a31621]/20 rounded-xl group-hover:from-[#a31621]/20 group-hover:to-[#a31621]/30 transition-all duration-300 shadow-sm">
              <Tag className="w-5 h-5 text-[#a31621] group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 group-hover:text-[#a31621] transition-colors duration-300">Price Range</h3>
              <p className="text-xs text-gray-500 mt-0.5">Set your budget</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold text-[#a31621] bg-[#a31621]/5 px-3 py-1 rounded-full">
                ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
              </div>
            </div>
            <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-[#a31621]/10 transition-all duration-300">
              {expandedSections.price ? (
                <ChevronUp className="w-4 h-4 text-gray-600 group-hover:text-[#a31621] transition-all duration-300" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-600 group-hover:text-[#a31621] transition-all duration-300" />
              )}
            </div>
          </div>
        </button>
        
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
          expandedSections.price ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-5 pb-6 space-y-6 border-t border-gray-100 bg-gradient-to-b from-white to-gray-50/30">
            <div className="space-y-8 pt-4">
              {/* Enhanced Slider Container */}
              <div className="relative">
                <div className="absolute -top-2 left-0 right-0 flex justify-between text-xs text-gray-400">
                  <span>₹0</span>
                  <span>₹1,000</span>
                </div>
                <div className="pt-4">
                  <Slider 
                    value={priceRange} 
                    onValueChange={setPriceRange} 
                    max={1000} 
                    step={10} 
                    className="w-full [&>span]:bg-gradient-to-r [&>span]:from-[#a31621] [&>span]:to-[#a31621]/90 [&>span]:border-[#a31621] [&>span]:hover:bg-gradient-to-r [&>span]:hover:from-[#a31621]/90 [&>span]:hover:to-[#a31621] [&>span]:hover:border-[#a31621]/90 [&>span]:focus:bg-gradient-to-r [&>span]:focus:from-[#a31621] [&>span]:focus:to-[#a31621]/90 [&>span]:focus:border-[#a31621] [&>span]:focus:ring-[#a31621]/20 [&>span]:focus:ring-2 [&>span]:focus:ring-offset-2 [&>div]:bg-gradient-to-r [&>div]:from-[#a31621]/20 [&>div]:to-[#a31621]/40 [&>span]:transition-all [&>span]:duration-300 [&>span]:hover:scale-125 [&>span]:shadow-lg" 
                  />
                </div>
              </div>
              
              {/* Enhanced Price Display with animations */}
              <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="text-center group flex-1">
                  <div className="text-xs font-medium text-gray-500 group-hover:text-[#a31621] transition-colors duration-300 mb-1">Minimum</div>
                  <div className="text-xl font-bold text-[#a31621] group-hover:scale-105 transition-transform duration-300">
                    ₹{priceRange[0].toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Starting price</div>
                </div>
                
                <div className="flex flex-col items-center mx-4">
                  <div className="w-12 h-px bg-gradient-to-r from-gray-300 via-[#a31621] to-gray-300 mb-2"></div>
                  <div className="w-2 h-2 bg-[#a31621] rounded-full animate-pulse"></div>
                  <div className="w-12 h-px bg-gradient-to-r from-gray-300 via-[#a31621] to-gray-300 mt-2"></div>
                </div>
                
                <div className="text-center group flex-1">
                  <div className="text-xs font-medium text-gray-500 group-hover:text-[#a31621] transition-colors duration-300 mb-1">Maximum</div>
                  <div className="text-xl font-bold text-[#a31621] group-hover:scale-105 transition-transform duration-300">
                    ₹{priceRange[1].toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Upper limit</div>
                </div>
              </div>
              
              {/* Quick Price Presets */}
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-700">Quick Presets</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Budget", range: [0, 200] },
                    { label: "Mid-Range", range: [200, 500] },
                    { label: "Premium", range: [500, 800] },
                    { label: "Luxury", range: [800, 1000] }
                  ].map((preset, index) => (
                    <button
                      key={preset.label}
                      onClick={() => setPriceRange(preset.range)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 hover:scale-105 ${
                        priceRange[0] === preset.range[0] && priceRange[1] === preset.range[1]
                          ? 'bg-[#a31621] text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-[#a31621]/10 hover:text-[#a31621]'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories with smooth animations */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all duration-200 group"
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#a31621]/10 rounded-lg group-hover:bg-[#a31621]/20 transition-colors duration-200">
              <Tag className="w-4 h-4 text-[#a31621] group-hover:scale-110 transition-transform duration-200" />
            </div>
            <h3 className="font-semibold text-gray-900 group-hover:text-[#a31621] transition-colors duration-200">Categories</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">
              {selectedCategories.length} selected
            </span>
            {expandedSections.categories ? (
              <ChevronUp className="w-4 h-4 text-gray-500 group-hover:text-[#a31621] transition-all duration-200" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-[#a31621] transition-all duration-200" />
            )}
          </div>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expandedSections.categories ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
            {categories.map((category, index) => (
              <div 
                key={category.name} 
                className="flex items-center justify-between hover:bg-gray-50 rounded-lg p-2 transition-all duration-200 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={category.name}
                    checked={selectedCategories.includes(category.name)}
                    onCheckedChange={() => toggleCategory(category.name)}
                    className="text-[#a31621] transition-all duration-200 hover:scale-110"
                  />
                  <Label htmlFor={category.name} className="text-sm font-normal cursor-pointer group-hover:text-[#a31621] transition-colors duration-200">
                    {category.name}
                  </Label>
                </div>
                <span className="text-xs text-gray-500 group-hover:text-[#a31621] transition-colors duration-200">({category.count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brands with enhanced interactions */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
        <button
          onClick={() => toggleSection('brands')}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all duration-200 group"
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#a31621]/10 rounded-lg group-hover:bg-[#a31621]/20 transition-colors duration-200">
              <Users className="w-4 h-4 text-[#a31621] group-hover:scale-110 transition-transform duration-200" />
            </div>
            <h3 className="font-semibold text-gray-900 group-hover:text-[#a31621] transition-colors duration-200">Brands</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">
              {selectedBrands.length} selected
            </span>
            {expandedSections.brands ? (
              <ChevronUp className="w-4 h-4 text-gray-500 group-hover:text-[#a31621] transition-all duration-200" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-[#a31621] transition-all duration-200" />
            )}
          </div>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expandedSections.brands ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
            {brands.map((brand, index) => (
              <div 
                key={brand.name} 
                className="flex items-center justify-between hover:bg-gray-50 rounded-lg p-2 transition-all duration-200 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={brand.name}
                    checked={selectedBrands.includes(brand.name)}
                    onCheckedChange={() => toggleBrand(brand.name)}
                    className="text-[#a31621] transition-all duration-200 hover:scale-110"
                  />
                  <Label htmlFor={brand.name} className="text-sm font-normal cursor-pointer group-hover:text-[#a31621] transition-colors duration-200">
                    {brand.name}
                  </Label>
                </div>
                <span className="text-xs text-gray-500 group-hover:text-[#a31621] transition-colors duration-200">({brand.count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rating with smooth animations */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all duration-200 group"
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#a31621]/10 rounded-lg group-hover:bg-[#a31621]/20 transition-colors duration-200">
              <Star className="w-4 h-4 text-[#a31621] group-hover:scale-110 transition-transform duration-200" />
            </div>
            <h3 className="font-semibold text-gray-900 group-hover:text-[#a31621] transition-colors duration-200">Customer Rating</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">
              {selectedRating > 0 ? `${selectedRating}+ stars` : 'Any rating'}
            </span>
            {expandedSections.rating ? (
              <ChevronUp className="w-4 h-4 text-gray-500 group-hover:text-[#a31621] transition-all duration-200" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-[#a31621] transition-all duration-200" />
            )}
          </div>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expandedSections.rating ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
            {[4, 3, 2, 1].map((rating, index) => (
              <div 
                key={rating} 
                className="flex items-center justify-between hover:bg-gray-50 rounded-lg p-2 transition-all duration-200 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={selectedRating === rating}
                    onCheckedChange={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                    className="text-[#a31621] transition-all duration-200 hover:scale-110"
                  />
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`rating-${rating}`} className="text-sm font-normal cursor-pointer group-hover:text-[#a31621] transition-colors duration-200">
                      {rating}+ Stars
                    </Label>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 transition-all duration-200 ${
                            i < rating ? "fill-yellow-400 text-yellow-400 group-hover:scale-110" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
