'use client';
import React, { useState } from 'react';
import { Button } from './ui/Button';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Generate years from 2026 down to 2006
  const years = Array.from({ length: 2026 - 2006 + 1 }, (_, i) => 2026 - i);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden transform transition-all scale-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-emerald-600 text-white">
          <h3 className="text-xl font-bold">Alumni Registration</h3>
          <button onClick={onClose} className="text-white/80 hover:text-white text-2xl font-semibold focus:outline-none">&times;</button>
        </div>

        {/* Form Body */}
        <form onSubmit={(e) => e.preventDefault()} className="p-6 overflow-y-auto space-y-4 flex-1 text-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Full Name</label>
              <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Nickname</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm" placeholder="Jay" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Date of Birth</label>
              <input type="date" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Graduation Class</label>
              <select required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white text-sm">
                <option value="">Select Year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Profession</label>
              <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm" placeholder="Software Engineer" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Phone Number</label>
              <input type="tel" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm" placeholder="+234..." />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Brief Bio</label>
            <textarea rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm resize-none" placeholder="Tell us a bit about your journey..."></textarea>
          </div>

          <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-5 py-2 text-sm text-gray-500 hover:text-gray-700 font-medium">Cancel</button>
            <Button type="submit">Submit Registration</Button>
          </div>
        </form>
      </div>
    </div>
  );
};