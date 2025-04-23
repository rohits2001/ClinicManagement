import React, { useState } from 'react';
import { Users, UserCheck, Clock, UserPlus } from 'lucide-react';
import Layout from '../components/layout/Layout';
import PatientList from '../components/patients/PatientList';
import PatientDetail from '../components/patients/PatientDetail';
import StatCard from '../components/dashboard/StatCard';
import PatientChart from '../components/dashboard/PatientChart';
import { usePatients } from '../context/PatientsContext';
import Card from '../components/common/Card';

enum View {
  DASHBOARD,
  DETAIL
}

const DoctorDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  
  const { patients, getPatient } = usePatients();
  
  const handleView = (id: string) => {
    setSelectedPatientId(id);
    setCurrentView(View.DETAIL);
  };
  
  const handleCancel = () => {
    setCurrentView(View.DASHBOARD);
    setSelectedPatientId(null);
  };

  // Calculate stats
  const totalPatients = patients.length;
  const malePatients = patients.filter(p => p.gender === 'male').length;
  const femalePatients = patients.filter(p => p.gender === 'female').length;
  const newPatientsThisWeek = patients.filter(p => {
    const registeredDate = new Date(p.registeredDate);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return registeredDate >= weekAgo;
  }).length;

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Doctor Dashboard</h1>
      
      {currentView === View.DASHBOARD && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <StatCard 
              title="Total Patients" 
              value={totalPatients} 
              icon={<Users className="h-6 w-6" />}
            />
            <StatCard 
              title="Male Patients" 
              value={malePatients} 
              icon={<UserCheck className="h-6 w-6" />}
              change={{ value: `${Math.round(malePatients / totalPatients * 100)}%`, positive: true }}
            />
            <StatCard 
              title="Female Patients" 
              value={femalePatients} 
              icon={<UserCheck className="h-6 w-6" />}
              change={{ value: `${Math.round(femalePatients / totalPatients * 100)}%`, positive: true }}
            />
            <StatCard 
              title="New This Week" 
              value={newPatientsThisWeek} 
              icon={<UserPlus className="h-6 w-6" />}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <PatientChart />
            </div>
            <div>
              <Card>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Patient Demographics</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Gender Distribution</h3>
                    <div className="mt-2 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${Math.round(malePatients / totalPatients * 100)}%` }}
                      ></div>
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                      <span>Male: {Math.round(malePatients / totalPatients * 100)}%</span>
                      <span>Female: {Math.round(femalePatients / totalPatients * 100)}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Age Distribution</h3>
                    <div className="mt-2 grid grid-cols-5 gap-1">
                      <div className="h-16 bg-blue-100"></div>
                      <div className="h-24 bg-blue-300"></div>
                      <div className="h-32 bg-blue-500"></div>
                      <div className="h-20 bg-blue-300"></div>
                      <div className="h-10 bg-blue-100"></div>
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                      <span>0-20</span>
                      <span>21-40</span>
                      <span>41-60</span>
                      <span>61-80</span>
                      <span>80+</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          <PatientList 
            onAddNew={() => {}} // Doctors can't add patients
            onEdit={() => {}} // Doctors can't edit patients
            onView={handleView}
          />
        </>
      )}
      
      {currentView === View.DETAIL && selectedPatientId && (
        <PatientDetail 
          patient={getPatient(selectedPatientId)!} 
          onBack={handleCancel}
          onEdit={() => {}} // Doctors can't edit patients
        />
      )}
    </Layout>
  );
};

export default DoctorDashboard;