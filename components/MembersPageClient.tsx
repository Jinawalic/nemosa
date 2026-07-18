'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Members } from '@/components/Members';
import { Footer } from '@/components/Footer';
import { RegisterModal } from '@/components/RegisterModal';
import type { RegistrationView } from '@/lib/registration-types';

interface MembersPageClientProps {
  members: RegistrationView[];
}

export function MembersPageClient({ members }: MembersPageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-white font-sans antialiased selection:bg-emerald-200">
      <Navbar onRegisterClick={openModal} />
      <main>
        <Members members={members} />
      </main>
      <Footer />

      <RegisterModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
