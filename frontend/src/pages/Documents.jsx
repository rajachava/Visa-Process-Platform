import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const emptyDoc = { name: '', url: '' };

const Documents = () => {
  const { user } = useAuth();
  const { applicationId } = useParams();
  const [documents, setDocuments] = useState([]);
  const [formData, setFormData] = useState(emptyDoc);
  const [editing, setEditing] = useState(null);

  const headers = useMemo(() => ({ Authorization: `Bearer ${user.token}` }), [user.token]);

  const load = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/api/applications/${applicationId}/documents`, { headers });
      setDocuments(response.data);
    } catch (e) {
      alert('Failed to fetch documents');
    }
  }, [applicationId, headers]);

  useEffect(() => { load(); }, [load]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const res = await axiosInstance.put(`/api/applications/${applicationId}/documents/${editing._id}`, formData, { headers });
        setDocuments(documents.map((d) => (d._id === res.data._id ? res.data : d)));
      } else {
        const res = await axiosInstance.post(`/api/applications/${applicationId}/documents`, { ...formData, application: applicationId }, { headers });
        setDocuments([res.data, ...documents]);
      }
      setEditing(null);
      setFormData(emptyDoc);
    } catch (e) {
      alert('Failed to save document');
    }
  };

  const remove = async (id) => {
    try {
      await axiosInstance.delete(`/api/applications/${applicationId}/documents/${id}`, { headers });
      setDocuments(documents.filter((d) => d._id !== id));
    } catch (e) {
      alert('Failed to delete document');
    }
  };

  const verify = async (doc, verified) => {
    try {
      const res = await axiosInstance.patch(`/api/applications/${applicationId}/documents/${doc._id}/verify`, { verified }, { headers });
      setDocuments(documents.map((d) => (d._id === res.data._id ? res.data : d)));
    } catch (e) {
      alert('Failed to verify document');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">{editing ? 'Edit Document' : 'Add Document'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input className="p-2 border rounded" placeholder="Document Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input className="p-2 border rounded" placeholder="URL" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
          <button className="bg-blue-600 text-white rounded" type="submit">{editing ? 'Update' : 'Add'}</button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <div key={doc._id} className="bg-gray-50 p-4 rounded shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{doc.name}</div>
                <a className="text-blue-600 text-sm" href={doc.url} target="_blank" rel="noreferrer">View</a>
              </div>
              <span className={`px-2 py-1 text-xs rounded ${doc.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {doc.verified ? 'Verified' : 'Pending'}
              </span>
            </div>
            <div className="mt-3 text-right">
              <button onClick={() => setEditing(doc) || setFormData({ name: doc.name, url: doc.url })} className="mr-2 bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => remove(doc._id)} className="mr-2 bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              <button onClick={() => verify(doc, !doc.verified)} className="bg-indigo-600 text-white px-3 py-1 rounded">{doc.verified ? 'Unverify' : 'Verify'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;


