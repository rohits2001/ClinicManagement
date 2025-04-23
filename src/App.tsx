import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PatientsProvider } from './context/PatientsContext';
import LoginPage from './pages/LoginPage';
import ReceptionistDashboard from './pages/ReceptionistDashboard';
import DoctorDashboard from './pages/DoctorDashboard';

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  if (user?.role === 'receptionist') {
    return <ReceptionistDashboard />;
  }

  if (user?.role === 'doctor') {
    return <DoctorDashboard />;
  }

  return null;
};

function App() {
  return (
    <AuthProvider>
      <PatientsProvider>
        <AppContent />
      </PatientsProvider>
    </AuthProvider>
  );
}

export default App;