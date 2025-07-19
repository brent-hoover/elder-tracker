<template>
  <AppLayout>
    <div class="px-4 sm:px-0">
      <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Stats cards -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Elders</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.totalElders }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Recent Updates</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.recentUpdates }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div v-if="authStore.isAdmin" class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Caregivers</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.totalUsers }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Updates -->
      <div class="mt-8">
        <h2 class="text-lg font-medium text-gray-900">Recent Status Updates</h2>
        <div class="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            <li v-for="update in recentUpdates" :key="update.id" class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <span :class="getUpdateTypeClass(update.type)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {{ formatUpdateType(update.type) }}
                    </span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ update.elder.firstName }} {{ update.elder.lastName }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ update.description }}
                    </div>
                  </div>
                </div>
                <div class="text-sm text-gray-500">
                  {{ formatDate(update.eventDate) }}
                </div>
              </div>
            </li>
          </ul>
          <div v-if="recentUpdates.length === 0" class="px-4 py-8 text-center text-gray-500">
            No recent updates
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppLayout from '@/components/AppLayout.vue'
import { useAuthStore } from '@/stores/auth'
import { useEldersStore } from '@/stores/elders'
import { useStatusUpdatesStore } from '@/stores/status-updates'
import type { StatusUpdate, UpdateType } from '@/types'

const authStore = useAuthStore()
const eldersStore = useEldersStore()
const updatesStore = useStatusUpdatesStore()

const stats = ref({
  totalElders: 0,
  recentUpdates: 0,
  totalUsers: 0
})

const recentUpdates = ref<StatusUpdate[]>([])

onMounted(async () => {
  // Fetch elders
  await eldersStore.fetchElders()
  stats.value.totalElders = eldersStore.elders.length

  // Fetch recent updates
  await updatesStore.fetchUpdates()
  recentUpdates.value = updatesStore.updates.slice(0, 5)
  stats.value.recentUpdates = updatesStore.updates.filter(u => {
    const updateDate = new Date(u.createdAt)
    const dayAgo = new Date()
    dayAgo.setDate(dayAgo.getDate() - 1)
    return updateDate > dayAgo
  }).length
})

function formatUpdateType(type: UpdateType): string {
  return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function getUpdateTypeClass(type: UpdateType): string {
  const classes = {
    [UpdateType.DOCTOR_VISIT]: 'bg-blue-100 text-blue-800',
    [UpdateType.ACCIDENT]: 'bg-red-100 text-red-800',
    [UpdateType.BEHAVIOR_CHANGE]: 'bg-yellow-100 text-yellow-800',
    [UpdateType.SYMPTOM_CHANGE]: 'bg-purple-100 text-purple-800',
    [UpdateType.GENERAL_OBSERVATION]: 'bg-gray-100 text-gray-800'
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>