import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/')({
  component: PositionsPage,
});

interface Position {
  id: number;
  title: string;
  department: string;
  workType: string;
  location: string;
}

function PositionsPage() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState('All departments');
  const [loading, setLoading] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    positionId: '',
    resume: null as File | null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    fetchPositions();
  }, [selectedDepartment]);

  const fetchPositions = async () => {
    setLoading(true);
    try {
      const url =
        selectedDepartment === 'All departments'
          ? '/api/positions'
          : `/api/positions?department=${encodeURIComponent(selectedDepartment)}`;
      const response = await fetch(url);
      const data = await response.json();
      setPositions(data);
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
    setLoading(false);
  };

  const departments = ['All departments', 'Engineering', 'Design', 'Product', 'Marketing', 'Customer Success'];

  const handleApplySpontaneous = () => {
    setShowApplicationModal(true);
    setFormData({ ...formData, positionId: '' });
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('positionId', formData.positionId);
      formDataToSend.append('isSpontaneous', formData.positionId ? 'false' : 'true');
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }

      const response = await fetch('/api/applications', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit application');
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        setShowApplicationModal(false);
        setSubmitSuccess(false);
        setFormData({ fullName: '', email: '', positionId: '', resume: null });
      }, 2000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-12">Open Positions</h1>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-900 font-medium">We have {positions.length} open positions</p>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading positions...</p>
          </div>
        ) : (
          <div className="border-t border-b border-gray-300 divide-y divide-gray-300">
            {positions.map((position) => (
              <div
                key={position.id}
                className="py-6"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <Link
                      to="/positions/$id"
                      params={{ id: position.id.toString() }}
                      className="block group"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">
                        {position.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{position.department}</p>
                    </Link>
                  </div>
                  <div className="flex items-center gap-16 text-sm text-gray-700">
                    <span className="w-20">{position.workType}</span>
                    <span className="w-36">{position.location}</span>
                    <Link
                      to="/positions/$id"
                      params={{ id: position.id.toString() }}
                      className="px-5 py-2 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-md transition-colors text-sm font-medium"
                    >
                      Apply
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">No matching role right now?</p>
          <button
            onClick={handleApplySpontaneous}
            className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-md transition-colors"
          >
            Apply spontaneously
          </button>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
          <div className="bg-white rounded-lg max-w-md w-full p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Apply spontaneously</h2>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="text-green-600 text-xl mb-2">✓</div>
                <p className="text-gray-900 font-semibold">Application submitted successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Yassine Alaoui"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="example@mail.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position applying for *
                  </label>
                  <select
                    value={formData.positionId}
                    onChange={(e) => setFormData({ ...formData, positionId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Spontaneous Application</option>
                    {positions.map((pos) => (
                      <option key={pos.id} value={pos.id}>
                        {pos.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resume *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                    <input
                      type="file"
                      required
                      accept=".pdf"
                      onChange={(e) =>
                        setFormData({ ...formData, resume: e.target.files?.[0] || null })
                      }
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer text-orange-600 hover:text-orange-700"
                    >
                      {formData.resume ? formData.resume.name : 'Choose file or drag here'}
                    </label>
                    <p className="text-sm text-gray-500 mt-1">PDF Only, 2 MB Max</p>
                  </div>
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-6 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-semibold rounded-md transition-colors"
                >
                  {submitting ? 'Submitting...' : 'Submit application'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
