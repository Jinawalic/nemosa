'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/Button';
import toast from 'react-hot-toast';
import { Loader, UploadCloud, FileImage } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  nickname: string;
  email: string;
  phone: string;
  profession: string;
  dateOfBirth: string;
  graduationYear: string;
  location: string;
  bio: string;
  passport: File | null;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    nickname: '',
    email: '',
    phone: '',
    profession: '',
    dateOfBirth: '',
    graduationYear: '',
    location: '',
    bio: '',
    passport: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  if (!isOpen) return null;

  // Generate years from 2026 down to 2006
  const years = Array.from({ length: 2026 - 2006 + 1 }, (_, i) => 2026 - i);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        setFileName('');
        setFormData((prev) => ({ ...prev, passport: null }));
        return;
      }

      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error('Only JPEG, PNG, and WebP images are allowed');
        setFileName('');
        setFormData((prev) => ({ ...prev, passport: null }));
        return;
      }

      setFileName(file.name);
      setFormData((prev) => ({ ...prev, passport: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone || !formData.profession || !formData.dateOfBirth || !formData.graduationYear) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const apiFormData = new FormData();
      apiFormData.append('fullName', formData.fullName);
      apiFormData.append('nickname', formData.nickname);
      apiFormData.append('email', formData.email);
      apiFormData.append('phone', formData.phone);
      apiFormData.append('profession', formData.profession);
      apiFormData.append('dateOfBirth', formData.dateOfBirth);
      apiFormData.append('graduationYear', formData.graduationYear);
      apiFormData.append('location', formData.location);
      apiFormData.append('bio', formData.bio);
      if (formData.passport) {
        apiFormData.append('passport', formData.passport);
      }

      const response = await fetch('/api/register', {
        method: 'POST',
        body: apiFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Registration failed. Please try again.');
        return;
      }

      toast.success(data.message || 'Registration submitted successfully!');
      router.refresh();
      
      // Reset form
      setFormData({
        fullName: '',
        nickname: '',
        email: '',
        phone: '',
        profession: '',
        dateOfBirth: '',
        graduationYear: '',
        location: '',
        bio: '',
        passport: null,
      });
      setFileName('');

      // Close modal after brief delay
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-xl overflow-hidden transform transition-all scale-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-emerald-600 text-white">
          <h3 className="text-xl font-bold">Alumni Registration</h3>
          <button onClick={onClose} className="text-white/80 hover:text-white text-2xl font-semibold focus:outline-none" disabled={isLoading}>&times;</button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm disabled:bg-gray-50"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Nickname</label>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm disabled:bg-gray-50"
                placeholder="Jay"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm disabled:bg-gray-50"
              placeholder="john@example.com"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Date of Birth *</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Graduation Class *</label>
              <select
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white text-sm disabled:bg-gray-50"
              >
                <option value="">Select Year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Profession *</label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm disabled:bg-gray-50"
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm disabled:bg-gray-50"
                placeholder="+234..."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm disabled:bg-gray-50"
              placeholder="Lagos, Nigeria"
            />
          </div>

          {/* Styled Clean & Professional File Input Box */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Upload Passport (Max 5MB)</label>
            <label 
              className="group flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-200 hover:border-emerald-500 bg-gray-50 hover:bg-emerald-50/30 rounded-xl cursor-pointer transition-all duration-200"
              style={isLoading ? { pointerEvents: 'none', opacity: 0.5 } : {}}
            >
              <input
                type="file"
                name="passport"
                onChange={handleFileChange}
                disabled={isLoading}
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
              />
              <div className="flex flex-col items-center text-center">
                {fileName ? (
                  <>
                    <div className="p-3 bg-emerald-100 rounded-full text-emerald-600 mb-2">
                      <FileImage className="w-6 h-6" />
                    </div>
                    <p className="text-sm text-emerald-700 font-medium max-w-[280px] truncate">{fileName}</p>
                    <p className="text-xs text-emerald-500 mt-1">Click to replace file</p>
                  </>
                ) : (
                  <>
                    <div className="p-3 bg-gray-100 group-hover:bg-emerald-100 rounded-full text-gray-400 group-hover:text-emerald-600 mb-2 transition-colors">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Click to select or drag & drop</p>
                    <p className="text-xs text-gray-400 mt-1">JPEG, PNG, or WebP up to 5MB</p>
                  </>
                )}
              </div>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Brief Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              disabled={isLoading}
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm resize-none disabled:bg-gray-50"
              placeholder="Tell us a bit about your journey..."
            ></textarea>
          </div>

          <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-5 py-2 text-sm text-gray-500 hover:text-gray-700 font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Registration'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};