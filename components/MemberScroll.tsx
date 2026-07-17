'use client';

import { useState } from 'react';
import { Button } from './ui/Button';
import { MapPin, ArrowUpRight, X } from 'lucide-react';
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
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative border border-gray-100 animate-scale-up">
            
            {/* Close action overlay button */}
            <button 
              onClick={() => setSelectedMember(null)}
              className="absolute top-3 right-3 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image Header */}
            <div className="relative h-56 w-full bg-emerald-950">
              <img 
                src={selectedMember.image} 
                alt={selectedMember.name} 
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md">
                Class of {selectedMember.class}
              </span>
            </div>

            {/* Modal Bio Details content block */}
            <div className="p-6 text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedMember.name}</h3>
              <p className="text-sm text-emerald-600 font-semibold mb-4">{selectedMember.role}</p>
              
              <div className="flex items-center gap-2 text-gray-600 text-sm border-t border-gray-100 pt-4 mb-6">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>Based in {selectedMember.location}</span>
              </div>

              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium rounded-xl cursor-pointer"
                >
                  Close
                </button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 text-sm rounded-xl">
                  Connect Directly
                </Button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};