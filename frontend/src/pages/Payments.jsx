import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const emptyPayment = { amount: '', currency: 'USD', provider: 'manual' };

const Payments = () => {
  const { user } = useAuth();
  const { applicationId } = useParams();
  const [payments, setPayments] = useState([]);
  const [formData, setFormData] = useState(emptyPayment);
  const [editing, setEditing] = useState(null);

  const headers = useMemo(() => ({ Authorization: `Bearer ${user.token}` }), [user.token]);

  const load = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/api/applications/${applicationId}/payments`, { headers });
      setPayments(response.data);
    } catch (e) {
      alert('Failed to fetch payments');
    }
  }, [applicationId, headers]);

  useEffect(() => { load(); }, [load]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, amount: Number(formData.amount), application: applicationId };
      if (editing) {
        const res = await axiosInstance.put(`/api/applications/${applicationId}/payments/${editing._id}`, payload, { headers });
        setPayments(payments.map((p) => (p._id === res.data._id ? res.data : p)));
      } else {
        const res = await axiosInstance.post(`/api/applications/${applicationId}/payments`, payload, { headers });
        setPayments([res.data, ...payments]);
      }
      setEditing(null);
      setFormData(emptyPayment);
    } catch (e) {
      alert('Failed to save payment');
    }
  };

  const remove = async (id) => {
    try {
      await axiosInstance.delete(`/api/applications/${applicationId}/payments/${id}`, { headers });
      setPayments(payments.filter((p) => p._id !== id));
    } catch (e) {
      alert('Failed to delete payment');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">{editing ? 'Edit Payment' : 'Add Payment'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input className="p-2 border rounded" placeholder="Amount" type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
          <input className="p-2 border rounded" placeholder="Currency" value={formData.currency} onChange={(e) => setFormData({ ...formData, currency: e.target.value })} />
          <input className="p-2 border rounded" placeholder="Provider" value={formData.provider} onChange={(e) => setFormData({ ...formData, provider: e.target.value })} />
          <button className="bg-green-600 text-white rounded" type="submit">{editing ? 'Update' : 'Add'}</button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {payments.map((p) => (
          <div key={p._id} className="bg-gray-50 p-4 rounded shadow">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{p.amount} {p.currency}</div>
              <span className={`px-2 py-1 text-xs rounded ${p.status === 'succeeded' ? 'bg-green-100 text-green-700' : p.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span>
            </div>
            <div className="text-sm text-gray-600">Provider: {p.provider}</div>
            <div className="mt-3 text-right">
              <button onClick={() => setEditing(p) || setFormData({ amount: p.amount, currency: p.currency, provider: p.provider })} className="mr-2 bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => remove(p._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;


