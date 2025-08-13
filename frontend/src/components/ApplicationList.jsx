import { Link } from 'react-router-dom';

const labelClass = 'text-xs uppercase tracking-wide text-gray-500';

const ApplicationList = ({ applications, setEditingApplication, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {applications.map((app) => (
        <div key={app._id} className="bg-gray-50 p-4 rounded shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">{app.fullName}</div>
              <div className="text-sm text-gray-600">{app.passportNumber} • {app.visaType}</div>
            </div>
            <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">{app.status}</span>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
            <div>
              <div className={labelClass}>Submitted</div>
              <div>{new Date(app.createdAt).toLocaleDateString()}</div>
            </div>
            <div>
              <div className={labelClass}>Updated</div>
              <div>{new Date(app.updatedAt).toLocaleDateString()}</div>
            </div>
            <div className="text-right">
              <button onClick={() => setEditingApplication(app)} className="mr-2 bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => onDelete(app._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <Link className="bg-indigo-600 text-white px-3 py-1 rounded" to={`/applications/${app._id}/documents`}>Documents</Link>
            <Link className="bg-green-600 text-white px-3 py-1 rounded" to={`/applications/${app._id}/payments`}>Payments</Link>
            <Link className="bg-slate-700 text-white px-3 py-1 rounded" to={`/applications/${app._id}/status`}>Status</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationList;


