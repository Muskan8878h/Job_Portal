import { useEffect, useState } from "react";
import { Save, X, Trash2, Upload } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import uploadImage from "../../utils/uploadImage";
import Navbar from "../../components/layout/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 

const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    resume: user?.resume || "",
  });

  const [formData, setFormData] = useState({ ...profileData });
  const [uploading, setUploading] = useState({ avatar: false, resume: false });
  const [saving, setSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = async (file, type) => {
    setUploading((prev) => ({ ...prev, [type]: true }));

    try {
      const imgUploadRes = await uploadImage(file);
      const imageUrl = imgUploadRes.imageUrl || "";
      handleInputChange(type, imageUrl);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed. Try again.");
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file, type);
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        formData
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        setProfileData({ ...formData });
        updateUser({ ...formData });
        navigate("/find-jobs", { replace: true }); 
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Update failed. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...profileData });
  };

  const DeleteResume = async () => {
    setSaving(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.DELETE_RESUME, {
        resumeUrl: user?.resume || "",
      });

      if (response.status === 200) {
        toast.success("Resume deleted successfully!");
        setProfileData((prev) => ({ ...prev, resume: "" }));
        setFormData((prev) => ({ ...prev, resume: "" }));
        updateUser({ ...user, resume: "" });
      }
    } catch (error) {
      console.error("Resume delete failed:", error);
      toast.error("Failed to delete resume.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const userData = {
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar || "",
      resume: user?.resume || "",
    };
    setProfileData({ ...userData });
    setFormData({ ...userData });
  }, [user]);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10 pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your personal details</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white shadow-md rounded-2xl p-6 space-y-6">
          {/* Avatar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-6 sm:space-y-0">
            <div className="relative w-28 h-28">
              <img
                src={formData?.avatar}
                alt="Avatar"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
              />
              {uploading?.avatar && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center gap-3 cursor-pointer text-blue-600 font-medium hover:text-blue-700 transition">
                <span className="underline">Choose avatar</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "avatar")}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
            </div>
          </div>

          {/* Name & Email */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                readOnly
                className="w-full px-4 py-2 border rounded-lg shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Resume Upload/Delete */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700">Resume</p>
            {formData.resume ? (
              <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                <a
                  href={formData.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View Resume
                </a>
                <button
                  onClick={DeleteResume}
                  className="flex items-center gap-2 text-red-600 text-sm hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            ) : (
              <label className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 w-fit">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Upload Resume</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, "resume")}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
            <Link
              onClick={handleCancel}
              to="/find-jobs"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </Link>
            <button
              onClick={handleSave}
              disabled={saving || uploading.avatar || uploading.resume}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
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
  );
};

export default UserProfile;
