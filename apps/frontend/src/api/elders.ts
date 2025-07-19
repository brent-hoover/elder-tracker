import apiClient from './client'
import type { Elder, CreateElderDto, UpdateElderDto } from '@/types'

export const eldersApi = {
  async getAll(): Promise<Elder[]> {
    const { data } = await apiClient.get<Elder[]>('/elders')
    return data
  },

  async getById(id: string): Promise<Elder> {
    const { data } = await apiClient.get<Elder>(`/elders/${id}`)
    return data
  },

  async getByCaregiver(userId: string): Promise<Elder[]> {
    const { data } = await apiClient.get<Elder[]>(`/elders/caregiver/${userId}`)
    return data
  },

  async create(elderData: CreateElderDto): Promise<Elder> {
    const { data } = await apiClient.post<Elder>('/elders', elderData)
    return data
  },

  async update(id: string, elderData: UpdateElderDto): Promise<Elder> {
    const { data } = await apiClient.patch<Elder>(`/elders/${id}`, elderData)
    return data
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/elders/${id}`)
  },

  async assignCaregivers(id: string, userIds: string[]): Promise<Elder> {
    const { data } = await apiClient.post<Elder>(`/elders/${id}/caregivers`, { userIds })
    return data
  },

  async addCaregiver(elderId: string, userId: string): Promise<Elder> {
    const { data } = await apiClient.post<Elder>(`/elders/${elderId}/caregivers/${userId}`)
    return data
  },

  async removeCaregiver(elderId: string, userId: string): Promise<Elder> {
    const { data } = await apiClient.delete<Elder>(`/elders/${elderId}/caregivers/${userId}`)
    return data
  }
}