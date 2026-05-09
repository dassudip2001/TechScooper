export interface LoginRequest {
  email: string
  password: string
  redirect?: boolean
}

export interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

export interface Category {
  id: string
  name: string
  description?: string
  createdAt?: string
  updatedAt?: string
}
