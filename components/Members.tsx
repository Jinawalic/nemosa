'use client';

import React, { useState } from 'react';
import { Button } from './ui/Button';
import { MemberDetailsModal } from './MemberDetailsModal';
import { Calendar, Phone, BadgeCheck, CircleDashed } from 'lucide-react';
import type { RegistrationView } from '@/lib/registration-types';

interface MembersProps {
  members: RegistrationView[];
}

export const Members: React.FC<MembersProps> = ({ members }) => {
  const [selectedMember, setSelectedMember] = useState<RegistrationView | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewProfile = (member: RegistrationView) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const renderMemberCard = (member: RegistrationView) => {
    const memberImage = member.image?.trim();

    return (
      <div
        key={member.id}
        className="bg-white rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group"
      >
        <div className="relative overflow-hidden bg-gray-200 aspect-square">
          {memberImage ? (
            <img
              src={memberImage}
              alt={member.fullName}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white">
              <span className="text-4xl font-bold">{member.fullName.charAt(0)}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          {member.status === 'approved' ? (
            <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
              <BadgeCheck className="w-3 h-3" />
              Approved
            </span>
          ) : (
            <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
              <CircleDashed className="w-3 h-3" />
              {member.status}
            </span>
          )}
        </div>

        <div className="p-4 flex flex-col">
          <h3 className="font-bold text-gray-900 text-sm md:text-base line-clamp-1">
            {member.fullName}
          </h3>
          {member.nickname && (
            <p className="text-xs text-emerald-600 font-medium mb-2">
              "{member.nickname}"
            </p>
          )}
          <p className="text-xs md:text-sm text-gray-600 line-clamp-1 mb-3">
            {member.profession}
          </p>
          <div className="flex items-center justify-between gap-2 text-xs text-gray-500 mb-4">
            <span className="inline-flex items-center gap-1 truncate">
              <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              Class of {member.graduationYear}
            </span>
            <span className="inline-flex items-center gap-1 truncate">
              <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              {member.phone}
            </span>
          </div>

          <Button
            onClick={() => handleViewProfile(member)}
            className="w-full text-xs md:text-sm bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium"
          >
            View Profile
          </Button>
        </div>
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-white py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-4">
            Our Alumni Members
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Connect with accomplished professionals from our community. Explore diverse careers and expertise.
          </p>
        </div>

        {members.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {members.map((member) => renderMemberCard(member))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-16 text-center">
            <h2 className="text-xl font-semibold text-gray-900">No members found yet</h2>
            <p className="mt-2 text-gray-600">
              Add member records to the database and they will appear here automatically.
            </p>
          </div>
        )}
      </div>

      {selectedMember && (
        <MemberDetailsModal
          member={selectedMember}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedMember(null);
          }}
        />
      )}
    </section>
  );
};
