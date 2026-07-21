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
    const imageSrc = member.image?.trim();
    const hasImage = Boolean(imageSrc);
    const celebratoryText = member.isToday
      ? 'Celebrating today'
      : `Celebrating in ${member.daysUntilBirthday} day${member.daysUntilBirthday === 1 ? '' : 's'}`;

    return (
      <div
        key={key}
        className={`overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between bg-white ${
          member.isToday 
            ? 'border-rose-200 ring-2 ring-rose-500/10 shadow-md' 
            : 'border-amber-100 shadow-sm'
        }`}
      >
        <div>
          {/* Picture / Placeholder Area */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            {hasImage ? (
              <img
                src={imageSrc}
                alt={member.fullName}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br text-white ${
                member.isToday 
                  ? 'from-rose-600 via-emerald-800 to-amber-600' 
                  : 'from-emerald-900 via-emerald-800 to-amber-700'
              }`}>
                <span className="text-4xl font-bold">{member.fullName.charAt(0)}</span>
              </div>
            )}

            {/* Birthday Badge Overlay */}
            {member.isToday && (
              <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm animate-pulse">
                <Cake className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
                <span>Today</span>
              </div>
            )}
          </div>

          {/* Details Area */}
          <div className="p-5">
            <h4 className="truncate text-lg font-bold tracking-tight text-gray-900">
              {member.fullName}
            </h4>
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
              <CalendarDays className={`h-4 w-4 flex-shrink-0 ${member.isToday ? 'text-rose-500' : 'text-amber-500'}`} />
              <span className="truncate font-medium">{member.birthdayLabel}</span>
            </div>
          </div>
        </div>

        {/* Celebratory Text Bottom Strip */}
        <div className="px-5 pb-5 pt-0">
          <p className={`text-sm font-semibold ${member.isToday ? 'text-rose-600 animate-bounce-subtle' : 'text-emerald-700'}`}>
            {celebratoryText}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section
      id="birthday-celebrants"
      className="overflow-hidden bg-gradient-to-b from-amber-50 via-white to-emerald-50 py-10"
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
