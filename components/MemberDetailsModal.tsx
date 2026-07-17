'use client';
import React from 'react';
import { Member } from './Members';
import { Mail, Briefcase, Calendar, Phone, X } from 'lucide-react';

interface MemberDetailsModalProps {
  member: Member;
  isOpen: boolean;
  onClose: () => void;
}

export const MemberDetailsModal: React.FC<MemberDetailsModalProps> = ({ member, isOpen, onClose }) => {
  if (!isOpen) return null;

  const birthYear = new Date(member.dateOfBirth).getFullYear();
  const age = new Date().getFullYear() - birthYear;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden transform transition-all scale-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-700 h-32 md:h-40">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Profile Image */}
          <div className="absolute left-6 -bottom-16 md:-bottom-20">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-lg border-4 border-white shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Body */}
        <div className="pt-20 md:pt-24 pb-6 overflow-y-auto flex-1">
          <div className="px-6">
            {/* Name Section */}
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-950 mb-1">
                {member.name}
              </h2>
              {member.nickname && (
                <p className="text-emerald-600 font-semibold italic">
                  Known as "{member.nickname}"
                </p>
              )}
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
              {/* Profession */}
              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Profession</p>
                  <p className="text-gray-900 font-medium">{member.profession}</p>
                </div>
              </div>

              {/* Graduation Year */}
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Graduation</p>
                  <p className="text-gray-900 font-medium">Class of {member.graduationYear}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Phone</p>
                  <p className="text-gray-900 font-medium">{member.phone}</p>
                </div>
              </div>

              {/* Age */}
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Age</p>
                  <p className="text-gray-900 font-medium">{age} years old</p>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                About
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {member.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Close
          </button>
          <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors">
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};
