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
              Add New Elder
            </h3>
            
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700">
                    First Name *
                  </label>
                  <input
                    v-model="formData.firstName"
                    type="text"
                    id="firstName"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700">
                    Last Name *
                  </label>
                  <input
                    v-model="formData.lastName"
                    type="text"
                    id="lastName"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label for="dateOfBirth" class="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  v-model="formData.dateOfBirth"
                  type="date"
                  id="dateOfBirth"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label for="address" class="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  v-model="formData.address"
                  type="text"
                  id="address"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label for="phoneNumber" class="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  v-model="formData.phoneNumber"
                  type="tel"
                  id="phoneNumber"
                  placeholder="+1234567890"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label for="emergencyContact" class="block text-sm font-medium text-gray-700">
                  Emergency Contact
                </label>
                <input
                  v-model="formData.emergencyContact"
                  type="text"
                  id="emergencyContact"
                  placeholder="John Doe (Son)"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label for="emergencyContactPhone" class="block text-sm font-medium text-gray-700">
                  Emergency Contact Phone
                </label>
                <input
                  v-model="formData.emergencyContactPhone"
                  type="tel"
                  id="emergencyContactPhone"
                  placeholder="+1234567890"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label for="medicalNotes" class="block text-sm font-medium text-gray-700">
                  Medical Notes
                </label>
                <textarea
                  v-model="formData.medicalNotes"
                  id="medicalNotes"
                  rows="3"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>

              <div>
                <label for="caregivers" class="block text-sm font-medium text-gray-700">
                  Assign Caregivers
                </label>
                <select
                  v-model="selectedCaregivers"
                  multiple
                  id="caregivers"
                  size="5"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option v-for="user in availableUsers" :key="user.id" :value="user.id">
                    {{ user.firstName }} {{ user.lastName }} ({{ user.email }})
                  </option>
                </select>
                <p class="mt-1 text-sm text-gray-500">
                  Hold Ctrl/Cmd to select multiple caregivers
                </p>
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
import { ref, onMounted } from 'vue'
import { useEldersStore } from '@/stores/elders'
import { useUsersStore } from '@/stores/users'
import type { CreateElderDto, User } from '@/types'

const emit = defineEmits<{
  close: []
  created: [elder: any]
}>()

const eldersStore = useEldersStore()
const usersStore = useUsersStore()

const formData = ref<CreateElderDto>({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  address: '',
  phoneNumber: '',
  emergencyContact: '',
  emergencyContactPhone: '',
  medicalNotes: ''
})

const selectedCaregivers = ref<string[]>([])
const availableUsers = ref<User[]>([])
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  try {
    await usersStore.fetchUsers()
    availableUsers.value = usersStore.users
  } catch (err) {
    console.error('Failed to load users:', err)
  }
})

async function handleSubmit() {
  error.value = ''
  loading.value = true

  try {
    const elder = await eldersStore.createElder(formData.value)
    
    // Assign caregivers if any were selected
    if (selectedCaregivers.value.length > 0) {
      await eldersStore.assignCaregivers(elder.id, selectedCaregivers.value)
    }
    
    emit('created', elder)
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to create elder'
  } finally {
    loading.value = false
  }
}
</script>