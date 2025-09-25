import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserCheck,
  Building2,
  AlertCircle,
  Loader,
  Upload,
  CheckCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { validateAvatar, validateEmail, validatePassword } from '../../utils/helper';
import uploadImage from '../../utils/uploadImage';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useAuth } from '../../context/AuthContext';

const SignUp = () => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    avatar: null,
  });

  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    showPassword: false,
    avatarPreview: null,
  });

  const [otpState, setOtpState] = useState({
    visible: false,
    userId: "",
    otp: "",
    loading: false,
    error: "",
    resendCountdown: 15,
  });

  // Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formState.errors[name]) {
      setFormState(prev => ({
        ...prev,
        errors: { ...prev.errors, [name]: "" },
      }));
    }
  };

  // Role change
  const handleRoleChange = (role) => {
    setFormData(prev => ({ ...prev, role }));
    if (formState.errors.role) {
      setFormState(prev => ({
        ...prev,
        errors: { ...prev.errors, role: "" },
      }));
    }
  };

  // Avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const error = validateAvatar(file);
      if (error) {
        setFormState(prev => ({
          ...prev,
          errors: { ...prev.errors, avatar: error },
        }));
        return;
      }
      setFormData(prev => ({ ...prev, avatar: file }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormState(prev => ({
          ...prev,
          avatarPreview: e.target.result,
          errors: { ...prev.errors, avatar: "" },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Validation
  const validateForm = () => {
    const errors = {
      fullName: !formData.fullName ? "Enter full name" : "",
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      role: !formData.role ? "Please select a role" : "",
    };

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) delete errors[key];
    });

    setFormState(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  // Send OTP
  const handleSendOtp = async () => {
    if (!formData.email) {
      return setFormState(prev => ({
        ...prev,
        errors: { ...prev.errors, email: "Enter email first" },
      }));
    }

    setFormState(prev => ({ ...prev, loading: true }));

    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: formData.fullName || "Temp",
        email: formData.email,
        password: formData.password || "Temp123!",
        role: formData.role || "jobseeker",
        avatar: "",
      });

      setOtpState({
        visible: true,
        userId: res.data.data.userId,
        otp: "",
        loading: false,
        error: "",
        resendCountdown: 15,
      });

    } catch (err) {
      setFormState(prev => ({
        ...prev,
        loading: false,
        errors: { ...prev.errors, email: err.response?.data?.message || "Failed to send OTP" },
      }));
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otpState.otp) return setOtpState(prev => ({ ...prev, error: "Enter OTP" }));
    setOtpState(prev => ({ ...prev, loading: true, error: "" }));

    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.VERIFY_REGISTER_OTP, {
        userId: otpState.userId,
        otp: otpState.otp,
      });

      const { token, user } = res.data.data;
      login(user, token);

      // Redirect user
      // window.location.href = user.role === "employer" ? "/employer-dashboard" : "/find-jobs";
      window.location.href = '/login';
    } catch (err) {
      setOtpState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || "OTP verification failed.",
      }));
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.RESEND_OTP, {
        userId: otpState.userId,
      });

      alert(res.data.message);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  // Resend countdown
  useEffect(() => {
    let timer;
    if (otpState.visible && otpState.resendCountdown > 0) {
      timer = setTimeout(() => {
        setOtpState(prev => ({ ...prev, resendCountdown: prev.resendCountdown - 1 }));
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [otpState.visible, otpState.resendCountdown]);

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormState(prev => ({ ...prev, loading: true, errors: {} }));

    try {
      let avatarUrl = "";
      if (formData.avatar) {
        const res = await uploadImage(formData.avatar);
        avatarUrl = res.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        avatar: avatarUrl,
      });

      setOtpState({
        visible: true,
        userId: response.data.data.userId,
        otp: "",
        loading: false,
        error: "",
        resendCountdown: 15,
      });

      setFormState(prev => ({ ...prev, loading: false }));
      
    } catch (error) {
      console.log("error", error);
      setFormState(prev => ({
        ...prev,
        loading: false,
        errors: {
          submit: error.response?.data?.message || "Registration failed. Please try again.",
        },
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 m-10 rounded-xl shadow-lg max-w-2xl w-full"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-600">
            Join thousands of professionals finding their dream jobs
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${formState.errors.fullName ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder="Enter your full name"
              />
            </div>
            {formState.errors.fullName && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.errors.fullName}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={formState.showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-10 py-3 rounded-lg border ${formState.errors.password ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() =>
                  setFormState(prev => ({ ...prev, showPassword: !prev.showPassword }))
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {formState.showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {formState.errors.password && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.errors.password}
              </p>
            )}
          </div>

          {/* Avatar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture (Optional)
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {formState.avatarPreview ? (
                  <img
                    src={formState.avatarPreview}
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  id="avatar"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <label
                  htmlFor="avatar"
                  className="cursor-pointer bg-gray-50 border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Photo</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
              </div>
            </div>
            {formState.errors.avatar && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.errors.avatar}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              I am a *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleRoleChange("jobseeker")}
                className={`p-4 rounded-lg border-2 transition-all ${formData.role === "jobseeker"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <UserCheck className="w-8 h-8 mx-auto mb-2" />
                <div className="font-medium">Job Seeker</div>
                <div className="text-xs text-gray-500">Looking for opportunities</div>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange("employer")}
                className={`p-4 rounded-lg border-2 transition-all ${formData.role === "employer"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <Building2 className="w-8 h-8 mx-auto mb-2" />
                <div className="font-medium">Employer</div>
                <div className="text-xs text-gray-500">Hiring talent</div>
              </button>
            </div>
            {formState.errors.role && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.errors.role}
              </p>
            )}
          </div>

          {/* Email / OTP  */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative flex items-center space-x-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={otpState.userId}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${formState.errors.email ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                  placeholder="Enter your email"
                />
              </div>

              {!otpState.userId && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={formState.loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50"
                >
                  {formState.loading ? "Sending..." : "Send OTP"}
                </button>
              )}

              {otpState.userId && otpState.verified && (
                <CheckCircle className="text-green-500 w-6 h-6" />
              )}
            </div>
            {formState.errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.errors.email}
              </p>
            )}

            {/* OTP Field */}
            {otpState.userId && !otpState.verified && (
              <div className="mt-3">
                <input
                  type="text"
                  value={otpState.otp}
                  onChange={e => setOtpState(prev => ({ ...prev, otp: e.target.value }))}
                  placeholder="Enter OTP"
                  className="w-full text-center border rounded-lg py-3 mb-2"
                />

                {otpState.error && (
                  <p className="text-red-500 text-sm mb-2">{otpState.error}</p>
                )}

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={otpState.loading}
                  className="w-full bg-green-600 text-white py-2 rounded-lg mb-2"
                >
                  {otpState.loading ? "Verifying..." : "Verify Email"}
                </button>

                <button
                  type="button"
                  disabled={otpState.resendCountdown > 0}
                  onClick={handleResendOtp}
                  className="w-full text-blue-600 py-1 text-sm"
                >
                  Resend OTP {otpState.resendCountdown > 0 && `(${otpState.resendCountdown}s)`}
                </button>
              </div>
            )}
          </div>

          {/* Submit error */}
          {formState.errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {formState.errors.submit}
              </p>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={formState.loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {formState.loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Creating Account</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>

          {/* Login link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in here
              </a>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;
