export type RegistrationView = {
  id: number;
  fullName: string;
  nickname: string | null;
  email: string;
  phone: string;
  profession: string;
  graduationYear: number;
  dateOfBirth: string;
  bio: string | null;
  status: string;
  memberId: number | null;
  image: string | null;
};

export type BirthdayCelebrantView = RegistrationView & {
  birthdayLabel: string;
  daysUntilBirthday: number;
  isToday: boolean;
};

export type BirthdayCelebrantsSectionData = {
  celebrants: BirthdayCelebrantView[];
  helperText: string;
};
