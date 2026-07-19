'use client';

import { Cake, CalendarDays } from 'lucide-react';
import type {
  BirthdayCelebrantView,
  BirthdayCelebrantsSectionData,
} from '@/lib/registration-types';

type BirthdayCelebrantsProps = BirthdayCelebrantsSectionData;

export const BirthdayCelebrants = ({ celebrants, helperText }: BirthdayCelebrantsProps) => {
  const gridColumns = celebrants.length === 1 ? 'grid-cols-1' : 'grid-cols-2';

  // Check if any of the celebrants have a birthday today
  const hasBirthdayToday = celebrants.some((member) => member.isToday);

  const renderCard = (member: BirthdayCelebrantView, key: string) => {
    const showImage = member.isToday && Boolean(member.image?.trim());
    const celebratoryText = member.isToday
      ? 'Celebrating today'
      : `Celebrating in ${member.daysUntilBirthday} day${member.daysUntilBirthday === 1 ? '' : 's'}`;

    return (
      <div
        key={key}
        className={`overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 ${
          showImage ? 'flex flex-col' : 'p-5'
        }`}
      >
        {showImage ? (
          <>
            <div className="relative aspect-square overflow-hidden bg-emerald-900">
              {member.image?.trim() ? (
                <img
                  src={member.image}
                  alt={member.fullName}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-900 via-emerald-800 to-amber-700 text-white">
                  <span className="text-4xl font-bold">{member.fullName.charAt(0)}</span>
                </div>
              )}

              <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-800 shadow-sm backdrop-blur">
                <Cake className="h-3.5 w-3.5 text-amber-500" />
                <span>Today</span>
              </div>
            </div>

            <div className="p-5">
              <h4 className="truncate text-lg font-bold tracking-tight text-gray-900">
                {member.fullName}
              </h4>
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <CalendarDays className="h-4 w-4 flex-shrink-0 text-amber-500" />
                <span className="truncate font-medium">{member.birthdayLabel}</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-rose-600">{celebratoryText}</p>
            </div>
          </>
        ) : (
          <>
            <h4 className="truncate text-lg font-bold tracking-tight text-gray-900">
              {member.fullName}
            </h4>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <CalendarDays className="h-4 w-4 flex-shrink-0 text-amber-500" />
              <span className="truncate font-medium">{member.birthdayLabel}</span>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <section
      id="birthday-celebrants"
      className="overflow-hidden border-y border-amber-100 bg-gradient-to-b from-amber-50 via-white to-emerald-50 py-10"
    >
      <div className="mx-auto mb-8 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mt-4 text-3xl font-bold text-gray-900">
          {hasBirthdayToday ? 'Birthday Celebrants' : 'Upcoming Birthdays'}
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-gray-600">{helperText}</p>
      </div>

      {celebrants.length > 0 ? (
        <div className={`mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:px-8 ${gridColumns} md:grid-cols-4 md:gap-6`}>
          {celebrants.map((member, idx) => renderCard(member, `birthday-${idx}`))}
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-dashed border-amber-200 bg-white px-6 py-16 text-center">
            <h3 className="text-xl font-semibold text-gray-900">No birthday celebrants found yet</h3>
            <p className="mt-2 text-gray-600">
              Once registration records exist, birthday celebrants will appear here automatically.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};