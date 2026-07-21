'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from './ui/Button';
import { MemberDetailsModal } from './MemberDetailsModal';
import { EditMemberModal } from './EditMemberModal';
import { Search } from 'lucide-react';
import type { RegistrationView } from '@/lib/registration-types';

interface MembersProps {
  members: RegistrationView[];
  onUpdateMember?: (updatedMember: RegistrationView) => void;
}

export const Members: React.FC<MembersProps> = ({ members, onUpdateMember }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [displayMembers, setDisplayMembers] = useState<RegistrationView[]>(members);
  const [selectedMember, setSelectedMember] = useState<RegistrationView | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    setDisplayMembers(members);
  }, [members]);

  const handleViewProfile = (member: RegistrationView) => {
    setSelectedMember(member);
    setIsDetailsOpen(true);
  };

  const handleEditProfile = (member: RegistrationView) => {
    setSelectedMember(member);
    setIsEditOpen(true);
  };

  const handleSaveProfile = async (updatedMember: RegistrationView) => {
    try {
      const response = await fetch(`/api/admin/registrations/${updatedMember.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: updatedMember.fullName,
          nickname: updatedMember.nickname,
          email: updatedMember.email,
          phone: updatedMember.phone,
          profession: updatedMember.profession,
          graduationYear: updatedMember.graduationYear,
          dateOfBirth: updatedMember.dateOfBirth,
          bio: updatedMember.bio,
          image: updatedMember.image,
        }),
      });

      if (response.redirected || response.url.includes('/admin/login')) {
        toast.error('Please log in as an admin to update member details.');
        router.push('/admin/login?redirect=/members');
        return;
      }

      const data = (await response.json().catch(() => null)) as {
        error?: string;
        updatedMember?: RegistrationView;
      } | null;

      if (!response.ok) {
        toast.error(data?.error || 'Failed to update member details.');
        return;
      }

      const savedMember = data?.updatedMember;

      if (!savedMember) {
        toast.error('Unexpected response from the server.');
        return;
      }

      setDisplayMembers((current) =>
        current.map((member) => (member.id === savedMember.id ? savedMember : member)),
      );
      onUpdateMember?.(savedMember);
      toast.success(`${savedMember.fullName} updated successfully.`);
      setIsEditOpen(false);
      setSelectedMember(null);
    } catch {
      toast.error('Unable to update member details. Please try again.');
    }
  };

  const filteredMembers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return displayMembers;

    return displayMembers.filter((member) => {
      return member.fullName.toLowerCase().includes(query) || member.profession.toLowerCase().includes(query);
    });
  }, [displayMembers, searchQuery]);

  const renderMemberCard = (member: RegistrationView) => {
    const memberImage = member.image?.trim();

    return (
      <div
        key={member.id}
        className="bg-white rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group flex flex-col justify-between"
      >
        <div>
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
          </div>

          <div className="p-4 flex flex-col pb-2">
            <h3 className="font-bold text-gray-900 text-sm md:text-base line-clamp-1">
              {member.fullName}
            </h3>
            {member.nickname && (
              <p className="text-xs text-emerald-600 font-medium mb-1">"{member.nickname}"</p>
            )}
            <p className="text-xs md:text-sm text-gray-600 line-clamp-1">{member.profession}</p>
          </div>
        </div>

        <div className="p-4 pt-0 grid grid-cols-4 gap-2">
          <Button
            onClick={() => handleViewProfile(member)}
            className="col-span-2 flex items-center justify-center text-xs md:text-sm bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium transition-colors"
          >
            View
          </Button>
          <Button
            onClick={() => handleEditProfile(member)}
            variant="outline"
            className="col-span-2 flex items-center justify-center border border-gray-200 hover:bg-gray-50 text-gray-600 p-2 rounded-lg transition-colors"
            title="Edit Profile"
          >
            Edit
          </Button>
        </div>
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-white py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-4">
              Our Alumni Members
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Connect with accomplished professionals from our community. Explore diverse careers and expertise.
            </p>
          </div>

          <div className="relative w-full md:max-w-xs shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search members or professions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>
        </div>

        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {filteredMembers.map((member) => renderMemberCard(member))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-16 text-center">
            <h2 className="text-xl font-semibold text-gray-900">No members found</h2>
            <p className="mt-2 text-gray-600">
              Try adjusting your search criteria or adding new records to the database.
            </p>
          </div>
        )}
      </div>

      {selectedMember && isDetailsOpen && (
        <MemberDetailsModal
          member={selectedMember}
          isOpen={isDetailsOpen}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedMember(null);
          }}
        />
      )}

      {selectedMember && isEditOpen && (
        <EditMemberModal
          member={selectedMember}
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedMember(null);
          }}
          onSave={handleSaveProfile}
        />
      )}
    </section>
  );
};