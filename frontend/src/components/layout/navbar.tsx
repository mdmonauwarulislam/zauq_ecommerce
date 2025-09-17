"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, ShoppingBag, User, Menu, Heart } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { itemCount } = useSelector((state: RootState) => state.cart)
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-gradient-to-b from-[#fff7f7]/80 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 cursor-pointer mr-5">
            <div className="w-10 h-10 bg-[#a31621] rounded-2xl flex items-center justify-center shadow">
              <span className="font-extrabold text-lg text-[#fffcdc]">L</span>
            </div>
            <span className="text-2xl font-extrabold text-[#a31621] tracking-tight">Luxe</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-[#a31621] transition-colors duration-200 font-semibold rounded-full px-4 py-1"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8 border-[#a31621] border-2 rounded-full outline-none shadow-sm bg-white">
            <div className="relative w-full ">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-12 bg-transparent border-0 focus:bg-white transition-colors duration-200 outline-none rounded-full focus:rounded-full focus:border-0 focus:ring-0"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            {isAuthenticated ? (
              <>
               {/* Wishlist */}
               <Button variant="ghost" size="icon" className="rounded-full bg-[#a31621]/10 text-[#a31621] hover:bg-[#a31621] hover:text-white transition-colors">
                  <Heart className="w-5 h-5" />
                </Button>

                {/* Cart */}
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="rounded-full bg-[#a31621]/10 text-[#a31621] hover:bg-[#a31621] hover:text-white transition-colors relative">
                    <ShoppingBag className="w-5 h-5" />
                    {itemCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-[#a31621] text-white">
                        {itemCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full bg-[#a31621]/10 text-[#a31621] hover:bg-[#a31621] hover:text-white transition-colors">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  {user?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost" className="rounded-full bg-[#a31621] text-[#fffcdc] cursor-pointer px-6 py-2 font-semibold">Login</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden rounded-full">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-semibold text-gray-700 hover:text-[#a31621] transition-colors rounded-full px-4 py-2"
                    >
                      {item.name}
                    </Link>
                  ))}
                  {!isAuthenticated && (
                    <div className="flex flex-col space-y-2 pt-4 border-t">
                      <Link href="/auth/login">
                        <Button variant="outline" className="w-full bg-transparent rounded-full px-6 py-2 font-semibold">
                          Login
                        </Button>
                      </Link>
                      <Link href="/auth/signup">
                        <Button className="w-full bg-green-700 text-white rounded-full px-6 py-2 font-semibold">Sign Up</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
