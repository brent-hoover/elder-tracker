import apiClient from './client'
import type { LoginCredentials, RegisterData, AuthResponse } from '@/types'

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials)
    return data
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/register', userData)
    return data
  },

  async getProfile() {
    const { data } = await apiClient.get('/auth/profile')
    return data
  }
}