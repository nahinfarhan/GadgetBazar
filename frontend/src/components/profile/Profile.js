import React, { useState } from 'react';
import { updateProfile, updatePassword, updateEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';

const Profile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      if (formData.displayName !== user.displayName) {
        await updateProfile(user, { displayName: formData.displayName });
      }
      
      if (formData.email !== user.email) {
        await updateEmail(user, formData.email);
      }

      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        await updatePassword(user, formData.newPassword);
      }

      alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      alert('Error updating profile: ' + error.message);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300 animate-scale-in border border-white/30">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">New Password (optional)</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Leave blank to keep current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="bg-green-600/90 backdrop-blur-lg text-white px-6 py-2 rounded-2xl hover:bg-green-700 transform hover:scale-105 transition-all duration-200 hover:shadow-xl border border-white/20"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <p className="mt-1 text-gray-900">{user.displayName || 'Not provided'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900">{user.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Account Created</label>
                <p className="mt-1 text-gray-900">{new Date(user.metadata.creationTime).toLocaleDateString()}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Last Sign In</label>
                <p className="mt-1 text-gray-900">{new Date(user.metadata.lastSignInTime).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </div>

        {/* Account Activity Section */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl p-6 mt-6 hover:shadow-2xl transition-shadow duration-300 animate-slide-up border border-white/30">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Account Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50/60 backdrop-blur-lg p-4 rounded-2xl hover-lift cursor-pointer group border border-blue-100/50">
              <h3 className="font-semibold text-blue-900 group-hover:text-blue-700 transition-colors">Orders</h3>
              <p className="text-2xl font-bold text-blue-600">0</p>
              <p className="text-sm text-blue-700">Total orders placed</p>
            </div>
            
            <div className="bg-green-50/60 backdrop-blur-lg p-4 rounded-2xl hover-lift cursor-pointer group border border-green-100/50">
              <h3 className="font-semibold text-green-900 group-hover:text-green-700 transition-colors">Wishlist</h3>
              <p className="text-2xl font-bold text-green-600">0</p>
              <p className="text-sm text-green-700">Items in wishlist</p>
            </div>
            
            <div className="bg-purple-50/60 backdrop-blur-lg p-4 rounded-2xl hover-lift cursor-pointer group border border-purple-100/50">
              <h3 className="font-semibold text-purple-900 group-hover:text-purple-700 transition-colors">Reviews</h3>
              <p className="text-2xl font-bold text-purple-600">0</p>
              <p className="text-sm text-purple-700">Products reviewed</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl p-6 mt-6 hover:shadow-2xl transition-shadow duration-300 animate-slide-up border border-white/30" style={{animationDelay: '0.2s'}}>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="bg-blue-600/90 backdrop-blur-lg text-white p-4 rounded-2xl hover:bg-blue-700 text-left transform hover:scale-105 hover:shadow-xl transition-all duration-200 border border-white/20">
              <h3 className="font-semibold">View Orders</h3>
              <p className="text-sm opacity-90">Check your order history and status</p>
            </button>
            
            <button className="bg-green-600/90 backdrop-blur-lg text-white p-4 rounded-2xl hover:bg-green-700 text-left transform hover:scale-105 hover:shadow-xl transition-all duration-200 border border-white/20">
              <h3 className="font-semibold">My Wishlist</h3>
              <p className="text-sm opacity-90">View saved products</p>
            </button>
            
            <button className="bg-purple-600/90 backdrop-blur-lg text-white p-4 rounded-2xl hover:bg-purple-700 text-left transform hover:scale-105 hover:shadow-xl transition-all duration-200 border border-white/20">
              <h3 className="font-semibold">Address Book</h3>
              <p className="text-sm opacity-90">Manage shipping addresses</p>
            </button>
            
            <button className="bg-orange-600/90 backdrop-blur-lg text-white p-4 rounded-2xl hover:bg-orange-700 text-left transform hover:scale-105 hover:shadow-xl transition-all duration-200 border border-white/20">
              <h3 className="font-semibold">Support</h3>
              <p className="text-sm opacity-90">Get help with your account</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;