import { Save, X } from "lucide-react";
import DashboardLayout from '../../components/layout/DashboardLayout'

const EditProfileDetails = ({
  formData,
  handleImageChange,
  handleInputChange,
  handleSave,
  handleCancel,
  saving,
  uploading,
}) => {
  return (
    <DashboardLayout activeMenu="company-profile">
      {formData && <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* header */}
            <div className="bg-gradient-to-r from-primary to-secondary px-8 py-6">
              <h1 className="text-lg md:text-xl font-medium text-white">Edit Profile</h1>
            </div>

            {/* Edit Form */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* personal Information */}
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-800 border-b pb-2">
                    Personal  Information
                  </h2>

                  {/* Avatar Upload */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={formData?.avatar}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
                      />
                      {uploading?.avatar && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block">
                        <span className="sr-only">Choose Avatar</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, "avatar")}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/25 transition-colors"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      className="w-full px-4 py-3 border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      disabled
                    />
                  </div>
                </div>

                {/* Company Information */}
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-800 border-b pb-2">
                    Company Information
                  </h2>

                  {/* company logo upload */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                       src={formData.companyLogo}
                       alt="company Logo" 
                       className="w-20 h-20 rounded-lg object-cover border-4 border-gray-200"
                      />
                      {uploading.logo && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block">
                        <span className="sr-only">Choose company logo</span>
                        <input
                         type="file"
                         accept="image/*"
                         onChange={(e) => handleImageChange(e, "companyLogo")}
                         className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition-colors"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                     type="text" 
                     value={formData.companyName}
                     onChange={(e) => handleInputChange("companyName", e.target.value)}
                     className="w-full px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                     placeholder="Enter company name"
                    />
                  </div>
                  {/* company description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Description
                    </label>
                    <textarea
                     value={formData.companyDescription}
                     onChange={(e) => handleInputChange("companyDescription", e.target.value)}
                     rows={4}
                     className="w-full px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                     placeholder="Describe your company..."
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
                <button
                 onClick={handleCancel}
                 className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || uploading.avatar || uploading.logo}
                  className="px-6 py-3 bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{saving ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </DashboardLayout>
  )
}

export default EditProfileDetails