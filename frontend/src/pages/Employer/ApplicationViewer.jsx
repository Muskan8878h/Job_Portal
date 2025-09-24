import DashboardLayout from "../../components/layout/DashboardLayout";
import { useState, useEffect, useMemo } from "react";
import {
  Users,
  Calendar,
  MapPin,
  Briefcase,
  Download,
  Eye,
  ArrowLeft,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { getInitials } from "../../utils/helper";
import StatusBadge from "../../components/StatusBadge";
import ApplicantProfilePreview from "../../components/Cards/ApplicantProfilePreview";

const ApplicationViewer = () => {
  const location = useLocation();
  const jobId = location.state?.jobId || null;
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.APPLICATIONS.GET_ALL_APPLICATION(jobId)
      );
      console.log("Applications:", response.data);
      setApplications(response.data || []);
    } catch (error) {
      console.log("Failed to fetch applications", error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) fetchApplications();
    else navigate("/manage-jobs");
  }, [jobId]);

  const groupedApplications = useMemo(() => {
    return applications.reduce((acc, app) => {
      const jobId = app.job?._id;
      if (!jobId) return acc;

      if (!acc[jobId]) {
        acc[jobId] = {
          job: app.job,
          applications: [],
        };
      }
      acc[jobId].applications.push(app);
      return acc;
    }, {});
  }, [applications]);

  const handleDownloadResume = (resumeUrl) => {
    if (!resumeUrl) return;
    window.open(resumeUrl, "_blank");
  };

  return (
    <DashboardLayout activeMenu="manage-jobs">
      {loading ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading applications...</p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <button
                  onClick={() => navigate("/manage-jobs")}
                  className="group flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-white bg-white/50 hover:bg-gradient-to-r hover:from-primary hover:to-secondary border-gray-200 hover:border-transparent rounded-xl transition-all duration-300 shadow-lg shadow-gray-100 hover:shadow-xl"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  <span>Back</span>
                </button>
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                  Applications Overview
                </h1>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 pb-8">
            {Object.keys(groupedApplications).length === 0 ? (
              <div className="text-center py-16">
                <Users className="mx-auto h-24 w-24 text-gray-300" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No applications available
                </h3>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.values(groupedApplications).map(({ job, applications }) => (
                  <div
                    key={job?._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    {/* Job header */}
                    <div className="bg-gradient-to-r from-primary to-secondary px-6 py-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h2 className="text-lg font-semibold text-white">{job?.title || "N/A"}</h2>
                          <div className="flex flex-wrap items-center gap-4 mt-2 text-primary/10">
                            {job?.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span className="text-sm">{job.location}</span>
                              </div>
                            )}
                            {job?.type && (
                              <div className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4" />
                                <span className="text-sm">{job.type}</span>
                              </div>
                            )}
                            {job?.category && (
                              <div className="flex items-center gap-1">
                                <span className="text-sm">{job.category}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                          <span className="text-sm text-white font-medium">
                            {applications.length} Application{applications.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Applications List */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {applications.map((application) => (
                          <div
                            key={application._id}
                            className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              {/* Avatar */}
                              <div className="flex-shrink-0">
                                {application.applicant?.avatar ? (
                                  <img
                                    src={application.applicant.avatar}
                                    alt={application.applicant.name || "Applicant"}
                                    className="h-12 w-12 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="h-12 w-12 rounded-full bg-primary/30 flex items-center justify-center">
                                    <span className="text-primary font-semibold">
                                      {getInitials(application.applicant?.name || "")}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Applicant Info */}
                              <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-gray-900">
                                  {application.applicant?.name || "N/A"}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                  {application.applicant?.email || "N/A"}
                                </p>
                                <div className="flex items-center gap-1 mt-1 text-gray-500 text-xs">
                                  <Calendar className="h-3 w-3" />
                                  <span>
                                    Applied{" "}
                                    {application.createdAt
                                      ? moment(application.createdAt).format("Do MM YYYY")
                                      : "N/A"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 mt-4 md:m-0">
                              <StatusBadge status={application.status} />
                              <button
                                onClick={() =>
                                  handleDownloadResume(application.applicant?.resume)
                                }
                                className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/60 transition-colors"
                              >
                                <Download className="h-4 w-4" />
                                Resume
                              </button>

                              <button
                                onClick={() => setSelectedApplicant(application)}
                                className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                              >
                                <Eye className="h-4 w-4" />
                                View Profile
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile Modal */}
          {selectedApplicant && (
            <ApplicantProfilePreview
              selectedApplicant={selectedApplicant}
              setSelectedApplicant={setSelectedApplicant}
              handleDownloadResume={handleDownloadResume}
              handleClose={() => {
                setSelectedApplicant(null);
                fetchApplications();
              }}
            />
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default ApplicationViewer;
