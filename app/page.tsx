import { HomeClient } from '@/components/HomeClient';
import { getMembers } from '@/lib/members';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const members = await getMembers(8);

  return <HomeClient members={members} />;
}
