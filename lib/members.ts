import { prisma } from '@/lib/prisma';
import type { RegistrationView } from '@/lib/registration-types';

function toRegistrationView(registration: {
  id: number;
  fullName: string;
  nickname: string | null;
  email: string;
  phone: string;
  profession: string;
  graduationYear: number;
  dateOfBirth: Date;
  bio: string | null;
  image: string | null;
  status: string;
  memberId: number | null;
}): RegistrationView {
  return {
    ...registration,
    dateOfBirth: registration.dateOfBirth.toISOString(),
    image: registration.image?.trim() || null,
  };
}

export async function getMembers(take?: number) {
  const registrations = await prisma.registration.findMany({
    orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
    ...(typeof take === 'number' ? { take } : {}),
  });

  return registrations.map(toRegistrationView);
}
