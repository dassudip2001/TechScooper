import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/auth"
import { AuthService } from "@/services/auth.service"

export type LoginRequestT = {
  email: string
  password: string
  redirect: boolean
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestT>()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const login = useAuthStore((state) => state.login)

  const onSubmit: SubmitHandler<LoginRequestT> = async (data) => {
    try {
      setLoading(true)
      const response = await AuthService.login(data)
      login(response)
      toast.success("Login successful!")
      navigate("/dashboard")
    } catch (error) {
      setLoading(false)
      toast.error("Login failed. Please check your credentials and try again.")
    }
  }

  useEffect(() => {
    if (errors.email || errors.password) {
      toast.error(
        "Please fill in all required fields." +
          (errors.email ? " Email is required." : "") +
          (errors.password ? " Password is required." : "")
      )
    }
  }, [errors.email, errors.password])

  return (
    <form
      className={cn(
        "flex animate-in flex-col gap-6 duration-500 fade-in-0 slide-in-from-bottom-4 sm:gap-8",
        className
      )}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Header Section */}
      <div className="flex flex-col items-center gap-2 text-center sm:gap-3">
        <div className="mb-1 sm:mb-2">
          <h1 className="mb-2 text-2xl font-light tracking-tight text-foreground sm:text-3xl">
            Welcome Back
          </h1>
          <div className="mx-auto h-px w-12 bg-border" />
        </div>
        <p className="max-w-sm px-2 text-xs leading-relaxed font-light text-muted-foreground sm:text-sm">
          Enter your credentials to access your account
        </p>
      </div>

      {/* Form Fields */}
      <div className="grid gap-4 sm:gap-6">
        {/* Email Field */}
        <div className="grid gap-2 sm:gap-2.5">
          <Label
            htmlFor="email"
            className="mb-0.5 text-xs font-medium tracking-wider text-muted-foreground uppercase sm:mb-1"
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            className={cn(
              "h-10 text-sm transition-all duration-200 sm:h-11 sm:text-base",
              errors.email && "border-destructive"
            )}
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 animate-in text-xs text-destructive fade-in-0">
              {errors.email.message || "Email is required"}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="grid gap-2 sm:gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <Label
              htmlFor="password"
              className="text-xs font-medium tracking-wider text-muted-foreground uppercase"
            >
              Password
            </Label>
            <Link
              to="/password"
              className="text-xs font-normal whitespace-nowrap text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            className={cn(
              "h-10 text-sm transition-all duration-200 sm:h-11 sm:text-base",
              errors.password && "border-destructive"
            )}
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="mt-1 animate-in text-xs text-destructive fade-in-0">
              {errors.password.message || "Password is required"}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-2 h-10 w-full text-sm font-medium tracking-wide shadow-sm transition-all duration-200 hover:shadow-md sm:h-11 sm:text-base"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-4 font-light tracking-wider text-muted-foreground">
            Secure Access
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="space-y-1.5 pt-1 text-center sm:space-y-2 sm:pt-2">
        <p className="px-2 text-xs font-light text-muted-foreground">
          Don&apos;t have an account?
        </p>
        <p className="px-2 text-xs">
          <a
            href="mailto:support@sudip.com"
            className="font-medium break-all text-foreground underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline sm:break-normal"
          >
            Contact support@sudip.com
          </a>
        </p>
      </div>
    </form>
  )
}
