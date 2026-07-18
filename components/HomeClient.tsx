'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { MemberScroll } from '@/components/MemberScroll';
import { MissionVision } from '@/components/MissionVision';
import { Projects } from '@/components/Projects';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { RegisterModal } from '@/components/RegisterModal';
import type { RegistrationView } from '@/lib/registration-types';

interface HomeClientProps {
  members: RegistrationView[];
}

export function HomeClient({ members }: HomeClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-white font-sans antialiased selection:bg-emerald-200">
      <Navbar onRegisterClick={openModal} />
      <main>
        <Hero onRegisterClick={openModal} />
        <MemberScroll members={members} />
        <MissionVision />
        <Projects />
        <CTA onRegisterClick={openModal} />
      </main>
      <Footer />

      <RegisterModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
