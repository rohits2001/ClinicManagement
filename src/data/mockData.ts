import { Patient, User } from '../types';

// Mock users
export const users: User[] = [
  {
    id: '1',
    email: 'receptionist@clinic.com',
    name: 'Alex Johnson',
    role: 'receptionist',
  },
  {
    id: '2',
    email: 'doctor@clinic.com',
    name: 'Dr. Sarah Smith',
    role: 'doctor',
  },
];

// Mock patients data
export const patients: Patient[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1985-04-12',
    address: '123 Main St, Anytown, CA 94568',
    gender: 'male',
    medicalHistory: 'Hypertension, Allergies to penicillin',
    registeredDate: '2023-01-15',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    dateOfBirth: '1990-08-22',
    address: '456 Oak Ave, Somewhere, NY 10001',
    gender: 'female',
    medicalHistory: 'Asthma',
    registeredDate: '2023-02-03',
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Johnson',
    email: 'emily.j@example.com',
    phone: '(555) 234-5678',
    dateOfBirth: '1978-11-30',
    address: '789 Pine Rd, Elsewhere, TX 75001',
    gender: 'female',
    medicalHistory: 'Diabetes type 2',
    registeredDate: '2023-03-10',
  },
  {
    id: '4',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.b@example.com',
    phone: '(555) 345-6789',
    dateOfBirth: '1965-07-17',
    address: '101 Maple Dr, Nowhere, FL 33101',
    gender: 'male',
    medicalHistory: 'Heart disease, High cholesterol',
    registeredDate: '2023-03-15',
  },
  {
    id: '5',
    firstName: 'Amanda',
    lastName: 'Garcia',
    email: 'amanda.g@example.com',
    phone: '(555) 456-7890',
    dateOfBirth: '1995-02-28',
    address: '202 Cedar Ln, Anywhere, WA 98001',
    gender: 'female',
    registeredDate: '2023-04-05',
  },
  {
    id: '6',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.w@example.com',
    phone: '(555) 567-8901',
    dateOfBirth: '1983-09-05',
    address: '303 Birch St, Someplace, IL 60601',
    gender: 'male',
    medicalHistory: 'Migraines',
    registeredDate: '2023-04-20',
  },
  {
    id: '7',
    firstName: 'Maria',
    lastName: 'Martinez',
    email: 'maria.m@example.com',
    phone: '(555) 678-9012',
    dateOfBirth: '1972-12-10',
    address: '404 Walnut Ave, Othertown, GA 30301',
    gender: 'female',
    registeredDate: '2023-05-12',
  },
  {
    id: '8',
    firstName: 'Robert',
    lastName: 'Taylor',
    email: 'robert.t@example.com',
    phone: '(555) 789-0123',
    dateOfBirth: '1998-06-15',
    address: '505 Spruce Rd, Newplace, AZ 85001',
    gender: 'male',
    medicalHistory: 'Anxiety, Depression',
    registeredDate: '2023-06-01',
  },
];

// Get patient registration data by day for the chart
export const getPatientRegistrationData = () => {
  const today = new Date();
  const data = [];
  
  // Generate data for the last 30 days
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    const formattedDate = date.toISOString().split('T')[0];
    const count = Math.floor(Math.random() * 5); // Random number of registrations (0-4)
    
    data.push({
      date: formattedDate,
      count,
    });
  }
  
  return data;
};