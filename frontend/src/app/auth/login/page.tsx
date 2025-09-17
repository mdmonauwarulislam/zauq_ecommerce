"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"

interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  const onSubmit = (data: LoginForm) => {
    console.log("Login data:", data)
    // Handle login logic here
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-bg">
      <Card className="w-full max-w-4xl shadow-2xl border-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Form Side */}
          <div className="p-8 lg:p-12">
            <CardHeader className="px-0 pt-0">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-sage to-lavender rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">Luxe</span>
              </div>
              <CardTitle className="text-2xl font-light text-gray-900">Welcome Back</CardTitle>
              <p className="text-gray-600 mt-2">Sign in to your account to continue shopping</p>
            </CardHeader>

            <CardContent className="px-0">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" {...register("rememberMe")} />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Link href="/auth/forgot-password" className="text-sm text-gray-600 hover:text-gray-900">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-sage to-lavender text-white">
                  Sign In
                </Button>

                <div className="text-center">
                  <span className="text-gray-600">Don't have an account? </span>
                  <Link href="/auth/signup" className="text-gray-900 font-medium hover:underline">
                    Sign up
                  </Link>
                </div>
              </form>
            </CardContent>
          </div>

          {/* Image Side */}
          <div className="relative bg-gradient-to-br from-sage to-lavender p-8 lg:p-12 flex items-center justify-center">
            <div className="text-center text-white space-y-6">
              <h2 className="text-3xl font-light">Premium Shopping Experience</h2>
              <p className="text-white/90 leading-relaxed">
                Join thousands of satisfied customers who trust us for quality products and exceptional service.
              </p>
              <div className="relative w-64 h-64 mx-auto">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Shopping Experience"
                  fill
                  className="object-cover rounded-lg opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
