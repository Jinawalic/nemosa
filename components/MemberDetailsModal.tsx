'use client';

import React from 'react';
import { Button } from './ui/Button';
import { Cake, Calendar, Mail, Phone, X, Briefcase, CircleDashed, BadgeCheck } from 'lucide-react';
import type { RegistrationView } from '@/lib/registration-types';
import Link from 'next/link';

interface MemberDetailsModalProps {
  member: RegistrationView;
  isOpen: boolean;
  onClose: () => void;
}

export const MemberDetailsModal: React.FC<MemberDetailsModalProps> = ({
  member,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const formattedBirthday = member.dateOfBirth
    ? new Date(member.dateOfBirth).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        // year: 'numeric',
      })
    : 'Not provided';

  const profileImage = member.image?.trim();
  const statusLabel = member.status ? member.status.charAt(0).toUpperCase() + member.status.slice(1) : 'Unknown';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-xl overflow-hidden transform transition-all scale-100 max-h-[90vh] flex flex-col">
        <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-700 h-18 md:h-20 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="absolute left-6 -bottom-14 md:-bottom-16 z-10 mt-5">
            {profileImage ? (
              <img
                src={profileImage}
                alt={member.fullName}
                className="w-28 h-28 md:w-32 md:h-32 rounded-xl border-4 border-white object-cover bg-gray-100"
              />
            ) : (
              <div className="flex w-28 h-28 md:w-32 md:h-32 items-center justify-center rounded-xl border-4 border-white bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-3xl font-bold text-white">
                {member.fullName.charAt(0)}
              </div>
            )}
          </div>
        </div>

        <div className="pt-16 md:pt-20 pb-6 overflow-y-auto flex-1">
          <div className="px-6">
            <div className="mb-2">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-xl md:text-2xl font-bold text-emerald-950">
                  {member.fullName}
                </h2>
                {member.nickname && (
                <p className="text-emerald-600 font-semibold italic text-sm">
                  ({member.nickname})
                </p>
              )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2 pb-6 border-b border-gray-200">
              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                    Profession
                  </p>
                  <p className="text-gray-900 font-medium">{member.profession}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                    Graduation
                  </p>
                  <p className="text-gray-900 font-medium">Class of {member.graduationYear}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                    Phone
                  </p>
                  <p className="text-gray-900 font-medium">{member.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                    Email
                  </p>
                  <p className="text-gray-900 font-medium break-all">{member.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:col-span-2">
                <Cake className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                    Birthday
                  </p>
                  <p className="text-gray-900 font-medium">{formattedBirthday}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                About
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {member.bio || 'No bio description provided yet for this member profile.'}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
          
          {/* Option A: If member.phone already includes a country code (e.g., 23480...) */}
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 text-sm rounded-full">
            <a 
              href={`https://wa.me/${member.phone.replace(/\D/g, '')}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
