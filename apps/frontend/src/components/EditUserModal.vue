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
                  Edit User
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

                    <div class="col-span-6">
                      <label for="email" class="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        v-model="form.email"
                        type="email"
                        name="email"
                        id="email"
                        required
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6">
                      <label for="password" class="block text-sm font-medium text-gray-700">
                        New Password (leave blank to keep current)
                      </label>
                      <input
                        v-model="form.password"
                        type="password"
                        name="password"
                        id="password"
                        minlength="6"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
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

                    <div class="col-span-6">
                      <div class="flex items-center">
                        <input
                          v-model="form.isAdmin"
                          id="isAdmin"
                          name="isAdmin"
                          type="checkbox"
                          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label for="isAdmin" class="ml-2 block text-sm text-gray-900">
                          Administrator
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
import { ref, reactive } from 'vue'
import { useUsersStore } from '@/stores/users'
import type { User } from '@/types'

const props = defineProps<{
  user: User
}>()

const emit = defineEmits<{
  close: []
  updated: []
}>()

const usersStore = useUsersStore()

const isSubmitting = ref(false)

const form = reactive({
  firstName: props.user.firstName,
  lastName: props.user.lastName,
  email: props.user.email,
  password: '',
  isActive: props.user.isActive,
  isAdmin: props.user.isAdmin
})

async function handleSubmit() {
  isSubmitting.value = true
  try {
    const updateData: any = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      isActive: form.isActive,
      isAdmin: form.isAdmin
    }

    if (form.password) {
      updateData.password = form.password
    }

    await usersStore.updateUser(props.user.id, updateData)
    emit('updated')
    emit('close')
  } catch (error: any) {
    alert(error.response?.data?.message || 'Failed to update user')
  } finally {
    isSubmitting.value = false
  }
}
</script>