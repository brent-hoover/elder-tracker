<template>
  <AppLayout>
    <div class="px-4 sm:px-0">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-2xl font-semibold text-gray-900">Elders</h1>
          <p class="mt-2 text-sm text-gray-700">
            A list of all elders in the system including their contact information and medical notes.
          </p>
        </div>
        <div v-if="authStore.isAdmin" class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            @click="showCreateModal = true"
            type="button"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Elder
          </button>
        </div>
      </div>

      <!-- Elders List -->
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Phone
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Emergency Contact
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="elder in eldersStore.elders" :key="elder.id">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {{ elder.firstName }} {{ elder.lastName }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ elder.phoneNumber || '-' }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div v-if="elder.emergencyContact">
                        {{ elder.emergencyContact }}
                        <span v-if="elder.emergencyContactPhone" class="text-gray-400">
                          ({{ elder.emergencyContactPhone }})
                        </span>
                      </div>
                      <span v-else>-</span>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span :class="elder.isActive ? 'text-green-600' : 'text-gray-400'">
                        {{ elder.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <RouterLink
                        :to="`/elders/${elder.id}`"
                        class="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </RouterLink>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="eldersStore.elders.length === 0" class="text-center py-12">
                <p class="text-sm text-gray-500">No elders found</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Elder Modal -->
    <CreateElderModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @created="handleElderCreated"
    />
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import CreateElderModal from '@/components/CreateElderModal.vue'
import { useAuthStore } from '@/stores/auth'
import { useEldersStore } from '@/stores/elders'

const authStore = useAuthStore()
const eldersStore = useEldersStore()

const showCreateModal = ref(false)

onMounted(async () => {
  await eldersStore.fetchElders()
})

function handleElderCreated() {
  showCreateModal.value = false
  eldersStore.fetchElders()
}
</script>