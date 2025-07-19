import { defineStore } from 'pinia'
import { ref } from 'vue'
import { statusUpdatesApi } from '@/api/status-updates'
import type { StatusUpdate, CreateStatusUpdateDto, FilterStatusUpdateDto } from '@/types'

export const useStatusUpdatesStore = defineStore('statusUpdates', () => {
  const updates = ref<StatusUpdate[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchUpdates(filters?: FilterStatusUpdateDto) {
    loading.value = true
    error.value = null
    try {
      updates.value = await statusUpdatesApi.getAll(filters)
    } catch (err) {
      error.value = 'Failed to fetch status updates'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchUpdatesByElder(elderId: string) {
    loading.value = true
    error.value = null
    try {
      updates.value = await statusUpdatesApi.getByElder(elderId)
    } catch (err) {
      error.value = 'Failed to fetch status updates'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createUpdate(updateData: CreateStatusUpdateDto) {
    loading.value = true
    error.value = null
    try {
      const newUpdate = await statusUpdatesApi.create(updateData)
      updates.value.unshift(newUpdate) // Add to beginning for newest first
      return newUpdate
    } catch (err) {
      error.value = 'Failed to create status update'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteUpdate(id: string) {
    loading.value = true
    error.value = null
    try {
      await statusUpdatesApi.delete(id)
      updates.value = updates.value.filter(u => u.id !== id)
    } catch (err) {
      error.value = 'Failed to delete status update'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    updates,
    loading,
    error,
    fetchUpdates,
    fetchUpdatesByElder,
    createUpdate,
    deleteUpdate
  }
})