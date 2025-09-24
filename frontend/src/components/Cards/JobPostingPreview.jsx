import { Briefcase, MapPin, Users, IndianRupee, ArrowLeft, Send, Clock } from "lucide-react";

const JobPostingPreview = ({ formData, setIsPreview, handleSubmit, isSubmitting }) => {
  return (
    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 min-h-screen">
      <div className="container mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-xl shadow-xl">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Job Posting Preview
            </h2>
            <button
              onClick={() => setIsPreview(false)}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Edit</span>
            </button>
          </div>

          {/* Hero Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              {formData.companyLogo ? (
                <img
                  src={formData.companyLogo}
                  alt="Company Logo"
                  className="h-20 w-20 object-cover rounded-2xl border-4 border-white/20 shadow-lg"
                />
              ) : (
                <div className="h-20 w-20 bg-gray-50 border-2 border-gray-200 rounded-2xl flex items-center justify-center">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
              )}

              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">
                  {formData.jobTitle || "Untitled Job"}
                </h3>
                <div className="flex items-center gap-4 text-gray-600 mt-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{formData.location || "Not specified"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span className="text-sm">{formData.jobType || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">{formData.category || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Publishing..." : "Publish Job"}
              </button>
            </div>
          </div>

          {/* Salary Section */}
          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-emerald-400 to-teal-400/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                  <IndianRupee className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Compensation</h4>
                  <p className="text-lg font-bold text-gray-900">
                    {formData.salaryMin && formData.salaryMax
                      ? `${formData.salaryMin} - ${formData.salaryMax}`
                      : "Not specified"}{" "}
                    <span className="text-gray-600 font-normal ml-1">per Month</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-6">
            <h4 className="text-2xl font-bold text-gray-900 mb-2">About This Role</h4>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-6">
              <p className="text-gray-700 whitespace-pre-wrap">{formData.description || "No description provided."}</p>
            </div>
          </div>

          {/* Requirements */}
          <div>
            <h4 className="text-2xl font-bold text-gray-900 mb-2">Requirements</h4>
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-6">
              <p className="text-gray-700 whitespace-pre-wrap">{formData.requirements || "No requirements provided."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingPreview;
