import React, { useState, useEffect } from 'react';
import { Patient } from '../../types';
import Card from '../common/Card';
import Input from '../common/Input';
import Select from '../common/Select';
import TextArea from '../common/TextArea';
import Button from '../common/Button';

interface PatientFormProps {
  patient?: Patient;
  onSubmit: (data: Omit<Patient, 'id' | 'registeredDate'>) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const PatientForm: React.FC<PatientFormProps> = ({
  patient,
  onSubmit,
  onCancel,
  isLoading
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    gender: 'male' as 'male' | 'female' | 'other',
    medicalHistory: '',
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
        phone: patient.phone,
        dateOfBirth: patient.dateOfBirth,
        address: patient.address,
        gender: patient.gender,
        medicalHistory: patient.medicalHistory || '',
      });
    }
  }, [patient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {patient ? 'Edit Patient' : 'Add New Patient'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            fullWidth
          />
          
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            fullWidth
          />
          
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />
          
          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            fullWidth
          />
          
          <Input
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            fullWidth
          />
          
          <Select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
            required
            fullWidth
          />
        </div>
        
        <Input
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          fullWidth
        />
        
        <TextArea
          label="Medical History"
          name="medicalHistory"
          value={formData.medicalHistory}
          onChange={handleChange}
          rows={4}
          placeholder="Enter patient's medical history..."
          fullWidth
        />
        
        <div className="flex justify-end space-x-4">
          <Button 
            variant="outline" 
            onClick={onCancel} 
            type="button"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit" 
            isLoading={isLoading}
          >
            {patient ? 'Update Patient' : 'Add Patient'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default PatientForm;