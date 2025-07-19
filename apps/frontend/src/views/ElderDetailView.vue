<template>
  <AppLayout>
    <div v-if="elder" class="px-4 sm:px-0">
      <!-- Header -->
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {{ elder.firstName }} {{ elder.lastName }}
          </h2>
          <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
            <div v-if="elder.dateOfBirth" class="mt-2 flex items-center text-sm text-gray-500">
              <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ formatDate(elder.dateOfBirth) }}
            </div>
            <div v-if="elder.phoneNumber" class="mt-2 flex items-center text-sm text-gray-500">
              <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {{ elder.phoneNumber }}
            </div>
          </div>
        </div>
        <div v-if="authStore.isAdmin" class="mt-5 flex lg:mt-0 lg:ml-4">
          <button
            @click="showEditModal = true"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit
          </button>
        </div>
      </div>

      <!-- Info Cards -->
      <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Personal Information
            </h3>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Address</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ elder.address || '-' }}
                </dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Emergency Contact</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div v-if="elder.emergencyContact">
                    {{ elder.emergencyContact }}
                    <span v-if="elder.emergencyContactPhone" class="text-gray-500">
                      ({{ elder.emergencyContactPhone }})
                    </span>
                  </div>
                  <span v-else>-</span>
                </dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Medical Notes</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ elder.medicalNotes || '-' }}
                </dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Status</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span :class="elder.isActive ? 'text-green-600' : 'text-gray-400'">
                    {{ elder.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Caregivers
            </h3>
          </div>
          <div class="border-t border-gray-200">
            <ul class="divide-y divide-gray-200">
              <li v-for="caregiver in elder.caregivers" :key="caregiver.id" class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      {{ caregiver.firstName }} {{ caregiver.lastName }}
                    </p>
                    <p class="text-sm text-gray-500">{{ caregiver.email }}</p>
                  </div>
                </div>
              </li>
            </ul>
            <div v-if="!elder.caregivers?.length" class="px-4 py-8 text-center text-gray-500">
              No caregivers assigned
            </div>
          </div>
        </div>
      </div>

      <!-- Status Updates -->
      <div class="mt-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Status Updates
            </h3>
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              @click="showCreateUpdateModal = true"
              type="button"
              class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add Update
            </button>
          </div>
        </div>

        <div class="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            <li v-for="update in updates" :key="update.id" class="px-4 py-4 sm:px-6">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center">
                    <span :class="getUpdateTypeClass(update.type)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {{ formatUpdateType(update.type) }}
                    </span>
                    <p class="ml-2 text-sm text-gray-500">
                      by {{ update.createdBy.firstName }} {{ update.createdBy.lastName }}
                    </p>
                  </div>
                  <p class="mt-2 text-sm text-gray-900">
                    {{ update.description }}
                  </p>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ formatDateTime(update.eventDate) }}
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <div v-if="updates.length === 0" class="px-4 py-8 text-center text-gray-500">
            No status updates yet
          </div>
        </div>
      </div>
    </div>

    <!-- Create Status Update Modal -->
    <CreateStatusUpdateModal
      v-if="showCreateUpdateModal"
      :elder-id="elder?.id || ''"
      @close="showCreateUpdateModal = false"
      @created="handleUpdateCreated"
    />
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import CreateStatusUpdateModal from '@/components/CreateStatusUpdateModal.vue'
import { useAuthStore } from '@/stores/auth'
import { useEldersStore } from '@/stores/elders'
import { useStatusUpdatesStore } from '@/stores/status-updates'
import type { UpdateType } from '@/types'

const route = useRoute()
const authStore = useAuthStore()
const eldersStore = useEldersStore()
const updatesStore = useStatusUpdatesStore()

const showEditModal = ref(false)
const showCreateUpdateModal = ref(false)

const elder = computed(() => eldersStore.currentElder)
const updates = computed(() => updatesStore.updates)

onMounted(async () => {
  const elderId = route.params.id as string
  await eldersStore.fetchElder(elderId)
  await updatesStore.fetchUpdatesByElder(elderId)
})

function handleUpdateCreated() {
  showCreateUpdateModal.value = false
  const elderId = route.params.id as string
  updatesStore.fetchUpdatesByElder(elderId)
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function formatDateTime(date: string): string {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

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
</script>