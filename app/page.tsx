import { HomeClient } from '@/components/HomeClient';
import { getBirthdayCelebrants, getMembers } from '@/lib/members';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [members, birthdayCelebrants] = await Promise.all([
    getMembers(8),
    getBirthdayCelebrants(),
  ]);

  return <HomeClient members={members} birthdayCelebrants={birthdayCelebrants} />;
}
