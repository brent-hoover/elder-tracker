import apiClient from './client'
import type { User } from '@/types'

export const usersApi = {
  async getAll(): Promise<User[]> {
    const { data } = await apiClient.get<User[]>('/users')
    return data
  },

  async getById(id: string): Promise<User> {
    const { data } = await apiClient.get<User>(`/users/${id}`)
    return data
  },

  async create(userData: { email: string; password: string; firstName: string; lastName: string; isAdmin?: boolean }): Promise<User> {
    const { data } = await apiClient.post<User>('/users', userData)
    return data
  },

  async update(id: string, userData: Partial<User>): Promise<User> {
    const { data } = await apiClient.patch<User>(`/users/${id}`, userData)
    return data
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`)
  }
}