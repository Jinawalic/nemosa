import 'server-only';

import { prisma } from '@/lib/prisma';
import type { RegistrationView } from '@/lib/registration-types';

export type AdminDashboardMetrics = {
  registeredMembers: number;
  totalProjects: number;
  birthdaysThisMonth: number;
};

export type AdminDashboardData = {
  members: RegistrationView[];
  metrics: AdminDashboardMetrics;
};

const BIRTHDAY_TIME_ZONE = 'Africa/Lagos';

function serializeRegistration(registration: {
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

function getMonthInLagos(date: Date) {
  return Number(
    new Intl.DateTimeFormat('en-US', {
      timeZone: BIRTHDAY_TIME_ZONE,
      month: 'numeric',
    }).format(date),
  );
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const [registrations, totalProjects] = await Promise.all([
    prisma.registration.findMany({
      orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
    }),
    prisma.project.count(),
  ]);

  const members = registrations.map(serializeRegistration);
  const currentMonth = getMonthInLagos(new Date());
  const birthdaysThisMonth = registrations.filter(
    (registration) => getMonthInLagos(registration.dateOfBirth) === currentMonth,
  ).length;

  return {
    members,
    metrics: {
      registeredMembers: members.length,
      totalProjects,
      birthdaysThisMonth,
    },
  };
}

export async function deleteRegistrationById(id: number) {
  const deletedRegistration = await prisma.registration.delete({
    where: { id },
  });

  return serializeRegistration(deletedRegistration);
}
