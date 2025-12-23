import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
});

interface Position {
  id: number;
  title: string;
  department: string;
  workType: string;
  location: string;
}

interface Application {
  id: number;
  fullName: string;
  email: string;
  positionId: number | null;
  resumePath: string;
  isSpontaneous: boolean;
  createdAt: string;
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'positions' | 'applications'>('positions');
  const [positions, setPositions] = useState<Position[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddPosition, setShowAddPosition] = useState(false);
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    workType: 'Hybrid',
    location: 'Rabat, Morocco',
    description: '',
    whatWeDo: '',
    yourMission: '',
    yourProfile: '',
    techStack: '',
    whatWeOffer: '',
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    if (activeTab === 'positions') {
      const response = await fetch('/api/positions');
      const data = await response.json();
      setPositions(data);
    } else {
      const response = await fetch('/api/applications');
      const data = await response.json();
      setApplications(data);
    }
    setLoading(false);
  };

  const handleSubmitPosition = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPosition) {
        await fetch(`/api/positions/${editingPosition.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch('/api/positions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      setShowAddPosition(false);
      setEditingPosition(null);
      setFormData({
        title: '',
        department: '',
        workType: 'Hybrid',
        location: 'Rabat, Morocco',
        description: '',
        whatWeDo: '',
        yourMission: '',
        yourProfile: '',
        techStack: '',
        whatWeOffer: '',
      });
      fetchData();
    } catch (error) {
      console.error('Error saving position:', error);
    }
  };

  const handleDeletePosition = async (id: number) => {
    if (!confirm('Are you sure you want to delete this position?')) return;
    try {
      await fetch(`/api/positions/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Error deleting position:', error);
    }
  };

  const handleEditPosition = async (id: number) => {
    try {
      const response = await fetch(`/api/positions/${id}`);
      const data = await response.json();
      setEditingPosition(data);
      setFormData({
        title: data.title || '',
        department: data.department || '',
        workType: data.workType || 'Hybrid',
        location: data.location || 'Rabat, Morocco',
        description: data.description || '',
        whatWeDo: data.whatWeDo || '',
        yourMission: data.yourMission || '',
        yourProfile: data.yourProfile || '',
        techStack: data.techStack || '',
        whatWeOffer: data.whatWeOffer || '',
      });
      setShowAddPosition(true);
    } catch (error) {
      console.error('Error fetching position:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <Link to="/" className="text-orange-600 hover:text-orange-700">
              View Public Site
            </Link>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setActiveTab('positions')}
              className={`px-4 py-2 font-medium rounded-md ${
                activeTab === 'positions'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Positions
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-2 font-medium rounded-md ${
                activeTab === 'applications'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Applications
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'positions' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Manage Positions</h2>
              <button
                onClick={() => {
                  setShowAddPosition(true);
                  setEditingPosition(null);
                  setFormData({
                    title: '',
                    department: '',
                    workType: 'Hybrid',
                    location: 'Rabat, Morocco',
                    description: '',
                    whatWeDo: '',
                    yourMission: '',
                    yourProfile: '',
                    techStack: '',
                    whatWeOffer: '',
                  });
                }}
                className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-md"
              >
                Add New Position
              </button>
            </div>

            {showAddPosition && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-lg font-bold mb-4">
                  {editingPosition ? 'Edit Position' : 'Add New Position'}
                </h3>
                <form onSubmit={handleSubmitPosition} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Department *</label>
                      <input
                        type="text"
                        required
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Work Type *</label>
                      <select
                        value={formData.workType}
                        onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md"
                      >
                        <option>Hybrid</option>
                        <option>Remote</option>
                        <option>On-site</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Location *</label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description *</label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border rounded-md"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">What We Do</label>
                    <textarea
                      value={formData.whatWeDo}
                      onChange={(e) => setFormData({ ...formData, whatWeDo: e.target.value })}
                      className="w-full px-4 py-2 border rounded-md"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Your Mission</label>
                    <textarea
                      value={formData.yourMission}
                      onChange={(e) => setFormData({ ...formData, yourMission: e.target.value })}
                      className="w-full px-4 py-2 border rounded-md"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Your Profile</label>
                    <textarea
                      value={formData.yourProfile}
                      onChange={(e) => setFormData({ ...formData, yourProfile: e.target.value })}
                      className="w-full px-4 py-2 border rounded-md"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Tech Stack</label>
                    <textarea
                      value={formData.techStack}
                      onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                      className="w-full px-4 py-2 border rounded-md"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">What We Offer</label>
                    <textarea
                      value={formData.whatWeOffer}
                      onChange={(e) => setFormData({ ...formData, whatWeOffer: e.target.value })}
                      className="w-full px-4 py-2 border rounded-md"
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md"
                    >
                      {editingPosition ? 'Update Position' : 'Create Position'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddPosition(false);
                        setEditingPosition(null);
                      }}
                      className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-lg shadow">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Department</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Location</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map((position) => (
                    <tr key={position.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{position.title}</td>
                      <td className="px-6 py-4">{position.department}</td>
                      <td className="px-6 py-4">{position.workType}</td>
                      <td className="px-6 py-4">{position.location}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleEditPosition(position.id)}
                          className="text-blue-600 hover:text-blue-700 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePosition(position.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Applications</h2>
            <div className="bg-white rounded-lg shadow">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Position</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Resume</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{app.fullName}</td>
                      <td className="px-6 py-4">{app.email}</td>
                      <td className="px-6 py-4">
                        {app.isSpontaneous ? (
                          <span className="text-orange-600 font-medium">Spontaneous</span>
                        ) : (
                          positions.find((p) => p.id === app.positionId)?.title || 'N/A'
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={app.resumePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          View Resume
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
