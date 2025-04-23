import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Patient, PatientsState } from '../types';
import { patients as mockPatients } from '../data/mockData';

interface PatientsContextType extends PatientsState {
  getPatients: () => Promise<void>;
  addPatient: (patient: Omit<Patient, 'id' | 'registeredDate'>) => Promise<void>;
  updatePatient: (id: string, patient: Partial<Patient>) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
  getPatient: (id: string) => Patient | undefined;
}

const PatientsContext = createContext<PatientsContextType | undefined>(undefined);

export const PatientsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PatientsState>({
    patients: mockPatients,
    isLoading: false,
    error: null,
  });

  const getPatients = async () => {
    setState({ ...state, isLoading: true });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Already have the data from mock
      setState({
        ...state,
        isLoading: false,
      });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: 'Failed to fetch patients',
      });
    }
  };

  const getPatient = (id: string) => {
    return state.patients.find(patient => patient.id === id);
  };

  const addPatient = async (patientData: Omit<Patient, 'id' | 'registeredDate'>) => {
    setState({ ...state, isLoading: true });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newPatient: Patient = {
        ...patientData,
        id: String(Date.now()), // Generate unique ID
        registeredDate: new Date().toISOString().split('T')[0], // Today's date
      };
      
      setState({
        patients: [...state.patients, newPatient],
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: 'Failed to add patient',
      });
    }
  };

  const updatePatient = async (id: string, patientData: Partial<Patient>) => {
    setState({ ...state, isLoading: true });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedPatients = state.patients.map(patient => 
        patient.id === id ? { ...patient, ...patientData } : patient
      );
      
      setState({
        patients: updatedPatients,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: 'Failed to update patient',
      });
    }
  };

  const deletePatient = async (id: string) => {
    setState({ ...state, isLoading: true });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedPatients = state.patients.filter(patient => patient.id !== id);
      
      setState({
        patients: updatedPatients,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: 'Failed to delete patient',
      });
    }
  };

  return (
    <PatientsContext.Provider 
      value={{ 
        ...state, 
        getPatients, 
        addPatient, 
        updatePatient, 
        deletePatient,
        getPatient
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

export const usePatients = (): PatientsContextType => {
  const context = useContext(PatientsContext);
  if (context === undefined) {
    throw new Error('usePatients must be used within a PatientsProvider');
  }
  return context;
};