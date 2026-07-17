'use client';

import { useState } from 'react';
import { Button } from './ui/Button';
import { MapPin, ArrowUpRight, X, Cake } from 'lucide-react';
import Link from 'next/link';

// Define a type for your member data
interface Member {
  id: number;
  name: string;
  class: string;
  role: string;
  location: string;
  image: string;
}

const dummyMembers: Member[] = [
  { id: 1, name: 'Amara Okafor', class: '2008', role: 'Medical Doctor', location: 'Lagos', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop' },
  { id: 2, name: 'Tunde Bakare', class: '2012', role: 'Software Engineer', location: 'Abuja', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' },
  { id: 3, name: 'Fatima Musa', class: '2006', role: 'Architect', location: 'Kano', image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=400&auto=format&fit=crop' },
  { id: 4, name: 'Chidi Nwosu', class: '2018', role: 'Legal Counsel', location: 'Enugu', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
  { id: 5, name: 'Efe Omowole', class: '2015', role: 'Financial Analyst', location: 'Port Harcourt', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop' },
  { id: 6, name: 'Aisha Yusuf', class: '2021', role: 'Creative Director', location: 'Abuja', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop' },
];

export const MemberScroll = () => {
  // State to track which member profile is being viewed in the modal
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  return (
    <section id="members" className="py-10 bg-gray-50 border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Registered Members</h2>
        <p className="text-gray-500 mt-2">Meet the diverse network of alumni making waves across fields.</p>
      </div>

      {/* Outer Parent wrapper - added 'group' to manage global hover states across parallel tracks */}
      <div className="relative w-full overflow-hidden py-4 flex gap-6 group">
        
        {/* Track 1: Original list */}
        <div className="flex gap-6 whitespace-nowrap animate-marquee flex-shrink-0 group-hover:[animation-play-state:paused]">
          {dummyMembers.map((member, idx) => (
            <div 
              key={`track1-${idx}`} 
              className="bg-white border border-gray-100 w-64 rounded-xl overflow-hidden flex-shrink-0 flex flex-col group/card transition-all duration-300"
            >
              <div className="relative w-full h-48 bg-emerald-900 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                />
                <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-md">
                  Class of {member.class}
                </span>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8 flex items-center gap-1.5 text-white">
                  <span className="text-xs font-medium tracking-wide truncate">{member.role}</span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between whitespace-normal text-left">
                <div>
                  <h4 className="font-bold text-gray-900 text-base tracking-tight truncate mb-3">
                    {member.name}
                  </h4>
                  <div className="flex items-center justify-between gap-2 text-xs border-t border-gray-50 pt-3">
                    <div className="flex items-center gap-1 text-gray-500 truncate">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="truncate font-medium">{member.location}</span>
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
          ))}
        </div>

        {/* Track 2: Exact Twin Mirror */}
        <div className="flex gap-6 whitespace-nowrap animate-marquee flex-shrink-0 group-hover:[animation-play-state:paused]" aria-hidden="true">
          {dummyMembers.map((member, idx) => (
            <div 
              key={`track2-${idx}`} 
              className="bg-white border border-gray-100 w-64 rounded-xl overflow-hidden flex-shrink-0 flex flex-col group/card transition-all duration-300"
            >
              <div className="relative w-full h-48 bg-emerald-900 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                />
                <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-md">
                  Class of {member.class}
                </span>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8 flex items-center gap-1.5 text-white">
                  <span className="text-xs font-medium tracking-wide truncate">{member.role}</span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between whitespace-normal text-left">
                <div>
                  <h4 className="font-bold text-gray-900 text-base tracking-tight truncate mb-3">
                    {member.name}
                  </h4>
                  <div className="flex items-center justify-between gap-2 text-xs border-t border-gray-50 pt-3">
                    <div className="flex items-center gap-1 text-gray-500 truncate">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="truncate font-medium">{member.location}</span>
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
          ))}
        </div>

      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="outline">
          <Link href="/members">See All Members</Link>
        </Button>
      </div>

        {/* MemberDetailsModal Popup Window Layout */}
        {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-2xl rounded-xl overflow-hidden transform transition-all scale-100 max-h-[90vh] flex flex-col relative border border-gray-100">
            
            {/* Header Banner */}
            <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-700 h-18 md:h-20 flex-shrink-0 w-full">
                <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors cursor-pointer"
                >
                <X className="w-6 h-6" />
                </button>

                {/* Profile Image */}
                <div className="absolute left-6 -bottom-14 md:-bottom-16 z-10">
                <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-28 h-28 md:w-32 md:h-32 rounded-xl border-4 border-white object-cover"
                />
                </div>
            </div>

            {/* Body Section */}
            <div className="pt-16 md:pt-20 pb-6 overflow-y-auto flex-1 text-left">
                <div className="px-6">
                
                {/* Name & Title */}
                <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-emerald-950 mb-1">
                    {selectedMember.name}
                    </h3>
                    {(selectedMember as any).nickname && (
                    <p className="text-emerald-600 font-semibold italic text-sm">
                        Known as "{(selectedMember as any).nickname}"
                    </p>
                    )}
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
                    {/* Profession */}
                    <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 text-emerald-600">💼</div> 
                    <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Profession</p>
                        <p className="text-gray-900 font-medium">
                        {(selectedMember as any).profession || selectedMember.role}
                        </p>
                    </div>
                    </div>

                    {/* Graduation */}
                    <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 text-emerald-600">📅</div>
                    <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Graduation</p>
                        <p className="text-gray-900 font-medium">Class of {selectedMember.class}</p>
                    </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Location</p>
                        <p className="text-gray-900 font-medium">{selectedMember.location}</p>
                    </div>
                    </div>

                    {/* Birthday */}
                    <div className="flex items-start gap-3">
                    <Cake className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Birthday</p>
                        <p className="text-gray-900 font-medium">
                        {(selectedMember as any).dateOfBirth 
                            ? new Date((selectedMember as any).dateOfBirth).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                            : "October 14"}
                        </p>
                    </div>
                    </div>
                </div>

                {/* About Bio Section - Explicitly fallback to generic description text if bio string isn't present */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">About</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {(selectedMember as any).bio || (selectedMember as any).about || "No bio description provided yet for this alumnus profile."}
                    </p>
                </div>
                
                </div>
            </div>

            {/* Sticky Bottom Actions Bar */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3 flex-shrink-0">
                <button 
                onClick={() => setSelectedMember(null)}
                className="px-6 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium rounded-xl cursor-pointer"
                >
                Close
                </button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 text-sm rounded-xl">
                Connect Directly
                </Button>
            </div>

            </div>
        </div>
        )}
    </section>
  );
};