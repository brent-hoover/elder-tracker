<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <form @submit.prevent="handleSubmit">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Edit Elder
                </h3>
                <div class="mt-4 space-y-4">
                  <div class="grid grid-cols-6 gap-4">
                    <div class="col-span-6 sm:col-span-3">
                      <label for="firstName" class="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        v-model="form.firstName"
                        type="text"
                        name="firstName"
                        id="firstName"
                        required
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="lastName" class="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        v-model="form.lastName"
                        type="text"
                        name="lastName"
                        id="lastName"
                        required
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="dateOfBirth" class="block text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <input
                        v-model="form.dateOfBirth"
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        required
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="phoneNumber" class="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        v-model="form.phoneNumber"
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6">
                      <label for="address" class="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <input
                        v-model="form.address"
                        type="text"
                        name="address"
                        id="address"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="emergencyContact" class="block text-sm font-medium text-gray-700">
                        Emergency Contact
                      </label>
                      <input
                        v-model="form.emergencyContact"
                        type="text"
                        name="emergencyContact"
                        id="emergencyContact"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="emergencyContactPhone" class="block text-sm font-medium text-gray-700">
                        Emergency Contact Phone
                      </label>
                      <input
                        v-model="form.emergencyContactPhone"
                        type="tel"
                        name="emergencyContactPhone"
                        id="emergencyContactPhone"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6">
                      <label for="medicalNotes" class="block text-sm font-medium text-gray-700">
                        Medical Notes
                      </label>
                      <textarea
                        v-model="form.medicalNotes"
                        name="medicalNotes"
                        id="medicalNotes"
                        rows="3"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6">
                      <label for="caregivers" class="block text-sm font-medium text-gray-700">
                        Assigned Caregivers
                      </label>
                      <select
                        v-model="form.caregiverIds"
                        multiple
                        name="caregivers"
                        id="caregivers"
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        size="5"
                      >
                        <option v-for="user in availableUsers" :key="user.id" :value="user.id">
                          {{ user.firstName }} {{ user.lastName }} ({{ user.email }})
                        </option>
                      </select>
                      <p class="mt-1 text-sm text-gray-500">
                        Hold Ctrl/Cmd to select multiple caregivers. Selected: {{ form.caregiverIds.length }}
                      </p>
                      <div v-if="availableUsers.length === 0" class="mt-1 text-sm text-red-500">
                        No users available. Create users first.
                      </div>
                    </div>

                    <div class="col-span-6">
                      <div class="flex items-center">
                        <input
                          v-model="form.isActive"
                          id="isActive"
                          name="isActive"
                          type="checkbox"
                          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label for="isActive" class="ml-2 block text-sm text-gray-900">
                          Active
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
            >
              {{ isSubmitting ? 'Saving...' : 'Save' }}
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
import { ref, reactive, onMounted } from 'vue'
import { useEldersStore } from '@/stores/elders'
import { useUsersStore } from '@/stores/users'
import type { Elder } from '@/types'

const props = defineProps<{
  elder: Elder
}>()

const emit = defineEmits<{
  close: []
  updated: []
}>()

const eldersStore = useEldersStore()
const usersStore = useUsersStore()

const isSubmitting = ref(false)
const availableUsers = ref<any[]>([])

const form = reactive({
  firstName: props.elder.firstName,
  lastName: props.elder.lastName,
  dateOfBirth: props.elder.dateOfBirth ? props.elder.dateOfBirth.split('T')[0] : '',
  phoneNumber: props.elder.phoneNumber || '',
  address: props.elder.address || '',
  emergencyContact: props.elder.emergencyContact || '',
  emergencyContactPhone: props.elder.emergencyContactPhone || '',
  medicalNotes: props.elder.medicalNotes || '',
  isActive: props.elder.isActive,
  caregiverIds: props.elder.caregivers?.map(c => c.id) || []
})

onMounted(async () => {
  await usersStore.fetchUsers()
  availableUsers.value = usersStore.users
})

async function handleSubmit() {
  isSubmitting.value = true
  try {
    await eldersStore.updateElder(props.elder.id, {
      firstName: form.firstName,
      lastName: form.lastName,
      dateOfBirth: form.dateOfBirth,
      phoneNumber: form.phoneNumber || undefined,
      address: form.address || undefined,
      emergencyContact: form.emergencyContact || undefined,
      emergencyContactPhone: form.emergencyContactPhone || undefined,
      medicalNotes: form.medicalNotes || undefined,
      isActive: form.isActive
    })

    // Update caregivers
    await eldersStore.assignCaregivers(props.elder.id, form.caregiverIds)
    
    emit('updated')
    emit('close')
  } catch (error: any) {
    console.error('Failed to update elder:', error)
    alert(error.response?.data?.message || 'Failed to update elder. Check console for details.')
  } finally {
    isSubmitting.value = false
  }
}
</script>