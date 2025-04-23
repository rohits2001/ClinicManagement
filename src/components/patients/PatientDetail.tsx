import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { Patient } from '../../types';

interface PatientDetailProps {
  patient: Patient;
  onBack: () => void;
  onEdit: () => void;
}

const PatientDetail: React.FC<PatientDetailProps> = ({ patient, onBack, onEdit }) => {
  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Patient Details</h2>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={onBack}>
            Back to List
          </Button>
          <Button variant="primary" onClick={onEdit}>
            Edit Patient
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Full Name</p>
              <p className="mt-1 text-sm text-gray-900">{patient.firstName} {patient.lastName}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Date of Birth</p>
              <p className="mt-1 text-sm text-gray-900">{patient.dateOfBirth}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Gender</p>
              <p className="mt-1 text-sm text-gray-900">
                {patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)}
              </p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Registration Date</p>
              <p className="mt-1 text-sm text-gray-900">{patient.registeredDate}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="mt-1 text-sm text-gray-900">{patient.email}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="mt-1 text-sm text-gray-900">{patient.phone}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="mt-1 text-sm text-gray-900">{patient.address}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Medical History</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-900">
            {patient.medicalHistory || "No medical history recorded."}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PatientDetail;