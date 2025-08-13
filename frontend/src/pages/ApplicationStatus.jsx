import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const statuses = ['draft', 'submitted', 'under_review', 'approved', 'rejected'];

const ApplicationStatus = () => {
  const { user } = useAuth();
  const { applicationId } = useParams();
  const [application, setApplication] = useState(null);
  const [status, setStatus] = useState('draft');
  const [notes, setNotes] = useState('');

  const headers = useMemo(() => ({ Authorization: `Bearer ${user.token}` }), [user.token]);

  const load = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/api/applications/${applicationId}`, { headers });
      setApplication(response.data);
      setStatus(response.data.status);
      setNotes(response.data.notes || '');
    } catch (e) {
      alert('Failed to load application');
    }
  }, [applicationId, headers]);

  useEffect(() => { load(); }, [load]);

  const update = async () => {
    try {
      const response = await axiosInstance.patch(`/api/applications/${applicationId}/status`, { status, notes }, { headers });
      setApplication(response.data);
    } catch (e) {
      alert('Failed to update status');
    }
  };

  if (!application) return <div className="container mx-auto p-6">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 rounded shadow">
        <div className="text-xl font-semibold mb-4">{application.fullName}</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-xs uppercase text-gray-500">Passport</div>
            <div>{application.passportNumber}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-gray-500">Visa Type</div>
            <div>{application.visaType}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-gray-500">Current Status</div>
            <div className="font-semibold">{application.status}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Update Status</label>
            <select className="w-full p-2 border rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea className="w-full p-2 border rounded" rows="3" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
        </div>
        <button onClick={update} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">Save</button>
      </div>
    </div>
  );
};

export default ApplicationStatus;


