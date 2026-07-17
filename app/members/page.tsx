'use client';
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Members } from '@/components/Members';
import { Footer } from '@/components/Footer';
import { RegisterModal } from '@/components/RegisterModal';
import { useState } from 'react';

export default function MembersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-white font-sans antialiased selection:bg-emerald-200">
      <Navbar onRegisterClick={openModal} />
      <main>
        <Members />
      </main>
      <Footer />

      {/* Registration Modal */}
      <RegisterModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
