import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect, useRef } from 'react';

export const Route = createFileRoute('/positions/$id')({
  component: PositionDetailPage,
});

interface Position {
  id: number;
  title: string;
  department: string;
  workType: string;
  location: string;
  description: string;
  whatWeDo?: string;
  yourMission?: string;
  yourProfile?: string;
  techStack?: string;
  whatWeOffer?: string;
}

function PositionDetailPage() {
  const { id } = Route.useParams();
  const [position, setPosition] = useState<Position | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    resume: null as File | null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPosition();
  }, [id]);

  const fetchPosition = async () => {
    try {
      const response = await fetch(`/api/positions/${id}`);
      const data = await response.json();
      setPosition(data);
    } catch (error) {
      console.error('Error fetching position:', error);
    }
    setLoading(false);
  };

  const handleApplyClick = () => {
    if (!showApplicationForm) {
      setShowApplicationForm(true);
      // Wait for the form to render, then scroll to it
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      setShowApplicationForm(false);
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('positionId', id);
      formDataToSend.append('isSpontaneous', 'false');
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
        setShowApplicationForm(false);
        setSubmitSuccess(false);
        setFormData({ fullName: '', email: '', resume: null });
      }, 2000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!position) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Position not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Link to="/" className="text-gray-600 hover:text-gray-900 mb-6 sm:mb-8 inline-flex items-center gap-2 text-sm">
          <span>←</span> Browse all open positions
        </Link>

        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 lg:gap-12">
          {/* Left sidebar */}
          <div className="space-y-4 bg-gray-50 p-4 sm:p-6 rounded-lg">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{position.title}</h1>
            <p className="text-sm text-gray-600">
              {position.workType} · {position.location}
            </p>
            <button
              onClick={handleApplyClick}
              className="w-full px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-md transition-colors text-sm"
            >
              Apply
            </button>
          </div>

          {/* Right content */}
          <div>

          <div className="space-y-8 text-gray-700">
            {position.whatWeDo && (
              <section>
                <h2 className="text-lg font-bold mb-3 text-gray-900">What We do</h2>
                <p className="whitespace-pre-line leading-relaxed text-sm">{position.whatWeDo}</p>
              </section>
            )}

            {position.yourMission && (
              <section>
                <h2 className="text-lg font-bold mb-3 text-gray-900">Your Mission</h2>
                <p className="whitespace-pre-line leading-relaxed text-sm">{position.yourMission}</p>
              </section>
            )}

            {position.yourProfile && (
              <section>
                <h2 className="text-lg font-bold mb-3 text-gray-900">Your Profile</h2>
                <p className="whitespace-pre-line leading-relaxed text-sm">{position.yourProfile}</p>
              </section>
            )}

            {position.techStack && (
              <section>
                <h2 className="text-lg font-bold mb-3 text-gray-900">Tech Stack</h2>
                <p className="whitespace-pre-line leading-relaxed text-sm">{position.techStack}</p>
              </section>
            )}

            {position.whatWeOffer && (
              <section>
                <h2 className="text-lg font-bold mb-3 text-gray-900">What We Offer</h2>
                <p className="whitespace-pre-line leading-relaxed text-sm">{position.whatWeOffer}</p>
              </section>
            )}
          </div>

          {showApplicationForm && (
            <div ref={formRef} className="mt-8 border border-gray-200 rounded-lg p-4 sm:p-8">
              <h2 className="text-lg font-bold mb-6 text-gray-900">Application</h2>

              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="text-green-600 text-xl mb-2">✓</div>
                  <p className="text-gray-900 font-semibold">Application submitted successfully!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Full name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
                        placeholder="Yassine Alaoui"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Email address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
                        placeholder="example@mail.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Resume *
                    </label>
                    <div className="border border-gray-300 rounded-md p-4 text-center bg-gray-50">
                      <input
                        type="file"
                        required
                        accept=".pdf"
                        onChange={(e) =>
                          setFormData({ ...formData, resume: e.target.files?.[0] || null })
                        }
                        className="hidden"
                        id="resume-upload-detail"
                      />
                      <label
                        htmlFor="resume-upload-detail"
                        className="cursor-pointer text-orange-600 hover:text-orange-700 font-medium text-sm"
                      >
                        {formData.resume ? formData.resume.name : 'Resume'}
                      </label>
                      <p className="text-xs text-gray-500 mt-1">PDF Only, 2 MB Max</p>
                    </div>
                  </div>

                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                      {submitError}
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-medium rounded-md transition-colors text-sm"
                    >
                      {submitting ? 'Submitting...' : 'Submit application'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
