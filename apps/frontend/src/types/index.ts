export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  isActive: boolean
  isAdmin: boolean
  createdAt: string
  updatedAt: string
}

export interface Elder {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string | null
  address: string | null
  phoneNumber: string | null
  emergencyContact: string | null
  emergencyContactPhone: string | null
  medicalNotes: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  caregivers?: User[]
}

export enum UpdateType {
  DOCTOR_VISIT = 'doctor_visit',
  ACCIDENT = 'accident',
  BEHAVIOR_CHANGE = 'behavior_change',
  SYMPTOM_CHANGE = 'symptom_change',
  GENERAL_OBSERVATION = 'general_observation'
}

export interface StatusUpdate {
  id: string
  type: UpdateType
  description: string
  eventDate: string
  createdBy: User
  elder: Elder
  createdAt: string
  updatedAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface AuthResponse {
  access_token: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    isAdmin: boolean
  }
}

export interface CreateElderDto {
  firstName: string
  lastName: string
  dateOfBirth?: string
  address?: string
  phoneNumber?: string
  emergencyContact?: string
  emergencyContactPhone?: string
  medicalNotes?: string
}

export interface UpdateElderDto extends Partial<CreateElderDto> {
  isActive?: boolean
}

export interface CreateStatusUpdateDto {
  type: UpdateType
  description: string
  eventDate?: string
  elderId: string
}

export interface FilterStatusUpdateDto {
  elderId?: string
  userId?: string
  type?: UpdateType
  startDate?: string
  endDate?: string
}