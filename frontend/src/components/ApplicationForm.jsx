import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const emptyForm = { fullName: '', passportNumber: '', visaType: '' };

const ApplicationForm = ({ applications, setApplications, editingApplication, setEditingApplication }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editingApplication) {
      setFormData({
        fullName: editingApplication.fullName || '',
        passportNumber: editingApplication.passportNumber || '',
        visaType: editingApplication.visaType || '',
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingApplication]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingApplication) {
        const response = await axiosInstance.put(`/api/applications/${editingApplication._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setApplications(applications.map((a) => (a._id === response.data._id ? response.data : a)));
      } else {
        const response = await axiosInstance.post('/api/applications', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setApplications([response.data, ...applications]);
      }
      setEditingApplication(null);
      setFormData(emptyForm);
    } catch (error) {
      alert('Failed to save application.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingApplication ? 'Edit Application' : 'Create Application'}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Passport Number"
          value={formData.passportNumber}
          onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Visa Type (e.g., Tourist, Student)"
          value={formData.visaType}
          onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="mt-4 w-full bg-blue-600 text-white p-2 rounded">
        {editingApplication ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default ApplicationForm;


