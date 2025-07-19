import { defineStore } from 'pinia'
import { ref } from 'vue'
import { eldersApi } from '@/api/elders'
import type { Elder, CreateElderDto } from '@/types'

export const useEldersStore = defineStore('elders', () => {
  const elders = ref<Elder[]>([])
  const currentElder = ref<Elder | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchElders() {
    loading.value = true
    error.value = null
    try {
      elders.value = await eldersApi.getAll()
    } catch (err) {
      error.value = 'Failed to fetch elders'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchElder(id: string) {
    loading.value = true
    error.value = null
    try {
      currentElder.value = await eldersApi.getById(id)
      return currentElder.value
    } catch (err) {
      error.value = 'Failed to fetch elder'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createElder(elderData: CreateElderDto) {
    loading.value = true
    error.value = null
    try {
      const newElder = await eldersApi.create(elderData)
      elders.value.push(newElder)
      return newElder
    } catch (err) {
      error.value = 'Failed to create elder'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateElder(id: string, elderData: Partial<CreateElderDto>) {
    loading.value = true
    error.value = null
    try {
      const updatedElder = await eldersApi.update(id, elderData)
      const index = elders.value.findIndex(e => e.id === id)
      if (index !== -1) {
        elders.value[index] = updatedElder
      }
      if (currentElder.value?.id === id) {
        currentElder.value = updatedElder
      }
      return updatedElder
    } catch (err) {
      error.value = 'Failed to update elder'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteElder(id: string) {
    loading.value = true
    error.value = null
    try {
      await eldersApi.delete(id)
      elders.value = elders.value.filter(e => e.id !== id)
      if (currentElder.value?.id === id) {
        currentElder.value = null
      }
    } catch (err) {
      error.value = 'Failed to delete elder'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    elders,
    currentElder,
    loading,
    error,
    fetchElders,
    fetchElder,
    createElder,
    updateElder,
    deleteElder
  }
})