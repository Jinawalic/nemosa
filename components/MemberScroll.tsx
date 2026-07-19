'use client';

import { useState } from 'react';
import { Button } from './ui/Button';
import { ArrowUpRight, Phone } from 'lucide-react';
import Link from 'next/link';
import { MemberDetailsModal } from './MemberDetailsModal';
import type { RegistrationView } from '@/lib/registration-types';

interface MemberScrollProps {
  members: RegistrationView[];
}

export const MemberScroll = ({ members }: MemberScrollProps) => {
  const [selectedMember, setSelectedMember] = useState<RegistrationView | null>(null);

  // Filter unique members based on email
  const uniqueMembers = Array.from(
    new Map(members.map((member) => [member.email, member])).values(),
  );

  const renderCard = (member: RegistrationView, key: string) => {
    const memberImage = member.image?.trim();

    return (
      <div
        key={key}
        className="bg-white border border-gray-100 w-64 rounded-xl overflow-hidden flex-shrink-0 flex flex-col group/card transition-all duration-300 shadow-sm"
      >
        <div className="relative w-full h-48 bg-emerald-900 overflow-hidden">
          {memberImage ? (
            <img
              src={memberImage}
              alt={member.fullName}
              className="w-full h-full object-contain transition-transform duration-500 group-hover/card:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white">
              <span className="text-4xl font-bold">{member.fullName.charAt(0)}</span>
            </div>
          )}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8 flex items-center gap-1.5 text-white">
            <span className="text-xs font-medium tracking-wide truncate">{member.profession}</span>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1 justify-between whitespace-normal text-left">
          <div>
            <h4 className="font-bold text-gray-900 text-base tracking-tight truncate mb-2">
              {member.fullName}
            </h4>
            {member.nickname && (
              <p className="text-xs text-emerald-600 font-semibold mb-3 truncate">
                "{member.nickname}"
              </p>
            )}
            <div className="flex items-center justify-between gap-2 text-xs border-t border-gray-50 pt-3">
              <div className="flex items-center gap-1 text-gray-500 truncate">
                <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span className="truncate font-medium">{member.phone}</span>
              </div>
              <button
                onClick={() => setSelectedMember(member)}
                className="flex items-center gap-1 font-bold text-emerald-600 hover:text-emerald-700 transition-colors group/btn cursor-pointer"
              >
                <span>View Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 transform transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="members" className="py-10 bg-gray-50 border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Registered Members</h2>
        <p className="text-gray-500 mt-2">Meet the diverse network of alumni making waves across fields.</p>
      </div>

      {uniqueMembers.length > 0 ? (
        /* The infinite horizontal marquee container */
        <div className="relative w-full overflow-hidden py-4 flex gap-6 group">
          
          {/* Track 1 */}
          <div className="flex gap-6 whitespace-nowrap animate-marquee flex-shrink-0 group-hover:[animation-play-state:paused]">
            {uniqueMembers.map((member, idx) => renderCard(member, `track1-${idx}`))}
          </div>

          {/* Track 2 (Visual Twin copy for loop continuity) */}
          <div className="flex gap-6 whitespace-nowrap animate-marquee flex-shrink-0 group-hover:[animation-play-state:paused]" aria-hidden="true">
            {uniqueMembers.map((member, idx) => renderCard(member, `track2-${idx}`))}
          </div>

        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
            <h3 className="text-xl font-semibold text-gray-900">No registrations found yet</h3>
            <p className="mt-2 text-gray-600">
              Once registration records exist in the database, they will appear here automatically.
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <Button variant="outline">
          <Link href="/members">See All Members</Link>
        </Button>
      </div>

      {selectedMember && (
        <MemberDetailsModal
          member={selectedMember}
          isOpen={Boolean(selectedMember)}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </section>
  );
};