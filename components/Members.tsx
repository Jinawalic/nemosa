'use client';
import React, { useState } from 'react';
import { Button } from './ui/Button';
import { MemberDetailsModal } from './MemberDetailsModal';
import { Mail, Briefcase, Calendar } from 'lucide-react';

export interface Member {
  id: number;
  name: string;
  nickname: string;
  profession: string;
  graduationYear: number;
  bio: string;
  phone: string;
  dateOfBirth: string;
  image: string;
}

// Sample member data
const membersData: Member[] = [
  {
    id: 1,
    name: 'Chioma Okoro',
    nickname: 'Chi',
    profession: 'Software Engineer',
    graduationYear: 2018,
    bio: 'Passionate about building scalable web applications and mentoring junior developers. Currently working at a leading tech company.',
    phone: '+234 701 234 5678',
    dateOfBirth: '1999-05-12',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Adeyemi Adeniyi',
    nickname: 'Ade',
    profession: 'Product Manager',
    graduationYear: 2019,
    bio: 'Experienced product strategist with a focus on user-centric design. Lead product initiatives at a Fortune 500 company.',
    phone: '+234 702 345 6789',
    dateOfBirth: '1998-08-23',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Ngozi Ejiofor',
    nickname: 'Ngo',
    profession: 'UX Designer',
    graduationYear: 2017,
    bio: 'Creative designer specializing in mobile and web interfaces. Award-winning portfolio across multiple industries.',
    phone: '+234 703 456 7890',
    dateOfBirth: '1997-03-15',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Tunde Okafor',
    nickname: 'T-Boy',
    profession: 'Business Analyst',
    graduationYear: 2020,
    bio: 'Data-driven analyst with expertise in market research and business intelligence. Helping companies make informed decisions.',
    phone: '+234 704 567 8901',
    dateOfBirth: '2000-11-08',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Zainab Mohammed',
    nickname: 'Zai',
    profession: 'Marketing Director',
    graduationYear: 2016,
    bio: 'Strategic marketer with a proven track record in brand building and digital transformation. Leading campaigns for global brands.',
    phone: '+234 705 678 9012',
    dateOfBirth: '1996-07-20',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Kelechi Eze',
    nickname: 'Kels',
    profession: 'Data Scientist',
    graduationYear: 2019,
    bio: 'Machine learning expert focused on AI applications. Published researcher in predictive analytics and deep learning.',
    phone: '+234 706 789 0123',
    dateOfBirth: '1998-02-14',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 7,
    name: 'Amara Ndiaye',
    nickname: 'Am',
    profession: 'Entrepreneur',
    graduationYear: 2018,
    bio: 'Founder of a successful fintech startup. Passionate about financial inclusion and innovation in emerging markets.',
    phone: '+234 707 890 1234',
    dateOfBirth: '1999-09-28',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 8,
    name: 'Chukwu Obi',
    nickname: 'Chu',
    profession: 'Software Architect',
    graduationYear: 2015,
    bio: 'Senior architect designing enterprise-scale systems. Contributor to open-source projects and tech community advocate.',
    phone: '+234 708 901 2345',
    dateOfBirth: '1995-12-05',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
  },
];

export const Members = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewProfile = (member: Member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  return (
    <section className="min-h-screen bg-white py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-950 mb-4">
            Our Alumni Members
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Connect with accomplished professionals from our community. Explore diverse careers and expertise.
          </p>
        </div>

        {/* Members Grid - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {membersData.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group"
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-gray-200 aspect-square">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col">
                <h3 className="font-bold text-gray-900 text-sm md:text-base line-clamp-1">
                  {member.name}
                </h3>
                <p className="text-xs text-emerald-600 font-medium mb-2">
                  {member.nickname && `"${member.nickname}"`}
                </p>
                <p className="text-xs md:text-sm text-gray-600 line-clamp-1 mb-3">
                  {member.profession}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Class of {member.graduationYear}
                </p>

                {/* View Profile Button */}
                <Button
                  onClick={() => handleViewProfile(member)}
                  className="w-full text-xs md:text-sm bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium"
                >
                  View Profile
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Member Details Modal */}
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
