import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import ApplicationForm from '../components/ApplicationForm';
import ApplicationList from '../components/ApplicationList';

const Applications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [editingApplication, setEditingApplication] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axiosInstance.get('/api/applications', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setApplications(response.data);
      } catch (error) {
        alert('Failed to fetch applications.');
      }
    };
    fetchApplications();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/applications/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setApplications(applications.filter((a) => a._id !== id));
    } catch (error) {
      alert('Failed to delete application.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <ApplicationForm
        applications={applications}
        setApplications={setApplications}
        editingApplication={editingApplication}
        setEditingApplication={setEditingApplication}
      />
      <ApplicationList
        applications={applications}
        setEditingApplication={setEditingApplication}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Applications;


