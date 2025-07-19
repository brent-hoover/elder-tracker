<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <form @submit.prevent="handleSubmit">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              Add Status Update
            </h3>
            
            <div class="space-y-4">
              <div>
                <label for="type" class="block text-sm font-medium text-gray-700">
                  Update Type *
                </label>
                <select
                  v-model="formData.type"
                  id="type"
                  required
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Select type</option>
                  <option :value="UpdateType.DOCTOR_VISIT">Doctor Visit</option>
                  <option :value="UpdateType.ACCIDENT">Accident</option>
                  <option :value="UpdateType.BEHAVIOR_CHANGE">Behavior Change</option>
                  <option :value="UpdateType.SYMPTOM_CHANGE">Symptom Change</option>
                  <option :value="UpdateType.GENERAL_OBSERVATION">General Observation</option>
                </select>
              </div>

              <div>
                <label for="eventDate" class="block text-sm font-medium text-gray-700">
                  Event Date/Time
                </label>
                <input
                  v-model="formData.eventDate"
                  type="datetime-local"
                  id="eventDate"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label for="description" class="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea
                  v-model="formData.description"
                  id="description"
                  rows="4"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Provide details about the update..."
                ></textarea>
              </div>
            </div>

            <div v-if="error" class="mt-4 text-sm text-red-600">
              {{ error }}
            </div>
          </div>

          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              :disabled="loading"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
            >
              {{ loading ? 'Creating...' : 'Create' }}
            </button>
            <button
              @click="$emit('close')"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStatusUpdatesStore } from '@/stores/status-updates'
import { UpdateType } from '@/types'
import type { CreateStatusUpdateDto } from '@/types'

const props = defineProps<{
  elderId: string
}>()

const emit = defineEmits<{
  close: []
  created: [update: any]
}>()

const updatesStore = useStatusUpdatesStore()

const formData = ref<CreateStatusUpdateDto>({
  type: UpdateType.GENERAL_OBSERVATION,
  description: '',
  eventDate: new Date().toISOString().slice(0, 16),
  elderId: props.elderId
})

const loading = ref(false)
const error = ref('')

async function handleSubmit() {
  error.value = ''
  loading.value = true

  try {
    const update = await updatesStore.createUpdate(formData.value)
    emit('created', update)
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to create status update'
  } finally {
    loading.value = false
  }
}
</script>