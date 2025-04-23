export interface User {
  id: string;
  email: string;
  name: string;
  role: 'receptionist' | 'doctor';
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  gender: 'male' | 'female' | 'other';
  medicalHistory?: string;
  registeredDate: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface PatientsState {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
}