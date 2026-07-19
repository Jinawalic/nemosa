import { prisma } from '@/lib/prisma';
import type {
  BirthdayCelebrantView,
  BirthdayCelebrantsSectionData,
  RegistrationView,
} from '@/lib/registration-types';

const BIRTHDAY_TIME_ZONE = 'Africa/Lagos';
const DAY_IN_MS = 24 * 60 * 60 * 1000;

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

function getTimeZoneParts(date: Date) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: BIRTHDAY_TIME_ZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  let year = 0;
  let month = 0;
  let day = 0;

  for (const part of formatter.formatToParts(date)) {
    if (part.type === 'year') year = Number(part.value);
    if (part.type === 'month') month = Number(part.value);
    if (part.type === 'day') day = Number(part.value);
  }

  return { year, month, day };
}

function toUtcMidnight(year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month - 1, day));
}

function getTodayInLagos(now = new Date()) {
  const { year, month, day } = getTimeZoneParts(now);
  return toUtcMidnight(year, month, day);
}

function getBirthdayDateForYear(dateOfBirth: Date, year: number) {
  const { month, day } = getTimeZoneParts(dateOfBirth);
  const candidate = toUtcMidnight(year, month, day);

  if (candidate.getUTCMonth() !== month - 1 || candidate.getUTCDate() !== day) {
    return toUtcMidnight(year, 2, 28);
  }

  return candidate;
}

function formatBirthdayLabel(dateOfBirth: Date) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: BIRTHDAY_TIME_ZONE,
    month: 'long',
    day: 'numeric',
  }).format(dateOfBirth);
}

function toBirthdayCelebrantView(registration: {
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
}): BirthdayCelebrantView {
  const base = toRegistrationView(registration);
  const today = getTodayInLagos();
  const currentYear = today.getUTCFullYear();

  let nextBirthday = getBirthdayDateForYear(registration.dateOfBirth, currentYear);
  if (nextBirthday < today) {
    nextBirthday = getBirthdayDateForYear(registration.dateOfBirth, currentYear + 1);
  }

  const daysUntilBirthday = Math.round((nextBirthday.getTime() - today.getTime()) / DAY_IN_MS);

  return {
    ...base,
    birthdayLabel: formatBirthdayLabel(registration.dateOfBirth),
    daysUntilBirthday,
    isToday: daysUntilBirthday === 0,
  };
}

export async function getMembers(take?: number) {
  const registrations = await prisma.registration.findMany({
    orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
    ...(typeof take === 'number' ? { take } : {}),
  });

  return registrations.map(toRegistrationView);
}

export async function getBirthdayCelebrants(): Promise<BirthdayCelebrantsSectionData> {
  const registrations = await prisma.registration.findMany({
    orderBy: [{ fullName: 'asc' }, { updatedAt: 'desc' }, { createdAt: 'desc' }],
  });

  const celebrants = registrations
    .map(toBirthdayCelebrantView)
    .sort((first, second) => {
      if (first.daysUntilBirthday !== second.daysUntilBirthday) {
        return first.daysUntilBirthday - second.daysUntilBirthday;
      }

      return first.fullName.localeCompare(second.fullName);
    });

  const todayCelebrants = celebrants.filter((member) => member.isToday);
  if (todayCelebrants.length > 0) {
    return {
      celebrants: todayCelebrants,
      helperText:
        todayCelebrants.length === 1
          ? 'One celebration is happening today. Let us celebrate them.'
          : `${todayCelebrants.length} celebrations are happening today. Let us celebrate them.`,
    };
  }

  const nextUpcomingDays = celebrants.find((member) => member.daysUntilBirthday > 0)?.daysUntilBirthday;

  if (typeof nextUpcomingDays === 'number') {
    const upcomingCelebrants = celebrants.filter(
      (member) => member.daysUntilBirthday > 0 && member.daysUntilBirthday === nextUpcomingDays,
    );

    return {
      celebrants: upcomingCelebrants,
      helperText: `Celebrating in ${nextUpcomingDays} day${nextUpcomingDays === 1 ? '' : 's'}.`,
    };
  }

  return {
    celebrants: [],
    helperText: 'No birthday celebrants found yet.',
  };
}
