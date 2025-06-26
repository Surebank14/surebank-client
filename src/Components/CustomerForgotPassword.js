import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePasswordRequest } from '../redux/slices/loginSlice'; 
import { Link } from 'react-router-dom';

const CustomerForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.login); // Adjust slice name
  const [formData, setFormData] = useState({
    phone: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    confirmPassword: '',
  });

  // Validate confirm password in real-time
  useEffect(() => {
    if (formData.newPassword && formData.confirmPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setErrors({
          ...errors,
          confirmPassword: 'Passwords do not match',
        });
      } else {
        setErrors({
          ...errors,
          confirmPassword: '',
        });
      }
    }
  }, [formData.newPassword, formData.confirmPassword,errors]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation before submission
    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: 'Passwords do not match',
      });
      return;
    }

    // Prepare data for API call
    const payload = {
      phone: formData.phone,
      newPassword: formData.newPassword,
    };
console.log("details new",payload)
    dispatch(updatePasswordRequest({ ...payload, navigate }));
  };

  return (
    <div className="mt-20 flex items-center justify-center bg-gray-100 p-4 sm:p-0">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* phone input */}
          <input
            type="phone"
            name="phone"
            placeholder="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* New Password input */}
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            // minLength="5"
          />

          {/* Confirm Password input with real-time validation */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              required
            />
               <div className="text-right">
                            <Link 
                                to="/" 
                                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                            >
                                Login
                            </Link>
                        </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Server Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          {loading ? (
            <button
              type="button"
              className="w-full p-3 bg-blue-500 text-white rounded-lg flex items-center justify-center"
              disabled
            >
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="opacity-25"
                />
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  className="opacity-75"
                />
              </svg>
              Resetting...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              disabled={!!errors.confirmPassword}
            >
              Reset Password
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CustomerForgotPassword;