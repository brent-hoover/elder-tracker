import apiClient from './client'
import type { StatusUpdate, CreateStatusUpdateDto, FilterStatusUpdateDto } from '@/types'

export const statusUpdatesApi = {
  async getAll(filters?: FilterStatusUpdateDto): Promise<StatusUpdate[]> {
    const { data } = await apiClient.get<StatusUpdate[]>('/status-updates', { params: filters })
    return data
  },

  async getById(id: string): Promise<StatusUpdate> {
    const { data } = await apiClient.get<StatusUpdate>(`/status-updates/${id}`)
    return data
  },

  async getByElder(elderId: string): Promise<StatusUpdate[]> {
    const { data } = await apiClient.get<StatusUpdate[]>(`/status-updates/elder/${elderId}`)
    return data
  },

  async create(updateData: CreateStatusUpdateDto): Promise<StatusUpdate> {
    const { data } = await apiClient.post<StatusUpdate>('/status-updates', updateData)
    return data
  },

  async update(id: string, updateData: Partial<CreateStatusUpdateDto>): Promise<StatusUpdate> {
    const { data } = await apiClient.patch<StatusUpdate>(`/status-updates/${id}`, updateData)
    return data
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/status-updates/${id}`)
  }
}