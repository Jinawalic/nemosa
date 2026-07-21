'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X, Upload } from 'lucide-react';
import { Button } from './ui/Button';
import type { RegistrationView } from '@/lib/registration-types';

interface EditMemberModalProps {
  member: RegistrationView;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedMember: RegistrationView) => Promise<void> | void;
}

function toMaskedDateInputValue(dateValue: string) {
  if (!dateValue) {
    return '';
  }
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  const isoString = date.toISOString().slice(0, 10); // "YYYY-MM-DD"
  const parts = isoString.split('-');
  
  // Transform from YYYY-MM-DD to DD-MM-****
  return `${parts[2]}-${parts[1]}-****`;
}

export const EditMemberModal: React.FC<EditMemberModalProps> = ({
  member,
  isOpen,
  onClose,
  onSave,
}) => {
  const [fullName, setFullName] = useState(member.fullName);
  const [nickname, setNickname] = useState(member.nickname || '');
  const [profession, setProfession] = useState(member.profession);
  const [graduationYear, setGraduationYear] = useState(String(member.graduationYear));
  const [phone, setPhone] = useState(member.phone || '');
  const [email, setEmail] = useState(member.email || '');
  const [dateOfBirth, setDateOfBirth] = useState(toMaskedDateInputValue(member.dateOfBirth));
  const [bio, setBio] = useState(member.bio || '');
  const [image, setImage] = useState(member.image || '');
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFullName(member.fullName);
    setNickname(member.nickname || '');
    setProfession(member.profession);
    setGraduationYear(String(member.graduationYear));
    setPhone(member.phone || '');
    setEmail(member.email || '');
    setDateOfBirth(toMaskedDateInputValue(member.dateOfBirth));
    setBio(member.bio || '');
    setImage(member.image || '');
  }, [member]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9*]/g, ''); // strip out existing dashes

    // Enforce masking layout handling for text entry (DD-MM-****)
    if (value.length > 4) {
      const numericPart = value.slice(0, 4);
      const yearPart = value.slice(4, 8).replace(/[0-9]/g, '*');
      value = numericPart + yearPart;
    }

    // Auto-apply formatting dashes: DD-MM-****
    if (value.length > 4) {
      value = `${value.slice(0, 2)}-${value.slice(2, 4)}-${value.slice(4, 8)}`;
    } else if (value.length > 2) {
      value = `${value.slice(0, 2)}-${value.slice(2, 4)}`;
    }

    setDateOfBirth(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const normalizedGraduationYear = Number(graduationYear);

    // Extract the DD and MM entered by the user from DD-MM-****
    const dateParts = dateOfBirth.split('-');
    const day = dateParts[0] || '01';
    const month = dateParts[1] || '01';

    // Preserve the member's original birth year, fallback to 2000 if invalid
    const originalYear = member.dateOfBirth ? new Date(member.dateOfBirth).getFullYear() : 2000;
    const normalizedDateOfBirth = new Date(`${originalYear}-${month}-${day}T12:00:00.000Z`).toISOString();

    try {
      await Promise.resolve(
        onSave({
          ...member,
          fullName,
          nickname: nickname.trim() ? nickname.trim() : null,
          profession,
          graduationYear: Number.isFinite(normalizedGraduationYear)
            ? normalizedGraduationYear
            : member.graduationYear,
          phone,
          email,
          dateOfBirth: normalizedDateOfBirth,
          bio: bio.trim() ? bio.trim() : null,
          image: image.trim() ? image.trim() : null,
        }),
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden relative flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-emerald-800 text-white">
          <h2 className="font-bold text-lg">Edit Alumni Profile</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-emerald-700 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              readOnly
              value={fullName}
              className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Nickname
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
              placeholder="Optional nickname"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Profession
              </label>
              <input
                type="text"
                required
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                placeholder="e.g. Journalism"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Graduation Year
              </label>
              <input
                type="number"
                min="1900"
                max="2100"
                required
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                placeholder="e.g. 2014"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                placeholder="07039372477"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
                placeholder="name@gmail.com"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Birthday
              </label>
              <input
                type="text"
                required
                pattern="[0-3][0-9]-[0-1][0-9]-\*\*\*\*"
                maxLength={10}
                value={dateOfBirth}
                onChange={handleDateChange}
                placeholder="DD-MM-****"
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 p-2 border border-dashed border-gray-300 hover:border-emerald-500 rounded-lg text-sm text-gray-600 hover:text-emerald-600 transition-colors bg-gray-50 font-medium"
              >
                <Upload className="w-4 h-4" />
                {image ? 'Change Profile Photo' : 'Choose Image File'}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 resize-none"
              placeholder="Tell us a bit about this member..."
            />
          </div>
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 bg-gray-900 text-slate-700 rounded-lg text-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};