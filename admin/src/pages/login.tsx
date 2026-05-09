import { LoginForm } from "@/components/login-form"
import { GalleryVerticalEnd } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="w-full max-w-md space-y-6 sm:space-y-8">
        <div className="flex justify-center">
          <a
            href="#"
            className="flex items-center gap-2.5 text-sm font-light tracking-wide transition-opacity hover:opacity-80"
          >
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm sm:size-7">
              <GalleryVerticalEnd className="size-3.5 sm:size-4" />
            </div>
            <span className="text-foreground">E-Com Admin</span>
          </a>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
