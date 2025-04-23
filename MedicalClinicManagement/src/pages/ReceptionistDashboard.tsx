import React, { useState } from 'react';
import { Users, UserCheck, Clock, UserPlus } from 'lucide-react';
import Layout from '../components/layout/Layout';
import PatientList from '../components/patients/PatientList';
import PatientForm from '../components/patients/PatientForm';
import PatientDetail from '../components/patients/PatientDetail';
import StatCard from '../components/dashboard/StatCard';
import { usePatients } from '../context/PatientsContext';
import { Patient } from '../types';

enum View {
  LIST,
  ADD,
  EDIT,
  DETAIL
}

const ReceptionistDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LIST);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  
  const { patients, addPatient, updatePatient, getPatient, isLoading } = usePatients();
  
  const handleAddSubmit = async (data: Omit<Patient, 'id' | 'registeredDate'>) => {
    await addPatient(data);
    setCurrentView(View.LIST);
    setSelectedPatientId(null);
  };
  
  const handleEditSubmit = async (data: Omit<Patient, 'id' | 'registeredDate'>) => {
    if (selectedPatientId) {
      await updatePatient(selectedPatientId, data);
      setCurrentView(View.LIST);
      setSelectedPatientId(null);
    }
  };
  
  const handleEdit = (id: string) => {
    setSelectedPatientId(id);
    setCurrentView(View.EDIT);
  };
  
  const handleView = (id: string) => {
    setSelectedPatientId(id);
    setCurrentView(View.DETAIL);
  };
  
  const handleCancel = () => {
    setCurrentView(View.LIST);
    setSelectedPatientId(null);
  };

  // Calculate stats
  const totalPatients = patients.length;
  const newPatientsThisWeek = patients.filter(p => {
    const registeredDate = new Date(p.registeredDate);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return registeredDate >= weekAgo;
  }).length;

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Receptionist Dashboard</h1>
      
      {currentView === View.LIST && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard 
              title="Total Patients" 
              value={totalPatients} 
              icon={<Users className="h-6 w-6" />}
            />
            <StatCard 
              title="New This Week" 
              value={newPatientsThisWeek} 
              icon={<UserPlus className="h-6 w-6" />}
              change={{ value: `${Math.round(newPatientsThisWeek / totalPatients * 100)}%`, positive: true }}
            />
            <StatCard 
              title="Last Registration" 
              value={patients.length > 0 ? new Date(patients[patients.length - 1].registeredDate).toLocaleDateString() : 'None'} 
              icon={<Clock className="h-6 w-6" />}
            />
          </div>
          
          <PatientList 
            onAddNew={() => setCurrentView(View.ADD)} 
            onEdit={handleEdit}
            onView={handleView}
          />
        </>
      )}
      
      {currentView === View.ADD && (
        <PatientForm 
          onSubmit={handleAddSubmit} 
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      )}
      
      {currentView === View.EDIT && selectedPatientId && (
        <PatientForm 
          patient={getPatient(selectedPatientId)} 
          onSubmit={handleEditSubmit} 
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      )}
      
      {currentView === View.DETAIL && selectedPatientId && (
        <PatientDetail 
          patient={getPatient(selectedPatientId)!} 
          onBack={handleCancel}
          onEdit={() => handleEdit(selectedPatientId)}
        />
      )}
    </Layout>
  );
};

export default ReceptionistDashboard;